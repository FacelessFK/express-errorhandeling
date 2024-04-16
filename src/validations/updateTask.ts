import Joi from "joi";

export const updateTaskValidation = Joi.object({
    title: Joi.string()
        .error(new Error("title should be an string"))
        .empty()
        .error(new Error("title can not be empty"))
        .trim()
        .lowercase(),

    body: Joi.string()
        .error(new Error("body should be an string"))
        .empty()
        .error(new Error("body can not be empty")),
    completed: Joi.boolean().error(new Error("complete should be an boolean"))
});
