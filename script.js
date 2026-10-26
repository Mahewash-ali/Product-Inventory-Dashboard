

// 1. INITIAL INVENTORY AND SETTINGS

const inventory = [
    { name: "Laptop", price: 800 },
    { name: "Mouse", price: 25 },
    { name: "Laptop", price: 950 },
    { name: "Mouse", price: 23 },
    { name: "Monitor", price: 150 },
    { name: "Keyboard", price: 75 },
    { name: "Headphones", price: 120 },
    { name: "USB Cable", price: 10 },
    { name: "Webcam", price: 90 },
    { name: "Printer", price: 250 },
    { name: "Tablet", price: 450 },
    { name: "Smartphone", price: 699 },
    { name: "Gaming Chair", price: 320 },
];

const DISCOUNT_PERCENT = 10;

// 2. PRICE CATEGORY — REGULAR FUNCTION

function getCategory(price) {
    if (price < 100) {
        return "Budget";
    } else if (price < 500) {
        return "Standard";
    } else {
        return "Premium";
    }
}

// 3. INVENTORY STATISTICS — REGULAR FUNCTION

function calculateInventoryStats() {
    let totalValue = 0;
    let productCount = 0;

    for (let i = 0; i < inventory.length; i++) {
        const product = inventory[i];

        if (
            !product ||
            !Number.isFinite(product.price) ||
            product.price < 0
        ) {
            continue;
        }

        totalValue += product.price;
        productCount++;
    }

    return {
        totalValue: totalValue,
        productCount: productCount
    };
}


// 4. DISCOUNT — ARROW FUNCTION

const calculateDiscount = (price, discountPercent) => {
    if (
        !Number.isFinite(price) ||
        price < 0 ||
        !Number.isFinite(discountPercent) ||
        discountPercent < 0 ||
        discountPercent > 100
    ) {
        return null;
    }

    const discountAmount = price * discountPercent / 100;

    return Number((price - discountAmount).toFixed(2));
};


// 5. SEARCH INVENTORY — LOOP, CONTINUE, BREAK

function findProduct(searchTerm) {
    const term = searchTerm.trim().toLowerCase();

    if (term === "") {
        return null;
    }

    for (let i = 0; i < inventory.length; i++) {
        const product = inventory[i];

        // Skip incomplete records.
        if (
            !product ||
            typeof product.name !== "string" ||
            product.name.trim() === ""
        ) {
            continue;
        }

        // Stop when a matching product is found.
        if (product.name.toLowerCase().includes(term)) {
            return product; // Exits the function immediately.
        }
    }

    return null;
}



// 6. GET HTML ELEMENTS


const inventoryBody = document.getElementById("inventory-body");
const searchInput = document.getElementById("search-input");
const categoryFilter = document.getElementById("category-filter");
const addProductForm = document.getElementById("add-product-form");
const productNameInput = document.getElementById("product-name");
const productPriceInput = document.getElementById("product-price");
const formMessage = document.getElementById("form-message");

const productCountElement = document.getElementById("product-count");
const totalValueElement = document.getElementById("total-value");
const budgetCountElement = document.getElementById("budget-count");
const affordableCountElement = document.getElementById("affordable-count");
const visibleCountElement = document.getElementById("visible-count");
const reportSummaryElement = document.getElementById("report-summary");


// Format prices consistently.
function formatPrice(price) {
    return "$" + price.toFixed(2);
}


// 7. FOREACH() — RENDER INVENTORY TABLE


