class User {
    constructor({
        name = 'USER',
        age = '18',
        login = 'user@gmail.com',
        password = 'pas$$ord'
    } = {}) {
        this.name = name;
        this.age = age;
        this.login = login;
        this.password = password;
    }

    static toResponse(user) {
        const { name, age, login } = user;
        return { name, age, login };
    }
}

module.exports = User;
