let express = require("express")

let router = express.Router();

// var mysql = require('mysql');
// var con = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'mydb'
// });

let sequelize = require("../sequenlize")
let Sequelize = require("sequelize")
const Title = sequelize.define('title', {
    title: {
        type: Sequelize.STRING
    },
    completed: {
        type: Sequelize.BOOLEAN
    }
}, {
        timestamps: false
    });


router.get("/title", (req, res) => {
    // con.query("SELECT * FROM titles ", (err, result) => {
    //     res.json({
    //         result: result,
    //         length: result.length
    //     })
    // })
    Title.findAll({
        raw: true
    }).then(result => {
        res.json({
            result: result,
            length: result.length
        })
    })


})

router.get("/last-title", (req, res) => {
    // con.query("SELECT * FROM titles ORDER BY id DESC LIMIT 1", (err, result) => {
    //     res.json({
    //         result: result
    //     })
    // })

})

router.post("/title", (req, res) => {
    if (req.body.title === undefined) return res.json({
        result: "undefined"
    })
    else if (req.body.title === "") return res.json({
        result: "valid"
    })
    // con.query("INSERT INTO titles SET title = '" + req.body.title + "'", (err, result) => {
    //     res.json({
    //         result: result
    //     })
    // })
    Title.create({
        title: req.body.title,
    }).then((result) => {
        res.json({
            result: result
        })
    })
})

router.put("/title", (req, res) => {
    if (req.body.title === undefined || req.body.title === "") return res.json({
        result: "valid"
    })
    // con.query("UPDATE titles SET title = '" + req.body.title + "' WHERE id = " + req.body.id, (err, result) => {
    //     res.json({
    //         result: result
    //     })
    // })
    Title.update({
        title: req.body.title
    }, {
            where: {
                id: req.body.id
            }
        }).then((result) => {
            res.json({
                result: result
            })
        })
})

router.put("/title-completed", (req, res) => {
    let completed = req.body.completed
    if (req.body.completed != "") {
        // con.query("UPDATE titles SET completed = " + completed + " WHERE id = " + req.body.id, (err, result) => {
        //     res.json({
        //         result: result
        //     })
        // })
        Title.update({
            completed: req.body.completed
        }, {
                where: {
                    id: req.body.id
                }
            }).then((result) => {
                res.json({
                    result: result
                })
            })
    }
})

router.delete("/title/:id", (req, res) => {
    let id = req.params.id

    // con.query("DELETE FROM titles  " + " WHERE id = " + id, (err, result) => {
    //     res.json({
    //         result: result
    //     })
    // })
    Title.destroy({
        where: {
            id: id
        }
    }).then((result) => {
        res.json({
            result: result
        })
    })
})

router.post("/titles-delete/", (req, res) => {

    console.log(req.body.arr)
    let arr = req.body.arr;

    // con.query("DELETE FROM titles WHERE id IN (" + arrID + ")", (err, result) => {
    //     res.json({
    //         result: result
    //     })
    // })
    Title.destroy({
        where: {
            id: arr
        }
    }).then((result) => {
        res.json({
            result: result
        })
    })
})

router.get("/title-search/:data", (req, res) => {
    let data = req.params.data;
    const Op = Sequelize.Op;
    Title.findAll({
        where: {
           title:{
                [Op.like]: '%'+data+'%'
           }
        }
    }).then((result) => {
        res.json({
            result: result
        })
    })

})

router.get("/title-limit/:page", (req, res) => {
    let page = req.params.page;
    let offset = (page-1) * 5 ;
    Title.findAll({limit: 5, offset: offset}).then( (result) => {
        res.json({
            result: result
        })
    })
    
})

module.exports = router