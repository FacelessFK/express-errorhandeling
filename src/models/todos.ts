import { Schema, model } from "mongoose";

interface Todos {
    title: string;
    body: string;
    completed: boolean;
}

const todoSchema = new Schema<Todos>(
    {
        title: {
            type: String,
            required: [true, "Title should not be empty!"]
        },

        body: {
            type: String,
            required: [true, "Body should not be empty!"]
        },

        completed: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);
export const Todo = model<Todos>("Todo", todoSchema);
