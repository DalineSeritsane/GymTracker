require('dotenv').config();
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('MongoDB Connected!');
    } catch (err) {
        console.error('MongoDB Connection Error:', err);
         // Exit process with failure
    }
};

module.exports = connectDB;
