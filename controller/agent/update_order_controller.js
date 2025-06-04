const { Order } = require("../../models/user_service_schema");

const allowedAgentStatuses = ['delivering', 'delivered', 'cancelled'];

const update_order_controller = async (req, res) => {
    try {
        const { order_id, status } = req.body;
        if (!order_id || !allowedAgentStatuses.includes(status))
            return res.status(400).send({ message: "Invalid order_id or status" });

        const order = await Order.findByIdAndUpdate(
            order_id,
            { status },
            { new: true }
        );
        if (!order) return res.status(404).send({ message: "Order not found" });

        res.status(200).send({ message: "Order status updated", order });
    } catch (error) {
        res.status(500).send({ message: "Error updating order status", error });
    }
};

module.exports = { update_order_controller };