# Interactive Expense Tracker Web Application

> **A production-grade, lightweight, and fully responsive personal finance web application built with 100% pure HTML5, CSS3, and Vanilla JavaScript (ES6+) with zero external libraries or build tools.**

---

## 📌 Project Information

- **Organization:** Veda Technology
- **Project Name:** Interactive Expense Tracker Web Application
- **Version:** `v1.2.0`
- **Initial Release Date:** November 09, 2026 (`v1.0.0`)
- **Latest Feature Update:** November 10, 2026 (`v1.2.0`)
- **Assessment Scope:** Multi-Section Responsive Portal & Mobile UI Engineering
- **Regional Hub:** Lakhisarai, Bihar, India
- **Verification Status:** `100% Completed & Verified`
- **External Dependencies:** **None (Zero runtime or build dependencies)**

---

## 📋 Executive Summary

This official engineering documentation outlines the design, architecture, progressive feature deliverables, and verification audits for the **Veda Technology Interactive Expense Tracker** web portal. Delivered on **November 09, 2026 (`v1.0.0`)** and upgraded with advanced risk control, reporting, and theming capabilities on **November 10, 2026 (`v1.2.0`)**, the project strictly complies with the requirement for **100% pure HTML5, CSS3, and modern Vanilla JavaScript (ES6+)** with zero external libraries or build tooling.

The platform provides an end-to-end personal finance management suite featuring:
- **Core Financial Tracking:** Real-time expense creation, editing, deletion, and persistent offline `localStorage` caching formatted in Indian Rupees (INR ₹).
- **Dynamic Risk & Budget Control:** Live monthly budget goal tracking, real-time progress calculation, and a 3-tier visual alert indicator (🟢 Safe `< 75%`, 🟡 Caution `75%–99.9%`, 🚨 Critical Over-Budget `≥ 100%`).
- **Zero-Dependency PDF Export:** Native client-side binary PDF 1.4 stream generator producing formatted, multi-page financial audit reports (`Expense_Report_YYYY-MM-DD.pdf`).
- **Ergonomic Design & Custom Controls:** Unified 5-column horizontal filter and sort tool-strip, hybrid category combobox, interactive calendar modal with quick date range pills, and sleek 32px space-efficient form inputs.
- **Universal Accessibility & Responsive Parity:** Seamless Dark/Light mode switching with OS preference auto-detection, fluid table-to-card mobile transformation, and verified WCAG 2.1 AA compliance across mobile, tablet, and desktop displays.

---

## 📅 Feature Release Timeline & Changelog

| Feature | Date Added | Category | Status | Details |
| :--- | :--- | :--- | :---: | :--- |
| **Smart Expense Entry Form** | November 09, 2026 | Core CRUD & Validation | ✅ Production | Form with regex validation, instant error recovery, and Indian Rupee formatting |
| **Hybrid Category Combobox** | November 09, 2026 | UI / Input Components | ✅ Production | Freeform text typing + tap-to-select suggestion dropdown with emoji tags |
| **Interactive Date Picker Modal** | November 09, 2026 | UI / Dialogs | ✅ Production | Custom calendar modal with month/year navigation & quick clear/today buttons |
| **Quick Date Range Presets** | November 09, 2026 | Filtering Engine | ✅ Production | One-tap filter pills for All Dates, Today, This Week, and This Month |
| **Live Financial Metric Cards** | November 09, 2026 | Analytics & Metrics | ✅ Production | Dynamic summary counters for Total Spend, Budget, Filtered Total, and Top Category |
| **Visual Category Spending Breakdown** | November 09, 2026 | Visualizations | ✅ Production | Multi-colored proportional progress bar displaying spending percentage per category |
| **Offline LocalStorage Persistence** | November 09, 2026 | Data Storage | ✅ Production | Client-side Web Storage caching transactions, custom categories, filters, and theme |
| **Table-to-Card Mobile Responsive UI** | November 09, 2026 | Responsive Layout | ✅ Production | Dense tabular records convert into touch-friendly stacked cards on mobile (<640px) |
| **Smart Drop-Up Positioning** | November 09, 2026 | UX / Positioning | ✅ Production | Custom dropdowns calculate viewport boundaries and open upwards near bottom edges |
| **Light / Dark Mode System** | **November 10, 2026** | Theme & Personalization | ✅ Production | Integrated header toggle, system auto-detection, and persistent dark slate CSS palette |
| **Monthly Budget Target & Live Alerts** | **November 10, 2026** | Budgeting & Risk Control | ✅ Production | Configurable spending limit, live progress bar, 3-tier status alerts, and edit modal |
| **Zero-Dependency PDF Export Engine** | **November 10, 2026** | Reporting & Export | ✅ Production | Pure client-side binary PDF 1.4 stream generator producing formatted audit reports |
| **Horizontal 5-Column Filter & Sort Strip**| **November 10, 2026** | UX / Filter Layout | ✅ Production | Unified desktop grid aligning Search, Category, Dates, and Sort By in one row |
| **Compact Sleek UI & Space Optimization** | **November 10, 2026** | UI Refinement | ✅ Production | Space-efficient 10px padding, 32px inputs, zero label truncation, and 320px sidebar |

