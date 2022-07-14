const mongoose = require("mongoose");

async function connectMongoDB() {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

mongoose.connection.once("open", () => console.log("mongoDB is connected..."));
mongoose.connection.on("error", (error) => console.log("error", error));

module.exports = connectMongoDB;
