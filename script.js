/**
 * Interactive Expense Tracker Web Application
 * Pure JavaScript Implementation (ES6+)
 */

// ==========================================================================
// 1. Initial State & Configuration
// ==========================================================================

const STORAGE_KEY = 'interactive_expenses_inr_data';

// Default initial expenses provided if localStorage is empty
const DEFAULT_EXPENSES = [
  {
    id: 'exp-1',
    title: 'Weekly Groceries & Vegetables',
    amount: 2450.00,
    category: 'Food & Dining',
    date: '2026-11-05'
  },
  {
    id: 'exp-2',
    title: 'Metro Smart Card Recharge',
    amount: 800.00,
    category: 'Transportation',
    date: '2026-11-03'
  },
  {
    id: 'exp-3',
    title: 'Electricity & Wifi Bill',
    amount: 1850.00,
    category: 'Housing & Utilities',
    date: '2026-11-01'
  },
  {
    id: 'exp-4',
    title: 'Movie Tickets & Snacks',
    amount: 650.00,
    category: 'Entertainment',
    date: '2026-11-07'
  }
];

// Application State
let expenses = loadExpenses();
let isEditing = false;
let currentEditId = null;

// ==========================================================================
// 2. DOM Elements
// ==========================================================================

// Form Elements
const expenseForm = document.getElementById('expense-form');
const expenseIdInput = document.getElementById('expense-id');
const expenseTitleInput = document.getElementById('expense-title');
const expenseAmountInput = document.getElementById('expense-amount');
const expenseCategoryInput = document.getElementById('expense-category');
const expenseDateInput = document.getElementById('expense-date');
const submitBtn = document.getElementById('submit-btn');
const submitBtnText = document.getElementById('submit-btn-text');
const cancelBtn = document.getElementById('cancel-btn');
const formHeading = document.getElementById('form-heading');
const editBadge = document.getElementById('edit-badge');

// Error Elements
const titleError = document.getElementById('title-error');
const amountError = document.getElementById('amount-error');
const categoryError = document.getElementById('category-error');
const dateError = document.getElementById('date-error');

// Summary Card Elements
const totalAmountEl = document.getElementById('total-amount');
const totalCountEl = document.getElementById('total-count');
const filteredAmountEl = document.getElementById('filtered-amount');
const filteredCountEl = document.getElementById('filtered-count');
const topCategoryNameEl = document.getElementById('top-category-name');
const topCategoryAmountEl = document.getElementById('top-category-amount');

// Category Breakdown Elements
const categoryProgressBar = document.getElementById('category-progress-bar');
const categoryLegend = document.getElementById('category-legend');

// Category Colors for Visual Summary
const CATEGORY_COLORS = {
  'Food & Dining': '#f97316',
  'Transportation': '#0284c7',
  'Housing & Utilities': '#eab308',
  'Entertainment': '#a855f7',
  'Healthcare': '#ec4899',
  'Shopping': '#14b8a6',
  'Other': '#64748b'
};

// Filter & Sort Elements
const searchInput = document.getElementById('search-input');
const filterCategorySelect = document.getElementById('filter-category');
const filterStartDateInput = document.getElementById('filter-start-date');
const filterEndDateInput = document.getElementById('filter-end-date');
const sortBySelect = document.getElementById('sort-by');
const resetFiltersBtn = document.getElementById('reset-filters-btn');

// Listing & Table Elements
const expenseListBody = document.getElementById('expense-list-body');
const listingCountBadge = document.getElementById('listing-count-badge');
const emptyState = document.getElementById('empty-state');
const emptyStateMessage = document.getElementById('empty-state-message');
const expensesTable = document.getElementById('expenses-table');
const clearAllBtn = document.getElementById('clear-all-btn');
const exportCsvBtn = document.getElementById('export-csv-btn');

// ==========================================================================
// 3. LocalStorage Persistence
// ==========================================================================

