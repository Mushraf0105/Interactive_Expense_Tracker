# PROJECT REPORT: INTERACTIVE EXPENSE TRACKER WEB APPLICATION

**Date of Submission:** November 9, 2026  
**Document Version:** 1.0  
**Project Status:** Completed & Fully Operational  
**Developer / Student:** Veda Technology Assessment Candidate  
**Repository:** `Interactive_Expense_Tracker`  

---

## 1. Executive Summary

The **Interactive Expense Tracker Web Application** is a client-side personal finance tracking tool engineered using pure, semantic web technologies: **HTML5**, **CSS3**, and **Vanilla JavaScript (ES6+)**. The primary purpose of this project is to provide users with an intuitive, responsive, and reliable solution for recording, categorizing, analyzing, and managing their daily expenditures with zero external dependencies or server requirements.

All application data is securely persisted in browser **LocalStorage**, allowing offline operation across sessions. The application features full CRUD operations (Create, Read, Update, Delete), multi-criteria real-time filtering (by category, date range, and title), multi-attribute sorting, comprehensive spending summaries with visual distribution graphs, quick date range presets, export to CSV capability, and a specialized mobile-responsive layout that transforms desktop data tables into touch-friendly cards.

---

## 2. Assessment Objectives & Key Deliverables

### 2.1 Core Learning Objectives
- **DOM Manipulation:** Dynamically creating, updating, and removing DOM nodes in real time without triggering page reloads.
- **Event Handling:** Implementing submit handlers, input debouncing, click events, keyboard shortcuts (<kbd>Esc</kbd>), and event delegation.
- **Data Structures:** Modeling financial transactions as structured JavaScript objects within managed arrays.
- **Array Methods:** Proficient use of functional JavaScript array methods including `Array.prototype.filter()`, `Array.prototype.sort()`, `Array.prototype.reduce()`, `Array.prototype.find()`, and `Array.prototype.findIndex()`.
- **Client-Side Persistence:** Serialization (`JSON.stringify`) and deserialization (`JSON.parse`) using the browser `localStorage` API.
- **Form Handling & Validation:** Client-side input validation and error feedback before persisting records.
- **Responsive UI/UX Design:** Implementing modern CSS Grid, Flexbox, custom form controls, and adaptive viewports.

### 2.2 Deliverables Compliance Matrix

| Deliverable (from Assessment) | Implementation Status | Technical Details |
| :--- | :---: | :--- |
| **Expense Entry Form** | **Completed** | Form containing Title, Amount (₹), Category (Combobox Input), and Date (Calendar Modal). Includes inline error validation. |
| **Expense Listing** | **Completed** | Dynamic table listing showing Date, Title, Color-Coded Category pill, bold Currency, and Actions. Converts to cards on mobile. |
| **Edit & Delete Functionality** | **Completed** | Full edit state with form population and "Cancel" toggle. Delete functionality includes confirmation prompts. |
| **Category Filtering** | **Completed** | Custom mobile-responsive dropdown menu dynamically synchronized with all user-created categories. |
| **Date Filtering** | **Completed** | Date interval filtering (From Date & To Date) via a custom responsive calendar modal + Quick Preset buttons. |
| **Total Expense Calculation** | **Completed** | Real-time calculation of Overall Total, Filtered Total, and Top Spending Category using `reduce()`. |
| **LocalStorage Persistence** | **Completed** | Fully persists additions, edits, and deletions with preloaded starter data for first-time evaluation. |
| **Responsive UI** | **Completed** | 100% fluid mobile view with table-to-card transformation, 44px touch targets, and zero iOS input zoom. |
| **README & Documentation** | **Completed** | Comprehensive technical documentation, architecture guide, and setup instructions. |

---

## 3. Technology Stack & Architectural Overview

### 3.1 Technology Stack
- **HTML5:** Semantic document markup (`<header>`, `<main>`, `<aside>`, `<section>`, `<table>`, `<dialog>/modal`).
- **CSS3:** Custom CSS variables (design system tokens), CSS Grid, Flexbox, CSS transforms, media queries (`@media`), custom scrollbars, and keyframe animations.
- **Vanilla JavaScript (ES6+):** Strict standard compliance (arrow functions, template literals, destructuring, modules, event listeners, Intl formatting). Zero external libraries or frameworks (no React, no jQuery, no Bootstrap).
- **LocalStorage API:** Synchronous key-value offline storage.
- **Git & GitHub:** Distributed version control with structured commit history.

