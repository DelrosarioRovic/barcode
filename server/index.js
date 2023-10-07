const Product = require("./models/product.model");
const Distributor = require("./models/distributor.model");
const cors = require("cors");
// Import required modules
const express = require('express');
const connectionDb = require("./connectionDb");

//controller
const scanController = require("./controller/scan-controller");
const distributorController = require("./controller/get-all-distributor");
const disburseProductController = require("./controller/disburse-product");
const getAllProduct = require("./controller/get-all-products");
const getAllDisburseProduct = require("./controller/get-all-disburse-products");



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const port = 3000; 
connectionDb();

// const data = [
//     { serialNumber: '344285297593011', product_sku: 'SKU456', imeiOne: '9672', imeiTwo: '1207', status: 'in' },
//     { serialNumber: '503726366648901', product_sku: 'SKU456', imeiOne: '2345', imeiTwo: '8943', status: 'in' },
//     { serialNumber: '744272743266674', product_sku: 'SKU456', imeiOne: '6890', imeiTwo: '2431', status: 'in' },
//     { serialNumber: '912356783901234', product_sku: 'SKU456', imeiOne: '5678', imeiTwo: '1987', status: 'in' },
//     { serialNumber: '632812937645123', product_sku: 'SKU456', imeiOne: '7890', imeiTwo: '2345', status: 'in' },
//     { serialNumber: '123456789012345', product_sku: 'SKU456', imeiOne: '1234', imeiTwo: '5678', status: 'in' },
//     { serialNumber: '678901234567890', product_sku: 'SKU562', imeiOne: '9876', imeiTwo: '5432', status: 'in' },
//     { serialNumber: '234567890123456', product_sku: 'SKU562', imeiOne: '3456', imeiTwo: '7890', status: 'in' },
//     { serialNumber: '890123456789012', product_sku: 'SKU562', imeiOne: '6789', imeiTwo: '9012', status: 'in' },
//     { serialNumber: '456789012345678', product_sku: 'SKU562', imeiOne: '2345', imeiTwo: '6789', status: 'in' }
//   ];


// Product.insertMany(data)



// // Create a new distributor instance
// const newDistributor = new Distributor({
//   storeName: 'Example Store 3',
//   address: '123 Main St, City, Country',
//   email: 'example1@store.com',
//   contactNumber: 239276665789,
// });

// // Save the distributor to the database
// newDistributor.save()
//   .then(savedDistributor => {
//     console.log('Distributor saved successfully:', savedDistributor);
//   })
//   .catch(error => {
//     console.error('Error saving distributor:', error);
//   });

  

app.get('/', (req, res) => {
  res.send('Hello, World!'); 
});

app.use('/product', scanController);
app.use("/distributor", distributorController);
app.use("/product", disburseProductController);
app.use("/product", getAllProduct);
app.use("/product", getAllDisburseProduct);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
