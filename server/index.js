const express = require("express");
const cors = require("cors");

const ProductRoute = require("./routes/productRoute");
const DistributorRoute = require("./routes/distributorRoute");

const app = express();
const port = 3000;

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/product/api", ProductRoute);
app.use("/distributor/api", DistributorRoute);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});