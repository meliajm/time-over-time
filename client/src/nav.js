class Nav {
    static render() {
        return Auth.currentUser.email ? `Hello, ${currentUser}` : 'Not logged in.'
    }

    static resetNav() {
        const navDiv = document.getElementById('nav')
        navDiv.innerHTML = this.render()
    }
}