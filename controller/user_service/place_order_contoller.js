
const { User, Order } = require("../../models/user_service_schema");
const { Restaurant, Menu } = require("../../models/restaurant_service_schema")
const { DeliveryAgent } = require("../../models/delivery_agent_service_schema");

const place_order_controller = async (req, res) => {
    try {

        const { user_id, restaurant_id, menu } = req.body;

        // console.log(user_id, restaurant_id, menu);

        if (!user_id || !restaurant_id || !menu)
            return res.status(500).send({ message: "please provide all details" })

        const user = await User.findById(user_id);
        const restaurant = await Restaurant.findById(restaurant_id);

        console.log(user, restaurant);

        if (!user || !restaurant)
            return res.status(500).send({ message: "User or Restaurant deos not exist" })

        const deliveryAgent = await DeliveryAgent.findOne({ isAvailable: true });

        if (!deliveryAgent) {
            return res.status(400).send({ message: "Cannot place order: No delivery agent available" });
        }


        const order = await Order.create({
            user: user_id,
            restaurant: restaurant_id,
            items: menu,
            // total_price,
            status: "placed",
            placedAt: new Date(),
            deliveryAgent: deliveryAgent._id
        });

        deliveryAgent.isAvailable = false;
        deliveryAgent.currentOrder = order._id;
        await deliveryAgent.save();

        res.status(201).send({ message: "Order placed", order });

    } catch (error) {
        console.log("Error occured: ", error);
        return res.status(500).send({
            // status: 500,
            message: `Error in placing order: ${error}`
        });
    }
}


module.exports = { place_order_controller }
