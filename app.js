import "dotenv/config";
import express from 'express'
import Hello from "./hello.js"
import Lab5 from "./lab5.js";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import AssignmentRoutes from './assignments/routes.js';
import cors from "cors";
import mongoose from "mongoose";  // load the mongoose library
import UserRoutes from "./users/routes.js";
import session from "express-session";

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas-cs5610-fa23";
mongoose.connect(CONNECTION_STRING);
// mongoose.connect("mongodb://127.0.0.1:27017/kanbas-cs5610-fa23"); // connect to the kanbas database
// const express = require('express')
const app = express()
// app.get('/hello', (req, res) => {res.send('Life is good!')})
// app.get('/', (req, res) => {res.send('Welcome to Full Stack Development!')})
app.use(cors({
    credentials: true, // support cookies
    // origin: "http://localhost:3000",  // restrict cross origin resource sharing to the react application
    origin: process.env.FRONTEND_URL
}));

// app.use(
//     cors({
//       credentials: true,
//       origin: process.env.FRONTEND_URL
//     })
//   );  

const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
  };

if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
    };
  }

app.use(session(sessionOptions));
  

  
app.use(express.json());
UserRoutes(app);
AssignmentRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
Lab5(app);
Hello(app);
app.listen(process.env.PORT || 4000);