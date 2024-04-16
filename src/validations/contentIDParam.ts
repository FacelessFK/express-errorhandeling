import Joi from "joi";

export const contentIdParamValidation = Joi.object({
    id: Joi.string().regex(/\d+/).message(" must be an id")
});
