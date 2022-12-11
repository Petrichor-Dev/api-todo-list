var express = require('express');
var router = express.Router();
const { createSome, getSome, deleteSome, updateSome } = require('../models/myModels/activityGroupModels');
const {body, validationResult} = require('express-validator');

//generate response function
function response(status, message, data) {
    return {status, message, data};
}

// ---------------------------------POST---------------------------------- //
router.post('/', body('email').isEmail(), (req, res) => {

  if(!req.body.title){
    return res.status(400).json(response('Bad Request', 'Title Cannot Be Null', {}));
  }

  if(!req.body.email){
    return res.status(400).json(response('Bad Request', 'Email Cannot Be Null', {}));
  }

  const error = validationResult(req);
  if(!error.isEmpty()){
    return res.status(400).json(response('Bad Request', 'Email Not Valid', {}));
  }

  const data = {
    title: req.body.title,
    email: req.body.email,
    is_deleted: false
  }
  createSome(res, data);
});

// ---------------------------------GET ALL DATA---------------------------------- //
router.get('/', (req, res) => {
  getSome(res);
});


// ---------------------------------GET BY ID---------------------------------- //
router.get('/:id', (req, res) => {
  const uid = req.params.id;
  getSome(res, uid);
});


// ---------------------------------PATCH---------------------------------- //
router.patch('/:ActivityId',  (req, res) => {
  if(!req.body.title){
    return res.status(400).json(response('Bad Request', 'Title Cannot Be Null', {}));
  }

  const data = {
    ActivityId: req.params.ActivityId,
    title: req.body.title
  }
  updateSome(res, data)
});

// ---------------------------------DELETE---------------------------------- //
router.delete('/:id', (req, res) => {
  deleteSome(res, req.params.id);
});

module.exports = router;
