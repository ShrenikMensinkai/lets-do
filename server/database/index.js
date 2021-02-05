'use strict'
const mongoose = require('mongoose');

let connect = (process.env.MONGO_URL ||"mongodb://localhost/flf");
mongoose.connect(connect,{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection with database failed'));
db.once('open', () => {
    console.log('Connection with database succeeded')
});

exports.Database = db;