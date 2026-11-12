// ==========================================================================
// 1. Initial State & Configuration
// ==========================================================================

const STORAGE_KEY = 'interactive_expenses_inr_data';
const THEME_KEY = 'interactive_expenses_theme';
const BUDGET_KEY = 'interactive_expenses_monthly_budget';
const RECURRING_KEY = 'interactive_expenses_recurring_rules';
const AUTO_LOG_RECUR_KEY = 'interactive_expenses_auto_log_recurring';
const TEMPLATES_KEY = 'interactive_expenses_favorite_templates';
const DEFAULT_BUDGET = 25000.00;

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
let monthlyBudget = loadMonthlyBudget();
let recurringRules = loadRecurringRules();
let autoLogRecurring = loadAutoLogPreference();
let favoriteTemplates = loadFavoriteTemplates();
let pendingImportData = null;
let selectedExpenseIds = new Set();
let activeChartRange = '7d';
let isEditing = false;
let currentEditId = null;
let activeConfirmCallback = null;

// ==========================================================================
// 2. DOM Elements
// ==========================================================================

// Theme Toggle & Header Utility Elements
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const themeIcon = document.getElementById('theme-icon');
const themeLabel = document.getElementById('theme-label');
const openRecurringBtn = document.getElementById('open-recurring-btn');
const recurringCountBadge = document.getElementById('recurring-count-badge');
const openBackupBtn = document.getElementById('open-backup-btn');

// Quick-Add Favorite Templates Elements
const quickTemplatesSection = document.getElementById('quick-templates-section');
const pinTemplateBtn = document.getElementById('pin-template-btn');
const favoriteTemplatesList = document.getElementById('favorite-templates-list');

// Form Elements
const expenseForm = document.getElementById('expense-form');
const expenseIdInput = document.getElementById('expense-id');
const expenseTitleInput = document.getElementById('expense-title');
const expenseAmountInput = document.getElementById('expense-amount');
const expenseCategoryInput = document.getElementById('expense-category');
const wrapperExpenseCategory = document.getElementById('wrapper-expense-category');
const expenseCategoryToggle = document.getElementById('expense-category-toggle');
const expenseCategoryDropdown = document.getElementById('expense-category-dropdown');
const expenseDateInput = document.getElementById('expense-date');
const expenseRecurrenceInput = document.getElementById('expense-recurrence');
const recurrenceFormGroup = document.getElementById('recurrence-form-group');
const recurrencePills = document.getElementById('recurrence-pills');
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

// Monthly Budget Card Elements
const budgetRemainingAmountEl = document.getElementById('budget-remaining-amount');
const budgetStatusSubtextEl = document.getElementById('budget-status-subtext');
const editBudgetBtn = document.getElementById('edit-budget-btn');

// Live Monthly Budget Banner Elements
const budgetAlertCard = document.getElementById('budget-alert-card');
const budgetStatusIcon = document.getElementById('budget-status-icon');
const budgetMonthHeading = document.getElementById('budget-month-heading');
const budgetStatusMessage = document.getElementById('budget-status-message');
const budgetPctBadge = document.getElementById('budget-pct-badge');
const budgetProgressBar = document.getElementById('budget-progress-bar');
const budgetTargetDisplay = document.getElementById('budget-target-display');
const budgetSpentDisplay = document.getElementById('budget-spent-display');
const budgetRemainingDisplay = document.getElementById('budget-remaining-display');

// Budget Target Modal Elements
const budgetModal = document.getElementById('budget-modal');
const budgetForm = document.getElementById('budget-form');
const budgetInput = document.getElementById('budget-input');
const budgetError = document.getElementById('budget-error');
const cancelBudgetBtn = document.getElementById('cancel-budget-btn');
const closeBudgetModalBtn = document.getElementById('close-budget-modal-btn');

// Recurring Bills Reminder & Modal Elements
const recurringReminderBar = document.getElementById('recurring-reminder-bar');
const reminderTitleEl = document.getElementById('reminder-title');
const reminderDescEl = document.getElementById('reminder-desc');
const reminderQuickLogBtn = document.getElementById('reminder-quick-log-btn');
const reminderManageBtn = document.getElementById('reminder-manage-btn');
const recurringModal = document.getElementById('recurring-modal');
const closeRecurringModalBtn = document.getElementById('close-recurring-modal-btn');
const doneRecurringBtn = document.getElementById('done-recurring-btn');
const recurringListContainer = document.getElementById('recurring-list-container');
const autoLogRecurringToggle = document.getElementById('auto-log-recurring-toggle');

// Analytics & Pure SVG Chart Elements
const categoryDonutContainer = document.getElementById('category-donut-container');
const categoryProgressBar = document.getElementById('category-progress-bar');
const categoryLegend = document.getElementById('category-legend');
const trendChartContainer = document.getElementById('trend-chart-container');
const trendDeltaBadge = document.getElementById('trend-delta-badge');
const chartTabButtons = document.querySelectorAll('.chart-tab-btn');

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

// Custom Mobile-Responsive Dropdown Elements
const wrapperFilterCategory = document.getElementById('wrapper-filter-category');
const triggerFilterCategory = document.getElementById('trigger-filter-category');
const selectedFilterCategoryText = document.getElementById('selected-filter-category-text');
const menuFilterCategory = document.getElementById('menu-filter-category');

const wrapperSortBy = document.getElementById('wrapper-sort-by');
const triggerSortBy = document.getElementById('trigger-sort-by');
const selectedSortByText = document.getElementById('selected-sort-by-text');
const menuSortBy = document.getElementById('menu-sort-by');

// Custom Mobile-Responsive Calendar Modal Elements
const customCalendarModal = document.getElementById('custom-calendar-modal');
const calPrevMonth = document.getElementById('cal-prev-month');
const calNextMonth = document.getElementById('cal-next-month');
const calMonthYear = document.getElementById('cal-month-year');
const calDaysGrid = document.getElementById('cal-days-grid');
const calTodayBtn = document.getElementById('cal-today-btn');
const calClearBtn = document.getElementById('cal-clear-btn');
const calCloseBtn = document.getElementById('cal-close-btn');

// Listing, Table & Bulk Action Elements
const expenseListBody = document.getElementById('expense-list-body');
const listingCountBadge = document.getElementById('listing-count-badge');
const emptyState = document.getElementById('empty-state');
const emptyStateMessage = document.getElementById('empty-state-message');
const expensesTable = document.getElementById('expenses-table');
const clearAllBtn = document.getElementById('clear-all-btn');
const exportPdfBtn = document.getElementById('export-pdf-btn');
const selectAllCheckbox = document.getElementById('select-all-checkbox');
const bulkActionBar = document.getElementById('bulk-action-bar');
const bulkSelectedText = document.getElementById('bulk-selected-text');
const bulkSelectedTotal = document.getElementById('bulk-selected-total');
const bulkExportPdfBtn = document.getElementById('bulk-export-pdf-btn');
const bulkDeleteBtn = document.getElementById('bulk-delete-btn');
const bulkClearBtn = document.getElementById('bulk-clear-btn');

// Custom Confirmation Modal & Toast Elements
const confirmModal = document.getElementById('confirm-modal');
const confirmModalTitle = document.getElementById('confirm-modal-title');
const confirmModalMessage = document.getElementById('confirm-modal-message');
const closeConfirmModalBtn = document.getElementById('close-confirm-modal-btn');
const cancelConfirmBtn = document.getElementById('cancel-confirm-btn');
const okConfirmBtn = document.getElementById('ok-confirm-btn');
const toastContainer = document.getElementById('toast-container');

// Data Backup, Restore & Import Modal Elements
const backupModal = document.getElementById('backup-modal');
const closeBackupModalBtn = document.getElementById('close-backup-modal-btn');
const doneBackupBtn = document.getElementById('done-backup-btn');
const exportJsonBtn = document.getElementById('export-json-btn');
const exportCsvBtn = document.getElementById('export-csv-btn');
const importFileInput = document.getElementById('import-file-input');
const importDropzone = document.getElementById('import-dropzone');
const importPreviewBox = document.getElementById('import-preview-box');
const importFileName = document.getElementById('import-file-name');
const importFormatBadge = document.getElementById('import-format-badge');
const importPreviewStats = document.getElementById('import-preview-stats');
const importSkipDupesWrap = document.getElementById('import-skip-dupes-wrap');
const importSkipDupesCheckbox = document.getElementById('import-skip-dupes-checkbox');
const importRestoreSettingsWrap = document.getElementById('import-restore-settings-wrap');
const importRestoreSettingsCheckbox = document.getElementById('import-restore-settings-checkbox');
const importMergeBtn = document.getElementById('import-merge-btn');
const importReplaceBtn = document.getElementById('import-replace-btn');
const importClearFileBtn = document.getElementById('import-clear-file-btn');
const importErrorMsg = document.getElementById('import-error-msg');

// ==========================================================================
// 3. LocalStorage Persistence & Theme
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
    showToast({ message: 'Unable to save to LocalStorage. Storage may be full.', type: 'danger' });
  }
}

/**
 * Formats a Date object into YYYY-MM-DD in local time.
 */
function formatDateYMD(dateObj) {
  const y = dateObj.getFullYear();
  const m = String(dateObj.getMonth() + 1).padStart(2, '0');
  const d = String(dateObj.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Returns today's date string in YYYY-MM-DD.
 */
function getTodayYMD() {
  return formatDateYMD(new Date());
}

/**
 * Advances a YYYY-MM-DD date string by frequency ('weekly' or 'monthly').
 */
function advanceDateByFrequency(dateYMD, frequency) {
  const parts = (dateYMD || getTodayYMD()).split('-').map(Number);
  const year = parts[0];
  const monthIdx = (parts[1] || 1) - 1;
  const day = parts[2] || 1;

  if (frequency === 'weekly') {
    const dt = new Date(year, monthIdx, day + 7);
    return formatDateYMD(dt);
  }
  if (frequency === 'monthly') {
    const targetMonth = monthIdx + 1;
    const maxDays = new Date(year, targetMonth + 1, 0).getDate();
    const clampedDay = Math.min(day, maxDays);
    return formatDateYMD(new Date(year, targetMonth, clampedDay));
  }
  return dateYMD;
}

/**
 * Loads recurring bill schedules from LocalStorage (seeds sample upcoming reminder on first visit).
 */
function loadRecurringRules() {
  try {
    const raw = localStorage.getItem(RECURRING_KEY);
    if (raw === null) {
      const sampleDue = new Date();
      sampleDue.setDate(sampleDue.getDate() + 2);
      const seed = [
        {
          id: 'rec-default-1',
          title: 'Broadband & Wi-Fi Plan',
          amount: 999.00,
          category: 'Housing & Utilities',
          frequency: 'monthly',
          nextDueDate: formatDateYMD(sampleDue),
          active: true
        }
      ];
      localStorage.setItem(RECURRING_KEY, JSON.stringify(seed));
      return seed;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Error loading recurring rules:', e);
    return [];
  }
}

/**
 * Saves recurring rules array to LocalStorage.
 */
function saveRecurringRules() {
  try {
    localStorage.setItem(RECURRING_KEY, JSON.stringify(recurringRules));
  } catch (e) {
    console.error('Error saving recurring rules:', e);
  }
}

function loadAutoLogPreference() {
  try {
    return localStorage.getItem(AUTO_LOG_RECUR_KEY) === 'true';
  } catch (e) {
    return false;
  }
}

function saveAutoLogPreference(enabled) {
  try {
    autoLogRecurring = Boolean(enabled);
    localStorage.setItem(AUTO_LOG_RECUR_KEY, String(autoLogRecurring));
  } catch (e) {}
}

/**
 * Loads Quick-Add favorite templates from LocalStorage (seeds helpful defaults on first visit).
 */
function loadFavoriteTemplates() {
  try {
    const raw = localStorage.getItem(TEMPLATES_KEY);
    if (raw === null) {
      const seed = [
        { id: 'tpl-1', title: 'Morning Coffee', amount: 60.00, category: 'Food & Dining' },
        { id: 'tpl-2', title: 'Metro / Auto Ride', amount: 50.00, category: 'Transportation' },
        { id: 'tpl-3', title: 'Milk & Essentials', amount: 120.00, category: 'Food & Dining' }
      ];
      localStorage.setItem(TEMPLATES_KEY, JSON.stringify(seed));
      return seed;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Error loading favorite templates:', e);
    return [];
  }
}

/**
 * Saves Quick-Add favorite templates to LocalStorage.
 */
function saveFavoriteTemplates() {
  try {
    localStorage.setItem(TEMPLATES_KEY, JSON.stringify(favoriteTemplates));
  } catch (e) {
    console.error('Error saving favorite templates:', e);
  }
}

/**
 * Displays a non-blocking floating toast notification with optional Undo action.
 */
function showToast({ message, type = 'info', duration = 5000, onUndo = null }) {
  if (!toastContainer) return;

  const icons = {
    success: '✅',
    info: 'ℹ️',
    warning: '⚠️',
    danger: '🗑️'
  };

  const toast = document.createElement('div');
  toast.className = `toast-item toast-${type}`;
  toast.setAttribute('role', 'status');

  const body = document.createElement('div');
  body.className = 'toast-body';

  const iconSpan = document.createElement('span');
  iconSpan.className = 'toast-icon';
  iconSpan.textContent = icons[type] || 'ℹ️';

  const msgSpan = document.createElement('span');
  msgSpan.className = 'toast-message';
  msgSpan.textContent = message;

  body.appendChild(iconSpan);
  body.appendChild(msgSpan);

  const actions = document.createElement('div');
  actions.className = 'toast-actions';

  let dismissed = false;
  let timerId = null;

  function dismissToast() {
    if (dismissed) return;
    dismissed = true;
    if (timerId) clearTimeout(timerId);
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'opacity 0.16s ease, transform 0.16s ease';
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 170);
  }

  if (typeof onUndo === 'function') {
    const undoBtn = document.createElement('button');
    undoBtn.type = 'button';
    undoBtn.className = 'toast-undo-btn';
    undoBtn.textContent = '↩️ Undo';
    undoBtn.addEventListener('click', () => {
      onUndo();
      dismissToast();
    });
    actions.appendChild(undoBtn);
  }

  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className = 'toast-close-btn';
  closeBtn.setAttribute('aria-label', 'Dismiss notification');
  closeBtn.textContent = '✕';
  closeBtn.addEventListener('click', dismissToast);
  actions.appendChild(closeBtn);

  const progress = document.createElement('div');
  progress.className = 'toast-progress';
  progress.style.animationDuration = `${duration}ms`;

  toast.appendChild(body);
  toast.appendChild(actions);
  toast.appendChild(progress);

  toastContainer.appendChild(toast);
  timerId = setTimeout(dismissToast, duration);
}

/**
 * Opens accessible custom confirmation modal (replaces native browser confirm()).
 */
function showConfirmDialog({ title, message, confirmLabel = 'Confirm', onConfirm }) {
  if (!confirmModal) return;
  if (confirmModalTitle) confirmModalTitle.textContent = title || 'Confirm Action';
  if (confirmModalMessage) confirmModalMessage.textContent = message || 'Are you sure?';
  if (okConfirmBtn) okConfirmBtn.textContent = confirmLabel;
  activeConfirmCallback = onConfirm;
  confirmModal.style.display = 'flex';
}

function closeConfirmModal() {
  if (!confirmModal) return;
  confirmModal.style.display = 'none';
  activeConfirmCallback = null;
}

/**
 * Loads monthly budget limit from LocalStorage or returns default.
 */
function loadMonthlyBudget() {
  try {
    const saved = localStorage.getItem(BUDGET_KEY);
    if (saved !== null && !isNaN(parseFloat(saved))) {
      return parseFloat(saved);
    }
    return DEFAULT_BUDGET;
  } catch (e) {
    return DEFAULT_BUDGET;
  }
}

/**
 * Saves monthly budget limit to LocalStorage.
 */
function saveMonthlyBudget(amount) {
  try {
    monthlyBudget = amount;
    localStorage.setItem(BUDGET_KEY, amount.toFixed(2));
  } catch (e) {
    console.error('Error saving monthly budget:', e);
  }
}

/**
 * Initializes and manages Theme (Light / Dark mode) with persistence.
 */
function initTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === 'dark' || savedTheme === 'light') {
    applyTheme(savedTheme, false);
  } else {
    // Respect OS preferred color scheme
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light', false);
  }
}

/**
 * Applies theme attribute to document root and updates button UI.
 */
function applyTheme(theme, save = true) {
  document.documentElement.setAttribute('data-theme', theme);
  if (save) {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {}
  }
  if (themeToggleBtn && themeIcon && themeLabel) {
    if (theme === 'dark') {
      themeIcon.textContent = '☀️';
      themeLabel.textContent = 'Light Mode';
      themeToggleBtn.setAttribute('title', 'Switch to light theme');
    } else {
      themeIcon.textContent = '🌙';
      themeLabel.textContent = 'Dark Mode';
      themeToggleBtn.setAttribute('title', 'Switch to dark theme');
    }
  }
}

/**
 * Toggles between light and dark themes.
 */
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme, true);
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

  // Top Category & Breakdown Calculation
  if (expenses.length === 0) {
    topCategoryNameEl.textContent = '—';
    topCategoryAmountEl.textContent = '₹0.00 spent';
    updateCategoryBreakdown({}, 0);
  } else {
    const categoryTotals = expenses.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + item.amount;
      return acc;
    }, {});

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
    updateCategoryBreakdown(categoryTotals, overallTotal);
  }

  // Always refresh Monthly Budget Target & Spending Trend Bar Chart
  updateBudgetDisplay();
  renderTrendChart();
}

