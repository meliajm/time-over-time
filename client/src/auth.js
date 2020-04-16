class Auth {
    
    static currentUser = {}

    static setCurrentUser(user) {
        this.currentUser = user
    }
    static getCurrentUser() {
        return Api.get('/get_current_user')
        .then(response => {
            if (response.logged_in) {
                this.setCurrentUser(response.current_user)
                // console.log('getcurrentuser')
                // Nav.resetNav()
                console.log(`getcurrentuser ${Auth.currentUser.email}`)
            } else {
                console.log(response.error)
            }
        })
    }

    // will need to clear out form too
    static get renderLoginForm() {
        console.log('here')
        return `
        <br>
        <form class="auth-form" id="login-form" action="#" method="post">
            <input class="auth-form-input" id="login-form-email" type="text" name="email" value="" placeholder="email">
            <input class="auth-form-input" id="login-form-password" type="text" name="password" value="" placeholder="password">
            <input class="auth-form" id="login-form" type="submit" value="Log In">
        </form>`

    }

    static handleLogin() {
        // let bool = 'do not rerender circle only the one circle needed'
        const email = document.getElementById('login-form-email').value 
        const password = document.getElementById('login-form-password').value

        const userData = {
            user: {
                email,
                password 
            }
        }
        if (email && password) {
            Api.post('/login', userData)
            .then(response => {
                if (response.error) {
                    console.log(response.error)
                } else {
                    this.setCurrentUser(response.current_user)
                    Nav.resetNav()
                    console.log('here----------')
                    Task.getTasks()
                }
            })
        } else {
            console.log("Email and password combo doesn't look right.")
        }
        clearAuthForm()
    }

    static loginOrSignUp(url, email, password) {
        const userData = {
            user: {
                email,
                password 
            }
        }
        if (email && password) {
            Api.post(url, userData)
            .then(response => {
                if (response.error) {
                    console.log(response.error)
                } else {
                    this.handleResponse.bind(this)
                    // console.log('this')
                    // console.log(this)
                    // JSON.parse(response.current_user)
                    this.setCurrentUser(response.current_user)
                    // console.log(response)
                    Nav.resetNav() 
                    console.log('a')
                }
            })
        } else {
            console.log("hmm.")
        }
        // clearAuthForm()
    }

    static handleSignup() {
        const email = document.getElementById('signup-form-email').value
        const password = document.getElementById('signup-form-password').value
        this.loginOrSignUp('/users', email, password)
    }

    static handleResponse(response) {
        if (response.error) {
            console.log(response.error)
        } else {
            this.setCurrentUser(new User(response.current_user))
            console.log('b')
            Nav.resetNav()
        }
    }

    static logout() {
        Api.logout('/logout')
        .then(response => {
            if (response.error) {
                console.log(response.error)
            } else {
                this.currentUser = {}
                console.log(Auth.currentUser.email)
                Nav.resetNav()
                Task.all = []
                Task.clearTasksFromDom()
                // clear circle
                Task.clearDivSquare()
            }
        })
      }

}