import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.status(200).send({ message: 'Libary API here' });
});

app.listen(port, () => {
  console.log(`Libary API running on port ${port}`);
});
