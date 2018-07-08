const button = document.querySelector('.start-button')
const getButton = document.querySelector('.js-get')
const submitForm = document.querySelector('.sumbit-form')
const searchForm = document.querySelector('.getUser-form')
const inputUserId = searchForm.querySelector('input')
const allUsersForm = document.querySelector('.all-users')
const allUsersTable = allUsersForm.querySelector('table');
const totallUSersCont = document.querySelector('.total')

const result = document.querySelector('.result')
const getAllResult = document.querySelector('.getAll-result')

const inputAge = document.querySelector('#Uage');
const inputName = document.querySelector('#Uname');
const spinner = document.querySelector('.spinner-overlay')


const updateForm = document.querySelector('.update-form')
const inputElemtn = updateForm.querySelectorAll('input')

const deleteForm = document.querySelector('.delete-form')
const deleteFormInput = deleteForm.querySelector('input')


let isActive = false;

submitForm.addEventListener('submit', submitUser)

searchForm.addEventListener('submit', getUserById)

getButton.addEventListener('click', getAllUsers)

updateForm.addEventListener('submit', updateUser)

deleteForm.addEventListener('submit', deleteUser)


function deleteUser(evt) {
    evt.preventDefault();
    fetch(`https://test-users-api.herokuapp.com/users/${deleteFormInput.value}`, {

        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) return response.json();
        throw new Error('Error' + response.statusText)
    }).then(data =>{
        if (data.status === 200) {
            alert(`User with ID ${deleteFormInput.value} removed seccesfull`)
        } else if (data.status === 500) {
            alert(`ID [${deleteFormInput.value}] not found`)
        } else if (data.status === 404) {
            alert(`No ID selected`)
        }
    }).catch(err=>console.log(err))
}




function updateUser(evt) {
    evt.preventDefault()
    if (Number.isNaN(inputElemtn[2].value)) return alert('Age should be a number');
    let updateUser = {
        name: inputElemtn[1].value,
        age: inputElemtn[2].value,
    }
    fetch(`https://test-users-api.herokuapp.com/users/${inputElemtn[0].value}`, {
            method: 'PUT',
            body: JSON.stringify(updateUser),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response => {
            if (response.ok) return response.json();
            throw new Error('Error' + response.statusText)
        })
        .then(errorCatch)
        .catch(err => console.log(err))

    console.log(inputElemtn[0].value)
}


function getAllUsers(evt) {
    evt.preventDefault();
    spinner.classList.add('visible');
    getButton.textContent = 'refresh';
    fetch('https://test-users-api.herokuapp.com/users')
        .then(response => {
            if (response.ok) return response.json()

            throw new Error('Error' + response.statusText)
        }).then(fetchUserData)
        .catch(err => console.log(err))
}

function fetchUsInterval(data) {
    spinner.classList.add('visible')
    setTimeout(() => {
        isActive = true;
        getAllResult.innerHTML = ''
        fetchUserData(data)
    }, 1000);
}

function fetchUserData(data) {
    if (!isActive) return fetchUsInterval(data);
    let count = 1;    
    let summ = 0;
    
    let textCont = ''
    data.data.forEach(user => {
    summ ++;
    
        textCont += `
    <tr>
    <td>${count++}</td>
    <td>${user.id}</td>
    <td>${user.name}</td> 
    <td>${user.age}</td>
    </td>`
    })
    totallUSersCont.textContent = `Total ${summ} users`;
    return createUsersTable(textCont);
}

function createUsersTable(text) {
    let content = `
        <table style="width:100%">
        <tr>
        <th>#</th>
        <th>ID</th>
        <th>NAME</th> 
        <th style="width:150px">AGE</th>
        </tr>
        ${text}
        </table>`
    isActive = false;
    allUsersTable.remove()
    getAllResult.innerHTML = content;
    spinner.classList.remove('visible')

}



function getResult(data) {
    let content = `
    <table style="width:100%">
  <tr>
    <th>User Name</th> 
    <th>User AGE</th>
  </tr>
  <tr>
    <td>${data.name}</td>
    <td>${data.age}</td>
  </tr>   
    </table>
    `
    result.innerHTML = content;
}


function getUserById(evt) {
    evt.preventDefault();
    let id = inputUserId.value;

    fetch(`https://test-users-api.herokuapp.com/users/${id}`)
        .then(response => {
            if (response.ok) return response.json();
            throw new Error('Error' + response.statusText)
        })
        .then(data => {
            if (data.status === 500 || data.status === 404) {
                return alert(`User with id: ${id} not found!`);
            } else if (id === '') {
                return alert('Set ID first');
            }
            getResult(data.data);
        })
        .catch(err => console.log(err))
}



function submitUser(evt) {
    evt.preventDefault()

    const user = {
        name: inputName.value,
        age: inputAge.value,
    }

    fetch('https://test-users-api.herokuapp.com/users/', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => {
            if (response.ok) return response.json();
            throw new Error('Error' + response.statusText)
        })
        .then(errorCatch)
        .catch(err => console.log(err))
}

function errorCatch(data) {
    if (data.status === 201) {
        alert(`User ${inputName.value} added seccsesful!`)
    } else if (data.status === 200) {
        alert(`ID ${inputElemtn[0].value} was updated seccsesful!`)
    } else if (data.status === 500) {
        alert(data.errors[0])
    } else if (data.status === 404) {
        alert(`You need to writte ID first!`)
    }
}


fetch('https://test-users-api.herokuapp.com/users')
    .then(res => res.json()).then(data => console.log(data)).catch(err => console.log(err))