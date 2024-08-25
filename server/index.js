const express = require('express');
const cors = require('cors'); // Import the cors package
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Enable CORS for all origins
app.use(cors());

// GET Route: /bfhl
app.get('/bfhl', (req, res) => {
  res.status(200).json({
    operation_code: 1,
  });
});

// POST Route: /bfhl
app.post('/bfhl', (req, res) => {
  const { data } = req.body;

  if (!data || !Array.isArray(data)) {
    return res.status(400).json({
      is_success: false,
      message: 'Invalid input data format',
    });
  }

  const userId = 'shiva12345'; // Replace with your actual user ID logic
  const email = 'shivasaikuntla@gmail.com'; // Replace with your actual email
  const rollNumber = '21BCT0422'; // Replace with your actual roll number

  let numbers = [];
  let alphabets = [];
  let highestLowercaseAlphabet = null;

  data.forEach((item) => {
    if (!isNaN(item)) {
      numbers.push(item);
    } else if (typeof item === 'string') {
      alphabets.push(item);
      if (
        item === item.toLowerCase() &&
        (!highestLowercaseAlphabet || item > highestLowercaseAlphabet)
      ) {
        highestLowercaseAlphabet = item;
      }
    }
  });

  res.status(200).json({
    is_success: true,
    user_id: userId,
    email: email,
    roll_number: rollNumber,
    numbers: numbers,
    alphabets: alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet
      ? [highestLowercaseAlphabet]
      : [],
  });
});

// Handle undefined routes
app.use((req, res, next) => {
  res.status(404).json({
    error: 'Route not found',
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