/**
 * Updates the Monthly Budget card, visual progress bar, and live alert banners.
 */
function updateBudgetDisplay() {
  if (!budgetRemainingAmountEl) return;

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonthNum = String(now.getMonth() + 1).padStart(2, '0');
  const currentMonthKey = `${currentYear}-${currentMonthNum}`;
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const currentMonthName = monthNames[now.getMonth()];

  if (budgetMonthHeading) {
    budgetMonthHeading.textContent = `Monthly Budget Status (${currentMonthName} ${currentYear})`;
  }

  // Calculate this month's expenditure
  const thisMonthExpenses = expenses.filter(item => item.date && item.date.startsWith(currentMonthKey));
  const thisMonthSpent = thisMonthExpenses.reduce((sum, item) => sum + item.amount, 0);

  const remaining = monthlyBudget - thisMonthSpent;
  const pctUsed = monthlyBudget > 0 ? (thisMonthSpent / monthlyBudget) * 100 : 0;

  // Update Summary Card
  if (remaining >= 0) {
    budgetRemainingAmountEl.textContent = formatCurrency(remaining);
    budgetRemainingAmountEl.classList.remove('over-budget');
    if (budgetStatusSubtextEl) {
      budgetStatusSubtextEl.textContent = `Spent ${formatCurrency(thisMonthSpent)} of ${formatCurrency(monthlyBudget)} (${pctUsed.toFixed(1)}%)`;
    }
  } else {
    budgetRemainingAmountEl.textContent = `-${formatCurrency(Math.abs(remaining))}`;
    budgetRemainingAmountEl.classList.add('over-budget');
    if (budgetStatusSubtextEl) {
      budgetStatusSubtextEl.textContent = `Exceeded by ${formatCurrency(Math.abs(remaining))} (${pctUsed.toFixed(1)}%)`;
    }
  }

  // Update Alert Card Banner & Progress Bar
  if (budgetAlertCard) {
    budgetAlertCard.classList.remove('status-safe', 'status-warning', 'status-danger');

    // Progress bar width clamped to 100%
    const barWidth = Math.min(Math.max(pctUsed, 0), 100);
    if (budgetProgressBar) {
      budgetProgressBar.style.width = `${barWidth.toFixed(1)}%`;
    }

    if (pctUsed < 75) {
      budgetAlertCard.classList.add('status-safe');
      if (budgetStatusIcon) budgetStatusIcon.textContent = '🎯';
      if (budgetPctBadge) budgetPctBadge.textContent = `${pctUsed.toFixed(1)}% Used`;
      if (budgetStatusMessage) {
        budgetStatusMessage.textContent = `On Track: You have ${formatCurrency(remaining)} remaining within your ${formatCurrency(monthlyBudget)} target.`;
      }
    } else if (pctUsed < 100) {
      budgetAlertCard.classList.add('status-warning');
      if (budgetStatusIcon) budgetStatusIcon.textContent = '⚠️';
      if (budgetPctBadge) budgetPctBadge.textContent = `${pctUsed.toFixed(1)}% Used`;
      if (budgetStatusMessage) {
        budgetStatusMessage.textContent = `Caution: You have utilized ${pctUsed.toFixed(1)}% of your monthly budget. Only ${formatCurrency(remaining)} remaining!`;
      }
    } else {
      budgetAlertCard.classList.add('status-danger');
      if (budgetStatusIcon) budgetStatusIcon.textContent = '🚨';
      if (budgetPctBadge) budgetPctBadge.textContent = `${pctUsed.toFixed(1)}% Over Budget`;
      if (budgetStatusMessage) {
        budgetStatusMessage.textContent = `Over-Budget Alert! You have exceeded your monthly limit of ${formatCurrency(monthlyBudget)} by ${formatCurrency(Math.abs(remaining))}!`;
      }
    }

    // Update bottom metrics row
    if (budgetTargetDisplay) budgetTargetDisplay.textContent = formatCurrency(monthlyBudget);
    if (budgetSpentDisplay) budgetSpentDisplay.textContent = formatCurrency(thisMonthSpent);
    if (budgetRemainingDisplay) {
      budgetRemainingDisplay.textContent = remaining >= 0 ? formatCurrency(remaining) : `-${formatCurrency(Math.abs(remaining))} (Deficit)`;
    }
  }
}

/**
 * Opens the Monthly Budget Modal dialog.
 */
function openBudgetModal() {
  if (!budgetModal || !budgetInput) return;
  budgetInput.value = monthlyBudget.toFixed(0);
  if (budgetError) budgetError.textContent = '';
  budgetModal.style.display = 'flex';
  setTimeout(() => budgetInput.focus(), 50);
}

/**
 * Closes the Monthly Budget Modal dialog.
 */
function closeBudgetModal() {
  if (!budgetModal) return;
  budgetModal.style.display = 'none';
  if (budgetError) budgetError.textContent = '';
}

/**
 * Handles submission of new Monthly Budget target.
 */
function handleBudgetSubmit(e) {
  e.preventDefault();
  if (!budgetInput) return;

  const rawVal = budgetInput.value.trim();
  const numVal = parseFloat(rawVal);

  if (isNaN(numVal) || numVal < 100) {
    if (budgetError) budgetError.textContent = 'Please enter a valid monthly budget (minimum ₹100).';
    budgetInput.focus();
    return;
  }

  saveMonthlyBudget(numVal);
  closeBudgetModal();
  updateBudgetDisplay();
  showToast({ message: `Monthly budget target updated to ${formatCurrency(numVal)}.`, type: 'success' });
}

/**
 * Renders an interactive Pure SVG Donut Chart for category spending distribution.
 */
function renderDonutChart(sortedCategories, totalAmount) {
  if (!categoryDonutContainer) return;

  const size = 160;
  const center = size / 2;
  const radius = 58;
  const circumference = 2 * Math.PI * radius;

  if (!totalAmount || sortedCategories.length === 0) {
    categoryDonutContainer.innerHTML = `
      <svg class="donut-svg" viewBox="0 0 ${size} ${size}" role="img" aria-label="Empty category chart">
        <circle cx="${center}" cy="${center}" r="${radius}" fill="none" stroke="var(--bg-hover)" stroke-width="18" />
        <text x="${center}" y="${center - 3}" text-anchor="middle" class="donut-center-label">Total</text>
        <text x="${center}" y="${center + 14}" text-anchor="middle" class="donut-center-amount">₹0.00</text>
      </svg>
    `;
    return;
  }

  const gapLen = sortedCategories.length > 1 ? 2.5 : 0;
  let offset = 0;
  let slicesHtml = '';

  sortedCategories.forEach(([cat, amt]) => {
    const ratio = amt / totalAmount;
    const segLen = Math.max(0.5, ratio * circumference - gapLen);
    const pct = (ratio * 100).toFixed(1);
    const color = getCategoryColor(cat);

    slicesHtml += `
      <circle
        class="donut-slice"
        cx="${center}"
        cy="${center}"
        r="${radius}"
        fill="none"
        stroke="${color}"
        stroke-width="19"
        stroke-dasharray="${segLen.toFixed(2)} ${circumference.toFixed(2)}"
        stroke-dashoffset="${(-offset).toFixed(2)}"
        transform="rotate(-90 ${center} ${center})"
        data-category="${escapeHtml(cat)}"
        data-amount="${amt}"
        data-pct="${pct}"
      >
        <title>${escapeHtml(cat)}: ${formatCurrency(amt)} (${pct}%)</title>
      </circle>
    `;
    offset += ratio * circumference;
  });

  const compactTotal = totalAmount >= 100000
    ? `₹${(totalAmount / 100000).toFixed(1)}L`
    : (totalAmount >= 1000 ? `₹${(totalAmount / 1000).toFixed(1)}k` : formatCurrency(totalAmount));

  categoryDonutContainer.innerHTML = `
    <svg class="donut-svg" viewBox="0 0 ${size} ${size}" role="img" aria-label="Category spending distribution donut chart">
      <circle cx="${center}" cy="${center}" r="${radius}" fill="none" stroke="var(--bg-hover)" stroke-width="19" />
      ${slicesHtml}
      <text x="${center}" y="${center - 10}" text-anchor="middle" class="donut-center-label" id="donut-center-title">Total</text>
      <text x="${center}" y="${center + 7}" text-anchor="middle" class="donut-center-amount" id="donut-center-val">${compactTotal}</text>
      <text x="${center}" y="${center + 21}" text-anchor="middle" class="donut-center-pct" id="donut-center-pct">${sortedCategories.length} categor${sortedCategories.length === 1 ? 'y' : 'ies'}</text>
    </svg>
  `;

  const titleNode = document.getElementById('donut-center-title');
  const valNode = document.getElementById('donut-center-val');
  const pctNode = document.getElementById('donut-center-pct');

  const resetCenter = () => {
    if (titleNode) titleNode.textContent = 'Total';
    if (valNode) valNode.textContent = compactTotal;
    if (pctNode) pctNode.textContent = `${sortedCategories.length} categor${sortedCategories.length === 1 ? 'y' : 'ies'}`;
  };

  const highlightCategory = (cat, amt, pct) => {
    const shortCat = cat.length > 13 ? `${cat.slice(0, 12)}…` : cat;
    const shortAmt = amt >= 100000
      ? `₹${(amt / 100000).toFixed(1)}L`
      : (amt >= 1000 ? `₹${(amt / 1000).toFixed(1)}k` : `₹${amt.toFixed(0)}`);
    if (titleNode) titleNode.textContent = shortCat;
    if (valNode) valNode.textContent = shortAmt;
    if (pctNode) pctNode.textContent = `${pct}%`;
  };

  const toggleCategoryFilter = (cat) => {
    if (!filterCategorySelect) return;
    const nextVal = filterCategorySelect.value === cat ? 'all' : cat;
    filterCategorySelect.value = nextVal;
    render();
    showToast({
      message: nextVal === 'all' ? 'Showing all categories.' : `Filtered by "${nextVal}".`,
      type: 'info',
      duration: 2800
    });
  };

  categoryDonutContainer.querySelectorAll('.donut-slice').forEach(slice => {
    slice.addEventListener('mouseenter', () => {
      slice.classList.add('active');
      highlightCategory(slice.dataset.category, parseFloat(slice.dataset.amount), slice.dataset.pct);
    });
    slice.addEventListener('mouseleave', () => {
      slice.classList.remove('active');
      resetCenter();
    });
    slice.addEventListener('click', () => {
      toggleCategoryFilter(slice.dataset.category);
    });
  });

  return { highlightCategory, resetCenter, toggleCategoryFilter };
}

/**
 * Updates the visual category breakdown bar, SVG donut chart, and interactive legend.
 */
function updateCategoryBreakdown(categoryTotals = {}, totalAmount = 0) {
  if (!categoryProgressBar || !categoryLegend) return;

  categoryProgressBar.innerHTML = '';
  categoryLegend.innerHTML = '';

  if (totalAmount <= 0 || Object.keys(categoryTotals).length === 0) {
    renderDonutChart([], 0);
    categoryProgressBar.innerHTML = '<div style="width: 100%; background: var(--bg-hover); height: 100%;"></div>';
    categoryLegend.innerHTML = '<span class="breakdown-subtitle">No spending data to visualize</span>';
    return;
  }

  // Sort categories by expenditure (descending)
  const sorted = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);
  const donutApi = renderDonutChart(sorted, totalAmount);

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

    // Legend item (interactive hover & click-to-filter)
    const item = document.createElement('div');
    item.className = 'legend-item';
    item.title = 'Click to filter table by this category';
    item.innerHTML = `
      <span class="legend-dot" style="background-color: ${color}"></span>
      <span class="legend-name">${escapeHtml(cat)}</span>
      <span>${formatCurrency(amt)}</span>
      <span class="legend-pct">(${pct}%)</span>
    `;

    item.addEventListener('mouseenter', () => {
      if (donutApi) donutApi.highlightCategory(cat, amt, pct);
    });
    item.addEventListener('mouseleave', () => {
      if (donutApi) donutApi.resetCenter();
    });
    item.addEventListener('click', () => {
      if (donutApi) donutApi.toggleCategoryFilter(cat);
    });

    categoryLegend.appendChild(item);
  });
}

