const sequelize = require('../models/index')
const init_models = require('../models/init-models');
const model = init_models(sequelize);

const { body, param, query } = require('express-validator')

let postLike = [
    body('user_id').exists().withMessage('user_id is required').isInt([{ min: 1 }]).withMessage('user_id phải là kiểu INT').custom(value => {
        return model.user.findOne({where : {user_id : value}}).then(user =>{
            console.log(!user)
            if(!user){
                return Promise.reject( "user_id không tồn tại")
            }
        })
    }),
    body('res_id').exists().withMessage('res_id is required').isInt([{ min: 1 }]).withMessage('res_id phải là kiểu INT').custom(value => {
        return model.restaurant.findOne({where : {res_id : value}}).then(data =>{
            if(!data){
                return Promise.reject("res_id không tồn tại")
            }
        })
    })
]

module.exports = {postLike}
