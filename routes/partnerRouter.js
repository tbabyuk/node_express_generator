const express = require("express");
const partnerRouter = express.Router();
const Partner = require("../models/partner");


//Routing to home page
partnerRouter.route("/")

    // .all((req, res, next) => {
    //     res.statusCode = 200;
    //     res.setHeader("Content-Type", "text/plain");
    //     next();
    // })

    // .get((req, res) => {
    //     res.end("Will send all the partners to you");
    // })

    .get((req, res, next) => {
        Partner.find()
            .then(partners => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(partners);
            })
            .catch(err => next(err));
    })
    // .post((req, res) => {
    //     res.end(`Will add the partner: ${req.body.name} with description: ${req.body.description}`)
    // })
    .post((req, res) => {
        Partner.create(req.body)
            .then(partner => {
                console.log("Partner Created", partner);
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(partner);
            })
    })
    .put((req, res) => {
        res.statusCode = 403;
        res.end("PUT operation not supported on /partners");
    })
    .delete((req, res) => {
        res.end("Deleting all partners");
    });


// Week 1 Workshop, Task 1
// Routing to a specific partner

partnerRouter.route("/:partnerId")

    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        next();
    })
    .get((req, res) => {
        res.end(`Will send details of the partner: ${req.params.partnerId} to you`);
    })
    .post((req, res) => {
        res.statusCode = 403;
        res.end(`POST operation not supported on /partners/${req.params.partnerId}`)
    })
    .put((req, res) => {
        res.write(`Updating the partner: ${req.params.partnerId}\n`);
        res.end(`Will update the partner: ${req.body.name}
        with description: ${req.body.description}`);
    })
    .delete((req, res) => {
        res.end(`Deleting partner: ${req.params.partnerId}`);
    });


module.exports = partnerRouter;


