// const { User } = require("../../models/user_service_schema");
const { Restaurant } = require("../../models/restaurant_service_schema")
// const bcrypt = require('bcrypt') 

const get_online_restaurant_controller = async (req, res) => {
    try {

        const time = req.query.hour;
        if (!time) return res.status(400).send({ message: "Please provide valid time range" });

        // console.log("qurey time: ", time);
        const sample = await Restaurant.findOne();
        // console.log("Sample restaurant:", sample);
        // Find restaurants 
        const restaurants = await Restaurant.find({
            isOnline: true,
            openHours: {
                $elemMatch: {
                    start: { $lte: time },
                    end: { $gte: time }
                }
            }
        });

        res.status(200).send({ success: true, total: restaurants.length, restaurants });

    } catch (error) {
        console.log("Error occured: ", error);
        return res.status(500).send({
            // status: 500,
            message: `Error in getting restaurant list: ${error}`
        });
    }
}


module.exports = { get_online_restaurant_controller }
