require('dotenv').config()

const origin = () => {
		switch (process.env.NODE_ENV) {
		case "production":
			return "http://trelloforest.herokuapp.com"
		case "development":
		 	return "http://localhost:3000"
		default:
			return "http://localhost:3000"
		}
	}
const CLIENT_ORIGIN = origin();
module.exports = {
	
    CLIENT_ORIGIN: CLIENT_ORIGIN
}
