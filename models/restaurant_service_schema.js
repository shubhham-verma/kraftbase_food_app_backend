const { default: mongoose } = require("mongoose");

// Restaurant Schema
const RestaurantSchema = new mongoose.Schema({
    name: { type: String },
    address: { type: String },
    phone: { type: String },
    isOnline: { type: Boolean, default: false },
    openHours: [{ start: String, end: String }], // e.g., [{start: "09:00", end: "22:00"}]
    menu: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' }],
    rating: { type: Number },
    total_rating_sum: { type: Number },
    total_rating_count: { type: Number }
});

// Menu Item Schema
const MenuItemSchema = new mongoose.Schema({
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    available: { type: Boolean, default: true },
    rating: { type: Number },
    total_rating_sum: { type: Number },
    total_rating_count: { type: Number }
});

const Restaurant = mongoose.model('Restaurant', RestaurantSchema);
const Menu = mongoose.model('Menu', MenuItemSchema);

module.exports = { Restaurant, Menu };