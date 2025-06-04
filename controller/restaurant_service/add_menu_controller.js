const { Menu, Restaurant } = require("../../models/restaurant_service_schema");


const add_menu_controller = async (req, res) => {
    try {

        const { name, description, price, available, restaurant_id } = req.body;


        if (!restaurant_id) return res.status(500).send({ message: "Please provide Restaurant id" });

        const restaurant = await Restaurant.findById(restaurant_id);

        if (!restaurant) return res.status(500).send({ message: "Restaurant not found" });

        if (isNaN(price)) return res.status(500).send({ message: "Price must be a number" });


        const menu_item = await Menu.create({
            name,
            description,
            price,
            available,
            restaurant: restaurant_id,
            rating: 0,
            total_rating_count: 0,
            total_rating_sum: 0
        });

        // const id = menu_item._id;
        // console.log(id);
        restaurant.menu.push(menu_item._id);
        await restaurant.save();


        return res.status(200).send({ message: "Menu item has been created", menu_item });


    } catch (error) {
        console.log("Error occured: ", error);
        return res.status(500).send({
            // status: 500,
            message: `Error in adding menu item`,
            error: error
        });
    }
}


module.exports = { add_menu_controller }
