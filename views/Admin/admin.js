function addbooks(event) {
    event.preventDefault();
  
    const name = event.target.name.value;
    const author = event.target.author.value;
    const price = event.target.price.value;
  
    const bookdetails = {
      name,
      author,
      price,
    };
    const token = localStorage.getItem("token");
    axios
      .post("http://localhost:3000/admin/add-books", bookdetails, {
        headers: { Authorization: token },
      })
      .then((response) => {
        display(response.data.bookdetails);
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
        document.body.innerHTML += `<div style="color: red;">${err}</div>`;
      });
  }
  
  function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
  
    return JSON.parse(jsonPayload);
  }
  
  window.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    const decodeToken = parseJwt(token);
    console.log(decodeToken);
  
    axios
      .get(`http://localhost:3000/admin/get-books`, {
        headers: { Authorization: token },
      })
      .then((response) => {
        //console.log(response)
        for (var i = 0; i < response.data.allBooks.length; i++) {
          console.log(response.data.allBooks[i]);
          display(response.data.allBooks[i]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
  
  function display(obj) {
    const parentElem = document.getElementById("allbooks");
    const encodedName = encodeURIComponent(obj.name);
    const encodedAuthor = encodeURIComponent(obj.author);
    const childElem = `<li class="booklist" id=${obj.id}>Book:  ${obj.name}<br>Author:  ${obj.author}<br>Price: Rs ${obj.price}<br>
                       <button class='edit' onclick=edit(event,'${obj._id}','${encodedName}','${encodedAuthor}','${obj.price}')>Edit</button></li>`;
    parentElem.innerHTML = parentElem.innerHTML + childElem;
  }
  function deletebook(bookid){
    axios.delete(`http://localhost:3000/admin/edit-books/${bookid}`)
  }
  function edit(e,bookid,bookname,author,price){
    document.getElementById('name').value= bookname;
    document.getElementById('author').value=author;
    document.getElementById('price').value=price;

    deletebook(bookid)
  }
  
  function borrowedbooks() {
    window.addEventListener("DOMContentLoaded", () => {
      const token = localStorage.getItem("token");
      const decodeToken = parseJwt(token);
      console.log(decodeToken);
  
      axios
        .get(`http://localhost:3000/admin/get-borrowed-books`, {
          headers: { Authorization: token },
        })
        .then((response) => {
          //console.log(response)
          for (var i = 0; i < response.data.allBooks.length; i++) {
            console.log(response.data.allBooks[i]);
            displayborrowedbooks(response.data.allBooks[i]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }
  borrowedbooks();
  
  function displayborrowedbooks(obj) {
    const parentElem = document.getElementById("borrowedbooks");
    const childElem = `<li class="booklist" id=${obj._id}>Book: ${obj.name} <br>Author: ${obj.author} <br>Price: Rs ${obj.price} <br>User taken: ${obj.username}</li>`;
    parentElem.innerHTML = parentElem.innerHTML + childElem;
  }
  
  function returnedbooks(){
    window.addEventListener("DOMContentLoaded", () => {
    
    
      const token  = localStorage.getItem('token')
      const decodeToken = parseJwt(token)
      console.log(decodeToken)
    
      axios
        .get(`http://localhost:3000/admin/get-returned-books`,{ headers: {"Authorization" : token}} )
        .then((response) => {
          //console.log(response)
          for (var i = 0; i < response.data.allBooks.length; i++) {
            console.log(response.data.allBooks[i]);
            displayreturnedbooks(response.data.allBooks[i]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
    }
    returnedbooks()
    
    function displayreturnedbooks(obj) {
      const parentElem = document.getElementById("returnedbooks");
      const childElem = `<li class="booklist" id=${obj._id}>Book:  ${obj.name} <br>Author:  ${obj.author} <br>Price:  Rs ${obj.price} <br>User used: ${obj.username}<br></li>`;
      parentElem.innerHTML = parentElem.innerHTML + childElem;
    }
  