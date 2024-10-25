const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");

router.post("/", asyncHandler(async (req, res, next) => {
    console.log(req.body)
    res.send(`It is working, ${req.body.Part}`);
}));
  
  
module.exports = router;