"use strict";

/** @type {import('sequelize-cli').Migration} */

let options = {};

if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Bookings";
    await queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          userId: 1,
          startDate: new Date("2023-01-01"),
          endDate: new Date("2023-12-16"),
        },
        {
          spotId: 2,
          userId: 2,
          startDate: new Date("2024-02-13"),
          endDate: new Date("2024-04-18"),
        },
        {
          spotId: 3,
          userId: 3,
          startDate: new Date("2025-07-03"),
          endDate: new Date("2025-10-15"),
        },
        {
          spotId: 1,
          userId: 2,
          startDate: new Date("2025-07-03"),
          endDate: new Date("2025-10-15"),
        },
        {
          spotId: 2,
          userId: 3,
          startDate: new Date("2025-07-03"),
          endDate: new Date("2025-10-15"),
        },
        {
          spotId: 3,
          userId: 1,
          startDate: new Date("2025-07-03"),
          endDate: new Date("2025-10-15"),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Bookings";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        spotId: { [Op.in]: [1, 2, 3] },
      },
      {}
    );
  },
};