/**
 * Loads expenses from LocalStorage.
 * Returns default dataset if no record exists.
 */
function loadExpenses() {
  try {
    const rawData = localStorage.getItem(STORAGE_KEY);
    if (!rawData) {
      // First time user: save and return defaults
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_EXPENSES));
      return [...DEFAULT_EXPENSES];
    }
    const parsed = JSON.parse(rawData);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Error loading expenses from LocalStorage:', error);
    return [];
  }
}

/**
 * Saves current expenses array into LocalStorage.
 */
function saveExpenses() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  } catch (error) {
    console.error('Error saving expenses to LocalStorage:', error);
    alert('Unable to save changes to LocalStorage. Disk may be full.');
  }
}

// ==========================================================================
// 4. Formatting Utilities
// ==========================================================================

/**
 * Formats a numeric value into Indian Rupees (INR) currency string (₹).
 */
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

/**
 * Formats an ISO date string (YYYY-MM-DD) into readable format (e.g. Nov 5, 2026).
 */
function formatDate(dateStr) {
  if (!dateStr) return '—';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  
  // Construct date in local timezone to avoid UTC day offset
  const dateObj = new Date(parts[0], parts[1] - 1, parts[2]);
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

/**
 * Maps category name to CSS class for badge styling.
 */
function getCategoryClass(category) {
  const norm = (category || '').toLowerCase().trim();
  if (norm.includes('food') || norm.includes('dining') || norm.includes('grocer') || norm.includes('snack') || norm.includes('restaur') || norm.includes('cafe')) {
    return 'cat-food';
  }
  if (norm.includes('transport') || norm.includes('travel') || norm.includes('fuel') || norm.includes('cab') || norm.includes('metro') || norm.includes('bus') || norm.includes('auto')) {
    return 'cat-transport';
  }
  if (norm.includes('housing') || norm.includes('utilit') || norm.includes('bill') || norm.includes('rent') || norm.includes('electr') || norm.includes('wifi') || norm.includes('water')) {
    return 'cat-housing';
  }
  if (norm.includes('entertain') || norm.includes('movie') || norm.includes('cinema') || norm.includes('game') || norm.includes('netflix') || norm.includes('show')) {
    return 'cat-entertainment';
  }
  if (norm.includes('health') || norm.includes('medic') || norm.includes('pharm') || norm.includes('doctor') || norm.includes('fitness') || norm.includes('gym')) {
    return 'cat-health';
  }
  if (norm.includes('shop') || norm.includes('cloth') || norm.includes('store') || norm.includes('amazon') || norm.includes('flipkart') || norm.includes('myntra')) {
    return 'cat-shopping';
  }
  return 'cat-other';
}

/**
 * Returns a consistent hex or HSL color for any category name.
 */
function getCategoryColor(category) {
  if (CATEGORY_COLORS[category]) return CATEGORY_COLORS[category];
  let hash = 0;
  for (let i = 0; i < (category || '').length; i++) {
    hash = category.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = Math.abs(hash) % 360;
  return `hsl(${h}, 65%, 48%)`;
}

// ==========================================================================
// 5. Validation Logic
// ==========================================================================

function clearErrors() {
  titleError.textContent = '';
  amountError.textContent = '';
  categoryError.textContent = '';
  dateError.textContent = '';

  expenseTitleInput.classList.remove('input-error');
  expenseAmountInput.classList.remove('input-error');
  expenseCategoryInput.classList.remove('input-error');
  expenseDateInput.classList.remove('input-error');
}

/**
 * Validates form inputs.
 * Returns true if all fields are valid, false otherwise.
 */
function validateForm() {
  clearErrors();
  let isValid = true;

  const title = expenseTitleInput.value.trim();
  const amount = parseFloat(expenseAmountInput.value);
  const category = expenseCategoryInput.value.trim();
  const date = expenseDateInput.value;

  // Title validation
  if (!title) {
    titleError.textContent = 'Please enter an expense title.';
    expenseTitleInput.classList.add('input-error');
    isValid = false;
  } else if (title.length < 2) {
    titleError.textContent = 'Title must be at least 2 characters.';
    expenseTitleInput.classList.add('input-error');
    isValid = false;
  }

  // Amount validation
  if (isNaN(amount) || amount <= 0) {
    amountError.textContent = 'Please enter a valid amount greater than ₹0.00.';
    expenseAmountInput.classList.add('input-error');
    isValid = false;
  }

  // Category validation
  if (!category) {
    categoryError.textContent = 'Please enter a category.';
    expenseCategoryInput.classList.add('input-error');
    isValid = false;
  }

  // Date validation
  if (!date) {
    dateError.textContent = 'Please choose a date.';
    expenseDateInput.classList.add('input-error');
    isValid = false;
  }

  return isValid;
}

// ==========================================================================
// 6. Filtering & Sorting (Using Array Methods)
// ==========================================================================

/**
 * Filters and sorts expenses according to active filter controls.
 * Demonstrates: filter(), sort(), and string methods.
 */
function getFilteredAndSortedExpenses() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const selectedCategory = filterCategorySelect.value;
  const startDate = filterStartDateInput.value;
  const endDate = filterEndDateInput.value;
  const sortBy = sortBySelect.value;

  // 1. Filtering using Array.prototype.filter()
  const filtered = expenses.filter(item => {
    // Search match
    const matchesSearch = !searchTerm || item.title.toLowerCase().includes(searchTerm);

    // Category match
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;

    // Date range match
    const matchesStart = !startDate || item.date >= startDate;
    const matchesEnd = !endDate || item.date <= endDate;

    return matchesSearch && matchesCategory && matchesStart && matchesEnd;
  });

  // 2. Sorting using Array.prototype.sort()
  filtered.sort((a, b) => {
    switch (sortBy) {
      case 'date-desc':
        return b.date.localeCompare(a.date);
      case 'date-asc':
        return a.date.localeCompare(b.date);
      case 'amount-desc':
        return b.amount - a.amount;
      case 'amount-asc':
        return a.amount - b.amount;
      case 'title-asc':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  return filtered;
}

// ==========================================================================
// 7. Calculations & Summary Update
// ==========================================================================

/**
 * Calculates overall totals, filtered totals, and top category.
 * Demonstrates: Array.prototype.reduce().
 */
function updateSummaryCards(filteredList) {
  // Overall total
  const overallTotal = expenses.reduce((sum, item) => sum + item.amount, 0);
  totalAmountEl.textContent = formatCurrency(overallTotal);
  totalCountEl.textContent = `${expenses.length} transaction${expenses.length === 1 ? '' : 's'} recorded`;

  // Filtered total
  const filteredTotal = filteredList.reduce((sum, item) => sum + item.amount, 0);
  filteredAmountEl.textContent = formatCurrency(filteredTotal);
  filteredCountEl.textContent = `${filteredList.length} item${filteredList.length === 1 ? '' : 's'} displayed`;

  // Top Category Calculation
  if (expenses.length === 0) {
    topCategoryNameEl.textContent = '—';
    topCategoryAmountEl.textContent = '₹0.00 spent';
    updateCategoryBreakdown([]);
    return;
  }

  // Aggregate spending by category using reduce()
  const categoryTotals = expenses.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.amount;
    return acc;
  }, {});

  // Find category with highest expenditure
  let topCategory = '—';
  let topAmount = 0;

  for (const [category, amount] of Object.entries(categoryTotals)) {
    if (amount > topAmount) {
      topAmount = amount;
      topCategory = category;
    }
  }

  topCategoryNameEl.textContent = topCategory;
  topCategoryAmountEl.textContent = `${formatCurrency(topAmount)} spent`;

  // Update Category Spending Breakdown
  updateCategoryBreakdown(categoryTotals, overallTotal);
}

/**
 * Updates the visual category breakdown bar and legend.
 */
function updateCategoryBreakdown(categoryTotals = {}, totalAmount = 0) {
  if (!categoryProgressBar || !categoryLegend) return;

  categoryProgressBar.innerHTML = '';
  categoryLegend.innerHTML = '';

  if (totalAmount <= 0 || Object.keys(categoryTotals).length === 0) {
    categoryProgressBar.innerHTML = '<div style="width: 100%; background: #e2e8f0; height: 100%;"></div>';
    categoryLegend.innerHTML = '<span class="breakdown-subtitle">No spending data to visualize</span>';
    return;
  }

  // Sort categories by expenditure (descending)
  const sorted = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);

  sorted.forEach(([cat, amt]) => {
    const pct = ((amt / totalAmount) * 100).toFixed(1);
    const color = getCategoryColor(cat);

    // Segment
    const segment = document.createElement('div');
    segment.className = 'progress-segment';
    segment.style.width = `${pct}%`;
    segment.style.backgroundColor = color;
    segment.title = `${cat}: ${formatCurrency(amt)} (${pct}%)`;
    categoryProgressBar.appendChild(segment);

    // Legend item
    const item = document.createElement('div');
    item.className = 'legend-item';
    item.innerHTML = `
      <span class="legend-dot" style="background-color: ${color}"></span>
      <span class="legend-name">${escapeHtml(cat)}</span>
      <span>${formatCurrency(amt)}</span>
      <span class="legend-pct">(${pct}%)</span>
    `;
    categoryLegend.appendChild(item);
  });
}

/**
 * Synchronizes the category filter dropdown options with all existing categories.
 */
function updateCategoryFilterOptions() {
  const currentVal = filterCategorySelect.value;
  const categories = Array.from(new Set(expenses.map(item => item.category).filter(Boolean))).sort();

  filterCategorySelect.innerHTML = '<option value="all">All Categories</option>';
  categories.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    if (cat === currentVal) {
      opt.selected = true;
    }
    filterCategorySelect.appendChild(opt);
  });
}

