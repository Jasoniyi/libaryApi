import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const Helper = {
  /**
   * Hash password
   * @params {string} password
   * @returns {string} hashedpassword
   */
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },
  /**
   * compare password
   * @params {string} hashpassword
   * @params {string} password
   * @returns {Boolean} true or false
   */
  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },
  /**
   * validate password
   * @params {string} email
   * @returns {Boolean} true or false
   */
  isValid(email) {
    return /\S+@\S+\.\S+/.test(email);
  },
  /**
   * generate token
   * @params {string} id
   * @returns {string} token
   */
  generateToken(id) {
    const token = jwt.sign(
      {
        userId: id
      },
      process.env.SECRET,
      { expiresIn: '7d' }
    );
    return token;
  }
};

export default Helper;
