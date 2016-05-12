const Router = require('express').Router;
const router = new Router();

const UserProfile = {users :[
  {
    name: 'Elsa',
    photosrc: 'http://lorempixel.com/50/50/people/1',
    age: '18',
    bloodtype: 'AB',
    interests: ['golf','piano']
  },
  {
    name: 'Katharine',
    photosrc: 'http://lorempixel.com/50/50/people/9',
    age: '19',
    bloodtype: 'O',
    interests: ['jogging','chess']
  },
  {
    name: 'Marshall',
    photosrc: 'http://lorempixel.com/50/50/people/7',
    age: '16',
    bloodtype: 'A',
    interests: ['reading','skiing']
  }
]}; 

router.get('/users', function(req, res){
  res.json(UserProfile)
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
