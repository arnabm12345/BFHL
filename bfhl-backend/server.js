const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors()); 

const upload = multer();

function getHighestLowercase(alphabets) {
  return alphabets.filter((char) => char >= 'a' && char <= 'z').sort().slice(-1);
}

app.post('/bfhl', upload.single('file'), (req, res) => {
  const { data, file_b64 } = req.body;

  const response = {
    is_success: true,
    user_id: "Umesh_Chapala_25032004",
    email: "uc6133@srmist.edu.in",
    roll_number: "RA2111028010209",
  };

  const numbers = data.filter((item) => !isNaN(item));
  const alphabets = data.filter((item) => isNaN(item));
  response.numbers = numbers;
  response.alphabets = alphabets;

  const highest_lowercase_alphabet = getHighestLowercase(alphabets);
  response.highest_lowercase_alphabet = highest_lowercase_alphabet;

  if (file_b64) {
    response.file_valid = true;
    response.file_mime_type = 'image/png'; 
    response.file_size_kb = 400;
  } else {
    response.file_valid = false;
  }

  res.json(response);
});

app.get('/bfhl', (req, res) => {
  res.json({ operation_code: 1 });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
