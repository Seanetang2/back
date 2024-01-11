import { Document, Schema, Types, model } from "mongoose";

interface iUser {
  userName: string;
  avatar: string;
  email: string;
  password: string;
  vToken: string;
  verified: boolean;
  tasks: Array<{}>;
  project: Array<{}>;
  staff: Array<{}>;
  plan: string;
}

interface iUserData extends iUser, Document {}

const userModel = new Schema<iUserData>(
  {
    userName: { type: String },
    avatar: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    plan: { type: String, default: "freemo" },
    vToken: { type: String },
    verified: { type: Boolean, default: false },
    project: [{ type: Types.ObjectId, ref: "projects" }],
    staff: [{ type: Types.ObjectId, ref: "staffs" }],
    tasks: [{ type: Types.ObjectId, ref: "tasks" }],
  },
  { timestamps: true }
);

export default model<iUserData>("users", userModel);
