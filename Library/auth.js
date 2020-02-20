function submitForm() {
    const request = new XMLHttpRequest();

    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    window.localStorage.setItem("user", username);

    request.open('POST', '/login', true);
    request.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
    data = {
        username: username,
        password: password
    };
    request.addEventListener("load",function () {
        let receiverJson = JSON.parse(request.response);
        console.log(receiverJson.ok);
        if (receiverJson.ok)
        {
            window.location = 'lib';
        }
    });
    request.send(JSON.stringify(data));
}
