// domain ; rast.more-commerce.com
// prod : salary.itopplus.co
const IS_PROD = false;
export const environment = {
  domain: IS_PROD ? "salary.itopplus.com" : "rast.more-commerce.com",
  userID: IS_PROD ? "123456" : "123456",
  options: {},
};
