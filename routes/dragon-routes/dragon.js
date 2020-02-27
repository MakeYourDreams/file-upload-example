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

//Twilio call
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const VoiceResponse = require('twilio').twiml.VoiceResponse;


const response = new VoiceResponse();
response.dial('415-123-4567');
response.say('Goodbye');

console.log(response.toString());

client.calls
      .create({
        //  url: 'http://localhost:3000/twilio',
        // url: 'https://handler.twilio.com/twiml/EHb5dbfd8deaa0edd1767130b62fd5b7ad',
        twiml: '<Response><Say>Marcus is super amazing he is the best person in the world! I love him very much.</Say></Response>',
         to: '+17542216335',
         from: '+17606645590'
       })
      .then(call => console.log(call.sid));

module.exports = router;
