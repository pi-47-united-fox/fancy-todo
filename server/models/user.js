'use strict'
const {
  Model
} = require('sequelize')
const BcriptJs = require('../helper/bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo)
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Must enter valid email'
        },
        isEmail: {
          msg: 'Must enter valid email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: { // jika digunakan
        notEmpty: {
          msg: 'Must enter password'
        }
        // isAlphanumeric: {
        //   msg: 'Password must contain alfabet and number'
        // }
      }
    },
    bg_img: DataTypes.STRING,
    location: DataTypes.STRING,
    user_name: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (instance) => {
        // FOR PASSWORD
        instance.password = BcriptJs.makeHash(instance.password)

        // FOR API - WEATHER AND BACKGROUND IMAGE
        instance.location = 'Jakarta'
        instance.bg_img   = 'no_image'

        // FOR USERNAME
        instance.user_name = instance.email.split('@')[0]
      },
      afterCreate: (instance) => {
          instance = instance.dataValues
          // console.log (instance)
          const today = new Date()
          const tomorrow = new Date(today)
          tomorrow.setDate(tomorrow.getDate() + 1)
          sequelize.models.Todo.create
          ({
            title: 'Selamat Datang',
            description: 'Ini adalah contoh catatan di Fancy app todo. Kamu bisa menambah, mengedit, dan Menghapus, serta dapat mengubah status todomu menjadi selesai atau belum selesai. Kamu juga bisa mengubah tampilan latar belakang, ataupun lokasi Cuaca di User Setting. Merubah tampilan membutuhkan log out dan login ulang untuk hasil yang maksimal. Terimaksih',
            status : 'finished',
            due_date: tomorrow,
            UserId: instance.id
          }).then((result) => {
            console.log ('Berhasil')
          }).catch((err) => {
            console.log ('gagasl')
            
          });
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};