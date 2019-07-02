import moment, { updateLocale } from 'moment';
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
  },
  /**
   * delete account
   * @params {object} req
   * @params {object} res
   * @returns {object} status code 204
   */
  async delete(req, res) {
    const deleteQuery =      'DELETE FROM accounts WHERE id =$1 AND owner_id = $2 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [
        req.params.id,
        req.user.id
      ]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'Account not found' });
      }
      return res.status(204).json({
        status: 204,
        message: `${req.user.username} deleted`
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  /**
   * update account status
   * @params {object} req
   * @params {object} res
   * @returns {object} updated object
   */
  async update(req, res) {
    const findOneQuery = 'SELECT * FROM accounts WHERE id=$1 AND owner_id=$2';
    const updateQuery =      'UPDATE accounts SET status=$1 WHERE id=$2 AND owner_id=$3 returning *';
    try {
      const { rows } = db.query(findOneQuery, [req.params.id, req.user.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'Account not found' });
      }
      const values = [
        req.body.status || rows[0].status,
        req.params.id,
        req.user.id
      ];
      const responce = await db.query(updateQuery, values);
      return res.status(200).send(responce.rows[0]);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
};

export default Account;
