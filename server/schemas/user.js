import Joi from 'joi';

const userSchema = Joi.object({
  fullName: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  nationalId: Joi.string().required(),
  phone: Joi.string().pattern(/^[0-9]{10,15}$/).optional(),
  address: Joi.string().optional(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('ADMIN', 'USER').default('USER'),
  isActive: Joi.boolean().default(true),
  isVerified: Joi.boolean().default(false),

  // USER-specific fields (nurse)
  specialization: Joi.string().when('role', {
    is: 'USER',
    then: Joi.required(),
    otherwise: Joi.forbidden(),
  }),
  yearOfExperience: Joi.number().integer().min(0).when('role', {
    is: 'USER',
    then: Joi.required(),
    otherwise: Joi.forbidden(),
  }),
  sex: Joi.string().valid('male', 'female').when('role', {
    is: 'USER',
    then: Joi.required(),
    otherwise: Joi.forbidden(),
  }),
  age: Joi.number().integer().min(0).when('role', {
    is: 'USER',
    then: Joi.required(),
    otherwise: Joi.forbidden(),
  }),
  location: Joi.string().when('role', {
    is: 'USER',
    then: Joi.required(),
    otherwise: Joi.forbidden(),
  }),

  // ADMIN-specific fields
  permissions: Joi.object()
    .pattern(Joi.string(), Joi.boolean())
    .default({
      assign_roles: true,
      manage_users: true,
      view_reports: true,
      delete_records: true,
      manage_content: true,
      manage_courses: true,
      manage_mentors: true,
      manage_payments: true,
      manage_enrollments: true,
      manage_community_groups: true,
      moderate_community_posts: true,
    })
    .when('role', {
      is: 'ADMIN',
      then: Joi.optional(),
      otherwise: Joi.forbidden(),
    }),

  createdAt: Joi.date().default(() => new Date()),
  updatedAt: Joi.date().default(() => new Date()),
}).required();

export default userSchema;