const { ValidationError } = require("sequelize");
const db = require("../../database/models");
const encrypt = require("../../utils/encrypt");

/**
 * @module usersAdminServices
 * Provides administrative services for managing users in the system.
 */
const usersAdminServices={};


/**
 * Creates a new user in the database.
 * 
 * @async
 * @function create
 * @memberof module:usersAdminServices
 * @param {Object} newUser - The new user's data.
 * @param {string} newUser.names - The user's full name.
 * @param {number} newUser.dnitype_id - The ID of the DNI type.
 * @param {string} newUser.dninumber - The user's DNI number.
 * @param {number} newUser.role_id - The ID of the user's role.
 * @param {string} newUser.username - The username.
 * @param {string} newUser.email - The email address.
 * @param {string} newUser.password - The user's plain-text password.
 * @param {string} [newUser.notes] - Optional notes about the user.
 * @throws {ValidationError} If the input data is invalid.
 */
usersAdminServices.create= async(newUser)=>{
        
        await db.users.create({
            names: newUser.names,
            dnitype_id: newUser.dnitype_id,
            dninumber: newUser.dninumber,
            role_id: newUser.role_id,
            username: newUser.username,
            email: newUser.email,
            password: await encrypt.hash(newUser.password),
            notes: newUser.notes || null
        });
};

/**
 * Updates a user's information in the database.
 * 
 * @async
 * @function update
 * @memberof module:usersAdminServices
 * @param {Object} updateUser - The updated user data.
 * @param {number} id - The ID of the user to update.
 * @throws {ValidationError} If the user with the specified ID is not found or the update fails.
 */
usersAdminServices.update = async (updateUser, id) => {

    const user = await db.users.findByPk(id);

    if (!user) {
        throw new ValidationError(`Don't found the register with id ${id}`);
    }

    user.names=updateUser.names;
    user.dnitype_id=updateUser.dnitype_id;
    user.dninumber=updateUser.dninumber;
    user.role_id=updateUser.role_id;
    user.username=updateUser.username;
    user.email=updateUser.email;
    user.isActive=updateUser.isActive;
    user.notes=updateUser.notes;

    const updated = await user.save();

    if (!updated) {
        throw new ValidationError(`Failed to update the register with ID \"${id}\", is possible that it's not exists, or some field is incorrect.`)
    }

};

/**
 * Updates a user's password in the database.
 * 
 * @async
 * @function updatePassword
 * @memberof module:usersAdminServices
 * @param {Object} updateUser - The updated user data containing the new password.
 * @param {number} id - The ID of the user to update.
 * @throws {ValidationError} If the user with the specified ID is not found or the update fails.
 */
usersAdminServices.updatePassword = async (updateUser, id) => {

    const user = await db.users.findByPk(id);

    if (!user) {
        throw new ValidationError(`Don't found the register with id ${id}`);
    }

    const hashed= await encrypt.hash(updateUser.password)

    user.password=hashed;

    const updated = await user.save();

    if (!updated) {
        throw new ValidationError(`Failed to update the register with ID \"${id}\", is possible that it's not exists, or some field is incorrect.`)
    }

};

/**
 * Retrieves a paginated list of all users in the database.
 * 
 * @async
 * @function getAlls
 * @memberof module:usersAdminServices
 * @param {number} [page] - The current page number.
 * @param {number} [count] - The number of users to retrieve per page.
 * @returns {Object} Paginated results.
 * @property {number} currentPage - The current page.
 * @property {number} totalPages - The total number of pages.
 * @property {number} totalRow - The total number of rows.
 * @property {Array<Object>} data - The retrieved users.
 */
usersAdminServices.getAlls = async (page, count) => {

    let results = {};

    if (page && count) {

        results = await db.users.findAndCountAll(
            {
                attributes:['id','names','dnitype_id', 'dninumber', 'role_id', 'username', 'email','isActive','notes'],
                include: [
                    { model: db.dnitypes, as: 'dnitype' },
                    { model: db.roles, as: 'role' }
                ],
                limit: count,
                offset: (page - 1) * count,
                order: [
                    ['names', 'ASC']
                ]
            }
        );

    } else {
        results = await db.users.findAndCountAll({
            attributes:['id','names','dnitype_id', 'dninumber', 'role_id', 'username', 'email','isActive','notes'],
            include: [
                { model: db.dnitypes, as: 'dnitype' },
                { model: db.roles, as: 'role' }
            ],
            order: [
                ['names', 'ASC']
            ]
        });
        return {
            count: results.row,
            data: results
        }
    }

    console.log("Encontre usuarios: ",results)

    return {
        currentPage: parseInt(page),
        totalPages: Math.ceil(results.count / count),
        totalRow: results.count,
        data: results.rows
    }

};

/**
 * Finds a user by their ID.
 * 
 * @async
 * @function findById
 * @memberof module:usersAdminServices
 * @param {number} id - The ID of the user to find.
 * @returns {Object} The found user.
 * @throws {ValidationError} If the user with the specified ID is not found.
 */
usersAdminServices.findById= async(id)=>{

    const found = await db.users.findByPk(id,{
        attributes:['id','names','dnitype_id', 'dninumber', 'role_id', 'username', 'email','isActive','notes'],
            include: [
                { model: db.dnitypes, as: 'dnitype' },
                { model: db.roles, as: 'role' }
            ]
    });
    
    if (!found) {
        throw new ValidationError(`the register with ID \"${id}\" it was not found`)
    }

    return found;

};

/**
 * Validates if a user is an administrator based on their role.
 *
 * This function fetches a user by their ID, checks their role, 
 * and determines if the user is an admin. Throws an error if the 
 * user is not found or if the user's role is not 'admin'.
 *
 * @async
 * @function
 * @param {number|string} id - The unique identifier of the user to validate.
 * @returns {Promise<boolean>} - Resolves to `true` if the user is an admin.
 * @throws {ValidationError} - Throws if the user is not found or has no role.
 * @throws {Error} - Throws if the user's role is not 'admin'.
 */
usersAdminServices.isAdmin= async (id) => {

    const found = await db.users.findByPk(id,{
        attributes:['id','names', 'role_id', 'isActive'],
            include: [
                { model: db.roles, as: 'role' }
            ]
    });
    
    if (!found) {
        throw new ValidationError(`the register with ID \"${id}\" it was not found for validate id is a user Admin`)
    }

    console.log(found.role.name)

    if (found.role.name==='admin') {
        
        return true;

    } else {
        throw new Error('token not validate for admin');
    }

};


module.exports= usersAdminServices;