// realTimeProducts.js
const socket = io();

// Handle form submission
document.getElementById('product-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const productData = {
        title: document.getElementById('title').value,
        code: document.getElementById('code').value,
        description: document.getElementById('description').value,
    };

    // Emit the product data to the server
    socket.emit('addProduct', productData);

    // Clear the form fields
    event.target.reset();
});



