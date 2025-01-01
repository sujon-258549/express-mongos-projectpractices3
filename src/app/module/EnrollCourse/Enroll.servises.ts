import { JwtPayload } from 'jsonwebtoken';
import { OfferedCourseModel } from '../OfferedCourse/OfferedCourse.model';
import AppError from '../../error/apperror';
import { Student } from '../student/student.model';
import EnrolledCourse from './Enroll.model';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { AcademicSamesterModel } from '../acedimicsamicter/acedimic.mode';
import { SemesterRegistrationModel } from '../samesterRagistactoin/smesterRagistaction.model';
import { CourseModel } from '../Course/couse.model';
import { TEnrolledCourse } from './Enroll.interfaces';
import { AcadimicFucaltyModel } from '../acadimicFaculty/acadimic.Faculty.model';
import { calculateGradeAndPoints } from './enrolledCourse.utils';

const createEnrollCourseIntoDB = async (paylod: string, token: JwtPayload) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const { userId } = token.JwtPayload;
    const { offeredCourse } = paylod;
    const isExistOfferCourse = await OfferedCourseModel.findById(offeredCourse);
    // console.log({ isExistOfferCourse });
    if (!isExistOfferCourse) {
      throw new AppError(httpStatus.NOT_FOUND, 'Course is Not found');
    }
    const isExisStudent = await Student.findOne({ id: userId }, { _id: 1 });
    if (!isExisStudent) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'User is not Authorize');
    }
    const isStudentAlradyEnroll = await EnrolledCourse.findOne({
      semesterRegistration: isExistOfferCourse.semesterRegistration,
      academicSemester: isExistOfferCourse.academicSemester,
      offeredCourse,
      student: isExisStudent._id,
    });
    if (isStudentAlradyEnroll) {
      throw new AppError(httpStatus.NOT_FOUND, 'Course is Alrady enrold');
    }
    if (isExistOfferCourse.maxCapacity <= 0) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Rum is Full');
    }

    const semisterRagistation = await SemesterRegistrationModel.findById(
      isExistOfferCourse.semesterRegistration,
    ); //.select('maxCredit');
    const maxCredit = Number(semisterRagistation?.maxCredit);
    // input inrol cradit
    const samesterRagistactionCradit = await CourseModel.findById(
      isExistOfferCourse.course,
    ); //.select('maxCredit');
    const inputCradits = samesterRagistactionCradit?.credits;

    const enrollCourse = await EnrolledCourse.aggregate([
      {
        $match: {
          semesterRegistration: isExistOfferCourse.semesterRegistration,
          student: isExisStudent._id, // Ensure this field exists and matches the schema
        },
      },
      {
        $lookup: {
          from: 'courses', // Replace with the actual collection name
          localField: 'course',
          foreignField: '_id',
          as: 'enrolcoursedata',
        },
      },
      {
        $unwind: '$enrolcoursedata',
      },
      {
        $group: {
          _id: null,
          totalCredits: { $sum: '$enrolcoursedata.credits' }, // Use correct path for credits
        },
      },
      {
        $project: {
          _id: 0,
          totalCredits: 1,
        },
      },
    ]);

    // console.log(enrollCourse);

    const totalCraditsNumber =
      enrollCourse.length > 0 ? enrollCourse[0].totalCredits : 0;

    const enrolCourseCrasitsAndNewEnrolCradits =
      inputCradits + totalCraditsNumber;

    if (
      totalCraditsNumber &&
      enrolCourseCrasitsAndNewEnrolCradits > maxCredit
    ) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Your Cradits is low');
    }
    console.log(totalCraditsNumber + inputCradits > maxCredit);
    const result = await EnrolledCourse.create(
      [
        {
          semesterRegistration: isExistOfferCourse.semesterRegistration,
          academicSemester: isExistOfferCourse.academicSemester,
          academicFaculty: isExistOfferCourse.academicFaculty,
          academicDepartment: isExistOfferCourse.academicDepartment,
          offeredCourse,
          course: isExistOfferCourse.course,
          student: isExisStudent._id,
          faculty: isExistOfferCourse.faculty,
        },
      ],
      { session },
    );

    await OfferedCourseModel.findByIdAndUpdate(
      offeredCourse,
      { maxCapacity: isExistOfferCourse.maxCapacity - 1 },
      { session },
    );
    if (!result) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Some Thing is Wrong');
    }
    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }
};

const updateEnrollCoutseIntoDB = async (
  paylod: Partial<TEnrolledCourse>,
  tokenData: JwtPayload,
) => {
  const { userId } = tokenData.JwtPayload;
  const { courseMarks, student, offeredCourse, semesterRegistration } = paylod;

  const isExistOfferCourse = await OfferedCourseModel.findById(offeredCourse);
  // console.log({ isExistOfferCourse });
  if (!isExistOfferCourse) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course is Not found');
  }
  const isExistSamesterRagistaction =
    await SemesterRegistrationModel.findById(semesterRegistration);
  // console.log({ isExistOfferCourse });
  if (!isExistSamesterRagistaction) {
    throw new AppError(httpStatus.NOT_FOUND, 'Samester is not found');
  }
  const isExistStudent = await Student.findById(student);
  // console.log({ isExistOfferCourse });
  if (!isExistStudent) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student is not match');
  }
  const isExistFaculty = await AcadimicFucaltyModel.findOne(
    { id: userId },
    { _id: 1 },
  );

  const isExistThisCourseAndThisFaculty = await EnrolledCourse.findOne({
    student: student,
    academicFaculty: isExistFaculty,
    offeredCourse,
  });
  // console.log({ isExistOfferCourse });
  if (!isExistThisCourseAndThisFaculty) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Faculty subject and Student subject not match',
    );
  }

  // modifide data
  const modifiedData: Record<string, unknown> = {
    ...courseMarks,
  };

  if (courseMarks?.finalTerm) {
    const { classTest1, classTest2, midTerm, finalTerm } =
      isExistThisCourseAndThisFaculty.courseMarks;

    const totalMarks =
      Math.ceil(classTest1 * 0.1) +
      Math.ceil(midTerm * 0.3) +
      Math.ceil(classTest2 * 0.1) +
      Math.ceil(finalTerm * 0.5);

    const result = calculateGradeAndPoints(totalMarks);
    modifiedData.grade = result.grade;
    modifiedData.gradePoints = result.gradePoints;
    modifiedData.isCompleted = true;

    if (modifiedData && Object.keys(modifiedData).length) {
      for (const [kye, value] of Object.entries(modifiedData)) {
        modifiedData[`${kye}`] = value;
      }
    }

    const resul = await EnrolledCourse.findByIdAndUpdate(
      isExistThisCourseAndThisFaculty._id,
      modifiedData,
      { new: true },
    );

    return resul;
  }
};

export const EnrollCourseServises = {
  createEnrollCourseIntoDB,
  updateEnrollCoutseIntoDB,
};