function renderInventory(products) {
    // Clear old rows before drawing updated results.
    inventoryBody.replaceChildren();

    products.forEach((product, index) => {
        const row = document.createElement("tr");

        const productCell = document.createElement("td");
        const productWrapper = document.createElement("div");
        productWrapper.className = "product-cell";

        const avatar = document.createElement("span");
        avatar.className = "product-avatar";
        avatar.textContent = product.name.charAt(0).toUpperCase();

        const productInfo = document.createElement("div");

        const name = document.createElement("span");
        name.className = "product-name";
        name.textContent = product.name;

        const subtitle = document.createElement("span");
        subtitle.className = "product-subtitle";
        subtitle.textContent =
            "Product #" + String(index + 1).padStart(3, "0");

        productInfo.append(name, subtitle);
        productWrapper.append(avatar, productInfo);
        productCell.append(productWrapper);

        const priceCell = document.createElement("td");
        priceCell.className = "price-cell";
        priceCell.textContent = formatPrice(product.price);

        const categoryCell = document.createElement("td");
        const categoryBadge = document.createElement("span");
        const category = getCategory(product.price);

        categoryBadge.className = "category " + category.toLowerCase();
        categoryBadge.textContent = category;
        categoryCell.append(categoryBadge);

        const discountCell = document.createElement("td");
        discountCell.className = "discount-price";

        const finalPrice = calculateDiscount(
            product.price,
            DISCOUNT_PERCENT
        );

        discountCell.textContent = formatPrice(finalPrice);

        row.append(
            productCell,
            priceCell,
            categoryCell,
            discountCell
        );

        inventoryBody.append(row);
    });

    if (products.length === 0) {
        const row = document.createElement("tr");
        const cell = document.createElement("td");

        cell.colSpan = 4;
        cell.textContent = "No matching products found.";
        cell.style.textAlign = "center";
        cell.style.padding = "30px";

        row.append(cell);
        inventoryBody.append(row);
    }

    visibleCountElement.textContent =
        "Showing " + products.length +
        (products.length === 1 ? " product" : " products");
}



// 8. FILTER() — SEARCH AND CATEGORY FILTER


function updateInventoryView() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const selectedCategory = categoryFilter.value;

    // Use the loop-based search function to find a matching item.
    // This also demonstrates the required inventory search.
    if (searchTerm !== "") {
        const firstMatch = findProduct(searchTerm);

        if (firstMatch) {
            console.log("Search match found:", firstMatch.name);
        }
    }

    // filter() selects products matching BOTH criteria.
    const filteredProducts = inventory.filter((product) => {
        const matchesSearch = product.name
            .toLowerCase()
            .includes(searchTerm);

        const matchesCategory =
            selectedCategory === "all" ||
            getCategory(product.price) === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    renderInventory(filteredProducts);
}


// 9. UPDATE STATISTICS AND REPORT

function updateDashboard() {
    const stats = calculateInventoryStats();

    productCountElement.textContent = stats.productCount;
    totalValueElement.textContent = formatPrice(stats.totalValue);

    const budgetProducts = inventory.filter((product) => {
        return getCategory(product.price) === "Budget";
    });

    budgetCountElement.textContent = budgetProducts.length;

    const affordableProducts = inventory.filter((product) => {
        return product.price < 200;
    });

    affordableCountElement.textContent = affordableProducts.length;

    // map() transforms products into a formatted report.
    const reportSummary = inventory.map((product) => {
        return (
            product.name.toUpperCase() +
            ": " +
            formatPrice(product.price)
        );
    });

    reportSummaryElement.textContent =
        reportSummary.length > 0
            ? reportSummary.join("\n")
            : "No products in inventory.";

    // Refresh the table and keep active search/filter settings.
    updateInventoryView();
}


// 10. ADD PRODUCT FORM AND INPUT VALIDATION

addProductForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = productNameInput.value.trim();
    const priceInput = productPriceInput.value.trim();
    const price = Number(priceInput);

    if (name === "") {
        showFormMessage("Please enter a product name.", true);
        return;
    }

    if (
        priceInput === "" ||
        !Number.isFinite(price) ||
        price <= 0
    ) {
        showFormMessage("Enter a valid price greater than zero.", true);
        return;
    }

    inventory.push({
        name: name,
        price: price
    });

    addProductForm.reset();

    showFormMessage(name + " was added successfully.", false);

    updateDashboard();
});


function showFormMessage(message, isError) {
    formMessage.textContent = message;
    formMessage.classList.toggle("error", isError);
}



// 11. LIVE SEARCH AND CATEGORY FILTER


searchInput.addEventListener("input", updateInventoryView);

categoryFilter.addEventListener("change", updateInventoryView);


// 12. INITIAL PAGE RENDER

updateDashboard();

console.log("Inventory dashboard initialized.");
