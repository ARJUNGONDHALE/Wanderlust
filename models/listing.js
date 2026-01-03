const mongoose = require("mongoose");
const Review = require("./review");
const { ref, string, required } = require("joi");
const Schema = mongoose.Schema;

//npx quar --model ./models --db wanderlust
const listingShema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      filename: {
        type: String,
        default: "listingimage",
      },
      url: {
        type: String,
        default:
          "https://unsplash.com/photos/a-house-with-a-blue-front-door-and-a-brown-front-door-xaqsFfoEq3o",
        set: (v) =>
          v === ""
            ? "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60"
            : v,
      },
    },

    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      required: true,
    },
    review: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    geometry: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
      },
    },
  },
  { timestamps: true }
);

listingShema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.review } });
  }
});

const listing = mongoose.model("listing", listingShema);
module.exports = listing;
