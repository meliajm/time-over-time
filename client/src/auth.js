class Auth {
    
    static currentUser = {}

    static setCurrentUser(user) {
        this.currentUser = user
    }

    static getCurrentUser() {
        Api.get('/get_current_user')
        .then(response => {
            if (response.logged_in) {
                this.setCurrentUser(response.current_user)
                Nav.resetNav()
            } else {
                console.log(response.error)
            }
        })
    }

    // will need to clear out form too
    static get renderLoginForm() {
        return `
        <form class="auth-form" id="login-form" action="#" method="post">
        <input id="login-form-email" type="text" name="email" value="" placeholder="email">
        <input id="login-form-password" type="text" name="password" value="" placeholder="password">
        <input class="auth-form" id="login-form" type="submit" value="Log In">
      </form>`

    }

    static handleLogin() {
        const email = document.getElementById('login-form-email')
        const password = document.getElementById('login-form-password')

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
                }
            })
        } else {
            console.log("Email and password combo doesn't look right.")
        }
    }





}