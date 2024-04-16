import Joi from "joi";

export const getTaskByIdValidation = Joi.object({
    id: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .message(" must be an id")
});
