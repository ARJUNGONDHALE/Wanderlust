const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservationSchema = new Schema(
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

const reservation = mongoose.model("Reservation", reservationSchema);
module.exports = reservation;
