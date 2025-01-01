import config from '../config';
import { UserRole } from '../module/user/user.const';
import { UserMainModel } from '../module/user/user.model';

const superAdmin = {
  id: 'SA-0001',
  email: 'supperadmin@gmail.com',
  password: config.SUPPER_ADMIN, // Ensure this is correctly imported or declared
  needChangePassword: false,
  passwordChangeAt: undefined as Date | undefined, // Optional property
  role: UserRole.supperAdmin, // Ensure this enum is defined in your code
  status: 'in-progress', // Ensure this matches your application's defined statuses
};

const createSuperAdmin = async () => {
  const isExisSupperAdmin = await UserMainModel.findOne({
    role: UserRole.supperAdmin,
  });

  if (!isExisSupperAdmin) {
    await UserMainModel.create(superAdmin);
  }
};

export default createSuperAdmin;
