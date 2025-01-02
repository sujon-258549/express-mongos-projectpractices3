import QueryBuilder from '../../builder/queryBuilder';
import { TAcadimicDepertment } from './acadimic.depert ment.interface';
import { AcadimicDepertmentModel } from './acadimic.Depertment.model';
import { acadimicDepentmentQuerySearchField } from './acadimicDEpertment.const';

const createDepertmentDB = async (payload: TAcadimicDepertment) => {
  const result = await AcadimicDepertmentModel.create(payload);
  return result;
};
const findAllDepertmentDB = async (query: Record<string, unknown>) => {
  const acadimicSamester = new QueryBuilder(
    AcadimicDepertmentModel.find(),
    query,
  )
    .search(acadimicDepentmentQuerySearchField)
    .filter()
    .sort()
    .fields()
    .paginate();

  const meta = await acadimicSamester.countTotal();
  const result = await acadimicSamester.modelQuery;
  return { result, meta }; //meta
};
const findoneDepertmentDB = async (facultyId: string) => {
  console.log(facultyId);

  const result = await AcadimicDepertmentModel.findById(facultyId); //.populate(  'acadimicFaculty', );

  return result;
};
const deleteoneDepertmentDB = async (facultyId: string) => {
  try {
    const result = await AcadimicDepertmentModel.findByIdAndDelete(facultyId, {
      isDeleted: true,
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

const updateOneDepertmentDataintoDB = async (
  id: string,
  updateData: TAcadimicDepertment,
) => {
  // Use lowercase 'string' for consistency

  const result = await AcadimicDepertmentModel.findByIdAndUpdate(
    id,
    updateData,
    { new: true },
  ); // Convert string _id to ObjectId
  return result;
};

export const acadimicDepertmentServises = {
  createDepertmentDB,
  findAllDepertmentDB,
  findoneDepertmentDB,
  deleteoneDepertmentDB,
  updateOneDepertmentDataintoDB,
};
