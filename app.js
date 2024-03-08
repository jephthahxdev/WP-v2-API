const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 8000;

// Function to fetch products from the WordPress REST API
const getWordPressProducts = async () => {
    try {
        const response = await axios.get('http://37.27.11.209/wp-json/wp/v2/product');
        return response.data;
    } catch (error) {
        console.error('Error fetching products from WordPress:', error.message);
        return [];
    }
};

// Function to fetch details about a specific product by ID
const getWordPressProductDetails = async (productId) => {
    try {
        const response = await axios.get(`http://37.27.11.209/wp-json/wp/v2/product/${productId}`);
        
        // Extract relevant attributes from the response
        const productDetails = {
            title: response.data.title.rendered,
            date: response.data.date,
            tags: response.data.tags,
            categories: response.data.categories,
            description: response.data.content.rendered,
            featuredImage: response.data.featured_media ? response.data.featured_media.source_url : null,
        };

        return productDetails;
    } catch (error) {
        console.error(`Error fetching details for product with ID ${productId}:`, error.message);
        throw error; // Re-throw the error to be caught by the error handling middleware
    }
};

// Middleware for parsing JSON
app.use(express.json());

// Route to list all products
app.get('/products', async (req, res) => {
    const wordpressProducts = await getWordPressProducts();
    res.json(wordpressProducts);
});

// Route to get details about a specific product
app.get('/product/:id', async (req, res, next) => {
    try {
        const productId = parseInt(req.params.id);
        const productDetails = await getWordPressProductDetails(productId);
        res.json(productDetails);
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, '37.27.11.209', () => {
    console.log(`Server running on http://37.27.11.209:${PORT}`);
});
