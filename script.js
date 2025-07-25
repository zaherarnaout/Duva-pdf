console.log("DUVA script.js loaded!");

// === Header JavaScript Functionality ===

document.addEventListener('DOMContentLoaded', function() {
  console.log('🎨 Header functionality initialized');

  // === Theme Toggle Functionality ===
  initializeThemeToggle();
  
  // === Menu Panel Functionality ===
  initializeMenuPanel();
  
  // === Search Functionality ===
  initializeSearch();
  
  // === Filter System ===
  initializeFilterSystem();
  
  // === Language Toggle ===
  initializeLanguageToggle();
  
  // === Accessibility Improvements ===
  initializeAccessibility();
});

// === Theme Toggle ===
function initializeThemeToggle() {
  const themeToggle = document.querySelector('.theme-toggle-wrapper');
  const body = document.body;
  
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      body.classList.toggle('dark-theme');
      
      // Save theme preference
      const isDark = body.classList.contains('dark-theme');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      
      console.log('🌙 Theme toggled:', isDark ? 'dark' : 'light');
    });
    
    // Load saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      body.classList.add('dark-theme');
    }
  }
}

// === Menu Panel ===
function initializeMenuPanel() {
  const menuWrapper = document.querySelector('.menu-wrapper');
  const menuPanel = document.querySelector('.menu-panel');
  const menuClose = document.querySelector('.menu-close');
  const menuOverlay = document.querySelector('.menu-overlay');
  
  if (menuWrapper && menuPanel) {
    // Open menu
    menuWrapper.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      openMenu();
    });
    
    // Close menu
    if (menuClose) {
      menuClose.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        closeMenu();
      });
    }
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && menuPanel.classList.contains('active')) {
        closeMenu();
      }
    });
    
    // Close menu on overlay click
    if (menuOverlay) {
      menuOverlay.addEventListener('click', function(e) {
        e.preventDefault();
        closeMenu();
      });
    }
    
    // Close menu on outside click (backup method)
    document.addEventListener('click', function(e) {
      if (menuPanel.classList.contains('active') && 
          !menuPanel.contains(e.target) && 
          !menuWrapper.contains(e.target) &&
          !menuOverlay.contains(e.target)) {
        closeMenu();
      }
    });
    
    // Prevent menu panel clicks from closing the menu
    menuPanel.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  }
  
  function openMenu() {
    const headerSection = document.querySelector('.header-section');
    const headerHeight = headerSection ? headerSection.offsetHeight : 100;
    
    // Position menu panel at the bottom of the header
    menuPanel.style.top = headerHeight + 'px';
    
    // Show menu panel and overlay
    menuPanel.style.display = 'block';
    menuPanel.classList.add('active');
    
    if (menuOverlay) {
      menuOverlay.classList.add('active');
    }
    
    // Update ARIA attributes
    menuWrapper.setAttribute('aria-expanded', 'true');
    menuPanel.setAttribute('aria-hidden', 'false');
    
    console.log('🍔 Menu opened');
  }
  
  function closeMenu() {
    // Hide menu panel and overlay
    menuPanel.classList.remove('active');
    
    if (menuOverlay) {
      menuOverlay.classList.remove('active');
    }
    
    // Hide menu panel after animation
    setTimeout(() => {
      menuPanel.style.display = 'none';
    }, 400);
    
    // Update ARIA attributes
    menuWrapper.setAttribute('aria-expanded', 'false');
    menuPanel.setAttribute('aria-hidden', 'true');
    
    console.log('🍔 Menu closed');
  }
}

// === Filter System ===
let activeFilters = {
  categories: [],
  types: [],
  shapes: [],
  wattages: []
};

function initializeFilterSystem() {
  // Create filter button next to search
  createFilterButton();
  
  // Load saved filters
  loadSavedFilters();
}

function createFilterButton() {
  const searchWrapper = document.querySelector('.search-wrapper');
  if (!searchWrapper) return;
  
  const filterButton = document.createElement('button');
  filterButton.className = 'filter-button';
  filterButton.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"/>
    </svg>
    <span>Filters</span>
  `;
  filterButton.style.cssText = `
    background: #f4f5f6;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 20px;
    padding: 6px 12px;
    margin-left: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: #666;
    transition: all 0.3s ease;
  `;
  
  filterButton.addEventListener('click', function() {
    showFilterPanel();
  });
  
  // Add hover effect
  filterButton.addEventListener('mouseenter', function() {
    this.style.backgroundColor = '#e8e9ea';
    this.style.borderColor = '#C0392B';
  });
  
  filterButton.addEventListener('mouseleave', function() {
    this.style.backgroundColor = '#f4f5f6';
    this.style.borderColor = 'rgba(0, 0, 0, 0.2)';
  });
  
  searchWrapper.appendChild(filterButton);
}

function showFilterPanel() {
  // Remove existing filter panel
  hideFilterPanel();
  
  const filterPanel = document.createElement('div');
  filterPanel.className = 'filter-panel';
  filterPanel.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    z-index: 2000;
    padding: 24px;
    max-width: 500px;
    max-height: 80vh;
    overflow-y: auto;
  `;
  
  filterPanel.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
      <h3 style="margin: 0; color: #212121;">Filter Products</h3>
      <button class="close-filter-btn" style="background: #C0392B; color: white; border: none; border-radius: 4px; padding: 8px 16px; cursor: pointer; font-size: 14px;">Close</button>
    </div>
    
    <div class="filter-section">
      <h4 style="margin: 0 0 12px 0; color: #212121; font-size: 16px;">Category</h4>
      <div class="filter-options">
        <label style="display: flex; align-items: center; margin-bottom: 8px; cursor: pointer;">
          <input type="checkbox" class="filter-checkbox" data-filter="categories" data-value="outdoor" style="margin-right: 8px;">
          <span>Outdoor</span>
        </label>
        <label style="display: flex; align-items: center; margin-bottom: 8px; cursor: pointer;">
          <input type="checkbox" class="filter-checkbox" data-filter="categories" data-value="indoor" style="margin-right: 8px;">
          <span>Indoor</span>
        </label>
      </div>
    </div>
    
    <div class="filter-section">
      <h4 style="margin: 0 0 12px 0; color: #212121; font-size: 16px;">Type</h4>
      <div class="filter-options">
        <label style="display: flex; align-items: center; margin-bottom: 8px; cursor: pointer;">
          <input type="checkbox" class="filter-checkbox" data-filter="types" data-value="downlight" style="margin-right: 8px;">
          <span>Downlight</span>
        </label>
        <label style="display: flex; align-items: center; margin-bottom: 8px; cursor: pointer;">
          <input type="checkbox" class="filter-checkbox" data-filter="types" data-value="spotlight" style="margin-right: 8px;">
          <span>Spotlight</span>
        </label>
        <label style="display: flex; align-items: center; margin-bottom: 8px; cursor: pointer;">
          <input type="checkbox" class="filter-checkbox" data-filter="types" data-value="flex strip" style="margin-right: 8px;">
          <span>Flex Strip</span>
        </label>
      </div>
    </div>
    
    <div class="filter-section">
      <h4 style="margin: 0 0 12px 0; color: #212121; font-size: 16px;">Shape</h4>
      <div class="filter-options">
        <label style="display: flex; align-items: center; margin-bottom: 8px; cursor: pointer;">
          <input type="checkbox" class="filter-checkbox" data-filter="shapes" data-value="square" style="margin-right: 8px;">
          <span>Square</span>
        </label>
        <label style="display: flex; align-items: center; margin-bottom: 8px; cursor: pointer;">
          <input type="checkbox" class="filter-checkbox" data-filter="shapes" data-value="round" style="margin-right: 8px;">
          <span>Round</span>
        </label>
        <label style="display: flex; align-items: center; margin-bottom: 8px; cursor: pointer;">
          <input type="checkbox" class="filter-checkbox" data-filter="shapes" data-value="strip" style="margin-right: 8px;">
          <span>Strip</span>
        </label>
      </div>
    </div>
    
    <div class="filter-section">
      <h4 style="margin: 0 0 12px 0; color: #212121; font-size: 16px;">Wattage</h4>
      <div class="filter-options">
        <label style="display: flex; align-items: center; margin-bottom: 8px; cursor: pointer;">
          <input type="checkbox" class="filter-checkbox" data-filter="wattages" data-value="12w" style="margin-right: 8px;">
          <span>12W</span>
        </label>
        <label style="display: flex; align-items: center; margin-bottom: 8px; cursor: pointer;">
          <input type="checkbox" class="filter-checkbox" data-filter="wattages" data-value="15w" style="margin-right: 8px;">
          <span>15W</span>
        </label>
        <label style="display: flex; align-items: center; margin-bottom: 8px; cursor: pointer;">
          <input type="checkbox" class="filter-checkbox" data-filter="wattages" data-value="18w" style="margin-right: 8px;">
          <span>18W</span>
        </label>
        <label style="display: flex; align-items: center; margin-bottom: 8px; cursor: pointer;">
          <input type="checkbox" class="filter-checkbox" data-filter="wattages" data-value="20w" style="margin-right: 8px;">
          <span>20W</span>
        </label>
        <label style="display: flex; align-items: center; margin-bottom: 8px; cursor: pointer;">
          <input type="checkbox" class="filter-checkbox" data-filter="wattages" data-value="24w" style="margin-right: 8px;">
          <span>24W</span>
        </label>
        <label style="display: flex; align-items: center; margin-bottom: 8px; cursor: pointer;">
          <input type="checkbox" class="filter-checkbox" data-filter="wattages" data-value="30w" style="margin-right: 8px;">
          <span>30W</span>
        </label>
      </div>
    </div>
    
    <div style="display: flex; gap: 12px; margin-top: 24px;">
      <button class="apply-filters-btn" style="background: #C0392B; color: white; border: none; border-radius: 4px; padding: 12px 24px; cursor: pointer; font-size: 14px; flex: 1;">Apply Filters</button>
      <button class="clear-filters-btn" style="background: #f4f5f6; color: #666; border: 1px solid rgba(0, 0, 0, 0.2); border-radius: 4px; padding: 12px 24px; cursor: pointer; font-size: 14px;">Clear All</button>
    </div>
  `;
  
  // Add event listeners
  const closeBtn = filterPanel.querySelector('.close-filter-btn');
  const applyBtn = filterPanel.querySelector('.apply-filters-btn');
  const clearBtn = filterPanel.querySelector('.clear-filters-btn');
  const checkboxes = filterPanel.querySelectorAll('.filter-checkbox');
  
  closeBtn.addEventListener('click', hideFilterPanel);
  applyBtn.addEventListener('click', applyFilters);
  clearBtn.addEventListener('click', clearAllFilters);
  
  // Checkbox change events
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      updateFilterButton();
    });
  });
  
  // Load current filter state
  loadFilterState(filterPanel);
  
  // Add overlay
  const overlay = document.createElement('div');
  overlay.className = 'filter-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1999;
  `;
  
  overlay.addEventListener('click', hideFilterPanel);
  
  document.body.appendChild(overlay);
  document.body.appendChild(filterPanel);
}

function hideFilterPanel() {
  const existingPanel = document.querySelector('.filter-panel');
  const existingOverlay = document.querySelector('.filter-overlay');
  
  if (existingPanel) existingPanel.remove();
  if (existingOverlay) existingOverlay.remove();
}

function loadFilterState(filterPanel) {
  const checkboxes = filterPanel.querySelectorAll('.filter-checkbox');
  
  checkboxes.forEach(checkbox => {
    const filterType = checkbox.dataset.filter;
    const filterValue = checkbox.dataset.value;
    
    if (activeFilters[filterType].includes(filterValue)) {
      checkbox.checked = true;
    }
  });
}

function applyFilters() {
  const filterPanel = document.querySelector('.filter-panel');
  if (!filterPanel) return;
  
  // Reset active filters
  activeFilters = {
    categories: [],
    types: [],
    shapes: [],
    wattages: []
  };
  
  // Get checked checkboxes
  const checkedBoxes = filterPanel.querySelectorAll('.filter-checkbox:checked');
  
  checkedBoxes.forEach(checkbox => {
    const filterType = checkbox.dataset.filter;
    const filterValue = checkbox.dataset.value;
    
    if (activeFilters[filterType]) {
      activeFilters[filterType].push(filterValue);
    }
  });
  
  // Save filters to localStorage
  saveFilters();
  
  // Update filter button
  updateFilterButton();
  
  // Hide filter panel
  hideFilterPanel();
  
  // Perform search with current search term and filters
  const searchInput = document.querySelector('.product-subtitle');
  const currentSearchTerm = searchInput.textContent.trim();
  
  if (currentSearchTerm && currentSearchTerm !== 'Search products...') {
    performSearch(currentSearchTerm);
  } else {
    // Show filtered results without search term
    const filteredResults = getFilteredProducts();
    displaySearchResults(filteredResults, 'Filtered Products');
  }
  
  console.log('🔍 Filters applied:', activeFilters);
}

