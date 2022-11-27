const mongoose = require('mongoose');
const subscriptionSchema = new mongoose.Schema({
    subscribed:  { type: String, required: true}
}); 
module.exports = mongoose.model('Subscription', subscriptionSchema,'subscriptions');
