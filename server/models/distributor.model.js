const mongoose = require('mongoose');

const distributorSchema = new mongoose.Schema({
  storeName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: Number,
    required: true,
  },
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});

const Distributor = mongoose.model('Distributor', distributorSchema);

module.exports = Distributor;
