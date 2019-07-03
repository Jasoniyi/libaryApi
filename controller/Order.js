import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from '../db/index';

const Order = {
  /** create borrow order
   * @params {object} req
   * @params {object} res
   * @returns {object} order object
   */
  async borrow(req, res) {
    const createQuery = `INSERT INTO orders(order_id, order_on, type, book, due_date, owner_id)
        VALUES ($1, $2, $3, $4, $5, $6) returning *`;
    const values = [
      uuidv4(),
      moment().format(),
      req.body.type,
      req.body.book,
      req.body.due_date,
      req.user.id
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      return res.status(200).send(rows[0]);
    } catch (err) {
      return res.status(400).send(err);
    }
  },
  /** return book
   *@params {object} req
   *@params {object} res
   *@returns {object} book object
   */
  async return(req, res) {
    const returnQuery = `INSERT INTO orders(order_id, order_on, type, book, due_date, owner_id)
    VALUES ($1, $2, $3, $4, $5, $6) returning *`;
    const values = [
      uuidv4(),
      moment().format(),
      req.body.type,
      req.body.book,
      req.body.due_date,
      req.user.id
    ];

    try {
      const { rows } = await db.query(returnQuery, values);
      return res.status(200).send(rows[0]);
    } catch (err) {
      return res.status(400).send(err);
    }
  },
  /**
   * get all records
   * @params {object} req
   * @params {object} res
   * @returns {object} all records
   */
  async getAll(req, res) {
    const findAll = 'SELECT * FROM orders WHERE owner_id = $1';
    try {
      const { rows, rowCount } = await db.query(findAll, [req.user.id]);
      return res.status(200).send({ rows, rowCount });
    } catch (err) {
      return res.status(400).send(err);
    }
  }
};

export default Order;
