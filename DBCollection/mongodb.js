const mongoose = require('mongoose');

class Mongo {

    constructor() {
        this.createMongoConnection();
    }

    createMongoConnection() {
        mongoose.connect(`mongodb://masaiUser:masaiPassword@localhost:27017/masai`);

        mongoose.connection.once('open', () => {
            console.log('MongoDB is connected.');
        });

        mongoose.connection.on('error', () => {
            console.log('Errro occured in mongoDB connnection.');
        });
    }
}

module.exports = Mongo;