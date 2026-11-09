# Interactive Expense Tracker Web Application

> **A production-grade, lightweight, and fully responsive personal finance web application built with 100% pure HTML5, CSS3, and Vanilla JavaScript (ES6+) with zero external libraries or build tools.**

---

## 📌 Project Information

- **Organization:** Veda Technology
- **Project Name:** Interactive Expense Tracker Web Application
- **Version:** `v1.0.0`
- **Date:** November 09, 2026
- **Assessment Scope:** Multi-Section Responsive Portal & Mobile UI Engineering
- **Regional Hub:** Lakhisarai, Bihar, India
- **Verification Status:** `100% Completed & Verified`

---

## 🚀 Key Features & Capabilities

### 1. 📝 Smart Expense Entry Form
- **Form Fields:** Expense Title, Amount in Indian Rupees (₹), Category (Custom Combobox), and Expense Date.
- **Auto-Date:** Automatically defaults to today's date (`YYYY-MM-DD`).
- **Real-Time Regex Validation:**
  - **Title:** Minimum 2 characters, non-empty.
  - **Amount:** Positive number greater than ₹0.00 with 2 decimal precision.
  - **Category:** Valid category selection or custom input.
  - **Date:** Valid calendar date format.
- **Inline Error Feedback:** Dynamic error messages and red border highlights with automatic recovery on keystroke.

### 2. 🎛️ Hybrid Category Combobox
- Combines the flexibility of **freeform text input** with an interactive **suggestion dropdown**.
- Features a dedicated down-arrow toggle button (`▼`) and tap-to-select suggestions with emoji indicators (🍔 *Food & Dining*, 🚗 *Transportation*, 💡 *Housing & Utilities*, 🎬 *Entertainment*, 💊 *Healthcare*, 🛍️ *Shopping*, 📦 *Other*).
- Full mobile touch parity ensuring suggestions open reliably on tap without native datalist browser clipping.

### 3. 📅 Interactive Date Selection Modal & Quick Presets
- Replaces native inputs with an accessible **calendar popup modal** complete with month/year navigation, date grid selection, "Clear", and "Today" quick buttons.
- **One-Tap Quick Range Presets:**
  - **All Dates** — Reset filters to view all historical transactions.
  - **Today** — Filter expenses recorded on the current date.
  - **This Week** — Filter expenses recorded from Monday through Sunday of the current week.
  - **This Month** — Filter expenses recorded within the active calendar month.

### 4. 📱 100% Mobile-Responsive Design & Smart Dropdowns
- **Table-to-Card Transformation:** On viewports narrower than `640px`, tabular records automatically convert into touch-friendly stacked cards with high-contrast labels and $\ge 44\text{px}$ action buttons.
- **Smart Upward Opening (`drop-up`):** Custom dropdowns calculate viewport boundaries and open upwards when positioned near the bottom of the screen to prevent clipping and scrolling issues.
- **Outside Click & Escape Dismissal:** All dropdowns and modal dialogs close cleanly when clicking outside or pressing <kbd>Esc</kbd>.

### 5. 💳 Live Financial Dashboard Metrics
- **Total Expenses:** Instant sum of all recorded transactions formatted in Indian Rupees (INR `₹`).
- **Filtered Total:** Live total reflecting current search keyword, category, and date range filters.
- **Top Spending Category:** Dynamically computes the category with the highest aggregate expenditure.
- **Visual Category Breakdown:** Proportional progress bars displaying percentage share and amount per category.

### 6. 🔄 Full CRUD Lifecycle & LocalStorage Persistence
- **Create:** Add new transactions with immediate dashboard and list recalculation.
- **Read:** Multi-criteria filtered and sorted transaction views.
- **Update:** Seamless inline edit loading existing data into the form with an active "Editing" badge and a "Cancel" button.
- **Delete:** Safe record removal with a confirmation dialog.
- **Offline Persistence:** All expenses, filters, and custom categories persist in the browser's `localStorage` across page reloads and browser restarts.

### 7. 📊 Data Export (CSV)
- Export all or currently filtered transactions to a formatted `.csv` file with a single click.
- Features standardized columns: `ID, Title, Amount (INR), Category, Date` for compatibility with Microsoft Excel, Google Sheets, and accounting tools.

---

## 🛠️ Technology Stack

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Markup** | HTML5 | Clean semantic structure (`header`, `main`, `section`, `table`, `dialog`) with accessible ARIA landmarks. |
| **Styling** | CSS3 | Responsive CSS Grid, Flexbox layout, CSS custom properties (variables), smooth animations, and mobile media queries. |
| **Logic** | Vanilla JavaScript (ES6+) | Modern ES6 modules, array methods (`.filter()`, `.sort()`, `.reduce()`), event delegation, and Web Storage API. |
| **External Dependencies** | **None (Zero)** | 100% self-contained codebase without jQuery, React, Bootstrap, or NPM build tools. |

---

## 📁 System Architecture & Flat File Structure

```
Interactive_Expense_Tracker/
├── index.html       # Single-page portal: semantic layout, dashboard cards, custom controls & modal dialogs
├── style.css        # Responsive styling: layout grids, touch cards, smart dropdowns & animations
├── script.js        # Core engine: state management, validation, calendar modal, filters & CSV export
└── README.md        # Technical assessment documentation and user guide
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

### 2. Currency Calculation with `.reduce()`
```javascript
// Calculate total expenses formatted in Indian Rupees
const totalAmount = expenses.reduce((sum, item) => sum + item.amount, 0);

// Calculate spending distribution per category
const categoryTotals = expenses.reduce((acc, item) => {
  acc[item.category] = (acc[item.category] || 0) + item.amount;
  return acc;
}, {});
```

### 3. Smart Upward Dropdown Positioning
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

- **WCAG 2.1 AA Compliant:** Keyboard navigation with visible focus rings, ARIA roles (`role="combobox"`, `aria-expanded`, `aria-label`), and contrast ratios $> 4.5:1$.
- **Cross-Browser Verified:** Fully tested and operational on Google Chrome, Microsoft Edge, Mozilla Firefox, and Apple Safari.
- **Mobile Tested:** Fluid rendering verified on viewports ranging from `320px` (small mobile) through `1440px+` (ultra-wide desktop).

---

## 📄 License
Developed for **Veda Technology** educational and production assessment purposes. Released under the MIT License.
