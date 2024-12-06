import { Types } from 'mongoose';

export type TAcadimicDepertment = {
  name: string;
  acadimicFaculty: Types.ObjectId;
};
