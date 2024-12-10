import { TAdmin } from './admin.interfaces';
import { AdminModel } from './admin.model';
import { createIdByAdmin } from './admin.utilitis';

const createAdmin = async (paylod: TAdmin) => {
  const adminId = await createIdByAdmin();
  const repidPaylod = {
    ...paylod,
    id: adminId,
  };

  const result = await AdminModel.create(repidPaylod);
  return result;
};

export const adminServises = {
  createAdmin,
};
