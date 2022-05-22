const router = require("express").Router();
const Employees = require("../models/employee");

router.post("/employee/login", async (req, res) => {
  try {
    const employee = await Employees.findOne({
      employee_email: req.body.email,
    });
    if (!employee) return res.status(401).send({ error: "Invalid Email!" });

    if (!employee.employee_password === req.body.password)
      return res.status(401).send({ error: "Invalid Password!" });

    const token = employee.generateAuthToken();
    res.status(200).send({ data: token, success: "Logged in successfully" });
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

module.exports = router;
