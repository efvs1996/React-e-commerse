const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const subSchema = new mongoose.Schema(
    {
        name : {
            type: String,
            trim: true,
            required: "Name is required",
            minlenght: [3, "Too short"],
            maxlenght: [32, "Too long"],
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            index: true,
        },  
        parent:{ type: ObjectId, ref: "Category", required: true} 
    },
    { timestamps: true}
);


module.exports = mongoose.model("Sub", subSchema);