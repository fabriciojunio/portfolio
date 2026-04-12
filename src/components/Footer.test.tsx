import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
  it("should render the author name", () => {
    render(<Footer />);
    expect(screen.getByText(/Fabricio Junio/)).toBeInTheDocument();
  });

  it("should display the current year", () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });

  it("should display LGPD compliance info", () => {
    render(<Footer />);
    expect(screen.getByText(/LGPD Compliant/)).toBeInTheDocument();
    expect(screen.getByText(/Nenhum dado pessoal coletado/)).toBeInTheDocument();
  });
});
