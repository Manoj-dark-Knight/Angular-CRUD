const mongoose = require(`mongoose`);

const postSchema = mongoose.Schema({
    name: { type: String, required: true },
    Email: { type: String, required: true },
    MobNumber: { type: String, required: true },
    DOB: { type: Date, required: true },
    Bio: { type: String, required: true },
    time: { type: Date, required: true}
});

module.exports = mongoose.model(`Post`, postSchema);

//mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false