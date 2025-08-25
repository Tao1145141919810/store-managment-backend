class StoreManager {
    constructor() {
        this.items = this.loadFromStorage();
        this.currentEditId = null;
        this.initializeEventListeners();
        this.updateDisplay();
    }

    // Load data from localStorage
    loadFromStorage() {
        const stored = localStorage.getItem('storeInventory');
        return stored ? JSON.parse(stored) : [];
    }

    // Save data to localStorage
    saveToStorage() {
        localStorage.setItem('storeInventory', JSON.stringify(this.items));
    }

    // Initialize all event listeners
    initializeEventListeners() {
        // Add item form
        document.getElementById('addItemForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addItem();
        });

        // Edit item form
        document.getElementById('editItemForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.updateItem();
        });

        // Search functionality
        document.getElementById('searchInput').addEventListener('input', () => {
            this.updateDisplay();
        });

        // Category filter
        document.getElementById('categoryFilter').addEventListener('change', () => {
            this.updateDisplay();
        });

        // Modal close functionality
        document.querySelector('.close').addEventListener('click', () => {
            this.closeModal();
        });

        // Close modal when clicking outside
        document.getElementById('editModal').addEventListener('click', (e) => {
            if (e.target.id === 'editModal') {
                this.closeModal();
            }
        });
    }

    // Add new item
    addItem() {
        const name = document.getElementById('itemName').value.trim();
        const price = parseFloat(document.getElementById('itemPrice').value);
        const quantity = parseInt(document.getElementById('itemQuantity').value);
        const category = document.getElementById('itemCategory').value.trim() || 'General';

        if (!name || isNaN(price) || isNaN(quantity) || price < 0 || quantity < 0) {
            this.showMessage('Please fill in all fields with valid values.', 'error');
            return;
        }

        const newItem = {
            id: Date.now().toString(),
            name: name,
            price: price,
            quantity: quantity,
            category: category,
            dateAdded: new Date().toISOString()
        };

        this.items.push(newItem);
        this.saveToStorage();
        this.updateDisplay();
        this.clearForm();
        this.showMessage(`${name} added successfully!`, 'success');
    }

    // Update existing item
    updateItem() {
        const name = document.getElementById('editItemName').value.trim();
        const price = parseFloat(document.getElementById('editItemPrice').value);
        const quantity = parseInt(document.getElementById('editItemQuantity').value);
        const category = document.getElementById('editItemCategory').value.trim() || 'General';

        if (!name || isNaN(price) || isNaN(quantity) || price < 0 || quantity < 0) {
            this.showMessage('Please fill in all fields with valid values.', 'error');
            return;
        }

        const itemIndex = this.items.findIndex(item => item.id === this.currentEditId);
        if (itemIndex !== -1) {
            this.items[itemIndex] = {
                ...this.items[itemIndex],
                name: name,
                price: price,
                quantity: quantity,
                category: category
            };

            this.saveToStorage();
            this.updateDisplay();
            this.closeModal();
            this.showMessage(`${name} updated successfully!`, 'success');
        }
    }

    // Delete item
    deleteItem(id) {
        const item = this.items.find(item => item.id === id);
        if (item && confirm(`Are you sure you want to delete "${item.name}"?`)) {
            this.items = this.items.filter(item => item.id !== id);
            this.saveToStorage();
            this.updateDisplay();
            this.showMessage(`${item.name} deleted successfully!`, 'success');
        }
    }

    // Sell one item (reduce quantity by 1)
    sellItem(id) {
        const itemIndex = this.items.findIndex(item => item.id === id);
        if (itemIndex !== -1) {
            const item = this.items[itemIndex];
            if (item.quantity > 0) {
                this.items[itemIndex].quantity -= 1;
                this.saveToStorage();
                this.updateDisplay();
                this.showMessage(`Sold one ${item.name}!`, 'success');
            } else {
                this.showMessage(`${item.name} is out of stock!`, 'error');
            }
        }
    }

    // Open edit modal
    editItem(id) {
        const item = this.items.find(item => item.id === id);
        if (item) {
            this.currentEditId = id;
            document.getElementById('editItemId').value = id;
            document.getElementById('editItemName').value = item.name;
            document.getElementById('editItemPrice').value = item.price;
            document.getElementById('editItemQuantity').value = item.quantity;
            document.getElementById('editItemCategory').value = item.category;
            document.getElementById('editModal').style.display = 'block';
        }
    }

    // Close modal
    closeModal() {
        document.getElementById('editModal').style.display = 'none';
        this.currentEditId = null;
    }

    // Clear add item form
    clearForm() {
        document.getElementById('addItemForm').reset();
    }

    // Get filtered items based on search and category
    getFilteredItems() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const categoryFilter = document.getElementById('categoryFilter').value;

        return this.items.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(searchTerm) || 
                                item.category.toLowerCase().includes(searchTerm);
            const matchesCategory = !categoryFilter || item.category === categoryFilter;
            return matchesSearch && matchesCategory;
        });
    }

    // Update category filter options
    updateCategoryFilter() {
        const categories = [...new Set(this.items.map(item => item.category))];
        const filterSelect = document.getElementById('categoryFilter');
        
        // Keep current selection
        const currentValue = filterSelect.value;
        
        // Clear and rebuild options
        filterSelect.innerHTML = '<option value="">All Categories</option>';
        
        categories.sort().forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            filterSelect.appendChild(option);
        });
        
        // Restore selection
        filterSelect.value = currentValue;
    }

    // Update statistics
    updateStats() {
        const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
        const totalValue = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const lowStock = this.items.filter(item => item.quantity > 0 && item.quantity <= 5).length;

        document.getElementById('totalItems').textContent = totalItems;
        document.getElementById('totalValue').textContent = `$${totalValue.toFixed(2)}`;
        document.getElementById('lowStock').textContent = lowStock;
    }

    // Create item card HTML
    createItemCard(item) {
        const stockStatus = item.quantity === 0 ? 'out' : item.quantity <= 5 ? 'low' : 'normal';
        const cardClass = item.quantity === 0 ? 'item-card out-of-stock' : 
                         item.quantity <= 5 ? 'item-card low-stock' : 'item-card';

        return `
            <div class="${cardClass}">
                <div class="item-header">
                    <div>
                        <div class="item-name">${this.escapeHtml(item.name)}</div>
                        <div class="item-category">${this.escapeHtml(item.category)}</div>
                    </div>
                </div>
                <div class="item-price">$${item.price.toFixed(2)}</div>
                <div class="item-quantity">
                    Stock: <span class="quantity-badge ${stockStatus}">${item.quantity}</span>
                </div>
                <div class="item-actions">
                    <button class="btn-small btn-edit" onclick="storeManager.editItem('${item.id}')">
                        Edit
                    </button>
                    <button class="btn-small btn-sell" onclick="storeManager.sellItem('${item.id}')" 
                            ${item.quantity === 0 ? 'disabled' : ''}>
                        Sell
                    </button>
                    <button class="btn-small btn-delete" onclick="storeManager.deleteItem('${item.id}')">
                        Delete
                    </button>
                </div>
            </div>
        `;
    }

    // Display items in grid
    displayItems() {
        const filteredItems = this.getFilteredItems();
        const gridContainer = document.getElementById('inventoryGrid');

        if (filteredItems.length === 0) {
            gridContainer.innerHTML = `
                <div class="empty-state">
                    <h3>No items found</h3>
                    <p>Add some collectible figures to get started!</p>
                </div>
            `;
            return;
        }

        // Sort items: in-stock first, then by name
        filteredItems.sort((a, b) => {
            if (a.quantity === 0 && b.quantity > 0) return 1;
            if (a.quantity > 0 && b.quantity === 0) return -1;
            return a.name.localeCompare(b.name);
        });

        gridContainer.innerHTML = filteredItems.map(item => this.createItemCard(item)).join('');
    }

    // Update entire display
    updateDisplay() {
        this.updateStats();
        this.updateCategoryFilter();
        this.displayItems();
    }

    // Show success/error messages
    showMessage(text, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create new message
        const message = document.createElement('div');
        message.className = `message ${type}`;
        message.textContent = text;

        // Insert at top of container
        const container = document.querySelector('.container');
        container.insertBefore(message, container.firstChild);

        // Auto remove after 3 seconds
        setTimeout(() => {
            if (message.parentNode) {
                message.remove();
            }
        }, 3000);
    }

    // Escape HTML to prevent XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Export data as JSON
    exportData() {
        const dataStr = JSON.stringify(this.items, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'store-inventory.json';
        link.click();
        
        URL.revokeObjectURL(url);
        this.showMessage('Inventory exported successfully!', 'success');
    }

    // Import data from JSON file
    importData(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedItems = JSON.parse(e.target.result);
                if (Array.isArray(importedItems)) {
                    this.items = importedItems;
                    this.saveToStorage();
                    this.updateDisplay();
                    this.showMessage('Inventory imported successfully!', 'success');
                } else {
                    this.showMessage('Invalid file format!', 'error');
                }
            } catch (error) {
                this.showMessage('Error reading file!', 'error');
            }
        };
        reader.readAsText(file);
    }
}

// Initialize the store manager when page loads
let storeManager;

document.addEventListener('DOMContentLoaded', () => {
    storeManager = new StoreManager();
    
    // Add some sample data if storage is empty
    if (storeManager.items.length === 0) {
        storeManager.items = [
            {
                id: '1',
                name: 'Naruto Uzumaki Figure',
                price: 25.99,
                quantity: 8,
                category: 'Anime',
                dateAdded: new Date().toISOString()
            },
            {
                id: '2',
                name: 'Dragon Ball Z Goku',
                price: 35.50,
                quantity: 3,
                category: 'Anime',
                dateAdded: new Date().toISOString()
            },
            {
                id: '3',
                name: 'Marvel Spider-Man',
                price: 29.99,
                quantity: 12,
                category: 'Marvel',
                dateAdded: new Date().toISOString()
            },
            {
                id: '4',
                name: 'One Piece Luffy',
                price: 22.75,
                quantity: 0,
                category: 'Anime',
                dateAdded: new Date().toISOString()
            }
        ];
        storeManager.saveToStorage();
        storeManager.updateDisplay();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Escape to close modal
    if (e.key === 'Escape') {
        storeManager.closeModal();
    }
    
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('searchInput').focus();
    }
});
