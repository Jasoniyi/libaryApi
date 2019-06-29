import jwt from 'jsonwebtoken';
import db from '../db/index';

const Auth = {
  /**
   * verify token
   * @params {object} req
   * @params {object} res
   * @params {object} next
   * @returns {object|void} responce object
   */
  async verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(400).json({
        status: 400,
        error: 'Token is not provided'
      });
    }
    try {
      const decoded = await jwt.verify(token, process.env.SECRET);
      const text = 'SELECT * FROM users WHERE id = $1';
      const { rows } = await db.query(text, [decoded.userId]);
      if (!rows[0]) {
        return res.status(400).send({ message: 'invalid token' });
      }
      req.user = { id: decoded.userId };
      next();
    } catch (error) {
      return res.status(400).send(error);
    }
  }
};

export default Auth;
