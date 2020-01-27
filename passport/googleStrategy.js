const GoogleStrategy = require("passport-google-oauth20").Strategy
const User = require("../models/Users")
// "google": {
// 		"clientID": "585604580890-dp9nlh79gjpc6d9cttu6cpn84hs2vkj9.apps.googleusercontent.com",
// 		"clientSecret": "APqKhLgQGpu54vJtT5vgGayg",
// 		"callbackURL": "/auth/twitter/callback",
// 		"profileFields": ["id", "displayName", "photos"]
// 	},
const strategy = new GoogleStrategy(
	{
		clientID: "710107340160-ngao9v87074vtfftqm8mpctgq5vqbika.apps.googleusercontent.com",
		clientSecret: "K04JF04w32tv5JqV3f1PH411",
		callbackURL: "/auth/google/callback"
		
	},
	(token, tokenSecret, profile, done)=> {
		// testing
		console.log("===== GOOGLE PROFILE =======")
		console.log(profile)
		console.log("======== END ===========")
		// code
		const { id } = profile
		const tokenname = profile.name.givenName
		User.findOne({ "google.googleId": id }, (err, userMatch) => {
			// handle errors here:
			if (err) {
				console.log("Error!! trying to find user with googleId")
				console.log(err)
				return done(null, false)
			}
			// if there is already someone with that googleId
			if (userMatch) {
				return done(null, userMatch)
			} else {
				// if no user in our db, create a new user with that googleId
				console.log("====== PRE SAVE =======")
				console.log(id)
				console.log(profile)
				console.log("====== post save ....")
				const newGoogleUser = new User({
					"google.googleId": id,
					confirm: true,
					username: tokenname		
				})
				// save this user
				newGoogleUser.save((err, savedUser) => {
					if (err) {
						console.log("Error!! saving the new google user")
						console.log(err)
						return done(null, false)
					} else {
						return done(null, savedUser)
					}
				}) // closes newGoogleUser.save
			}
		}) // closes User.findONe
	}
)

module.exports = strategy
