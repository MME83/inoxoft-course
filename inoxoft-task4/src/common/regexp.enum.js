module.exports = {
    EMAIL_REGEXP: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    PASS_REGEXP: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,128})/,
    PHONE_REGEX: /^[0-9]{7,10}$/,
    ID_REGEX: /^[0-9a-fA-F]{24}$/,
};

/*
PASS_REGEXP: [
        { exp: /[0-9]/, msg: 'must contain at least one digit' },
        { exp: /[a-z]/, msg: 'must contain at least one lowercase' },
        { exp: /[A-Z]/, msg: 'must contain at least one uppercase' },
        { exp: /[!%&*\s]/, msg: 'must contain at least one special move !%&*' },
        { exp: /^.{8,20}$/, msg: 'must be 8-20 characters long' }
    ]
*/
