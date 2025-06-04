const { Menu } = require("../../models/restaurant_service_schema");

const get_all_menus_controller = async (req, res) => {
    try {
        const menus = await Menu.find();
        res.status(200).send({ menus });
    } catch (error) {
        res.status(500).send({ message: "Error fetching menus", error: error });
    }
};

module.exports = { get_all_menus_controller };