import mongoose from "mongoose";

const connectDB = async () => {
  const connectionString =
    process.env.NODE_ENV !== "production"
      ? process.env.LOCAL_MONGO_URI
      : process.env.LIVE_MONGO_URI;

  mongoose.set("strictQuery", false);
  return (
    mongoose
      .connect(connectionString)
      // .connect(connectionString, {
      //   // @ts-ignore
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
      //   useFindAndModify: false,
      //   useCreateIndex: true,
      // })
      .then(() => {
        // console.log("DB Connection Successful");
      })
      // Check this later
      .catch((err) => console.error(err))
  );
};

export default connectDB;
