const   express = require('express');
const router = express.Router();



router.get('/error', (req, res) => {
    const message = req.query.message || 'An unknown error occurred.';
   
    res.render('error', { message});
  });
  
  router.get('*', (req, res) => {
    res.status(404).render('error', { message: 'Page not found : ' + req.url });
  });
  
  module.exports = router;