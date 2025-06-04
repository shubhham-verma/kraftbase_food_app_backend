const { default: mongoose } = require("mongoose");

// User Schema
const UserSchema = new mongoose.Schema({
    user_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String },
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
}, { timestamps: true });

// Order Schema
const OrderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
    items: [{
        menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
        quantity: Number
    }],
    // totalPrice: Number,
    status: { type: String, enum: ['placed', 'accepted', 'rejected', 'preparing', 'delivering', 'delivered', 'cancelled'], default: 'placed' },
    deliveryAgent: { type: mongoose.Schema.Types.ObjectId, ref: 'DeliveryAgent' },
    placedAt: { type: Date, default: Date.now }
});

// Rating Schema
const RatingSchema = new mongoose.Schema({
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
    deliveryAgent: { type: mongoose.Schema.Types.ObjectId, ref: 'DeliveryAgent' },
    order_rating: { type: mongoose.Types.Decimal128 },
    agent_rating: { type: mongoose.Types.Decimal128 },
    restaurant_rating: { type: mongoose.Types.Decimal128 },
    comment: String,
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);
const Order = mongoose.model('Order', OrderSchema);
const Rating = mongoose.model('Rating', RatingSchema);

module.exports = { User, Order, Rating };
