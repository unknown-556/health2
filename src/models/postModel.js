import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

const articleSchema = new mongoose.Schema({
    Author: {
        type: String,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default:''
    },
    content: {
        type: String,
        required: true
    },
    image: {
        // required: true,
        type: String,
        default: '' 

    },
    cetegory: {
        type: String
    },
    likes: {
        type: [ObjectId],
        ref: "User",
        default: [],
    },
    comment: [
        {
            userId: {
                type: ObjectId,
                ref: "User",
                required: true,
            },
            text: {
                type: String,
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
});

const Article = mongoose.model('Article', articleSchema);

export default Article;
