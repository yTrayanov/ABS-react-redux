const express = require('express');
const router = new express.Router();
const Airline = require('../models/Airline');
const Airport = require('../models/Airport');
const { BadRequest, Created } = require('./responses');


router.post('/airline', (req, res) => {
    const airline = req.body;
    Airline.create(airline).then(() => {
        return Created(res, 'Airline created successfully');
    })
        .catch(e => {
            return res.BadRequest(res, e.message, e);
        })
});


router.post('/airport', (req, res) => {
    Airport.create(req.body).then((airport) => {
        return Created(res, 'Airport created', airport);
    })
        .catch((e) => {
            return BadRequest(res, 'Airport couldn\'t be created', e);
        })
})




module.exports = router;