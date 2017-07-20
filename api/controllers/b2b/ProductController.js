import _ from 'lodash';

module.exports = {
  index: async (req, res) => {
    try{
      /**
       * @property {Object} query - req.query
       * @property {Number} query.start - 起始位置
       * @property {Number} query.length - 長度
       * @property {Number} query.category - 種類ID
       * @property {Number} query.supplier - 供應商ID
       * @property {Boolean} query.limit - 是否限制長度
       * @property {String} query.q - 關鍵字
       * @property {String} query.sort - 用哪個屬性來排序 ('price'|'time')
       * @property {String} query.sortDir - 排序方向 ('asc'|'desc')
       */
      let {start, length, category, supplier, limit, q, sort, sortDir = 'asc'} = req.query;
      category = Number(category);

      if( !category && q ) {
        category = 0;
      } else if ( !category && !q ) {
        category = 1;
      }
      // 防錯
      if(sort && sort.split('|').length > 1)
        [sort, sortDir] = sort.split('|');
      sort = UtilsService.findInArray(['price', 'time'], sort);
      sortDir = UtilsService.findInArray(['asc', 'desc'], sortDir.toLowerCase());

      const result = await ProductService.find({
        start,
        length,
        supplierId: supplier,
        categoryId: category,
        limit,
        keyword: q,
        sortBy: (sort === 'time') ? 'createdAt' : sort,
        sortDir
      });
      let categorys = await Category.findAll({
        order: 'sortOrder asc',
        include: CategoryDescription
      });
      categorys = categorys.map((category) => category.toJSON());

      categorys = categorys.filter((item) => {
        sails.log('item=>', item)
        if(item.CategoryDescription !== null) return true;
      });

      // categorys = categorys.map(function( category ){
      //   return category.CategoryDescription.name;
      // });

      q = (!q) ? '' : q;
      
      let banner = {};
      let indexLogo = {};

      if(_.hasIn(sails.config, 'layoutImages.banner[0]')) {
        banner = sails.config.layoutImages.banner[0];
      } else {
        banner.url = "";
      }

      if(_.hasIn(sails.config, 'layoutImages.indexLogo[0]')) {
        indexLogo = sails.config.layoutImages.indexLogo[0];
      } else {
        indexLogo.url = "";
      }

      res.view('index',
        {
          data:{
            items: result,
            categorys,
            query: Object.assign({start: '', length: '', category: '', supplier: '', limit: '', q: '', sort: '', sortDir: ''},
            {start, length, category: category.toString(), supplier, limit, q, sort, sortDir}),
          },
          layoutImages: {
            banner: banner,
            indexLogo: indexLogo,
          },
          errors: req.flash('error')[0],
        }
      );
    } catch (e) {
      sails.log.error(e);
    }
  },

  detail: async (req, res) => {
    try{
      let item = await Product.findOne({
        where: {
          id: req.params.id
        },
        include: [ProductDescription, ProductOption, ProductOptionValue, ProductImage],
      });
   
      let bannerLogo = {};
      if(_.hasIn(sails.config, 'layoutImages.banner[0]')) {
        bannerLogo = sails.config.layoutImages.bannerLogo[0];
      } else {
        bannerLogo.url = "";
      }

      res.view('b2b/product/detail',{
        data: {
          item,
        },
        layoutImages: {
          bannerLogo: bannerLogo,
        }
      });
    } catch (e) {
      sails.log.error(e);
    }
  },
};