function clearAllFilters() {
  activeFilters = {
    categories: [],
    types: [],
    shapes: [],
    wattages: []
  };
  
  // Uncheck all checkboxes
  const checkboxes = document.querySelectorAll('.filter-checkbox');
  checkboxes.forEach(checkbox => {
    checkbox.checked = false;
  });
  
  // Save filters
  saveFilters();
  
  // Update filter button
  updateFilterButton();
  
  console.log('🔍 All filters cleared');
}

function updateFilterButton() {
  const filterButton = document.querySelector('.filter-button');
  if (!filterButton) return;
  
  const totalActiveFilters = Object.values(activeFilters).flat().length;
  
  if (totalActiveFilters > 0) {
    filterButton.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"/>
      </svg>
      <span>Filters (${totalActiveFilters})</span>
    `;
    filterButton.style.backgroundColor = '#C0392B';
    filterButton.style.color = 'white';
    filterButton.style.borderColor = '#C0392B';
  } else {
    filterButton.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"/>
      </svg>
      <span>Filters</span>
    `;
    filterButton.style.backgroundColor = '#f4f5f6';
    filterButton.style.color = '#666';
    filterButton.style.borderColor = 'rgba(0, 0, 0, 0.2)';
  }
}

function saveFilters() {
  localStorage.setItem('duvaActiveFilters', JSON.stringify(activeFilters));
}

function loadSavedFilters() {
  const saved = localStorage.getItem('duvaActiveFilters');
  if (saved) {
    activeFilters = JSON.parse(saved);
    updateFilterButton();
  }
}

function getFilteredProducts() {
  let filteredProducts = productDatabase;
  
  // Apply category filter
  if (activeFilters.categories.length > 0) {
    filteredProducts = filteredProducts.filter(product => 
      activeFilters.categories.includes(product.category)
    );
  }
  
  // Apply type filter
  if (activeFilters.types.length > 0) {
    filteredProducts = filteredProducts.filter(product => 
      activeFilters.types.includes(product.type)
    );
  }
  
  // Apply shape filter
  if (activeFilters.shapes.length > 0) {
    filteredProducts = filteredProducts.filter(product => 
      activeFilters.shapes.includes(product.shape)
    );
  }
  
  // Apply wattage filter
  if (activeFilters.wattages.length > 0) {
    filteredProducts = filteredProducts.filter(product => 
      activeFilters.wattages.includes(product.wattage)
    );
  }
  
  return filteredProducts;
}

// === Search Functionality ===
function initializeSearch() {
  const searchWrapper = document.querySelector('.search-wrapper');
  const searchInput = document.querySelector('.product-subtitle');
  const searchIcon = document.querySelector('.search-icon');
  
  if (searchWrapper && searchInput) {
    // Make search input focusable
    searchInput.setAttribute('tabindex', '0');
    searchInput.setAttribute('role', 'textbox');
    searchInput.setAttribute('aria-label', 'Search products');
    
    // Store original content
    const originalText = searchInput.textContent;
    const originalIconDisplay = searchIcon ? searchIcon.style.display : 'block';
    
    // Handle search input click/focus
    searchInput.addEventListener('click', function() {
      clearSearchField();
    });
    
    searchInput.addEventListener('focus', function() {
      clearSearchField();
    });
    
    // Handle search input blur (when user clicks outside)
    searchInput.addEventListener('blur', function() {
      if (!searchInput.textContent.trim()) {
        restoreSearchField();
      }
    });
    
    // Handle search input
    searchInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        performSearch(searchInput.textContent);
      }
    });
    
    // Handle text input to resize the field
    searchInput.addEventListener('input', function() {
      adjustSearchFieldWidth();
      // Show search suggestions as user types
      showSearchSuggestions(searchInput.textContent);
    });
    
    // Add loading state
    searchWrapper.addEventListener('click', function(e) {
      // Don't trigger if clicking on the input itself
      if (e.target === searchInput) return;
      
      searchWrapper.classList.add('loading');
      
      // Simulate search (replace with actual search logic)
      setTimeout(() => {
        searchWrapper.classList.remove('loading');
        console.log('🔍 Search performed');
      }, 1000);
    });
  }
  
  function clearSearchField() {
    // Clear the text
    searchInput.textContent = '';
    
    // Hide the search icon
    if (searchIcon) {
      searchIcon.style.display = 'none';
    }
    
    // Reset width to minimum
    searchInput.style.width = '300px';
    
    // Focus the input for typing
    searchInput.focus();
    
    // Hide search suggestions
    hideSearchSuggestions();
    
    console.log('🔍 Search field cleared');
  }
  
  function restoreSearchField() {
    // Restore original text
    searchInput.textContent = 'Search products...';
    
    // Show the search icon
    if (searchIcon) {
      searchIcon.style.display = 'block';
    }
    
    // Reset width to minimum
    searchInput.style.width = '300px';
    
    // Hide search suggestions
    hideSearchSuggestions();
    
    console.log('🔍 Search field restored');
  }
  
  function performSearch(query) {
    console.log('🔍 Searching for:', query);
    
    if (!query.trim()) {
      console.log('🔍 Empty search query');
      return;
    }
    
    // Add loading state
    searchWrapper.classList.add('loading');
    
    // Get filtered products first
    const filteredProducts = getFilteredProducts();
    
    // Perform the search on filtered products
    const results = searchProductsInFiltered(query, filteredProducts);
    
    // Remove loading state
    searchWrapper.classList.remove('loading');
    
    // Display results
    displaySearchResults(results, query);
  }
  
  function adjustSearchFieldWidth() {
    // Create a temporary span to measure text width
    const tempSpan = document.createElement('span');
    tempSpan.style.visibility = 'hidden';
    tempSpan.style.position = 'absolute';
    tempSpan.style.whiteSpace = 'nowrap';
    tempSpan.style.font = window.getComputedStyle(searchInput).font;
    tempSpan.textContent = searchInput.textContent || 'Search products...';
    
    document.body.appendChild(tempSpan);
    
    // Calculate the width needed for the text
    const textWidth = tempSpan.offsetWidth;
    document.body.removeChild(tempSpan);
    
    // Calculate total width needed (text + padding + icon space)
    const paddingLeft = 40; // Left padding for icon
    const paddingRight = 12; // Right padding
    const minWidth = 300; // Minimum width
    const calculatedWidth = Math.max(minWidth, textWidth + paddingLeft + paddingRight + 20); // +20 for buffer
    
    // Apply the calculated width
    searchInput.style.width = calculatedWidth + 'px';
    
    console.log('🔍 Search field width adjusted to:', calculatedWidth + 'px');
  }
}

// === Product Search Database ===
const productDatabase = [
  {
    id: 1,
    name: "Outdoor Square Downlight",
    category: "outdoor",
    type: "downlight",
    shape: "square",
    wattage: "18w",
    lumen: "1900",
    description: "Outdoor square downlight with 18W LED and 1900 lumens",
    url: "/products/outdoor-square-downlight"
  },
  {
    id: 2,
    name: "Indoor Round Spotlight",
    category: "indoor",
    type: "spotlight",
    shape: "round",
    wattage: "12w",
    lumen: "1200",
    description: "Indoor round spotlight with 12W LED and 1200 lumens",
    url: "/products/indoor-round-spotlight"
  },
  {
    id: 3,
    name: "Flex Strip LED",
    category: "indoor",
    type: "flex strip",
    shape: "strip",
    wattage: "24w",
    lumen: "2400",
    description: "Flexible LED strip with 24W and 2400 lumens",
    url: "/products/flex-strip-led"
  },
  {
    id: 4,
    name: "Outdoor Round Downlight",
    category: "outdoor",
    type: "downlight",
    shape: "round",
    wattage: "15w",
    lumen: "1500",
    description: "Outdoor round downlight with 15W LED and 1500 lumens",
    url: "/products/outdoor-round-downlight"
  },
  {
    id: 5,
    name: "Indoor Square Spotlight",
    category: "indoor",
    type: "spotlight",
    shape: "square",
    wattage: "20w",
    lumen: "2000",
    description: "Indoor square spotlight with 20W LED and 2000 lumens",
    url: "/products/indoor-square-spotlight"
  },
  {
    id: 6,
    name: "Outdoor Flex Strip",
    category: "outdoor",
    type: "flex strip",
    shape: "strip",
    wattage: "30w",
    lumen: "3000",
    description: "Outdoor flexible LED strip with 30W and 3000 lumens",
    url: "/products/outdoor-flex-strip"
  }
];

// === Enhanced Search Functions ===
function searchProductsInFiltered(query, filteredProducts) {
  const searchTerm = query.toLowerCase().trim();
  const results = [];
  
  // Search through filtered products only
  filteredProducts.forEach(product => {
    let score = 0;
    let matchedFields = [];
    
    // Check product name
    if (product.name.toLowerCase().includes(searchTerm)) {
      score += 10;
      matchedFields.push('name');
    }
    
    // Check category
    if (product.category.toLowerCase().includes(searchTerm)) {
      score += 8;
      matchedFields.push('category');
    }
    
    // Check type
    if (product.type.toLowerCase().includes(searchTerm)) {
      score += 8;
      matchedFields.push('type');
    }
    
    // Check shape
    if (product.shape.toLowerCase().includes(searchTerm)) {
      score += 6;
      matchedFields.push('shape');
    }
    
    // Check wattage
    if (product.wattage.toLowerCase().includes(searchTerm)) {
      score += 5;
      matchedFields.push('wattage');
    }
    
    // Check lumen
    if (product.lumen.toLowerCase().includes(searchTerm)) {
      score += 5;
      matchedFields.push('lumen');
    }
    
    // Check description
    if (product.description.toLowerCase().includes(searchTerm)) {
      score += 3;
      matchedFields.push('description');
    }
    
    // If we found matches, add to results
    if (score > 0) {
      results.push({
        ...product,
        score,
        matchedFields
      });
    }
  });
  
  // Sort by score (highest first)
  results.sort((a, b) => b.score - a.score);
  
  console.log('🔍 Search results (with filters):', results);
  return results;
}

// === Search Suggestions ===
function showSearchSuggestions(query) {
  if (!query.trim()) {
    hideSearchSuggestions();
    return;
  }
  
  const suggestions = getSearchSuggestions(query);
  displaySearchSuggestions(suggestions);
}

function getSearchSuggestions(query) {
  const searchTerm = query.toLowerCase().trim();
  const suggestions = new Set();
  
  // Add category suggestions
  if (searchTerm.includes('out') || searchTerm.includes('indoor')) {
    suggestions.add('outdoor');
    suggestions.add('indoor');
  }
  
  if (searchTerm.includes('square') || searchTerm.includes('round')) {
    suggestions.add('square');
    suggestions.add('round');
  }
  
  if (searchTerm.includes('flex') || searchTerm.includes('strip')) {
    suggestions.add('flex strip');
  }
  
  if (searchTerm.includes('down') || searchTerm.includes('light')) {
    suggestions.add('downlight');
  }
  
  if (searchTerm.includes('spot')) {
    suggestions.add('spotlight');
  }
  
  // Add wattage suggestions
  if (searchTerm.includes('18') || searchTerm.includes('w')) {
    suggestions.add('18w');
  }
  
  if (searchTerm.includes('1900') || searchTerm.includes('lumen')) {
    suggestions.add('1900 lumen');
  }
  
  return Array.from(suggestions).slice(0, 5); // Limit to 5 suggestions
}

function displaySearchSuggestions(suggestions) {
  // Remove existing suggestions
  hideSearchSuggestions();
  
  if (suggestions.length === 0) return;
  
  const searchWrapper = document.querySelector('.search-wrapper');
  const suggestionsContainer = document.createElement('div');
  suggestionsContainer.className = 'search-suggestions';
  suggestionsContainer.style.cssText = `
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-top: none;
    border-radius: 0 0 20px 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    max-height: 200px;
    overflow-y: auto;
  `;
  
  suggestions.forEach(suggestion => {
    const suggestionItem = document.createElement('div');
    suggestionItem.className = 'search-suggestion-item';
    suggestionItem.textContent = suggestion;
    suggestionItem.style.cssText = `
      padding: 10px 15px;
      cursor: pointer;
      border-bottom: 1px solid #f0f0f0;
      transition: background-color 0.2s;
    `;
    
    suggestionItem.addEventListener('mouseenter', function() {
      this.style.backgroundColor = '#f4f5f6';
    });
    
    suggestionItem.addEventListener('mouseleave', function() {
      this.style.backgroundColor = 'white';
    });
    
    suggestionItem.addEventListener('click', function() {
      const searchInput = document.querySelector('.product-subtitle');
      searchInput.textContent = suggestion;
      performSearch(suggestion);
      hideSearchSuggestions();
    });
    
    suggestionsContainer.appendChild(suggestionItem);
  });
  
  searchWrapper.appendChild(suggestionsContainer);
}

function hideSearchSuggestions() {
  const existingSuggestions = document.querySelector('.search-suggestions');
  if (existingSuggestions) {
    existingSuggestions.remove();
  }
}

