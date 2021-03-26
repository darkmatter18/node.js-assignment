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


blogsSchema.statics = {
    async getBlogs(id) {
        try {
            let blogs;
            if (mongoose.Types.ObjectId.isValid(id)) {
                blogs = await this.find({ userId: id }).select(['title', 'body', 'userEmail', 'createdAt']).exec();
            }
            if (blogs) {
                
                return blogs;
            }
            throw new APIError({
                message: 'User does not exist',
                status: httpStatus.NOT_FOUND,
            });
        } catch (error) {
            throw error;
        }
    },
}

/**
 * @typedef Blogs
 */
const Blogs = mongoose.model('blogsSchema', blogsSchema);
module.exports = Blogs;
