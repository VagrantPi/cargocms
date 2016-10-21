module.exports = {

  // 'get /api/admin/labfnp/recipe/export': 'api/admin/labfnp/RecipeController.export',

  'get /product/group/:groupId/page/:page':    'jason/ProductController.index',
  'get /product/show/:productId':    'jason/ProductController.show',
  'get /part/group/:groupId/page/:page':       'jason/PartController.index',
  'get /part/show/:partId':    'jason/PartController.show',
  'get /performance/group/:groupId/page/:page':       'jason/PerformanceController.index',
  'get /performance/show/:performanceId':    'jason/PerformanceController.show',
  'get /issue':      { view: 'jason/issue' },
  'get /contact':    'jason/ContactController.index',

  // api
  'post /api/contact':  'api/ContactController.create',

  "/jason/:controller/:action/:id?": {}
};