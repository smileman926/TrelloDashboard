const User = require("../models/Users")
const LocalStrategy = require("passport-local").Strategy

const strategy = new LocalStrategy(
	// {
	// 	usernameField: "username" // not necessary, DEFAULT
	// },
	function(username, password, done) {
		console.log("passport local accept")
		User.findOne({ "local.useremail": username }, (err, userMatch) => {
			if (userMatch.confirm) {
				if (err) {
					console.log("=====error=====")
					return done(err)
				}
				if (!userMatch) {
					console.log("Incorrect Email")
					return done(null, false, { messageEmail: "Incorrect Email message" })
				}
				if (!userMatch.checkPassword(password)) {
					console.log("Incorrect Password")
					return done(null, false, { messagePwd: "Incorrect password message" })
				}
				return done(null, userMatch)
			}
			else {
				console.log("email unconfirmmed")
				return done(null, false, {unconfirmMsg: "Your email is not confirmed."})
			}
		})
		// done(null, true)
	}
)

module.exports = strategy
