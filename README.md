# Interactive Expense Tracker Web Application

> **A production-grade, lightweight, and fully responsive personal finance web application built with 100% pure HTML5, CSS3, and Vanilla JavaScript (ES6+) with zero external libraries or build tools.**

---

## 📌 Project Information

- **Organization:** Veda Technology
- **Project Name:** Interactive Expense Tracker Web Application
- **Version:** `v1.4.0`
- **Initial Release Date:** November 09, 2026 (`v1.0.0`)
- **Latest Feature Update:** November 12, 2026 (`v1.4.0`)
- **Assessment Scope:** Multi-Section Responsive Portal & Mobile UI Engineering
- **Regional Hub:** Lakhisarai, Bihar, India
- **Verification Status:** `100% Completed & Verified`
- **External Dependencies:** **None (Zero runtime or build dependencies)**

---

## 📋 Executive Summary

This official engineering documentation outlines the design, architecture, progressive feature deliverables, and verification audits for the **Veda Technology Interactive Expense Tracker** web portal. Initially released on **November 09, 2026 (`v1.0.0`)**, enhanced with dark mode, live budgeting, compact UI, and client-side PDF export on **November 10, 2026 (`v1.2.0`)**, expanded with pure SVG analytics, recurring bill reminders, and non-blocking undo/bulk tools on **November 11, 2026 (`v1.3.0`)**, and strengthened with **full JSON/CSV data backup, restore & import** alongside **1-click Quick-Add favorite templates** on **November 12, 2026 (`v1.4.0`)**, the project strictly complies with **100% pure HTML5, CSS3, and modern Vanilla JavaScript (ES6+)** with zero external libraries or build tooling.

The platform provides an end-to-end personal finance management suite featuring:
- **Core Financial Tracking:** Real-time expense creation, editing, deletion, and persistent offline `localStorage` caching formatted in Indian Rupees (INR ₹).
- **Quick-Add Favorite Templates:** 1-click pinned expense chips above the entry form (e.g., *Morning Coffee ₹60*) for instant daily logging and customizable template pinning.
- **Data Backup, Restore & Import (`.json` / `.csv`):** Drag-and-drop restore modal with live row preview, duplicate detection, Merge/Replace options, RFC-4180 CSV spreadsheet export, and 5-second Undo protection.
- **Dynamic Risk & Budget Control:** Live monthly budget goal tracking, real-time progress calculation, and a 3-tier visual alert indicator (🟢 Safe `< 75%`, 🟡 Caution `75%–99.9%`, 🚨 Critical Over-Budget `≥ 100%`).
- **Interactive SVG Analytics & Charts:** Zero-library pure SVG category donut chart with hover readouts & click-to-filter support alongside a `7 Days` / `6 Months` spending trend bar chart.
- **Recurring Bills & Reminders:** Weekly/Monthly expense scheduling, upcoming 7-day bill reminder alerts, optional startup auto-logging, and a dedicated manager modal.
- **Non-Blocking Undo & Bulk Actions:** Floating 5-second Undo toast alerts for safe instant deletions, multi-select row checkboxes, **Export Selected PDF**, and **Delete Selected**.
- **Zero-Dependency PDF Export & Theme Parity:** Client-side binary PDF 1.4 report generation (`Expense_Report_YYYY-MM-DD.pdf`), Dark/Light theme switching, fluid mobile card transformation, and verified WCAG 2.1 AA accessibility.

---

## 🧭 Project Approach (In Simple Words)

- **Keep It 100% Pure & Lightweight:** Instead of heavy frameworks or external packages, everything is written in plain HTML, CSS, and JavaScript so the app opens instantly and never breaks due to outside updates.
- **Work Offline Without Any Server:** Every expense, monthly budget limit, recurring bill, template, and theme choice is stored safely inside the browser's `localStorage`—no database or login setup is needed.
- **Make Daily Tracking Fast & Stress-Free:** Users can log common expenses in one click using **Quick-Add Templates**, catch upcoming bills with **Recurring Reminders**, and safely fix mistakes using **5-second Undo alerts** instead of annoying browser popups.
- **Protect & Export User Data Easily:** Users can back up everything into a `.json` file, import/export `.csv` spreadsheets, or generate formatted `.pdf` reports directly in the browser.
- **Design for Every Screen:** On laptops everything stays compact and organized in one view; on mobile phones tables turn smoothly into easy-to-tap cards with both Light and Dark modes.

