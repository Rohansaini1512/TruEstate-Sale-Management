const { getSales } = require('../services/salesService');

async function getSalesHandler(req, res, next) {
  try {
    const {
      search,
      region,
      gender,
      ageMin,
      ageMax,
      category,
      tags,
      paymentMethod,
      dateFrom,
      dateTo,
      sortBy,
      sortOrder,
      page,
      pageSize
    } = req.query;

   
    const options = {
      search: search || '',
      region,
      gender,
      category,
      tags,
      paymentMethod,
      ageMin,
      ageMax,
      dateFrom,
      dateTo,
      sortBy,
      sortOrder,
      page,
      pageSize
    };

    const result = await getSales(options);

    res.json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getSalesHandler
};
