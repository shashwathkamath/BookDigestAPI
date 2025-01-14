import { Request, Response } from 'express';
import User from '../models/User';

export const createUser = async (req: Request, res: Response) => {
    try {
        const { id, name, email, photo, givenName, familyName } = req.body;

        // Validate required fields
        if (!email || !id) {
            return res.status(400).json({ message: 'Email and ID are required' });
        }

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // Create a new user
        user = await User.create({
            id,
            name,
            email,
            profilePicUrl: photo,
            givenName,
            familyName,
        });

        return res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error', error: error });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; // Get id from URL params

        // Find user by id
        const user = await User.findOne({ id });

        // Handle user not found
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Return user data
        return res.status(200).json({
            success: true,
            message: 'User found',
            user
        });

    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error
        });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { name, email, contactNumber, address, paymentMode } = req.body;

        const updatedUser = await User.findOneAndUpdate(
            { email },
            {
                $set: {
                    name,
                    contactNumber,
                    address,
                    paymentMode
                }
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({
            message: 'Profile updated successfully',
            user: updatedUser
        });
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ message: 'Internal server error', error });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Find and delete user
        const user = await User.findOneAndDelete({ id });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        });

    } catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error
        });
    }
};
