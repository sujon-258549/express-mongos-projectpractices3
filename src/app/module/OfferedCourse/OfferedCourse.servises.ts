import { FucaltyModel } from '../faculty/Faculty.model';
import { hasTimeConfilge } from './Offercourse.Utils';
import { SemesterRegistrationModel } from './../samesterRagistactoin/smesterRagistaction.model';
import { OfferedCourseModel } from './OfferedCourse.model';
import AppError from '../../error/apperror';
import { AcadimicDepertmentModel } from '../acadimicDipartment/acadimic.Depertment.model';
import { TOfferedCourse } from './OfferedCourse.interfaces';
import { CourseModel, CourseFaculty } from '../Course/couse.model';
import httpStatus from 'http-status';
import { AcademicFaculty } from '../Acadimic-faculty/academicFaculty.model';
import { JwtPayload } from 'jsonwebtoken';
import { Student } from '../student/student.model';

const createOfferedCourseIntoDB = async (paylod: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
    section,
    days,
    startTime,
    endTime,
  } = paylod;
  //   check Faculty have main hodel
  const isExistFaculty = await FucaltyModel.findById(faculty);
  if (!isExistFaculty) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty is notFaund');
  }
  //   chaeck damesteer ragistation
  const isSamesterRagistaction =
    await SemesterRegistrationModel.findById(semesterRegistration);
  if (!isSamesterRagistaction) {
    throw new AppError(httpStatus.NOT_FOUND, 'semister Ragistaction Not Found');
  }

  const acadimicSamester = isSamesterRagistaction.academicSemester;

  //   check acadimic
  const isacademicFaculty = await AcademicFaculty.findById(academicFaculty);
  if (!isacademicFaculty) {
    throw new AppError(httpStatus.NOT_FOUND, 'Acadimic Faculty Not Found');
  }
  //   check depertment
  const isacademicDepartment =
    await AcadimicDepertmentModel.findById(academicDepartment);
  if (!isacademicDepartment) {
    throw new AppError(httpStatus.NOT_FOUND, 'Depertment Not Found');
  }
  //   check course
  const isCourse = await CourseModel.findById(course);
  if (!isCourse) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course Not Found');
  }
  //   course include faculty id
  const isFaculty = await CourseFaculty.findById(course);
  if (!isFaculty?.facultys.includes(faculty)) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty Not Found');
  }

  const isDepertmentBelongtoFaculty = await AcadimicDepertmentModel.findOne({
    _id: academicDepartment,
    acadimicFaculty: academicFaculty,
  });
  if (!isDepertmentBelongtoFaculty) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Faculty ${(isExistFaculty.name.firstName, isExistFaculty.name.lastName)} And depertment ${isacademicDepartment.name} Not Match `,
    );
  }

  //   samester exis same samester not create section
  const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection =
    await OfferedCourseModel.findOne({
      semesterRegistration,
      course,
      section,
    });

  if (isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Offered course with same section is already exist!`,
    );
  }

  const assignSchedules = OfferedCourseModel.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  console.log(assignSchedules);
  const newSehedul = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConfilge(await assignSchedules, newSehedul)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `This faculty is not available at that time ! Choose other time or day`,
    );
  }

  paylod.academicSemester = acadimicSamester;

  //   10:20  -  11:20  after start time and befor end time
  // 10:00 - 11:00

  const result = await OfferedCourseModel.create({
    ...paylod,
  });
  return result;
};

const updateOfferedCourseIntoDB = async (
  id: string,
  paylod: Pick<TOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>,
) => {
  const { faculty, days, startTime, endTime } = paylod;
  const isExistOfferCourse = await OfferedCourseModel.findById(id);
  if (!isExistOfferCourse) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offer Course Notfound');
  }
  const isExistOfferCourseForFaculty = await FucaltyModel.findById(faculty);
  if (!isExistOfferCourseForFaculty) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found  !');
  }

  const semesterRegistration = isExistOfferCourse.semesterRegistration;

  const samesterRagistactionStatus =
    await SemesterRegistrationModel.findById(semesterRegistration);
  if (samesterRagistactionStatus?.status !== 'UPCOMING') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'You cannot update',
      samesterRagistactionStatus?.status,
    );
  }
  const assignSchedules = OfferedCourseModel.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');
  const newSehedul = {
    days,
    startTime,
    endTime,
  };
  if (hasTimeConfilge(await assignSchedules, newSehedul)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `This faculty is not available at that time ! Choose other time or day`,
    );
  }

  const result = await OfferedCourseModel.findByIdAndUpdate(id, paylod);
  return result;
};

const myOfferCourseIntoDB = async (token: JwtPayload) => {
  const { userId } = token.JwtPayload;
  //   find student id by student model
  const isExisbyStudent = await Student.findOne({ id: userId });
  if (!isExisbyStudent) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student is Not Found');
  }
  //   get current ongoing samester
  const ongoinSamester = await SemesterRegistrationModel.findOne({
    stasus: 'ONGOING',
  });
  return ongoinSamester;
};

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
  // getAllOfferedCoursesFromDB,             //code spale checker
  // getSingleOfferedCourseFromDB,
  // deleteOfferedCourseFromDB,
  updateOfferedCourseIntoDB,
  myOfferCourseIntoDB,
};
