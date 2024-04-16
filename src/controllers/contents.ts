import { Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";
import { createContentValidation } from "../validations/createContent";
import { CreateContentDto } from "../dto/createContent.dto";
import CustomError from "../errors/custom-error";
import { contentIdParamValidation } from "../validations/contentIDParam";
import { contentIdParamDto } from "../dto/contentIdParam.dto";
import { UpdateContentDto } from "../dto/updateContent.dto";
import { updateContentValidation } from "../validations/updateContent";
dotenv.config();

export const createContent = async (req: Request, res: Response) => {
    const { value, error }: { value: CreateContentDto; error: unknown } =
        createContentValidation.validate(req.body);
    console.log(value);

    if (error)
        throw new CustomError(
            "validationError",
            error.toString().replace("Error: ", ""),
            422
        );

    const response = await axios.post(
        "http://localhost:1337/api/contents",
        { data: value },
        {
            headers: { Authorization: "Bearer " + process.env.JWT_TOKEN }
        }
    );

    if (!response.data.data)
        throw new CustomError("disconnection", "something went wrong", 500);

    res.status(201).json({
        errors: null,
        result: {
            message: "content Created",
            data: response.data.data,
            meta: response.data.meta
        }
    });
};

export const getAllContent = async (req: Request, res: Response) => {
    const response = await axios.get("http://localhost:1337/api/contents", {
        headers: { Authorization: "Bearer " + process.env.JWT_TOKEN }
    });
    if (!response.data.data)
        throw new CustomError("disconnection", "something went wrong", 500);

    res.status(200).json({
        errors: null,
        result: {
            message: "fetch all contents",
            data: response.data.data,
            meta: response.data.meta
        }
    });
};

export const getContent = async (req: Request, res: Response) => {
    const { value, error }: { value: contentIdParamDto; error: unknown } =
        contentIdParamValidation.validate(req.params);

    if (error)
        throw new CustomError(
            "validationError",
            error.toString().replace("Error: ", ""),
            422
        );
    const response = await axios.get(
        `http://localhost:1337/api/contents/${value.id}`,
        {
            headers: { Authorization: "Bearer " + process.env.JWT_TOKEN }
        }
    );
    if (!response.data.data)
        throw new CustomError("disconnection", "something went wrong", 500);

    res.status(200).json({
        errors: null,
        result: {
            message: "fetch a content",
            data: response.data.data,
            meta: response.data.meta
        }
    });
};
export const updateContent = async (req: Request, res: Response) => {
    //param id validation
    const {
        value: contentId,
        error: contentIdError
    }: { value: contentIdParamDto; error: unknown } =
        contentIdParamValidation.validate(req.params);
    if (contentIdError)
        throw new CustomError(
            "validationError",
            contentIdError.toString().replace("Error: ", ""),
            422
        );

    // body content validation
    const {
        value: content,
        error: contentError
    }: { value: UpdateContentDto; error: unknown } =
        updateContentValidation.validate(req.body);

    if (contentError)
        throw new CustomError(
            "validationError",
            contentError.toString().replace("Error: ", ""),
            422
        );

    const response = await axios.put(
        `http://localhost:1337/api/contents/${contentId.id}`,
        { data: content },
        {
            headers: { Authorization: "Bearer " + process.env.JWT_TOKEN }
        }
    );
    if (!response.data.data)
        throw new CustomError("disconnection", "something went wrong", 500);

    res.status(200).json({
        errors: null,
        result: {
            message: "update a content",
            data: response.data.data,
            meta: response.data.meta
        }
    });
};

export const deleteContent = async (req: Request, res: Response) => {
    //param id validation
    const {
        value: contentId,
        error: contentIdError
    }: { value: contentIdParamDto; error: unknown } =
        contentIdParamValidation.validate(req.params);
    if (contentIdError)
        throw new CustomError(
            "validationError",
            contentIdError.toString().replace("Error: ", ""),
            422
        );

    const response = await axios.delete(
        `http://localhost:1337/api/contents/${contentId.id}`,
        {
            headers: { Authorization: "Bearer " + process.env.JWT_TOKEN }
        }
    );
    if (!response.data.data)
        throw new CustomError("disconnection", "something went wrong", 500);

    res.status(200).json({
        errors: null,
        result: {
            message: "delete a content",
            data: response.data.data,
            meta: response.data.meta
        }
    });
};
