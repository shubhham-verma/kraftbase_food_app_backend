const express = require('express');
const { add_rating_controller } = require('../controller/user_service/add_rating_controller');
const { add_user_controller } = require('../controller/user_service/add_user_controller');
const { get_online_restaurant_controller } = require('../controller/user_service/get_online_restaurant_controller');
const { place_order_controller } = require('../controller/user_service/place_order_contoller');
const { update_order_controller } = require('../controller/user_service/update_order_controller');

const router = express.Router();

router.post('/add_rating', add_rating_controller)
router.post('/add_user' , add_user_controller)
router.get('/get_restaurant', get_online_restaurant_controller)
router.post('/place_order', place_order_controller)
router.put('/update_order', update_order_controller)

module.exports = router;