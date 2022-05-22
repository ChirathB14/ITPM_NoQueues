const express = require("express");
const Foods = require("../models/food");

const router = express.Router();

router.get("/", async (req, res) => {

    const products = await Foods.find({});
    try {
      return res.status(200).json({
        success: true,
        data: {
          products,
        },
      });
    } catch (err) {
      return res.status(500).json({
        status: false,
        message: err,
      });
    }
});



module.exports = router;
