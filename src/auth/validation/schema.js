import Joi from "joi";

export const addUserSchema = Joi.object({
  fullname: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const loginUserSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required(),
});
