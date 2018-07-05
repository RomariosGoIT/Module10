'use strict'

const form = document.querySelector('.form')
const input = document.querySelector('.input')
const grid = document.querySelector('.grid')
const spinner = document.querySelector('.spinner-overlay')

const createImg =photos => {
    
    grid.innerHTML = '';
    photos.hits.forEach(cont =>{
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


const submitForm = event => {    
    event.preventDefault()
    spinnerToggle()
    fetchImage(input.value, 18).then(photos =>{
        createImg(photos);
        spinnerToggle();
    })
    event.target.reset();

}

form.addEventListener('submit', submitForm)


const spinnerToggle = () => {
    spinner.classList.toggle('visible')
}