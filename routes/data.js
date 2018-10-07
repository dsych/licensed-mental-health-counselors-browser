const router = require('express').Router();

// Data router is default
router.get('/', (req, res, next) => {
  res.json({
    data: req.db.get('data').value(),
    updated: req.db.get('updated').value(),
  });
  res.end();
});

module.exports = router;
