const Favourite = require("../models/favourite.js");

module.exports.addFavourite = async (req, res) => {
    const listingId = req.params.listingId;
    const userId = req.user._id;

    if (!listingId || !userId) {
        return res
            .status(400)
            .json({ message: "Listing ID and User ID are required" });
    }

    try {
        const isFavourite = await Favourite.findOne({
            listing_id: listingId,
            user_id: userId,
        });
        if (isFavourite) {
            return res
                .status(409)
                .json({ message: "Listing is already favourited" });
        }

        const favourite = new Favourite({
            listing_id: listingId,
            user_id: userId,
        });
        await favourite.save();
        res.status(201).json({ message: "Favourite added successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error adding favourite", error });
    }
};

module.exports.removeFavourite = async (req, res) => {
    const listingId = req.params.listingId;
    const userId = req.user._id;

    if (!listingId || !userId) {
        return res
            .status(400)
            .json({ message: "Listing ID and User ID are required" });
    }

    console.log(listingId, userId);

    try {
        const favourite = await Favourite.findOneAndDelete({
            listing_id: listingId,
            user_id: userId,
        });

        if (!favourite) {
            return res.status(404).json({ message: "Favourite not found" });
        }

        res.status(200).json({ message: "Favourite removed successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error removing favourite", error });
    }
};
