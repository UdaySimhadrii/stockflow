import { User } from '../models/index.js';

export const userRepository = {
  /**
   * Find a user by email, including the password hash (for login).
   */
  findByEmailWithPassword(email) {
    return User.scope('withPassword').findOne({
      where: { email: String(email).trim().toLowerCase() },
    });
  },

  findByEmail(email) {
    return User.findOne({ where: { email: String(email).trim().toLowerCase() } });
  },

  findById(id) {
    return User.findByPk(id);
  },

  create(data, options = {}) {
    return User.create(data, options);
  },
};

export default userRepository;
