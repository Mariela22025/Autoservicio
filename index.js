const express = require('express');
require('dotenv').config();
const app = express();
const userRoutes = require('./routes/users');

app.use(express.json());
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
