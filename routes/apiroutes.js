const uuid = require("uuid");
const _ = require("lodash");
const db = require("../db/db.json");
const fs = require("fs");

module.exports = function (app) {
    app.get("/api/notes", function (req, res) {
        res.json(db);
    });

    app.post("/api/notes", function (req, res) {
        req.body.id = uuid.v4();
        db.push(req.body);
        fs.writeFile("./db/db.json", JSON.stringify(db), err => {
            if (err) throw err;
        });
        res.json(db);
    });

    app.delete("/api/notes/:id", function (req, res) {
        let removed = _.remove(db, function (note) {
            return note.id === req.params.id;
        });
        fs.writeFile("./db/db.json", JSON.stringify(db), err => {
            if (err) throw err;
        });
        res.json(db);
    });
};
