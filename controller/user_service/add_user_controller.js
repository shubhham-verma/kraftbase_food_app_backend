const {User} = require("../../models/user_service_schema");
const bcrypt = require('bcrypt') 

const add_user_controller = async (req, res) => {
    try {

        const { user_name, email, password, address } = req.body;

        // console.log("Printing req body: ", req.body);
        //validate the data
        if (!user_name) return res.status(500).send({ message: "Please provide User Name" });
        else if (!email) return res.status(500).send({ message: "Please provide Email" });
        else if (!password) return res.status(500).send({ message: "Please provide Password" });

        //check existing user
        const existing_user = await User.findOne({ email })

        // console.log("printing existing user: ", existing_user);

        if (existing_user) return res.status(500).send({ message: "User already exists, please use another email" });

        var salt = bcrypt.genSaltSync(10);
        const encrypted_password =await bcrypt.hash(password, salt);

        const user = await User.create({
            user_name,
            email,
            password: encrypted_password,
            address
        });


        return res.status(200).send({ message: "User has been created" });


    } catch (error) {
        console.log("Error occured: ", error);
        return res.status(500).send({
            // status: 500,
            message: `Error in adding user: ${error}`
        });
    }
}


module.exports = { add_user_controller }
