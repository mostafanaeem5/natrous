const express = require('express');
const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

const router = express.Router();

const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours },
  });
};

const getTour = (req, res) => {
  const id = Number(req.params.id);
  if (id < tours.length) {
    const tour = tours.find((el) => el.id === id);

    res.status(200).json({
      status: 'success',
      data: { tour },
    });
  } else {
    res.status(404).json({
      status: 'tour not found',
    });
  }
};

const createTour = (req, res) => {
  const newID = tours[tours.length - 1].id + 1;
  console.log(newID);
  const newTour = Object.assign({ id: newID }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTour);

module.exports = router;