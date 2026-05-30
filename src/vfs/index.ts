import type { DirNode, TreeNode, VFile } from "../types";
import { aboutMd } from "./about";
import { profileJson } from "./profile";
import { experienceYaml } from "./experience";
import { contactTs, readmeFile } from "./contact";
import { projectFiles } from "./projects";

export const ALL_FILES: VFile[] = [
  readmeFile,
  aboutMd,
  profileJson,
  experienceYaml,
  contactTs,
  ...projectFiles,
];

export const filesByPath = new Map(ALL_FILES.map((f) => [f.path, f]));

export const TREE: DirNode = {
  type: "dir",
  name: "fabricio-junio",
  path: "/",
  children: buildTree(ALL_FILES),
};

function buildTree(files: VFile[]): TreeNode[] {
  const root: TreeNode[] = [];
  for (const f of files) {
    const parts = f.path.split("/").filter(Boolean);
    insertInto(root, parts, f);
  }
  return sortTree(root);
}

function insertInto(siblings: TreeNode[], parts: string[], file: VFile): void {
  const [head, ...rest] = parts;
  if (rest.length === 0) {
    siblings.push({
      type: "file",
      name: file.name,
      path: file.path,
      language: file.language,
    });
    return;
  }
  let dir = siblings.find(
    (n): n is DirNode => n.type === "dir" && n.name === head,
  );
  if (!dir) {
    dir = {
      type: "dir",
      name: head,
      path: "/" + parts.slice(0, parts.length - rest.length).join("/"),
      children: [],
    };
    siblings.push(dir);
  }
  insertInto(dir.children, rest, file);
}

function sortTree(nodes: TreeNode[]): TreeNode[] {
  const dirs = nodes.filter((n): n is DirNode => n.type === "dir");
  const files = nodes.filter((n) => n.type === "file");
  dirs.forEach((d) => (d.children = sortTree(d.children)));
  return [
    ...dirs.sort((a, b) => a.name.localeCompare(b.name)),
    ...files.sort((a, b) => a.name.localeCompare(b.name)),
  ];
}
