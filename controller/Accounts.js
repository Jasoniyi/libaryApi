import moment from 'moment';
import uuidv4 from 'uuid/v4';
import random from 'random-int';
import db from '../db/index';

const Account = {
  /**
   * create user account
   * @params {object} req
   * @params {object} res
   * @returns {object} account object
   */
  async create(req, res) {
    const createAccountQuery = `INSERT INTO accounts(id, readernumber, created_date, owner_id, status, book_borrowed)
    VALUES($1, $2, $3, $4, $5, $6) returning *`;
    const values = [
      uuidv4(),
      random(100),
      moment().format(),
      req.user.id,
      req.body.status,
      req.body.book_borrowed
    ];

    try {
      const { rows } = await db.query(createAccountQuery, values);
      return res.status(201).send(rows[0]);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
};

export default Account;
