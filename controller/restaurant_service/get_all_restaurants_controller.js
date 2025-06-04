const { Restaurant } = require("../../models/restaurant_service_schema");

const get_all_restaurants_controller = async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.status(200).send({ restaurants });
    } catch (error) {
        res.status(500).send({ message: "Error fetching restaurants", error });
    }
};

module.exports = { get_all_restaurants_controller };