// === Search Results Display ===
function displaySearchResults(results, query) {
  // Remove existing results
  hideSearchResults();
  
  if (results.length === 0) {
    showNoResultsMessage(query);
    return;
  }
  
  const resultsContainer = document.createElement('div');
  resultsContainer.className = 'search-results';
  resultsContainer.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    z-index: 2000;
    max-width: 600px;
    max-height: 80vh;
    overflow-y: auto;
    padding: 20px;
  `;
  
  // Add header with filter info
  const header = document.createElement('div');
  const activeFilterCount = Object.values(activeFilters).flat().length;
  const filterInfo = activeFilterCount > 0 ? ` (with ${activeFilterCount} active filters)` : '';
  
  header.innerHTML = `
    <h3 style="margin: 0 0 15px 0; color: #212121;">Search Results for "${query}"${filterInfo}</h3>
    <p style="margin: 0 0 20px 0; color: #666; font-size: 14px;">Found ${results.length} product(s)</p>
  `;
  resultsContainer.appendChild(header);
  
  // Add results
  results.forEach(product => {
    const resultItem = document.createElement('div');
    resultItem.className = 'search-result-item';
    resultItem.style.cssText = `
      padding: 15px;
      border: 1px solid #f0f0f0;
      border-radius: 4px;
      margin-bottom: 10px;
      cursor: pointer;
      transition: all 0.2s;
    `;
    
    resultItem.innerHTML = `
      <h4 style="margin: 0 0 8px 0; color: #212121;">${product.name}</h4>
      <p style="margin: 0 0 5px 0; color: #666; font-size: 14px;">${product.description}</p>
      <div style="display: flex; gap: 10px; font-size: 12px; color: #888;">
        <span>${product.category}</span>
        <span>•</span>
        <span>${product.type}</span>
        <span>•</span>
        <span>${product.wattage}</span>
        <span>•</span>
        <span>${product.lumen} lumen</span>
      </div>
    `;
    
    resultItem.addEventListener('mouseenter', function() {
      this.style.backgroundColor = '#f4f5f6';
      this.style.borderColor = '#C0392B';
    });
    
    resultItem.addEventListener('mouseleave', function() {
      this.style.backgroundColor = 'white';
      this.style.borderColor = '#f0f0f0';
    });
    
    resultItem.addEventListener('click', function() {
      // Navigate to product page
      window.location.href = product.url;
    });
    
    resultsContainer.appendChild(resultItem);
  });
  
  // Add close button
  const closeButton = document.createElement('button');
  closeButton.textContent = 'Close';
  closeButton.style.cssText = `
    position: absolute;
    top: 15px;
    right: 15px;
    background: #C0392B;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
    font-size: 14px;
  `;
  
  closeButton.addEventListener('click', function() {
    hideSearchResults();
  });
  
  resultsContainer.appendChild(closeButton);
  
  // Add overlay
  const overlay = document.createElement('div');
  overlay.className = 'search-results-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1999;
  `;
  
  overlay.addEventListener('click', function() {
    hideSearchResults();
  });
  
  document.body.appendChild(overlay);
  document.body.appendChild(resultsContainer);
}

function hideSearchResults() {
  const existingResults = document.querySelector('.search-results');
  const existingOverlay = document.querySelector('.search-results-overlay');
  
  if (existingResults) existingResults.remove();
  if (existingOverlay) existingOverlay.remove();
}

function showNoResultsMessage(query) {
  const messageContainer = document.createElement('div');
  messageContainer.className = 'search-no-results';
  messageContainer.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    z-index: 2000;
    padding: 30px;
    text-align: center;
    max-width: 400px;
  `;
  
  const activeFilterCount = Object.values(activeFilters).flat().length;
  const filterInfo = activeFilterCount > 0 ? ` with ${activeFilterCount} active filters` : '';
  
  messageContainer.innerHTML = `
    <h3 style="margin: 0 0 15px 0; color: #212121;">No Results Found</h3>
    <p style="margin: 0 0 20px 0; color: #666;">No products found for "${query}"${filterInfo}</p>
    <p style="margin: 0 0 20px 0; color: #888; font-size: 14px;">Try:</p>
    <div style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin-bottom: 20px;">
      <span style="background: #f4f5f6; padding: 5px 10px; border-radius: 15px; font-size: 12px;">outdoor</span>
      <span style="background: #f4f5f6; padding: 5px 10px; border-radius: 15px; font-size: 12px;">indoor</span>
      <span style="background: #f4f5f6; padding: 5px 10px; border-radius: 15px; font-size: 12px;">downlight</span>
      <span style="background: #f4f5f6; padding: 5px 10px; border-radius: 15px; font-size: 12px;">18w</span>
    </div>
    <button class="clear-filters-no-results" style="background: #C0392B; color: white; border: none; border-radius: 4px; padding: 10px 20px; cursor: pointer; margin-right: 10px;">Clear Filters</button>
    <button style="background: #f4f5f6; color: #666; border: 1px solid rgba(0, 0, 0, 0.2); border-radius: 4px; padding: 10px 20px; cursor: pointer;">Close</button>
  `;
  
  const closeButton = messageContainer.querySelector('button:last-child');
  const clearFiltersButton = messageContainer.querySelector('.clear-filters-no-results');
  
  closeButton.addEventListener('click', function() {
    hideSearchResults();
  });
  
  clearFiltersButton.addEventListener('click', function() {
    clearAllFilters();
    hideSearchResults();
    // Re-run search without filters
    const searchInput = document.querySelector('.product-subtitle');
    const currentSearchTerm = searchInput.textContent.trim();
    if (currentSearchTerm && currentSearchTerm !== 'Search products...') {
      performSearch(currentSearchTerm);
    }
  });
  
  // Add overlay
  const overlay = document.createElement('div');
  overlay.className = 'search-results-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1999;
  `;
  
  overlay.addEventListener('click', function() {
    hideSearchResults();
  });
  
  document.body.appendChild(overlay);
  document.body.appendChild(messageContainer);
}

// === Language Toggle ===
function initializeLanguageToggle() {
  const langSwitches = document.querySelectorAll('.lang-toggle-switch');
  
  langSwitches.forEach(switch_ => {
    const langOptions = switch_.querySelectorAll('.lang-en');
    
    langOptions.forEach(option => {
      option.addEventListener('click', function() {
        const language = this.querySelector('.text-block-3, .text-block-4')?.textContent;
        if (language) {
          console.log('🌍 Language changed to:', language);
          // Add your language change logic here
        }
      });
    });
  });
}

// === Accessibility Improvements ===
function initializeAccessibility() {
  // Add ARIA labels
  const menuWrapper = document.querySelector('.menu-wrapper');
  if (menuWrapper) {
    menuWrapper.setAttribute('aria-label', 'Open main menu');
    menuWrapper.setAttribute('aria-expanded', 'false');
  }
  
  const themeToggle = document.querySelector('.theme-toggle-wrapper');
  if (themeToggle) {
    themeToggle.setAttribute('aria-label', 'Toggle dark mode');
  }
  
  // Add keyboard navigation
  const focusableElements = document.querySelectorAll(
    'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
  );
  
  focusableElements.forEach(element => {
    element.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });
  
  // Update menu ARIA state
  const menuPanel = document.querySelector('.menu-panel');
  if (menuPanel && menuWrapper) {
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const isExpanded = menuPanel.classList.contains('active');
          menuWrapper.setAttribute('aria-expanded', isExpanded.toString());
        }
      });
    });
    
    observer.observe(menuPanel, {
      attributes: true,
      attributeFilter: ['class']
    });
  }
}

// === Performance Optimizations ===
function optimizePerformance() {
  // Debounce search input
  let searchTimeout;
  const searchInput = document.querySelector('.product-subtitle');
  
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        performSearch(this.textContent);
      }, 300);
    });
  }
  
  // Lazy load images
  const images = document.querySelectorAll('img[loading="lazy"]');
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          observer.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }
}

// === Error Handling ===
window.addEventListener('error', function(e) {
  console.error('🚨 Header error:', e.error);
});

// === Initialize Performance Optimizations ===
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', optimizePerformance);
} else {
  optimizePerformance();
}

console.log('✅ Header JavaScript loaded successfully');

/* === Accessories Image Zoom on Hover (Constrained to Container) === */ 

document.querySelectorAll('.accessory-image').forEach(container => { 

  const img = container.querySelector('img'); 

 

  container.style.overflow = 'hidden'; // Keeps zoomed image inside the box 

 

  container.addEventListener('mouseenter', () => { 

    img.classList.add('zoomed'); 

  }); 

 

  container.addEventListener('mousemove', e => { 

    const rect = container.getBoundingClientRect(); 

    const x = ((e.clientX - rect.left) / rect.width) * 100; 

    const y = ((e.clientY - rect.top) / rect.height) * 100; 

    img.style.transformOrigin = `${x}% ${y}%`; 

  }); 

 

  container.addEventListener('mouseleave', () => { 

    img.classList.remove('zoomed'); 

    img.style.transformOrigin = 'center center'; 

  }); 

}); 

 

/* === 2. Thumbnail Image Selector === */ 

document.addEventListener("DOMContentLoaded", function () { 

    const mainImage = document.getElementById("main-lightbox-trigger"); 

    const thumbnails = document.querySelectorAll(".thumbnail-image"); 

    thumbnails.forEach(thumb => { 

        thumb.addEventListener("click", function () { 

            thumbnails.forEach(t => t.classList.remove("is-active")); 

            this.classList.add("is-active"); 

            const newImg = this.getAttribute("data-image"); 

            if (mainImage) mainImage.setAttribute("href", newImg); 

        }); 

    }); 

}); 

 

/* === 3. Dropdown + Code Generator + Accessories Logic === */ 

// Full working logic from your working file, manually verified and retained 

document.querySelectorAll('.accessory-image').forEach(container => { 

    const img = container.querySelector('img'); 

 

    // Zoom in on hover 

    container.addEventListener('mouseenter', () => { 

      img.classList.add('zoomed'); 

    }); 

 

    // Track mouse position for dynamic zoom focus 

    container.addEventListener('mousemove', e => { 

      const rect = container.getBoundingClientRect(); 

      const x = ((e.clientX - rect.left) / rect.width) * 100; 

      const y = ((e.clientY - rect.top) / rect.height) * 100; 

      img.style.transformOrigin = `${x}% ${y}%`; 

    }); 

 

    // Reset on mouse leave 

    container.addEventListener('mouseleave', () => { 

      img.classList.remove('zoomed'); 

      img.style.transformOrigin = 'center center'; 

    }); 

  }); 

 

 

 

  document.addEventListener("DOMContentLoaded", function () { 

    const mainImage = document.getElementById("main-lightbox-trigger"); 

    const thumbnails = document.querySelectorAll(".thumbnail-image"); 

 

    thumbnails.forEach((thumb) => { 

      thumb.addEventListener("click", function () { 

        // === Get the source of the clicked thumbnail 

        const newSrc = thumb.getAttribute("src"); 

 

        // === Update the main image 

        if (newSrc && mainImage) { 

          mainImage.setAttribute("src", newSrc); 

        } 

      }); 

    }); 

  }); 

 

 

 

  document.addEventListener("DOMContentLoaded", function () { 

    const mainTrigger = document.getElementById("main-lightbox-trigger"); 

    const firstGalleryItem = document.querySelector(".first-gallery-image"); 

 

    // === When main image is clicked, open the Webflow lightbox 

    if (mainTrigger && firstGalleryItem) { 

      mainTrigger.addEventListener("click", () => { 

        firstGalleryItem.click(); 

      }); 

    } 

  }); 

 

 

 

