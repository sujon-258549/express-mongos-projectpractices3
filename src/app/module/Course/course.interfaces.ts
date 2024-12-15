import { Types } from 'mongoose';

export type TPreRepositeCourse = {
  course: Types.ObjectId;
  isDeleted: boolean;
};

export type Tcourses = {
  title: string;
  prifix: string;
  cod: number;
  credits: number;
  isDeleted: boolean;
  preRepusiteCousere: TPreRepositeCourse[];
};

export type TCourseFaculty = {
  corses: Types.ObjectId;
  facultys: [Types.ObjectId];
};
