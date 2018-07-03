'use strict';
/*
  Написать функцию fetchCountryData, которая использует
  apiUrl + текущее значение input для составления запроса.
  
  Формат полного url таков:
    https://restcountries.eu/rest/v2/name/имя-страны
    
  С помощью fetch сделать запрос по составленому 
  адресу. Обязательно обработать вариант с ошибкой запроса
  используя catch. 
  
  Результат запроса вывести в поле result в формате:
    Country name: имя страны
    Capital: столица
    Main currency: название денежной единицы
    Flag: флаг страны
  
  Все необходимые данные есть в ответе от API.
  
  PS: при отправке формы перезагружается страница,
  решите эту задачу вспомнив о том, как остановить
  поведение по умолчанию.
*/

const input = document.querySelector("input");
const submitBtn = document.querySelector(".js-submit");
const result = document.querySelector(".js-result");
const apiUrl = "https://restcountries.eu/rest/v2/name/";

submitBtn.addEventListener("click", fetchCountryData);

/*
  @param {FormEvent} evt
*/
function fetchCountryData(evt) {
    evt.preventDefault()
    fetch(apiUrl + input.value)
        .then(res => {
            if (res.ok) return res.json();
            throw new Error('Error' + res.statusText);
        }).then(data => {
            data.forEach(val => {
                let curency = val.currencies[0].name;
                result.innerHTML = `Country name: <strong>${val.name}</strong>; <br>
                Capital: <strong>${val.capital}</strong>; <br>
                Main currency: <strong>${curency}</strong>; <br>
                Flag: <br> <img src='${val.flag}' width='150px' style='margin-left:60px'>`
            })

        })
        .catch(err => console.log('ERROR' + err))
}