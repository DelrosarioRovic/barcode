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
//     { serialNumber: '344231123593011', product_sku: 'SKU123', imeiOne: '9232', imeiTwo: '1334', status: 'in' },
//     { serialNumber: '503726366123231', product_sku: 'SKU123', imeiOne: '2345', imeiTwo: '1233', status: 'in' },
//     { serialNumber: '741232743266674', product_sku: 'SKU123', imeiOne: '1440', imeiTwo: '2423', status: 'in' },
//     { serialNumber: '912323123401234', product_sku: 'SKU123', imeiOne: '5118', imeiTwo: '1217', status: 'in' },
//     { serialNumber: '631232323125123', product_sku: 'SKU012', imeiOne: '7110', imeiTwo: '2215', status: 'in' },
//     { serialNumber: '123456723231145', product_sku: 'SKU012', imeiOne: '1334', imeiTwo: '5318', status: 'in' },
//     { serialNumber: '678911232678901', product_sku: 'SKU562', imeiOne: '9276', imeiTwo: '5413', status: 'in' },
//     { serialNumber: '234567823123256', product_sku: 'SKU562', imeiOne: '3433', imeiTwo: '7810', status: 'in' },
//     { serialNumber: '891233423231012', product_sku: 'SKU562', imeiOne: '6329', imeiTwo: '9222', status: 'in' },
//     { serialNumber: '452312312325678', product_sku: 'SKU562', imeiOne: '2143', imeiTwo: '6729', status: 'in' }
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
