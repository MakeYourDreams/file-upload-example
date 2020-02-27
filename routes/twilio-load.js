const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  // res.render('index');
  res.sendFile(__dirname + '/test.xml');
});

// app.get('/', function(request, response){
//   response.sendFile('test.xml');
// });

// app.get('/',function(req,res){
//   res.sendFile(path.join(__dirname+'/test.xml'));
// });

module.exports = router;