### 3.2 Component Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                        App Container (index.html)                      │
├────────────────────────────────────────────────────────────────────────┤
│ 1. Header (Brand, Logo, Subtitle)                                      │
├────────────────────────────────────────────────────────────────────────┤
│ 2. Summary Dashboard Cards (Total, Filtered Total, Top Category)       │
├────────────────────────────────────────────────────────────────────────┤
│ 3. Category Spending Breakdown Bar (Dynamic Percentage Distribution)   │
├───────────────────────────────────┬────────────────────────────────────┤
│ 4. Form Subsystem (Left Column)   │ 5. Filter & List Subsystem (Right) │
│    - Title Input                  │    - Keyword Search Input          │
│    - Amount Input (₹)             │    - Custom Category Dropdown      │
│    - Custom Combobox Category     │    - Responsive Calendar Filters   │
│    - Responsive Date Selector     │    - Quick Date Preset Buttons     │
│    - Submit & Cancel Actions      │    - Custom Sort-By Dropdown       │
│                                   │    - Expense Records (Table/Cards) │
│                                   │    - CSV Export Engine             │
├───────────────────────────────────┴────────────────────────────────────┤
│ 6. Global Responsive Calendar Modal (Month/Year Nav, Day Grid, Actions)│
└────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Key Functional Subsystems

### 4.1 Data Modeling
Each expense entry is represented as an immutable JavaScript object:
```javascript
{
  id: "exp-1731128400000",          // Unique timestamp-based ID
  title: "Weekly Groceries",        // String (sanitized, min 2 chars)
  amount: 2450.00,                  // Positive float (INR)
  category: "Food & Dining",        // String (predefined or custom)
  date: "2026-11-09"                // ISO Date string (YYYY-MM-DD)
}
```

### 4.2 Form Validation Engine
Validates all fields before any mutation:
1. **Title Validation:** Required, trimmed length $\ge 2$ characters.
2. **Amount Validation:** Required, numeric, strictly $> ₹0.00$.
3. **Category Validation:** Required, non-empty string.
4. **Date Validation:** Required, valid YYYY-MM-DD format.
5. **Real-Time Clearing:** Input listeners automatically dismiss error states as soon as the user starts typing or selects a valid value.

### 4.3 Custom Mobile-Responsive Dropdown System
To eliminate the issue of native browser `<select>` popups overflowing narrow containers and card borders on mobile viewports:
- Engineered a custom dropdown element bounded to `width: 100%; max-width: 100%;`.
- Implemented **Smart Drop-Up Detection**: If the dropdown is near the bottom of the viewport where downward space is insufficient ($< 220\text{px}$), the component automatically positions itself upward (`.drop-up`).
- Integrated smooth touch scrolling with `overscroll-behavior: contain`.

### 4.4 Custom Mobile-Responsive Calendar Engine
To resolve desktop and mobile browser calendar popups clipping outside card boundaries:
- Engineered an interactive, modal-based calendar dialog (`#custom-calendar-modal`).
- Supports Month/Year navigation (`◀` and `▶`), day grid rendering with day-of-week alignment, today indicator, active selection highlights, and quick "Today" / "Clear" actions.
- Automatically handles date selection for the expense form and both date range filters (*From Date* / *To Date*).

### 4.5 Analytical & Calculations Engine
The analytics engine leverages `Array.prototype.reduce()` to compute live metrics:
- **Total Expenditure:** $\sum \text{amount}_i$ across all stored records.
- **Filtered Total:** $\sum \text{amount}_j$ across records matching active filter conditions.
- **Top Spending Category:** Aggregates spending per category, identifies the category with the highest expenditure, and displays both the name and amount spent.
- **Category Distribution Breakdown:** Computes the exact percentage of each category relative to total spending and renders a multi-segmented visual bar with color-coded legend tags.

### 4.6 Filtering & Sorting Engine
Employs functional composition for multi-criteria filtering:
- **Keyword Search:** Matches substring case-insensitively against the expense title.
- **Category Filter:** Matches exact category or passes all when set to `"all"`.
- **Date Interval Filter:** Compares ISO date strings: $\text{startDate} \le \text{date} \le \text{endDate}$.
- **Multi-Attribute Sort:**
  - Date Newest First (`b.date.localeCompare(a.date)`)
  - Date Oldest First (`a.date.localeCompare(b.date)`)
  - Amount Highest First (`b.amount - a.amount`)
  - Amount Lowest First (`a.amount - b.amount`)
  - Title Alphabetical (`a.title.localeCompare(b.title)`)