---

## 🚀 Key Features & Capabilities

### 1. 📝 Smart Expense Entry Form *(Added: November 09, 2026)*
- **Form Fields:** Expense Title, Amount in Indian Rupees (₹), Category (Custom Combobox), and Expense Date.
- **Auto-Date:** Automatically defaults to today's date (`YYYY-MM-DD`).
- **Real-Time Regex Validation:**
  - **Title:** Minimum 2 characters, non-empty, max 60 characters.
  - **Amount:** Positive number greater than ₹0.00 with 2-decimal precision.
  - **Category:** Valid category selection or custom input, max 40 characters.
  - **Date:** Valid calendar date format (`YYYY-MM-DD`).
- **Inline Error Feedback:** Dynamic error messages and red border highlights with automatic recovery on keystroke.

### 2. 🎛️ Hybrid Category Combobox *(Added: November 09, 2026)*
- Combines the flexibility of **freeform text input** with an interactive **suggestion dropdown**.
- Features a dedicated down-arrow toggle button (`▾`) and tap-to-select suggestions with emoji indicators (🍔 *Food & Dining*, 🚗 *Transportation*, 💡 *Housing & Utilities*, 🎬 *Entertainment*, 💊 *Healthcare*, 🛍️ *Shopping*, 📦 *Other*).
- Full mobile touch parity ensuring suggestions open reliably on tap without native datalist browser clipping.

### 3. 📅 Interactive Date Selection Modal & Quick Presets *(Added: November 09, 2026)*
- Replaces native inputs with an accessible **calendar popup modal** complete with month/year navigation, date grid selection, "Clear", and "Today" quick buttons.
- **One-Tap Quick Range Presets:**
  - **All Dates** — Reset filters to view all historical transactions.
  - **Today** — Filter expenses recorded on the current date.
  - **This Week** — Filter expenses recorded from Monday through Sunday of the current week.
  - **This Month** — Filter expenses recorded within the active calendar month.

### 4. 🌓 Light / Dark Mode System *(Added: November 10, 2026)*
- **One-Tap Theme Switcher:** Integrated header toggle button with smooth CSS transitions (`☀️ Light Mode` / `🌙 Dark Mode`).
- **Auto-Detection & Persistence:** Automatically detects system preference (`prefers-color-scheme: dark`) on initial load and persists user preference across browser sessions in `localStorage` under `interactive_expenses_theme`.
- **High-Contrast Palette:** Dark slate & navy tokens designed for low eye fatigue while maintaining WCAG 2.1 AA accessibility ratios.
- **Flawless Theme Integration:** Full CSS variable tokenization (`--bg-body`, `--bg-card`, `--bg-input`, `--border-color`, `--text-main`, `--text-muted`) across all metric cards, inputs, tables, dropdowns, and modal dialogs.

