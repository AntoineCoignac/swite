import mongoose from "mongoose";

const textSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: false,
    },
    isVisible: {
        type: Boolean,
        required: true,
        default: true,
    },
}, { timestamps: true });

const Text = mongoose.models.Text || mongoose.model("Text", textSchema);

export default Text;