document.addEventListener("DOMContentLoaded", function () { 

  // === Global Selectors & State === 

  const dropdowns = document.querySelectorAll(".dropdown-wrapper"); 

  const ralInput = document.querySelector("#ral-input"); 

 

  // === RAL Input Initial Setup === 

  if (ralInput) { 

    ralInput.style.display = "none"; 

    ralInput.textContent = "Enter RAL number here"; 

    ralInput.setAttribute("contenteditable", "true"); 

    ralInput.style.color = "#999"; 

    ralInput.style.padding = "6px 8px"; 

    ralInput.style.minHeight = "48px"; 

    ralInput.style.backgroundColor = "#f8f8f8"; 

    ralInput.style.borderRadius = "6px"; 

    ralInput.style.cursor = "text"; 

  } 

 

  // === Global Selection State === 

  window.currentSelection = { 

    product: document.querySelector("#product-code-heading")?.textContent.trim() || null, 

    watt: null, 

    cct: null, 

    cri: null, 

    finish: null, 

    defaults: {} 

  }; 

 

  // === Reset Button Setup === 

  const resetButton = document.querySelector(".reset-button"); 

  if (resetButton) { 

    resetButton.style.display = "flex"; 

    resetButton.style.alignItems = "center"; 

    resetButton.style.justifyContent = "center"; 

  } 

 

  // === Reset Button Handler === 

  resetButton?.addEventListener("click", () => { 

    dropdowns.forEach(dropdown => { 

      const type = dropdown.getAttribute("data-type"); 

      const selected = dropdown.querySelector(".selected-value"); 

      const source = dropdown.querySelector(".dropdown-source"); 

 

      if (!type || !selected || !source) return; 

 

      const rawText = source.textContent.trim(); 

      const values = [...new Set(rawText.split(",").map(v => v.trim()).filter(v => v))]; 

      const firstValue = values[0] || "XX"; 

 

      selected.textContent = firstValue; 

      window.currentSelection[type] = firstValue; 

      window.currentSelection.defaults[type] = normalizeValue(type, firstValue); 

 

      // RAL reset logic 

      if (type === "finish") { 

        if (firstValue.toLowerCase() === "ral") { 

          ralInput.style.display = "block"; 

          ralInput.textContent = "Enter RAL number here"; 

          ralInput.style.color = "#999"; 

          window.currentSelection.finish = "RAL"; 

        } else { 

          ralInput.style.display = "none"; 

          ralInput.textContent = "Enter RAL number here"; 

          ralInput.style.color = "#999"; 

        } 

      } 

    }); 

 

    updateLumenValue(); 

    updateOrderingCode(); 

  }); 

 

  // === Dropdown Setup & Interactions === 

  dropdowns.forEach(dropdown => { 

    const type = dropdown.getAttribute("data-type"); 

    const source = dropdown.querySelector(".dropdown-source"); 

    const field = dropdown.querySelector(".dropdown-field"); 

    const selected = dropdown.querySelector(".selected-value"); 

    const arrow = dropdown.querySelector(".dropdown-arrow"); 

 

    if (!field || !selected || !source) return; 

 

    // Disable static dropdowns (e.g., lumen) 

    if (type === "lumen") { 

      dropdown.classList.add("disabled"); 

      arrow && (arrow.style.display = "none"); 

      return; 

    } 

 

    // Parse values 

    const rawText = source.textContent.trim(); 

    const values = [...new Set( 

      rawText.split(",") 

             .map(v => v.trim()) 

             .filter(v => v && !["na", "n/a", "none", "0", "--"].includes(v.toLowerCase())) 

    )]; 

 

    if (values.length === 0) { 

      dropdown.closest(".spec-row")?.remove(); 

      return; 

    } 

 

    // Set default selected value 

    selected.textContent = values[0] || "N/A"; 

    if (type) { 

      window.currentSelection[type] = values[0]; 

      window.currentSelection.defaults[type] = normalizeValue(type, values[0]); 

    } 

 

    if (values.length <= 1) { 

      dropdown.classList.add("disabled"); 

      arrow && (arrow.style.display = "none"); 

      return; 

    } 

 

    // Create dropdown options 

    const optionsBox = document.createElement("div"); 

    optionsBox.className = "dropdown-options"; 

    dropdown.appendChild(optionsBox); 

 

    values.forEach(value => { 

      const opt = document.createElement("div"); 

      opt.className = "dropdown-option"; 

      opt.textContent = value; 

      opt.addEventListener("click", () => { 

        if (selected.textContent === value) return; 

        selected.textContent = value; 

        optionsBox.style.display = "none"; 

        dropdown.classList.remove("open"); 

 

        if (type) { 

          // RAL logic 

          if (type === "finish" && value.toLowerCase() === "ral") { 

            if (ralInput) { 

              ralInput.style.display = "block"; 

              ralInput.textContent = "Enter RAL number here"; 

              ralInput.style.color = "#999"; 

              ralInput.addEventListener("focus", () => { 

                if (ralInput.textContent === "Enter RAL number here") { 

                  ralInput.textContent = ""; 

                  ralInput.style.color = "#111"; 

                } 

              }); 

              ralInput.addEventListener("input", () => { 

                const typedRAL = ralInput.textContent.trim(); 

                window.currentSelection.finish = typedRAL ? "RAL" + typedRAL : "RAL"; 

                updateLumenValue(); 

                updateOrderingCode(); 

              }); 

            } 

            window.currentSelection.finish = "RAL"; 

          } else { 

            if (ralInput) { 

              ralInput.style.display = "none"; 

              ralInput.textContent = "Enter RAL number here"; 

              ralInput.style.color = "#999"; 

            } 

            window.currentSelection[type] = value; 

          } 

        } 

        if (["watt", "cct", "cri"].includes(type)) {
          updateLumenValue();
        }
        updateOrderingCode(); 
      }); 

      optionsBox.appendChild(opt); 

    }); 

 

    // Toggle dropdown 

    arrow?.addEventListener("click", (e) => { 

      e.stopPropagation(); 

      const isOpen = optionsBox.style.display === "block"; 

      document.querySelectorAll(".dropdown-options").forEach(opt => opt.style.display = "none"); 

      document.querySelectorAll(".dropdown-wrapper").forEach(d => d.classList.remove("open")); 

      if (!isOpen) { 

        optionsBox.style.display = "block"; 

        dropdown.classList.add("open"); 

      } 

    }); 

 

    // Close on outside click 

    document.addEventListener("click", () => { 

      optionsBox.style.display = "none"; 

      dropdown.classList.remove("open"); 

    }); 

  }); 

 

  /* === Update Lumen Value Based on Dropdown Selections === */ 

  function updateLumenValue() {
    const { product, watt, cct, cri } = window.currentSelection;
    let match = null;
    const lumenData = Array.from(document.querySelectorAll('.lumen-cms-data'));
    for (const el of lumenData) {
      const matches =
        el.dataset.product === product &&
        el.dataset.watt === watt &&
        el.dataset.cct === cct &&
        (!el.dataset.cri || el.dataset.cri === cri);
      if (matches) {
        match = el;
        break;
      }
    }
    const lumenSelected = document.querySelector('[data-type="lumen"].selected-value, [data-type="lumen"] .selected-value');
    if (lumenSelected) {
      if (match) {
        const lumen = match.dataset.lumen || match.textContent.trim();
        lumenSelected.textContent = lumen;
        lumenSelected.style.color = "#111";
        lumenSelected.style.fontWeight = "bold";
        window.currentSelection.lumen = lumen;
      } else {
        lumenSelected.textContent = "Not Available";
        lumenSelected.style.color = "red";
        lumenSelected.style.fontWeight = "bold";
        window.currentSelection.lumen = null;
      }
    }
  }

  /* === End Update Lumen Value Based on Dropdown Selections === */ 

  // === Normalize Value for Code Generation === 

  function normalizeValue(type, val) { 

    val = val?.toLowerCase(); 

    if (!val) return "XX"; 

 

    if (type === "cct") return val.replace("k", "").substring(0, 2); 

    if (type === "beam") return val.replace("°", ""); 

    if (type === "ip-rating") return val.replace("ip", ""); 

    if (type === "finish") { 

      if (val.startsWith("ral")) { 

        return "RAL" + val.replace("ral", "").replace(/\s+/g, ""); 

      } 

      const colorMap = { 

        "white": "WH", 

        "black": "BK", 

        "grey": "GR", 

        "gray": "GR", 

        "silver": "SV", 

        "satin-nickel": "SN" 

      }; 

      return colorMap[val] || val.toUpperCase(); 

    } 

    return val; 

  } 

 

  // === Get Text Value for a Dropdown === 

  function getTextValue(type) { 

    const el = document.querySelector(`.dropdown-wrapper[data-type="${type}"] .selected-value`); 

    if (!el) return null; 

    if (type === "finish" && window.currentSelection.finish?.startsWith("RAL")) { 

      return window.currentSelection.finish; 

    } 

    return normalizeValue(type, el.textContent.trim()); 

  } 

 

  // === Generate & Display Ordering Code === 

  function updateOrderingCode() { 

    ensureProductCode();
    // Get current product code dynamically from CMS
    const baseCode = getCurrentProductCode();
    console.log("🔄 updateOrderingCode: product =", baseCode); 

    const keys = ["watt", "ip-rating", "beam", "cct", "cri", "finish"]; 

    const labels = ["Wattage", "IP Rating", "Beam", "CCT", "CRI", "Finish"]; 

    const codeElement = document.querySelector(".ordering-code-value"); 
    const pdfCodeElement = document.getElementById("pdf-code"); // <-- Add this

    console.log("🔍 updateOrderingCode: codeElement found =", !!codeElement);
    console.log("🔍 updateOrderingCode: pdfCodeElement found =", !!pdfCodeElement);

  if (codeElement) { 
    const styledParts = keys.map((key, i) => { 
      const val = getTextValue(key) || "XX"; 
      const defaultVal = window.currentSelection.defaults?.[key] || "XX"; 
      const isDefault = val === defaultVal; 
      const color = isDefault ? "#999" : "#C0392B"; 
      return `<span title="${labels[i]}" style="color:${color}; font-weight: bold;">${val}</span>`; 
    }); 

    const newOrderingCode = `<span title="Product Code" style="color: #111; font-weight: bold;">${baseCode}</span>.` + styledParts.join(".");
    console.log("🔄 updateOrderingCode: Setting new ordering code =", newOrderingCode);

    // For on-screen display
    codeElement.innerHTML = newOrderingCode;
    console.log("✅ updateOrderingCode: Ordering code updated successfully");

    // For PDF filename (plain text, no HTML)
    if (pdfCodeElement) {
      // Build plain code string for filename
      const plainParts = keys.map(key => getTextValue(key) || "XX");
      const plainCode = `${baseCode}.${plainParts.join(".")}`;
      pdfCodeElement.textContent = plainCode;
      console.log("📄 updateOrderingCode: PDF code set =", plainCode);
    }
  } else {
    console.log("⚠️ updateOrderingCode: No ordering-code-value element found!");
  } 
} 

 

  // === Trigger Initial Update on Load === 

  setTimeout(() => { 

    updateLumenValue(); 

    updateOrderingCode(); 

  }, 300); 

}); 

 

 

 

