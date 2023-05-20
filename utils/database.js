import mongoose from "mongoose";

let isConnected = false; //connection tracking

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDb is alerady connected!");
    return true;
  } else {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        dbName: "users",
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      isConnected = true;
      console.log("Mongodb is connected!");
    } catch (error) {
      console.log(error);
    }
  }
};
