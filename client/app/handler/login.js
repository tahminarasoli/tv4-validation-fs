
export const loginFunction = (e) => {
    console.log("email");
    e.preventDefault()
    const email = document.getElementById('email1').value;
    console.log(email);
    const password = document.getElementById('pswd1').value;
    console.log(email)
    if (isEmpty(email, password)) {
        return;
    }
    getExistingUser().then((data) => {
        console.log(data)
        const activeUser = existingUser(data.users, email, password);
        if (!activeUser) {
            alert("please sign-up,you don't have account")
        } else {
            alert("Click on menu ")
        }
    })
}
async function getExistingUser() {
    try {
        const res = await fetch('/api/users');
        if (!res.ok) {
            const message = `An error has occurred: ${response.status}`;
            throw new error(message);
        }
        const usersInfo = await res.json();

        return usersInfo;
    } catch (error) { 
        error.message; 
    }
}


function isEmpty(email, password) {
    if (!Boolean(email.trim()) || !Boolean(password.trim())) {
        alert('Please pass your info');
        return true;
    }
}

function existingUser(data, email, password) {
    return data.find((userDatas) => {
        return userDatas.email === email && userDatas.password === password;
    });
}
