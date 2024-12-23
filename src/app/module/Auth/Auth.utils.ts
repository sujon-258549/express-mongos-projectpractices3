import jwt from 'jsonwebtoken';
export const createToken = (
  JwtPayload: {
    userId: string;
    userRole: string;
  },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(
    //create token for jwt use
    {
      JwtPayload,
    },
    secret,
    { expiresIn: expiresIn },
  );
};