/**
 * Renders Pure SVG Spending Trend Bar Chart (7 Days or 6 Months) with tooltips & MoM delta.
 */
function renderTrendChart() {
  if (!trendChartContainer) return;

  const now = new Date();
  const buckets = [];

  // Calculate Month-over-Month delta for header badge
  const curMonthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const prevMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const prevMonthKey = `${prevMonthDate.getFullYear()}-${String(prevMonthDate.getMonth() + 1).padStart(2, '0')}`;

  const curMonthSum = expenses
    .filter(e => e.date && e.date.startsWith(curMonthKey))
    .reduce((s, e) => s + e.amount, 0);
  const prevMonthSum = expenses
    .filter(e => e.date && e.date.startsWith(prevMonthKey))
    .reduce((s, e) => s + e.amount, 0);

  if (trendDeltaBadge) {
    if (prevMonthSum > 0) {
      const diffPct = ((curMonthSum - prevMonthSum) / prevMonthSum) * 100;
      const arrow = diffPct <= 0 ? '↓' : '↑';
      trendDeltaBadge.textContent = `${arrow} ${Math.abs(diffPct).toFixed(1)}% vs last month (${formatCurrency(curMonthSum)} this mo)`;
    } else {
      trendDeltaBadge.textContent = `This month: ${formatCurrency(curMonthSum)}`;
    }
  }

  if (activeChartRange === '6m') {
    const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    for (let i = 5; i >= 0; i--) {
      const dt = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const ym = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}`;
      const matched = expenses.filter(e => e.date && e.date.startsWith(ym));
      buckets.push({
        label: shortMonths[dt.getMonth()],
        fullLabel: `${shortMonths[dt.getMonth()]} ${dt.getFullYear()}`,
        total: matched.reduce((s, e) => s + e.amount, 0),
        count: matched.length,
        isCurrent: i === 0
      });
    }
  } else {
    const shortDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    for (let i = 6; i >= 0; i--) {
      const dt = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
      const ymd = formatDateYMD(dt);
      const matched = expenses.filter(e => e.date === ymd);
      buckets.push({
        label: i === 0 ? 'Today' : shortDays[dt.getDay()],
        fullLabel: formatDate(ymd),
        total: matched.reduce((s, e) => s + e.amount, 0),
        count: matched.length,
        isCurrent: i === 0
      });
    }
  }

  const svgW = 420;
  const svgH = 148;
  const padLeft = 42;
  const padRight = 10;
  const padTop = 14;
  const padBottom = 22;
  const chartW = svgW - padLeft - padRight;
  const chartH = svgH - padTop - padBottom;

  const rawMax = Math.max(...buckets.map(b => b.total), 0);
  const niceMax = rawMax <= 0 ? 1000 : Math.ceil(rawMax / 500) * 500;

  const formatYLabel = (val) => {
    if (val === 0) return '₹0';
    if (val >= 1000) return `₹${(val / 1000).toFixed(val % 1000 === 0 ? 0 : 1)}k`;
    return `₹${val}`;
  };

  // Horizontal gridlines (0%, 50%, 100%)
  let gridHtml = '';
  [0, 0.5, 1].forEach(ratio => {
    const y = padTop + chartH * (1 - ratio);
    const val = Math.round(niceMax * ratio);
    gridHtml += `
      <line x1="${padLeft}" y1="${y.toFixed(1)}" x2="${svgW - padRight}" y2="${y.toFixed(1)}" class="trend-gridline" />
      <text x="${padLeft - 6}" y="${(y + 3).toFixed(1)}" text-anchor="end" class="trend-axis-label">${formatYLabel(val)}</text>
    `;
  });

  const slotW = chartW / buckets.length;
  const barW = Math.min(30, slotW * 0.56);
  let barsHtml = '';

  buckets.forEach((b, idx) => {
    const cx = padLeft + idx * slotW + slotW / 2;
    const bx = cx - barW / 2;
    const barHeight = b.total > 0 ? Math.max(4, (b.total / niceMax) * chartH) : 0;
    const by = padTop + chartH - barHeight;

    barsHtml += `
      <g class="trend-bar-group" data-label="${escapeHtml(b.fullLabel)}" data-total="${b.total}" data-count="${b.count}" data-cx="${cx.toFixed(1)}" data-top="${by.toFixed(1)}">
        <rect x="${bx.toFixed(1)}" y="${padTop}" width="${barW.toFixed(1)}" height="${chartH}" rx="4" class="trend-bar-bg" />
        ${barHeight > 0 ? `<rect x="${bx.toFixed(1)}" y="${by.toFixed(1)}" width="${barW.toFixed(1)}" height="${barHeight.toFixed(1)}" rx="4" class="trend-bar ${b.isCurrent ? 'current-bar' : ''}" />` : ''}
        <text x="${cx.toFixed(1)}" y="${svgH - 5}" text-anchor="middle" class="trend-axis-label">${escapeHtml(b.label)}</text>
      </g>
    `;
  });

  trendChartContainer.innerHTML = `
    <svg class="trend-svg" viewBox="0 0 ${svgW} ${svgH}" role="img" aria-label="Spending trend bar chart">
      ${gridHtml}
      ${barsHtml}
    </svg>
    <div class="trend-tooltip" id="trend-tooltip"></div>
  `;

  const tooltipEl = document.getElementById('trend-tooltip');
  const svgEl = trendChartContainer.querySelector('.trend-svg');

  trendChartContainer.querySelectorAll('.trend-bar-group').forEach(group => {
    group.addEventListener('mouseenter', () => {
      if (!tooltipEl || !svgEl) return;
      const amt = parseFloat(group.dataset.total || '0');
      const cnt = parseInt(group.dataset.count || '0', 10);
      const cxRatio = parseFloat(group.dataset.cx) / svgW;
      const topRatio = parseFloat(group.dataset.top) / svgH;
      const rect = svgEl.getBoundingClientRect();

      tooltipEl.textContent = `${group.dataset.label}: ${formatCurrency(amt)} (${cnt} item${cnt === 1 ? '' : 's'})`;
      tooltipEl.style.left = `${(cxRatio * rect.width).toFixed(1)}px`;
      tooltipEl.style.top = `${Math.max(18, topRatio * rect.height - 6).toFixed(1)}px`;
      tooltipEl.classList.add('visible');
    });

    group.addEventListener('mouseleave', () => {
      if (tooltipEl) tooltipEl.classList.remove('visible');
    });
  });
}

// ==========================================================================
// Recurring Expenses & Bill Reminders Engine
// ==========================================================================

/**
 * Computes day difference from today (YYYY-MM-DD) to targetDate (negative = overdue).
 */
function getDaysUntilDate(targetYMD) {
  const todayParts = getTodayYMD().split('-').map(Number);
  const targetParts = (targetYMD || getTodayYMD()).split('-').map(Number);
  const t1 = new Date(todayParts[0], todayParts[1] - 1, todayParts[2]);
  const t2 = new Date(targetParts[0], targetParts[1] - 1, targetParts[2]);
  return Math.round((t2 - t1) / 86400000);
}

/**
 * Auto-logs due recurring bills on app load if user enabled auto-log preference.
 */
function processAutoLogDueBills() {
  if (!autoLogRecurring) return;
  const todayYMD = getTodayYMD();
  let loggedCount = 0;

  recurringRules.forEach(rule => {
    if (!rule.active) return;
    let safety = 0;
    while (rule.nextDueDate && rule.nextDueDate <= todayYMD && safety < 12) {
      expenses.unshift({
        id: 'exp-' + Date.now() + '-' + Math.floor(Math.random() * 10000),
        title: rule.title,
        amount: rule.amount,
        category: rule.category,
        date: rule.nextDueDate,
        recurring: rule.frequency
      });
      rule.nextDueDate = advanceDateByFrequency(rule.nextDueDate, rule.frequency);
      loggedCount++;
      safety++;
    }
  });

  if (loggedCount > 0) {
    saveExpenses();
    saveRecurringRules();
    showToast({
      message: `Auto-logged ${loggedCount} due recurring expense${loggedCount === 1 ? '' : 's'}.`,
      type: 'info',
      duration: 5500
    });
  }
}

/**
 * Evaluates active recurring rules, updates header badge & Upcoming Bill Reminder strip.
 */
function evaluateRecurringReminders() {
  const activeRules = recurringRules.filter(r => r.active);
  if (recurringCountBadge) {
    recurringCountBadge.textContent = activeRules.length;
  }

  if (!recurringReminderBar) return;

  // Find due now or upcoming within next 7 days
  const upcoming = activeRules
    .map(r => ({ rule: r, daysLeft: getDaysUntilDate(r.nextDueDate) }))
    .filter(item => item.daysLeft <= 7)
    .sort((a, b) => a.daysLeft - b.daysLeft);

  if (upcoming.length === 0) {
    recurringReminderBar.style.display = 'none';
    return;
  }

  const next = upcoming[0];
  recurringReminderBar.style.display = 'flex';
  recurringReminderBar.classList.toggle('reminder-due', next.daysLeft <= 0);

  let statusLead = '';
  if (next.daysLeft < 0) {
    statusLead = `Overdue by ${Math.abs(next.daysLeft)} day${Math.abs(next.daysLeft) === 1 ? '' : 's'}`;
  } else if (next.daysLeft === 0) {
    statusLead = 'Due Today';
  } else {
    statusLead = `Due in ${next.daysLeft} day${next.daysLeft === 1 ? '' : 's'}`;
  }

  if (reminderTitleEl) {
    reminderTitleEl.textContent = `${statusLead}: ${next.rule.title} (${formatCurrency(next.rule.amount)})`;
  }
  if (reminderDescEl) {
    const extraCount = upcoming.length - 1;
    const freqLabel = next.rule.frequency === 'weekly' ? 'Weekly' : 'Monthly';
    reminderDescEl.textContent = `${freqLabel} • ${next.rule.category} • Scheduled ${formatDate(next.rule.nextDueDate)}${extraCount > 0 ? ` (+${extraCount} more upcoming)` : ''}`;
  }
  if (reminderQuickLogBtn) {
    reminderQuickLogBtn.dataset.ruleId = next.rule.id;
  }
}

/**
 * Immediately logs a recurring bill as an expense and advances its next due date (with Undo).
 */
function logRecurringRuleNow(ruleId) {
  const rule = recurringRules.find(r => r.id === ruleId);
  if (!rule) return;

  const prevDue = rule.nextDueDate;
  const newExp = {
    id: 'exp-' + Date.now(),
    title: rule.title,
    amount: rule.amount,
    category: rule.category,
    date: getTodayYMD(),
    recurring: rule.frequency
  };

  expenses.unshift(newExp);
  rule.nextDueDate = advanceDateByFrequency(
    prevDue < getTodayYMD() ? getTodayYMD() : prevDue,
    rule.frequency
  );

  saveExpenses();
  saveRecurringRules();
  render();
  if (recurringModal && recurringModal.style.display !== 'none') {
    renderRecurringModalList();
  }

  showToast({
    message: `Logged "${rule.title}" (${formatCurrency(rule.amount)}). Next due ${formatDate(rule.nextDueDate)}.`,
    type: 'success',
    onUndo: () => {
      expenses = expenses.filter(e => e.id !== newExp.id);
      rule.nextDueDate = prevDue;
      saveExpenses();
      saveRecurringRules();
      render();
      if (recurringModal && recurringModal.style.display !== 'none') {
        renderRecurringModalList();
      }
      showToast({ message: `Reverted "${rule.title}".`, type: 'info', duration: 2500 });
    }
  });
}

function renderRecurringModalList() {
  if (!recurringListContainer) return;

  if (autoLogRecurringToggle) {
    autoLogRecurringToggle.checked = autoLogRecurring;
  }

  if (recurringRules.length === 0) {
    recurringListContainer.innerHTML = '<div class="recurring-empty-msg">No recurring bills scheduled yet. Select <strong>Weekly</strong> or <strong>Monthly</strong> when adding an expense to create one!</div>';
    return;
  }

  recurringListContainer.innerHTML = recurringRules.map(rule => {
    const daysLeft = getDaysUntilDate(rule.nextDueDate);
    let pillClass = 'scheduled';
    let pillText = `Due ${formatDate(rule.nextDueDate)}`;

    if (!rule.active) {
      pillClass = 'scheduled';
      pillText = 'Paused';
    } else if (daysLeft < 0) {
      pillClass = 'due-now';
      pillText = `Overdue (${Math.abs(daysLeft)}d)`;
    } else if (daysLeft === 0) {
      pillClass = 'due-now';
      pillText = 'Due Today';
    } else if (daysLeft <= 7) {
      pillClass = 'due-soon';
      pillText = `Due in ${daysLeft}d`;
    }

    const freqLabel = rule.frequency === 'weekly' ? 'Weekly' : 'Monthly';

    return `
      <div class="recurring-item-card ${rule.active ? '' : 'paused'}" data-rule-id="${rule.id}">
        <div class="recurring-item-main">
          <div class="recurring-item-title">
            <span>${escapeHtml(rule.title)}</span>
            <span class="recurring-status-pill ${pillClass}">${pillText}</span>
          </div>
          <div class="recurring-item-meta">
            <strong>${formatCurrency(rule.amount)}</strong> • ${escapeHtml(rule.category)} • 🔁 ${freqLabel}
          </div>
        </div>
        <div class="recurring-item-actions">
          <button type="button" class="action-btn edit-action rec-log-btn" data-id="${rule.id}" title="Log this expense today">✓ Log</button>
          <button type="button" class="action-btn rec-toggle-btn" data-id="${rule.id}" title="${rule.active ? 'Pause reminders' : 'Resume reminders'}">${rule.active ? '⏸' : '▶'}</button>
          <button type="button" class="action-btn delete-action rec-delete-btn" data-id="${rule.id}" title="Delete recurring schedule">🗑️</button>
        </div>
      </div>
    `;
  }).join('');
}

function openRecurringModal() {
  if (!recurringModal) return;
  renderRecurringModalList();
  recurringModal.style.display = 'flex';
}

function closeRecurringModal() {
  if (!recurringModal) return;
  recurringModal.style.display = 'none';
}

// ==========================================================================
// Quick-Add Favorite Templates Engine
// ==========================================================================

/**
 * Resolves a matching emoji badge icon for any category string.
 */
function getCategoryEmojiIcon(category) {
  const cls = getCategoryClass(category);
  switch (cls) {
    case 'cat-food': return '🍔';
    case 'cat-transport': return '🚗';
    case 'cat-housing': return '💡';
    case 'cat-entertainment': return '🎬';
    case 'cat-health': return '💊';
    case 'cat-shopping': return '🛍️';
    default: return '🏷️';
  }
}

/**
 * Renders 1-click Quick-Add favorite template chips above the form.
 */
function renderFavoriteTemplates() {
  if (!favoriteTemplatesList) return;

  if (favoriteTemplates.length === 0) {
    favoriteTemplatesList.innerHTML = '<span class="templates-empty">No templates pinned yet. Fill the form and click <strong>+ Pin Current</strong>.</span>';
    return;
  }

  favoriteTemplatesList.innerHTML = favoriteTemplates.map(tpl => {
    const icon = getCategoryEmojiIcon(tpl.category);
    return `
      <div class="template-chip" data-tpl-id="${tpl.id}">
        <button type="button" class="template-chip-main" data-id="${tpl.id}" title="Click to instantly log ${escapeHtml(tpl.title)} (${formatCurrency(tpl.amount)})">
          <span>${icon}</span>
          <span>${escapeHtml(tpl.title)}</span>
          <span class="template-chip-amount">₹${Number(tpl.amount).toFixed(0)}</span>
        </button>
        <button type="button" class="template-chip-remove" data-id="${tpl.id}" aria-label="Remove template ${escapeHtml(tpl.title)}" title="Unpin template">✕</button>
      </div>
    `;
  }).join('');
}

/**
 * Logs an expense immediately from a favorite template for today's date (with 5s Undo).
 */
function handleUseTemplate(templateId) {
  const tpl = favoriteTemplates.find(t => t.id === templateId);
  if (!tpl) return;

  const newExp = {
    id: 'exp-' + Date.now(),
    title: tpl.title,
    amount: Number(tpl.amount),
    category: tpl.category,
    date: getTodayYMD()
  };

  expenses.unshift(newExp);
  saveExpenses();
  render();

  showToast({
    message: `Quick-added "${tpl.title}" (${formatCurrency(tpl.amount)}).`,
    type: 'success',
    duration: 5000,
    onUndo: () => {
      expenses = expenses.filter(e => e.id !== newExp.id);
      saveExpenses();
      render();
      showToast({ message: `Undid quick-add "${tpl.title}".`, type: 'info', duration: 2500 });
    }
  });
}

/**
 * Pins the current Title, Amount, and Category form inputs as a Quick-Add template.
 */
function handlePinCurrentAsTemplate() {
  clearErrors();
  const title = expenseTitleInput ? expenseTitleInput.value.trim() : '';
  const amount = expenseAmountInput ? parseFloat(expenseAmountInput.value) : NaN;
  const category = expenseCategoryInput ? expenseCategoryInput.value.trim() : '';

  let ok = true;
  if (!title || title.length < 2) {
    if (titleError) titleError.textContent = 'Enter a title (min 2 chars) to pin template.';
    if (expenseTitleInput) expenseTitleInput.classList.add('input-error');
    ok = false;
  }
  if (isNaN(amount) || amount <= 0) {
    if (amountError) amountError.textContent = 'Enter amount > ₹0.00 to pin template.';
    if (expenseAmountInput) expenseAmountInput.classList.add('input-error');
    ok = false;
  }
  if (!category) {
    if (categoryError) categoryError.textContent = 'Enter category to pin template.';
    if (expenseCategoryInput) expenseCategoryInput.classList.add('input-error');
    ok = false;
  }
  if (!ok) {
    showToast({ message: 'Fill Title, Amount, and Category first to pin a template.', type: 'warning', duration: 3200 });
    return;
  }

  const duplicate = favoriteTemplates.some(
    t => t.title.toLowerCase() === title.toLowerCase() &&
         Number(t.amount).toFixed(2) === amount.toFixed(2) &&
         t.category.toLowerCase() === category.toLowerCase()
  );

  if (duplicate) {
    showToast({ message: `Template "${title}" is already pinned.`, type: 'info', duration: 2800 });
    return;
  }

  favoriteTemplates.push({
    id: 'tpl-' + Date.now(),
    title,
    amount,
    category
  });
  saveFavoriteTemplates();
  renderFavoriteTemplates();
  showToast({ message: `Pinned "${title}" (${formatCurrency(amount)}) to Quick Templates.`, type: 'success', duration: 3200 });
}

/**
 * Removes a Quick-Add template chip with 5s Undo support.
 */
function handleRemoveTemplate(templateId) {
  const idx = favoriteTemplates.findIndex(t => t.id === templateId);
  if (idx === -1) return;

  const removed = { ...favoriteTemplates[idx] };
  favoriteTemplates.splice(idx, 1);
  saveFavoriteTemplates();
  renderFavoriteTemplates();

  showToast({
    message: `Unpinned template "${removed.title}".`,
    type: 'danger',
    duration: 5000,
    onUndo: () => {
      favoriteTemplates.splice(Math.min(idx, favoriteTemplates.length), 0, removed);
      saveFavoriteTemplates();
      renderFavoriteTemplates();
      showToast({ message: `Restored template "${removed.title}".`, type: 'success', duration: 2500 });
    }
  });
}

// ==========================================================================
// Data Backup, Restore & Import (.json / .csv) Engine
// ==========================================================================

/**
 * Triggers browser download for generated text/JSON/CSV files.
 */
function downloadTextFile(content, fileName, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Exports full application backup (expenses, budget, recurring rules, templates & theme) as JSON.
 */
function handleExportJSON() {
  const payload = {
    app: 'Veda Technology Interactive Expense Tracker',
    version: '1.4.0',
    exportedAt: new Date().toISOString(),
    monthlyBudget,
    theme: document.documentElement.getAttribute('data-theme') || 'light',
    autoLogRecurring,
    expenses,
    recurringRules,
    favoriteTemplates
  };

  const today = getTodayYMD();
  downloadTextFile(JSON.stringify(payload, null, 2), `Expense_Backup_${today}.json`, 'application/json');
  showToast({
    message: `Exported full JSON backup (${expenses.length} expenses, ${recurringRules.length} recurring rules).`,
    type: 'success',
    duration: 3600
  });
}

function csvEscape(val) {
  const str = String(val == null ? '' : val);
  if (str.includes('"') || str.includes(',') || str.includes('\n') || str.includes('\r')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

/**
 * Exports all recorded expenses as an RFC-4180 CSV spreadsheet.
 */
function handleExportCSV() {
  if (expenses.length === 0) {
    showToast({ message: 'No expenses recorded to export to CSV.', type: 'warning', duration: 3000 });
    return;
  }

  const header = ['Date', 'Title', 'Category', 'Amount', 'Recurring'];
  const rows = expenses.map(e => [
    csvEscape(e.date),
    csvEscape(e.title),
    csvEscape(e.category),
    Number(e.amount || 0).toFixed(2),
    csvEscape(e.recurring || 'none')
  ].join(','));

  const csvContent = '\uFEFF' + [header.join(','), ...rows].join('\r\n');
  const today = getTodayYMD();
  downloadTextFile(csvContent, `Expense_Data_${today}.csv`, 'text/csv;charset=utf-8');
  showToast({
    message: `Exported ${expenses.length} expense${expenses.length === 1 ? '' : 's'} to CSV.`,
    type: 'success',
    duration: 3400
  });
}

/**
 * Normalizes YYYY-MM-DD, YYYY/MM/DD, DD-MM-YYYY, DD/MM/YYYY, or ISO timestamps to YYYY-MM-DD.
 */
function normalizeImportedDate(raw) {
  const str = String(raw || '').trim();
  if (!str) return null;

  // Match YYYY-MM-DD or YYYY/MM/DD (optionally followed by T...)
  let m = str.match(/^(\d{4})[-\/](\d{1,2})[-\/](\d{1,2})/);
  let y, mo, d;
  if (m) {
    y = parseInt(m[1], 10);
    mo = parseInt(m[2], 10);
    d = parseInt(m[3], 10);
  } else {
    // Match DD-MM-YYYY or DD/MM/YYYY
    m = str.match(/^(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})$/);
    if (m) {
      d = parseInt(m[1], 10);
      mo = parseInt(m[2], 10);
      y = parseInt(m[3], 10);
    }
  }

  if (m) {
    if (y >= 1900 && y <= 2100 && mo >= 1 && mo <= 12 && d >= 1 && d <= 31) {
      const dt = new Date(y, mo - 1, d);
      if (dt.getFullYear() === y && dt.getMonth() === mo - 1 && dt.getDate() === d) {
        return formatDateYMD(dt);
      }
    }
    return null; // Reject impossible numeric dates (e.g. Feb 30) rather than rolling over
  }

  const parsed = new Date(str);
  if (!isNaN(parsed.getTime()) && parsed.getFullYear() >= 1900 && parsed.getFullYear() <= 2100) {
    return formatDateYMD(parsed);
  }
  return null;
}

/**
 * Validates and normalizes an imported expense object from either JSON or CSV.
 */
function sanitizeExpenseRecord(rawObj) {
  if (!rawObj || typeof rawObj !== 'object') return null;

  const title = String(rawObj.title || rawObj.description || rawObj.name || '').trim().slice(0, 60);
  const amtRaw = String(rawObj.amount ?? '').replace(/[₹$,\s]/g, '');
  const amount = parseFloat(amtRaw);
  const category = String(rawObj.category || rawObj.type || 'Other').trim().slice(0, 40) || 'Other';
  const date = normalizeImportedDate(rawObj.date);

  if (!title || isNaN(amount) || !isFinite(amount) || amount <= 0 || !date) {
    return null;
  }

  const rec = {
    title,
    amount: Math.round(amount * 100) / 100,
    category,
    date
  };

  if (rawObj.recurring === 'weekly' || rawObj.recurring === 'monthly') {
    rec.recurring = rawObj.recurring;
  }
  return rec;
}

function buildExpenseFingerprint(item) {
  return `${item.date}|${String(item.title || '').trim().toLowerCase()}|${Number(item.amount).toFixed(2)}`;
}

/**
 * Parses a single RFC-4180 CSV line respecting double-quoted commas and escaped quotes.
 */
function parseImportedCSVLine(line) {
  const fields = [];
  let cur = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"') {
        if (i + 1 < line.length && line[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        cur += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ',') {
      fields.push(cur.trim());
      cur = '';
    } else {
      cur += ch;
    }
  }
  fields.push(cur.trim());
  return fields;
}

/**
 * Parses uploaded CSV text into sanitized expense records + skipped row count.
 */
function parseImportedCSV(text) {
  const cleaned = String(text || '').replace(/^\uFEFF/, '');
  const lines = cleaned.split(/\r?\n/).filter(l => l.trim().length > 0);
  if (lines.length < 2) {
    throw new Error('CSV file must include a header row and at least one data row.');
  }

  const headers = parseImportedCSVLine(lines[0]).map(h => h.toLowerCase().replace(/[^a-z0-9]/g, ''));
  const findCol = (aliases) => headers.findIndex(h => aliases.some(a => h === a || h.includes(a)));

  const dateIdx = findCol(['date', 'day', 'time']);
  const titleIdx = findCol(['title', 'description', 'desc', 'name', 'item', 'memo']);
  const catIdx = findCol(['category', 'cat', 'type', 'group']);
  const amtIdx = findCol(['amount', 'amt', 'price', 'cost', 'inr', 'value']);
  const recurIdx = findCol(['recurring', 'repeat', 'freq']);

  if (titleIdx === -1 || amtIdx === -1 || dateIdx === -1) {
    throw new Error('Missing required CSV columns. Expected headers: Date, Title, Category, Amount.');
  }

  const records = [];
  let skippedCount = 0;

  for (let i = 1; i < lines.length; i++) {
    const cols = parseImportedCSVLine(lines[i]);
    const sanitized = sanitizeExpenseRecord({
      date: cols[dateIdx],
      title: cols[titleIdx],
      category: catIdx !== -1 ? cols[catIdx] : 'Other',
      amount: cols[amtIdx],
      recurring: recurIdx !== -1 ? cols[recurIdx] : undefined
    });
    if (sanitized) records.push(sanitized);
    else skippedCount++;
  }

  if (records.length === 0) {
    throw new Error('No valid expense rows found inside this CSV file.');
  }

  return { records, skippedCount, backupMeta: null };
}

/**
 * Parses uploaded JSON backup or plain expense array into validated records & metadata.
 */
function parseImportedJSON(text) {
  let parsed;
  try {
    parsed = JSON.parse(String(text || '').replace(/^\uFEFF/, ''));
  } catch (e) {
    throw new Error('Invalid JSON syntax. Please choose a valid JSON backup file.');
  }

  const rawList = Array.isArray(parsed)
    ? parsed
    : (parsed && Array.isArray(parsed.expenses) ? parsed.expenses : null);

  if (!rawList) {
    throw new Error('JSON file does not contain an expenses array.');
  }

  const records = [];
  let skippedCount = 0;
  rawList.forEach(item => {
    const sanitized = sanitizeExpenseRecord(item);
    if (sanitized) records.push(sanitized);
    else skippedCount++;
  });

  let backupMeta = null;
  if (!Array.isArray(parsed)) {
    backupMeta = {
      monthlyBudget: (typeof parsed.monthlyBudget === 'number' && parsed.monthlyBudget >= 100) ? parsed.monthlyBudget : null,
      theme: (parsed.theme === 'dark' || parsed.theme === 'light') ? parsed.theme : null,
      autoLogRecurring: typeof parsed.autoLogRecurring === 'boolean' ? parsed.autoLogRecurring : null,
      recurringRules: Array.isArray(parsed.recurringRules)
        ? parsed.recurringRules.filter(r => r && r.title && r.amount > 0 && (r.frequency === 'weekly' || r.frequency === 'monthly') && normalizeImportedDate(r.nextDueDate))
        : null,
      favoriteTemplates: Array.isArray(parsed.favoriteTemplates)
        ? parsed.favoriteTemplates.filter(t => t && t.title && t.amount > 0 && t.category)
        : null
    };
  }

  if (records.length === 0 && !backupMeta) {
    throw new Error('No valid expenses or backup settings found in this JSON file.');
  }

  return { records, skippedCount, backupMeta };
}

function clearImportPreview() {
  pendingImportData = null;
  if (importFileInput) importFileInput.value = '';
  if (importPreviewBox) importPreviewBox.style.display = 'none';
  if (importErrorMsg) importErrorMsg.textContent = '';
}

/**
 * Reads selected/dropped .json or .csv file, validates entries, detects duplicates & shows preview.
 */
function handleImportFile(file) {
  if (!file) return;
  if (importErrorMsg) importErrorMsg.textContent = '';

  const nameLower = (file.name || '').toLowerCase();
  const isJson = nameLower.endsWith('.json') || file.type === 'application/json';
  const isCsv = nameLower.endsWith('.csv') || file.type === 'text/csv';

  if (!isJson && !isCsv) {
    clearImportPreview();
    if (importErrorMsg) importErrorMsg.textContent = 'Unsupported file type. Please choose a .json or .csv file.';
    return;
  }

  const reader = new FileReader();
  reader.onload = (ev) => {
    try {
      const content = ev.target.result;
      const parsed = isJson ? parseImportedJSON(content) : parseImportedCSV(content);

      const existingFingerprints = new Set(expenses.map(buildExpenseFingerprint));
      const duplicateCount = parsed.records.filter(r => existingFingerprints.has(buildExpenseFingerprint(r))).length;

      pendingImportData = {
        format: isJson ? 'JSON' : 'CSV',
        fileName: file.name,
        records: parsed.records,
        skippedCount: parsed.skippedCount,
        duplicateCount,
        backupMeta: parsed.backupMeta
      };

      if (importFileName) importFileName.textContent = file.name;
      if (importFormatBadge) importFormatBadge.textContent = pendingImportData.format;
      if (importPreviewStats) {
        const lines = [
          `✅ <strong>${parsed.records.length}</strong> valid expense${parsed.records.length === 1 ? '' : 's'} ready to import`,
          duplicateCount > 0 ? `• 🔁 <strong>${duplicateCount}</strong> matching duplicate${duplicateCount === 1 ? '' : 's'} detected` : '• No duplicate expenses detected'
        ];
        if (parsed.skippedCount > 0) {
          lines.push(`• ⚠️ <strong>${parsed.skippedCount}</strong> incomplete/invalid row${parsed.skippedCount === 1 ? '' : 's'} skipped`);
        }
        if (parsed.backupMeta) {
          const extras = [];
          if (parsed.backupMeta.monthlyBudget !== null) extras.push(`Budget (${formatCurrency(parsed.backupMeta.monthlyBudget)})`);
          if (parsed.backupMeta.recurringRules && parsed.backupMeta.recurringRules.length > 0) extras.push(`${parsed.backupMeta.recurringRules.length} recurring rules`);
          if (parsed.backupMeta.favoriteTemplates && parsed.backupMeta.favoriteTemplates.length > 0) extras.push(`${parsed.backupMeta.favoriteTemplates.length} templates`);
          if (extras.length > 0) lines.push(`• ⚙️ Includes settings: ${extras.join(', ')}`);
        }
        importPreviewStats.innerHTML = lines.join('<br>');
      }

      if (importRestoreSettingsWrap) {
        const hasSettings = Boolean(
          parsed.backupMeta &&
          (parsed.backupMeta.monthlyBudget !== null ||
           (parsed.backupMeta.recurringRules && parsed.backupMeta.recurringRules.length > 0) ||
           (parsed.backupMeta.favoriteTemplates && parsed.backupMeta.favoriteTemplates.length > 0))
        );
        importRestoreSettingsWrap.style.display = hasSettings ? 'inline-flex' : 'none';
      }

      if (importPreviewBox) importPreviewBox.style.display = 'block';
    } catch (err) {
      clearImportPreview();
      if (importErrorMsg) importErrorMsg.textContent = err.message || 'Unable to parse file.';
    }
  };
  reader.onerror = () => {
    clearImportPreview();
    if (importErrorMsg) importErrorMsg.textContent = 'Failed to read file from disk.';
  };
  reader.readAsText(file);
}

/**
 * Applies pending import data via Merge or Replace mode, with full state Undo support.
 */
function executeImport(mode) {
  if (!pendingImportData) return;

  const { records, backupMeta, fileName } = pendingImportData;
  const skipDupes = importSkipDupesCheckbox ? importSkipDupesCheckbox.checked : true;
  const restoreSettings = importRestoreSettingsCheckbox ? importRestoreSettingsCheckbox.checked : false;

  // Snapshot full previous state for 5s Undo recovery
  const snapshot = {
    expenses: expenses.map(e => ({ ...e })),
    monthlyBudget,
    recurringRules: recurringRules.map(r => ({ ...r })),
    favoriteTemplates: favoriteTemplates.map(t => ({ ...t })),
    autoLogRecurring,
    theme: document.documentElement.getAttribute('data-theme') || 'light'
  };

  const baseTs = Date.now();
  const makeUniqueExpenses = (arr) => arr.map((r, idx) => ({
    ...r,
    id: `exp-imp-${baseTs}-${idx}-${Math.floor(Math.random() * 1000)}`
  }));

  let addedCount = 0;

  if (mode === 'replace') {
    expenses = makeUniqueExpenses(records);
    addedCount = expenses.length;
    selectedExpenseIds.clear();

    if (backupMeta && restoreSettings) {
      if (backupMeta.monthlyBudget !== null) saveMonthlyBudget(backupMeta.monthlyBudget);
      if (backupMeta.recurringRules) recurringRules = backupMeta.recurringRules.map(r => ({ ...r }));
      if (backupMeta.favoriteTemplates) favoriteTemplates = backupMeta.favoriteTemplates.map(t => ({ ...t }));
      if (backupMeta.autoLogRecurring !== null) saveAutoLogPreference(backupMeta.autoLogRecurring);
      if (backupMeta.theme) applyTheme(backupMeta.theme, true);
    }
  } else {
    const existingSet = new Set(expenses.map(buildExpenseFingerprint));
    const filteredToAdd = skipDupes
      ? records.filter(r => !existingSet.has(buildExpenseFingerprint(r)))
      : records;

    const prepared = makeUniqueExpenses(filteredToAdd);
    expenses = [...prepared, ...expenses];
    addedCount = prepared.length;

    if (backupMeta && restoreSettings) {
      if (backupMeta.monthlyBudget !== null) saveMonthlyBudget(backupMeta.monthlyBudget);
      if (backupMeta.recurringRules) {
        const existingRuleKeys = new Set(recurringRules.map(r => `${r.title.toLowerCase()}|${r.frequency}`));
        backupMeta.recurringRules.forEach(r => {
          if (!existingRuleKeys.has(`${r.title.toLowerCase()}|${r.frequency}`)) {
            recurringRules.push({ ...r, id: r.id || `rec-imp-${Date.now()}-${Math.floor(Math.random() * 1000)}` });
          }
        });
      }
      if (backupMeta.favoriteTemplates) {
        const existingTplKeys = new Set(favoriteTemplates.map(t => `${t.title.toLowerCase()}|${Number(t.amount).toFixed(2)}`));
        backupMeta.favoriteTemplates.forEach(t => {
          if (!existingTplKeys.has(`${t.title.toLowerCase()}|${Number(t.amount).toFixed(2)}`)) {
            favoriteTemplates.push({ ...t, id: t.id || `tpl-imp-${Date.now()}-${Math.floor(Math.random() * 1000)}` });
          }
        });
      }
    }
  }

  saveExpenses();
  saveRecurringRules();
  saveFavoriteTemplates();
  closeBackupModal();
  render();

  showToast({
    message: mode === 'replace'
      ? `Restored ${addedCount} expenses from "${fileName}".`
      : `Imported ${addedCount} new expense${addedCount === 1 ? '' : 's'} from "${fileName}".`,
    type: 'success',
    duration: 5500,
    onUndo: () => {
      expenses = snapshot.expenses;
      saveMonthlyBudget(snapshot.monthlyBudget);
      recurringRules = snapshot.recurringRules;
      favoriteTemplates = snapshot.favoriteTemplates;
      saveAutoLogPreference(snapshot.autoLogRecurring);
      applyTheme(snapshot.theme, true);
      saveExpenses();
      saveRecurringRules();
      saveFavoriteTemplates();
      render();
      showToast({ message: 'Reverted import & restored previous state.', type: 'info', duration: 2800 });
    }
  });
}

function openBackupModal() {
  if (!backupModal) return;
  clearImportPreview();
  backupModal.style.display = 'flex';
}

function closeBackupModal() {
  if (!backupModal) return;
  backupModal.style.display = 'none';
  clearImportPreview();
}

/**
 * Synchronizes the category filter dropdown options with all existing categories.
 */
function updateCategoryFilterOptions() {
  let currentVal = filterCategorySelect ? filterCategorySelect.value : 'all';
  const categories = Array.from(new Set(expenses.map(item => item.category).filter(Boolean))).sort();

  if (currentVal !== 'all' && !categories.includes(currentVal)) {
    currentVal = 'all';
  }

  if (filterCategorySelect) {
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
    filterCategorySelect.value = currentVal;
  }

  // Update Custom Dropdown Menu
  if (menuFilterCategory) {
    let menuHtml = `<div class="custom-option ${currentVal === 'all' ? 'selected' : ''}" data-value="all">All Categories</div>`;
    categories.forEach(cat => {
      const isSelected = cat === currentVal ? 'selected' : '';
      menuHtml += `<div class="custom-option ${isSelected}" data-value="${escapeHtml(cat)}">${escapeHtml(cat)}</div>`;
    });
    menuFilterCategory.innerHTML = menuHtml;
  }

  // Update Trigger Text
  if (selectedFilterCategoryText) {
    selectedFilterCategoryText.textContent = currentVal === 'all' ? 'All Categories' : currentVal;
  }
}

/**
 * Updates the Sort By custom dropdown selection display.
 */
function updateSortByDisplay() {
  const currentVal = sortBySelect ? sortBySelect.value : 'date-desc';
  if (menuSortBy) {
    const options = menuSortBy.querySelectorAll('.custom-option');
    options.forEach(opt => {
      if (opt.dataset.value === currentVal) {
        opt.classList.add('selected');
        if (selectedSortByText) {
          selectedSortByText.textContent = opt.textContent.replace('✓', '').trim();
        }
      } else {
        opt.classList.remove('selected');
      }
    });
  }
}

/**
 * Category Combobox Engine for Expense Form
 */
const DEFAULT_CATEGORY_OPTIONS = [
  { name: 'Food & Dining', icon: '🍔' },
  { name: 'Transportation', icon: '🚗' },
  { name: 'Housing & Utilities', icon: '💡' },
  { name: 'Entertainment', icon: '🎬' },
  { name: 'Healthcare', icon: '💊' },
  { name: 'Shopping', icon: '🛍️' },
  { name: 'Other', icon: '📦' }
];

function getAllCategoryOptions() {
  const map = new Map();
  DEFAULT_CATEGORY_OPTIONS.forEach(c => map.set(c.name, c.icon));
  expenses.forEach(e => {
    if (e.category && !map.has(e.category)) {
      map.set(e.category, '🏷️');
    }
  });
  return Array.from(map.entries()).map(([name, icon]) => ({ name, icon }));
}

function renderCategoryDropdown(query = '') {
  if (!expenseCategoryDropdown) return;
  const list = getAllCategoryOptions();
  const search = (query || '').toLowerCase().trim();
  const filtered = list.filter(item => !search || item.name.toLowerCase().includes(search));

  if (filtered.length === 0) {
    expenseCategoryDropdown.innerHTML = `<div class="combobox-empty">Custom: "${escapeHtml(query)}"</div>`;
    return;
  }

  expenseCategoryDropdown.innerHTML = filtered.map(item => `
    <div class="combobox-option" data-value="${escapeHtml(item.name)}">
      <span>${item.icon}</span>
      <span>${escapeHtml(item.name)}</span>
    </div>
  `).join('');
}

function openCategoryDropdown() {
  if (!wrapperExpenseCategory) return;
  renderCategoryDropdown(expenseCategoryInput ? expenseCategoryInput.value : '');
  wrapperExpenseCategory.classList.add('open');
}

function closeCategoryDropdown() {
  if (!wrapperExpenseCategory) return;
  wrapperExpenseCategory.classList.remove('open');
}

// ==========================================================================
// Custom Mobile-Responsive Calendar Engine
// ==========================================================================

let activeCalendarInput = null;
let calYear = new Date().getFullYear();
let calMonth = new Date().getMonth();

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function openCalendarModal(inputElement) {
  if (!inputElement) return;
  activeCalendarInput = inputElement;

  if (inputElement.value && /^\d{4}-\d{2}-\d{2}$/.test(inputElement.value)) {
    const parts = inputElement.value.split('-');
    calYear = parseInt(parts[0], 10);
    calMonth = parseInt(parts[1], 10) - 1;
  } else {
    const now = new Date();
    calYear = now.getFullYear();
    calMonth = now.getMonth();
  }

  renderCalendar();
  if (customCalendarModal) {
    customCalendarModal.style.display = 'flex';
  }
}

function closeCalendarModal() {
  if (customCalendarModal) {
    customCalendarModal.style.display = 'none';
  }
  activeCalendarInput = null;
}

function renderCalendar() {
  if (!calMonthYear || !calDaysGrid) return;

  calMonthYear.textContent = `${MONTH_NAMES[calMonth]} ${calYear}`;
  calDaysGrid.innerHTML = '';

  const firstDay = new Date(calYear, calMonth, 1).getDay(); // 0 = Sun
  const totalDays = new Date(calYear, calMonth + 1, 0).getDate();

  const today = new Date();
  const todayYMD = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const selectedYMD = activeCalendarInput ? activeCalendarInput.value : '';

  // Blank days before the 1st
  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement('div');
    emptyCell.className = 'cal-day-cell empty-day';
    calDaysGrid.appendChild(emptyCell);
  }

  // Active days 1..totalDays
  for (let day = 1; day <= totalDays; day++) {
    const cell = document.createElement('div');
    cell.className = 'cal-day-cell';
    cell.textContent = day;

    const currentYMD = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    if (currentYMD === todayYMD) {
      cell.classList.add('today-day');
    }
    if (currentYMD === selectedYMD) {
      cell.classList.add('selected-day');
    }

    cell.addEventListener('click', () => {
      if (activeCalendarInput) {
        activeCalendarInput.value = currentYMD;
        activeCalendarInput.dispatchEvent(new Event('change'));
        if (activeCalendarInput.id === 'expense-date') {
          dateError.textContent = '';
          activeCalendarInput.classList.remove('input-error');
        }
      }
      closeCalendarModal();
    });

    calDaysGrid.appendChild(cell);
  }
}

// ==========================================================================
// 8. Render UI
// ==========================================================================

/**
 * Dynamically updates the list view without reloading the page.
 */
function render() {
  // Sync category filter options first so removed categories revert cleanly to 'all'
  updateCategoryFilterOptions();
  updateSortByDisplay();
  renderCategoryDropdown(expenseCategoryInput ? expenseCategoryInput.value : '');
  renderFavoriteTemplates();
  evaluateRecurringReminders();

  const visibleExpenses = getFilteredAndSortedExpenses();

  // Prune any stale selections not present in expenses
  const validIds = new Set(expenses.map(item => item.id));
  for (const id of Array.from(selectedExpenseIds)) {
    if (!validIds.has(id)) selectedExpenseIds.delete(id);
  }

  // Update Summary Dashboards & Charts
  updateSummaryCards(visibleExpenses);

  // Update record counter badge
  listingCountBadge.textContent = `${visibleExpenses.length} of ${expenses.length}`;

  // Clear existing table rows
  expenseListBody.innerHTML = '';

  if (visibleExpenses.length === 0) {
    expensesTable.style.display = 'none';
    emptyState.style.display = 'block';
    updateBulkSelectionUI([]);

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

  // Render rows dynamically with bulk checkbox & mobile data-label attributes
  visibleExpenses.forEach(item => {
    const row = document.createElement('tr');
    row.dataset.id = item.id;
    const isChecked = selectedExpenseIds.has(item.id);
    if (isChecked) row.classList.add('row-selected');

    const catBadgeClass = getCategoryClass(item.category);
    const recurTagHtml = (item.recurring && item.recurring !== 'none')
      ? `<span class="recur-tag" title="Recurring ${escapeHtml(item.recurring)} expense">🔁 ${item.recurring === 'weekly' ? 'Weekly' : 'Monthly'}</span>`
      : '';

    row.innerHTML = `
      <td class="checkbox-cell" data-label="Select">
        <input type="checkbox" class="custom-checkbox row-select-checkbox" data-id="${item.id}" aria-label="Select ${escapeHtml(item.title)}" ${isChecked ? 'checked' : ''}>
      </td>
      <td class="expense-date-cell" data-label="Date">${formatDate(item.date)}</td>
      <td class="expense-title-cell" data-label="Title">${escapeHtml(item.title)}${recurTagHtml}</td>
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

  updateBulkSelectionUI(visibleExpenses);
}

/**
 * Updates bulk action toolbar and Select All checkbox state (checked / indeterminate).
 */
function updateBulkSelectionUI(visibleExpenses = []) {
  const selectedCount = selectedExpenseIds.size;

  if (selectAllCheckbox) {
    if (visibleExpenses.length === 0) {
      selectAllCheckbox.checked = false;
      selectAllCheckbox.indeterminate = false;
    } else {
      const visibleSelectedCount = visibleExpenses.filter(e => selectedExpenseIds.has(e.id)).length;
      selectAllCheckbox.checked = visibleSelectedCount === visibleExpenses.length;
      selectAllCheckbox.indeterminate = visibleSelectedCount > 0 && visibleSelectedCount < visibleExpenses.length;
    }
  }

  if (!bulkActionBar) return;

  if (selectedCount === 0) {
    bulkActionBar.style.display = 'none';
    return;
  }

  const selectedSum = expenses
    .filter(e => selectedExpenseIds.has(e.id))
    .reduce((sum, e) => sum + e.amount, 0);

  bulkActionBar.style.display = 'flex';
  if (bulkSelectedText) {
    bulkSelectedText.textContent = `${selectedCount} item${selectedCount === 1 ? '' : 's'} selected`;
  }
  if (bulkSelectedTotal) {
    bulkSelectedTotal.textContent = `Total: ${formatCurrency(selectedSum)}`;
  }
}

/**
 * Escapes HTML characters to prevent XSS.
 */
function escapeHtml(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ==========================================================================
// 9. Add, Edit, Delete, Undo & Bulk Action Handlers
// ==========================================================================

function setRecurrenceSelector(freq = 'none') {
  if (expenseRecurrenceInput) expenseRecurrenceInput.value = freq;
  if (recurrencePills) {
    recurrencePills.querySelectorAll('.recur-pill-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.freq === freq);
    });
  }
}

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
  const recurrence = expenseRecurrenceInput ? expenseRecurrenceInput.value : 'none';

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
    saveExpenses();
    render();
    showToast({ message: `Updated "${title}" (${formatCurrency(amount)}).`, type: 'success' });
  } else {
    // Add new expense
    const newExpense = {
      id: 'exp-' + Date.now(),
      title,
      amount,
      category,
      date,
      recurring: recurrence !== 'none' ? recurrence : undefined
    };
    expenses.unshift(newExpense);

    let toastMsg = `Added "${title}" (${formatCurrency(amount)}).`;

    if (recurrence === 'weekly' || recurrence === 'monthly') {
      const nextDue = advanceDateByFrequency(date, recurrence);
      recurringRules.unshift({
        id: 'rec-' + Date.now(),
        title,
        amount,
        category,
        frequency: recurrence,
        nextDueDate: nextDue,
        active: true
      });
      saveRecurringRules();
      toastMsg = `Added "${title}" & scheduled ${recurrence} reminder (Next: ${formatDate(nextDue)}).`;
    }

    resetFormState();
    saveExpenses();
    render();
    showToast({ message: toastMsg, type: 'success' });
  }
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

  // Hide recurrence pills while editing single logged record
  if (recurrenceFormGroup) recurrenceFormGroup.style.display = 'none';

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
 * Deletes a single expense immediately with a non-blocking 5s Undo toast.
 */
