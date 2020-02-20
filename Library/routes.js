const express = require("express");
const router = express.Router();
let accounts = require('./accounts');
let authentication = false;
let user = "AA";

let lib = require("./library");
let curr_lib = Object.assign([], lib);

router.get("/", (req, res, next) => {
    if (authentication)
        res.redirect("lib")
    else
        res.redirect("/login")
});
router.get("/lib", (req, res, next) => {
    if(!authentication)
        res.redirect('/login')
    else {
        res.render("library", {lib: curr_lib, user: user});
        next();
    }
});

router.post("/filter", (req, res, next) => {
    if(!authentication)
        res.redirect('/login')
    else {
        let body = req.body;
        if(body.id === 0)
        {
            curr_lib = lib;
            res.redirect('/lib')
            return;
        }

        let len = curr_lib.length;
        curr_lib = Object.assign([], lib);
        for (let i = 0; i < len; i++) {
            console.log(curr_lib[i].available)
            if (curr_lib[i].available === false) {
                curr_lib.splice(i, 1);
                i--;
                len--;
            }
        }
        res.render("library", {lib: curr_lib, user: user})
    }
})

router.delete("/lib/:id", (req, res, next) => {
    if(lib.length === 1)
        lib.pop();
    for (let i = 0; i < lib.length; i++)
        if (lib[i].id === req.params.id)
        {
            lib.splice(i, 1);
            break;
        }
    const fs = require("fs");
    fs.writeFile('library.json', JSON.stringify(lib), 'utf8', (err) => {
        if(err)
            console.log("Vse ploho!!!")
    })
    curr_lib = lib;
});
router.post("/", (req, res, next) => {
    let body = req.body;
    for (let i = 0; i < lib.length; i++)
        if (lib[i].id === body.id)
        {
            res.status(400);
            res.json({message: "Bad Request"});
            return
        }
    if(!body.id || body.name === "" || body.year > 2019 || body.year < 0 || body.author === "")
    {
        res.status(400);
        res.json({message: "Bad Request"});
    } else {
        let dict = {
            "id": body.id,
            "name": body.name,
            "available": true,
            "creation_date": body.year,
            "owner": "-",
            "author": body.author,
            "return_data": "-"
        };
        lib.push(dict);
        const fs = require("fs");
        fs.writeFile('library.json', JSON.stringify(lib), 'utf8', (err) => {
            if(err)
                console.log("Vse ploho!!!")
        })
        curr_lib = lib;
    };
});

router.post('/edit', (req, res, next) => {
    let body = req.body;
    for (let i = 0; i < lib.length; i++) {
        console.log("iter");
        if (lib[i].id === body.id) {
            lib[i].name = body.name;
            lib[i].author = body.author;
            lib[i].creation_date = body.year;
            break;
        }
    }
    const fs = require("fs");
    fs.writeFile('library.json', JSON.stringify(lib), 'utf8', (err) => {
        if (err)
            console.log("Vse ploho!!!")
    });
    res.redirect("lib")
});

router.post('/get_book', (req, res, next) => {
    let body = req.body;
    for (let i = 0; i < lib.length; i++) {
        if (parseInt(lib[i].id) === body.id) {
            lib[i].owner = user;
            lib[i].return_data = body.ret_date;
            lib[i].available = false;
            break;
        }
    }
    const fs = require("fs");
    fs.writeFile('library.json', JSON.stringify(lib), 'utf8', (err) => {
        if (err)
            console.log("Vse ploho!!!")
    });
    res.redirect("lib")
});

router.post('/put', (req, res) => {

    let body = req.body;
    console.log(req.body.id === "0");
    for (let i = 0; i < lib.length; i++) {
        if (parseInt(lib[i].id) === body.id) {
            lib[i].available = true;
            lib[i].return_data = "-";
            lib[i].owner = "-";
            break;
        }
    }
    const fs = require("fs");
    fs.writeFile('./library.json', JSON.stringify(lib), 'utf8', (err) => {
        if(err)
            console.log("bad");
    });
    res.redirect("/lib");
});

router.post('/login', (req, res, next) => {
    let isOk = false;
    for (let i = 0; i < accounts.length; i++)
    {
        if (accounts[i]['username'] === req.body.username &&
            accounts[i]['password'] === req.body.password) {
            isOk = true;
            authentication = true;
            user = req.body.username;
        }
    }
    res.json({ok: isOk});
});
router.get("/login", (req, res) => {
    res.render('index');
});
router.get("/lib/:id", (req, res, next) => {
    if (!authentication)
        res.redirect('/login');
    else
    {
        const id = req.params.id;
        for (value of lib) {
            if (value.id === id)
                res.render('edit', {book: value});
        }
        next();
    }
});
router.get("*", (req, res, next) => {
    res.status(404);
    res.end("404. Live with it.");
});

module.exports = router;