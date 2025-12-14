const Sales = require('../models/sales');

const toArray = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter(Boolean);
  return String(value)
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean);
};

const escapeRegex = (value = '') => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

async function getSales(options = {}) {
  console.log('🔍 getSales called with:', JSON.stringify(options, null, 2));
  
  const {
    search = '',
    region,
    gender,
    category,
    tags,
    paymentMethod,
    ageMin,
    ageMax,
    ageRanges,
    dateFrom,
    dateTo,
    sortBy = 'date',
    sortOrder = 'desc',
    page = 1,
    pageSize = 10
  } = options;

  const numericPage = Math.max(parseInt(page, 10) || 1, 1);
  const numericPageSize = Math.max(parseInt(pageSize, 10) || 10, 1);

  const andConditions = [];

  // SEARCH - try both field name formats
  if (search) {
    andConditions.push({
      $or: [
        { customerName: { $regex: search, $options: 'i' } },
        { 'Customer Name': { $regex: search, $options: 'i' } },
        { phoneNumber: { $regex: search, $options: 'i' } },
        { 'Phone Number': { $regex: search, $options: 'i' } }
      ]
    });
  }

  // FILTERS - check both field formats
  const regions = toArray(region);
  if (regions.length) {
    andConditions.push({
      $or: [
        { customerRegion: { $in: regions } },
        { 'Customer Region': { $in: regions } }
      ]
    });
  }

  const genders = toArray(gender);
  if (genders.length) {
    andConditions.push({
      $or: [
        { gender: { $in: genders } },
        { Gender: { $in: genders } }
      ]
    });
  }

  const categories = toArray(category);
  if (categories.length) {
    andConditions.push({
      $or: [
        { productCategory: { $in: categories } },
        { 'Product Category': { $in: categories } }
      ]
    });
  }

  const paymentMethods = toArray(paymentMethod);
  if (paymentMethods.length) {
    andConditions.push({
      $or: [
        { paymentMethod: { $in: paymentMethods } },
        { 'Payment Method': { $in: paymentMethods } }
      ]
    });
  }

  const tagArray = toArray(tags);
  if (tagArray.length) {
    const tagRegexes = tagArray.map((t) => new RegExp(`^${escapeRegex(t)}$`, 'i'));
    andConditions.push({
      $or: [
        { tags: { $in: tagRegexes } },
        { Tags: { $in: tagRegexes } }
      ]
    });
  }

  // AGE RANGE
  const ageRangeLabels = toArray(ageRanges);
  const ageClauses = [];

  if (ageMin || ageMax) {
    const clause = {};
    if (ageMin) clause.$gte = Number(ageMin);
    if (ageMax) clause.$lte = Number(ageMax);
    if (Object.keys(clause).length) {
      ageClauses.push(
        { age: clause },
        { Age: { $gte: String(ageMin || 0), $lte: String(ageMax || 999) } }
      );
    }
  }

  ageRangeLabels.forEach((label) => {
    if (label === '18-25') {
      ageClauses.push(
        { age: { $gte: 18, $lte: 25 } },
        { Age: { $gte: "18", $lte: "25" } }
      );
    }
    if (label === '26-35') {
      ageClauses.push(
        { age: { $gte: 26, $lte: 35 } },
        { Age: { $gte: "26", $lte: "35" } }
      );
    }
    if (label === '36-50') {
      ageClauses.push(
        { age: { $gte: 36, $lte: 50 } },
        { Age: { $gte: "36", $lte: "50" } }
      );
    }
    if (label === '50+') {
      ageClauses.push(
        { age: { $gte: 50 } },
        { Age: { $gte: "50" } }
      );
    }
  });

  if (ageClauses.length > 0) {
    andConditions.push({ $or: ageClauses });
  }

  // DATE RANGE
  if (dateFrom || dateTo) {
    const dateQuery = {};
    if (dateFrom) dateQuery.$gte = new Date(dateFrom);
    if (dateTo) dateQuery.$lte = new Date(dateTo);
    
    andConditions.push({
      $or: [
        { date: dateQuery },
        { Date: dateQuery }
      ]
    });
  }

  // Combine conditions
  let query = {};
  if (andConditions.length === 1) {
    query = andConditions[0];
  } else if (andConditions.length > 1) {
    query = { $and: andConditions };
  }

  // console.log('📊 Query:', JSON.stringify(query, null, 2));

  // SORT LOGIC
  const sortQuery = {};
  if (sortBy === 'customerName') {
    sortQuery.customerName = sortOrder === 'asc' ? 1 : -1;
    sortQuery['Customer Name'] = sortOrder === 'asc' ? 1 : -1;
  } else if (sortBy === 'quantity') {
    sortQuery.quantity = sortOrder === 'asc' ? 1 : -1;
    sortQuery.Quantity = sortOrder === 'asc' ? 1 : -1;
  } else {
    sortQuery.date = sortOrder === 'asc' ? 1 : -1;
    sortQuery.Date = sortOrder === 'asc' ? 1 : -1;
  }

  // TOTAL COUNT
  const totalRecords = await Sales.countDocuments(query);
  // console.log('✅ Found', totalRecords, 'records');

  // MAIN QUERY WITH PAGINATION
  const data = await Sales.find(query)
    .sort(sortQuery)
    .skip((numericPage - 1) * numericPageSize)
    .limit(numericPageSize);

  const totalPages = Math.ceil(totalRecords / numericPageSize);

  return {
    meta: {
      page: numericPage,
      pageSize: numericPageSize,
      totalRecords,
      totalPages,
      hasNextPage: numericPage < totalPages,
      hasPrevPage: numericPage > 1
    },
    data
  };
}

module.exports = {
  getSales
};