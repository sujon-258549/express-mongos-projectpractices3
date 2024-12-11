// import { generateFacultyId } from './utilits';
// import { TFaculty } from './acadimic.Faculty.interfaces';
import { AcadimicFucaltyModel as AcadimicFacultyModel } from './acadimic.Faculty.model';
import QueryBuilder from '../../builder/queryBuilder';

const FacultySearchableFields = [
  'email',
  'id',
  'contactNo',
  'emergencyContactNo',
  'name.firstName',
  'name.lastName',
  'name.middleName',
];
// const createFaculty = async (payload: TFaculty) => {
//   try {
//     const facultyId = await generateFacultyId();
//     const facultyData = {
//       ...payload,
//       id: facultyId, // Ensure the new ID is included
//     };
//     const result = await AcadimicFacultyModel.create(facultyData);
//     return result;
//   } catch (error) {
//     console.log(error);
//   }
// };
// const findAllFaculty = async () => {
//   try {
//     const result = await AcadimicFacultyModel.find();
//     return result;
//   } catch (error) {
//     console.log(error);
//   }
// };

const findAllFaculty = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(
    AcadimicFacultyModel.find().populate('Acadimicdepertment'),
    query,
  )
    .search(FacultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await facultyQuery.modelQuery;
  return result;
};

const findoneFaculty = async (facultyId: string) => {
  console.log(facultyId);
  try {
    const result = await AcadimicFacultyModel.findById(facultyId);

    return result;
  } catch (error) {
    console.log(error);
  }
};
const deleteoneFaculty = async (facultyId: string) => {
  try {
    const result = await AcadimicFacultyModel.findByIdAndDelete(facultyId, {
      isDeleted: true,
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const facultyServises = {
  //   createFaculty,
  findAllFaculty,
  findoneFaculty,
  deleteoneFaculty,
};