document.addEventListener("DOMContentLoaded", function () { 

 

  /* === Main Image Thumbnail Click Logic === */ 

  const mainImage = document.getElementById("main-lightbox-trigger"); 

  const thumbnails = document.querySelectorAll(".thumbnail-image"); 

 

  thumbnails.forEach((thumb) => { 

    thumb.addEventListener("click", function () { 

      const newSrc = this.getAttribute("src"); 

      if (mainImage && newSrc) { 

        mainImage.setAttribute("src", newSrc); 

      } 

 

      // Update active state 

      thumbnails.forEach(t => t.classList.remove("is-active")); 

      this.classList.add("is-active"); 

    }); 

  }); 

 

  /* === Trigger Hidden Webflow Lightbox Gallery === */ 

  const firstGalleryItem = document.querySelector(".first-gallery-image"); 

  if (mainImage && firstGalleryItem) { 

    mainImage.addEventListener("click", () => { 

      firstGalleryItem.click(); 

    }); 

  } 

 

  /* === Dropdown + Configurator Logic === */ 

  const dropdowns = document.querySelectorAll(".dropdown-wrapper"); 

  const ralInput = document.querySelector("#ral-input"); 

 

  // RAL input styling and default setup 

  if (ralInput) { 

    ralInput.style.display = "none"; 

    ralInput.textContent = "Enter RAL number here"; 

    ralInput.setAttribute("contenteditable", "true"); 

    ralInput.style.color = "#999"; 

    ralInput.style.padding = "6px 8px"; 

    ralInput.style.minHeight = "48px"; 

    ralInput.style.backgroundColor = "#f8f8f8"; 

    ralInput.style.borderRadius = "6px"; 

    ralInput.style.cursor = "text"; 

  } 

 

  // Global selection state 

  window.currentSelection = { 

    product: document.querySelector("#product-code-heading")?.textContent.trim() || null, 

    watt: null, 

    cct: null, 

    cri: null, 

    finish: null, 

    defaults: {} 

  }; 

 

  /* === Reset Button Logic === */ 

  const resetButton = document.querySelector(".reset-button"); 

  if (resetButton) { 

    resetButton.style.display = "flex"; 

    resetButton.style.alignItems = "center"; 

    resetButton.style.justifyContent = "center"; 

 

    resetButton.addEventListener("click", () => { 

      dropdowns.forEach(dropdown => { 

        const type = dropdown.getAttribute("data-type"); 

        const selected = dropdown.querySelector(".selected-value"); 

        const source = dropdown.querySelector(".dropdown-source"); 

        if (!type || !selected || !source) return; 

 

        const values = source.textContent.split(",").map(v => v.trim()).filter(Boolean); 

        const firstValue = values[0] || "XX"; 

 

        selected.textContent = firstValue; 

        window.currentSelection[type] = firstValue; 

        window.currentSelection.defaults[type] = normalizeValue(type, firstValue); 

 

        if (type === "finish") { 

          if (firstValue.toLowerCase() === "ral") { 

            ralInput.style.display = "block"; 

          } else { 

            ralInput.style.display = "none"; 

          } 

        } 

      }); 

 

      updateLumenValue(); 

      updateOrderingCode(); 

    }); 

  } 

 

  /* === Initialize Each Dropdown === */ 

  dropdowns.forEach(dropdown => { 

    const type = dropdown.getAttribute("data-type"); 

    const field = dropdown.querySelector(".dropdown-field"); 

    const selected = dropdown.querySelector(".selected-value"); 

    const source = dropdown.querySelector(".dropdown-source"); 

    const arrow = dropdown.querySelector(".dropdown-arrow"); 

 

    if (!field || !selected || !source) return; 

 

    const values = source.textContent.split(",").map(v => v.trim()).filter(v => 

      v && !["na", "n/a", "none", "0", "--"].includes(v.toLowerCase()) 

    ); 

 

    if (type === "lumen" || values.length === 0) { 

      dropdown.closest(".spec-row")?.remove(); 

      return; 

    } 

 

    selected.textContent = values[0] || "N/A"; 

    window.currentSelection[type] = values[0]; 

    window.currentSelection.defaults[type] = normalizeValue(type, values[0]); 

 

    if (values.length <= 1) { 

      dropdown.classList.add("disabled"); 

      arrow && (arrow.style.display = "none"); 

      return; 

    } 

 

    const optionsBox = document.createElement("div"); 

    optionsBox.className = "dropdown-options"; 

    dropdown.appendChild(optionsBox); 

 

    values.forEach(value => { 

      const opt = document.createElement("div"); 

      opt.className = "dropdown-option"; 

      opt.textContent = value; 

 

      opt.addEventListener("click", () => { 

        if (selected.textContent === value) return; 

 

        selected.textContent = value; 

        optionsBox.style.display = "none"; 

        dropdown.classList.remove("open"); 

 

        if (type === "finish" && value.toLowerCase() === "ral") { 

          ralInput.style.display = "block"; 

          ralInput.textContent = "Enter RAL number here"; 

          ralInput.style.color = "#999"; 

 

          ralInput.addEventListener("focus", () => { 

            if (ralInput.textContent === "Enter RAL number here") { 

              ralInput.textContent = ""; 

              ralInput.style.color = "#111"; 

            } 

          }); 

 

          ralInput.addEventListener("input", () => { 

            const typedRAL = ralInput.textContent.trim(); 

            window.currentSelection.finish = typedRAL ? "RAL" + typedRAL : "RAL"; 

            updateLumenValue(); 

            updateOrderingCode(); 

          }); 

 

          window.currentSelection.finish = "RAL"; 

        } else { 

          ralInput.style.display = "none"; 

          window.currentSelection[type] = value; 

        } 

 

        if (["watt", "cct", "cri"].includes(type)) {
          updateLumenValue();
        }
        updateOrderingCode(); 
      }); 

 

      optionsBox.appendChild(opt); 

    }); 

 

    // Arrow toggle 

    arrow?.addEventListener("click", (e) => { 

      e.stopPropagation(); 

      const isOpen = optionsBox.style.display === "block"; 

      document.querySelectorAll(".dropdown-options").forEach(opt => opt.style.display = "none"); 

      document.querySelectorAll(".dropdown-wrapper").forEach(d => d.classList.remove("open")); 

 

      if (!isOpen) { 

        optionsBox.style.display = "block"; 

        dropdown.classList.add("open"); 

      } 

    }); 

 

    // Close all dropdowns on outside click 

    document.addEventListener("click", () => { 

      optionsBox.style.display = "none"; 

      dropdown.classList.remove("open"); 

    }); 

  }); 

 

  /* === Update Lumen Value === */ 

  function updateLumenValue() {
    const { product, watt, cct, cri } = window.currentSelection;
    let match = null;
    const lumenData = Array.from(document.querySelectorAll('.lumen-cms-data'));
    for (const el of lumenData) {
      const matches =
        el.dataset.product === product &&
        el.dataset.watt === watt &&
        el.dataset.cct === cct &&
        (!el.dataset.cri || el.dataset.cri === cri);
      if (matches) {
        match = el;
        break;
      }
    }
    const lumenSelected = document.querySelector('[data-type="lumen"].selected-value, [data-type="lumen"] .selected-value');
    if (lumenSelected) {
      if (match) {
        const lumen = match.dataset.lumen || match.textContent.trim();
        lumenSelected.textContent = lumen;
        lumenSelected.style.color = "#111";
        lumenSelected.style.fontWeight = "bold";
        window.currentSelection.lumen = lumen;
      } else {
        lumenSelected.textContent = "Not Available";
        lumenSelected.style.color = "red";
        lumenSelected.style.fontWeight = "bold";
        window.currentSelection.lumen = null;
      }
    }
  }

 

  /* === Normalize Value for Code Generation === */ 

  function normalizeValue(type, val) { 

    val = val?.toLowerCase(); 

    if (!val) return "XX"; 

    if (type === "cct") return val.replace("k", "").substring(0, 2); 

    if (type === "beam") return val.replace("°", ""); 

    if (type === "ip-rating") return val.replace("ip", ""); 

    if (type === "finish") { 

      if (val.startsWith("ral")) return "RAL" + val.replace("ral", "").replace(/\s+/g, ""); 

      const map = { white: "WH", black: "BK", grey: "GR", gray: "GR", silver: "SV", "satin-nickel": "SN" }; 

      return map[val] || val.toUpperCase(); 

    } 

    return val; 

  } 

 

  /* === Get Normalized Value for Each Field === */ 

  function getTextValue(type) { 

    const el = document.querySelector(`.dropdown-wrapper[data-type="${type}"] .selected-value`); 

    if (!el) return null; 

    if (type === "finish" && window.currentSelection.finish?.startsWith("RAL")) { 

      return window.currentSelection.finish; 

    } 

    return normalizeValue(type, el.textContent.trim()); 

  } 

 

  /* === Update Ordering Code Display === */ 

  function updateOrderingCode() { 

    // Get current product code dynamically from CMS
    const baseCode = getCurrentProductCode(); 

    const keys = ["watt", "ip-rating", "beam", "cct", "cri", "finish"]; 

    const labels = ["Wattage", "IP Rating", "Beam", "CCT", "CRI", "Finish"]; 

    const codeEl = document.querySelector(".ordering-code-value"); 

 

    if (codeEl) { 

      const parts = keys.map((key, i) => { 

        const val = getTextValue(key) || "XX"; 

        const isDefault = val === window.currentSelection.defaults?.[key]; 

        const color = isDefault ? "#999" : "#C0392B"; 

        return `<span title="${labels[i]}" style="color:${color}; font-weight: bold;">${val}</span>`; 

      }); 

 

      codeEl.innerHTML = `<span title="Product Code" style="color: #111; font-weight: bold;">${baseCode}</span>.${parts.join(".")}`; 

    } 

  } 

 

  // Initial update after load 

  setTimeout(() => { 

    updateLumenValue(); 

    updateOrderingCode(); 

    updateProductCodeInjection();
    updateGeneratedCodeInjection();

  }, 300); 

 

}); 

 

 

 

document.addEventListener('DOMContentLoaded', function () { 

 

  /* === Get Product Code Based on Current Selection === */ 

  function getProductCode() { 

    const selection = window.currentSelection || {}; 

    // Get current product code dynamically from CMS
    const code = getCurrentProductCode(); 

    const watt = selection.watt || '12'; 

    const ip = selection.ip || '65'; 

    const beam = selection.beam || '30'; 

 

    const cctMap = { '2700K': '27', '3000K': '30', '4000K': '40', '5000K': '50' }; 

    const finishMap = { 'White': 'WH', 'Black': 'BK', 'Grey': 'GR', 'Silver': 'SV' }; 

 

    let cct = selection.cct || '30'; 

    let cri = selection.cri || '80'; 

    let finish = selection.finish || 'BK'; 

 

    cct = cctMap[cct] || cct.replace('K', ''); 

    finish = finishMap[finish] || finish; 

 

    return `${code}.${watt}.${ip}.${beam}.${cct}.${cri}.${finish}`; 

  } 

 

  /* === Inject PDF Datasheet URL into First Row === */ 

  const datasheetCode = getProductCode(); 

  const datasheetUrl = `https://duva-lighting.com/pdfs/${datasheetCode}.pdf`; 

 

  const firstRow = document.querySelector('.download-row'); 

  if (firstRow) { 

    const fileDiv = firstRow.querySelector('[data-file]'); 

    if (fileDiv) { 

      fileDiv.setAttribute('data-file', datasheetUrl); 

      firstRow.setAttribute('data-type', 'pdf'); 

    } 

  } 

 

  function updateDatasheetRow() { 

    const code = getProductCode(); 

    const newUrl = `https://duva-lighting.com/pdfs/${code}.pdf`; 

    const row = document.querySelector('.download-row'); 

    const fileDiv = row?.querySelector('[data-file]'); 

    if (fileDiv) { 

      fileDiv.setAttribute('data-file', newUrl); 

    } 

  } 

 

  /* === Watch for Selection Changes and Update File URL === */ 

  document.querySelectorAll('.selected-value').forEach(item => { 

    item.addEventListener('DOMSubtreeModified', () => { 

      updateDatasheetRow(); 

 

      const selection = window.currentSelection || {}; 

      const row = item.closest('.spec-row'); 

      if (!row) return; 

 

      const type = row.getAttribute('data-type'); 

      const value = item.textContent.trim(); 

 

      if (type) { 

        selection[type] = value; 

        window.currentSelection = selection; 

      } 

    }); 

  }); 

 

  /* === Generate PDF Datasheet Dynamically === */ 

  // This function is now handled by html2pdf.generatePDF()

 

  /* === Hide Rows with Missing Files === */ 

  document.querySelectorAll('.download-row').forEach(row => { 

    const fileDiv = row.querySelector('[data-file]'); 

    const fileUrl = fileDiv?.getAttribute('data-file'); 

    const divider = row.nextElementSibling?.classList.contains('download-divider') ? row.nextElementSibling : null; 

 

    if (!fileUrl || fileUrl === 'null' || fileUrl === '0') { 

      row.style.display = 'none'; 

      if (divider) divider.style.display = 'none'; 

    } else { 

      const fileExtension = fileUrl.split('.').pop().toLowerCase(); 

      row.setAttribute('data-type', fileExtension); 

    } 

  }); 

 

  /* === Toggle Checkbox Active Class === */ 

  document.querySelectorAll('.download-checkbox').forEach(box => { 

    box.addEventListener('click', function () { 

      this.classList.toggle('active'); 

    }); 

  }); 

 

  /* === Download Selected Files === */ 

  document.querySelector('#download-selected')?.addEventListener('click', function () { 

    const selectedBoxes = document.querySelectorAll('.download-checkbox.active'); 

    const selectedFiles = []; 

 

    selectedBoxes.forEach(box => { 

      const row = box.closest('.download-row'); 

      if (!row || row.offsetParent === null) return; 

 

      const fileDiv = row.querySelector('[data-file]'); 

      const fileUrl = fileDiv?.getAttribute('data-file'); 

      if (fileUrl) { 

        selectedFiles.push(fileUrl); 

      } 

    }); 

 

    if (selectedFiles.length === 0) { 

      alert('No files selected!'); 

      return; 

    } 

 

    selectedFiles.forEach(url => { 

      const a = document.createElement('a'); 

      a.href = url; 

      a.download = ''; 

      document.body.appendChild(a); 

      a.click(); 

      a.remove(); 

    }); 

  }); 

 

  /* === Download All Files === */ 

  document.querySelector('#download-all')?.addEventListener('click', () => { 

    document.querySelectorAll('.download-row').forEach(row => { 

      if (row.offsetParent === null) return; 

 

      const fileDiv = row.querySelector('[data-file]'); 

      const fileUrl = fileDiv?.getAttribute('data-file'); 

 

      if (fileUrl && fileUrl !== 'null' && fileUrl !== '0' && !fileUrl.includes('undefined')) { 

        const a = document.createElement('a'); 

        a.href = fileUrl; 

        a.download = ''; 

        document.body.appendChild(a); 

        a.click(); 

        a.remove(); 

      } 

    }); 

  }); 

 

  /* === Handle Arrow Download Buttons === */ 

  document.querySelectorAll('.download-arrow').forEach(icon => { 

    icon.addEventListener('click', function () { 

      const row = this.closest('.download-row'); 

      const isGenerated = row === document.querySelector('.download-row'); 

 

      if (isGenerated) { 

        return; // already handled by main export listener

      } 

 

      const fileUrl = this.getAttribute('data-file'); 

      if (fileUrl) { 

        const a = document.createElement('a'); 

        a.href = fileUrl; 

        a.download = ''; 

        document.body.appendChild(a); 

        a.click(); 

        a.remove(); 

      } 

    }); 

  }); 

 

  /* === Inject Accessories Divider (Max Width 2000px) === */ 

  const accessoriesSection = document.querySelector(".accessories-section"); 

  if (accessoriesSection) { 

    const wrapper = document.createElement("div"); 

    wrapper.style.display = "flex"; 

    wrapper.style.justifyContent = "center"; 

    wrapper.style.marginTop = "24px"; 

 

    const divider = document.createElement("div"); 

    divider.style.width = "100%"; 

    divider.style.maxWidth = "2000px"; 

    divider.style.height = "1px"; 

    divider.style.backgroundColor = "#e0e0e0"; 

 

    wrapper.appendChild(divider); 

    accessoriesSection.after(wrapper); 

  } 

 

}); 

 

 

 

  document.addEventListener("DOMContentLoaded", function () { 

    const toggle = document.querySelector(".accessories-toggle"); 

    const wrapper = document.querySelector(".accessories-wrapper"); 

    const arrow = document.querySelector(".accessories-arrow"); 

    const section = document.querySelector(".accessories-section"); 

 

    if (toggle && wrapper && arrow && section) { 

      toggle.addEventListener("click", function () { 

        const isOpen = section.classList.toggle("open"); 

        arrow.classList.toggle("rotated"); 

 

        if (isOpen) { 

          // Expand to actual scroll height 

          wrapper.style.maxHeight = wrapper.scrollHeight + "px"; 

        } else { 

          // Collapse 

          wrapper.style.maxHeight = "0px"; 

        } 

      }); 

    } 

  }); 

  // === 7. Accessories Checkbox Script === 

