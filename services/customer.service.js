const { Customer } = require('../models');

const createCustomer = async (data) => {
  try {
    const customer = await Customer.create(data);
    return customer;
  } catch (error) {
    throw error;
  }
};

const getAllCustomers = async () => {
  try {
    const customers = await Customer.findAll();
    return customers;
  } catch (error) {
    throw error;
  }
};

const getCustomerById = async (id) => {
  try {
    const customer = await Customer.findByPk(id);
    if (!customer) throw new Error('Customer not found');
    return customer;
  } catch (error) {
    throw error;
  }
};

const updateCustomer = async (id, data) => {
  try {
    const customer = await Customer.findByPk(id);
    if (!customer) throw new Error('Customer not found');
    return await customer.update(data);
  } catch (error) {
    throw error;
  }
};

const deleteCustomer = async (id) => {
  try {
    const customer = await Customer.findByPk(id);
    if (!customer) throw new Error('Customer not found');
    await customer.destroy();
    return { message: 'Customer deleted successfully' };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