/**
 * Updates the datalist with known categories for quick suggestions.
 */
function updateCategorySuggestions() {
  const datalist = document.getElementById('category-suggestions');
  if (!datalist) return;
  const defaultList = ['Food & Dining', 'Transportation', 'Housing & Utilities', 'Entertainment', 'Healthcare', 'Shopping', 'Other'];
  const allCategories = Array.from(new Set([...defaultList, ...expenses.map(e => e.category).filter(Boolean)])).sort();
  datalist.innerHTML = allCategories.map(cat => `<option value="${escapeHtml(cat)}">`).join('');
}

// ==========================================================================
// 8. Render UI
// ==========================================================================

/**
 * Dynamically updates the list view without reloading the page.
 */
function render() {
  const visibleExpenses = getFilteredAndSortedExpenses();

  // Sync category filter options and suggestions
  updateCategoryFilterOptions();
  updateCategorySuggestions();

  // Update Summary Dashboards
  updateSummaryCards(visibleExpenses);

  // Update record counter badge
  listingCountBadge.textContent = `${visibleExpenses.length} of ${expenses.length}`;

  // Clear existing table rows
  expenseListBody.innerHTML = '';

  if (visibleExpenses.length === 0) {
    // Show empty state
    expensesTable.style.display = 'none';
    emptyState.style.display = 'block';

    if (expenses.length === 0) {
      emptyStateMessage.textContent = 'No expenses recorded yet. Fill out the form to add one!';
    } else {
      emptyStateMessage.textContent = 'No expenses match your active filter criteria.';
    }
    return;
  }

  // Show table
  expensesTable.style.display = 'table';
  emptyState.style.display = 'none';

  // Render rows dynamically with mobile-responsive data-label attributes
  visibleExpenses.forEach(item => {
    const row = document.createElement('tr');
    row.dataset.id = item.id;

    const catBadgeClass = getCategoryClass(item.category);

    row.innerHTML = `
      <td class="expense-date-cell" data-label="Date">${formatDate(item.date)}</td>
      <td class="expense-title-cell" data-label="Title">${escapeHtml(item.title)}</td>
      <td data-label="Category">
        <span class="category-pill ${catBadgeClass}">
          ${escapeHtml(item.category)}
        </span>
      </td>
      <td class="expense-amount-cell text-right" data-label="Amount">${formatCurrency(item.amount)}</td>
      <td class="text-center" data-label="Actions">
        <div class="row-actions">
          <button class="action-btn edit-action" data-id="${item.id}" title="Edit expense">
            ✏️ Edit
          </button>
          <button class="action-btn delete-action" data-id="${item.id}" title="Delete expense">
            🗑️ Delete
          </button>
        </div>
      </td>
    `;

    expenseListBody.appendChild(row);
  });
}

