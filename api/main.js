"use strict";

const countries = require("./countries.json");
const app = require("express")()
 
app.get("/", function (req, res) {
    let query = "";
    let returns = [];

    if (req.query.q !== undefined) {
        query = req.query.q;
    }

    for (let abr in countries) {
        let country = countries[abr];

        if (abr.match(new RegExp(query, "i")) || country.match(new RegExp(query, "i"))) {
            returns.push(country);
        }
    }

    res.set("Content-Type", "application/json");
    res.send(JSON.stringify(returns));
});
 
app.listen(8000)
