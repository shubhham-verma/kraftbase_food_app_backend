const { DeliveryAgent } = require("../../models/delivery_agent_service_schema");

const get_all_agents_controller = async (req, res) => {
    try {
        const agents = await DeliveryAgent.find();
        res.status(200).send({ agents });
    } catch (error) {
        res.status(500).send({ message: "Error fetching agents", error });
    }
};

module.exports = { get_all_agents_controller };