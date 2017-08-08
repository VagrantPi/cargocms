
module.exports = {
  attributes: {
    name: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    model: {
      type: Sequelize.STRING(64),
      allowNull: false,
    },
    quantity: {
      type: Sequelize.INTEGER(4),
      allowNull: false,
    },
    price: {
      type: Sequelize.DECIMAL(15, 4),
      defaultValue: '0.0000',
      allowNull: false,
    },
    total: {
      type: Sequelize.DECIMAL(15, 4),
      defaultValue: '0.0000',
      allowNull: false,
      // set: function() {
      //   this.setDataValue
      //   return this.setDataValue('total', this.getDataValue('quantity') * this.getDataValue('price'));
      // }
    },
    tax: {
      type: Sequelize.DECIMAL(15, 4),
      defaultValue: '0.0000',
      allowNull: false,
    },
    // reward: {
    //   type: Sequelize.INTEGER(8),
    //   allowNull: false,
    // },
    option: {
      type: Sequelize.TEXT,
      defaultValue: null,
    },

    supplierName: {
			type: Sequelize.STRING(32),
			defaultValue: ''
		},

    createdDateTime:{
      type: Sequelize.VIRTUAL,
      get: function(){
        try{
          return UtilsService.DataTimeFormat(this.getDataValue('createdAt'));
        } catch(e){
          sails.log.error(e);
        }
      }
    },

    updatedDateTime:{
      type: Sequelize.VIRTUAL,
      get: function(){
        try{
          return UtilsService.DataTimeFormat(this.getDataValue('updatedAt'));
        } catch(e){
          sails.log.error(e);
        }
      }
    },
    regularTotal: {
      type: Sequelize.VIRTUAL,
      get: function(){
        try{
          const total = this.getDataValue('total');
          if(!total){
            return '';
          }
          return UtilsService.moneyFormat(total);

        } catch(e){
          sails.log.error(e);
        }
      }
    },
    regularPrice: {
      type: Sequelize.VIRTUAL,
      get: function(){
        try{
          const price = this.getDataValue('price');
          if(!price){
            return '';
          }

          return UtilsService.moneyFormat(price);

        } catch(e){
          sails.log.error(e);
        }
      }
    },
    regularNoTaxTotal: {
      type: Sequelize.VIRTUAL,
      get: function(){
        try {
          const total = this.getDataValue('total');
          const tax = this.getDataValue('tax');
          if(!total || !tax){
            return '';
          }
          return Number(total) - Number(tax);
        } catch (e) {
          sails.log.error(e);
        }
      }
    }


  },
  associations: () => {
    OrderProduct.belongsTo(Product);
    OrderProduct.belongsTo(Order);
    OrderProduct.belongsTo(ProductOption);
  },
  options: {
    paranoid: true,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
