const httpStatus = require("http-status")
const Blog = require('./../models/blogs.model')


exports.getBlogs = async (req, res, next) => {
    try {
        let fields = [];
        if (req.query.fields){
            fields = req.query.fields.split(",")
        }
        const data = await Blog.getBlogs(fields)
        res.status(httpStatus.OK)
        res.send(data)
    } catch (e) {
        next(e)
    }
}
