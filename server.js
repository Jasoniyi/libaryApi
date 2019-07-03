import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import User from './controller/Users';
import Account from './controller/Accounts';
import Auth from './middleware/Auth';
import Order from './controller/Order';

dotenv.config();
const libary = process.env.TYPE === 'db' ? Account : null;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.status(200).send({ message: 'Welcome to libary API' });
});

app.post('/api/v1/signup', User.create);
app.post('/api/v1/signin', User.login);
app.post('/api/v1/account', Auth.verifyToken, libary.create);
app.delete('/api/v1/accounts/:id', Auth.verifyToken, libary.delete);
app.patch('/api/v1/accounts/:id', Auth.verifyToken, libary.update);
app.post('/api/v1/order', Auth.verifyToken, Order.borrow);
app.post('/api/v1/return', Auth.verifyToken, Order.return);
app.get('/api/v1/orders', Auth.verifyToken, Order.getAll);

app.listen(port, () => {
  console.log(`Libary API running on port ${port}`);
});

export default app;