document.querySelectorAll('.accessory-checkbox').forEach(box => { 

  box.addEventListener('click', function () { 

    this.classList.toggle('active'); 

  }); 

}); 

// === PDF Export Logic for DUVA ===
let isExporting = false; // Guard to prevent double export
function showPDFContainer() {
  const pdfContainer = document.querySelector('#pdf-container');
  if (pdfContainer) {
    pdfContainer.classList.remove('hidden');
    pdfContainer.style.display = 'block';
    pdfContainer.style.visibility = 'visible';
    pdfContainer.style.opacity = '1';
    pdfContainer.style.position = 'relative';
    pdfContainer.style.left = '0';
    pdfContainer.style.width = '100vw';
  }
}
function hidePDFContainer() {
  const pdfContainer = document.querySelector('#pdf-container');
  if (pdfContainer) {
    pdfContainer.classList.add('hidden');
    pdfContainer.style.display = 'none';
    pdfContainer.style.visibility = 'hidden';
    pdfContainer.style.opacity = '0';
    pdfContainer.style.position = '';
    pdfContainer.style.top = '';
    pdfContainer.style.left = '';
    pdfContainer.style.width = '';
  }
}

function waitForImagesToLoad(container, callback) {
  if (!container) return callback(); // If container is null, just proceed
  const images = container.querySelectorAll('img');
  let loaded = 0;
  if (images.length === 0) return callback();
  images.forEach(img => {
    if (img.complete) {
      loaded++;
      if (loaded === images.length) callback();
    } else {
      img.onload = img.onerror = () => {
        loaded++;
        if (loaded === images.length) callback();
      };
    }
  });
}

function injectPdfOrderingCode() {
  // === Inject Generated Ordering Code into PDF ===
  const orderingCode = document.querySelector('#ordering-code-value');
  const pdfCodeTarget = document.querySelector('#pdf-container .generated-code');
  if (orderingCode && pdfCodeTarget) {
    pdfCodeTarget.textContent = orderingCode.textContent.trim();
  }
}

function injectPdfContent() {
  // === Inject Family Name - Updated for vertical layout ===
  const familyName = document.querySelector('.product-title-source');
  const pdfFamilyNameContainer = document.querySelector('#pdf-container .family-name');
  
  if (familyName && pdfFamilyNameContainer) {
    const familyText = familyName.textContent.trim();
    
    // Clear existing family name elements
    pdfFamilyNameContainer.innerHTML = '';
    
    // Create vertical family name elements based on the family name
    // For "ELDORA", we'll create vertical text elements
    const familyWords = familyText.split(' ');
    familyWords.forEach(word => {
      const verticalElement = document.createElement('div');
      verticalElement.className = 'family-name-vertical';
      verticalElement.textContent = word;
      pdfFamilyNameContainer.appendChild(verticalElement);
    });
  }

  // === Inject Product Description - Updated for Webflow template structure ===
  const desc = document.querySelector('.product-description-source');
  const pdfDesc = document.querySelector('#pdf-container .text-block-14');
  if (desc && pdfDesc) {
    pdfDesc.textContent = desc.textContent.trim();
  }

  // === Inject Feature Key / Key Features - Updated for Webflow template structure ===
  const featuresSource = document.querySelector('.product-features');
  const featuresTarget = document.querySelector('#pdf-container .key-features');
  if (featuresSource && featuresTarget) {
    featuresTarget.innerHTML = featuresSource.innerHTML;
  }
  injectPdfIcons();
  injectPdfImages();
  injectSelectedAccessories();
}

// === Dynamic Product Code Functions ===

// Get current product code dynamically from CMS
function getCurrentProductCode() {
  console.log('🔍 Searching for current product code...');
  
  // PRIORITY 1: Check window.currentSelection first (most current)
  if (window.currentSelection && window.currentSelection.product) {
    console.log('✅ Using product code from window.currentSelection:', window.currentSelection.product);
    return window.currentSelection.product;
  }
  
  // PRIORITY 2: Check for visible product code elements (not hidden)
  const visibleSelectors = [
    '.product-code-heading:not([style*="display: none"])',
    '.product-code:not([style*="display: none"])',
    '[data-product-code]:not([style*="display: none"])',
    '.product-title-source:not([style*="display: none"])',
    'h1.product-code:not([style*="display: none"])',
    '.product-title:not([style*="display: none"])'
  ];
  
  for (const selector of visibleSelectors) {
    const element = document.querySelector(selector);
    console.log(`🔍 Checking visible selector "${selector}":`, element);
    if (element && element.textContent.trim()) {
      const code = element.textContent.trim();
      console.log(`✅ Found visible product code from ${selector}:`, code);
      return code;
    }
  }
  
  // PRIORITY 3: Check for any visible element containing a product code pattern
  const allElements = document.querySelectorAll('*:not([style*="display: none"])');
  for (const element of allElements) {
    if (element.textContent && element.textContent.match(/^C\d{3,4}$/)) {
      const code = element.textContent.trim();
      console.log(`✅ Found visible product code pattern in element:`, element, 'Code:', code);
      return code;
    }
  }
  
  // PRIORITY 4: Fallback to hidden elements (last resort)
  const hiddenSelectors = [
    '#product-code',
    '.product-code-heading',
    '.product-code',
    '[data-product-code]',
    '.product-title-source'
  ];
  
  for (const selector of hiddenSelectors) {
    const element = document.querySelector(selector);
    console.log(`🔍 Checking hidden selector "${selector}":`, element);
    if (element && element.textContent.trim()) {
      const code = element.textContent.trim();
      console.log(`⚠️ Using hidden product code from ${selector}:`, code);
      return code;
    }
  }
  
  console.log('⚠️ No product code found, using fallback: CXXX');
  return 'CXXX';
}

// Get current product family from CMS
function getCurrentProductFamily() {
  // This should pull from your CMS - adjust selector as needed
  const familyElement = document.querySelector('.product-title-source');
  return familyElement ? familyElement.textContent.trim() : null;
}

