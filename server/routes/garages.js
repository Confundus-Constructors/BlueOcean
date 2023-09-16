const express = require('express');
const garageRouter = express.Router();
const path = require('path');
const model = require('../models');

garageRouter.get('/', async (req, res) => {
  // technically should read req.query for address
    // then call API to convert address to lat / long
    // then use lat / long to query garages and sort by distance
  // const obj = req.query
  const obj = {
    location: '123 ABC St',
    start_date: "2023-09-17 02:24:00",
    end_date: "2023-09-17 04:24:00",
  }

  // add number of spots available
  const garageData = await model.queryAll('garages'); //[ {garage}, {garage} ]
  const transactionCount = await model.queryCountReservationTimes(obj.start_date, obj.end_date);
  //[ {count, garage_id}, {count, garage_id} ]
  const parkingSpotCount = await model.queryCountParkingSpots();
  //[ {count, garage_id}, {count, garage_id} ]
  const test = parkingSpotCount.rows.map((garage) => {
    let count = Number(garage.count);
    let result = count;

  })
  // grab all transactions that fall between dates
  // subtract count of transactions from parking_spots is_available
  // append count to each record

  const garageDatarows = garageData.rows;
  const transactionCountrows = transactionCount.rows;
  const parkingSpotCountrows = parkingSpotCount.rows;

  res.status(201).send({garageDatarows, transactionCountrows, parkingSpotCountrows});
});

module.exports = garageRouter;
