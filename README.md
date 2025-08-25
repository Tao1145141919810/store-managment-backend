# Family Store Manager - Collectible Figures

A simple, local web application to manage your family's collectible figure store inventory. No server or login required - everything runs in your browser and saves data locally.

## Features

### 📊 Dashboard Overview
- **Total Items**: See the total quantity of all figures in stock
- **Total Value**: Calculate the total monetary value of your inventory
- **Low Stock Alerts**: Track items with 5 or fewer pieces remaining

### 📦 Inventory Management
- **Add New Items**: Add collectible figures with name, price, quantity, and category
- **Edit Items**: Update item details including price and stock levels
- **Delete Items**: Remove items from inventory with confirmation
- **Sell Items**: Quickly reduce stock by 1 when you make a sale

### 🔍 Search & Filter
- **Search**: Find items by name or category
- **Category Filter**: Filter items by category (Anime, Marvel, etc.)
- **Smart Sorting**: Items are sorted with in-stock items first

### 💾 Data Persistence
- **Local Storage**: All data is saved in your browser's local storage
- **Sample Data**: Includes sample collectible figures to get you started
- **Data Safety**: Your data persists between browser sessions

### 🎨 Modern Design
- **Responsive Layout**: Works on desktop, tablet, and mobile devices
- **Visual Indicators**: Color-coded stock levels (normal, low stock, out of stock)
- **Smooth Animations**: Modern UI with hover effects and transitions

## How to Use

### Getting Started
1. **Open the Application**: Double-click `frontEnd/index.html` or open it in any modern web browser
2. **View Sample Data**: The app comes with sample collectible figures pre-loaded
3. **Start Managing**: Begin adding your own inventory!

### Adding New Items
1. Fill in the "Add New Item" form:
   - **Figure Name**: e.g., "Naruto Uzumaki Figure"
   - **Price**: Enter the selling price in dollars
   - **Quantity**: How many you have in stock
   - **Category**: Optional category (e.g., "Anime", "Marvel")
2. Click "Add Item"

### Managing Inventory
- **Edit**: Click the blue "Edit" button to modify item details
- **Sell**: Click the green "Sell" button to reduce quantity by 1
- **Delete**: Click the red "Delete" button to remove an item (with confirmation)

### Searching and Filtering
- Use the search box to find items by name or category
- Use the category dropdown to filter by specific categories
- **Keyboard Shortcut**: Press `Ctrl+K` (or `Cmd+K` on Mac) to quickly focus the search box

## Stock Level Indicators

- **Green Badge**: Normal stock (6+ items)
- **Orange Badge**: Low stock (1-5 items) - consider restocking
- **Red Badge**: Out of stock (0 items) - needs immediate attention

Items with low stock have an orange border, and out-of-stock items have a red border and are slightly faded.

## Technical Details

### Files
- `frontEnd/index.html`: Main application structure
- `frontEnd/style.css`: Modern styling and responsive design
- `backend/storeManagement.js`: All functionality and data management

### Browser Compatibility
- Works in all modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript to be enabled
- Uses localStorage for data persistence

### Data Storage
- All data is stored locally in your browser
- No internet connection required
- Data persists between sessions
- Each browser/device maintains separate data

## Tips for High School Students

### Learning Opportunities
This project demonstrates several important web development concepts:
- **HTML Structure**: Semantic markup and form handling
- **CSS Styling**: Modern design with Flexbox and Grid
- **JavaScript Programming**: Object-oriented programming, event handling, and data management
- **Local Storage**: Browser-based data persistence
- **Responsive Design**: Mobile-friendly layouts

### Customization Ideas
You can easily customize this application:
- **Add New Fields**: Add fields like "condition", "manufacturer", or "release date"
- **New Categories**: Create categories specific to your collection
- **Color Themes**: Modify the CSS to change colors and styling
- **Export Features**: Add functionality to export data to Excel or PDF

### Business Learning
Managing a store teaches valuable skills:
- **Inventory Tracking**: Understanding stock levels and reorder points
- **Financial Management**: Tracking total value and profit margins
- **Organization**: Categorizing and searching through inventory
- **Customer Service**: Quick access to stock information for customers

## Troubleshooting

### Data Not Saving
- Ensure your browser allows localStorage
- Don't use private/incognito mode for persistent data
- Check that JavaScript is enabled

### Application Not Loading
- Make sure you're opening `frontEnd/index.html` in a web browser
- Check that all three files are in the same folder
- Try a different browser if issues persist

### Performance
- The application can handle hundreds of items efficiently
- If you notice slowdowns with very large inventories, consider organizing by category

## Future Enhancements

This simple application could be expanded with:
- Barcode scanning for quick item lookup
- Photo uploads for each collectible
- Sales history and analytics
- Customer management
- Multi-location inventory tracking
- Integration with online marketplaces

Perfect for learning web development while solving a real business need!
TEST



