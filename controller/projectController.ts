import { Request, Response } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import projectModel from "../model/projectModel";
import userModel from "../model/userModel";
import { Types } from "mongoose";

export const createProject = async (req: Request, res: Response) => {
  try {
    const { projectName, comment } = req.body;
    console.log(projectName);

    const { userID } = req.params;

    const project = await projectModel.create({
      projectName,
      comment,
      myTask: {
        todo: {
          id: "todo",
          data: [],
        },
        progress: {
          id: "progress",
          data: [],
        },
        done: {
          id: "done",
          data: [],
        },
      },
    });

    const user = await userModel.findById(userID);

    user?.project.push(new Types.ObjectId(project._id));
    user?.save();

    return res.status(201).json({
      msg: "project created",
      data: project,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getProjects = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;

    const user = await userModel.findById(userID).populate({
      path: "project",
    });

    return res.status(201).json({
      msg: "project created",
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getOneProject = async (req: Request, res: Response) => {
  try {
    const { projectID } = req.params;
    const project = await projectModel.findById(projectID);

    return res.status(201).json({
      msg: "project created",
      data: project,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getProjectTask = async (req: Request, res: Response) => {
  try {
    const { projectID } = req.params;
    const project = await projectModel.findById(projectID).populate({
      path: "task",
    });

    return res.status(201).json({
      msg: "project created",
      data: project,
    });
  } catch (error) {
    console.log(error);
  }
};
