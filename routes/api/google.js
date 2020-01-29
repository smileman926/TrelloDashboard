const express = require("express");
const router = express.Router();
const passport = require("../../passport");
const jwt = require("jsonwebtoken");
const localStorage = require('localStorage')
var bs = require('browser-storage')
const { CLIENT_ORIGIN } = require("../../config")

router.get("/auth/google/sign", passport.authenticate("google",{scope:["profile"]}),(req,res)=>{
	console.log("req====>")
	console.log(req);
});
router.get(
	"/auth/google/callback", 
	passport.authenticate("google"),function(req,res) {
	
	console.log("callback received callback");
	let payload = Object.assign({}, req.user)
	const token = "Bearer " + jwt.sign(payload, "secret");
	console.log('token')
	console.log(token)
	bs.setItem("jwtToken", token);
	payload = req.user.username
	const tokenUrl = jwt.sign(payload, "secret")
	bs.setItem("tokenUrl", tokenUrl);
	console.log("tokenUrl===>")
	console.log(tokenUrl)
	
	
	res.redirect(`${CLIENT_ORIGIN}/?token=${token}`);
});
	// jwt.sign(
	// 		payload,
	// 		"secret",
	// 		(err,token)=>{
	// 		res.json({
	// 			success: true,
	// 			token: "Bearer " + token
	// 			});
	// 		});
// router.get(
// 	"/auth/google/callback", 
// 	(req,res,next) => {
// 	passport.authenticate("google"),function(err,user) {

// 	console.log("callback received callback");
// 	console.log(user);
// 	console.log("user donw")
// 	const tokenUrl = jwt.sign(req.user.username, "secret")
// 	const token = "Bearer" + jwt.sign(req.user, "secret");
// 	// jwt.sign(
// 	// 		payload,
// 	// 		"secret",
// 	// 		(err,token)=>{
// 	// 		res.json({
// 	// 			success: true,
// 	// 			token: "Bearer " + token
// 	// 			});
// 	// 		});
// 	localStorage.setItem("jwtToken", token);
// 	res.redirect(`http://localhost:3000/${tokenUrl}/dashboard`);
// 	}(req,res,next)
// });
// , (req,res)=>{
// 	console.log("sdf")
// 	res.redirect("http://localhost:3000/dashboard");
// });

module.exports = router;

				