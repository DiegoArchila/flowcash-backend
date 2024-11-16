const usersAdminServices = require("../../../services/admin/usersAdminServices");
const { ValidationError, ForeignKeyConstraintError } = require("sequelize");


const usersAdminController = {};

/**
 * Creates a new user.

 * This function handles the creation of a new user by calling the `usersAdminServices.create` function with the provided user data from the request body.

 * @param {import("express").Request} req - The Express request object containing the user data in the request body under `req.body.newUser`.
 * @param {import("express").Response} res - The Express response object.
 * @returns {Promise<any>} - A Promise that resolves to either:
   - A 201 Created response with the created user data (if successful).
   - A 500 Internal Server Error response with validation errors or the original error (if creation fails).
 */
usersAdminController.create = async(req,res)=>{

    try {
        
        const created=await usersAdminServices.create(req.body.newUser);
        
        if(!created?.errors){
            return res.status("201").json(created);
        }else{
            return res.status(500).json(created);
        }
    } catch (error) {
        console.log("An error in found while is creating the register:\n", error);
        return res.status(500).send(error.errors || error);
    }

};

/**
 * Updates an existing user.

 * This function handles updating a user's information by calling the `usersAdminServices.update` function with the updated user data and the user ID from the request body and params, respectively.

 * @param {import("express").Request} req - The Express request object containing the updated user data in the request body under `req.body.updateUser` and the user ID in the request params under `req.params.id`.
 * @param {import("express").Response} res - The Express response object.
 * @returns {Promise<void>} - Does not explicitly return a value, but sends a response to the client.
 */
usersAdminController.update = async(req,res)=>{

    try {
        
        await usersAdminServices.update(req.body.updateUser, req.params.id);

        return res.status(200).json({
            message:`the register \"${req.params.id}\" has updated`
        });
    } catch (error) {
        console.error(error);

        if (error instanceof ValidationError) {
            return res.status(500).json({
                message:error.errors
            });
        }

        return res.status(500).json({
            message:error
        });
    }

};

/**
 * Updates a user's password.

 * This function is similar to `update` but specifically handles updating the password for a user by calling the `usersAdminServices.updatePassword` function with the updated password data and the user ID from the request body and params, respectively.

 * (Note: The provided code doesn't show any specific handling for password updates, so the comments assume it's handled by `usersAdminServices.updatePassword`.)

 * @param {import("express").Request} req - The Express request object containing the updated password data in the request body under `req.body.updateUser` and the user ID in the request params under `req.params.id`.
 * @param {import("express").Response} res - The Express response object.
 * @returns {Promise<void>} - Does not explicitly return a value, but sends a response to the client.
 */
usersAdminController.updatePassword = async(req,res)=>{

    try {
        
        await usersAdminServices.updatePassword(req.body.updateUser, req.params.id);

        return res.status(200).json({
            message:`the register \"${req.params.id}\" has updated`
        });
    } catch (error) {
        console.error(error);

        if (error instanceof ValidationError) {
            return res.status(500).json({
                message:error.errors
            });
        }

        return res.status(500).json({
            message:error
        });
    }

};

/**
 * Retrieves a list of users.

 * This function handles fetching a list of users based on optional pagination parameters. It calls the `usersAdminServices.getAlls` function with the specified page number and count.

 * @param {import("express").Request} req - The Express request object containing optional query parameters `page` and `count` for pagination.
 * @param {import("express").Response} res - The Express response object.
 * @returns {Promise<void>} - Does not explicitly return a value, but sends a response to the client.
 */
usersAdminController.getAlls = async(req,res)=>{

    try {
        
        const results = await usersAdminServices.getAlls(
            Number.parseInt(req.query?.page),
            Number.parseInt(req.query?.count)
        );

        return res.status(200).json(results);
    } catch (error) {
        
        console.error(
            "An error is found while the system try find all data: \n", 
            error
        );
        
        return res.status(500).json({
            error:error.message
        })
    }

};

/**
 * Retrieves a user by ID.

 * This function handles fetching a single user based on their ID from the request params. It calls the `usersAdminServices.findById` function with the user ID.

 * @param {import("express").Request} req - The Express request object containing the user ID in the request params under `req.params.id`.
 * @param {import("express").Response} res - The Express response object.
 * @returns {Promise<void>} - Does not explicitly return a value, but sends a response to the client.
 */
usersAdminController.findById = async(req,res)=>{

    try {
        const found = await usersAdminServices.findById(req.params.id);
        return res.status(200).json({
            data:found
        });     
    } catch (error) {
        console.error(
            "An error is found while the system try find a role field: \n", 
            error
        );

        if (error instanceof ValidationError) {
            return res.status(400).json({
                error:error.message
            });
        }

        return res.status(500).json({
            error:error.message
        });
    }

};


module.exports=usersAdminController;