function handleDelete(id) {
  const index = expenses.findIndex(item => item.id === id);
  if (index === -1) return;

  const deletedSnapshot = { ...expenses[index] };

  if (isEditing && currentEditId === id) {
    resetFormState();
  }

  selectedExpenseIds.delete(id);
  expenses.splice(index, 1);
  saveExpenses();
  render();

  showToast({
    message: `Deleted "${deletedSnapshot.title}" (${formatCurrency(deletedSnapshot.amount)}).`,
    type: 'danger',
    duration: 5000,
    onUndo: () => {
      // Restore item to its original position
      const insertAt = Math.min(index, expenses.length);
      expenses.splice(insertAt, 0, deletedSnapshot);
      saveExpenses();
      render();
      showToast({
        message: `Restored "${deletedSnapshot.title}".`,
        type: 'success',
        duration: 2800
      });
    }
  });
}

/**
 * Deletes all currently selected expenses with a single Undo toast restoring all items.
 */
function handleBulkDelete() {
  if (selectedExpenseIds.size === 0) return;

  const snapshots = [];
  expenses.forEach((item, index) => {
    if (selectedExpenseIds.has(item.id)) {
      snapshots.push({ item: { ...item }, index });
    }
  });

  if (snapshots.length === 0) return;

  if (isEditing && selectedExpenseIds.has(currentEditId)) {
    resetFormState();
  }

  expenses = expenses.filter(item => !selectedExpenseIds.has(item.id));
  selectedExpenseIds.clear();
  saveExpenses();
  render();

  const count = snapshots.length;
  showToast({
    message: `Deleted ${count} selected expense${count === 1 ? '' : 's'}.`,
    type: 'danger',
    duration: 5000,
    onUndo: () => {
      // Restore in ascending index order so original positions are preserved
      snapshots.sort((a, b) => a.index - b.index).forEach(({ item, index }) => {
        const pos = Math.min(index, expenses.length);
        expenses.splice(pos, 0, item);
      });
      saveExpenses();
      render();
      showToast({
        message: `Restored ${count} deleted expense${count === 1 ? '' : 's'}.`,
        type: 'success',
        duration: 2800
      });
    }
  });
}

