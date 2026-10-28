# Security

*[Leia em português](SECURITY.md)*

This is a static portfolio (React + Vite) served by Vercel. There is no back end, database,
authentication or user data: all content is public and runs in the browser. What can be attacked
here is the visitor's browser, and that is what the configuration below looks after.

## Reporting

Found something? Use GitHub's private reporting (the **Security** tab, **Report a vulnerability**)
or email junioad555@gmail.com with what you found and, if you can, steps to reproduce it. I answer
as soon as I can. Please do not dump automated scanner output without context.

There is also a `/.well-known/security.txt` in RFC 9116 format.

## What is in place

### Headers

All in `vercel.json`, and all covered by tests.

| Header | Value | Purpose |
|---|---|---|
| `Content-Security-Policy` | see below | limits where scripts, styles, fonts and connections can come from |
| `Strict-Transport-Security` | 2 years, `includeSubDomains`, `preload` | prevents a first visit in clear text |
| `X-Frame-Options` + `frame-ancestors` | `DENY` / `'none'` | clickjacking |
| `X-Content-Type-Options` | `nosniff` | stops the browser from guessing file types |
| `Cross-Origin-Opener-Policy` | `same-origin` | cuts window references across origins |
| `Cross-Origin-Resource-Policy` | `same-origin` | stops other origins from embedding these files |
| `Cross-Origin-Embedder-Policy` | `credentialless` | closes the cross-origin leak path |
| `Origin-Agent-Cluster` | `?1` | asks for process isolation |
| `X-Permitted-Cross-Domain-Policies` | `none` | legacy Flash and PDF policy |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | does not hand the full path to third parties |
| `Permissions-Policy` | 30 features closed | camera, microphone, geolocation, payment, USB, sensors and the rest |
| `X-DNS-Prefetch-Control` | `off` | see the note below |
| `X-XSS-Protection` | `0` | turns off the legacy auditor, which became an attack vector itself |

The CSP:

```
default-src 'self'; base-uri 'self'; script-src 'self' blob:;
style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:;
font-src 'self' data:; connect-src 'self'; worker-src 'self' blob:;
manifest-src 'self'; media-src 'none'; object-src 'none';
child-src 'self' blob:; frame-src 'none'; frame-ancestors 'none';
form-action 'none'; upgrade-insecure-requests
```

There is no CDN or third-party resource: fonts, icons and the whole Monaco editor are served from
this origin. `connect-src 'self'` means the page has nowhere to send any data.

### In the code

- No source maps in production, and `console`/`debugger` stripped at build time.
- No embedded API key. There is nothing to embed: there are no external calls.
- External links always use `rel="noopener noreferrer"`.
- No `dangerouslySetInnerHTML`, `innerHTML`, `eval`, `new Function` or `document.write` anywhere in
  `src/`. A test checks this file by file, and that test has its own test making sure the patterns
  still catch the obvious case.
- No dependency with a known vulnerability, development ones included: `npm audit` blocks from
  moderate up.

### In the pipeline

On every push and pull request: CodeQL (`security-extended`) on the code, gitleaks over the whole
history and OSV-Scanner on the lockfile. A CodeQL finding without a recorded acceptance in
`.github/codeql-accepted.json` fails the build. Actions are pinned by SHA, token permissions are
minimal and Dependabot waits seven days before proposing a new version.

### DAST

OWASP ZAP runs in baseline mode against the published site every Monday and on every production
release (`.github/workflows/dast.yml`). Baseline means passive: ZAP crawls and analyses the
responses without sending attacks. It runs against production rather than the local server because
the headers live in `vercel.json`, which Vite does not apply. Any alert outside `.zap/regras.tsv`
fails the run.

### Against AI scraping

`robots.txt` blocks about thirty training crawlers. To be clear about what that is: a convention,
not access control. Anyone who ignores `robots.txt` can still read the site. The real barrier
against abuse is the headers.

## Choices that look loose, and are not

Three CSP directives are looser than ideal, each for a reason:

- **`script-src` allows `blob:`.** The Monaco editor runs in a worker, and Vite's worker loader has
  a fallback path that builds the worker from a blob. Without `blob:`, the editor breaks only in some
  browsers, which is the kind of failure nobody can reproduce. The blob inherits the page's origin,
  so it does not open a door to outside code.
- **`style-src` allows `'unsafe-inline'`.** Monaco injects styles at runtime and React applies
  `style` as an attribute. Switching to hashes would mean regenerating the list on every Monaco
  build, and a stale hash silently breaks the whole page.
- **`font-src` allows `data:`.** The build inlines the smaller font subsets as data URIs. Closing it
  to `'self'` passes any header audit and breaks the typography in production.

Two other choices:

- **`Cross-Origin-Embedder-Policy: credentialless`, not `require-corp`.** Since the site loads
  nothing from other origins, both behave the same today. `credentialless` is the one that does not
  break if an external resource without `CORP` ever comes in.
- **`X-DNS-Prefetch-Control: off`.** It gives up a little speed on purpose. When on, the browser
  resolves the domain of every link on the page before any click, which hands the DNS resolver a
  list of what the visitor never even opened.

## What is not here

- **Trusted Types.** It would be the strongest defence against HTML injection, but Monaco writes
  HTML on its own and would need a tailored policy. Without an environment to test that properly,
  adding it now would risk breaking the editor in production to gain protection against a vector
  that does not exist today: there is no `innerHTML` in the code.
- **CSP violation reports.** They would need an endpoint, and so a back end, which this project does
  not have.

## Scope

There is no user data or secret in the client, so the focus is front-end hygiene: headers,
dependencies and injection surface. The headers live in `vercel.json` and are covered by
`src/security.test.ts`, which runs in CI on every push.
