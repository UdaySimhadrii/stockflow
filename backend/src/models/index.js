import sequelize from '../config/db.js';
import Organization from './Organization.js';
import User from './User.js';
import Product from './Product.js';

// Associations
Organization.hasMany(User, { foreignKey: 'organizationId', as: 'users' });
User.belongsTo(Organization, { foreignKey: 'organizationId', as: 'organization' });

Organization.hasMany(Product, { foreignKey: 'organizationId', as: 'products' });
Product.belongsTo(Organization, { foreignKey: 'organizationId', as: 'organization' });

User.hasMany(Product, { foreignKey: 'lastUpdatedBy', as: 'updatedProducts' });
Product.belongsTo(User, { foreignKey: 'lastUpdatedBy', as: 'updater' });

export { sequelize, Organization, User, Product };

export default { sequelize, Organization, User, Product };
