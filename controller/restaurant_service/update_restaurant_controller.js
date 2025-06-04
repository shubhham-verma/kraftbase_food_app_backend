const { Restaurant, Menu } = require("../../models/restaurant_service_schema");

const update_restaurant_controller = async (req, res) => {
    try {
        const { restaurant_id, isOnline, menu_updates } = req.body;

        if (!restaurant_id) {
            return res.status(400).send({ message: "restaurant_id is required" });
        }

        // Update restaurant's online/offline status
        const restaurant = await Restaurant.findById(restaurant_id);
        if (!restaurant) {
            return res.status(404).send({ message: "Restaurant not found" });
        }

        if (typeof isOnline === "boolean") {
            restaurant.isOnline = isOnline;
        }

        // Update menu items if provided
        if (Array.isArray(menu_updates)) {
            for (const item of menu_updates) {
                // item: { menu_id, name, price, available }
                if (!item.menu_id) continue;
                const menuItem = await Menu.findById(item.menu_id);
                if (menuItem) {
                    if (item.name !== undefined) menuItem.name = item.name;
                    if (item.price !== undefined) menuItem.price = item.price;
                    if (item.available !== undefined) menuItem.available = item.available;

                    menuItem.restaurant = restaurant_id;
                    await menuItem.save();
                    restaurant.menu.push(menuItem);
                    await restaurant.save();
                }
                else
                    return res.status(500).send({ message: "Menu item not found" });
            }
        }

        await restaurant.save();

        res.status(200).send({ message: "Restaurant updated successfully", restaurant });
    } catch (error) {
        console.log("Error updating restaurant:", error);
        res.status(500).send({ message: "Error updating restaurant", error });
    }
};

module.exports = { update_restaurant_controller };