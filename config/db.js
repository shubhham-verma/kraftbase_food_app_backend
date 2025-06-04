const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const mongo_url = process.env.MONGO_URI;

const connect_db = async () => {
    try {

        await mongoose.connect(mongo_url);
        console.log(`Connected to MongoDB at: ${mongoose.connection.host}`);

    } catch (error) {
        console.log("Error in connecting to the db: ", error);
    }
}

module.exports = connect_db;