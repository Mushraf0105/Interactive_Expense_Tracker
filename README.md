# Interactive Expense Tracker Web Application

A lightweight, modern, browser-based expense tracker built with pure HTML5, CSS3, and Vanilla JavaScript (ES6+). Users can add, edit, delete, categorize, filter, and sort their expenses with real-time spending summaries and LocalStorage persistence.

---

## 📌 Project Overview

This project was developed as a hands-on web application to master core front-end JavaScript concepts:
- **DOM Manipulation & Dynamic UI Updates**: Real-time rendering without page reloads.
- **Event Handling**: Handling form submissions, input events, and event delegation for list actions.
- **Data Structures**: Modeling expenses as JavaScript objects within arrays.
- **Array Methods**: Utilizing `.filter()`, `.sort()`, `.reduce()`, `.find()`, and `.findIndex()`.
- **Form Validation**: Validating user inputs before saving.
- **Data Persistence**: Storing and retrieving JSON data in browser `localStorage`.
- **Responsive Web Design**: Mobile-friendly layout using modern CSS Grid and Flexbox.

---

## 🚀 Features & Assessment Deliverables

| Deliverable | Description |
| :--- | :--- |
| **Expense Entry Form** | Add new expenses with Title, Amount (₹), Category (freeform text input with suggestions), and Date. Automatically sets today's date. |
| **Input Validation** | Verifies non-empty title (min 2 chars), positive amount (> ₹0.00), valid category, and valid date with real-time error messaging. |
| **Expense Listing** | Clean, styled table on desktop that transforms into **individual mobile cards** (`≤ 640px`) with 44px tap targets. |
| **Edit Functionality** | Loads existing expense data into the form with an "Editing" status indicator and a "Cancel" option (<kbd>Esc</kbd> shortcut). |
| **Delete Functionality** | Removes an expense with a confirmation prompt and immediate UI/Storage update. |
| **Category Filtering** | Custom mobile-responsive dropdown that dynamically syncs with all user-entered categories with zero card overflow. |
| **Date Range Filtering** | Custom mobile-responsive Calendar Modal (`From Date` / `To Date`) + one-tap Quick Date Presets (*Today, This Week, This Month*). |
| **Search & Sort** | Real-time title search and custom mobile dropdown sorting (Newest/Oldest Date, Highest/Lowest Amount, A–Z Title). |
| **Spending Summaries** | Instant dashboard cards for **Total Expenses**, **Filtered Total**, **Top Category**, and an interactive **Category Breakdown** bar. |
| **LocalStorage Persistence** | Retains all expense data across browser sessions and page refreshes (with starter INR dataset). |
| **Data Export** | Download your filtered or complete expense history as a `.csv` spreadsheet file with one click. |
| **Responsive UI** | 100% fluid, mobile-first design with custom dropdowns and date pickers that never overflow on narrow screens. |

---

## 🛠️ Technologies Used

- **HTML5**: Semantic markup structure.
- **CSS3**: Custom properties (variables), Flexbox, CSS Grid, media queries, and accessible typography.
- **JavaScript (ES6+)**: Vanilla JavaScript with no external dependencies or frameworks.
- **LocalStorage API**: Client-side offline data storage.
- **Git & GitHub**: Version control and code repository.

---

## 📁 File Structure

```
Interactive_Expense_Tracker/
├── index.html       # Application markup and UI structure
├── style.css        # Responsive styling and design system
├── script.js        # Core logic: state, validation, DOM, filtering & storage
└── README.md        # Project documentation
```

---

## 💻 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/interactive-expense-tracker.git
cd interactive-expense-tracker
```

### 2. Run the Application
No build tools, package managers, or server installations required! Simply open `index.html` in your favorite web browser:
- **Windows**: Double-click `index.html` or run `start index.html` in PowerShell.
- **macOS**: Run `open index.html` in Terminal.
- **Linux**: Run `xdg-open index.html` in Terminal.

---

## 🧪 Code Implementation Highlights

### 1. Array Methods for Filtering and Sorting
```javascript
// Filtering matching search, category, and date range
const filtered = expenses.filter(item => {
  const matchesSearch = !searchTerm || item.title.toLowerCase().includes(searchTerm);
  const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
  const matchesStart = !startDate || item.date >= startDate;
  const matchesEnd = !endDate || item.date <= endDate;
  return matchesSearch && matchesCategory && matchesStart && matchesEnd;
});

// Sorting based on user selection
filtered.sort((a, b) => {
  if (sortBy === 'amount-desc') return b.amount - a.amount;
  if (sortBy === 'date-desc') return b.date.localeCompare(a.date);
  // ...
});
```

### 2. Calculating Totals with `.reduce()`
```javascript
// Calculate total expenses
const total = expenses.reduce((sum, item) => sum + item.amount, 0);

// Calculate top category
const categoryTotals = expenses.reduce((acc, item) => {
  acc[item.category] = (acc[item.category] || 0) + item.amount;
  return acc;
}, {});
```

---

## 📄 License
This project is open-source and free to use for educational purposes.
