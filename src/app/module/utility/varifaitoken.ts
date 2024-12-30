import jwt from 'jsonwebtoken';
export const varifaitoken = (token: string, secret: string) => {
  const decoded = jwt.verify(token, secret);
  return decoded;
};
