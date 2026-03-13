import Joi from "joi";

export const addAlbumSchema = Joi.object({
  name: Joi.string().required(),
  year: Joi.number().required(),
});

export const editAlbumSchema = Joi.object({
  name: Joi.string().required(),
  year: Joi.number().required(),
});

export const uploadCoverSchema = Joi.object({
  cover: Joi.string().uri().optional()
})