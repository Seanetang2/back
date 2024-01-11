import { Application, Request, Response } from "express";
import userR from "./router/userRouter";
import userP from "./router/projectRouter";
import userT from "./router/taskRouter";
import userS from "./router/staffRouter";

export const mainApp = (app: Application) => {
  try {
    app.use("/api/v2", userR);
    app.use("/api/v2", userP);
    app.use("/api/v2", userT);
    app.use("/api/v2", userS);

    app.get("/", (req: Request, res: Response) => {
      try {
        return res.status(200).json({
          msg: "Welcome to my API",
        });
      } catch (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
