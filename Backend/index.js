require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

const portNo= process.env.PORT;
const mongo_url = process.env.mongoURL;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose.connect(mongo_url, options)
    .then(() => console.log(`Mongoose connected on ${mongo_url}`))
    .catch((err) => console.log("Failed to connect to DB ", err));

app.listen(portNo, () => console.log("Server running on port", portNo));