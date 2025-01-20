import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    id: string;
    name: string;
    email: string;
    profilePicUrl?: string;
    givenName?: string;
    familyName?: string;
<<<<<<< HEAD
    contactNumber?: string;
    address?: string;
    paymentMode?: string;
    listedBooks: mongoose.Types.ObjectId[];    // Books user is selling
    purchasedBooks: mongoose.Types.ObjectId[]; // Books user has bought
    savedBooks: mongoose.Types.ObjectId[];     // Books user has saved/wishlisted
=======
>>>>>>> parent of 7dc03a3 (Merge pull request #21 from shashwathkamath:update-user-controllers)
}

const userSchema: Schema<IUser> = new Schema(
    {
        id: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        profilePicUrl: { type: String },
        givenName: { type: String },
        familyName: { type: String },
<<<<<<< HEAD
        contactNumber: { type: String },
        address: { type: String },
        paymentMode: { type: String },
        listedBooks: [{
            type: Schema.Types.ObjectId,
            ref: 'Book',
            default: []
        }],
        purchasedBooks: [{
            type: Schema.Types.ObjectId,
            ref: 'Book',
            default: []
        }],
        savedBooks: [{
            type: Schema.Types.ObjectId,
            ref: 'Book',
            default: []
        }]
=======
>>>>>>> parent of 7dc03a3 (Merge pull request #21 from shashwathkamath:update-user-controllers)
    },
    {
        timestamps: true,
        methods: {
            async listBook(bookId: mongoose.Types.ObjectId) {
                this.listedBooks.push(bookId);
                return this.save();
            },
            async purchaseBook(bookId: mongoose.Types.ObjectId) {
                this.purchasedBooks.push(bookId);
                return this.save();
            },
            async saveBook(bookId: mongoose.Types.ObjectId) {
                this.savedBooks.push(bookId);
                return this.save();
            }
        }
    }
);

export default mongoose.model<IUser>('User', userSchema);
