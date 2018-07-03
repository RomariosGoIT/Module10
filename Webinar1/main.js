'use strict';

// const content = document.querySelector('.js-content');
// const button = document.querySelector('.js-btn');

// function active() {
//   fetch('https://jsonplaceholder.typicode.com/posts/2')
//     .then(responce => {
//       if (responce.ok) return responce.json();

//       throw new Error('Error' + responce.statusText);
//     })
//     .then(date => {
//       content.textContent = JSON.stringify(date);
//       console.log(date);
//     })
//     .catch(err => console.log('ERROR:' + err));
// }

// button.addEventListener('click', active);

// const newPost = {
//   author: 'Roma',
//   body: 'CRUD is awesome!',
// };

// const url = 'https://jsonplaceholder.typicode.com/posts';

// const options = {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify(newPost),
// };

// fetch(url, options).then(res => {
//   if (res.ok) return res.json();
//   throw new Error('ERROR' + res.statusText);
// }).then(date => {
//     console.log(date)
// }).catch(err => console.log('ERROR' + err))

// const getUserById = id => fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
// .then(res => { if(res.ok) return res.json()})

// getUserById(10).then(post => console.log(post))

///===================== UPDATE

// const postToUpdate = {
//     body: 'CRUD is realy awesome!'
// }

// const putOption = {
//     method: 'PUT',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body:JSON.stringify(postToUpdate)
// }

// fetch('https://jsonplaceholder.typicode.com/posts/2', putOption)
// .then(res => { if(res.ok) return res.json()})
// .then(post => console.log(post))

//================== DELETE

// fetch('https://jsonplaceholder.typicode.com/posts/2',{method: 'DELETE'})
// .then(()=> console.log('succses!!'))
// .catch(err => console.log(err))

class Gallery {
  constructor({url, id}) {
    this.url = url;
    this.id = id;
    this.count = 0;
    this.body;
    this.content;
    this.nextButton;
    this.prevButton;
    this.photo;
    this.createSelection();
    this.addEventListener();
    this.default();
  }
  default() {
    this.getBackEnd(this.id);
    this.count += 1;
  }

  createTag(src, alt) {
    this.photo.setAttribute('src', src);
    this.content.textContent = alt;
  }

  getImage({ target }) {
    if (target === this.nextButton) {
      this.count++;
    } else if (target === this.prevButton && this.count > 1) {
      this.count--;
    } else {
      return;
    }
    this.getBackEnd(this.count);
  }

  getBackEnd(value) {
    fetch(`${this.url}${value}`)
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('ERROR' + res.statusText);
      })
      .then(date => {
        const imgUrl = date.url;
        const altImg = date.title;
        this.createTag(imgUrl, altImg);
      })
      .catch(err => console.log('ERROR' + err));
  }

  addEventListener() {
    this.body.addEventListener('click', this.getImage.bind(this));
  }

  createSelection() {
    this.body = document.querySelector('body');
    this.content = document.querySelector('.js-content');
    this.nextButton = document.querySelector('.js-next');
    this.prevButton = document.querySelector('.js-prev');
    this.photo = document.querySelector('.js-img');
  }
}

const newGall = new Gallery({
  url: 'https://jsonplaceholder.typicode.com/photos/',
  id: 1,
});
