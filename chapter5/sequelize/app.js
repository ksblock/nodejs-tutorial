const { sequelize } = require('./models/index.js');

const driver = () => {
    sequelize.sync().then(() => {
        console.log('초기화');
    }).catch((err) => {
        console.log('초기화 실패');
        console.log(err);
    });
};
driver();