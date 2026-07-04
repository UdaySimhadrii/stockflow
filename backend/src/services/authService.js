import bcrypt from 'bcrypt';
import { sequelize } from '../models/index.js';
import userRepository from '../repositories/userRepository.js';
import organizationRepository from '../repositories/organizationRepository.js';
import AppError from '../utils/AppError.js';
import HTTP_STATUS from '../constants/httpStatus.js';
import { signToken } from '../utils/jwt.js';

const SALT_ROUNDS = 12;

const toSafeUser = (user, organization) => ({
  id: user.id,
  email: user.email,
  name: user.name,
  organizationId: user.organizationId,
  organization: organization
    ? { id: organization.id, name: organization.name }
    : undefined,
});

export const authService = {
  /**
   * Create an Organization + User in a single transaction, return JWT + safe user.
   */
  async signup({ email, password, name, organizationName }) {
    const existing = await userRepository.findByEmail(email);
    if (existing) {
      throw new AppError('An account with this email already exists.', HTTP_STATUS.CONFLICT);
    }

    const result = await sequelize.transaction(async (t) => {
      const organization = await organizationRepository.create(
        { name: organizationName },
        { transaction: t }
      );

      const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

      const user = await userRepository.create(
        {
          email,
          passwordHash,
          name: name || null,
          organizationId: organization.id,
        },
        { transaction: t }
      );

      return { user, organization };
    });

    const token = signToken({
      userId: result.user.id,
      organizationId: result.organization.id,
    });

    return { token, user: toSafeUser(result.user, result.organization) };
  },

  async login({ email, password }) {
    const user = await userRepository.findByEmailWithPassword(email);
    if (!user) {
      throw new AppError('Invalid email or password.', HTTP_STATUS.UNAUTHORIZED);
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      throw new AppError('Invalid email or password.', HTTP_STATUS.UNAUTHORIZED);
    }

    const organization = await organizationRepository.findById(user.organizationId);

    const token = signToken({
      userId: user.id,
      organizationId: user.organizationId,
    });

    return { token, user: toSafeUser(user, organization) };
  },

  async getCurrentUser(userId) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new AppError('User not found.', HTTP_STATUS.NOT_FOUND);
    }
    const organization = await organizationRepository.findById(user.organizationId);
    return toSafeUser(user, organization);
  },
};

export default authService;
