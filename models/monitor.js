const mongoose = require('mongoose');
const mongooseDelete = require("mongoose-delete");

const monitorSchema = new mongoose.Schema(
    {
        url: {
            type: String,
        },

        filename: {
            type: String,
        },
        name:{
            type: String,
        },
        specialty:{
            type: String,
        }

    },
    {
        timestamps: true,
        versionKey: false
    }
);
monitorSchema.plugin(mongooseDelete, {overrideMethods: 'all'});
module.exports = mongoose.model("monitors", monitorSchema);