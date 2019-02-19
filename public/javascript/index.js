function getTitles() {
    let length = 0;
    $.ajax({
        url: "http://localhost:3000/title",
        type: "get",
       async: false
    }).done(function (data) {
        let result = data.result;
        length = result.length
        let html = "";
        for (let i = 0; i < length; i++) {
            if (result[i].completed == 0) {
                html +=
                    '<li class="todo" >' +
                    '<div class="view">' +
                    '<input class="toggle" type="checkbox" value = ' + result[i].id + '>' +
                    '<label >' + result[i].title + '</label>' +
                    '<button class="destroy"></button>' +
                    '</div>' +
                    '<input class="edit" type="text" value= ' + result[i].title + '>' +
                    '</li>';
                
            }

            else {
                html +=
                    '<li class="todo" >' +
                    '<div class="view">' +
                    '<input checked class="toggle" type="checkbox" value = ' + result[i].id + '>' +
                    '<label style = "text-decoration: line-through" >' + result[i].title + '</label>' +
                    '<button class="destroy"></button>' +
                    '</div>' +
                    '<input class="edit" type="text" value= ' + result[i].title + '>' +
                    '</li>';
                $(".clear-completed").show();
            }
        }
        $(".todo-list").html(html)
        showCountTitle()
    })
    
    
}

// function getLastTitle() {
//     $.ajax({
//         url: "http://localhost:3000/last-title",
//         type: "get",
//     }).done(function (data) {
//         let result = data.result;
//         let length = result.length
//         let html = "";
//         for (let i = 0; i < length; i++) {
//             html +=
//                 '<li class="todo" >' +
//                 '<div class="view">' +
//                 '<input class="toggle" type="checkbox" value = ' + result[i].id + '>' +
//                 '<label >' + result[i].title + '</label>' +
//                 '<button class="destroy"></button>' +
//                 '</div>' +
//                 '<input class="edit" type="text" value= ' + result[i].title + '>' +
//                 '</li>';
//         }
//         $(".todo-list").append(html)
//         showCountTitle()
//     })
// }

function showCountTitle() {
    let length = lengthTitles() - $(".toggle").filter(":checked").length
    
    if (length <= 1) {
        $(".count").html(length + " item")
        $(".main ").show()
        $(".footer").show()
    }
    else if (length >= 2) {
        $(".count").html(length + " items")
        $(".main ").show()
        $(".footer").show()
    }
    if (lengthTitles() == 0) {
        $(".footer").hide()
    }
}

let lengthTitles = function () {
    let length = 0;
    $.ajax({
        url: "http://localhost:3000/title",
        type: "get",
        async: false,
    }).done(function (data) {
        length = data.result.length
    })
    return length
};


$(document).ready(function () {
    getTitles();


    $(".new-todo").keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            event.preventDefault();
            let title = $(".new-todo").val()
            if (title != "") {
                $.ajax({
                    url: "http://localhost:3000/title",
                    type: "post",
                    data: {
                        title: title
                    }
                }).done(function (data) {
                    $(".new-todo").val("")
                    getTitles();
                })
            }
            else {
                $(".new-todo").val("")
            }
        }
    })

    $(".todo-list ").on("change", ".toggle", function () {
        showCountTitle()
        if ($(".toggle").is(":checked")) {
            $(".clear-completed").show();
        }
        else {
            $(".clear-completed").hide();
        }
        if ($(this).is(":checked")) {
            $(this).siblings("label").css("text-decoration", "line-through")
        }
        else {
            $(this).siblings("label").css("text-decoration", "none")
        }
        // showCountTitle(getTitles());

    })


    $(".todo-list").on("click", ".destroy", function () {
        id = $(this).siblings().not("label").val();
        $.ajax({
            url: "http://localhost:3000/title/" + id,
            type: "delete"
        }).done(function (data) {
            getTitles()
        })
    })

    $(".todo-list").on("dblclick", "label", function () {
        $(this).parent().hide()
        $(this).parent().siblings().show().focus()
    })

    $(".todo-list").on("focusout", ".edit", function () {
        $(this).hide()
        $(this).siblings().show()
    })

    $(".todo-list").on("keypress", ".edit", function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == 13) {
            let title = $(this).val();
            let id = $(this).siblings().children(".toggle").val();
            if (title == "") {
                $.ajax({
                    url: "http://localhost:3000/title/" + id,
                    type: "delete"
                }).done(function (data) {
                    getTitles();
                })
            }
            $.ajax({
                url: "http://localhost:3000/title/",
                type: "put",
                data: {
                    title: title,
                    id: id
                }
            }).done(function (data) {
                getTitles();
            })
        }
    })

    $(".clear-completed").on("click", function () {
        let arrGlobal = [];
        $.each($(".toggle:checked"), function () {
            arrGlobal.push($(this).val());
        });
        for (let i = 0; i < arrGlobal.length; i++) {
            arrGlobal[i] = parseInt(arrGlobal[i])
        }
        console.log(Array.isArray(arrGlobal))
       
        $.ajax({
            url: "http://localhost:3000/titles-delete/" ,
            method: "post",
            data:{
                arr: arrGlobal
            }
        }).done(function (data) {
            getTitles();
            $(".clear-completed").hide();
        })
    })

    var check = true
    $(".toggle-all").click(function () {
        if (check == true) {
            $(".toggle").prop("checked", true)
            check = false
        }
        else {
            $(".toggle").prop("checked", false)
            check = true
        }
        if ($(".toggle").is(":checked")) {
            $(this).siblings(".todo-list").children(".todo").children(".view").children(".toggle").siblings("label").css("text-decoration", "line-through")
            $(".clear-completed").show();
        }
        else {
            $(this).siblings(".todo-list").children(".todo").children(".view").children(".toggle").siblings("label").css("text-decoration", "none")
            $(".clear-completed").hide();
        }
        showCountTitle()
    })

    $(".all").on("click", function () {
        all();
    })

    $(".completed").on("click", function () {
        completed();
    })
    $(".active").on("click", function () {
        active();
    })
    $(".todo-list").on("click", ".toggle", function () {
        if (checkActive == true) {
            ($(this).parents(".todo").hide())

        }
        if (checkCompleted == true) {
            ($(this).parents(".todo").hide())
        }
        updateCompleted(this)
    })


})



function updateCompleted(th) {
    let id = $(th).val()
    let completed;
    if ($(th).is(":checked")) {
        completed = true;
    }
    else {
        completed = false;
    }
    $.ajax({
        url: "http://localhost:3000/title-completed",
        type: "put",
        data: {
            id: id,
            completed: completed
        }
    }).done(function (data) {
        // console.log(data)
    })
}
let checkActive = false;
let checkCompleted = false;

function all() {
    $(".todo").show();
    $(".all").css("border-color", "red")
    $(".completed").css("border-color", "")
    $(".active").css("border-color", "")
    checkActive = false
    checkCompleted = false;
}

function completed() {
    $(".completed").css("border-color", "red")
    $(".all").css("border-color", "")
    $(".active").css("border-color", "")
    $(".toggle").parents(".todo").hide()
    $.each($(".toggle:checked"), function () {
        ($(this).parents(".todo").show())
    })
    checkActive = false
    checkCompleted = true;
}

function active() {
    $(".active").css("border-color", "red")
    $(".completed").css("border-color", "")
    $(".all").css("border-color", "")
    $(".toggle").parents(".todo").show()
    $.each($(".toggle:checked"), function () {
        ($(this).parents(".todo").hide())
    })
    checkActive = true;
    checkCompleted = false;
}