/*
  Документация API: https://github.com/trostinsky/users-api#users-api

  Просмотр всех записей: https://test-users-api.herokuapp.com/users/ 

  Написать функцию getUserByName, которая используя REST сервис 
  по адресу https://test-users-api.herokuapp.com/users/
  посылает запрос с name введенным в input.
 
  Результатом fetch будет ответ от сервера, 
  вывести содержимое всего ответа (id, name, age) 
  или 'Такого пользователя в списке нет!'.
*/

const input = document.querySelector("input");
const postBtn = document.querySelector(".js-post");
const result = document.querySelector(".result");

postBtn.addEventListener("click", getUserByName);

const url = 'https://test-users-api.herokuapp.com/users/'

function getUserByName(evt) {
    evt.preventDefault()
    fetch(url + input.value)
    .then(response => {
        if(response.ok) return response.json()
        throw new Error ('Error' + response.textContent)
    }).then(data => {
        if(data.status === 500) return alert('Такого пользователя в списке нет!')
        showUser(data.data)
    })
    .catch(err => console.log(err))
}


function showUser (data) {
    let content = `
    <table style="width:100%">
  <tr>
    <th>Use ID</th>
    <th>User Name</th> 
    <th>User AGE</th>
  </tr>
  <tr>
    <td>${data.id}</td>
    <td>${data.name}</td>
    <td>${data.age}</td>
  </tr>
    `
    return result.innerHTML = content;
}

fetch('https://test-users-api.herokuapp.com/users')
.then(res=>res.json()).then(data=>console.log(data))