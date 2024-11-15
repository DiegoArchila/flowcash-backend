const argon2 = require("argon2");

const encrypt = {};

/**
 * Hashe the plain text
 * @param {String} password in plain text
 * @returns the password hashed
 */
encrypt.hash= async (password) =>{

    const hashed = await argon2.hash(password);
    
    return hashed;
};

/**
 * Verify if the plain password is same to the pasword hashed
 * @param {String} hashed 
 * @param {String} plain 
 * @returns true if is same or false if not
 */
encrypt.verify = async (hashed, plain) => {

    if (await argon2.verify(hashed, plain)) {
        return true;
    } else {
        return false;
    }

}

module.exports = encrypt;