import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";


// Controller for posting user data to the database
// method POST
// route '/users'
const createUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, dateOfBirth, address } = req.body;
    if (!firstName || !lastName || !dateOfBirth || !address) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
   
    try {
        await User.create(req.body);
        res.send('User created successfully');
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("User creation failed");
    }
});


// Controller for retrieving user details from the database
// method GET
// route '/users'
const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.findAll();
        res.send(users);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

   



// Controller for updating the details of a selected user
// method PUT
// route '/users/:id'
const updateUser = asyncHandler(async (req, res) => {
    const requestedId = req.params.id;
    try {
        const user = await User.findOne({ where: { id: requestedId }});
        if (user) {
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.dateOfBirth = req.body.dateOfBirth;
            user.address = req.body.address;
            await user.save();
            const updatedUsers = await User.findAll();
            res.send(updatedUsers);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});


// Controller for deleting the details of a selected user
// method DELETE
// route '/users/:id'
const deleteUser = asyncHandler(async (req, res) => {
    const requestedId = req.params.id;
    try {
        await User.destroy({ where: { id: requestedId }});
        res.json({ userId: requestedId }); 
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



export {createUser, getAllUsers, updateUser, deleteUser}