import { Request, Response } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import userModel from "../model/userModel";
import projectModel from "../model/projectModel";
import taskModel from "../model/taskModel";

export const createTask = async (req: Request, res: Response) => {
  try {
    const { taskTitle, email, task } = req.body;

    const user = await userModel.findOne({ email });
    const { projectID, userID } = req.params;
    const mainUser = await userModel.findById(userID);

    const project: any = await projectModel.findById(projectID);
    if (user) {
      project?.staff.push(user);
    }

    if (project) {
      const tasks = await taskModel.create({
        taskTitle,
        task,
        projectName: project.projectName,
      });

      mainUser?.tasks.push(tasks);
      mainUser?.save();

      project?.task.push(tasks);
      project?.myTask?.todo?.data.push(task);
      project?.save();

      const projectTask = await projectModel.findByIdAndUpdate(
        projectID,
        project,
        { new: true }
      );

      return res.status(201).json({
        msg: "task created",
        data: projectTask,
      });
    } else {
      return res.status(404).json({
        msg: "Failed to find project",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;

    const tasks: any = await userModel.findById(userID).populate({
      path: "tasks",
    });

    return res.status(200).json({
      msg: "Getting tasks",
      data: tasks,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getOneTask = async (req: Request, res: Response) => {
  try {
    const { taskTitle } = req.body;
    const { taskID } = req.params;

    const tasks: any = await projectModel.findById(taskID);

    return res.status(200).json({
      msg: "Getting tasks",
      data: tasks,
    });
  } catch (error) {
    console.log(error);
  }
};
