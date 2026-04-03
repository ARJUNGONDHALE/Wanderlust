const Listing = require("../models/listing");
const Favourite = require("../models/favourite");

module.exports.index = async (req, res) => {
    const AllListings = await Listing.aggregate([
        { $match: {} },
        { $sort: { createdAt: -1 } },
        {
            $lookup: {
                from: "favourites",
                localField: "_id",
                foreignField: "listing_id",
                as: "favourites",
                pipeline: [
                    {
                        $match: {
                            user_id: req?.user?._id,
                        },
                    },
                ],
            },
        },
        {
            $addFields: {
                isFavourite: { $gt: [{ $size: "$favourites" }, 0] },
            },
        },
    ]);

    res.render("listings/index.ejs", { AllListings });
};

module.exports.renderCart = async (req, res) => {
    const AllListings = await Favourite.aggregate([
        {
            $match: {
                user_id: req.user?._id,
            },
        },
        { $sort: { createdAt: -1 } },
        {
            $lookup: {
                from: "listings",
                foreignField: "_id",
                localField: "listing_id",
                as: "listing",
            },
        },
        {
            $addFields: {
                listing: { $arrayElemAt: ["$listing", 0] },
            },
        },
        // {
        //     $addFields: {
        //         isFavourite: { $gt: [{ $size: "$favourites" }, 0] },
        //     },
        // },
    ]);

    console.log(JSON.stringify(AllListings, null, 2));

    res.render("listings/cart.ejs", { AllListings });
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListings = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: "review",
            populate: {
                path: "author",
            },
        })
        .populate("owner");
    console.log(listing);
    if (!listing) {
        req.flash("error", "listing you required for does not exist..!");
        return res.redirect("/listings");
    }
    // console.log(listing);
    return res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;

    let listing = req.body.listing;
    let newlisting = new Listing(listing); //instance
    newlisting.owner = req.user._id;
    newlisting.image = { filename, url };
    ((newlisting.geometry = {
        type: "Point",
        coordinates: [req.body.listing.latitude, req.body.listing.longitude],
    }),
        (savedListing = await newlisting.save()));
    console.log(savedListing);
    console.log("Sample Was Saved ");
    req.flash("success", "New Listing Created ..!");
    res.redirect("/listings");
};

module.exports.renderEditeForm = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "listing you required for does not exist..!");
        return res.redirect("/listings");
    }
    const orignalImageUrl = listing.image.url.replace(
        "/upload",
        "/upload/h_300,w_250",
    );
    return res.render("listings/edit.ejs", { listing, orignalImageUrl });
};

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(
        id,
        { ...req.body.listing },
        {
            new: true,
        },
    );

    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { filename, url };
        await listing.save();
    }

    req.flash("success", " Listing Updeted..!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success", " Listing Deleted..!");
    console.log(deletedListing);
    res.redirect("/listings");
};
