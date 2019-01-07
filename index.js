// Reference:
// https://nric.biz/
// https://www.wgrow.com/tools/singapore-nric-fin-verification-and-generator
// https://ayumilovemaple.wordpress.com/2008/09/24/validation-singapore-nric-number-verification/

const express = require('express');
const app = express();
const PORT = 3000 || process.env.PORT;

const validator = require('./nric-validator');

app.get('/', (req, res) => res.send('hello world'));

app.get('/check-nric/:nric', (req, res) => {
  const { nric } = req.params;
  
  const result = validator(nric) ? 'valid' : 'invalid';
  res.send(result);
})

app.listen(PORT, () => console.log(`Express is running on port: ${PORT}`));