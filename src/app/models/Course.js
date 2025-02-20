// Using Node.js `require()`
const mongoose = require('mongoose');
// const slug = require('mongoose-slug-generator');

const slug = require('mongoose-slug-updater');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

mongoose.plugin(slug);

const Course = new Schema(
    {
        name: { type: String, maxLength: 255, required: true },
        description: { type: String, maxLength: 600 },
        image: { type: String, maxLength: 255 },
        slug: { type: String, slug: 'name', unique: true },
        videoid: { type: String, maxLength: 255, required: true },
        level: { type: String, maxLength: 255 },
    },
    { timestamps: true },
);
module.exports = mongoose.model('Course', Course);