function generatePDF() {
  if (isExporting) return; // Prevent double export
  isExporting = true;
  
  // --- Accessories block temporarily removed for testing ---
  // const pdfAccessories = document.querySelector('.pdf-accessories');
  // if (pdfAccessories) {
  //   pdfAccessories.innerHTML = '';
  // }
  // document.querySelectorAll('.accessory-checkbox.active').forEach(box => {
  //   const accessoryItem = box.closest('.accessory-item');
  //   if (!accessoryItem) return;
  //   const imageEl = accessoryItem.querySelector('.accessory-image img, img.accessory-image');
  //   const titleEl = accessoryItem.querySelector('.accessory-title');
  //   const descEl  = accessoryItem.querySelector('.accessory-desc');
  //   if (imageEl?.src && !imageEl.src.includes('undefined') && titleEl) {
  //     const wrapper = document.createElement('div');
  //     wrapper.className = 'accessory-item';
  //     wrapper.innerHTML = `
  //       <img src="${imageEl.src}" class="accessory-image">
  //       <div class="accessory-title">${titleEl.textContent}</div>
  //       <div class="accessory-desc">${descEl?.textContent || ''}</div>
  //     `;
  //     pdfAccessories.appendChild(wrapper);
  //   }
  // });
  // --- End accessories block ---
  // 3. Show the PDF container (off-screen but rendered)
  showPDFContainer();
  // 4. Prepare PDF export
  const element = document.querySelector('#pdf-container');
  
  // Get the generated code for filename
  const orderingCodeElement = document.querySelector('.ordering-code-value');
  let code = 'file'; // default fallback
  
  if (orderingCodeElement) {
    // Get the plain text content (without HTML styling)
    const plainText = orderingCodeElement.textContent || orderingCodeElement.innerText;
    code = plainText.trim();
    
    // Sanitize filename for file system compatibility
    code = code.replace(/[<>:"/\\|?*]/g, '_'); // Replace invalid characters
    code = code.replace(/\s+/g, '_'); // Replace spaces with underscores
    code = code.replace(/\.+/g, '.'); // Replace multiple dots with single dot
    
    console.log('📄 PDF filename will be:', code);
  } else {
    console.log('⚠️ Ordering code element not found, using default filename');
  }
  
  if (!element) {
    hidePDFContainer();
    alert('PDF container not found!');
    isExporting = false;
    return;
  }
  // === Inject Product Image Dynamically ===
  const imageElement = document.querySelector('#product-image img'); // or your actual main image selector
  const pdfImageContainer = document.querySelector('#pdf-container .main-product-pdf-img');
  if (imageElement && pdfImageContainer) {
    const imageUrl = imageElement.src;
    pdfImageContainer.innerHTML = `<img src="${imageUrl}" style="max-width: 100%; height: auto;">`;
  }
  // === Inject Product, Dimension, and Photometric Images into PDF ===
  injectPdfImages();
  // === Inject Generated Ordering Code into PDF ===
  injectPdfOrderingCode();
  // === Inject Product Code into PDF ===
  updateProductCodeInjection();
  // === Inject Generated Code into PDF ===
  updateGeneratedCodeInjection();
  // === Update Specifications Table ===
  updateSpecsTable();
  // === Inject Family Name, Subtitle, Description, and Features into PDF ===
  injectPdfContent();
  // 5. Export PDF
  waitForImagesToLoad(document.querySelector('#pdf-container .header-right-wrapper'), function() {
    injectPdfIcons(); // Inject icons into PDF container
    html2pdf()
      .from(element)
      .set({
        margin: 0,
        filename: `${code}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          width: 794,
          height: 1123,
          useCORS: true
        },
        jsPDF: { 
          unit: 'px', 
          format: [794, 1123], 
          orientation: 'portrait' 
        }
      })
      .save()
      .then(() => {
        // 6. Cleanup after export
        // if (pdfAccessories) {
        //   pdfAccessories.innerHTML = '';
        // }
        hidePDFContainer();
        isExporting = false;
      })
      .catch(() => {
        isExporting = false;
      });
  });
}
// === PDF Download Button Binding by Class ===
document.addEventListener("DOMContentLoaded", function () {
  const downloadBtn = document.querySelector(".download-arrow");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", function () {
      generatePDF(); // Make sure this function exists
    });
  } else {
    console.warn("Download arrow button not found!");
  }
});
// === End PDF Download Button Binding ===

// === Utility: Ensure Product Code is Set from DOM ===
function ensureProductCode() {
  const code = document.querySelector("#product-code-heading")?.textContent.trim();
  console.log("ensureProductCode: found code =", code);
  if (code) {
    window.currentSelection.product = code;
  }
  console.log("window.currentSelection.product =", window.currentSelection.product);
}

// Removed duplicate icon injection - using injectPdfIcons() function instead

function updateSpecsTable() {
  // Get current dropdown values from the DOM
  const getDropdownValue = (type) => {
    const dropdown = document.querySelector(`.dropdown-wrapper[data-type="${type}"] .selected-value`);
    return dropdown ? dropdown.textContent.trim() : null;
  };

  // Get current values from dropdowns or use defaults
  const currentValues = {
    watt: getDropdownValue('watt') || window.currentSelection?.watt || '12',
    lumen: window.currentSelection?.lumen || '1900',
    cct: getDropdownValue('cct') || window.currentSelection?.cct || '3000K',
    cri: getDropdownValue('cri') || window.currentSelection?.cri || '80',
    beam: getDropdownValue('beam') || window.currentSelection?.beam || '24',
    'ip-rating': getDropdownValue('ip-rating') || window.currentSelection?.['ip-rating'] || '65',
    finish: getDropdownValue('finish') || window.currentSelection?.finish || 'White'
  };

  console.log('📊 Current specification values:', currentValues);

  // Update both the main page specs and PDF container specs
  const selectors = [
    '.wattage .text-block-16',
    '#pdf-container .wattage .text-block-16'
  ];

  // Wattage
  selectors.forEach(selector => {
    const element = document.querySelector(selector);
    if (element) {
      const wattValue = currentValues.watt;
      element.innerHTML = `Wattage<br>${wattValue}${wattValue.includes('W') ? '' : 'W'}`;
    }
  });

  // Lumen
  selectors.forEach(selector => {
    const element = document.querySelector(selector.replace('wattage', 'lumen'));
    if (element) {
      const lumenValue = currentValues.lumen;
      element.innerHTML = `Lumen<br>${lumenValue}${lumenValue.includes('lm') ? '' : 'lm'}`;
    }
  });

  // CCT
  selectors.forEach(selector => {
    const element = document.querySelector(selector.replace('wattage', 'cct'));
    if (element) {
      element.innerHTML = `CCT<br>${currentValues.cct}`;
    }
  });

  // CRI
  selectors.forEach(selector => {
    const element = document.querySelector(selector.replace('wattage', 'cri'));
    if (element) {
      const criValue = currentValues.cri;
      element.innerHTML = `CRI<br>&gt;${criValue}`;
    }
  });

  // Beam
  selectors.forEach(selector => {
    const element = document.querySelector(selector.replace('wattage', 'beam-angle'));
    if (element) {
      const beamValue = currentValues.beam;
      element.innerHTML = `Beam<br>${beamValue}${beamValue.includes('°') ? '' : '°'}`;
    }
  });

  // IP Rating
  selectors.forEach(selector => {
    const element = document.querySelector(selector.replace('wattage', 'ip-rating'));
    if (element) {
      element.innerHTML = `IP<br>${currentValues['ip-rating']}`;
    }
  });

  // Finish
  selectors.forEach(selector => {
    const element = document.querySelector(selector.replace('wattage', 'finish-volor'));
    if (element) {
      let finishValue = currentValues.finish;
      if (finishValue && finishValue.toLowerCase().startsWith('ral')) {
        finishValue = 'RAL ' + finishValue.replace(/ral/i, '').trim();
      }
      element.innerHTML = `Finish<br>${finishValue}`;
    }
  });

  console.log('✅ Specifications table updated with current values');
}

// Call updateSpecsTable at the end of updateLumenValue and updateOrderingCode
const origUpdateLumenValue = typeof updateLumenValue === 'function' ? updateLumenValue : null;
window.updateLumenValue = function() {
  if (origUpdateLumenValue) origUpdateLumenValue.apply(this, arguments);
  updateSpecsTable();
  updateProductCodeInjection();
  updateGeneratedCodeInjection();
  updatePdfImages();
};
const origUpdateOrderingCode = typeof updateOrderingCode === 'function' ? updateOrderingCode : null;
window.updateOrderingCode = function() {
  if (origUpdateOrderingCode) origUpdateOrderingCode.apply(this, arguments);
  updateSpecsTable();
  updateProductCodeInjection();
  updateGeneratedCodeInjection();
  updatePdfImages();
};

// === Update PDF Images Function ===
function updatePdfImages() {
  // This function can be called to update images when CMS data changes
  // For now, we'll just call the main injection function
  injectPdfImages();
}

// === Product Code Injection Function ===
function updateProductCodeInjection() {
  // Get the current CMS product code (dynamically updated)
  const cmsProductCode = document.querySelector("#product-code-heading")?.textContent.trim();
  const codeTarget = document.querySelector(".product-code");
  
  if (cmsProductCode && codeTarget) {
    codeTarget.innerHTML = `<span style='color: #C0392B !important;'>${cmsProductCode}</span>`;
    console.log("Product code injected from CMS:", cmsProductCode);
  } else if (codeTarget) {
    // Fallback to static source if CMS element not found
    const codeSource = document.getElementById("product-code");
    if (codeSource) {
      codeTarget.innerHTML = `<span style='color: #C0392B !important;'>${codeSource.textContent}</span>`;
      console.log("Product code injected from static source:", codeSource.textContent);
    }
  }
}

// === Generated Code Injection Function ===
function updateGeneratedCodeInjection() {
  // Get the current dynamically generated ordering code
  const orderingCodeElement = document.querySelector(".ordering-code-value");
  const genTarget = document.querySelector(".generated-code");
  
  if (orderingCodeElement && genTarget) {
    // Get the plain text content (without HTML styling)
    const plainText = orderingCodeElement.textContent || orderingCodeElement.innerText;
    genTarget.textContent = plainText;
    console.log("Generated code injected from dynamic source:", plainText);
  } else if (genTarget) {
    // Fallback to static source if dynamic element not found
    const genSource = document.getElementById("ordering-code-value");
    if (genSource) {
      genTarget.textContent = genSource.textContent;
      console.log("Generated code injected from static source:", genSource.textContent);
    }
  }
}

function updateAccessoriesSectionVisibility() {
  // Find all accessories sections
  const accessoriesSections = document.querySelectorAll('.accessories-pdf-section');
  // Find all selected accessories (customize selector as needed)
  const selectedAccessories = document.querySelectorAll('.accessory-checkbox.active, .accessory-selected, .accessory-item.selected');
  // If none selected, hide all accessories sections
  if (selectedAccessories.length === 0) {
    accessoriesSections.forEach(section => section.style.display = 'none');
  } else {
    accessoriesSections.forEach(section => section.style.display = '');
  }
}

// Call this after any accessory selection change
// Example: document.querySelectorAll('.accessory-checkbox').forEach(cb => cb.addEventListener('change', updateAccessoriesSectionVisibility));
// Or call after updating accessories dynamically

document.addEventListener('DOMContentLoaded', function() {
  updateAccessoriesSectionVisibility();
  // If you have accessory checkboxes, add listeners:
  document.querySelectorAll('.accessory-checkbox').forEach(cb => {
    cb.addEventListener('change', updateAccessoriesSectionVisibility);
  });
  
  // Set up observer to refresh ordering code when content changes
  setupOrderingCodeObserver();
});

// Manual refresh function for ordering code
function refreshOrderingCode() {
  console.log('🔄 Manually refreshing ordering code...');
  setTimeout(() => {
    updateOrderingCode();
    updateProductCodeInjection();
    updateGeneratedCodeInjection();
  }, 100);
}

// Global function that can be called from Webflow
window.refreshProductCode = function() {
  console.log('🌐 Global refresh called from Webflow');
  refreshOrderingCode();
};

// Debug function to test product code detection
window.debugProductCode = function() {
  console.log('🔍 Debugging product code detection...');
  console.log('Current product code:', getCurrentProductCode());
  console.log('Window currentSelection:', window.currentSelection);
  console.log('All elements with product code pattern:');
  document.querySelectorAll('*').forEach(el => {
    if (el.textContent && el.textContent.match(/^C\d{3,4}$/)) {
      console.log('Found:', el.tagName, el.className, el.textContent.trim());
    }
  });
};

// Force refresh function for testing
window.forceRefreshOrderingCode = function() {
  console.log('🔄 Force refreshing ordering code...');
  updateOrderingCode();
  updateProductCodeInjection();
  updateGeneratedCodeInjection();
};

// Test function to simulate product change
window.testProductChange = function(newProductCode) {
  console.log('🧪 Testing product change to:', newProductCode);
  
  // Find and update a product code element
  const selectors = ['#product-code', '.product-code-heading', '.product-code', '.product-title-source'];
  let updated = false;
  
  for (const selector of selectors) {
    const element = document.querySelector(selector);
    if (element) {
      element.textContent = newProductCode;
      console.log(`✅ Updated ${selector} to ${newProductCode}`);
      updated = true;
      break;
    }
  }
  
  if (!updated) {
    console.log('⚠️ No product code element found to update');
  }
  
  // Force refresh
  setTimeout(() => {
    forceRefreshOrderingCode();
  }, 100);
};

// === Related Items Mouse Wheel Scroll Logic ===
document.addEventListener("DOMContentLoaded", function () {
  const scrollContainer = document.querySelector(".collection-list-6");

  if (scrollContainer) {
    console.log('✅ Related items mouse wheel scroll logic initialized');
    
    // Smooth mouse wheel scrolling
    scrollContainer.addEventListener('wheel', function(e) {
      e.preventDefault(); // Prevent default vertical scrolling
      
      // Get scroll direction and amount
      const delta = e.deltaY || e.deltaX;
      const scrollSpeed = 50; // Adjust this value to control scroll sensitivity
      
      // Smooth scroll horizontally
      scrollContainer.scrollBy({
        left: delta > 0 ? scrollSpeed : -scrollSpeed,
        behavior: 'smooth'
      });
      
      console.log('🔄 Mouse wheel scrolling:', delta > 0 ? 'right' : 'left');
    }, { passive: false }); // Required for preventDefault to work
    
    // Add touch/swipe support for mobile
    let isScrolling = false;
    let startX = 0;
    let scrollLeft = 0;
    
    scrollContainer.addEventListener('touchstart', function(e) {
      isScrolling = true;
      startX = e.touches[0].pageX - scrollContainer.offsetLeft;
      scrollLeft = scrollContainer.scrollLeft;
    });
    
    scrollContainer.addEventListener('touchmove', function(e) {
      if (!isScrolling) return;
      e.preventDefault();
      const x = e.touches[0].pageX - scrollContainer.offsetLeft;
      const walk = (x - startX) * 2; // Scroll speed multiplier
      scrollContainer.scrollLeft = scrollLeft - walk;
    });
    
    scrollContainer.addEventListener('touchend', function() {
      isScrolling = false;
    });
    
  } else {
    console.log('⚠️ Related items scroll container not found');
  }
});

// Observer to refresh ordering code when page content changes
function setupOrderingCodeObserver() {
  console.log('🔧 Setting up ordering code observer...');
  
  // Watch for changes in the product code element
  const selectors = ['#product-code', '.product-code-heading', '.product-code', '.product-title-source'];
  let productCodeElement = null;
  
  for (const selector of selectors) {
    productCodeElement = document.querySelector(selector);
    if (productCodeElement) {
      console.log(`✅ Found element to observe: ${selector}`);
      break;
    }
  }
  
  if (productCodeElement) {
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList' || mutation.type === 'characterData') {
          console.log('🔄 Product code changed, refreshing ordering code...');
          setTimeout(() => {
            updateOrderingCode();
            updateProductCodeInjection();
            updateGeneratedCodeInjection();
          }, 100);
        }
      });
    });
    
    observer.observe(productCodeElement, {
      childList: true,
      characterData: true,
      subtree: true
    });
    
    console.log('✅ Ordering code observer set up for:', productCodeElement);
  } else {
    console.log('⚠️ No product code element found for observer, setting up periodic check');
    // Set up periodic check as backup
    setInterval(() => {
      const currentCode = getCurrentProductCode();
      if (currentCode !== 'CXXX' && currentCode !== window.lastProductCode) {
        console.log('🔄 Product code changed via periodic check:', currentCode);
        window.lastProductCode = currentCode;
        updateOrderingCode();
        updateProductCodeInjection();
        updateGeneratedCodeInjection();
      }
    }, 2000); // Check every 2 seconds
  }
  
  // Also watch for URL changes (for SPA navigation)
  let lastUrl = location.href;
  new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      console.log('🔄 URL changed, refreshing ordering code...');
      setTimeout(() => {
        updateOrderingCode();
        updateProductCodeInjection();
        updateGeneratedCodeInjection();
      }, 500);
    }
  }).observe(document, {subtree: true, childList: true});
}

// === Inject PDF Icons from CMS to #pdf-container ===
function injectPdfIcons() {
  // Find all CMS icons for this product (from the main page, not PDF container)
  const cmsIcons = document.querySelectorAll('#pdf-icons .pdf-cms-icon');
  const targetContainer = document.querySelector('#pdf-container .header-icons-wrapper');

  if (!cmsIcons.length) {
    console.log('⚠️ No CMS icons found in #pdf-icons for this product.');
    return;
  }
  if (!targetContainer) {
    console.log('⚠️ PDF icon target container not found.');
    return;
  }

  // Clear existing icons
  targetContainer.innerHTML = '';

  // Inject all icons into the icons wrapper
  cmsIcons.forEach((icon, i) => {
    const clone = icon.cloneNode(true);
    clone.removeAttribute('id');
    targetContainer.appendChild(clone);
    console.log(`✅ Injected icon #${i+1}:`, clone);
  });

  console.log(`✅ Injected ${cmsIcons.length} icons into PDF container.`);
}

// === Inject Product, Dimension, and Photometric Images into PDF ===
function injectPdfImages() {
  // Product Image
  const productSource = document.querySelector('#main-lightbox-trigger.product-image');
  const pdfImageContainer = document.querySelector('#pdf-container .main-product-pdf-img');
  if (productSource && pdfImageContainer) {
    pdfImageContainer.innerHTML = `<img src="${productSource.src}" style="max-width: 100%; height: auto; width: 180px; height: 180px; object-fit: contain;">`;
    console.log('✅ Product image injected:', productSource.src);
  } else {
    console.log('⚠️ Product image source or container not found');
  }

  // Dimension Image
  const dimensionSource = document.querySelector('#diagram.dimension');
  const pdfDimContainer = document.querySelector('#pdf-container .diagram-pdf-img');
  if (dimensionSource && pdfDimContainer) {
    pdfDimContainer.innerHTML = `<img src="${dimensionSource.src}" style="max-width: 100%; height: auto; width: 180px; height: 180px; object-fit: contain;">`;
    console.log('✅ Dimension image injected:', dimensionSource.src);
  } else {
    console.log('⚠️ Dimension image source or container not found');
  }

  // Photometric Image
  const photometricSource = document.querySelector('#Photometric.photometric');
  const pdfPhotoContainer = document.querySelector('#pdf-container .photometric-pdf-img');
  if (photometricSource && pdfPhotoContainer) {
    pdfPhotoContainer.innerHTML = `<img src="${photometricSource.src}" style="max-width: 100%; height: auto; width: 180px; height: 180px; object-fit: contain;">`;
    console.log('✅ Photometric image injected:', photometricSource.src);
  } else {
    console.log('⚠️ Photometric image source or container not found');
  }
}

function styleSpecLabelsAndValues() {
  const specBlocks = document.querySelectorAll('#pdf-container .specifications-full-width .text-block-16');
  specBlocks.forEach(block => {
    // Split by <br> or line break
    const html = block.innerHTML.trim();
    const parts = html.split(/<br\s*\/?>(.*)/i);
    if (parts.length >= 2) {
      const label = parts[0].replace(/<[^>]+>/g, '').trim();
      const value = parts[1].replace(/<[^>]+>/g, '').trim();
      block.innerHTML = `<span class='label'>${label}</span><br><span class='value'>${value}</span>`;
    }
  });
}
// Call this after PDF content is injected
if (typeof injectPdfContent === 'function') {
  const originalInjectPdfContent = injectPdfContent;
  injectPdfContent = function() {
    originalInjectPdfContent.apply(this, arguments);
    styleSpecLabelsAndValues();
  };
}

// === Accessory Injection for PDF ===
function injectSelectedAccessories() {
  // Find the PDF accessories container
  const pdfAccessoriesContainer = document.querySelector('#pdf-container .accessories-pdf-section');
  if (!pdfAccessoriesContainer) {
    console.log('⚠️ PDF accessories container not found');
    return;
  }

  // Find all selected accessories (checkboxes that are active/checked)
  const selectedAccessories = document.querySelectorAll('.accessory-checkbox.active, .accessory-checkbox.checked, .accessory-checkbox[data-selected="true"]');
  
  console.log('🔍 Found selected accessories:', selectedAccessories.length);
  selectedAccessories.forEach((acc, i) => {
    console.log(`  ${i + 1}. Checkbox:`, acc);
    console.log(`     Classes:`, acc.className);
    console.log(`     Parent item:`, acc.closest('.accessory-item'));
  });
  
  if (selectedAccessories.length === 0) {
    // Hide accessories section if none selected
    pdfAccessoriesContainer.style.display = 'none';
    console.log('ℹ️ No accessories selected, hiding accessories section');
    return;
  }

  // Show accessories section
  pdfAccessoriesContainer.style.display = 'block';
  
  // Clear existing accessories in PDF
  const existingAccessories = pdfAccessoriesContainer.querySelectorAll('.accessory-item');
  console.log('🧹 Clearing existing accessories:', existingAccessories.length);
  existingAccessories.forEach(item => item.remove());

  // Inject each selected accessory
  selectedAccessories.forEach((checkbox, index) => {
    const accessoryItem = checkbox.closest('.accessory-item');
    if (!accessoryItem) {
      console.log(`⚠️ No accessory item found for checkbox ${index + 1}`);
      return;
    }

    // Collect accessory data
    const code = accessoryItem.querySelector('.acc-code')?.textContent?.trim() || '';
    const title = accessoryItem.querySelector('.acc-title')?.textContent?.trim() || '';
    const description = accessoryItem.querySelector('.acc-description')?.textContent?.trim() || '';
    
    console.log(`📋 Accessory ${index + 1} data:`, { code, title, description });
    
    // Get image - try multiple selectors
    const image = accessoryItem.querySelector('.accessory-image .acc-img, .accessory-image img, .acc-img');
    const imageSrc = image?.src || image?.getAttribute('src') || '';
    
    console.log(`🔍 Accessory ${index + 1} image src:`, imageSrc);

    // Create accessory HTML for PDF
    const accessoryHTML = `
      <div class="accessory-item">
        <div class="accessory-image">
          ${imageSrc ? `<img src="${imageSrc}" alt="${title}" style="width: 80px; height: 60px; object-fit: contain; border: 1px solid #ddd; border-radius: 4px; display: block;">` : ''}
        </div>
        <div class="accessory-details">
          <div class="accessory-code">${code}</div>
          <div class="accessory-title">${title}</div>
          <div class="accessory-description">${description}</div>
        </div>
      </div>
    `;

    // Add to PDF container
    pdfAccessoriesContainer.insertAdjacentHTML('beforeend', accessoryHTML);
    console.log(`✅ Injected accessory ${index + 1}: ${title}`);
  });

  console.log(`✅ Total accessories injected: ${selectedAccessories.length}`);
}

// === Scroll-triggered Fade-in Animations ===
function initializeScrollAnimations() {
  console.log('✨ Initializing scroll animations...');
  
  // Create a single observer for all sections
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        console.log(`🎬 ${entry.target.className} fade-in triggered`);
      }
    });
  }, {
    threshold: 0.3, // Trigger when 30% of section is visible
    rootMargin: '0px 0px -50px 0px' // Trigger slightly before section comes into view
  });
  
  // Observe Related Items section
  const relatedSection = document.querySelector('.related-section');
  if (relatedSection) {
    observer.observe(relatedSection);
    console.log('✅ Related section observer set up');
  }
  
  // Observe Gallery section
  const gallerySection = document.querySelector('.gallery-section');
  if (gallerySection) {
    observer.observe(gallerySection);
    console.log('✅ Gallery section observer set up');
  }
  
  // Enhanced accessories dropdown animation
  const accessoriesToggle = document.querySelector('.accessories-toggle');
  if (accessoriesToggle) {
    accessoriesToggle.addEventListener('click', function() {
      const accessoriesSection = this.closest('.accessories-section');
      const accessoriesItems = accessoriesSection.querySelectorAll('.accessories-item');
      
      // Add staggered animation delays to accessories items
      accessoriesItems.forEach((item, index) => {
        item.style.setProperty('--item-index', index);
      });
      
      console.log('🎬 Accessories dropdown animation triggered');
    });
  }
}

