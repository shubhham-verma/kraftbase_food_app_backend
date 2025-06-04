const { DeliveryAgent } = require("../../models/delivery_agent_service_schema");

const add_delivery_agent_controller = async (req, res) => {
    try {
        const { name, phone } = req.body;
        if (!name || !phone) return res.status(400).send({ message: "Name and phone are required" });

        const agent = await DeliveryAgent.create({
            name,
            phone,
            isAvailable: true,
            rating: 0,
            total_rating_sum: 0,
            total_rating_count: 0,
            currentOrder: null
        });

        return res.status(201).send({ message: "Delivery agent added", agent });
    } catch (error) {
        console.log("Error adding delivery agent:", error);
        return res.status(500).send({ message: "Error adding delivery agent", error });
    }
};

module.exports = { add_delivery_agent_controller };