/**
 * Exports all selected expenses directly to a PDF audit report.
 */
function handleBulkExportPDF() {
  if (selectedExpenseIds.size === 0) return;
  const visibleSelected = getFilteredAndSortedExpenses().filter(e => selectedExpenseIds.has(e.id));
  const toExport = visibleSelected.length > 0
    ? visibleSelected
    : expenses.filter(e => selectedExpenseIds.has(e.id));

  exportExpensesListToPDF(toExport, 'Selected');
}

function clearBulkSelection() {
  selectedExpenseIds.clear();
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
  setRecurrenceSelector('none');
  if (recurrenceFormGroup) recurrenceFormGroup.style.display = 'flex';

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
  expenseDateInput.value = getTodayYMD();
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

  // Reset Quick Date Presets
  const presetButtons = document.querySelectorAll('.preset-btn');
  presetButtons.forEach(b => b.classList.toggle('active', b.dataset.preset === 'all'));

  // Update displays
  updateCategoryFilterOptions();
  updateSortByDisplay();

  render();
  showToast({ message: 'All filters reset.', type: 'info', duration: 2200 });
}

/**
 * Opens confirmation modal to clear all stored expenses (with Undo backup!).
 */
function handleClearAll() {
  if (expenses.length === 0) {
    showToast({ message: 'There are no expenses to clear.', type: 'info', duration: 3000 });
    return;
  }

  showConfirmDialog({
    title: 'Clear All Expenses?',
    message: `You are about to remove all ${expenses.length} recorded expense${expenses.length === 1 ? '' : 's'}. You can undo this immediately after confirming.`,
    confirmLabel: 'Clear All',
    onConfirm: () => {
      const backup = [...expenses];
      expenses = [];
      selectedExpenseIds.clear();
      saveExpenses();
      resetFormState();
      render();

      showToast({
        message: `Cleared all ${backup.length} expense${backup.length === 1 ? '' : 's'}.`,
        type: 'danger',
        duration: 5500,
        onUndo: () => {
          expenses = backup;
          saveExpenses();
          render();
          showToast({ message: `Restored all ${backup.length} expenses.`, type: 'success', duration: 2800 });
        }
      });
    }
  });
}

