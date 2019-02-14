let express = require("express")

let router = express.Router();

var mysql = require ('mysql');
var con= mysql.createConnection({ 
        host: 'localhost', 
        user: 'root', 
        password: '', 
        database: 'mydb'
});
router.get("/title", (req, res) => {
    con.query("SELECT * FROM titles ", (err, result) => {
        res.json({
            result: result,
            length: result.length
        })
    })
})

router.get("/last-title", (req, res) => {
    con.query("SELECT * FROM titles ORDER BY id DESC LIMIT 1", (err, result) => {
        res.json({
            result: result
        })
    })
})

router.post("/title", (req, res) => {
    if(req.body.title === undefined) return res.json({
        result: "undefined"
    })
    else if(req.body.title === "") return  res.json({
        result: "valid"
    })
    con.query("INSERT INTO titles SET title = '" + req.body.title + "'", (err, result)=> {
        res.json({
            result: result
        })
    } )
})

router.put("/title", (req, res) => {
    if(req.body.title=== undefined || req.body.title === "") return res.json({
        result: "valid"
    })
    con.query("UPDATE titles SET title = '"+req.body.title + "' WHERE id = "+ req.body.id, (err, result) => {
        res.json({
            result: result
        })
    })
})

router.delete("/title/:id", (req, res) => {
    let id = req.params.id
    console.log(id)
    con.query("DELETE FROM titles  " + " WHERE id = "+ id , (err, result) => {
        res.json({
            result: result
        })
    })
})

router.delete("/titles/:arrID", (req, res) => {
    let arrID = req.params.arrID
    console.log(arrID)
    con.query("DELETE FROM titles WHERE id IN (" + arrID + ")", (err, result) => {
        res.json({
            result: result
        })
    })
})


module.exports = router