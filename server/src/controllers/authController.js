const authService = require('../services/authService');


const register = async (req, res) => {
  try {
    const user = await authService.registerUser(req.body);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    res.status(400).json({ message: 'Registration failed', error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { user, token } = await authService.loginUser(username, password);
    res.status(200).json({ message: 'Login successful', user, token });
  } catch (err) {
    res.status(401).json({ message: 'Login failed', error: err.message });
  }
};

module.exports = {
  register,
  login,
};
