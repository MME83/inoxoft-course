class User {
    constructor({
        _id = 'id',
        name = 'USER',
        email = 'user@gmail.com',
        password = 'pas$$ord',
        role = 'user',
        createdAt = 'data',
        updatedAt = 'data',
        flats = [],
    } = {}) {
        this.id = _id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.flats = flats;
    }

    static toResponse(user) {
        const {
            _id,
            name,
            email,
            role,
            createdAt,
            flats,
        } = user;

        return {
            _id,
            name,
            email,
            role,
            createdAt,
            flats
        };
    }
}

module.exports = User;
