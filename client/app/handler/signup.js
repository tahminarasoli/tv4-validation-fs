export const signupFunction = (e) => {
	e.preventDefault();
	//	debugger;
	const email = document.getElementById('email2').value;
	const username = document.getElementById('username').value;
	const password= document.getElementById('pswd2').value;
	console.log(email2);

	const newUser = {
		
		name: username,
        email: email,
		password:password
		
	};
    console.log(newUser)
    getExistingUser().then((data) => {
        console.log(data)
        const activeUser = existingUser(data.users, email);
        if (activeUser) {
            alert("email already present in database")
        } else {
            fetch('/api/users', {
                method: 'POST',
                body: JSON.stringify(newUser),
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
            })
                .then((res) => {
                    if (res.ok) {
                    
                        
                        return res.json();
                    }
                })
                .catch((err) => console.log(err));
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
    function existingUser(data, email) {
        return data.find((userDatas) => {
            return userDatas.email === email;
        });
    }
