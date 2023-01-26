import { connect,set } from "mongoose";

const connectDB = async () => {
  try {
    set('strictQuery',false)
    const conn = await connect(process.env.MONGO_URI);
    console.log(`Connected to MongoDB ${conn.connection.host}`);
  } catch (error) {
    console.error(`Unable to connect to MongoDB ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
