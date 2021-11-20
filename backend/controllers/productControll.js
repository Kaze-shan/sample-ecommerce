import Products from '../models/product.js';
import Categories from '../models/catagory.js';
import Variations from '../models/variation.js';
import ApiFeatures from '../utils/apifeatures.js';
import Discounts from '../models/discount.js';
import mainPageOffers from '../models/mainPageOffer.js';
import photoWalls from '../models/photowall.js';
import catchAsyncErrors from '../middleware/catchAsyncErrors.js';
import {ErrorHandler} from '../utils/errorhandler.js';

const getLatestProducts = async (req, res, next)=>{
  const result = await Products.find()
      .sort({createdAt: -1})
      .limit(10);

  if (!result) {
    return res.status(200).json({result: []});
  }

  return res.status(200).json({result});
};

const getCartItems = catchAsyncErrors(async (req, res, next)=>{
  const productQuery = JSON.parse(req.query.productQuery);

  const result = await Variations.find({sku: {$in: productQuery}})
      .populate({
        path: 'productID',
        populate: {path: 'discount'},
      });

  if (!result) {
    return next(new ErrorHandler('Product not found', 404));
  }

  return res.status(200).json({result});
});

const getProducts= async (req, res, next)=>{
  const {sort, size, color, parentCategory, price} = req.query;
  const queryforVariation={stock: {$gt: 0}};
  const queryforProduct={status: true};
  let sortQuery = null;
  let productArray = null;
  const resultPerPage = 9;

  // const productsCount = await Product.countDocuments();

  switch (sort) {
    case 'lowestPrice':
      sortQuery = {price: 1, _id: 1};
      // _id: 1 is used to maintain consistency for the returned sort
      break;
    case 'highestPrice':
      sortQuery = {price: -1, _id: 1};
      break;
    default:
      sortQuery = {createdAt: -1, _id: 1};
  }

  if (parentCategory) {
    queryforProduct['parentCategory']={$in: [parentCategory]};
  }

  const findColorFilterQuery = new ApiFeatures(
      // get colors of all products matching the Category or keywords
      Products.find(
          queryforProduct),
      req.query)
      .search()
      .findDisctint('color.code');

  const findSizeFilterQuery = new ApiFeatures(
      // get sizes of all products matching the Category or keywords
      Products.find(
          queryforProduct),
      req.query)
      .search()
      .findDisctint('size.code');

  const sizeFilter = await findSizeFilterQuery.query;
  const colorFilter = await findColorFilterQuery.query;

  // add the MongoDB query if the query in url exists
  if (size) {
    queryforVariation['size']={$in: JSON.parse(size)};
  }
  if (color) {
    queryforVariation['color']={$in: JSON.parse(color)};
  }

  if (price) {
    const greater = parseInt(JSON.parse(price)[0]);
    const smaller = parseInt(JSON.parse(price)[1]);
    queryforProduct['price']= {$gte: greater, $lte: smaller};
  }

  if (size || color) {
    productArray = await Variations
        .find(queryforVariation)
        .distinct('productID');
  }

  if (productArray) {
    queryforProduct['_id']={$in: productArray};
  }

  const apiFeature = new ApiFeatures(
      Products.find(
          queryforProduct)
          .sort(sortQuery)
          .populate('discount'),
      req.query)
      .search();

  let result = await apiFeature.query;
  // get total products match the query

  const filteredProductsCount = result.length;
  // get total products number match the query

  apiFeature.pagination(resultPerPage);

  result = await apiFeature.query;
  // get products showing on this match the query

  if (!result) {
    return res.status(200).json({success: true, result: []});
  }

  return res.status(200).json({
    success: true,
    result,
    sizeFilter,
    colorFilter,
    resultPerPage,
    filteredProductsCount});
};

const getCategorylist = async (req, res, next)=>{
  const result = await Categories.find({order: 0}).populate('childID');

  if (!result) {
    return res.status(200).json({result: []});
  }

  return res.status(200).json({result});
};

const getBreadcrumb = async (req, res, next)=>{
  const {parentID} = req.params;

  const result = await Categories.findOne({_id: parentID})
      .populate('parentID');

  if (!result) {
    return next(new ErrorHandler('Product not found', 404));
  }

  return res.status(200).json({result});
};

const getProduct = async (req, res, next)=>{
  const {productID} = req.params;

  const productDetail = await Products.findOne({productCode: productID})
      .populate('discount');

  if (!productDetail) {
    return next(new ErrorHandler('Product not found', 404));
  }

  const stock = await Variations.find({productID: productDetail._id});

  const colorStock = await Variations
      .aggregate([
        {$match: {
          productID: productDetail._id,
          stock: {$gt: 0},
        }},
        {$group: {
          _id: '$color',
          ProductQuantity: {$sum: '$stock'},
        }},
      ]);

  return res.status(200).json({
    productDetail,
    stocklist: stock,
    colorStock: colorStock});
};

const getMainPageOffer= async (req, res, next)=>{
  const result = await mainPageOffers.find();

  if (!result) {
    return res.status(200).json({result: []});
  }

  return res.status(200).json({result});
};

const getPhotoWall= async (req, res, next)=>{
  const result = await photoWalls.find();

  if (!result) {
    return res.status(200).json({result: []});
  }

  return res.status(200).json({result});
};


export {
  getLatestProducts,
  getProduct,
  getCartItems,
  getBreadcrumb,
  getCategorylist,
  getMainPageOffer,
  getPhotoWall,
  getProducts};
