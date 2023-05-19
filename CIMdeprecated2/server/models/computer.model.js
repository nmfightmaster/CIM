module.exports = (sequelize, Sequelize) => {
    const Computer = sequelize.define("computer", {
        name: {
            type: Sequelize.STRING
        },
        serviceTag: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING
        },
        model: {
            type: Sequelize.STRING
        },
        imagedOn: {
            type: Sequelize.DATE
        }
    });

    return Computer;
};
        