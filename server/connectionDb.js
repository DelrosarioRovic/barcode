const mongoose = require("mongoose");
const connectToDatabase = async () => {
  try {
    const uri = 'mongodb+srv://Akocrovic123:Akocrovic123@mydb.jfyc7mf.mongodb.net/shopify-barcode';

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }); 

    console.log("Connected to MongoDB");

    // Continue with other setup tasks or return a success message
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    // Handle the error as needed
  }
};

module.exports = connectToDatabase;