import { acadimicDepertment } from './../acadimicDipartment/acadimicDepertment.validaction';
import { SemesterRegistrationModel } from './../samesterRagistactoin/smesterRagistaction.model';
import { OfferedCourseModel } from './OfferedCourse.model';
import AppError from '../../error/apperror';
import { AcadimicFucaltyModel } from '../acadimicFaculty/acadimic.Faculty.model';
import { AcadimicDepertmentModel } from '../acadimicDipartment/acadimic.Depertment.model';
import { TOfferedCourse } from './OfferedCourse.interfaces';
import { CourseModel, FacultyModel } from '../Course/couse.model';
import httpStatus from 'http-status';

const createOfferedCourseIntoDB = async (paylod: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
    section,
  } = paylod;

  const isSamesterRagistaction =
    await SemesterRegistrationModel.findById(semesterRegistration);
  if (!isSamesterRagistaction) {
    throw new AppError(httpStatus.NOT_FOUND, 'semister Ragistaction Not Found');
  }

  const acadimicSamester = isSamesterRagistaction.academicSemester;
  const isacademicFaculty =
    await AcadimicFucaltyModel.findById(academicFaculty);
  if (!isacademicFaculty) {
    throw new AppError(httpStatus.NOT_FOUND, 'Acadimic Faculty Not Found');
  }
  const isacademicDepartment =
    await AcadimicDepertmentModel.findById(academicDepartment);
  if (!isacademicDepartment) {
    throw new AppError(httpStatus.NOT_FOUND, 'Depertment Not Found');
  }
  const isCourse = await CourseModel.findById(course);
  if (!isCourse) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course Not Found');
  }
  const isFaculty = await FacultyModel.findById(faculty);
  if (!isFaculty) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty Not Found');
  }
  console.log(acadimicDepertment);

  const isDepertmentBelongtoFaculty = await AcadimicDepertmentModel.findOne({
    _id: academicDepartment,
    acadimicFaculty: academicFaculty,
  });
  if (!isDepertmentBelongtoFaculty) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Faculty ${(isacademicFaculty.name.firstName, isacademicFaculty.name.lastName)} And depertment ${isacademicDepartment.name} Not Match `,
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

  const result = await OfferedCourseModel.create({
    ...paylod,
    acadimicSamester,
  });
  return result;
};

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
  // getAllOfferedCoursesFromDB,
  // getSingleOfferedCourseFromDB,
  // deleteOfferedCourseFromDB,
  // updateOfferedCourseIntoDB,
};
