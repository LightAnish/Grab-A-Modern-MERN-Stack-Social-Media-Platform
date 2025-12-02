import mongoose from "mongoose"

const loopSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    media: {
        type: String,
        required: true
    }
},{timestamps: true})

const Loop = mongoose.model('Loop', loopSchema)
export default Loop