/**
 * Escapes HTML characters to prevent XSS.
 */
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ==========================================================================
// 9. Add, Edit, and Delete Handlers
// ==========================================================================

/**
 * Handles Form Submission (Add or Update).
 */
function handleFormSubmit(e) {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  const title = expenseTitleInput.value.trim();
  const amount = parseFloat(expenseAmountInput.value);
  const category = expenseCategoryInput.value.trim();
  const date = expenseDateInput.value;

  if (isEditing && currentEditId) {
    // Update existing expense
    const index = expenses.findIndex(item => item.id === currentEditId);
    if (index !== -1) {
      expenses[index] = {
        ...expenses[index],
        title,
        amount,
        category,
        date
      };
    }
    resetFormState();
  } else {
    // Add new expense
    const newExpense = {
      id: 'exp-' + Date.now(),
      title,
      amount,
      category,
      date
    };
    expenses.unshift(newExpense);
    resetFormState();
  }

  saveExpenses();
  render();
}

/**
 * Prepares the form for editing an existing expense.
 */
function handleEdit(id) {
  const expenseToEdit = expenses.find(item => item.id === id);
  if (!expenseToEdit) return;

  isEditing = true;
  currentEditId = id;

  // Populate form fields
  expenseIdInput.value = expenseToEdit.id;
  expenseTitleInput.value = expenseToEdit.title;
  expenseAmountInput.value = expenseToEdit.amount;
  expenseCategoryInput.value = expenseToEdit.category;
  expenseDateInput.value = expenseToEdit.date;

  // Update UI indicators
  formHeading.textContent = 'Edit Expense';
  submitBtnText.textContent = 'Update Expense';
  editBadge.style.display = 'inline-block';
  cancelBtn.style.display = 'inline-block';

  clearErrors();

  // Scroll to form if on small screen
  expenseForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
  expenseTitleInput.focus();
}

