import Joi from 'joi';

const guardianSchema = Joi.object({
  guardianName: Joi.string().optional(),
  guardianPhone: Joi.string().optional(),
});

const nameSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .regex(/^[A-Z][a-z]*$/, '{VALUE} is not in a capitalized format.')
    .required()
    .messages({
      'string.empty': 'First name is required.',
      'string.pattern.base': '{VALUE} is not in a capitalized format.',
    }),
  middleName: Joi.string().optional(),
  lastName: Joi.string()
    .regex(/^[A-Za-z]+$/)
    .required()
    .messages({
      'string.empty': 'Last name is required.',
      'string.pattern.base': '{VALUE} must contain only alphabetic characters.',
    }),
});

const studenvalidactiontSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.empty': 'Student ID is required.',
  }),
  name: nameSchema.required(),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required.',
    'string.email': '{VALUE} is not a valid email format.',
  }),
  avatar: Joi.string().uri().optional(),
  dateOfBirth: Joi.date().required().messages({
    'date.base': 'Date of birth is required.',
  }),
  gender: Joi.string().valid('Male', 'Female', 'Other').required().messages({
    'any.only': '{VALUE} is not a valid gender.',
    'string.empty': 'Gender is required.',
  }),
  phone: Joi.string().length(11).optional().messages({
    'string.length': 'Phone number must be exactly 11 characters.',
  }),
  address: Joi.string().optional(),
  grade: Joi.string().required().messages({
    'string.empty': 'Grade is required.',
  }),
  section: Joi.string().optional(),
  enrolledDate: Joi.date().required().messages({
    'date.base': 'Enrollment date is required.',
  }),
  isActive: Joi.boolean().default(true),
  guardian: guardianSchema.required(),
  nationality: Joi.string().optional(),
  religion: Joi.string().required().messages({
    'string.empty': 'Religion is required.',
  }),
  hobbies: Joi.array().items(Joi.string()).optional(),
  extracurriculars: Joi.array().items(Joi.string()).optional(),
  previousSchool: Joi.string().optional(),
  emergencyContact: Joi.string().optional(),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .optional(),
  attendancePercentage: Joi.number().optional(),
  marks: Joi.object().pattern(Joi.string(), Joi.number()).optional(),
  comments: Joi.string().optional(),
});

export default studenvalidactiontSchema;
