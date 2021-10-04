const { User } = require('../models');

const UserData = [
  {
    email: 'sam@simplyserved.com',
    password: 'password',
    first_name: 'Sam',
    last_name: 'Miller',
    role: 'admin, client',
    brands: 'SIMMER, SaSo',
  },
  {
    email: 'admin@intelly.test',
    password: 'admin',
    first_name: 'Admin',
    last_name: 'Test',
    role: 'admin, client',
    brands: 'SIMMER, SaSo',
  },
];

const seedUsers = () => User.bulkCreate(UserData);

module.exports = seedUsers;
