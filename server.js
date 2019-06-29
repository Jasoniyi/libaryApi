import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import User from './controller/Users';

dotenv.config();
// const libary = process.env.TYPE === 'db' ?

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.status(200).send({ message: 'Welcome to libary API' });
});

app.post('/signup', User.create);
app.post('/signin', User.login);

app.listen(port, () => {
  console.log(`Libary API running on port ${port}`);
});
