const express = require('express');
const productsRoute = require('./routes/productsRoute');
const salesRoute = require('./controllers/salesController');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRoute);
app.use('/sales', salesRoute);

app.use(errorMiddleware);
// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;