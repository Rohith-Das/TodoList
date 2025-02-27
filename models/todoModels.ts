import mongoose, { Schema } from "mongoose";

export interface Todo extends Document{
    task : string;
    completed : boolean;
    createdAt:Date;
}

const TodoSchema:Schema =new Schema({
    task :{
        type : String,
        required:true,
        trim:true
    },
    completed:{
        type:Boolean,
        default :false
    },
    createdAt:{
        type:Date,
        default :Date.now
    }
});

export default  mongoose.model<Todo>('Todo',TodoSchema)