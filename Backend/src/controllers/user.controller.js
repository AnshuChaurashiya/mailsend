import { clerkClient } from "@clerk/express";


export const registerUser = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    // Create user via Clerk API
    const user = await clerkClient.users.createUser({
      emailAddress: [email],
      password,
      firstName,
      lastName,
    });

    res.status(201).json({
      success: true,
      message: "✅ User registered successfully!",
      user,
    });
  } catch (error) {
    console.error("❌ Registration Error:", error);
    res.status(400).json({
      success: false,
      message: "User registration failed.",
      error: error.errors || error.message,
    });
  }
};
