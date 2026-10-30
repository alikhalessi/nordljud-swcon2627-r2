import React from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { AccessibleFeedback } from "../../src/components/AccessibleFeedback";
import { OperationStatus } from "../../src/components/OperationStatus";
describe("truthful accessible operation feedback", () => {
 it("announces an error and gives a recovery action without disclosing exception details", () => {
  const retry = vi.fn();
  render(<OperationStatus status="error" error={new Error("synthetic-secret-sentinel")} onRetry={retry} />);
  expect(screen.getByRole("alert")).toBeInTheDocument();
  expect(screen.queryByText(/synthetic-secret-sentinel/)).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Try again" }));
  expect(retry).toHaveBeenCalledOnce();
 });
 it("distinguishes an unknown save from confirmed saved or definite failure", () => {
  render(<OperationStatus status="unknown" onRetry={() => {}} />);
  expect(screen.getByRole("status")).toHaveTextContent(/save status unknown/i);
  expect(screen.getByRole("button", { name: "Check saved state" })).toBeInTheDocument();
 });
 it("exposes a session-only persistence qualification", () => {
  render(<OperationStatus status="session-only" />);
  expect(screen.getByRole("status")).toHaveTextContent(/this session only/i);
 });
 it("uses a polite status region for non-error feedback", () => {
  render(<AccessibleFeedback status="saving">Saving browser choices…</AccessibleFeedback>);
  expect(screen.getByRole("status")).toHaveAttribute("aria-live", "polite");
 });
});
