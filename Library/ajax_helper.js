function add_book(id, name, author, year) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if(this.readyState === 4 && this.status === 200) {
            console.log("POST req ready.");
            
        }
    };
    xhttp.open('POST', "/", true);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    const params = "id=" + id + "&"
                 + "name=" + name + "&"
                 + "author=" + author + "&"
                 + "year=" + year;
    xhttp.send(params);
}

function get_book(id) {
    let date = new Date();
    let duration = (date.getDate()) + "." + (date.getMonth()+1) + "." + date.getFullYear();
    console.log(duration);

    const data = {
        id: id,
        ret_date: duration
    };
    const request = new XMLHttpRequest();
    request.open('POST', '/get_book', true);
    request.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
    request.addEventListener("load", function () {
        window.location = '/lib';
    });
    request.send(JSON.stringify(data));
}

function return_book(id) {
    console.log('PUT BOOK ' + id);
    let data = {id: id};
    const request = new XMLHttpRequest();
    request.open('POST', '/put/', true);
    request.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
    request.addEventListener("load",function () {
        if (request.readyState === 4 && request.status === 200) {
            window.location = '/lib';
        }
    });
    request.send(JSON.stringify(data));
}

function create_book() {
    add_book(document.getElementById("book_num").value,
             document.getElementById("book_name").value,
             document.getElementById("book_author").value,
             document.getElementById("book_year").value);
}

function remove_book_request() {
    remove_book(document.getElementById("book_num_remove").value)
}

function remove_book(id) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if(this.readyState === 4 && this.status === 200)
            console.log("DELETE req ready.");
    };
    xhttp.open('DELETE', "/lib/" + id, true);
    xhttp.send();
}

function edit(id) {
    window.location = '/lib/' + id;
}

function change_user() {
    window.location = '/login';
}

function filter(id) {
    let data = {id: id};
    console.log(data.id);
    const request = new XMLHttpRequest();
    request.open('POST', '/filter', true);
    request.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
    request.addEventListener("load",function () {
        if (request.readyState === 4 && request.status === 200) {
            location.reload();
        }
    });
    request.send(JSON.stringify(data));
}
