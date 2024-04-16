import Joi from "joi";

export const createContentValidation = Joi.object({
    Title: Joi.string()
        .error(new Error("title should be an string"))
        .empty()
        .error(new Error("title can not be empty"))
        .required()
        .error(new Error("please provide a title"))
        .trim()
        .lowercase(),

    Description: Joi.string()
        .error(new Error("Description should be an string"))
        .empty()
        .error(new Error("Description can not be empty"))
        .required()
        .error(new Error("please provide a Description")),
    SchoolID: Joi.string()
        .error(new Error("SchoolID should be an string"))
        .empty()
        .error(new Error("SchoolID can not be empty"))
        .required()
        .error(new Error("please provide a SchoolID")),
    CategoryID: Joi.string()
        .error(new Error("CategoryID should be an string"))
        .empty()
        .error(new Error("CategoryID can not be empty"))
        .required()
        .error(new Error("please provide a CategoryID")),
    Images: Joi.array()
        .items(Joi.string())
        .error(new Error("Image should be array of strings")),
    Author: Joi.string()
        .error(new Error("Author should be an string"))
        .empty()
        .error(new Error("Author can not be empty"))
        .required()
        .error(new Error("please provide a Author"))
});
