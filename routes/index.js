const path = require('path');
const router = require('express').Router();
const apiConfessionRoute = require('./confession-api-routes');
const apiUserRoute = require('./user-api-routes');

// const htmlRoutes = require('./html-routes');

// router.get("/", function (req, res) {
//   res.sendFile(path.join(__dirname, "../public/blog.html"));
// });

// // cms route loads cms.html
// router.get("/cms", function (req, res) {
//   res.sendFile(path.join(__dirname, "../public/cms.html"));
// });

// // blog route loads blog.html
// router.get("/blog", function (req, res) {
//   res.sendFile(path.join(__dirname, "../public/blog.html"));
// });

// // users route loads user-manager.html
// router.get("/users", function (req, res) {
//   res.sendFile(path.join(__dirname, "../public/user-manager.html"));
// });

// ***********************************
// // route for Home-Page
// router.get('/', sessionChecker, (req, res) => {
//   res.redirect('/login');
// });


// // route for user signup
// router.route('/signup')
//   //.get(sessionChecker, (req, res) => {
//   .get((req, res) => {
//       //res.sendFile(__dirname + '/public/signup.html');
//       res.render('signup', hbsContent);
//   })
//   .post((req, res) => {
//       User.create({
//           username: req.body.username,
//           //email: req.body.email,
//           password: req.body.password
//       })
//       .then(user => {
//           req.session.user = user.dataValues;
//           res.redirect('/dashboard');
//       })
//       .catch(error => {
//           res.redirect('/signup');
//       });
//   });


// // route for user Login
// router.route('/login')
//   .get(sessionChecker, (req, res) => {
//       //res.sendFile(__dirname + '/public/login.html');
//       res.render('login', hbsContent);
//   })
//   .post((req, res) => {
//       var username = req.body.username,
//           password = req.body.password;

//       User.findOne({ where: { username: username } }).then(function (user) {
//           if (!user) {
//               res.redirect('/login');
//           } else if (!user.validPassword(password)) {
//               res.redirect('/login');
//           } else {
//               req.session.user = user.dataValues;
//               res.redirect('/dashboard');
//           }
//       });
//   });


// // route for user's dashboard
// router.get('/dashboard', (req, res) => {
//   if (req.session.user && req.cookies.user_sid) {
//   hbsContent.loggedin = true; 
//   hbsContent.userName = req.session.user.username; 
//   //console.log(JSON.stringify(req.session.user)); 
//   console.log(req.session.user.username); 
//   hbsContent.title = "You are logged in"; 
//       //res.sendFile(__dirname + '/public/dashboard.html');
//       res.render('index', hbsContent);
//   } else {
//       res.redirect('/login');
//   }
// });


// // route for user logout
// router.get('/logout', (req, res) => {
//   if (req.session.user && req.cookies.user_sid) {
//   hbsContent.loggedin = false; 
//   hbsContent.title = "You are logged out!"; 
//       res.clearCookie('user_sid');
//   console.log(JSON.stringify(hbsContent)); 
//       res.redirect('/');
//   } else {
//       res.redirect('/login');
//   }
// });


// // route for handling 404 requests(unavailable routes)
// router.use(function (req, res, next) {
// res.status(404).send("Sorry can't find that!")
// });


// ***********************************



router.use('/api', apiUserRoute);
router.use('/api', apiConfessionRoute);
//router.use('*', htmlRoutes);


module.exports = router;