/**
 * Zero-dependency client-side PDF 1.4 generator.
 * Produces a multi-page, formatted financial report without any external libraries.
 */
function generateExpensePDF(expensesList, summary) {
  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const margin = 36;
  const contentWidth = pageWidth - (2 * margin);

  const pages = [];
  let currentPage = null;

  function newPage() {
    currentPage = {
      commands: [],
      pageNumber: pages.length + 1
    };
    pages.push(currentPage);
    return currentPage;
  }

  function cmd(str) {
    currentPage.commands.push(str);
  }

  function drawRect(x, y, w, h, fillRGB = null, strokeRGB = null, lineWidth = 0.5) {
    let s = '';
    if (lineWidth) s += `${lineWidth} w\n`;
    if (fillRGB) s += `${fillRGB[0]} ${fillRGB[1]} ${fillRGB[2]} rg\n`;
    if (strokeRGB) s += `${strokeRGB[0]} ${strokeRGB[1]} ${strokeRGB[2]} RG\n`;
    s += `${x.toFixed(2)} ${y.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)} re\n`;
    if (fillRGB && strokeRGB) s += 'B\n';
    else if (fillRGB) s += 'f\n';
    else if (strokeRGB) s += 'S\n';
    cmd(s);
  }

  function drawLine(x1, y1, x2, y2, strokeRGB = [0.85, 0.88, 0.92], lineWidth = 0.5) {
    const s = `${lineWidth} w\n${strokeRGB[0]} ${strokeRGB[1]} ${strokeRGB[2]} RG\n${x1.toFixed(2)} ${y1.toFixed(2)} m ${x2.toFixed(2)} ${y2.toFixed(2)} l S\n`;
    cmd(s);
  }

  function drawText(text, x, y, font = '/F1', size = 9, rgb = [0.08, 0.12, 0.20]) {
    const cleanText = String(text == null ? '' : text)
      .replace(/[\r\n]+/g, ' ')
      .replace(/\\/g, '\\\\')
      .replace(/\(/g, '\\(')
      .replace(/\)/g, '\\)');
    const s = `BT\n${font} ${size} Tf\n${rgb[0]} ${rgb[1]} ${rgb[2]} rg\n1 0 0 1 ${x.toFixed(2)} ${y.toFixed(2)} Tm\n(${cleanText}) Tj\nET\n`;
    cmd(s);
  }

  const helveticaWidths = {
    ' ': 278, '!': 278, '"': 355, '#': 556, '$': 556, '%': 889, '&': 667, '\'': 191,
    '(': 333, ')': 333, '*': 389, '+': 584, ',': 278, '-': 333, '.': 278, '/': 278,
    '0': 556, '1': 556, '2': 556, '3': 556, '4': 556, '5': 556, '6': 556, '7': 556,
    '8': 556, '9': 556, ':': 278, ';': 278, '<': 584, '=': 584, '>': 584, '?': 556,
    '@': 1015, 'A': 667, 'B': 667, 'C': 722, 'D': 722, 'E': 667, 'F': 611, 'G': 778,
    'H': 722, 'I': 278, 'J': 500, 'K': 667, 'L': 556, 'M': 833, 'N': 722, 'O': 778,
    'P': 667, 'Q': 778, 'R': 722, 'S': 667, 'T': 611, 'U': 722, 'V': 667, 'W': 944,
    'X': 667, 'Y': 667, 'Z': 611, '[': 278, '\\': 278, ']': 278, '^': 469, '_': 556,
    '`': 222, 'a': 556, 'b': 556, 'c': 500, 'd': 556, 'e': 556, 'f': 278, 'g': 556,
    'h': 556, 'i': 222, 'j': 222, 'k': 500, 'l': 222, 'm': 833, 'n': 556, 'o': 556,
    'p': 556, 'q': 556, 'r': 333, 's': 500, 't': 278, 'u': 556, 'v': 500, 'w': 722,
    'x': 500, 'y': 500, 'z': 500, '{': 334, '|': 260, '}': 334, '~': 584
  };

  function getTextWidth(text, size = 9, bold = false) {
    let w = 0;
    const str = String(text);
    for (let i = 0; i < str.length; i++) {
      let cw = helveticaWidths[str[i]] || 550;
      if (bold) cw *= 1.08;
      w += (cw * size) / 1000;
    }
    return w;
  }

  function truncateText(text, maxWidth, size = 9, bold = false) {
    let str = String(text);
    if (getTextWidth(str, size, bold) <= maxWidth) return str;
    while (str.length > 3 && getTextWidth(str + '...', size, bold) > maxWidth) {
      str = str.slice(0, -1);
    }
    return str + '...';
  }

  newPage();

  function drawPageHeader(isFirstPage) {
    // Top banner bar
    drawRect(margin, pageHeight - margin - 40, contentWidth, 40, [0.08, 0.12, 0.22]);
    drawText('VEDA TECHNOLOGY', margin + 14, pageHeight - margin - 22, '/F2', 12, [1, 1, 1]);
    drawText('Interactive Expense Tracker - Financial Report', margin + 14, pageHeight - margin - 34, '/F1', 8, [0.75, 0.82, 0.95]);

    const dateStr = summary.exportDate || new Date().toISOString().slice(0, 10);
    const dateText = `Generated: ${dateStr}`;
    const dtWidth = getTextWidth(dateText, 8);
    drawText(dateText, margin + contentWidth - dtWidth - 14, pageHeight - margin - 26, '/F1', 8, [0.85, 0.90, 0.98]);

    let currY = pageHeight - margin - 50;

    if (isFirstPage) {
      // Summary Metrics Cards (Top of First Page)
      const cardW = (contentWidth - 18) / 3;
      const cardH = 46;

      // Card 1: Total Spent
      drawRect(margin, currY - cardH, cardW, cardH, [0.97, 0.98, 1.0], [0.85, 0.89, 0.95], 0.7);
      drawText('TOTAL EXPENDITURE', margin + 10, currY - 14, '/F2', 7.5, [0.35, 0.40, 0.50]);
      drawText(`INR ${summary.totalAmount.toFixed(2)}`, margin + 10, currY - 32, '/F2', 12, [0.10, 0.15, 0.28]);
      drawText(`${summary.count} transactions recorded`, margin + 10, currY - 42, '/F1', 7, [0.50, 0.55, 0.65]);

      // Card 2: Monthly Budget Status
      drawRect(margin + cardW + 9, currY - cardH, cardW, cardH, [0.97, 0.98, 1.0], [0.85, 0.89, 0.95], 0.7);
      drawText('MONTHLY BUDGET TARGET', margin + cardW + 19, currY - 14, '/F2', 7.5, [0.35, 0.40, 0.50]);
      drawText(`INR ${summary.monthlyBudget.toFixed(2)}`, margin + cardW + 19, currY - 32, '/F2', 12, [0.20, 0.45, 0.25]);
      const remaining = summary.monthlyBudget - summary.thisMonthSpent;
      const remText = remaining >= 0 ? `Remaining: INR ${remaining.toFixed(2)}` : `Over Budget: INR ${Math.abs(remaining).toFixed(2)}`;
      drawText(remText, margin + cardW + 19, currY - 42, '/F1', 7, remaining >= 0 ? [0.20, 0.55, 0.30] : [0.80, 0.20, 0.20]);

      // Card 3: Top Category
      drawRect(margin + (cardW + 9) * 2, currY - cardH, cardW, cardH, [0.97, 0.98, 1.0], [0.85, 0.89, 0.95], 0.7);
      drawText('TOP SPENDING CATEGORY', margin + (cardW + 9) * 2 + 10, currY - 14, '/F2', 7.5, [0.35, 0.40, 0.50]);
      drawText(truncateText(summary.topCategory || 'N/A', cardW - 20, 11, true), margin + (cardW + 9) * 2 + 10, currY - 32, '/F2', 11, [0.55, 0.25, 0.15]);
      drawText(`INR ${summary.topCategoryAmount.toFixed(2)} spent`, margin + (cardW + 9) * 2 + 10, currY - 42, '/F1', 7, [0.50, 0.55, 0.65]);

      currY -= (cardH + 14);
    } else {
      currY -= 6;
    }

    // Table Header
    const colWidths = [30, 75, 215, 110, 93];
    const colX = [
      margin,
      margin + 30,
      margin + 105,
      margin + 320,
      margin + 430
    ];

    drawRect(margin, currY - 20, contentWidth, 20, [0.92, 0.94, 0.98], [0.80, 0.84, 0.90], 0.75);
    drawText('#', colX[0] + 8, currY - 13, '/F2', 8, [0.20, 0.25, 0.35]);
    drawText('DATE', colX[1] + 6, currY - 13, '/F2', 8, [0.20, 0.25, 0.35]);
    drawText('TITLE / DESCRIPTION', colX[2] + 6, currY - 13, '/F2', 8, [0.20, 0.25, 0.35]);
    drawText('CATEGORY', colX[3] + 6, currY - 13, '/F2', 8, [0.20, 0.25, 0.35]);
    const amtHeadText = 'AMOUNT (INR)';
    const amtHeadW = getTextWidth(amtHeadText, 8, true);
    drawText(amtHeadText, colX[4] + colWidths[4] - amtHeadW - 8, currY - 13, '/F2', 8, [0.20, 0.25, 0.35]);

    currY -= 20;
    return { currY, colWidths, colX };
  }

  function drawPageFooter() {
    const pageNum = currentPage.pageNumber;
    drawLine(margin, margin + 20, margin + contentWidth, margin + 20, [0.85, 0.88, 0.92], 0.5);
    drawText('Confidential • Generated by Veda Technology Interactive Expense Tracker', margin, margin + 8, '/F1', 7, [0.55, 0.60, 0.70]);
    const pStr = `Page ${pageNum}`;
    const pW = getTextWidth(pStr, 7);
    drawText(pStr, margin + contentWidth - pW, margin + 8, '/F1', 7, [0.55, 0.60, 0.70]);
  }

  let layout = drawPageHeader(true);
  let y = layout.currY;
  const rowHeight = 20;

  for (let i = 0; i < expensesList.length; i++) {
    if (y - rowHeight < margin + 40) {
      drawPageFooter();
      newPage();
      layout = drawPageHeader(false);
      y = layout.currY;
    }

    const item = expensesList[i];
    const isAlt = (i % 2 === 1);
    const rowFill = isAlt ? [0.98, 0.98, 0.99] : [1.0, 1.0, 1.0];
    drawRect(margin, y - rowHeight, contentWidth, rowHeight, rowFill, null, 0);
    drawLine(margin, y - rowHeight, margin + contentWidth, y - rowHeight, [0.90, 0.92, 0.95], 0.5);

    // # index
    drawText(String(i + 1), layout.colX[0] + 8, y - 13, '/F1', 8, [0.45, 0.50, 0.60]);
    // Date
    drawText(item.date || '—', layout.colX[1] + 6, y - 13, '/F1', 8, [0.20, 0.25, 0.35]);
    // Title
    const truncatedTitle = truncateText(item.title || 'Untitled', layout.colWidths[2] - 12, 8);
    drawText(truncatedTitle, layout.colX[2] + 6, y - 13, '/F2', 8, [0.10, 0.15, 0.25]);
    // Category
    const truncatedCat = truncateText(item.category || 'Other', layout.colWidths[3] - 12, 8);
    drawText(truncatedCat, layout.colX[3] + 6, y - 13, '/F1', 8, [0.30, 0.35, 0.45]);
    // Amount
    const amtStr = Number(item.amount || 0).toFixed(2);
    const amtW = getTextWidth(amtStr, 8, true);
    drawText(amtStr, layout.colX[4] + layout.colWidths[4] - amtW - 8, y - 13, '/F2', 8, [0.08, 0.12, 0.22]);

    y -= rowHeight;
  }

  // Draw Grand Total Row
  if (y - 24 < margin + 40) {
    drawPageFooter();
    newPage();
    layout = drawPageHeader(false);
    y = layout.currY;
  }

  drawRect(margin, y - 22, contentWidth, 22, [0.93, 0.95, 0.99], [0.80, 0.85, 0.92], 0.75);
  drawText('GRAND TOTAL', layout.colX[2] + 6, y - 14, '/F2', 9, [0.10, 0.15, 0.30]);
  const grandTotalStr = `INR ${summary.totalAmount.toFixed(2)}`;
  const gtW = getTextWidth(grandTotalStr, 9, true);
  drawText(grandTotalStr, layout.colX[4] + layout.colWidths[4] - gtW - 8, y - 14, '/F2', 9, [0.10, 0.15, 0.30]);
  y -= 22;

  drawPageFooter();

  // Construct PDF 1.4 objects
  const numPages = pages.length;
  let nextObjId = 1;

  const catalogId = nextObjId++;
  const pagesRootId = nextObjId++;
  const fontRegularId = nextObjId++;
  const fontBoldId = nextObjId++;

  const pageEntries = [];
  for (let i = 0; i < numPages; i++) {
    const pId = nextObjId++;
    const contentId = nextObjId++;
    pageEntries.push({ pId, contentId, page: pages[i] });
  }

  const objects = [];

  objects.push({
    id: catalogId,
    content: `<<\n/Type /Catalog\n/Pages ${pagesRootId} 0 R\n>>`
  });

  const kidsStr = pageEntries.map(e => `${e.pId} 0 R`).join(' ');
  objects.push({
    id: pagesRootId,
    content: `<<\n/Type /Pages\n/Kids [${kidsStr}]\n/Count ${numPages}\n>>`
  });

  objects.push({
    id: fontRegularId,
    content: `<<\n/Type /Font\n/Subtype /Type1\n/BaseFont /Helvetica\n/Encoding /WinAnsiEncoding\n>>`
  });

  objects.push({
    id: fontBoldId,
    content: `<<\n/Type /Font\n/Subtype /Type1\n/BaseFont /Helvetica-Bold\n/Encoding /WinAnsiEncoding\n>>`
  });

  const encoder = new TextEncoder();

  for (const entry of pageEntries) {
    const streamContent = entry.page.commands.join('');
    const streamBytes = encoder.encode(streamContent);
    const streamLength = streamBytes.length;

    objects.push({
      id: entry.pId,
      content: `<<\n/Type /Page\n/Parent ${pagesRootId} 0 R\n/MediaBox [0 0 ${pageWidth} ${pageHeight}]\n/Contents ${entry.contentId} 0 R\n/Resources <<\n  /Font <<\n    /F1 ${fontRegularId} 0 R\n    /F2 ${fontBoldId} 0 R\n  >>\n>>\n>>`
    });

    objects.push({
      id: entry.contentId,
      content: `<< /Length ${streamLength} >>\nstream\n${streamContent}\nendstream`
    });
  }

  let pdf = '%PDF-1.4\n%\xE2\xE3\xCF\xD3\n';
  const offsets = {};

  for (const obj of objects) {
    offsets[obj.id] = encoder.encode(pdf).length;
    pdf += `${obj.id} 0 obj\n${obj.content}\nendobj\n`;
  }

  const xrefStart = encoder.encode(pdf).length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;

  for (let id = 1; id <= objects.length; id++) {
    const off = String(offsets[id]).padStart(10, '0');
    pdf += `${off} 00000 n \n`;
  }

  pdf += `trailer\n<<\n/Size ${objects.length + 1}\n/Root ${catalogId} 0 R\n>>\nstartxref\n${xrefStart}\n%%EOF\n`;

  return encoder.encode(pdf);
}

