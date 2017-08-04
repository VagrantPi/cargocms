
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
      set: function() {
        this.setDataValue
        return this.setDataValue('total', this.getDataValue('quantity') * this.getDataValue('price'));
      }
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

    status: {
      type: Sequelize.ENUM('NEW','PAID','PROCESSING','SHIPPED','DELIVERED','CANCELLED','COMPLETED', 'SUBMITTED','DENIED','CANCELED REVERSAL','FAILED','REFUNDED','REVERSED','CHARGEBACK','PENDING','VOIDED','PROCESSED','EXPIRED'),
      allowNull: false,
      defaultValue: 'NEW'
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
          let total = this.getDataValue('total');
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
          let price = this.getDataValue('price');
          if(!price){
            return '';
          }

          return UtilsService.moneyFormat(price);

        } catch(e){
          sails.log.error(e);
        }
      }
    }

  },
  associations: () => {
    SupplierShipOrderProduct.belongsTo(SupplierShipOrder);
    SupplierShipOrderProduct.belongsTo(Product);
    SupplierShipOrderProduct.belongsTo(ProductOption);
  },
  options: {
    paranoid: true,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
