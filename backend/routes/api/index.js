const express = require('express');
const router = express.Router();


// API Index
router.get('/', (req, res) => {
  res.json({ message: 'API Index' });
});

const bloodPressureAnalysisRouter = require("./bloodPressureAnalysis");
router.use('/blood-pressure-analysis', bloodPressureAnalysisRouter)

/* router.use("/item", itemRouter); */

module.exports = router;