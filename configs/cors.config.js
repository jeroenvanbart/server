const cors = require("cors");

const {FRONTEND_ENDPOINT } = process.env;

module.exports = (incommingApp) => {
    incommingApp.use(
        cors({
            credentials: true,
            origin: [FRONTEND_ENDPOINT],
        })
    );
    incomingApp.options('*', cors({
        origin: FRONTEND_ENDPOINT,
        credentials: true,
      }))
};