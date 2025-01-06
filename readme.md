<!-- //basick setap -->
<!-- start projetct setap   -->

npm install mongoose --save
npm install express
npm install typescript --save-dev

<!-- env -->

npm i dotenv

<!-- cors -->

npm i cors

<!-- setap typescript exlint prettier -->

typescript eslint prettier setup

<!-- fris eslint commant -->

npx eslint --init

<!-- importernt link -->

https://www.facebook.com/MSI.NAHIN/videos/908806490911910?idorvanity=1617365348819921
https://dev.to/shafayat/-express-typescript-eslint-prettiersetup-5fhg

<!-- ts node dev -->

ts-node-dev --respawn --transpile-only server.ts

<!-- Rafarensomg use populate -->

Rafarensomg use populate

<!-- acid propraty -->

acid propraty

<!-- sransection -->

import mongoose from 'mongoose';
import config from '../../config';
import { AcademicModel } from '../acedimicsamicter/acedimic.mode';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interfaces';
import { UserModel } from './user.model';
import { genaretStudentId } from './user.utility';

const createUserServerDB = async (password: string, payload: TStudent) => {
// console.log(repit_students);

const userData: Partial<TUser> = {};

<!-- password conging -->

userData.password = password || (config.defult_passwoed as string);

//role ser
userData.role = 'student';

// Fetch the academic semester for admission
const admissionSemester = await AcademicModel.findById(
payload.admitionSamester,
);
if (!admissionSemester) {
throw new Error('Admission semester not found');
}

// Generate a unique student ID

// step =>1
const session = await mongoose.startSession();
try {
// step 2
session.startTransaction();
userData.id = await genaretStudentId(admissionSemester);

    //   step >user data
    const newUser = await UserModel.create([userData], { session }); // use session
    //create a student
    if (newUser.length) {
      //   studentData.id = newUser.id;
      payload.user = newUser[0]._id;
    }

    const newStudent = await Student.create([payload], { session });

    //   commit sesson
    await session.commitTransaction();
    //  end session
    await session.endSession();

    return newStudent;

} catch (err) {
await session.abortTransaction();
await session.endSession();
console.log(err);
}
// const result = await StudentModel.create(repit_students);
};

export const userServises = {
createUserServerDB,
};

<!-- tow calection delete datas -->

const deletedStudentone = async (id: string) => {
const session = await mongoose.startSession();
try {
session.startTransaction();
const studentDeleted = await Student.updateOne(
{ id },
{ isDeleted: true },
{ new: true, session },
);
if (!studentDeleted) {
throw new AppError(404, 'some thing wrong');
}
const usertDeleted = await UserModel.updateOne(
{ id },
{ isDeleted: true },
{ new: true, session },
);
if (!usertDeleted) {
throw new AppError(404, 'some thing wrong');
}

    session.commitTransaction();
    session.endSession();
    return studentDeleted;

} catch (error) {
await session.abortTransaction();
session.endSession();
console.log(error);
}
};

<!-- error handaling 14 -->

type of error
1.oparational error
2.Programatical Error
3.async error
4.sync error

<!-- select query -->

<!-- module 19.1 -19-8 using mode mailer  -->

19.9 //image hosting // using malter ///image hosting related
https://byby.dev/node-delete-file

<!-- JWT TOKEN CREATE  -->
<!-- 1.problem update enroll course  -->
<!-- 2.problem  querybilder-->
<!-- enroll agrigaction -->

  <!-- <END PROJEXT> -->
