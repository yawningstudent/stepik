function getData() {

    return {
        id: get('_id'),
        name: get('name'),
        author: get('author'),
        year: get('year'),
    }
}
function get(id) {
    return document.getElementById(id).value;
}

function submitBookData() {
    let data = getData();
    let request = new XMLHttpRequest();
    request.open('POST', '/edit', true);
    request.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
    request.addEventListener("load", function () {
        window.location = '/lib';
    });
    request.send(JSON.stringify(data));
}