/**
 * Deletes an expense by id with user confirmation.
 */
function handleDelete(id) {
  const target = expenses.find(item => item.id === id);
  if (!target) return;

  const confirmed = confirm(`Are you sure you want to delete "${target.title}"?`);
  if (!confirmed) return;

  // If deleting the item currently being edited, cancel edit mode
  if (isEditing && currentEditId === id) {
    resetFormState();
  }

  expenses = expenses.filter(item => item.id !== id);
  saveExpenses();
  render();
}

/**
 * Resets the form back to 'Add Expense' mode.
 */
function resetFormState() {
  isEditing = false;
  currentEditId = null;
  expenseForm.reset();
  expenseIdInput.value = '';

  formHeading.textContent = 'Add New Expense';
  submitBtnText.textContent = 'Add Expense';
  editBadge.style.display = 'none';
  cancelBtn.style.display = 'none';

  // Set default date to today for convenience
  setDefaultDate();
  clearErrors();
}

/**
 * Sets today's date in YYYY-MM-DD on the date input.
 */
function setDefaultDate() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  expenseDateInput.value = `${yyyy}-${mm}-${dd}`;
}

/**
 * Clears all filters and resets search inputs.
 */
function resetFilters() {
  searchInput.value = '';
  filterCategorySelect.value = 'all';
  filterStartDateInput.value = '';
  filterEndDateInput.value = '';
  sortBySelect.value = 'date-desc';
  render();
}

