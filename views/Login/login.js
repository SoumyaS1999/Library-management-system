function login(event){ 
    event.preventDefault();

    const email=event.target.email.value;
    const password=event.target.password.value;


    const loginDetails ={
        email,
        password
    }
    axios.post("http://localhost:3000/admin/login",loginDetails)
    .then((response)=>{
        console.log(response)
        if(response.status===200){
            alert(response.data.message)
            localStorage.setItem('token', response.data.token)
            window.location.href="./admin.html"
        }else{
            throw new Error(response.data.message)
        }
    })
    .catch((err)=>{
        console.log(err)
        document.body.innerHTML += `<div style="color: red;">${err}</div>`;
    })

    }