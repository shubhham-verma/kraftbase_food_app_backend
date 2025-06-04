const { Menu } = require("../../models/restaurant_service_schema");

const update_menu_controller = async (req, res) => {
    try {
        const { menu_id, name, price, available, description } = req.body;

        if (!menu_id) return res.status(400).send({ message: "menu_id is required" });

        const menuItem = await Menu.findById(menu_id);
        if (!menuItem) return res.status(404).send({ message: "Menu item not found" });

        if (name !== undefined) menuItem.name = name;
        if (price !== undefined) menuItem.price = price;
        if (available !== undefined) menuItem.available = available;
        if (description !== undefined) menuItem.description = description;

        await menuItem.save();

        return res.status(200).send({ message: "Menu item updated", menuItem });
    } catch (error) {
        console.log("Error updating menu:", error);
        return res.status(500).send({ message: "Error updating menu", error });
    }
};

module.exports = { update_menu_controller };