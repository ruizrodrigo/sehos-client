export const PublicRoutes = {
  start: '/',
  login: '/login',
  register: '/register',
  home: '/home',
  about: '/about',
  products: '/products',
  productsIdParams: '/products/:id',
  cart: '/cart',
  contact: '/contact',
  searchResult: 'search-results',
  profile: '/profile',
  settings: 'settings',
  resetPassword: '/reset-password/:name',
  forgotPassword: '/reset-password',
  error: '*',
  adproduc:"/pruebaAdProduct"
};

export const PrivatesRoutes = {
  // Rutas user
  user: '/user',
  settings: '/user/settings',
  profile: 'profile',
  addaddress: 'address',
  userOrders: 'orders',
  favorites: 'favorites',
  checkout: '/cart/checkout',

  admin: '/admin',
  dashboard: '/dashboard',
  deleteProduct:'deleteProduct',
  manageProduct:'manageProduct',
  updateProduct:'updateProduct',
  addProduct: 'addProduct',
  addCategory: 'addcategory',
  addAttribute: 'addattribute',
  addAdmin: 'manage-users',
  updateStock:'updateStock'
};

export const URL = {
  baseURL: 'http://localhost:3001',
};

export const Endpoint = {
  searchProduct: `${URL.baseURL}/products/search`,
  registerUser: `${URL.baseURL}/users/`,
  getUsers: `${URL.baseURL}/users`,
  deleteUser: `${URL.baseURL}/users`,
  modifyUser: `${URL.baseURL}/users`,
  postProduct:`${URL.baseURL}/products`,
  updateProduct: `${URL.baseURL}/products`,
  deleteProduct: `${URL.baseURL}/products`,
  updateStock: `${URL.baseURL}/products/details`,
  postSizes:`${URL.baseURL}/products/details/sizes`,
  deleteSizes:`${URL.baseURL}/products/details/sizes`,
  postCategories:`${URL.baseURL}/category`,
};
