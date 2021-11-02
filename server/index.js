const PORT = process.env.PORT || 3001;
const express = require('express');
const app = express();
const router = require('./router');

app.use('/upload', router);

app.listen(PORT, function(){
  console.log('Server is running on port', PORT);
})

app.use(express.static('public'));
