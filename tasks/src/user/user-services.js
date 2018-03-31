var dbObject = require('../db/mongo-connection')
var dbUtil = require('../db/db-util')

var userCollection = dbObject.collection('user');

var userService = {
    registerUser(user, resp) {
        return userCollection.find({
            username: user.username
        }).count(function (err, cnt) {
            console.info('cnt', cnt)
            if (cnt > 0) {
                resp.json({
                    success: false,
                    msg: '用户名已存在'
                });
                return;
            }
            dbUtil.addCreatedTimeAttribute(user);
            userCollection.insert(user, function (
                err, doc) {
                resp.json({
                    success: true,
                    msg: doc
                })
            });
        })
    },
    findUser(condition) {
        dbUtil.parseConditionId(condition);
        return userCollection.findOne({
            condition
        })
    },
    loginUser(user, res) {
        var condition = {
            $or: [{
                email: user.loginId
						}, {
                username: user.loginId
						}],
            password: user.password
        }
        userCollection.findOne(condition, function (err,
            doc) {
            if (err) {
                res.json({
                    success: false,
                    msg: err
                })
            } else {
                if (doc) {
                    res.json({
                        success: true,
                        msg: doc
                    })
                } else {
                    res.json({
                        success: false,
                        msg: '登录信息错误'
                    })
                }

            }
        })
    }
}

module.exports = userService;