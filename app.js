let express = require("express")
let bodyParser = require("body-parser")
let app = express()
app.set("view engine", "ejs")

app.use('/public', express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

let routerTitle = require("./route/title")
app.use("/", routerTitle)

let router = require("./controller")
app.use("/", router)


var pagination = require('pagination');

app.get("/a", (req, res) => {
    var boostrapPaginator = new pagination.TemplatePaginator({
        prelink:'/', current: 3, rowsPerPage: 200,
        totalResult: 10020, slashSeparator: true,
        template: function(result) {
            var i, len, prelink;
            var html = '<div><ul class="pagination">';
            if(result.pageCount < 2) {
                html += '</ul></div>';
                return html;
            }
            prelink = this.preparePreLink(result.prelink);
            if(result.previous) {
                html += '<li class="page-item"><a class="page-link" href="' + prelink + result.previous + '">' + this.options.translator('PREVIOUS') + '</a></li>';
            }
            if(result.range.length) {
                for( i = 0, len = result.range.length; i < len; i++) {
                    if(result.range[i] === result.current) {
                        html += '<li class="active page-item"><a class="page-link" href="' + prelink + result.range[i] + '">' + result.range[i] + '</a></li>';
                    } else {
                        html += '<li class="page-item"><a class="page-link" href="' + prelink + result.range[i] + '">' + result.range[i] + '</a></li>';
                    }
                }
            }
            if(result.next) {
                html += '<li class="page-item"><a class="page-link" href="' + prelink + result.next + '" class="paginator-next">' + this.options.translator('NEXT') + '</a></li>';
            }
            html += '</ul></div>';
            return html;
        }
    });
    res.send(boostrapPaginator.render())
})

app.listen(3000, function () {
    console.log("server is starting")
})