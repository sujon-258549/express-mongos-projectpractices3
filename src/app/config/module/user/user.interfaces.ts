export interface TUser {
  id: string;
  password: string;
  needChangePassword: boolean;
  role: 'admin' | 'faculty' | 'student';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}

// export interface NewUser {
//   password: string;
//   role: string;
//   id: string;
// }
