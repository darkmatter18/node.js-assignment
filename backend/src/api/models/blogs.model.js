const mongoose = require('mongoose')

const blogsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    userEmail: {
        type: 'String',
        ref: 'User',
        required: true,
    },
}, { timestamps: true })

/**
 * @typedef Blogs
 */
const Blogs = mongoose.model('blogsSchema', blogsSchema);
module.exports = Blogs;
