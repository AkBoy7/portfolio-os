# Color Contrast Quick Reference Guide

## 🎨 WCAG AA Compliant Color Usage

### ✅ Text Colors (Use These)

```css
/* Primary text - Use for all body content, headings, paragraphs */
color: var(--color-text);
/* Contrast: 8.41:1 to 10.91:1 (AAA) ✓✓ */

/* Secondary text - Use for labels, captions, metadata */
color: var(--color-text-secondary);
/* Contrast: 5.39:1 to 6.79:1 (AA) ✓ */
```

### ✅ Button Text Colors

```css
/* Regular buttons - Use primary text */
.button {
  background: var(--color-primary);
  color: var(--color-text);
}
/* Contrast: 4.69:1 to 6.50:1 (AA) ✓ */

/* Danger/Close buttons - Use white text */
.danger-button {
  background: var(--color-danger);
  color: #ffffff;
}
/* Contrast: 4.87:1 to 5.87:1 (AA) ✓ */
```

### ❌ Don't Use These for Text

```css
/* ❌ Too light for text */
color: var(--color-primary);
color: var(--color-secondary);
color: var(--color-accent);
color: var(--color-border);
```

## 🚀 Quick Test Command

```bash
# Verify contrast ratios for all themes
npx tsx src/utils/analyzeThemeContrast.ts
```

## 📊 Current Theme Colors

### Sakura Dreams

- Text: `#6B2E68` (8.59:1) ✓✓ AAA
- Secondary: `#8B4789` (5.66:1) ✓ AA
- Danger: `#D91E63` (4.87:1 with white) ✓ AA

### Mint Breeze

- Text: `#1E5248` (8.67:1) ✓✓ AAA
- Secondary: `#2D6A5F` (6.12:1) ✓ AA
- Danger: `#D32F2F` (4.98:1 with white) ✓ AA

### Lavender Fields

- Text: `#3D2E5F` (10.91:1) ✓✓ AAA
- Secondary: `#5B4B8A` (6.79:1) ✓ AA
- Danger: `#C2185B` (5.87:1 with white) ✓ AA

### Peachy Keen

- Text: `#6B3D28` (8.41:1) ✓✓ AAA
- Secondary: `#8B5A3C` (5.39:1) ✓ AA
- Danger: `#D32F2F` (4.98:1 with white) ✓ AA

## 📋 Checklist for New Components

- [ ] Use `var(--color-text)` for primary text
- [ ] Use `var(--color-text-secondary)` for secondary text
- [ ] Use `var(--color-text)` on button backgrounds
- [ ] Use `#FFFFFF` on danger button backgrounds
- [ ] Test component with all four themes
- [ ] Run contrast analysis script
- [ ] Verify minimum 4.5:1 ratio

## 🔗 Documentation

- Full Report: `.kiro/specs/portfolio-os-interface/color-contrast-report.md`
- Improvements: `.kiro/specs/portfolio-os-interface/contrast-improvements-summary.md`
- Certificate: `.kiro/specs/portfolio-os-interface/wcag-compliance-certificate.md`

## ✅ Status

**All themes are WCAG 2.1 Level AA compliant** ✓

Last verified: June 10, 2025
