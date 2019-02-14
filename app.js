let express = require("express")
let bodyParser = require("body-parser")
let app = express()
app.set("view engine", "ejs")

app.use('/public', express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))

let routerTitle = require("./route/title")
app.use("/", routerTitle)

let router = require("./controller")
app.use("/", router)

app.listen(3000, function() {
    console.log("server is starting")
})