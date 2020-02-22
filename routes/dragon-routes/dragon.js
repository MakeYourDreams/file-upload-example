const express = require('express');
const router  = express.Router();
const dragon = require('../../models/Dragon')
const uploadCloud = require("../../config/cloudinary-setup")

/* Dragon home page */
router.get('/', (req, res, next) => {
  dragon.find()
  .then(allDragonsFromDB =>
  {
    res.render('dragon/dragon-home', { dragon: allDragonsFromDB });
  
  })
});


// our create route for the new dragon
router.post('/create', uploadCloud.single("image"), (req, res, next) => {
const dragonInputInfo = req.body;
dragonInputInfo.image = req.file.url;
dragon.create(dragonInputInfo)
.then(newlyCreatedDragon => {
  console.log(dragonInputInfo);
  
  res.redirect("back");
}).catch(err => next(err));
})

module.exports = router;
