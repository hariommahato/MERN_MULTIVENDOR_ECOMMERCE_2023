const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.DB_URL, {
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(
        `MongoDb Connected With Server Success ${data.connection.host}`
      );
    })
};

module.exports = connectDatabase;
