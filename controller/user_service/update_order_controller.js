const { Order } = require("../../models/user_service_schema");
const { Menu } = require("../../models/restaurant_service_schema");

const update_order_controller = async (req, res) => {
    try {
        const { order_id, new_items } = req.body;
        if (!order_id || !Array.isArray(new_items) || new_items.length === 0)
            return res.status(400).send({ message: "order_id and new_items are required" });

        const items = await Promise.all(new_items.map(async item => {
            const menuItem = await Menu.findById(item.menu_id);
            if (!menuItem) return null;
            return { menuItem: menuItem._id, quantity: item.quantity || 1 };
        }));
        const filteredItems = items.filter(Boolean);
        if (filteredItems.length === 0)
            return res.status(400).send({ message: "No valid menu items found" });

        const order = await Order.findByIdAndUpdate(
            order_id,
            { items: filteredItems },
            { new: true }
        );
        if (!order) return res.status(404).send({ message: "Order not found" });

        res.status(200).send({ message: "Order items updated", order });
    } catch (error) {
        res.status(500).send({ message: "Error updating order items", error });
    }
};

module.exports = { update_order_controller };