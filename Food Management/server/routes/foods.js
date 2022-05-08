const express = require('express');
const Foods = require('../models/food');

const router = express.Router();

//save a food
router.post('/save', (req, res) => {
    
    let newFood = new Foods(req.body);

    newFood.save((err) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
    
        return res.status(200).json({
            success: " Item Added  successfully"
        });
    });


});

//get food
router.get('/', (req, res) => {
    Foods.find().exec((err, foods) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        console.log("Foods")
        return res.status(200).json({
            success: true,
            existingFoods: foods
        });
    });
});


//update a food item
router.put('/update/:id', (req, res) => {
    Foods.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body
        },
        (err, post) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            return res.status(200).json({
                success: "Item updated successfully!"
            });
        }
    );
});


//delete a customer
router.delete('/delete/:id', (req, res) => {
    Foods.findByIdAndRemove(req.params.id).exec((err, deletedPost) => {
        if (err) {
            return res.status(400).json({
                message: "Delete failed", err
            });
        }
        return res.status(200).json({
                message: "Delete success", deletedPost
        });
    });
});


//get a specific customer
router.get('/:id', (req, res) => {
    let foodId = req.params.id;
    
    Foods.findById(foodId, (err, food) => {
        if (err) {
            return res.status(400).json({
                success: false,
                err
            });
        }

        return res.status(200).json({
            success: true,
            food
        });
    })
})
module.exports = router;