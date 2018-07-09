'user strict'

class Rest {
    constructor({
      url,
      getAllResult,
      getAllTotal,
      getInput,
      getResult,
      updateInput,
      removeInput,
      addInput,
      spinner,
    }) {
      this.url = url;
      this.getAllResult = getAllResult;
      this.getAllTotal = getAllTotal;
      this.getInput = getInput;
      this.getResult = getResult;
      this.updateInput = updateInput;
      this.removeInput = removeInput;
      this.addInput = addInput;
      this.spinner = spinner;
      this.isActive = false;
      this.count = 1;
      this.summ = 0;
      this.textCont = '';
    }
  
    fetchUsInterval(data) {
      this.spinner.classList.add('visible');
      setTimeout(() => {
        this.isActive = true;
        this.getAllResult[0].innerHTML = '';
        this.fetchUserData(data);
      }, 1000);
    }
  
    getAllUsers () {
      this.spinner.classList.add('visible');
      event.target.textContent = 'refresh';
      fetch(this.url)
        .then(response => {
          if (response.ok) return response.json();
  
          throw new Error('Error' + response.statusText);
        })
        .then(this.fetchUserData.bind(this))
        .catch(err => console.log(err));
    };
  
    fetchUserData(data) {
      if (!this.isActive) return this.fetchUsInterval(data);
      this.count = 1;
      this.summ = 0;
      let textCont = '';
  
      data.data.forEach(user => {
        this.summ++;
  
        textCont += `
          <tr>
          <td>${this.count++}</td>
          <td>${user.id}</td>
          <td>${user.name}</td> 
          <td>${user.age}</td>
          </td>`;
      });
      this.getAllTotal.textContent = `Total ${this.summ} users`;
      return this.createUsersTable(textCont);
    }
  
    createUsersTable(text) {
      let content = `
              <table style="width:100%">
              <tr>
              <th>#</th>
              <th>ID</th>
              <th>NAME</th> 
              <th style="width:150px">AGE</th>
              </tr>
              ${text}
              </table>`;
      this.isActive = false;
      this.getAllResult[1].remove();
      this.getAllResult[0].innerHTML = content;
      this.spinner.classList.remove('visible');
    }
  
    getUserById(id) {
      fetch(`${this.url}/${id}`)
        .then(response => {
          if (response.ok) return response.json();
          throw new Error('Error' + response.statusText);
        })
        .then(data => {
          if (data.status === 500 || data.status === 404) {
            return alert(`User with id: ${id} not found!`);
          } else if (id === '') {
            return alert('Set ID first');
          }
          this.getUserContent(data.data);
        })
        .catch(err => console.log(err));
    }
  
    getUserContent(data) {
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
          `;
      this.getResult.innerHTML = content;
    }
  
    addUser(name, age) {
      const user = {
        name,
        age,
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
        .then(this.errorCatch)
        .catch(err => console.log(err))
    }
  
    errorCatch(data) {
      if (data.status === 201) {
        alert(`User ${addUserFormInput[0].value} added seccsesful!`)
      } else if (data.status === 200) {
        alert(`User was updated seccsesful!`)
      } else if (data.status === 500) {
        alert(data.errors[0])
      } else if (data.status === 404) {
        alert(`You need to writte ID first!`)
      }
    }
  
    removeUser(id) {
  
      fetch(`https://test-users-api.herokuapp.com/users/${id}`, {
  
          method: 'DELETE'
      })
      .then(response => {
          if (response.ok) return response.json();
          throw new Error('Error' + response.statusText)
      }).then(data =>{
          if (data.status === 200) {
              alert(`User with ID ${id} removed seccesfull`)
          } else if (data.status === 500) {
              alert(`ID [${id}] not found`)
          } else if (data.status === 404) {
              alert(`No ID selected`)
          }
      }).catch(err=>console.log(err))
  
  
    }
    updateUser(id, user) {
  
      fetch(`https://test-users-api.herokuapp.com/users/${id}`, {
              method: 'PUT',
              body: JSON.stringify(user),
              headers: {
                  "Content-type": "application/json; charset=UTF-8"
              }
          })
          .then(response => {
              if (response.ok) return response.json();
              throw new Error('Error' + response.statusText)
          })
          .then(this.errorCatch)
          .catch(err => console.log(err))
  
  
    }
  }