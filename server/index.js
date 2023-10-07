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
//     { serialNumber: '780376846306967', product_sku: 'SKU562', imeiOne: '1132', imeiTwo: '1344', status: 'in' },
//     { serialNumber: '732182650880439', product_sku: 'SKU562', imeiOne: '1142', imeiTwo: '1243', status: 'in' },
//     { serialNumber: '266392229786644', product_sku: 'SKU562', imeiOne: '1142', imeiTwo: '2443', status: 'in' },
//     { serialNumber: '880050597884039', product_sku: 'SKU562', imeiOne: '1112', imeiTwo: '1247', status: 'in' },
//     { serialNumber: '899709837531110', product_sku: 'SKU562', imeiOne: '1112', imeiTwo: '2245', status: 'in' },
//     { serialNumber: '147626725932222', product_sku: 'SKU562', imeiOne: '1132', imeiTwo: '5348', status: 'in' },
//     { serialNumber: '721982997400870', product_sku: 'SKU562', imeiOne: '1172', imeiTwo: '5443', status: 'in' },
//     { serialNumber: '209184639633113', product_sku: 'SKU562', imeiOne: '1132', imeiTwo: '7840', status: 'in' },
//     { serialNumber: '529375551508118', product_sku: 'SKU562', imeiOne: '1122', imeiTwo: '9242', status: 'in' },
//     { serialNumber: '618953280483888', product_sku: 'SKU562', imeiOne: '1142', imeiTwo: '6749', status: 'in' }
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
