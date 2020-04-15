class Nav {
    
    static render() {
        // return Auth.currentUser.email ? `Hello, ${Auth.currentUser.email}` : 'Not logged in.'
        if (Auth.currentUser.email) {
            return `Hello, ${Auth.currentUser.email}
            <button id=logout class="logout-button">Logout</button>
            `
        } else {
            // Auth.renderLoginForm
            return `<br>
            <form class="auth-form" id="login-form-1" action="#" method="post">
                <input class="auth-form-input" id="login-form-email" type="text" name="email" value="" placeholder="email">
                <input class="auth-form-input" id="login-form-password" type="text" name="password" value="" placeholder="password">
                <input class="auth-form" id="login-form" type="submit" value="Log In">
            </form>
        
            <form class="signup-form" id="signup-form" action="#" method="post">
                <input id="signup-form-email" type="text" name="email" value="" placeholder="email">
                <input id="signup-form-password" type="password" name="password" value="" placeholder="password">
                <input class="signup-form" id="signup-form-submit" type="submit" value="Sign Up">
            </form>
        `
        }
    }

    static resetNav() {
        const navDiv = document.getElementById('nav')
        navDiv.innerHTML = this.render()
    }

    

}