### 5. 🎯 Monthly Budget Target & Live Over-Budget Alerts *(Added: November 10, 2026)*
- **Configurable Spending Goal:** Users can define and update their monthly budget limit (default ₹25,000) stored in `localStorage` (`interactive_expenses_monthly_budget`).
- **Live Status & Visual Progress Bar:** Real-time calculation of current month's expenditure, remaining balance, and utilization percentage.
- **Dynamic 3-Tier Alert System:**
  - 🟢 **Safe / On Track (`< 75%`):** Calm green progress indicator and encouraging status message.
  - 🟡 **Caution / Warning (`75% – 99.9%`):** Amber highlight alerting users to limited remaining funds.
  - 🚨 **Over-Budget / Critical (`≥ 100%`):** High-visibility red alert banner with pulsing indicator and negative deficit tracking.
- **Inline Modal Editor:** Tap the "✏️ Edit" button anytime to quickly adjust the target budget without leaving the dashboard.

### 6. 📄 Zero-Dependency PDF Export Engine *(Added: November 10, 2026)*
- **Client-Side Binary PDF 1.4 Generation:** Replaced CSV export with an in-house JavaScript binary stream generator (`generateExpensePDF`) requiring zero third-party dependencies.
- **Executive Audit Layout:** Automatically formats and downloads `Expense_Report_YYYY-MM-DD.pdf` featuring:
  - Veda Technology header branding and generation timestamp.
  - Financial overview scorecard (Total Spending, Monthly Budget, Filtered Total, Top Category).
  - Clean formatted tabular ledger with column headers, currency symbols, and multi-page pagination.
- **Native Print Ready:** Includes dedicated `@media print` rules for direct browser printing and fallback PDF creation.

### 7. 📐 Horizontal 5-Column Filter & Sort Strip *(Added: November 10, 2026)*
- **Side-by-Side Filter Architecture:** Realigned the filter controls into a unified 5-column desktop grid (`repeat(5, minmax(0, 1fr))`) placing **Sort By** right next to the date inputs on a single horizontal row.
- **Non-Clipping Right-Aligned Menu:** The Sort By dropdown automatically anchors to the right edge (`left: auto; right: 0; min-width: 175px`) to prevent edge overflow.
- **Multi-Factor Sorting:** Sort by Date (Newest/Oldest), Amount (Highest/Lowest), or Title (A to Z).

### 8. 🎨 Compact Sleek UI & Space Optimization *(Added: November 10, 2026)*
- **Space-Efficient Card Layout:** Reduced card header padding (`10px 16px`), title typography (`0.95rem`), and control heights (`32px`–`33px`) across both the "Filter & Sort Expenses" strip and the "Add New Expense" form.
- **Zero Label Truncation:** Carefully tuned typography (`0.76rem`–`0.8rem`) and inner padding ensuring option labels like "Date: Newest First" display completely without truncation.
- **Optimized 320px Sidebar:** Adjusted layout grid to `320px 1fr`, giving the central financial ledger and analytics cards maximum horizontal breathing room.

### 9. 📱 100% Mobile-Responsive Design & Smart Dropdowns *(Added: November 09, 2026)*
- **Table-to-Card Transformation:** On viewports narrower than `640px`, tabular records automatically convert into touch-friendly stacked cards with high-contrast labels and $\ge 44\text{px}$ action buttons.
- **Smart Upward Opening (`drop-up`):** Custom dropdowns calculate viewport boundaries and open upwards when positioned near the bottom of the screen to prevent clipping and scrolling issues.
- **Outside Click & Escape Dismissal:** All dropdowns and modal dialogs close cleanly when clicking outside or pressing <kbd>Esc</kbd>.

### 10. 💳 Live Financial Dashboard Metrics *(Added: November 09, 2026)*
- **Total Expenses:** Instant sum of all recorded transactions formatted in Indian Rupees (INR `₹`).
- **Monthly Budget Metric Card:** Displays remaining funds or over-budget amounts with utilization percentage.
- **Filtered Total:** Live total reflecting current search keyword, category, and date range filters.
- **Top Spending Category:** Dynamically computes the category with the highest aggregate expenditure.
- **Visual Category Breakdown:** Proportional progress bars displaying percentage share and amount per category.