---

## 🎯 Project Outcome

- **Instant Ready-to-Use Expense Tracker:** Opens in any browser with zero installation and tracks all spending cleanly in Indian Rupees (`₹`).
- **Clear Spending Visibility:** Live budget warning bars, pure SVG donut charts, and 7-day / 6-month trend bars show exactly where money is going at a glance.
- **Zero Accidental Data Loss:** Combined 5-second Undo recovery, duplicate-safe CSV/JSON import, and full JSON backups keep user records completely safe.
- **Zero Hosting Cost:** Runs 100% on static files, making it free and effortless to host anywhere (GitHub Pages, Netlify, Vercel) or use straight from a local folder.

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
| **Visual Analytics & Pure SVG Charts** | **November 11, 2026** | Analytics & Visualizations | ✅ Production | Interactive SVG Donut chart + 7-Day / 6-Month spending trend bar chart with tooltips |
| **Recurring Expenses & Bill Reminders** | **November 11, 2026** | Automation & Scheduling | ✅ Production | Weekly/Monthly repeat toggle, due bill alert banner, auto-log & manager modal |
| **Toast Alerts, Undo Delete & Bulk Actions**| **November 11, 2026** | Productivity & UX | ✅ Production | Non-blocking 5s Undo toasts, multi-select checkboxes, Bulk Delete & Export Selected PDF |
| **Data Backup, Restore & Import** | **November 12, 2026** | Data Portability & Safety | ✅ Production | JSON full backup, CSV export, drag-and-drop restore with preview & duplicate check |
| **Quick-Add Favorite Templates** | **November 12, 2026** | Speed & Daily Ergonomics | ✅ Production | 1-click pinned expense chips with custom pinning (+ Pin Current) and Undo support |

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

### 12. 📊 Visual Analytics & Pure SVG Charts *(Added: November 11, 2026)*
- **Interactive SVG Donut Chart:** Renders proportional category slices with smooth hover highlighting, live center total/category readout, and one-click slice-to-filter integration.
- **Spending Trend Bar Chart (`7 Days` / `6 Months`):** Pure SVG vertical bar chart with theme-aware gridlines, Month-over-Month percentage comparison badge, and interactive hover tooltips.

### 13. 🔁 Recurring Expenses & Bill Reminders *(Added: November 11, 2026)*
- **Form Repeat Selector:** Schedule new expenses as **One-time**, **Weekly**, or **Monthly** using compact toggle pills directly in the entry form.
- **Upcoming Bill Reminders Strip:** Alerts you when recurring bills are overdue or due within 7 days with a one-click **✓ Log Next Due** action.
- **Recurring Bills Manager Modal:** View active/paused schedules, pause or resume reminders, log due bills manually, delete schedules with Undo, or toggle automatic logging on startup.

### 14. ↩️ Non-Blocking Toast Alerts, Undo Delete & Bulk Actions *(Added: November 11, 2026)*
- **Floating Toast System:** Replaces blocking browser `alert()` / `confirm()` popups with animated corner toasts displaying a countdown bar.
- **Instant 5-Second Undo Delete:** Deleting any single transaction, clearing all records, or running bulk delete shows an interactive **↩️ Undo** button restoring items back to their exact positions.
- **Multi-Select Checkboxes & Bulk Bar:** Select individual rows or toggle all visible entries via `#select-all-checkbox` (supporting indeterminate state) to **Export Selected PDF** or **Delete Selected** at once.

### 15. 💾 Data Backup, Restore & Import (`.json` / `.csv`) *(Added: November 12, 2026)*
- **Full JSON Snapshot Backup:** Export all expenses, monthly budget target, recurring schedules, favorite templates, and theme preferences into `Expense_Backup_YYYY-MM-DD.json`.
- **Spreadsheet CSV Export & Import:** Download clean RFC-4180 spreadsheets (`Expense_Data_YYYY-MM-DD.csv`) or import `.csv` / `.json` files via drag-and-drop using a zero-dependency client-side `FileReader` and state-machine CSV parser.
- **Live Preview, Duplicate Detection & Undo Safety:** Inspect valid row counts, skipped lines, and detected duplicates before choosing **Merge Data** (optionally skipping duplicates or restoring settings) or **Replace All**, backed by a full-state 5-second Undo toast.

