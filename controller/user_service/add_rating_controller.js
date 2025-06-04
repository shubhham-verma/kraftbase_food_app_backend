const { User, Order, Rating } = require("../../models/user_service_schema");
const { Restaurant } = require("../../models/restaurant_service_schema");
const { DeliveryAgent } = require("../../models/delivery_agent_service_schema");

const add_rating_controller = async (req, res) => {
    try {
        const { user_id, order_id, order_rating, agent_rating, restaurant_rating, comment } = req.body;

        if (!user_id || !order_id)
            return res.status(400).send({ message: "Please provide User ID and Order ID" });

        // Validate user and order
        const user = await User.findById(user_id);
        const order = await Order.findById(order_id);
        if (!user) return res.status(404).send({ message: "User not found" });
        if (!order) return res.status(404).send({ message: "Order not found" });

        let final_message = "";
        let flag = false;

        // Rate Restaurant
        if (restaurant_rating !== undefined && order.restaurant) {
            const restaurant = await Restaurant.findById(order.restaurant);
            if (restaurant) {
                restaurant.total_rating_sum = (restaurant.total_rating_sum || 0) + restaurant_rating;
                restaurant.total_rating_count = (restaurant.total_rating_count || 0) + 1;
                restaurant.rating = (restaurant.total_rating_sum / restaurant.total_rating_count).toFixed(1);
                await restaurant.save();
                final_message += `Restaurant rating updated: ${restaurant.rating}. `;
                flag = true;
            }
        }

        // Rate Delivery Agent
        if (agent_rating !== undefined && order.deliveryAgent) {
            const agent = await DeliveryAgent.findById(order.deliveryAgent);
            if (agent) {
                agent.total_rating_sum = (agent.total_rating_sum || 0) + agent_rating;
                agent.total_rating_count = (agent.total_rating_count || 0) + 1;
                agent.rating = (agent.total_rating_sum / agent.total_rating_count).toFixed(1);
                await agent.save();
                final_message += `Delivery agent rating updated: ${agent.rating}. `;
                flag = true;
            }
        }

        // Rate Order
        if (order_rating !== undefined) {
            order.total_rating_sum = (order.total_rating_sum || 0) + order_rating;
            order.total_rating_count = (order.total_rating_count || 0) + 1;
            order.rating = (order.total_rating_sum / order.total_rating_count).toFixed(1);
            await order.save();
            final_message += `Order rating updated: ${order.rating}. `;
            flag = true;
        }

        // Save Rating document
        if (flag) {
            const ratingDoc = await Rating.create({
                order: order_id,
                user: user_id,
                restaurant: order.restaurant,
                deliveryAgent: order.deliveryAgent,
                order_rating,
                agent_rating,
                restaurant_rating,
                comment
            });

            return res.status(200).send({ message: final_message, rating: ratingDoc });
        }
        else {
            return res.status(200).send({ message: "No rating provided" });

        }


    } catch (error) {
        console.log("Error occured: ", error);
        return res.status(500).send({
            message: `Error in adding rating: ${error}`
        });
    }
};

module.exports = { add_rating_controller };