let express = require("express")

let router = express.Router()

router.get("/", (req, res) => {
    res.render("index")
})

router.get("/test", (req, res)=>{
    res.render("test")
})


module.exports = router