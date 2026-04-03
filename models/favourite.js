const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favouriteSchema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        listing_id: {
            type: Schema.Types.ObjectId,
            ref: "Listing",
            required: true,
        },
    },
    { timestamps: true },
);

const favourite = mongoose.model("Favourite", favouriteSchema);
module.exports = favourite;
