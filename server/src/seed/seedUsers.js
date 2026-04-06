import bcrypt from "bcrypt";
import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "../modules/users/user.model.js";

dotenv.config();

const seedUsers = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not set");
  }

  await mongoose.connect(process.env.MONGO_URI);

  const seedData = [
    {
      name: "Admin",
      email: "admin@aquaveda.com",
      password: "admin123",
      role: "ADMIN"
    },
    {
      name: "Expert",
      email: "expert@aquaveda.com",
      password: "expert123",
      role: "EXPERT"
    }
  ];

  for (const item of seedData) {
    const hashedPassword = await bcrypt.hash(item.password, 10);

    await User.updateOne(
      { email: item.email },
      {
        $set: {
          name: item.name,
          role: item.role,
          password: hashedPassword,
          verified: true
        },
        $setOnInsert: {
          reputation: 0
        }
      },
      { upsert: true }
    );
  }

  console.log("Seed users ready: admin@aquaveda.com, expert@aquaveda.com");
};

seedUsers()
  .catch((error) => {
    console.error("Seed failed:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.connection.close();
  });
