/**
 * Script to analyze color contrast ratios for all themes
 * Run with: npx tsx src/utils/analyzeThemeContrast.ts
 */

import { themes } from "../themes/themes";
import {
  getContrastRatio,
  getComplianceLevel,
  formatContrastRatio,
} from "./contrastChecker";

interface ContrastTest {
  combination: string;
  foreground: string;
  background: string;
  ratio: number;
  compliance: "AAA" | "AA" | "Fail";
  isLargeText?: boolean;
}

function analyzeTheme(_themeName: string, colors: any): ContrastTest[] {
  const tests: ContrastTest[] = [];

  // Test primary text combinations
  tests.push({
    combination: "Primary text on surface",
    foreground: colors.text,
    background: colors.surface,
    ratio: getContrastRatio(colors.text, colors.surface),
    compliance: getComplianceLevel(
      getContrastRatio(colors.text, colors.surface),
      false
    ),
  });

  tests.push({
    combination: "Primary text on background",
    foreground: colors.text,
    background: colors.background,
    ratio: getContrastRatio(colors.text, colors.background),
    compliance: getComplianceLevel(
      getContrastRatio(colors.text, colors.background),
      false
    ),
  });

  tests.push({
    combination: "Secondary text on surface",
    foreground: colors.textSecondary,
    background: colors.surface,
    ratio: getContrastRatio(colors.textSecondary, colors.surface),
    compliance: getComplianceLevel(
      getContrastRatio(colors.textSecondary, colors.surface),
      false
    ),
  });

  // Test button text combinations
  tests.push({
    combination: "Primary text on primary button",
    foreground: colors.text,
    background: colors.primary,
    ratio: getContrastRatio(colors.text, colors.primary),
    compliance: getComplianceLevel(
      getContrastRatio(colors.text, colors.primary),
      false
    ),
  });

  tests.push({
    combination: "Primary text on secondary button",
    foreground: colors.text,
    background: colors.secondary,
    ratio: getContrastRatio(colors.text, colors.secondary),
    compliance: getComplianceLevel(
      getContrastRatio(colors.text, colors.secondary),
      false
    ),
  });

  tests.push({
    combination: "Primary text on accent",
    foreground: colors.text,
    background: colors.accent,
    ratio: getContrastRatio(colors.text, colors.accent),
    compliance: getComplianceLevel(
      getContrastRatio(colors.text, colors.accent),
      false
    ),
  });

  tests.push({
    combination: "White text on accent",
    foreground: "#FFFFFF",
    background: colors.accent,
    ratio: getContrastRatio("#FFFFFF", colors.accent),
    compliance: getComplianceLevel(
      getContrastRatio("#FFFFFF", colors.accent),
      false
    ),
  });

  // Test danger button (close button)
  tests.push({
    combination: "White text on danger button",
    foreground: "#FFFFFF",
    background: colors.danger,
    ratio: getContrastRatio("#FFFFFF", colors.danger),
    compliance: getComplianceLevel(
      getContrastRatio("#FFFFFF", colors.danger),
      false
    ),
  });

  // Test border visibility
  tests.push({
    combination: "Border on surface",
    foreground: colors.border,
    background: colors.surface,
    ratio: getContrastRatio(colors.border, colors.surface),
    compliance: getComplianceLevel(
      getContrastRatio(colors.border, colors.surface),
      false
    ),
  });

  return tests;
}

function printResults() {
  console.log("=".repeat(80));
  console.log("WCAG COLOR CONTRAST ANALYSIS FOR PORTFOLIO OS THEMES");
  console.log("=".repeat(80));
  console.log("\nWCAG Standards:");
  console.log("  AA (Normal text): 4.5:1 minimum");
  console.log("  AA (Large text):  3:1 minimum");
  console.log("  AAA (Normal text): 7:1 minimum");
  console.log("  AAA (Large text):  4.5:1 minimum");
  console.log("\n");

  themes.forEach((theme) => {
    console.log("─".repeat(80));
    console.log(`THEME: ${theme.name.toUpperCase()} (${theme.id})`);
    console.log("─".repeat(80));

    const tests = analyzeTheme(theme.name, theme.colors);

    tests.forEach((test) => {
      const status =
        test.compliance === "Fail"
          ? "❌ FAIL"
          : test.compliance === "AA"
          ? "✓ AA"
          : "✓✓ AAA";
      console.log(`\n${test.combination}:`);
      console.log(`  Foreground: ${test.foreground}`);
      console.log(`  Background: ${test.background}`);
      console.log(`  Contrast: ${formatContrastRatio(test.ratio)} - ${status}`);
    });

    console.log("\n");
  });

  // Summary
  console.log("=".repeat(80));
  console.log("SUMMARY");
  console.log("=".repeat(80));

  themes.forEach((theme) => {
    const tests = analyzeTheme(theme.name, theme.colors);
    const failCount = tests.filter((t) => t.compliance === "Fail").length;
    const aaCount = tests.filter((t) => t.compliance === "AA").length;
    const aaaCount = tests.filter((t) => t.compliance === "AAA").length;

    console.log(`\n${theme.name}:`);
    console.log(`  ✓✓ AAA: ${aaaCount} tests`);
    console.log(`  ✓ AA:  ${aaCount} tests`);
    console.log(`  ❌ Fail: ${failCount} tests`);
  });

  console.log("\n" + "=".repeat(80));
}

// Run the analysis
printResults();
