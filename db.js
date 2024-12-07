import { connect, model, Schema } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Database connected successfully"))
  .catch((error) => console.error("Database connection failed:", error));

const employeeSchema = new Schema({
  name: {
    type: String,
    require: [true, "Please add a name"],
  },
  email: {
    type: String,
    require: [true, "Please add an email"],
    unique: true,
    lowercase: true,
  },
  position: {
    type: String,
  },
  password: {
    type: String,
    require: [true, "Please add a password"],
  },
});

const Employee = model("Employee", employeeSchema);

export default {
  Employee,
};
