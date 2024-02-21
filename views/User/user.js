window.addEventListener("DOMContentLoaded", () => {
    axios
      .get(`http://localhost:3000/user/get-books`)
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
    const childElem = `<li class="booklist" id=${obj._id}>Book:  ${obj.name} <br>Author:  ${obj.author} <br>Price:  Rs ${obj.price}<br>
                          <button class='add-cart' onclick=addtocart(event,'${obj._id}')>Add to cart</button>
                          
                          </li>`;
    parentElem.innerHTML = parentElem.innerHTML + childElem;
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
  
  function addtocart(e, bookid) {
    const token = localStorage.getItem('token');
    const decodeToken = parseJwt(token);
    console.log(decodeToken);
  
    axios.post(`http://localhost:3000/user/add-to-cart/${bookid}`, null, {
        headers: {
            "Authorization": `${token}`
        }
    })
    .then((response) => {
        console.log("added to cart");
        borrowedbooks();
    })
    .catch((err) => {
        console.log(err);
    });
  
    borrowedbooks()
  }
  function borrowedbooks(){
  window.addEventListener("DOMContentLoaded", () => {
  
  
    const token  = localStorage.getItem('token')
    const decodeToken = parseJwt(token)
    console.log(decodeToken)
  
    axios
      .get(`http://localhost:3000/user/get-borrowed-books`,{ headers: {"Authorization" : token}} )
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
  borrowedbooks()
  
  function displayborrowedbooks(obj) {
    const parentElem = document.getElementById("borrowedbooks");
    const childElem = `<li class="booklist" id=${obj._id}>Book:  ${obj.name}<br>Author:  ${obj.author}<br>Price: Rs ${obj.price}<br>
                          <button class='return' onclick=returnbook(event,'${obj.bookid}')>Return</button>
                          
                          </li>`;
    parentElem.innerHTML = parentElem.innerHTML + childElem;
  }
  
  function returnbook(e, bookid) {
    const token = localStorage.getItem('token');
    const decodeToken = parseJwt(token);
    console.log(decodeToken);
  
    axios.post(`http://localhost:3000/user/return-book/${bookid}`, null, {
        headers: {
            "Authorization": `${token}`
        }
    })
    .then((response) => {
        console.log("added to list");
      
    })
    .catch((err) => {
        console.log(err);
    });
  
    
  }
  function returnedbooks(){
    window.addEventListener("DOMContentLoaded", () => {
    
    
      const token  = localStorage.getItem('token')
      const decodeToken = parseJwt(token)
      console.log(decodeToken)
    
      axios
        .get(`http://localhost:3000/user/get-returned-books`,{ headers: {"Authorization" : token}} )
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
      const childElem = `<li class="booklist" id=${obj._id}>Book:  ${obj.name}<br>Author:  ${obj.author}<br> Price:  Rs ${obj.price}
                           
                            
                            </li>`;
      parentElem.innerHTML = parentElem.innerHTML + childElem;
    }
  