### 11. 🔄 Full CRUD Lifecycle & LocalStorage Persistence *(Added: November 09, 2026)*
- **Create:** Add new transactions with immediate dashboard and list recalculation.
- **Read:** Multi-criteria filtered and sorted transaction views.
- **Update:** Seamless inline edit loading existing data into the form with an active "Editing" badge and a "Cancel" button.
- **Delete:** Safe record removal with a confirmation dialog.
- **Offline Persistence:** All expenses, filters, themes, budgets, and custom categories persist in the browser's `localStorage` across page reloads and browser restarts.

---

## 🛡️ Form Validation & Error Handling Matrix

| Field | Input Control | Validation Rule | Error Feedback Message |
| :--- | :--- | :--- | :--- |
| **Title / Description** | Text Input | Non-empty, $\ge 2$ characters, max 60 chars | *"Please enter a valid title (min 2 characters)"* |
| **Amount (₹)** | Number Input | Numeric, positive value $> \text{₹}0.00$, max 2 decimals | *"Please enter a valid amount greater than ₹0.00"* |
| **Category** | Combobox (Text + Select) | Non-empty, max 40 characters | *"Please select or enter a category"* |
| **Date** | Calendar Modal / Text | Valid date format `YYYY-MM-DD` | *"Please select a valid date"* |
| **Monthly Budget** | Modal Number Input | Numeric, positive value $> \text{₹}0.00$ | *"Please enter a valid budget target amount"* |

---

## 📖 User Workflow & Operation Guide

