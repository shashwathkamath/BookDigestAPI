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
        const { id } = req.body;
        let user = await User.findOne({ id });
        if (!user) {
            return res.status(404).json({ message: 'User does not exist' });
        }
        return res.status(200).json({ message: 'User sent ', user });
    }
    catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error', error: error });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { name, email, contactNumber, address, paymentMode } = req.body;
        if (email) {
            const existingUser = await User.findOne({ email, id: { $ne: req.params.id } });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already in use' });
            }
        }
        const user = await User.findOneAndUpdate(
            { id: req.params.id },
            {
                $set: {
                    ...(name && { name }),
                    ...(email && { email }),
                    ...(contactNumber && { contactNumber }),
                    ...(address && { address }),
                    ...(paymentMode && { paymentMode })
                }
            },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ message: 'Internal server error', error });
    }
};
