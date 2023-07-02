import mongoose from 'mongoose';

const urlConn = 'mongodb://127.0.0.1:27017/ClinicaBackend';
mongoose.connect(urlConn).then(() => console.log('Connected!'));