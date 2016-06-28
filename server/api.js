const Router = require('express').Router;
const router = new Router();

const WordList = {wordcards :[
  {
    name: 'garment',
    trans: '衣服；服裝',
    testTime: 0
  },
  {
    name: 'ghetto',
    trans: '貧民窟',
    testTime: 0
  },
  {
    name: 'irony',
    trans: '諷刺，譏刺；反語',
    testTime: 0
  },
  {
    name: 'garment',
    trans: '衣服；服裝',
    testTime: 0
  },
  {
    name: 'juvenile',
    trans: '少年的，年輕的',
    testTime: 0
  },
  {
    name: 'garment',
    trans: '衣服；服裝',
    testTime: 0
  },
  {
    name: 'velvet',
    trans: '天鵝絨',
    testTime: 0
  },
  {
    name: 'volatile',
    trans: '揮發性的',
    testTime: 0
  },
  {
    name: 'wordy',
    trans: '多話的',
    testTime: 0
  },
  {
    name: 'yielding',
    trans: '易彎曲的',
    testTime: 0
  },
  {
    name: 'zinc',
    trans: '鋅',
    testTime: 0
  },
  {
    name: 'neonlight',
    trans: '霓虹燈',
    testTime: 0
  },
  {
    name: 'newcomer',
    trans: '新來的人',
    testTime: 0
  },
  {
    name: 'niece',
    trans: '姪女,外甥女',
    testTime: 0
  },
  {
    name: 'acreage',
    trans: '英畝數',
    testTime: 0
  },
  {
    name: 'bikini',
    trans: '比基尼游裝',
    testTime: 0
  },
]
};

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

router.get('/mywordlist',function(req, res){
  res.json(WordList)
})

router.get('/reviewmode',function(req,res){
    res.json(WordList)
})

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
