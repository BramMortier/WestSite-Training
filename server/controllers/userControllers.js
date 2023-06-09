const userServices = require("../services/userServices");
const User = require("../models/userModel");

const getAllUsers = async (req, res) => {
    const users = await userServices.getAllUsers();
    res.status(200).json({ status: "OK", users: users });
};

const getAuthenticatedUser = async (req, res) => {
    const { id } = req.user;
    const user = await User.findById(id);
    res.status(200).json({ status: "OK", user: user });
};

const getOneUser = async (req, res) => {};

const deleteUser = async (req, res) => {};

const updateUser = async (req, res) => {};

module.exports = {
    getAllUsers,
    getAuthenticatedUser,
    getOneUser,
    deleteUser,
    updateUser,
};