### 16. ⚡ Quick-Add Favorite Templates *(Added: November 12, 2026)*
- **1-Click Template Chips:** Pin frequent daily purchases above the entry form (seeded with sample everyday items on first visit) and log them for today's date in a single tap.
- **Custom Template Pinning:** Fill Title, Amount, and Category in the form and click **+ Pin Current** to save reusable templates; unpin anytime with 5-second Undo protection.

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

### 1. Recording a New Expense & Using Quick Templates *(Updated: November 12, 2026)*
1. **1-Click Quick-Add:** Tap any chip in **⚡ Quick-Add Templates** (e.g., `🍔 Morning Coffee ₹60`) to log it immediately for today, or fill the form and click **+ Pin Current** to save your own template.
2. **Custom Entry:** Enter Title, Amount (₹), Category (select or type custom), Date, and optional Repeat schedule, then click **➕ Add Expense**.

### 2. Modifying, Deleting & Bulk Actions *(Updated: November 11, 2026)*
- **Edit Record:** Click the **✏️ Edit** button on any table row or mobile card. The form loads the transaction values, displays an amber **"Editing"** badge, and enables an optional **"Cancel"** button.
- **Instant Delete with 5s Undo:** Click the **🗑️ Delete** button on any row to remove it immediately with a non-blocking **↩️ Undo** toast alert restoring it to its original position.
- **Bulk Selection:** Check individual rows or the header **Select All** checkbox to reveal the Bulk Action toolbar (**📄 Export Selected PDF**, **🗑️ Delete Selected** with Undo, or **✕ Clear**).

### 3. Visual Analytics & SVG Charts *(Added: November 11, 2026)*
- **Category Donut Chart:** Hover over any SVG slice or legend entry to preview that category's total and share in the donut center; click any slice or legend tag to toggle filtering by that category.
- **Spending Trend Bar Chart:** Toggle between **7 Days** and **6 Months** views, compare spending against the prior month via the MoM delta label, and hover bars for exact rupee totals and item counts.

### 4. Recurring Expenses & Bill Reminders *(Added: November 11, 2026)*
1. Select **🔁 Weekly** or **🔁 Monthly** under **Repeat / Reminder** when logging a recurring expense.
2. When bills are overdue or due within 7 days, the **Upcoming Bill Reminders** strip lets you log them in one click (**✓ Log Next Due**).
3. Click **🔁 Recurring Bills** in the header to pause/resume schedules, log bills manually, delete reminders (with Undo), or toggle automatic logging on startup.

### 5. Managing Monthly Budget & Live Alerts *(Added: November 10, 2026)*
1. Click the **✏️ Edit** link on the Monthly Budget overview card.
2. Enter your spending target limit in the modal (e.g., `₹50,000.00`) and click **Save Target**.
3. The live banner instantly computes active month spending, remaining funds, and sets the alert state:
   - 🟢 **Safe:** Spent $< 75\%$ of budget.
   - 🟡 **Caution:** Spent between $75\%$ and $99.9\%$.
   - 🚨 **Over-Budget:** Spent $\ge 100\%$, showing negative deficit in red.

### 6. Filtering and Sorting Expenses *(Updated: November 10, 2026)*
- **Search Title:** Type any keyword into the search field for real-time keystroke filtering.
- **Filter Category:** Filter by any standard category or custom category created in this session.
- **Date Range:** Set custom **From Date** and **To Date** intervals.
- **Sort By:** Select sort order (Date Newest/Oldest, Amount Highest/Lowest, Title A–Z) directly next to the date fields.
- **Quick Range Presets:** Click **Today**, **This Week**, or **This Month** to instantly apply date filters.
- **Reset Filters:** Click **Reset Filters** to restore all filter controls to default.

### 7. Exporting PDF & Data Backup / Restore *(Updated: November 12, 2026)*
- **Financial Audit PDF:** Click **📄 Export PDF** in the ledger header (or **📄 Export Selected** in the bulk bar) to download `Expense_Report_YYYY-MM-DD.pdf`.
- **Backup & Restore:** Click **💾 Backup & Import** in the header to export a full `.json` backup or `.csv` spreadsheet, or drag-and-drop a `.json`/`.csv` file to preview duplicates and merge/replace data safely.

