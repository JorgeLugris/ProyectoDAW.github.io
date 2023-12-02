const mongoose = require('mongoose');
const mongooseDelete = require("mongoose-delete");

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
        },
        url: {
            type: String,
        },
        filename: {
            type: String,
        },
        description: {
            type: String,
        },
        user: {
            type: String,
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
);
blogSchema.plugin(mongooseDelete, {overrideMethods: 'all'});
module.exports = mongoose.model("blogs", blogSchema);