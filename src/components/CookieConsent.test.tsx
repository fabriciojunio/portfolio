import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CookieConsent from "./CookieConsent";

const store: Record<string, string> = {};

const localStorageMock = {
  getItem: vi.fn((key: string) => store[key] ?? null),
  setItem: vi.fn((key: string, value: string) => {
    store[key] = value;
  }),
  removeItem: vi.fn((key: string) => {
    delete store[key];
  }),
  clear: vi.fn(() => {
    Object.keys(store).forEach((k) => delete store[k]);
  }),
  get length() {
    return Object.keys(store).length;
  },
  key: vi.fn((i: number) => Object.keys(store)[i] ?? null),
};

Object.defineProperty(globalThis, "localStorage", { value: localStorageMock });

describe("CookieConsent", () => {
  beforeEach(() => {
    Object.keys(store).forEach((k) => delete store[k]);
    vi.clearAllMocks();
  });

  it("should render when no consent is stored", () => {
    render(<CookieConsent />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText(/LGPD/)).toBeInTheDocument();
  });

  it("should not render when consent was already accepted", () => {
    store["portfolio_cookie_consent"] = "accepted";
    render(<CookieConsent />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("should not render when consent was already declined", () => {
    store["portfolio_cookie_consent"] = "declined";
    render(<CookieConsent />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("should hide and store 'accepted' when accept is clicked", async () => {
    const user = userEvent.setup();
    render(<CookieConsent />);
    await user.click(screen.getByText("Aceitar"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "portfolio_cookie_consent",
      "accepted"
    );
  });

  it("should hide and store 'declined' when decline is clicked", async () => {
    const user = userEvent.setup();
    render(<CookieConsent />);
    await user.click(screen.getByText("Recusar"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "portfolio_cookie_consent",
      "declined"
    );
  });
});
