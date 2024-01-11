import { Request, Response } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import projectModel from "../model/projectModel";
import userModel from "../model/userModel";
import { Types } from "mongoose";
import staffModel from "../model/staffModel";

export const createStaff = async (req: Request, res: Response) => {
  try {
    const { staffName, avatar } = req.body;

    const { userID } = req.params;

    const staff = await staffModel.create({
      staffName,
      avatar,
    });

    const user = await userModel.findById(userID);

    user?.staff.push(new Types.ObjectId(staff._id));
    user?.save();

    return res.status(201).json({
      msg: "staff created",
      data: staff,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getStaff = async (req: Request, res: Response) => {
  try {
    const { staffName, avatar } = req.body;

    const { userID } = req.params;

    const staff = await staffModel.find();

    return res.status(201).json({
      msg: "staff created",
      data: staff,
    });
  } catch (error) {
    console.log(error);
  }
};
