const { default: mongoose } = require("mongoose");

// Delivery Agent Schema
const DeliveryAgentSchema = new mongoose.Schema({
    name: { type: String },
    phone: { type: String },
    isAvailable: { type: Boolean, default: true },
    currentOrder: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', default: null },
    rating: { type: mongoose.Types.Decimal128 },
    total_rating_sum: { type: Number },
    total_rating_count: { type: Number }
});

// Delivery Status can be tracked in the Order schema's `status` field.

const DeliveryAgent = mongoose.model('DeliveryAgent', DeliveryAgentSchema);

module.exports = { DeliveryAgent };