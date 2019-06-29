import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from '../db/index';
import Helper from './Helper';

const User = {
  /**
   * create a user
   * @params {object} req
   * @params {object} res
   * @returns {object}
   */
  async create(req, res) {
    if (!req.body.email || !req.body.username || !req.body.password) {
      return res.status(400).json({
        status: 400,
        error: 'Some values are missing'
      });
    }
    if (!Helper.isValid(req.body.email)) {
      return res.status(400).json({
        status: 400,
        error: 'Please enter a valid email'
      });
    }

    const hashPassword = Helper.hashPassword(req.body.password);

    const createQuery = `INSERT INTO users(id, email, username, password, created_date)
    VALUES($1, $2, $3, $4, $5) returning *`;
    const values = [
      uuidv4(),
      req.body.email,
      req.body.username,
      hashPassword,
      moment().format()
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      const token = Helper.generateToken(rows[0].id);
      console.log(token);
      return res.status(201).json({
        status: 201,
        token
      });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).json({
          status: 400,
          error: 'Email already exists'
        });
      }
      return res.status(400).json({
        status: 400,
        error
      });
    }
  }
};

export default User;
