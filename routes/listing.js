dotify = require('node-dotify');

get = (req, res, next) => {
    var query;
    if (req.query.kommun) {
        query = req.models.Listing.findOne({ "listing.kommun": req.query.kommun })
    }
    else {
        query = req.models.Listing.find()
    }

    query.exec().then((listing) => {
        return res.send(listing);
    }).catch((error) => next(error))
}

post = (req, res, next) => {
    req.models.Listing.create({
        listing: {
            kommun: req.body.listing.kommun,
            gata: req.body.listing.gata,
            bostadstyp: req.body.listing.bostadstyp,
            pris: req.body.listing.pris,
            månadskostnad: req.body.listing.månadskostnad,
            budning: req.body.listing.budning,
            kordinater: {
                lat: req.body.listing.kordinater.lat,
                long: req.body.listing.kordinater.long
            }
        }
    }).then((listing) => {
        return res.status(201).send(listing);
    }).catch((error) => {
        next(error);
    })
}

getById = (req, res, next) => {
    req.models.Listing.findById(req.params.id).then((listing) => {
        return res.send(listing);
    }).catch((error) => next(error))
}

deleteById = (req, res, next) => {
    req.models.Listing.findByIdAndDelete(req.params.id).then((deleted) => {
        if (deleted)
            return res.send(deleted).status(200)
        res.sendStatus(204)
    }).catch((error) => next(error))
}

patch = (req, res, next) => {
    req.models.Listing.findByIdAndUpdate(req.params.id,
        {
            $set: dotify(req.body)
        },
        {
            returnNewDocument: true,
        }).then((listing) => {
            console.log(listing)
            res.send(listing)
        }).catch((error) => next(error))
}

module.exports = {
    get,
    post,
    getById,
    deleteById,
    patch
}