const express = require('express');

const { add_delivery_agent_controller } = require('../controller/agent/add_agent_controller');
const { update_delivery_agent_controller } = require('../controller/agent/update_agent_controller');
const { get_all_agents_controller } = require('../controller/agent/get_agents');
const { update_order_controller } = require('../controller/agent/update_order_controller');


const router = express.Router();

router.post('/add_agent', add_delivery_agent_controller);
router.get('/get_agents', get_all_agents_controller)
router.put('/update_agent', update_delivery_agent_controller);
router.put('/update_order', update_order_controller);

module.exports = router;