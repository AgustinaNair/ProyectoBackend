import {connect} from 'mongoose'

export const connectDB = () => {
    connect('mongodb+srv://agustinadesinano:quebuenacontraseña@cluster0.b2cdbfu.mongodb.net/ecommercee');
    console.log('DB connected');
};