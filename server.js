//to use the functions and commands in the express module
var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('parcelite', ['clients']);
var bodyParser = require('body-parser');//module to teach the server parse the body of the input 

//instruct the server where to find our static files
app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get('/clients', function (req, res) {
	console.log('server received a GET request');

	db.clients.find(function (err, docs) {
		console.log('Data from mongojs: ');
		console.log(docs);
		res.json(docs);
	});

});

app.post('/client', function (req, res) {
	console.log(req.body);
	db.clients.insert(req.body, function(err, doc) {
		res.json(doc);
	});
});

app.delete('/client/:id', function(req, res) {
	var id = req.params.id;
	console.log(id);
	db.clients.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
		res.json(doc);
	});
});

app.get('/client/:id', function(req, res) {
	var id = req.params.id;
	console.log(id);
	db.clients.findOne({_id: mongojs.ObjectId(id)}, function(err, doc) {
		res.json(doc);
	});
});

app.put('/client/:id', function(req, res) {
	var id = req.params.id;
	console.log("app.put: " + req.body.userName + ",\n"+"id: " + id + ",\n"+
		"req.body._id: " + req.body._id + ",\n"+
		"req.body.firstName: " + req.body.firstName + ",\n"+
		"req.body.lastName: " + req.body.lastName + ",\n"+
		"req.body.userName: " + req.body.userName + ",\n"+
		"req.body.postCode " + req.body.postCode
		);
	db.clients.findAndModify({
		query: 	{
			_id:  mongojs.ObjectId(id)
		},
		update: {
			$set: {
				firstName: req.body.firstName, 
				lastName: req.body.lastName, 
				userName: req.body.userName, 
				postCode: req.body.postCode
			}
		},
		new: true
	},
		function(err, doc) {
				res.json(doc);
		}
	);
});


app.listen(3000);

console.log('Server running on port:3000');

