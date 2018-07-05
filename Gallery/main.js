'use strict'

const form = document.querySelector('.form')
const input = document.querySelector('.input')
const grid = document.querySelector('.grid')

const createImg =(data) => {
    grid.innerHTML = '';
    data.hits.forEach(cont =>{
        let content = `<div class ='grid-item'><img src='${cont.largeImageURL}' alt=''></div>`;
        return grid.innerHTML += content;
    })
}

const fetchImage = (query, count) => {
    const url = `https://pixabay.com/api/?key=9464143-b7cbb21d169259e439c99d06c&q=${query}&image_type=photo&per_page=${count}`

    return fetch(url).then(respone => {
            if(respone.ok) return respone.json()
            throw new Error ('Error' + respone.statusText)
            })
        .catch(err => console.log(err))
}


const submitForm = (event) => {
    event.preventDefault()
    fetchImage(input.value, 12).then(createImg)

}

form.addEventListener('submit', submitForm)


