import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { clerkClient } from "@clerk/express";
import userRouter from "./src/Routes/user.routes.js";
const app = express();
const PORT = process.env.PORT || 5000;




app.use(cors()); 
app.use(express.json()); 
// app.use(ClerkExpressWithAuth());

app.get("/", (req, res) => {
  res.json({ message: "✅ Server is running successfully!" });
});

app.use("/api/users", userRouter)

// app.get("/api/user", async (req, res) => {
//     const getuser = await clerkClient.users.getUserList();
//   res.json(
//    getuser
//   );
// });


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
