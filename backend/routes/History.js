const express = require("express");
const router = express.Router();
const IncomeExpense = require("../models/IncomeExpense");
const BlogPost = require("../models/blogPost");
let email;

router.get("/get", (req, res) => {
  // jaka jest bardziej elegancka metoda obsłużenia maila w requeście zamiast cięcia?
  // i czy z punktu widzenia security dawanie requestów po nieposolonym mailu jest OK?
  email = req.originalUrl.slice(24);
  IncomeExpense.find({ userid: email })
    .sort({ date: "asc" })
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      console.log("error: ", dataerror);
    });
});

router.delete("/remove-entry", (req, res) => {
  IncomeExpense.findOneAndDelete({ _id: req.body.id }).then(data => {
    res.json(data);
  });
});

router.get("/incomes", (req, res) => {
  email = req.originalUrl.slice(27);
  IncomeExpense.find({ userid: email, operationtype: /przychód/ })
    .select({ amount: 1 })
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      console.log("error: ", dataerror);
    });
});

router.get("/outcomes", (req, res) => {
  email = req.originalUrl.slice(28);
  IncomeExpense.find({ userid: email, operationtype: /wydatek/ })
    .select({ amount: 1 })
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      console.log("error: ", dataerror);
    });
});

module.exports = router;
