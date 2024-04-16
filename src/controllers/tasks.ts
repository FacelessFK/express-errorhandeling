import { Request, Response } from "express";
import { Todo } from "../models/todos";
import { createTaskValidation } from "../validations/createTask";
import { CreateTaskDto } from "../dto/createTask.dto";
import CustomError from "../errors/custom-error";
import { GetTaskDto } from "../dto/getTask.dto";
import { getTaskByIdValidation } from "../validations/getTask";
import { UpdateTaskDto } from "../dto/updateTask.dto";
import { updateTaskValidation } from "../validations/updateTask";

export const createTask = async (req: Request, res: Response) => {
    const { value, error }: { value: CreateTaskDto; error: unknown } =
        createTaskValidation.validate(req.body);

    if (error) {
        console.log(error);
        throw new CustomError(
            "validation",
            error.toString().replace("Error: ", ""),
            422
        );
    }

    const newTask = await Todo.create(req.body);
    return res.status(201).json({
        errors: null,
        result: {
            message: "created",
            data: newTask,
            meta: "some additional info"
        }
    });
};

export const getTask = async (req: Request, res: Response) => {
    const { value, error }: { value: GetTaskDto; error: unknown } =
        getTaskByIdValidation.validate(req.params);

    if (error) {
        throw new CustomError(
            "validation",
            error.toString().replace("Error: ", ""),
            422
        );
    }

    const task = await Todo.findById(value.id);
    if (!task) throw new CustomError("notfound", "task not found", 404);
    return res.status(200).json({
        errors: null,
        result: {
            message: "successful",
            data: task,
            meta: "some additional info"
        }
    });
};
export const updateTask = async (req: Request, res: Response) => {
    const {
        value: { id },
        error: errorId
    }: { value: GetTaskDto; error: unknown } = getTaskByIdValidation.validate(
        req.params
    );

    if (errorId) {
        throw new CustomError(
            "validation",
            errorId.toString().replace("Error: ", ""),
            422
        );
    }

    const {
        value: updateTask,
        error: updateTaskError
    }: { value: UpdateTaskDto; error: unknown } = updateTaskValidation.validate(
        req.body
    );
    if (updateTaskError) {
        throw new CustomError(
            "validation",
            updateTaskError.toString().replace("Error: ", ""),
            422
        );
    }

    const task = await Todo.findByIdAndUpdate(id, updateTask, { new: true });
    if (!task) throw new CustomError("notfound", "task not found", 404);

    return res.status(200).json({
        errors: null,
        result: {
            message: "updated",
            data: task,
            meta: "some additional info"
        }
    });
};
