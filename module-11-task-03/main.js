'use strict'

/*
  Документация API: https://github.com/trostinsky/users-api#users-api

  Просмотр всех записей: https://test-users-api.herokuapp.com/users/ 

  Написать функцию fetchUsers, которая используя REST сервис 
  по адресу https://test-users-api.herokuapp.com/users/
  посылает get запрос и получает ответ.
  
  Результатом fetch будет массив объектов с полями.
  
  В элемент result поместить таблицу состоящую из 2-х
  столбцов след формата, где кол-во строк будет такое как
  и кол-во объектов пользователей в ответе:
  
    ID | NAME | AGE
    id | name | age  
    id | name | age  
*/

const getBtn = document.querySelector(".js-get");
const result = document.querySelector(".result");

getBtn.addEventListener("click", fetchUsers);

/*
  @param {FormEvent} evt
*/
function fetchUsers(evt) {
    evt.preventDefault()
    fetch('https://test-users-api.herokuapp.com/users')
        .then(response => {
            if (response.ok) return response.json()

            throw new Error('Error' + response.statusText)
        }).then(fetchUserData)
        .catch(err => console.log(err))
}

function fetchUserData(data) {
    let count = 1;
    let textCont = ''
    data.data.forEach(user => {    
    textCont += `
    <tr>
    <td>${count++}</td>
    <td>${user.id}</td>
    <td>${user.name}</td> 
    <td>${user.age}</td>
    </td>`        
    })
    return createUsersTable(textCont);
}

function createUsersTable(text) {
    let content = `
        <table style="width:100%">
        <tr>
        <th>#</th>
        <th>ID</th>
        <th>NAME</th> 
        <th>AGE</th>
        </tr>
        ${text}
        </table>`
        result.innerHTML = content
    
}