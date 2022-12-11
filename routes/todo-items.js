var express = require('express');
var router = express.Router();
const { createSome, getSome, deleteSome, updateSome } = require('../models/myModels/todoItemModels');

//generate response function
function response(status, message, data) {
    return {status, message, data};
}

// ---------------------------------POST---------------------------------- //
router.post('/', (req, res) => {
  if(!req.body.activity_group_id){
    return res.status(400).json(response('Bad Request', 'activity_group_id cannot be null', {}));
  }

  if(!req.body.title){
    return res.status(400).json(response('Bad Request', 'Title cannot be null', {}));
  }

  if(!req.body.priority){
    return res.status(400).json(response('Bad Request', 'Priority cannot be null', {}));
  }

  const data = {
    title: req.body.title,
    activity_group_id: req.body.activity_group_id,
    priority: req.body.priority,
    is_active: true,
    is_deleted: false
  }
  createSome(res, data);
});

// ---------------------------------GET ALL DATA---------------------------------- //
router.get('/', (req, res) => {
  getSome(res, req.query);
});


// ---------------------------------GET BY ID---------------------------------- //
router.get('/:todoId', (req, res) => {
  getSome(res, req.params);
});


// ---------------------------------PATCH---------------------------------- //
router.patch('/:todoId', (req, res) => {
  const data = {
    is_active: req.body.is_active,
    title: req.body.title,
    priority: req.body.priority
  }
  updateSome(res, data, req.params.todoId);
});

// ---------------------------------DELETE---------------------------------- //
router.delete('/:todoId', (req, res) => {
  deleteSome(res, req.params.todoId);
});

module.exports = router;
