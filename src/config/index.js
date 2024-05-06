import {connect} from 'mongoose'

export const connectDB = () => {
    connect('mongodb://127.0.0.1:27017/ecommerce');
    console.log('DB connected');
};