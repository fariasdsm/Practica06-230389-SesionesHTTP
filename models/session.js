import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  nickname: { type: String, required: true },
  macAddress: { type: String, required: true },
  ip: { type: String, required: true },
  serverIp: { type: String, required: true },
  serverMacAddress: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  lastAccessedAt: { type: Date, default: Date.now },
  status: { 
    type: String, 
    enum: ["Activa", "Inactiva", "Finalizada por el Usuario", "Finalizada por Falla de Sistema"], 
    default: "Activa" 
  },
});

export default mongoose.model("Session", sessionSchema);
