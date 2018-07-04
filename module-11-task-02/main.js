'use strict'


/*
  Написать функцию fetchUserData, которая использует
  apiUrl + текущее значение input для составления запроса.
  
  Формат полного url таков:
    https://api.github.com/users/имя-пользователя
    
  Документация по Git API:
    https://developer.github.com/v3/
    
  С помощью fetch сделать запрос по составленому адресу. 
  Обязательно обработать вариант с ошибкой запроса используя catch. 
  
  Результат запроса вывести в поле result в формате:
    Avatar: аватартка 
    Username: логин
    Bio: описание профиля
    Public repos: кол-во открытых репозиториев
  
  Все необходимые данные есть в ответе от API.
*/

const input = document.querySelector("input");
const submitBtn = document.querySelector("#js-submit");
const result = document.querySelector(".result");
const apiUrl = "https://api.github.com/users/";

submitBtn.addEventListener("click", fetchUserData);

/*
  @param {FormEvent} evt
*/

function fetchUserData(evt) {
    evt.preventDefault()
    fetch(apiUrl + input.value).then(res => {
        if (res.ok) return res.json()
        throw new Error('Error' + res.statusText)
    }).then(data => {
        let bio = ''
        if (data.bio === null) {
            bio = '---'
        } else {
            bio = data.bio
        }
        result.innerHTML =
            `<img src='${data.avatar_url}' width='150px'> <br> 
        Username: <strong>${data.name}</strong> <br>
        Bio: <strong>${bio}</strong> <br>
        Public repos: <strong>${data.public_repos}</strong>`
    }).catch(err => console.log(err))

}

fetch('https://api.github.com/users').then(res => res.json())
    .then(data => console.log(data))