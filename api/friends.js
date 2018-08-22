const express = require('express');

const router = express.Router();

const queries = require('../db/queries');

function isValidID(req, res, next) {
  if (!isNaN(req.params.id)) return next();
  next(new Error('Invalid ID'))
}

function validFriend(friend) {
  const hasName = typeof friend.name == 'string' && friend.name.trim() != '';
  const hasRelation = typeof friend.relation == 'string' && friend.relation.trim() != '';
  return hasName && hasRelation;
}

router.get('/', (req, res) => {
  queries.getAll().then(friends => {
    res.json(friends);
  });
});

router.get('/:id', isValidID, (req, res, next) => {
  queries.getOne(req.params.id).then(friend => {
    if(friend) {
      res.json(friend);
    } else {
      next();
    }
  });
});

router.post('/', (req, res, next) => {
  if(validFriend(req.body)) {
    queries.create(req.body).then(friends => {
      res.json(friends[0]); 
    });
  } else {
    next(new Error('Invalid Friend'));
  }
});

router.put('/:id', isValidID, (req, res, next) => {
  if(validFriend(req.body)) {
    queries.update(req.params.id, req.body).then(friends => {
      res.json(friends[0]);
    });
  } else {
    next(new Error('Invalid Friend'));
  }
});

router.delete('/:id', isValidID, (req, res) => {
  queries.delete(req.params.id).then(() => {
    res.json({
      deleted: true
    });
  });
});

module.exports = router;