const { DeliveryAgent } = require("../../models/delivery_agent_service_schema");

const update_delivery_agent_controller = async (req, res) => {
    try {
        const { agent_id, name, phone, isAvailable } = req.body;
        if (!agent_id) return res.status(400).send({ message: "agent_id is required" });

        const agent = await DeliveryAgent.findById(agent_id);
        if (!agent) return res.status(404).send({ message: "Delivery agent not found" });

        if (name !== undefined) agent.name = name;
        if (phone !== undefined) agent.phone = phone;
        if (isAvailable !== undefined) agent.isAvailable = isAvailable;

        await agent.save();

        return res.status(200).send({ message: "Delivery agent updated", agent });
    } catch (error) {
        console.log("Error updating delivery agent:", error);
        return res.status(500).send({ message: "Error updating delivery agent", error });
    }
};

module.exports = { update_delivery_agent_controller };