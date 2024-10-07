const { Transaction, Customer, Food, sequelize } = require('../models');

const createTransaction = async (data) => {
  const transaction = await sequelize.transaction();
  try {
    const { customer_id, food_id, qty } = data;

    const [customer, food] = await Promise.all([
      Customer.findByPk(customer_id),
      Food.findByPk(food_id),
    ]);

    if (!customer) throw new Error('Customer not found');
    if (!food) throw new Error('Food not found');

    const total_price = food.price * qty;

    const newTransaction = await Transaction.create(
      {
        customer_id,
        food_id,
        qty,
        total_price,
        transaction_date: new Date(),
      },
      { transaction }
    );

    await transaction.commit();
    return newTransaction;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const getAllTransactions = async () => {
  try {
    const transactions = await Transaction.findAll({
      include: [Customer, Food],
    });
    return transactions;
  } catch (error) {
    throw error;
  }
};

const getTransactionById = async (id) => {
  try {
    const transaction = await Transaction.findByPk(id, {
      include: [Customer, Food],
    });
    if (!transaction) throw new Error('Transaction not found');
    return transaction;
  } catch (error) {
    throw error;
  }
};

const updateTransaction = async (id, data) => {
  const transaction = await sequelize.transaction();
  try {
    const existingTransaction = await Transaction.findByPk(id);
    if (!existingTransaction) throw new Error('Transaction not found');

    const { qty } = data;

    const [food] = await Promise.all([
      Food.findByPk(existingTransaction.food_id),
    ]);

    if (!food) throw new Error('Food not found');

    const total_price = food.price * qty;

    const updatedTransaction = await existingTransaction.update(
      { ...data, total_price },
      { transaction }
    );

    await transaction.commit();
    return updatedTransaction;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const deleteTransaction = async (id) => {
  const transaction = await sequelize.transaction();
  try {
    const existingTransaction = await Transaction.findByPk(id);
    if (!existingTransaction) throw new Error('Transaction not found');
    
    await existingTransaction.destroy({ transaction });
    await transaction.commit();
    return { message: 'Transaction deleted successfully' };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

module.exports = {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
};
