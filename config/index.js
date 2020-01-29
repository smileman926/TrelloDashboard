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
const googleInfo = () => {
	switch (process.env.NODE_ENV) {
		case "production":
			return {
				clientID: "188649040485-ms1d8apo1do5li72snu1l318va6ed29q.apps.googleusercontent.com",
				clientSecret: "UMlPsb6W7YCBE3-UPVBwxrK2",
				callbackURL: "/auth/google/callback"
				}
		case "development":
		 	return {
				clientID: "710107340160-ngao9v87074vtfftqm8mpctgq5vqbika.apps.googleusercontent.com",
				clientSecret: "K04JF04w32tv5JqV3f1PH411",
				callbackURL: "/auth/google/callback"
				}
		default:
			return {
				clientID: "710107340160-ngao9v87074vtfftqm8mpctgq5vqbika.apps.googleusercontent.com",
				clientSecret: "K04JF04w32tv5JqV3f1PH411",
				callbackURL: "/auth/google/callback"
				}
		}
}
const CLIENT_ORIGIN = origin();
const GOOGLE_INFO = googleInfo();
module.exports = {
	GOOGLE_INFO: GOOGLE_INFO,
    CLIENT_ORIGIN: CLIENT_ORIGIN
}
