import mongoose from "mongoose";
const { Schema } = mongoose;

const tipsSchema = new Schema(
    {
        title: { type: String, required: true },
        img: { type: String, required: true },
        content: { type: String, required: true },
        createdAt: { type: Date, default: Date.now, expires: 3600 },
        updatedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

const Tips = mongoose.model("Tips", tipsSchema);
export default Tips;
