module.exports = (Sequelize, sequelize) => {
    const Tutorial = sequelize.define("tutorial", {
        title: {
            type: Sequelize.STRING
        },
        desc: {
            type: Sequelize.STRING
        },
        pub: {
            type: Sequelize.BOOLEAN
        }
    });

    return Tutorial;
};