module.exports = {
  attributes: {

    // optionId: {
    //   type: Sequelize.INTEGER(11),
    //   allowNull: false
    // },

    image: {
      type: Sequelize.STRING(255),
      allowNull: false
    },

    sortOrder: {
      type: Sequelize.INTEGER(3),
      allowNull: false
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
    }
  },
  associations: function() {
    OptionValue.hasOne(ProductOptionValue);
    OptionValue.hasOne(OptionValueDescription);
    OptionValue.belongsTo(Option);
  },
  options: {
    classMethods: {
      deleteById: async (id) => {
        try {
          return await OptionValue.destroy({ where: { id } });
        } catch (e) {
          sails.log.error(e);
          throw e;
        }
      },
    },
    instanceMethods: {},
    hooks: {}
  }
}
