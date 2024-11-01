const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");

const Twin = require("../../simulationAnalysis/twin").Twin;

router.post("/", asyncHandler(async (req, res, next) => {
    const t = new Twin(req.body);
    console.log(t.predefines)


    res.json(req.body);
}));
  
  
module.exports = router;