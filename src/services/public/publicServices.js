const { ValidationError, where, Op } = require("sequelize");
const db = require("../../database/models");
const encrypt = require("../../utils/encrypt");
const tokenJWT = require("../../utils/jwt");


const publicServices = {};

/**
 * Logs in a user using their email and password.
 *
 * @async
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<string>} - A Promise that resolves to the generated JWT token on successful login, or rejects with an error if the login fails.
 * @throws {Error} - Throws an error if the email or password is incorrect.
 */
publicServices.login = async (email, password) => {

    const user = await db.users.findOne({

        where: {
            email: { [Op.iLike]: email }
        },

        attributes: ['id', 'email', 'password', 'username', 'isActive'],
        include: [
            { model: db.roles, as: 'role' }
        ]
    });

    if (await encrypt.verify(user.password, password)) {

        if (!user.isActive) {
            throw new Error("Error: user is not allowed for login");
        }

        const token = tokenJWT.sign(user.id);

        return {
            id: user.id,
            username: user.username,
            role: {
                id: user.role.id,
                name: user.role.name,
            },
            token
        };

    } else {

        throw new Error("Error: email o password is wrong");

    }

}

module.exports = publicServices;