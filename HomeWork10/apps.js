'use strict';

const getAllUsers = document.querySelector('.getAll-form');
const getAllUsersResult = document.querySelectorAll('.getAll-result');
const getAllUsersTotal = document.querySelector('.total');

const getUserForm = document.querySelector('.getUser-form');
const getUserFormInput = getUserForm.querySelectorAll('input');
const getUserFormResult = document.querySelector('.getUser-result');

const updateUserForm = document.querySelector('.update-form');
const updateUserFormInput = updateUserForm.querySelectorAll('input');

const removeUserForm = document.querySelector('.delete-form');
const removeUserFormInput = removeUserForm.querySelectorAll('input');

const addUserForm = document.querySelector('.addUser-form');
const addUserFormInput = addUserForm.querySelectorAll('input');

const spinner = document.querySelector('.spinner-overlay');


const newRest = new Rest({
  url: 'https://test-users-api.herokuapp.com/users',
  getAllResult: getAllUsersResult,
  getAllTotal: getAllUsersTotal,
  getInput: getUserFormInput,
  getResult: getUserFormResult,
  spinner,
});

function getUserFromId() {
  event.preventDefault();
  let id = getUserFormInput[0].value;
  newRest.getUserById(id);
  event.target.reset()
}
function addNewUser() {
  event.preventDefault();
  let name = addUserFormInput[0].value;
  let age = addUserFormInput[1].value;
  newRest.addUser(name,age)
  event.target.reset()
}
function removeUserById() {
  event.preventDefault();
  let id = removeUserFormInput[0].value;
  newRest.removeUser(id)
  event.target.reset()
}

function updateUserById () {
  event.preventDefault();
  let id = updateUserFormInput[0].value
  let user = {
    name: updateUserFormInput[1].value,
    age: updateUserFormInput[2].value,
}
  newRest.updateUser(id, user)
  event.target.reset()
}

getAllUsers.addEventListener('click', newRest.getAllUsers.bind(newRest));


getUserForm.addEventListener('submit', getUserFromId);

addUserForm.addEventListener('submit', addNewUser);


removeUserForm.addEventListener('submit', removeUserById);

updateUserForm.addEventListener('submit', updateUserById);