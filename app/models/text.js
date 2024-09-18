import mongoose from "mongoose";

const textSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
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
}, { timestamps: true });

const Text = mongoose.models.Text || mongoose.model("Text", textSchema);

export default Text;