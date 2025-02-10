import { Schema, model } from "mongoose";

const courseSchema = Schema({
    name: {
        type: String,
        required: [true, "Course name is required"],
        maxLength: [50, "Course name cannot exceed 50 characters"]
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    students: [{ 
        type: Schema.Types.ObjectId, 
        ref: "User"
    }]    
}, 
{
    versionKey: false,
    timestamps: true
});

export default model("Course", courseSchema) 