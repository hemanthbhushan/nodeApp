import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import minersLoginSchema from "../schema/minersLoginSchema";

class SignUpApi {
  public async minerSignUp(req: Request, res: Response) {
    try {
      const { accountAddress, password } = req.body;

      const existingUser = await minersLoginSchema.findOne({ accountAddress });

      if (existingUser) {
        return res.status(200).json({
          message: "alreadySignedUp",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await minersLoginSchema.create({
        accountAddress,
        password: hashedPassword,
      });

      res.status(200).json({
        message: "SignedUp",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: "An error occurred while processing the request.",
      });
    }
  }

  public async minerLogin(req: Request, res: Response) {
    try {
      const { accountAddress, password } = req.body;

      const user = await minersLoginSchema.findOne(
        { accountAddress },
        "password"
      );
      console.log(user,"user")

      if (!user) {
        return res.status(200).json({
          message: "Need to Sign Up",
        });
      }

      const isMatch = await bcrypt.compare(password, String(user.password));

      if (isMatch) {
        res.status(200).json({
          message: "Logged In",
        });
      } else {
        res.status(200).json({
          message: "Invalid Credentials",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: "An error occurred while processing the request.",
      });
    }
  }
}

export default new SignUpApi();
