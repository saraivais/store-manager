const express = require('express');
const productsRoute = require('./routes/productsRoute');
const salesRoute = require('./routes/salesRoute');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();
app.use(express.json());

app.use('/sales', salesRoute);
app.use('/products', productsRoute);

app.use(errorMiddleware);
// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;