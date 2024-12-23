import mongoose, { Document, Model, Schema } from 'mongoose';

interface IUser extends Document {
    name: string;
    email: string;
    contactNumber: string;
    address?: string;
    profilePicUrl?: string;
    paymentMode?: 'Cash' | 'Credit Card' | 'PayPal';
    booksSold?: number;
    totalEarnings?: string;
    settings: {
        notificationsEnabled: boolean;
        privacySettings: 'Public' | 'Private';
    };
    createdAt: Date;
    updatedAt: Date;
}

interface IUserModel extends Model<IUser> {
    findByEmail(email: string): Promise<IUser | null>;
}

const userSchema: Schema<IUser> = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                'Please enter a valid email address',
            ],
        },
        contactNumber: {
            type: String,
            required: true,
            validate: {
                validator: function (v: string) {
                    return /\d{10}/.test(v);
                },
                message: 'Invalid contact number format',
            },
        },
        address: {
            type: String,
            required: true,
        },
        profilePicUrl: {
            type: String,
            default: process.env.DEFAULT_PROFILE_PIC_URL || 'https://example.com/default-profile-pic.png',
        },
        paymentMode: {
            type: String,
            required: true,
            enum: ['Cash', 'Credit Card', 'PayPal'],
        },
        booksSold: {
            type: Number,
            default: 0,
        },
        totalEarnings: {
            type: String,
            default: '$0',
        },
        settings: {
            notificationsEnabled: {
                type: Boolean,
                default: true,
            },
            privacySettings: {
                type: String,
                default: 'Public',
                enum: ['Public', 'Private'],
            },
        },
    },
    {
        timestamps: true,
    }
);

userSchema.index({ email: 1 }, { unique: true });

userSchema.methods.getFullName = function (): string {
    return this.name;
};

userSchema.statics.findByEmail = async function (email: string) {
    return this.findOne({ email });
};

userSchema.post('save', function (error: any, doc: any, next: any) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
        next(new Error('Email already exists'));
    } else {
        next();
    }
});

const User = mongoose.model<IUser, IUserModel>('User', userSchema);

export default User;