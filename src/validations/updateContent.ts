import Joi from "joi";

export const updateContentValidation = Joi.object({
    Title: Joi.string()
        .error(new Error("title should be an string"))
        .empty()
        .error(new Error("title can not be empty"))
        .trim()
        .lowercase(),

    Description: Joi.string()
        .error(new Error("Description should be an string"))
        .empty()
        .error(new Error("Description can not be empty")),
    SchoolID: Joi.string()
        .error(new Error("SchoolID should be an string"))
        .empty()
        .error(new Error("SchoolID can not be empty")),
    CategoryID: Joi.string()
        .error(new Error("CategoryID should be an string"))
        .empty()
        .error(new Error("CategoryID can not be empty")),
    Images: Joi.array()
        .items(Joi.string())
        .error(new Error("Image should be array of strings"))
});
