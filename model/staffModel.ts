import { Document, Schema, Types, model } from "mongoose";

interface istaff {
  staffName: string;
  avatar: string;
  email: string;
  password: string;
  vToken: string;
  verified: boolean;
  task: Array<{}>;
  project: Array<{}>;
  staff: Array<{}>;
  plan: string;
}

interface iStaffData extends istaff, Document {}

const staffModel = new Schema<iStaffData>(
  {
    staffName: { type: String },
    avatar: { type: String },
    email: { type: String, unique: true },
  },
  { timestamps: true }
);

export default model<iStaffData>("staffs", staffModel);
