const express = require('express');
const Products = require('../models/product');

const router = express.Router();

//save posts
router.post('/product/save', (req, res) => {

    let newProduct = new Products(req.body);

    newProduct.save((err) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }

        return res.status(200).json({
            success: "Product saved successfully"
        });
    });
});

router.get('/products', (req, res) => {
    Products.find().exec((err, products) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: true,
            existingProducts: products
        });
    });
});

module.exports = router;