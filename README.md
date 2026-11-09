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
| **Expense Entry Form** | Add new expenses with Title, Amount, Category, and Date. Automatically sets today's date. |
| **Input Validation** | Verifies non-empty title (min 2 chars), positive amount (> ₹0.00), valid category, and valid date with real-time error messaging. |
| **Expense Listing** | Clean, styled table showing date, title, color-coded category badges, formatted currency, and action buttons. |
| **Edit Functionality** | Loads existing expense data into the form with an "Editing" status indicator and a "Cancel" option. |
| **Delete Functionality** | Removes an expense with a confirmation prompt and immediate UI/Storage update. |
| **Category Filtering** | Filter transactions by categories: Food & Dining, Transportation, Housing & Utilities, Entertainment, Healthcare, Shopping, Other. |
| **Date Range Filtering** | Filter records between specific **From Date** and **To Date** intervals. |
| **Search & Sort** | Real-time title search and multi-option sorting (Newest/Oldest Date, Highest/Lowest Amount, A–Z Title). |
| **Spending Summaries** | Instant dashboard cards for **Total Expenses**, **Filtered Total**, and the **Top Spending Category**. |
| **LocalStorage Persistence** | Retains all expense data across browser sessions and page refreshes. |
| **Responsive UI** | Seamless layout on desktop screens, tablets, and smartphones. |

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