### 1. Recording a New Expense
1. Enter the expense description in the **Title / Description** field (e.g., *"Grocery shopping"*).
2. Enter the amount in Indian Rupees in the **Amount (₹)** field (e.g., *"2500"*).
3. Select an existing category from the dropdown or type a new custom category directly into the combobox.
4. Select the transaction date using the calendar picker (defaults to today's date).
5. Click **➕ Add Expense**. The expense is logged, summary cards recalculate, and the record appears in the ledger.

### 2. Modifying or Deleting an Expense
- **Edit Record:** Click the **✏️ Edit** button on any table row or mobile card. The form loads the transaction values, displays an amber **"Editing"** badge, and enables an optional **"Cancel"** button.
- **Delete Record:** Click the **🗑️ Delete** button on any row. An accessible confirmation dialog prevents accidental data loss.

### 3. Managing Monthly Budget & Live Alerts
1. Click the **✏️ Edit** link on the Monthly Budget overview card.
2. Enter your spending target limit in the modal (e.g., `₹50,000.00`) and click **Save Budget Target**.
3. The live banner instantly computes active month spending, remaining funds, and sets the alert state:
   - 🟢 **Safe:** Spent $< 75\%$ of budget.
   - 🟡 **Caution:** Spent between $75\%$ and $99.9\%$.
   - 🚨 **Over-Budget:** Spent $\ge 100\%$, showing negative deficit in red.

### 4. Filtering and Sorting Expenses
- **Search Title:** Type any keyword into the search field for real-time keystroke filtering.
- **Filter Category:** Filter by any standard category or custom category created in this session.
- **Date Range:** Set custom **From Date** and **To Date** intervals.
- **Sort By:** Select sort order (Date Newest/Oldest, Amount Highest/Lowest, Title A–Z) directly next to the date fields.
- **Quick Range Presets:** Click **Today**, **This Week**, or **This Month** to instantly apply date filters.
- **Reset Filters:** Click **Reset Filters** to restore all filter controls to default.

### 5. Exporting Financial Audit Reports
- Click the **📄 Export PDF** button in the ledger header.
- An official, multi-page PDF document (`Expense_Report_YYYY-MM-DD.pdf`) is instantly generated client-side and downloaded without third-party libraries.

---

## 🛠️ Technology Stack

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Markup** | HTML5 | Clean semantic structure (`header`, `main`, `section`, `table`, `dialog`) with accessible ARIA landmarks. |
| **Styling** | CSS3 | Responsive CSS Grid, Flexbox layout, CSS custom properties (variables), smooth animations, and mobile media queries. |
| **Logic** | Vanilla JavaScript (ES6+) | Modern ES6 modules, array methods (`.filter()`, `.sort()`, `.reduce()`), event delegation, and Web Storage API. |
| **Export** | Native JS PDF 1.4 | Client-side pure binary PDF generator stream without external dependencies. |
| **External Dependencies** | **None (Zero)** | 100% self-contained codebase without jQuery, React, Bootstrap, or NPM build tools. |

---

## 📁 System Architecture & Flat File Structure

```
Interactive_Expense_Tracker/
├── index.html       # Single-page portal: semantic layout, dashboard cards, custom controls & modal dialogs
├── style.css        # Responsive styling: layout grids, dark/light theme tokens, compact controls & animations
├── script.js        # Core engine: state management, validation, calendar modal, filters, live budget & PDF export
└── README.md        # Technical assessment documentation, release timeline, and user guide
```

---

## 💻 Quick Start Guide

### Zero-Build Deployment
No Node.js, npm, webpack, or server dependencies are required. Simply open `index.html` in any modern web browser:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/Interactive_Expense_Tracker.git
   cd Interactive_Expense_Tracker
   ```

2. **Launch in Browser:**
   - **Windows:** Double-click [`index.html`](file:///e:/Veda-Technology/Interactive_Expense_Tracker/index.html) or run in PowerShell:
     ```powershell
     Start-Process "index.html"
     ```
   - **macOS:**
     ```bash
     open index.html
     ```
   - **Linux:**
     ```bash
     xdg-open index.html
     ```

---

## 🧪 Core Implementation Highlights

### 1. Multi-Criteria Filtering Engine (`script.js`)
```javascript
const filtered = expenses.filter(item => {
  const matchesSearch = !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());
  const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
  const matchesStart = !startDate || item.date >= startDate;
  const matchesEnd = !endDate || item.date <= endDate;
  return matchesSearch && matchesCategory && matchesStart && matchesEnd;
});
```

### 2. Live Monthly Budget & Over-Budget Alert Calculation (`script.js`)
```javascript
// Calculate spending for current active calendar month
const currentYearMonth = new Date().toISOString().slice(0, 7);
const monthExpenses = expenses.filter(e => e.date && e.date.startsWith(currentYearMonth));
const currentMonthSpent = monthExpenses.reduce((sum, e) => sum + e.amount, 0);
const budgetPct = monthlyBudgetTarget > 0 ? (currentMonthSpent / monthlyBudgetTarget) * 100 : 0;
const budgetRemaining = monthlyBudgetTarget - currentMonthSpent;
```

### 3. Client-Side Pure PDF 1.4 Binary Generator (`script.js`)
```javascript
// Zero-dependency pure client-side PDF document stream assembly
function generateExpensePDF(records, total, meta) {
  let pdf = '%PDF-1.4\n';
  // Builds PDF catalog, info dictionary, page tree, font definitions, and content stream
  // Generates formatted header, scorecard, expense ledger, and page footers
  const blob = new Blob([pdfContent], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  // Auto-downloads Expense_Report_YYYY-MM-DD.pdf
}
```

### 4. Smart Upward Dropdown Positioning (`script.js`)
```javascript
// Automatically open upward if within 250px of bottom viewport
const rect = menu.getBoundingClientRect();
const spaceBelow = window.innerHeight - rect.top;
if (spaceBelow < 250) {
  menu.classList.add('drop-up');
} else {
  menu.classList.remove('drop-up');
}
```

---

## ♿ Accessibility & Browser Compatibility

- **WCAG 2.1 AA Compliant:** Keyboard navigation with visible focus rings, ARIA roles (`role="combobox"`, `role="dialog"`, `aria-expanded`, `aria-label`), and contrast ratios $> 4.5:1$ in both light and dark modes.
- **Cross-Browser Verified:** Fully tested and operational on Google Chrome, Microsoft Edge, Mozilla Firefox, and Apple Safari.
- **Mobile Tested:** Fluid rendering verified on viewports ranging from `320px` (small mobile) through `1440px+` (ultra-wide desktop).

---

## 📄 License
Developed for **Veda Technology** educational and production assessment purposes. Released under the MIT License.
