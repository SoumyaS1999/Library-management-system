function usersignup(event) {
    event.preventDefault();
  
    const name = event.target.username.value;
    const email = event.target.useremail.value;
    const password = event.target.userpassword.value;
  
    const signupDetails = {
      name,
      email,
      password,
    };
    axios
      .post("http://localhost:3000/user/signup", signupDetails)
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          window.location.href = "../Login/login.html";
        } else {
          throw new Error("Failed to login");
        }
      })
      .catch((err) => {
        console.log(err);
        document.body.innerHTML += `<div style="color: red;">${err}</div>`;
      });
  }
  
  function signup(event) {
    event.preventDefault();
  
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
  
    const signupDetails = {
      name,
      email,
      password,
    };
    axios
      .post("http://localhost:3000/admin/signup", signupDetails)
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          window.location.href = "../Login/login.html";
        } else {
          throw new Error("Failed to login");
        }
      })
      .catch((err) => {
        console.log(err);
        document.body.innerHTML += `<div style="color: red;">${err}</div>`;
      });
  }
  