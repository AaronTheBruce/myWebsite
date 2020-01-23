var express 	= require("express"),	
	app 		= express(),
	bodyParser 	= require("body-parser"),
	mongoose 	= require("mongoose"),
	seedDB		= require("./seed"),
	Tarot		= require("./models/tarot");

// Connect to MongoDB database
// mongoose.connect('mongodb://localhost:27017/personal_website', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true});
mongoose.connect('mongodb+srv://AaronBruce:<password>@cluster0-qumhf.mongodb.net/test?retryWrites=true&w=majority', { 
	useNewUrlParser: true, 
	useUnifiedTopology: true, 
	useFindAndModify: false, 
	useCreateIndex: true}).then(() => {
		console.log('Connected to DB!');
	}).catch(err => {
		console.log('ERROR', err.message);
	});
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");

seedDB(); /*  Database already loaded with vertical Major & Minor Arcana */

// Landing Page: About Me
app.get("/", function(req, res){
	res.render("landing");
});

// Projects page, used to refresh routes, ejs, and use of body parser
app.get("/projects", function(req, res){
	res.render("projects");
});

// POST route for retrieving values from new project form
app.post("/projects", function(req, res){
	// get data from form and add to projects array
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var newProject = {name: name, image: image, description: description};
	
	projects.push(newProject);
	res.send("You reached the POST route for projects");
	
	// redirect back to projects page
	res.redirect("/projects");
});

// Page form for adding a new project to website
app.get("/projects/new", function(req, res){
	res.render("new");
});


// ====================
//    Tarot App Routes
// ====================

app.get("/projects/tarotHome", function(req, res){
	res.render("tarotHome")
})

// May need to clean up these routes
app.get("/projects/tarot", function(req, res){
	Tarot.find({}, function(err, allCards){
		if(err){
			console.log(err);
		} else {
			res.render("tarot", {tarots: allCards});
		}
	});
});

app.get("/projects/tarot3", function(req, res){
	Tarot.find({}, function(err, allCards){
		if(err){
			console.log(err);
		} else {
			res.render("tarot3", {tarots: allCards});
		}
	});
});




app.listen(3000, function(req, res){
	console.log("The PersonalProject server has started!");
});