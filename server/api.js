const Router = require('express').Router;
const router = new Router();

router.get('/mywordlist',function(req, res){
  var fs = require('fs');
  var path = require('path');
  var filePath = path.join(__dirname, 'wordlist.csv');
  var csv = require('csv-parser');
  var stream = csv({
    raw: false,
    seperator: ',',
    quote: '"',
    escape: '"',
    newline: '\n',
    strict: false
  });
  var wordcards = [];
  var countWordCards = 0;
  var wordlist = {};
  fs.createReadStream(filePath)
    .pipe(stream)
    .on('data', function(data) {
      //console.log(data);
      wordcards.push(data);
      console.log(wordcards[countWordCards].name);
      console.log(wordcards[countWordCards].testTime);
      wordlist = {wordcards:wordcards};
      if(wordlist.wordcards[countWordCards].number === 
         wordlist.wordcards[countWordCards].total){
        //console.log(wordlist);
        res.json(wordlist);
      }
      countWordCards ++;
    })
})

router.get('/reviewmode',function(req,res){
    res.json(WordList)
})

router.get('/users/:username', function(req, res){
  var found = false;
  for(var i = 0; i < UserProfile.users.length; i++){
    if(req.params.username == UserProfile.users[i].name){
      found = true;
      res.json(UserProfile.users[i]);
      break;
    }
  }
  if(found == false){
    res.sendStatus(404);
  }
})

module.exports = router;
