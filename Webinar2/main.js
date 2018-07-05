'use strict'


// const userSettings = {
//     name: 'Roma',
//     age: 35,
//     country: 'Kiev',
// }

// localStorage.setItem('userData', JSON.stringify(userSettings))


// const getformLS = JSON.parse(localStorage.getItem('userData'))

// console.log(getformLS)

//=========================


// fetch('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
// .then(res => res.json()).then(data => console.log(data))


fetch('http://api.apixu.com/v1/current.json?key=adc42aa46ea244bea14115138180407&q=kiev')
.then(res=>res.json()).then(data=>console.log(data))