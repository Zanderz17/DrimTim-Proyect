const mongoose = require('mongoose');
const URI = 'mongodb+srv://br4yangc:br4yangc_password@cluster0.ngosrup.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(URI)
  .then(() => {console.log('Connected to MongoDB Atlas')})
  .catch((error) => console.error(error));

module.exports = mongoose;