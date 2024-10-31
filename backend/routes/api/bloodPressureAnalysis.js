const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");

const Twin = require("../../simulationAnalysis/twin");

router.post("/", asyncHandler(async (req, res, next) => {
    const t = new Twin.Twin(req.body);
    console.log(t);
    console.log(t.getPa());
    console.log(t.getdt());

    res.json(req.body);
}));
  
  
module.exports = router;