// === Smooth Scroll to Related Section ===
function scrollToRelatedSection() {
  const relatedSection = document.querySelector('.related-section');
  if (relatedSection) {
    relatedSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    console.log('📜 Smooth scrolling to related section');
  }
}

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  initializeScrollAnimations();
  
  // Add smooth scroll button if needed (optional)
  const scrollToRelatedBtn = document.querySelector('.scroll-to-related');
  if (scrollToRelatedBtn) {
    scrollToRelatedBtn.addEventListener('click', scrollToRelatedSection);
  }
});

// === Auto-scroll Fullscreen Image Gallery ===
function initializeGalleryAutoScroll() {
  console.log('🎠 Initializing gallery auto-scroll...');
  
  const gallery = document.querySelector('.gallery-section-cms');
  
  if (!gallery) {
    console.log('⚠️ Gallery section not found');
    return;
  }

  console.log('📏 Gallery found:', gallery);
  console.log('📏 Gallery scrollWidth:', gallery.scrollWidth);
  console.log('📏 Gallery clientWidth:', gallery.clientWidth);
  
  // Check for images in the gallery
  const images = gallery.querySelectorAll('img');
  console.log('🖼️ Number of images found:', images.length);
  
  // Additional check: if no images found, hide gallery section
  if (images.length === 0) {
    console.log('⚠️ No images found in gallery - hiding gallery section');
    if (gallerySection) {
      gallerySection.style.display = 'none';
      gallerySection.style.visibility = 'hidden';
      gallerySection.style.opacity = '0';
      gallerySection.style.height = '0';
      gallerySection.style.overflow = 'hidden';
    }
    return; // Exit the function early
  }
  
  images.forEach((img, index) => {
    console.log(`🖼️ Image ${index + 1}:`, {
      src: img.src,
      loaded: img.complete,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      offsetWidth: img.offsetWidth,
      offsetHeight: img.offsetHeight,
      style: {
        display: img.style.display,
        visibility: img.style.visibility,
        opacity: img.style.opacity
      }
    });
  });
  
  // Check for collection items
  const collectionItems = gallery.querySelectorAll('.w-dyn-item');
  console.log('📦 Number of collection items:', collectionItems.length);
  
  // Check if gallery has any images and hide section if empty
  const gallerySection = document.querySelector('.gallery-section');
  if (collectionItems.length === 0) {
    console.log('⚠️ No images found in gallery - hiding gallery section');
    if (gallerySection) {
      gallerySection.style.display = 'none';
      gallerySection.style.visibility = 'hidden';
      gallerySection.style.opacity = '0';
      gallerySection.style.height = '0';
      gallerySection.style.overflow = 'hidden';
    }
    return; // Exit the function early
  } else {
    console.log(`✅ Gallery has ${collectionItems.length} images - showing gallery section`);
    if (gallerySection) {
      gallerySection.style.display = 'block';
      gallerySection.style.visibility = 'visible';
      gallerySection.style.opacity = '1';
      gallerySection.style.height = 'auto';
      gallerySection.style.overflow = 'visible';
    }
  }
  
  // Debug collection item dimensions
  collectionItems.forEach((item, index) => {
    const rect = item.getBoundingClientRect();
    console.log(`📦 Item ${index + 1}:`, {
      width: rect.width,
      height: rect.height,
      left: rect.left,
      top: rect.top,
      offsetWidth: item.offsetWidth,
      clientWidth: item.clientWidth
    });
  });
  
  // Check gallery container dimensions
  const galleryRect = gallery.getBoundingClientRect();
  console.log('📏 Gallery container dimensions:', {
    width: galleryRect.width,
    height: galleryRect.height,
    scrollWidth: gallery.scrollWidth,
    clientWidth: gallery.clientWidth
  });

  let scrollInterval;
  let isAutoScrolling = true;
  const scrollSpeed = 5000; // time between slides (ms)

  function scrollToNext() {
    if (!gallery) return;
    
    const currentScroll = gallery.scrollLeft;
    const viewportWidth = window.innerWidth;
    const maxScroll = gallery.scrollWidth - viewportWidth;
    
    console.log(`🔄 Current scroll: ${currentScroll}px, Max scroll: ${maxScroll}px`);
    
    // Check if we're at the end
    const atEnd = currentScroll >= maxScroll - 10;
    
    if (atEnd) {
      // Loop back to the beginning
      gallery.scrollTo({
        left: 0,
        behavior: "smooth"
      });
      console.log('🔄 Looping back to start');
    } else {
      // Scroll to next full image
      gallery.scrollTo({
        left: currentScroll + viewportWidth,
        behavior: "smooth"
      });
      console.log(`🔄 Scrolling to: ${currentScroll + viewportWidth}px`);
    }
  }

  function scrollToPrevious() {
    if (!gallery) return;
    
    const currentScroll = gallery.scrollLeft;
    const viewportWidth = window.innerWidth;
    
    console.log(`🔄 Scrolling to previous image`);
    
    // Check if we're at the beginning
    if (currentScroll <= 10) {
      // Loop to the end
      const maxScroll = gallery.scrollWidth - viewportWidth;
      gallery.scrollTo({
        left: maxScroll,
        behavior: "smooth"
      });
      console.log('🔄 Looping to end');
    } else {
      // Scroll to previous full image
      gallery.scrollTo({
        left: currentScroll - viewportWidth,
        behavior: "smooth"
      });
      console.log(`🔄 Scrolling to: ${currentScroll - viewportWidth}px`);
    }
  }

  function startScrolling() {
    if (scrollInterval) {
      clearInterval(scrollInterval);
    }
    scrollInterval = setInterval(scrollToNext, scrollSpeed);
    isAutoScrolling = true;
    console.log('▶️ Auto-scroll started');
  }

  function stopScrolling() {
    if (scrollInterval) {
      clearInterval(scrollInterval);
      scrollInterval = null;
      isAutoScrolling = false;
      console.log('⏸️ Auto-scroll paused');
    }
  }

  // Mouse wheel scroll handler
  function handleWheelScroll(event) {
    // Always handle wheel scroll when hovering (ignore auto-scroll state)
    // Prevent default scroll behavior for the entire page
    event.preventDefault();
    event.stopPropagation();
    
    // Determine scroll direction
    if (event.deltaY > 0) {
      // Scroll down/right - go to next image
      scrollToNext();
    } else {
      // Scroll up/left - go to previous image
      scrollToPrevious();
    }
    
    // Return false to prevent any further scroll events
    return false;
  }

  // Add mouse wheel event listener (always active)
  gallery.addEventListener('wheel', handleWheelScroll, { passive: false });
  
  console.log('🎯 Mouse wheel navigation always active');
  
  // Add hover pause functionality
  gallery.addEventListener('mouseenter', stopScrolling);
  gallery.addEventListener('mouseleave', startScrolling);
  
  console.log('⏸️ Hover pause functionality enabled');
  
  // Start auto-scrolling after a short delay
  setTimeout(() => {
    startScrolling();
  }, 2000); // 2 second delay to let everything load properly
  
  // Force scroll to first image to ensure it's visible (no auto-scroll for testing)
  setTimeout(() => {
    gallery.scrollTo({
      left: 0,
      behavior: "instant"
    });
    console.log('📍 Forced scroll to first image');
    
    // Check scroll position after forcing
    console.log('📍 Gallery scroll position after reset:', gallery.scrollLeft);
    
    // Check if first item is visible
    if (collectionItems.length > 0) {
      const firstItem = collectionItems[0];
      const firstItemRect = firstItem.getBoundingClientRect();
      const galleryRect = gallery.getBoundingClientRect();
      
      console.log('📍 First item visibility check:', {
        firstItemLeft: firstItemRect.left,
        galleryLeft: galleryRect.left,
        isVisible: firstItemRect.left >= galleryRect.left && firstItemRect.right <= galleryRect.right
      });
    }
  }, 500);
  
  console.log('✅ Gallery initialized with auto-scroll enabled');
  console.log('💡 Auto-scroll starts after 2 seconds, mouse wheel always available');
}

// Initialize gallery auto-scroll when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  initializeGalleryAutoScroll();
});
