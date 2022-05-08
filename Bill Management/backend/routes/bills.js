const express = require('express');
const Bills = require('../models/bill');

const router = express.Router();

//save a bill
router.post('/bills/save', (req, res) => {

    let newBill = new Bills(req.body);

    newBill.save((err) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }

        return res.status(200).json({
            success: "Bill saved successfully"
        });
    });
});

//get all bills
router.get('/bills', (req, res) => {
    Bills.find().exec((err, bills) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: true,
            existingBills: bills
        });
    });
});


//get a specific post
router.get('/bills/:id', (req, res) => {
    let billId = req.params.id;

    Bills.findById(billId, (err, bill) => {
        if (err) {
            return res.status(400).json({
                success: false,
                err
            });
        }

        return res.status(200).json({
            success: true,
            bill
        });
    })
})

//update posts
router.put('/bills/update/:id', (req, res) => {
    Bills.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body
        },
        (err, bill) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            return res.status(200).json({
                success: "Updated successfully!"
            });
        }
    );
});

//delete a bill
router.delete('/bills/delete/:id', (req, res) => {
    Bills.findByIdAndRemove(req.params.id).exec((err, deletedBill) => {
        if (err) {
            return res.status(400).json({
                message: "Delete failed", err
            });
        }
        return res.status(200).json({
            message: "Bill Delete success", deletedBill
        });
    });
});


module.exports = router;