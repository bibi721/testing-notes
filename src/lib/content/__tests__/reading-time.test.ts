import { describe, expect, it } from "vitest";
import { calculateReadingTime } from "@/lib/content/reading-time";

describe("calculateReadingTime", () => {
  it("returns at least 1 minute for very short content", () => {
    expect(calculateReadingTime("Just a few words here.")).toBe(1);
  });

  it("estimates based on ~200 words per minute", () => {
    const words = Array(400).fill("word").join(" ");
    expect(calculateReadingTime(words)).toBe(2);
  });

  it("excludes fenced code blocks from the word count", () => {
    const prose = Array(200).fill("word").join(" ");
    const codeBlock = "```\n" + Array(400).fill("code").join(" ") + "\n```";
    // If code were counted, this would be ~3 min; it should stay ~1.
    expect(calculateReadingTime(`${prose}\n\n${codeBlock}`)).toBe(1);
  });

  it("excludes inline code from the word count", () => {
    const withInlineCode = `Some prose with \`inline.code().here()\` in it.`;
    expect(calculateReadingTime(withInlineCode)).toBe(1);
  });
});
