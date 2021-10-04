const { WholeFoodsTimeframeData } = require('../models');
const simmerSasoSeeds = require('./simmerSasoSeeds.json');

const sequelize = require('../config/connection');

// console.log(wholeFoodsWeeklyArchiveSeeds);
// console.log(wholeFoodsTimeframeDataSeeds);

const seedWholeFoodsTimeframeData = () =>
  WholeFoodsTimeframeData.bulkCreate(simmerSasoSeeds);

const seedAll = async () => {
  await sequelize.sync();
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedWholeFoodsTimeframeData();
  console.log('\n----- WHOLE FOODS TIMEFRAME DATA SEEDED -----\n');

  process.exit(0);
};

seedAll();
