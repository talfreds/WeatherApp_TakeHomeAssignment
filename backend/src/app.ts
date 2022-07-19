import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

const app = express();

// MIDDLEWARE
export const corsOptions = {
  origin: [
    "https://studio.apollographql.com",
    "http://localhost:3000",
    // "http://demo-tyler.s3-website-us-west-2.amazonaws.com",
    // "http://d3tnc1tugh84wu.cloudfront.net",
    "http://ec2-3-15-41-228.us-east-2.compute.amazonaws.com",
    // "*",
  ],
  credentials: true,
};
app.use(cookieParser());
app.use(cors(corsOptions));

export default app;