/**
 * Deletes all stored expense records after confirmation.
 */
function handleClearAll() {
  if (expenses.length === 0) {
    alert('There are no expenses to clear.');
    return;
  }

  const confirmed = confirm('Are you sure you want to delete ALL expenses? This cannot be undone.');
  if (confirmed) {
    expenses = [];
    saveExpenses();
    resetFormState();
    render();
  }
}

/**
 * Exports currently filtered expenses into a downloadable CSV file.
 */
function handleExportCSV() {
  const visible = getFilteredAndSortedExpenses();
  if (visible.length === 0) {
    alert('No expenses to export.');
    return;
  }

  const headers = ['ID', 'Date', 'Title', 'Category', 'Amount_INR'];
  const rows = visible.map(item => [
    `"${item.id}"`,
    `"${item.date}"`,
    `"${item.title.replace(/"/g, '""')}"`,
    `"${item.category}"`,
    item.amount.toFixed(2)
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `expenses_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// ==========================================================================
// 10. Event Listeners Registration
// ==========================================================================

function setupEventListeners() {
  // Form submission
  expenseForm.addEventListener('submit', handleFormSubmit);

  // Cancel edit button
  cancelBtn.addEventListener('click', resetFormState);

  // Keyboard shortcut: Escape cancels edit mode
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isEditing) {
      resetFormState();
    }
  });

  // Real-time input error removal
  expenseTitleInput.addEventListener('input', () => {
    if (expenseTitleInput.value.trim()) {
      titleError.textContent = '';
      expenseTitleInput.classList.remove('input-error');
    }
  });

  expenseAmountInput.addEventListener('input', () => {
    if (parseFloat(expenseAmountInput.value) > 0) {
      amountError.textContent = '';
      expenseAmountInput.classList.remove('input-error');
    }
  });

  const clearCategoryError = () => {
    if (expenseCategoryInput.value.trim()) {
      categoryError.textContent = '';
      expenseCategoryInput.classList.remove('input-error');
    }
  };
  expenseCategoryInput.addEventListener('input', clearCategoryError);
  expenseCategoryInput.addEventListener('change', clearCategoryError);

  expenseDateInput.addEventListener('change', () => {
    if (expenseDateInput.value) {
      dateError.textContent = '';
      expenseDateInput.classList.remove('input-error');
    }
  });

  // Table row actions using Event Delegation
  expenseListBody.addEventListener('click', (e) => {
    const editBtn = e.target.closest('.edit-action');
    const deleteBtn = e.target.closest('.delete-action');

    if (editBtn) {
      const id = editBtn.dataset.id;
      handleEdit(id);
    } else if (deleteBtn) {
      const id = deleteBtn.dataset.id;
      handleDelete(id);
    }
  });

  // Filter & Search Controls
  searchInput.addEventListener('input', render);
  filterCategorySelect.addEventListener('change', render);
  filterStartDateInput.addEventListener('change', render);
  filterEndDateInput.addEventListener('change', render);
  sortBySelect.addEventListener('change', render);

  // Reset Filters Button
  resetFiltersBtn.addEventListener('click', resetFilters);

  // Export to CSV Button
  if (exportCsvBtn) {
    exportCsvBtn.addEventListener('click', handleExportCSV);
  }

  // Clear All Data Button
  clearAllBtn.addEventListener('click', handleClearAll);
}

// ==========================================================================
// 11. Application Initialization
// ==========================================================================

function initApp() {
  setDefaultDate();
  setupEventListeners();
  render();
}

// Start app once DOM is fully parsed
document.addEventListener('DOMContentLoaded', initApp);

