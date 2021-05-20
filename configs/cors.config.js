const cors = require("cors");

const {FRONTEND_ENDPOINT } = process.env;

module.exports = (incommingApp) => {
    incommingApp.use(
        cors({
            credentials: true,
            preflightContinue: true,
            origin: [FRONTEND_ENDPOINT],
        })
    );
};