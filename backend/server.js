import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto"
import bcrypt from "bcrypt"

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/project-auth";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();
const listEndpoints = require('express-list-endpoints')

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.json(listEndpoints(app));
});

const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex")
  }
})

const User = mongoose.model("User", UserSchema)

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const salt = bcrypt.genSaltSync()
    if (password.length < 5) {
      res.status(400).json({
        success: false,
        response: "Password must be at least 5 characters long"
      })
    } else {
      const newUser = await new User({ username: username, password: bcrypt.hashSync(password, salt)}).save()
    res.status(201).json({
      success: true,
      response: {
        username: newUser.username,
        id: newUser._id,
        accessToken: newUser.accessToken
      }
    }) }
  } catch (e) {
    res.status(400).json({
      success: false,
      response: e,
        message: "User already exist"
    })
  }
})

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({username: username})
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        success: true,
        response: {
          username: user.username,
          id: user._id,
          accessToken: user.accessToken
        }
      })
    } else {
      res.status(400).json({
        success: false,
        response: "Credentials do not match"
      })
    }
  }
  catch (e) {
    res.status(500).json({
      success: false,
      response: e
    })
  }
})

app.delete("/user", async (req, res) => {
  const { _id } = req.body
  try {
    const user = await User.findOneAndDelete({_id})
    if (user) {
      res.status(200).json({
        success: true,
        response: "User deleted successfully."
      })
    } else {
      res.status(404).json({
        success: false,
        response: "User not found."
      })
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      response: e
    })
  }
})

const ThoughtsSchema = new mongoose.Schema ({
  message: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 500
  },
  hearts: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: () => new Date()
  },
  user: {
    type: String,
    required: true
  }
})

const Thoughts = mongoose.model("Thoughts", ThoughtsSchema)

const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization")
  try {
    const user = await User.findOne({accessToken: accessToken})
    if (user) {
      next()
    } else {
      res.status(401).json({
        success: false,
        response: "Please login"
      })
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      response: e
    })
  }
}

app.get("/thoughts", authenticateUser)
app.get("/thoughts", async (req, res) => {
  const accessToken = req.header("Authorization");
  const user = await User.findOne({accessToken: accessToken});
  const thoughts = await Thoughts.find({user: user._id});
  res.status(200).json({success: true, response: thoughts})
})

app.post("/thoughts", authenticateUser)
app.post("/thoughts", async (req, res) => {
  const { message, username } = req.body
  const accessToken = req.header("Authorization")
  const user = await User.findOne({accessToken: accessToken})

  const thoughts = await new Thoughts({message: message, user: user._id}).save()
  res.status(200).json({success: true, response: thoughts, username})
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
