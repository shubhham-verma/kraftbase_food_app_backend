const { Restaurant } = require("../../models/restaurant_service_schema");

const add_restaurant_controller = async (req, res) => {
    try {
        const { name, address, phone, isOnline, openHours } = req.body;

        if (!name || !address || !phone || !openHours) {
            return res.status(400).send({ message: "Please provide name, address, phone, and openHours" });
        }

        const restaurant = await Restaurant.create({
            name,
            address,
            phone,
            isOnline: isOnline ?? false,
            openHours
        });

        return res.status(201).send({ message: "Restaurant created", restaurant });
    } catch (error) {
        console.log("Error adding restaurant:", error);
        return res.status(500).send({ message: "Error adding restaurant", error: error });
    }
};

module.exports = { add_restaurant_controller };