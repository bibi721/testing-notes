import { describe, expect, it } from "vitest";
import { formatDate, humanize } from "@/lib/format";

describe("formatDate", () => {
  it("formats a date-only string as the exact calendar date written", () => {
    // Regression test: new Date("2026-01-19") parses as UTC midnight.
    // Formatting with the local/system timezone (the previous
    // behavior) rolls this back to January 18 for any reader/runner
    // west of UTC. Forcing timeZone: "UTC" keeps it January 19
    // regardless of where this test (or the deployed server) runs.
    expect(formatDate("2026-01-19")).toBe("January 19, 2026");
  });

  it("formats a date at the start of the year correctly", () => {
    expect(formatDate("2026-01-01")).toBe("January 1, 2026");
  });

  it("formats a date at the end of the year correctly", () => {
    expect(formatDate("2026-12-31")).toBe("December 31, 2026");
  });
});

describe("humanize", () => {
  it("capitalizes each hyphenated word", () => {
    expect(humanize("test-automation")).toBe("Test Automation");
  });

  it("handles a single word", () => {
    expect(humanize("career")).toBe("Career");
  });
});
