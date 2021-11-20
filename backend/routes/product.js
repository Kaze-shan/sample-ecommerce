import express from 'express';
import
{getLatestProducts,
  getProducts,
  getProduct,
  getCartItems,
  getBreadcrumb,
  getMainPageOffer,
  getPhotoWall,
  getCategorylist} from '../controllers/productControll.js';

const router = express.Router();

router.get('/MainPageOffer', getMainPageOffer);

router.get('/PhotoWall', getPhotoWall);

router.get('/latestproducts', getLatestProducts);

router.get('/cart', getCartItems);

router.get('/catergorylist', getCategorylist);

router.get('/breadcrumb/:parentID', getBreadcrumb);

router.get('/getProducts', getProducts);

router.get('/:productID', getProduct);


export default router;
