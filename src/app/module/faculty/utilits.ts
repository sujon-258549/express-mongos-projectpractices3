// import { AcadimicFucaltyModel } from './acadimic.Faculty.model';

import { AcadimicFucaltyModel } from './acadimic.Faculty.model';

// // Function to find the last faculty ID in the database
// const findLastFaculty = async () => {
//   const lastFaculty = await AcadimicFucaltyModel.findOne()
//     .sort({ id: -1 }) // Sort by `id` in descending order
//     .lean();

//   return lastFaculty?.id ? lastFaculty.id : undefined; // Return the last ID if it exists
// };

// // Function to generate a new faculty ID
// export const generateFacultyId = async () => {
//   const lastFacultyId = await findLastFaculty(); // Get the last faculty ID
//   let newIdNumber = 1;

//   // Extract the numeric part of the last ID and increment it
//   if (lastFacultyId) {
//     const numericPart = lastFacultyId.split('-')[1]; // Assuming the ID format is `F-0001`
//     newIdNumber = Number(numericPart) + 1;
//   }

//   // Pad the new numeric ID and prefix it with `F-`
//   const newFacultyId = `F-${newIdNumber.toString().padStart(4, '0')}`;

//   return newFacultyId; // Return the newly generated ID
// };

const findLastFaculty = async () => {
  const acadimicFacultyFindId = await AcadimicFucaltyModel.findOne()
    .sort({ id: -1 })
    .lean();
  return acadimicFacultyFindId?.id ? acadimicFacultyFindId?.id : undefined;
};

export const generateFacultyId = async () => {
  const id = await findLastFaculty();
  let newId = 1;

  if (id) {
    const splitId = id.split('-')[1];
    newId = Number(splitId) + 1;
  }

  const newIdCreate = `F-${newId.toString().padStart(4, '0')}`;
  return newIdCreate;
};
