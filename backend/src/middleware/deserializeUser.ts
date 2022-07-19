import { AuthenticationError, ForbiddenError } from "apollo-server-core";
import { Request } from "express";
import errorHandler from "../controllers/error.controller";
import UserModel from "../models/user.model";
import redisClient from "../utils/connectRedis";
import { verifyJwt } from "../utils/jwt";

const deserializeUser = async (req: Request) => {
  try {
    let access_token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      access_token = req.headers.authorization.split(" ")[1];
    }
    // else if (req.cookies?.access_token) {              // no longer used, original implementation
    //   const { access_token: token } = req.cookies;
    //   access_token = token;
    // }

    if (!access_token) throw new AuthenticationError("No access token found");

    const decoded = verifyJwt<{ userId: string }>(
      access_token,
      "accessTokenPublicKey"
    );

    if (!decoded) throw new AuthenticationError("Invalid access token");

    const session = await redisClient.get(decoded.userId);

    if (!session) throw new ForbiddenError("Session has expired");

    const user = await UserModel.findById(JSON.parse(session)._id).select(
      "+verified"
    );

    if (!user || !user.verified) {
      throw new ForbiddenError(
        "It appears your account no longer exists. Please contact an administrator."
      );
    }

    return user;
  } catch (error: any) {
    errorHandler(error);
  }
};

export default deserializeUser;
