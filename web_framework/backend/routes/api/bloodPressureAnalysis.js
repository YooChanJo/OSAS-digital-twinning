const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");

const Solver = require("../../simulationAnalysis/solver").Solver;

router.post("/", asyncHandler(async (req, res, next) => {
    const t = new Solver(req.body, 0.000000007);
    console.log(t.predefines)

    res.json(req.body);
}));
  
module.exports = router;