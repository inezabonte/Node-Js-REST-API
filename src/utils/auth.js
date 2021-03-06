import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import messages from './messages';

const salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS, 10));
const { secret, expiresIn } = process.env.SECRET_KEY;

/**
 * Generate JWT
 * @param {Object} payload - object literal resource to be encoded
 * @param {String} expiresIn jwt expiry date
 * @returns {String} - jwt token
 */
export const generateToken = (payload, expiresIn) => {
  const token = jwt.sign({ ...payload }, secret, { expiresIn });
  return token;
};

/**
 * @function verifyToken
 * @param {String} token jwt token
 * @returns {Object} decoded object
 */
export const verifyToken = async token => {
  const decoded = await jwt.verify(token, process.env.SECRET_KEY);
  return decoded;
};

export const verifyResetPasswordToken = async token => {
  const decoded = await jwt.verify(token, process.env.SECRET_KEY, error => {
    if (error) {
      return { messages: messages.expiredJWT };
    }
  });
  return decoded;
};

/**
 * @function hashPassword
 * @param {String} password pasword string to be hashed
 * @returns {String} hashed password
 * @description takes a raw password string, hashes it and returns the hasshed value
 */
export const hashPassword = password => bcrypt.hashSync(password, salt);

export default { generateToken, verifyResetPasswordToken };
