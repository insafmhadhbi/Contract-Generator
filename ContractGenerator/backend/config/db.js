// Importing required modules and libraries
import mongoose from "mongoose";
// import colors from "colors";

// Function to connect to MongoDB database
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);

    // Log success message if connection is established
    console.log(
      `Connected to MongoDB Database ${conn.connection.host}`.bgMagenta.white
    );
  } catch (error) {
    // Log error message if connection fails
    console.log(`Error in MongoDB connection: ${error}`.bgRed.white);
  }
};

export default connectDB;