/**
 * Shared helper that builds and triggers a client-side PDF download for any expense array.
 */
function exportExpensesListToPDF(listToExport, label = 'Expenses') {
  if (!listToExport || listToExport.length === 0) {
    showToast({ message: 'No expenses to export. Add expenses or adjust your filter criteria.', type: 'warning' });
    return;
  }

  const now = new Date();
  const currentMonthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const thisMonthExpenses = expenses.filter(item => item.date && item.date.startsWith(currentMonthKey));
  const thisMonthSpent = thisMonthExpenses.reduce((sum, item) => sum + item.amount, 0);

  const catTotals = listToExport.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.amount;
    return acc;
  }, {});

  let topCat = '—';
  let topAmt = 0;
  for (const [c, a] of Object.entries(catTotals)) {
    if (a > topAmt) {
      topAmt = a;
      topCat = c;
    }
  }

  const summary = {
    totalAmount: listToExport.reduce((sum, item) => sum + item.amount, 0),
    count: listToExport.length,
    monthlyBudget: monthlyBudget,
    thisMonthSpent: thisMonthSpent,
    topCategory: topCat,
    topCategoryAmount: topAmt,
    exportDate: formatDateYMD(now)
  };

  const pdfBytes = generateExpensePDF(listToExport, summary);
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Expense_Report_${label}_${summary.exportDate}.pdf`.replace(/_Expenses_/, '_');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  showToast({
    message: `Exported ${listToExport.length} expense${listToExport.length === 1 ? '' : 's'} to PDF.`,
    type: 'success',
    duration: 3200
  });
}

/**
 * Handles exporting visible expenses as a downloadable PDF document.
 */
function handleExportPDF() {
  const visible = getFilteredAndSortedExpenses();
  exportExpensesListToPDF(visible, 'Expenses');
}

// ==========================================================================
// 10. Event Listeners Registration
// ==========================================================================

function setupEventListeners() {
  // Form submission
  expenseForm.addEventListener('submit', handleFormSubmit);

  // Cancel edit button
  cancelBtn.addEventListener('click', resetFormState);

  // Recurrence pill selection in Add Expense form
  if (recurrencePills) {
    recurrencePills.addEventListener('click', (e) => {
      const btn = e.target.closest('.recur-pill-btn');
      if (!btn) return;
      setRecurrenceSelector(btn.dataset.freq);
    });
  }

  // Keyboard shortcut: Escape closes open modals, dropdowns, or cancels edit mode
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (confirmModal && confirmModal.style.display !== 'none') {
        closeConfirmModal();
      } else if (backupModal && backupModal.style.display !== 'none') {
        closeBackupModal();
      } else if (recurringModal && recurringModal.style.display !== 'none') {
        closeRecurringModal();
      } else if (budgetModal && budgetModal.style.display !== 'none') {
        closeBudgetModal();
      } else if (customCalendarModal && customCalendarModal.style.display !== 'none') {
        closeCalendarModal();
      } else if (wrapperExpenseCategory && wrapperExpenseCategory.classList.contains('open')) {
        closeCategoryDropdown();
      } else if (wrapperFilterCategory && wrapperFilterCategory.classList.contains('open')) {
        wrapperFilterCategory.classList.remove('open');
      } else if (wrapperSortBy && wrapperSortBy.classList.contains('open')) {
        wrapperSortBy.classList.remove('open');
      } else if (isEditing) {
        resetFormState();
      }
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

  // Category Combobox Dropdown in Form
  if (expenseCategoryInput) {
    expenseCategoryInput.addEventListener('click', (e) => {
      e.stopPropagation();
      openCategoryDropdown();
    });

    expenseCategoryInput.addEventListener('focus', () => {
      openCategoryDropdown();
    });

    expenseCategoryInput.addEventListener('input', () => {
      openCategoryDropdown();
      if (expenseCategoryInput.value.trim()) {
        categoryError.textContent = '';
        expenseCategoryInput.classList.remove('input-error');
      }
    });
  }

  if (expenseCategoryToggle) {
    expenseCategoryToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (wrapperExpenseCategory && wrapperExpenseCategory.classList.contains('open')) {
        closeCategoryDropdown();
      } else {
        openCategoryDropdown();
        expenseCategoryInput.focus();
      }
    });
  }

  if (expenseCategoryDropdown) {
    expenseCategoryDropdown.addEventListener('click', (e) => {
      const opt = e.target.closest('.combobox-option');
      if (!opt) return;
      const val = opt.dataset.value;
      expenseCategoryInput.value = val;
      categoryError.textContent = '';
      expenseCategoryInput.classList.remove('input-error');
      closeCategoryDropdown();
    });
  }

  // Smart toggle custom dropdown with drop-up detection
  function toggleCustomDropdown(wrapper) {
    const isCurrentlyOpen = wrapper.classList.contains('open');

    // Close all open dropdowns first
    document.querySelectorAll('.custom-select-wrapper.open').forEach(w => {
      w.classList.remove('open', 'drop-up');
    });

    if (!isCurrentlyOpen) {
      const rect = wrapper.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const estimatedMenuHeight = 220;

      if (spaceBelow < estimatedMenuHeight && rect.top > estimatedMenuHeight) {
        wrapper.classList.add('drop-up');
      } else {
        wrapper.classList.remove('drop-up');
      }

      wrapper.classList.add('open');

      const selectedOpt = wrapper.querySelector('.custom-option.selected');
      if (selectedOpt) {
        selectedOpt.scrollIntoView({ block: 'nearest' });
      }
    }
  }

  // Custom Dropdown: Filter Category
  if (triggerFilterCategory && wrapperFilterCategory) {
    triggerFilterCategory.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleCustomDropdown(wrapperFilterCategory);
    });
  }

  if (menuFilterCategory) {
    menuFilterCategory.addEventListener('click', (e) => {
      const option = e.target.closest('.custom-option');
      if (!option) return;
      const val = option.dataset.value;
      if (filterCategorySelect) filterCategorySelect.value = val;
      if (selectedFilterCategoryText) {
        selectedFilterCategoryText.textContent = option.textContent.replace('✓', '').trim();
      }
      wrapperFilterCategory.classList.remove('open', 'drop-up');
      render();
    });
  }

  // Custom Dropdown: Sort By
  if (triggerSortBy && wrapperSortBy) {
    triggerSortBy.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleCustomDropdown(wrapperSortBy);
    });
  }

  if (menuSortBy) {
    menuSortBy.addEventListener('click', (e) => {
      const option = e.target.closest('.custom-option');
      if (!option) return;
      const val = option.dataset.value;
      if (sortBySelect) sortBySelect.value = val;
      updateSortByDisplay();
      wrapperSortBy.classList.remove('open', 'drop-up');
      render();
    });
  }

  // Click outside closes custom dropdowns
  document.addEventListener('click', (e) => {
    if (wrapperExpenseCategory && !wrapperExpenseCategory.contains(e.target)) {
      closeCategoryDropdown();
    }
    if (wrapperFilterCategory && !wrapperFilterCategory.contains(e.target)) {
      wrapperFilterCategory.classList.remove('open', 'drop-up');
    }
    if (wrapperSortBy && !wrapperSortBy.contains(e.target)) {
      wrapperSortBy.classList.remove('open', 'drop-up');
    }
  });

  // Custom Date Picker Modal Trigger Hooks
  [expenseDateInput, filterStartDateInput, filterEndDateInput].forEach(input => {
    if (!input) return;
    input.addEventListener('click', () => openCalendarModal(input));
    const container = input.closest('.custom-date-container');
    if (container) {
      const btn = container.querySelector('.calendar-btn');
      if (btn) {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          openCalendarModal(input);
        });
      }
    }
  });

  // Calendar Modal Controls
  if (calPrevMonth) {
    calPrevMonth.addEventListener('click', () => {
      calMonth--;
      if (calMonth < 0) {
        calMonth = 11;
        calYear--;
      }
      renderCalendar();
    });
  }

  if (calNextMonth) {
    calNextMonth.addEventListener('click', () => {
      calMonth++;
      if (calMonth > 11) {
        calMonth = 0;
        calYear++;
      }
      renderCalendar();
    });
  }

  if (calTodayBtn) {
    calTodayBtn.addEventListener('click', () => {
      if (activeCalendarInput) {
        const today = new Date();
        const y = today.getFullYear();
        const m = String(today.getMonth() + 1).padStart(2, '0');
        const d = String(today.getDate()).padStart(2, '0');
        activeCalendarInput.value = `${y}-${m}-${d}`;
        activeCalendarInput.dispatchEvent(new Event('change'));
        if (activeCalendarInput.id === 'expense-date') {
          dateError.textContent = '';
          activeCalendarInput.classList.remove('input-error');
        }
      }
      closeCalendarModal();
    });
  }

  if (calClearBtn) {
    calClearBtn.addEventListener('click', () => {
      if (activeCalendarInput) {
        activeCalendarInput.value = '';
        activeCalendarInput.dispatchEvent(new Event('change'));
      }
      closeCalendarModal();
    });
  }

  if (calCloseBtn) {
    calCloseBtn.addEventListener('click', closeCalendarModal);
  }

  if (customCalendarModal) {
    customCalendarModal.addEventListener('click', (e) => {
      if (e.target === customCalendarModal) {
        closeCalendarModal();
      }
    });
  }

  // Quick Date Filter Presets
  const presetButtons = document.querySelectorAll('.preset-btn');
  presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      presetButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const preset = btn.dataset.preset;
      const now = new Date();
      const formatYMD = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

      if (preset === 'all') {
        filterStartDateInput.value = '';
        filterEndDateInput.value = '';
      } else if (preset === 'today') {
        const todayStr = formatYMD(now);
        filterStartDateInput.value = todayStr;
        filterEndDateInput.value = todayStr;
      } else if (preset === 'this-week') {
        const dayOfWeek = now.getDay();
        const diffToMonday = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
        const monday = new Date(now);
        monday.setDate(now.getDate() + diffToMonday);
        filterStartDateInput.value = formatYMD(monday);
        filterEndDateInput.value = formatYMD(now);
      } else if (preset === 'this-month') {
        const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        filterStartDateInput.value = formatYMD(firstOfMonth);
        filterEndDateInput.value = formatYMD(now);
      }

      render();
    });
  });

  // Table row actions & bulk selection checkboxes using Event Delegation
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

  expenseListBody.addEventListener('change', (e) => {
    const cb = e.target.closest('.row-select-checkbox');
    if (!cb) return;
    const id = cb.dataset.id;
    const row = cb.closest('tr');
    if (cb.checked) {
      selectedExpenseIds.add(id);
      if (row) row.classList.add('row-selected');
    } else {
      selectedExpenseIds.delete(id);
      if (row) row.classList.remove('row-selected');
    }
    updateBulkSelectionUI(getFilteredAndSortedExpenses());
  });

  if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener('change', () => {
      const visible = getFilteredAndSortedExpenses();
      if (selectAllCheckbox.checked) {
        visible.forEach(item => selectedExpenseIds.add(item.id));
      } else {
        visible.forEach(item => selectedExpenseIds.delete(item.id));
      }
      render();
    });
  }

  // Bulk Action Toolbar Buttons
  if (bulkExportPdfBtn) {
    bulkExportPdfBtn.addEventListener('click', handleBulkExportPDF);
  }
  if (bulkDeleteBtn) {
    bulkDeleteBtn.addEventListener('click', handleBulkDelete);
  }
  if (bulkClearBtn) {
    bulkClearBtn.addEventListener('click', clearBulkSelection);
  }

  // Chart Timeframe Toggle (7 Days vs 6 Months)
  chartTabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      chartTabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeChartRange = btn.dataset.range || '7d';
      renderTrendChart();
    });
  });

  // Recurring Expenses & Bill Reminders Listeners
  if (openRecurringBtn) {
    openRecurringBtn.addEventListener('click', openRecurringModal);
  }
  if (reminderManageBtn) {
    reminderManageBtn.addEventListener('click', openRecurringModal);
  }
  if (reminderQuickLogBtn) {
    reminderQuickLogBtn.addEventListener('click', () => {
      const ruleId = reminderQuickLogBtn.dataset.ruleId;
      if (ruleId) logRecurringRuleNow(ruleId);
    });
  }
  if (closeRecurringModalBtn) {
    closeRecurringModalBtn.addEventListener('click', closeRecurringModal);
  }
  if (doneRecurringBtn) {
    doneRecurringBtn.addEventListener('click', closeRecurringModal);
  }
  if (recurringModal) {
    recurringModal.addEventListener('click', (e) => {
      if (e.target === recurringModal) closeRecurringModal();
    });
  }
  if (autoLogRecurringToggle) {
    autoLogRecurringToggle.addEventListener('change', () => {
      saveAutoLogPreference(autoLogRecurringToggle.checked);
      showToast({
        message: autoLogRecurring
          ? 'Auto-log enabled: due recurring bills will log automatically.'
          : 'Auto-log disabled: you will see manual due bill reminders.',
        type: 'info',
        duration: 3200
      });
    });
  }
  if (recurringListContainer) {
    recurringListContainer.addEventListener('click', (e) => {
      const logBtn = e.target.closest('.rec-log-btn');
      const toggleBtn = e.target.closest('.rec-toggle-btn');
      const deleteBtn = e.target.closest('.rec-delete-btn');

      if (logBtn) {
        logRecurringRuleNow(logBtn.dataset.id);
      } else if (toggleBtn) {
        const rule = recurringRules.find(r => r.id === toggleBtn.dataset.id);
        if (!rule) return;
        rule.active = !rule.active;
        saveRecurringRules();
        renderRecurringModalList();
        evaluateRecurringReminders();
        showToast({
          message: rule.active ? `Resumed "${rule.title}" reminders.` : `Paused "${rule.title}" reminders.`,
          type: 'info',
          duration: 2600
        });
      } else if (deleteBtn) {
        const idx = recurringRules.findIndex(r => r.id === deleteBtn.dataset.id);
        if (idx === -1) return;
        const removed = { ...recurringRules[idx] };
        recurringRules.splice(idx, 1);
        saveRecurringRules();
        renderRecurringModalList();
        evaluateRecurringReminders();

        showToast({
          message: `Removed recurring schedule "${removed.title}".`,
          type: 'danger',
          duration: 5000,
          onUndo: () => {
            recurringRules.splice(Math.min(idx, recurringRules.length), 0, removed);
            saveRecurringRules();
            renderRecurringModalList();
            evaluateRecurringReminders();
            showToast({ message: `Restored "${removed.title}".`, type: 'success', duration: 2500 });
          }
        });
      }
    });
  }

  // Custom Confirmation Modal Listeners
  if (closeConfirmModalBtn) closeConfirmModalBtn.addEventListener('click', closeConfirmModal);
  if (cancelConfirmBtn) cancelConfirmBtn.addEventListener('click', closeConfirmModal);
  if (okConfirmBtn) {
    okConfirmBtn.addEventListener('click', () => {
      const cb = activeConfirmCallback;
      closeConfirmModal();
      if (typeof cb === 'function') cb();
    });
  }
  if (confirmModal) {
    confirmModal.addEventListener('click', (e) => {
      if (e.target === confirmModal) closeConfirmModal();
    });
  }

  // Quick-Add Favorite Templates Listeners
  if (pinTemplateBtn) {
    pinTemplateBtn.addEventListener('click', handlePinCurrentAsTemplate);
  }
  if (favoriteTemplatesList) {
    favoriteTemplatesList.addEventListener('click', (e) => {
      const useBtn = e.target.closest('.template-chip-main');
      const removeBtn = e.target.closest('.template-chip-remove');
      if (removeBtn) {
        handleRemoveTemplate(removeBtn.dataset.id);
      } else if (useBtn) {
        handleUseTemplate(useBtn.dataset.id);
      }
    });
  }

  // Data Backup, Restore & Import Modal Listeners
  if (openBackupBtn) {
    openBackupBtn.addEventListener('click', openBackupModal);
  }
  if (closeBackupModalBtn) {
    closeBackupModalBtn.addEventListener('click', closeBackupModal);
  }
  if (doneBackupBtn) {
    doneBackupBtn.addEventListener('click', closeBackupModal);
  }
  if (backupModal) {
    backupModal.addEventListener('click', (e) => {
      if (e.target === backupModal) closeBackupModal();
    });
  }
  if (exportJsonBtn) {
    exportJsonBtn.addEventListener('click', handleExportJSON);
  }
  if (exportCsvBtn) {
    exportCsvBtn.addEventListener('click', handleExportCSV);
  }
  if (importDropzone && importFileInput) {
    importDropzone.addEventListener('click', () => importFileInput.click());
    importDropzone.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        importFileInput.click();
      }
    });
    importDropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      importDropzone.classList.add('drag-over');
    });
    importDropzone.addEventListener('dragleave', () => {
      importDropzone.classList.remove('drag-over');
    });
    importDropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      importDropzone.classList.remove('drag-over');
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleImportFile(e.dataTransfer.files[0]);
      }
    });
    importFileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files.length > 0) {
        handleImportFile(e.target.files[0]);
      }
    });
  }
  if (importMergeBtn) {
    importMergeBtn.addEventListener('click', () => executeImport('merge'));
  }
  if (importReplaceBtn) {
    importReplaceBtn.addEventListener('click', () => executeImport('replace'));
  }
  if (importClearFileBtn) {
    importClearFileBtn.addEventListener('click', clearImportPreview);
  }

  // Filter & Search Controls
  searchInput.addEventListener('input', render);
  filterStartDateInput.addEventListener('change', render);
  filterEndDateInput.addEventListener('change', render);

  // Reset Filters Button
  resetFiltersBtn.addEventListener('click', resetFilters);

  // Theme Toggle Button
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }

  // Monthly Budget Target Modal Listeners
  if (editBudgetBtn) {
    editBudgetBtn.addEventListener('click', openBudgetModal);
  }
  if (budgetForm) {
    budgetForm.addEventListener('submit', handleBudgetSubmit);
  }
  if (cancelBudgetBtn) {
    cancelBudgetBtn.addEventListener('click', closeBudgetModal);
  }
  if (closeBudgetModalBtn) {
    closeBudgetModalBtn.addEventListener('click', closeBudgetModal);
  }
  if (budgetModal) {
    budgetModal.addEventListener('click', (e) => {
      if (e.target === budgetModal) {
        closeBudgetModal();
      }
    });
  }

  // Export to PDF Button
  if (exportPdfBtn) {
    exportPdfBtn.addEventListener('click', handleExportPDF);
  }

  // Clear All Data Button
  clearAllBtn.addEventListener('click', handleClearAll);
}

// ==========================================================================
// 11. Application Initialization
// ==========================================================================

function initApp() {
  initTheme();
  setDefaultDate();
  setupEventListeners();
  processAutoLogDueBills();
  render();
}

// Start app once DOM is fully parsed
document.addEventListener('DOMContentLoaded', initApp);

