import { AdminModel } from './admin.model';

const findAdminId = async () => {
  const findOne = await AdminModel.findOne().sort({ id: -1 }).lean();
  return findOne?.id ? findOne?.id : undefined;
};

export const createIdByAdmin = async () => {
  const adminId = await findAdminId();
  let newId = 1;

  if (adminId) {
    const splitAdminId = adminId.split('-')[1];
    newId = Number(splitAdminId) + 1;
  }

  const createAdminNewId = `A-${newId.toString().padStart(4, '0')}`;
  return createAdminNewId;
};