### 4.7 Export to CSV Engine
Generates dynamic RFC 4180-compliant CSV data directly in the browser:
- Builds headers and escapes double quotes in expense titles.
- Creates an in-memory `Blob` with MIME type `text/csv;charset=utf-8;`.
- Generates a temporary object URL and triggers an automated download named `expenses_YYYY-MM-DD.csv`.

---

## 5. UI/UX & Mobile Responsiveness Design

### 5.1 Mobile Card Transformation ($\le 640\text{px}$)
Traditional tables cause horizontal overflow on mobile screens. To solve this, the application uses CSS:
- Tables hide standard table headers (`display: none`).
- Each table row (`<tr>`) transforms into a standalone card container with a subtle shadow and border.
- Each cell (`<td>`) displays as a flex row with `data-label` attributes rendered on the left via `::before` pseudo-elements and formatted values right-aligned.
- Action buttons expand across the bottom of each card with full-width tap targets.

### 5.2 Accessibility & Mobile Best Practices
- **44px Touch Targets:** All interactive inputs, buttons, and dropdown triggers have a minimum height of $44\text{px}$, fulfilling WCAG 2.1 touch accessibility requirements.
- **iOS Zoom Prevention:** Font sizes on all inputs and selects are explicitly set to $\ge 16\text{px}$ to prevent iOS Safari from automatically zooming into the page.
- **Keyboard Navigation:** Full support for <kbd>Esc</kbd> to exit edit mode, close the calendar modal, or close open dropdowns.

---

## 6. Verification & Testing Results

| Test Category | Test Case Description | Expected Result | Status |
| :--- | :--- | :--- | :---: |
| **Validation** | Submit empty form | Displays 4 inline error messages; prevents save | **Passed** |
| **Validation** | Negative or ₹0 amount | Displays "amount greater than ₹0.00" error | **Passed** |
| **CRUD** | Add new expense | Appends to list, updates totals, saves to LocalStorage | **Passed** |
| **CRUD** | Edit existing expense | Pre-fills form, enters edit state, updates record on save | **Passed** |
| **CRUD** | Cancel editing | Resets form to "Add Expense", restores default date | **Passed** |
| **CRUD** | Delete expense | Displays confirm dialog; removes item and updates UI | **Passed** |
| **Filtering** | Filter by Category | Shows only matching items; recalculates filtered sum | **Passed** |
| **Filtering** | Date Range filter | Shows only items within selected From/To dates | **Passed** |
| **Filtering** | Quick Date Presets | Single tap sets date range (Today, Week, Month, All) | **Passed** |
| **Sorting** | Sort by amount desc | Orders items highest to lowest amount | **Passed** |
| **Mobile View** | Viewport at 375px | Converts table to receipt cards; zero horizontal overflow | **Passed** |
| **Dropdowns** | Open in narrow viewport | Stays within card width; opens upward if near bottom | **Passed** |
| **Date Modal** | Open on mobile | Centered modal popover; no clipping outside screen | **Passed** |
| **CSV Export** | Click Export CSV | Downloads formatted `.csv` file with current records | **Passed** |

---

## 7. Version Control History

The project was developed incrementally using Git. The commit log reflects key milestones:

```
* 8b33548 fix: replace native datalist with reliable custom mobile-responsive category dropdown
* b40f936 fix: resolve dropdown clipping and scrolling with overflow visible and smart drop-up
* 3d4dc35 feat: implement mobile-responsive custom dropdowns and custom calendar date picker
* 5ca989c feat: convert Category select dropdown to freeform input field with datalist suggestions
* 6b5551c feat: complete mobile-responsive card transformation and UI polish
* b6d03e4 feat: switch currency from USD to Indian Rupees (INR - ₹)
* 0e975d3 docs: add comprehensive README documentation
* 1667937 Initial commit: Interactive Expense Tracker Web Application
```

---

## 8. Conclusion

The **Interactive Expense Tracker Web Application** successfully fulfills all assessment specifications and incorporates significant UX improvements:
1. Complete Vanilla JS implementation demonstrating DOM manipulation, object handling, array methods, and local storage persistence.
2. Robust input validation and error feedback.
3. Clean Indian Rupee (`₹`) financial formatting.
4. Professional mobile-responsive architecture with zero overflow or clipping issues.
5. Production-ready documentation and version control.

**Report Compiled On:** November 9, 2026  
**Status:** Approved for Submission & Assessment Evaluation