---

## 🛠️ Technology Stack

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Markup** | HTML5 | Clean semantic structure (`header`, `main`, `section`, `table`, `dialog`) with accessible ARIA landmarks. |
| **Styling** | CSS3 | Responsive CSS Grid, Flexbox layout, CSS custom properties (variables), dark/light theme tokens, and animations. |
| **Visualizations** | Pure Inline SVG | Hand-crafted SVG donut and trend bar charts built dynamically via DOM/SVG without charting libraries. |
| **Logic & Data** | Vanilla JavaScript (ES6+) | Array methods, event delegation, Undo toast engine, `FileReader` JSON/CSV parser, and Web Storage API. |
| **Export** | Native JS PDF 1.4 & CSV | Client-side binary PDF 1.4 generator, RFC-4180 CSV exporter, and JSON backup serializer. |
| **External Dependencies** | **None (Zero)** | 100% self-contained codebase without jQuery, React, Bootstrap, Chart.js, PapaParse, or NPM build tools. |

---

## 📁 System Architecture & Flat File Structure

```
Interactive_Expense_Tracker/
├── index.html       # Single-page portal: analytics charts, reminders, templates, forms, bulk bar & modals
├── style.css        # Responsive styling: dark/light tokens, template chips, dropzone, toast alerts & cards
├── script.js        # Core engine: state, SVG charts, recurring bills, templates, JSON/CSV import & PDF export
└── README.md        # Technical documentation, dated feature changelog, and user operation guide
```

---

## 💻 Quick Start Guide

### Zero-Build Deployment
No Node.js, npm, webpack, or server dependencies are required. Simply open `index.html` in any modern web browser:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Mushraf0105/Interactive_Expense_Tracker.git
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

## 🌐 Deployment Configuration

Because this app uses only pure static files (`index.html`, `style.css`, `script.js`), no build script or backend server is needed.

| Setting | Value |
| :--- | :--- |
| **Framework / Preset** | Other / Static HTML |
| **Build Command** | *None* (leave blank) |
| **Output / Publish Directory** | `.` (root folder) |
| **Install Command** | *None* (no `package.json` / `node_modules`) |
| **Environment Variables** | *None required* |
| **Entry Point** | `index.html` |

### Deploy in 1 Minute
- **GitHub Pages:**
  1. Push your code to GitHub (`main` branch).
  2. Go to **Repository → Settings → Pages**.
  3. Set **Source** to `Deploy from a branch`, pick branch **`main`** and folder **`/ (root)`**, and click **Save**.
  4. Open your live site URL: `https://mushraf0105.github.io/Interactive_Expense_Tracker/`.
- **Netlify / Vercel:**
  1. Import the GitHub repository (`Mushraf0105/Interactive_Expense_Tracker`).
  2. Keep **Build Command** empty and set **Output / Publish Directory** to `.` (`/`).
  3. Click **Deploy**.
- **Local Static Server (Optional):**
  - Open directly via `index.html`, or use VS Code **Live Server** extension / `python -m http.server 8080`.

---

## 🧪 Core Implementation Highlights

### 1. Interactive Pure SVG Donut & Trend Bar Charts (`script.js`)
```javascript
// Renders circular stroke-dasharray SVG slices & daily/monthly trend bars
renderDonutChart(sortedCategories, totalAmount);
renderTrendChart(); // Switches dynamically between 7-day and 6-month intervals
```

### 2. Non-Blocking Undo Toast Notification & Bulk Restore (`script.js`)
```javascript
showToast({
  message: `Deleted ${count} selected expenses.`,
  type: 'danger',
  duration: 5000,
  onUndo: () => { /* Restores snapshots to exact array indices */ }
});
```

### 3. Safe Recurring Date Advancement (`script.js`)
```javascript
function advanceDateByFrequency(dateYMD, frequency) {
  // Advances weekly (+7 days) or monthly (clamped safely to month-end, e.g. Jan 31 -> Feb 28)
}
```

### 4. Client-Side Pure PDF 1.4 Binary Generator (`script.js`)
```javascript
// Zero-dependency pure client-side PDF document stream assembly
function generateExpensePDF(expensesList, summary) {
  // Builds PDF catalog, pages tree, font dictionaries, formatted tables & cross-reference offsets
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
