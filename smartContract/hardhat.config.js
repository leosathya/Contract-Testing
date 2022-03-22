require("@nomiclabs/hardhat-waffle");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
	solidity: "0.8.4",
	networks: {
		rinkeby: {
			url: process.env.API_URL,
			accounts: [process.env.ACCOUNT_KEY],
		},
	},
};
