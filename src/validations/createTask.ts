import Joi from "joi";

export const createTaskValidation = Joi.object({
    title: Joi.string()
        .error(new Error("title should be an string"))
        .empty()
        .error(new Error("title can not be empty"))
        .required()
        .error(new Error("please provide a title"))
        .trim()
        .lowercase(),

    body: Joi.string()
        .error(new Error("body should be an string"))
        .empty()
        .error(new Error("body can not be empty"))
        .required()
        .error(new Error("please provide a body")),

    completed: Joi.boolean()
        .error(new Error("complete should be an boolean"))
        .default(false)
});
