// Using Node.js `require()`
const mongoose = require('mongoose');

async function connect() {
    try {
        mongoose
            .connect('mongodb://127.0.0.1:27017/Education_Dev')
            .then(() => console.log('Connected!'));
    } catch (error) {
        console.log('Disconnected!');
    }
}

module.exports = { connect };
