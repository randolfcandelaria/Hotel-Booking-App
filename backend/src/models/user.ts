import mongoose from "mongoose"; // Importing mongoose library for MongoDB interactions
import bcrypt from "bcryptjs"; // Importing bcrypt library for password hashing

// Define the structure of the user data
export type UserType = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

// Define a mongoose schema for the user data
const userSchema = new mongoose.Schema({
  email: { type: String , required: true , unique: true }, // Email field with required and unique constraints
  password: { type: String , required: true }, // Password field with required constraint
  firstName: { type: String , required: true }, // First name field with required constraint
  lastName: { type: String , required: true }, // Last name field with required constraint
});

// Middleware to hash the password before saving it to the database
userSchema.pre("save", async function (next) {
    if(this.isModified('password')){ // Check if the password field is modified
        this.password = await bcrypt.hash(this.password , 8); // Hash the password using bcrypt
    }
    next(); // Call the next middleware in the chain
});

// Create a mongoose model for the user data based on the schema
const User = mongoose.model<UserType>("User" , userSchema);

// Export the User model
export default User;
