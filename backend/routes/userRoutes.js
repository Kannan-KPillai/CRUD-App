import express from 'express';
import { createUser, getAllUsers, updateUser, deleteUser} from '../controllers/userController.js';


const router = express.Router();

//Posting the user details to the database
//method POST 
router.post('/users', createUser );

//Getting all the user details from database
//method GET
router.get('/users', getAllUsers );

//Updating the selected user details from database
//method PUT
router.put('/users/:id', updateUser )

//Deleteing the selected user details from the database
//method DELETE
router.delete('/users/:id', deleteUser );



export default router;
