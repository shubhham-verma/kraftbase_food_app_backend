const express = require('express');
const { add_menu_controller } = require('../controller/restaurant_service/add_menu_controller');
const { add_restaurant_controller } = require('../controller/restaurant_service/add_restaurant_controller');
const { get_all_menus_controller } = require('../controller/restaurant_service/get_all_menus_controller');
const { get_all_restaurants_controller } = require('../controller/restaurant_service/get_all_restaurants_controller');
const { update_menu_controller } = require('../controller/restaurant_service/update_menu_controller');
const { update_restaurant_controller } = require('../controller/restaurant_service/update_restaurant_controller');
const { update_order_controller } = require('../controller/restaurant_service/update_order_controller');

const router = express.Router();

router.post('/add_menu', add_menu_controller);
router.post('/add_restaurant', add_restaurant_controller);
router.get('/get_menu', get_all_menus_controller);
router.get('/get_restaurants', get_all_restaurants_controller);
router.put('/update_menu', update_menu_controller);
router.put('/update_restaurant', update_restaurant_controller);
router.put('/update_order', update_order_controller); 


module.exports = router;

