import moment from 'moment';
module.exports = {
  attributes: {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    content: {
      type: Sequelize.TEXT,
    },
    url: {
      type: Sequelize.STRING,
    },
    alias: {
      type: Sequelize.STRING,
      unique: true,
      // 只允許 數字、英文、'-'符號
      is: /^[a-zA-Z0-9-]+$/i,
    },
    abstract: {
      type: Sequelize.STRING,
    },
    coverType: {
      type: Sequelize.ENUM('img', 'video'),
      defaultValue: 'img',
    },
    type: {
      type: Sequelize.ENUM('blog', 'internal-event', 'external-event'),
      defaultValue: 'blog',
    },

    coverUrl: {
      type: Sequelize.STRING,
      get: function() {
        try {
          if (this.coverType === 'img') {
            const thisImage = this.getDataValue('Image');
            return thisImage ? thisImage.url : '';
          } else {
            return this.getDataValue('coverUrl');
          }
        } catch (e) {
          sails.log.error(e);
        }
      }
    },
    TagsArray: {
      type: Sequelize.VIRTUAL,
      get: function() {
        try {
          const thisTags = this.getDataValue('Tags');
          const tags = thisTags ? thisTags.map((tag) => tag.title) : [];
          return tags;
        } catch (e) {
          sails.log.error(e);
        }
      }
    },
    updatedAt: {
      type: Sequelize.DATE,
      get: function() {
        try {
          return moment(this.getDataValue('updatedAt')).format("YYYY/MM/DD HH:mm:SS");
        } catch (e) {
          sails.log.error(e);
        }
      }
    },
    createdAt: {
      type: Sequelize.DATE,
      get: function() {
        try {
          return moment(this.getDataValue('createdAt')).format("YYYY/MM/DD HH:mm:SS");
        } catch (e) {
          sails.log.error(e);
        }
      }
    },
  },
  associations: () => {
    Post.belongsToMany(Tag,  {
      through: 'PostTag',
      foreignKey: {
        name: 'PostId',
        as: 'Tags'
      }
    }),
    Post.belongsTo(Image, {
      foreignKey: {
        name: 'cover'
      }
    });
    Post.belongsTo(User, {
      foreignKey: {
        name: 'UserId'
      }
    });
    Post.belongsTo(Location);
  },
  options: {
    classMethods: {
      findAllHasJoin: async ({order, offset, limit, where}) => {
        try {
          if(where == undefined) where = {};
          return await Post.findAll({
            where,
            offset,
            limit,
            order: [['createdAt', order || 'DESC']],
            include: [Tag, Image, User, Location],
          });
        } catch (e) {
          sails.log.error(e);
          throw e;
        }
      },
      findByIdHasJoin: async ({id}) => {
        try {
          return await Post.findOne({
            where: { id },
            include: [ Tag, Image, User, Location]
          });
        } catch (e) {
          sails.log.error(e);
          throw e;
        }
      },
      findByIdHasJoinByEvent: async ({id, name}) => {
        try {
          return await Post.findOne({
            where: { $or: [{ id: id || name }, { alias: name }] },
            include: [ Tag, Image, User, Location, Event]
          });
        } catch (e) {
          sails.log.error(e);
          throw e;
        }
      },

      findByTagId: async (id) => {
        try {
          return await Post.findAll({
            include: {
              model: Tag,
              where: { id },
            }
          });
        } catch (e) {
          sails.log.error(e);
          throw e;
        }
      },
      deleteById: async (id) => {
        try {
          return await Post.destroy({ where: { id } });
        } catch (e) {
          sails.log.error(e);
          throw e;
        }
      },
    },
    instanceMethods: {},
    hooks: {}
  }
};
