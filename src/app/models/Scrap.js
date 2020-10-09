import Sequelize, { Model } from 'sequelize';

class Scrap extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        title: Sequelize.STRING,
        message: Sequelize.STRING,
        user_id: {
          type: Sequelize.UUID,
          references: {
            model: 'users',
            key: 'id',
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User);
  }
}

export default Scrap;
