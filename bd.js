import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://230389:devluvme@clusterluvme.fwvno.mongodb.net/API-AWI40-230389?retryWrites=true&w=majority&appName=ClusterLuvme");
    console.log("Conectado a MongoDB Atlas");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
  }
};

export default connectDB;