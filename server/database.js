var mongoose = require('mongoose');

var GroceryItem = require('./models/GroceryItem.js');
var uri = 'mongodb+srv://admin:admin@react-express-exemplar-9qrjm.mongodb.net/test?retryWrites=true';
mongoose.connect(uri, {useNewUrlParser: true}, function(){
	console.log('connected.');

	// for dev purposes, we clear the db to reimplement test data
	//mongoose.connection.db.dropDatabase();

	var items = [
		{name: 'Ice Cream'},
		{name: 'Waffles'},
		{name: 'Candy', purchased: true},
		{name: 'Sharks'}
	];

	items.forEach(function(item) {
		new GroceryItem(item).save();
	});

	

});
