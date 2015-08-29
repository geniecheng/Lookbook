var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Lookbook' });
});


/* GET Userlist page. */
router.get('/eventlist', function(req, res) {
    var db = req.db;
    var collection = db.get('lookbookevents');
    collection.find({},{},function(e,docs){
        res.render('eventlist', {
            "eventlist" : docs
        });
    });
});

/* GET New Event page. */
router.get('/newevent', function(req,res) {
	res.render('newevent', {title: 'Add New Event'});
});


/*POST to Add Event Service*/
router.post('/addevent', function(req,res) {
	
	//Set our Internal db Variable
	var db = req.db;
	
	//Get our form values. These rely on the "name" attributes
	var eventTitle = req.body.title;
	var eventStart = req.body.start;
	var eventEnd = req.body.end;
	var eventLink = req.body.link;

	//Set our collection
	var collection = db.get('lookbookevents');
	
	//Submit it to the DB
	collection.insert({
		"title" : eventTitle,
		"start" : new Date(eventStart),
		"end"	: new Date(eventEnd),
		"link"	: eventLink
	}, function (err, doc) {
		if (err) {
			res.send ("There was a problem adding information to the database.");
		}
		else {
			//And forward to success page
			res.redirect("eventlist");
		}
	});
});
	
	

module.exports = router;
