var dispatcher = require('./../dispatcher.js');
var helper = require('./../helpers/RestHelper.js');

function GroceryItemStore() {
	var items = [];

	helper.get('api/items')
	.then(function(data){
		items = data;
		triggerListeners();
	});	

	var listeners = [];

	function getItems() {
		return items;
	}

	function addGroceryItem(item) {
		items.push(item);
		triggerListeners();

		helper.post('api/items', item);
	}

	function deleteGroceryItem(item) {

		// delete the item in the UI
		var index = items.findIndex(function(_item) {
			return _item.name == item.name
		});
		items.splice(index, 1);
		triggerListeners();

		// delete the item from the DB
		helper.del('api/items/' + item._id)
	}

	function setGroceryItemBought(item, isBought) {

		// update the item on the UI
		var _item = items.filter(function(a) { return a.name == item.name})[0];
		_item.purchased = isBought || false;
		triggerListeners();

		// update the item in the DB
		helper.patch('api/items/' + item._id, item);
	}

	function onChange(listener) {
		listeners.push(listener);
	}

	function triggerListeners() {
		listeners.forEach(function(listener){
			listener(items);
		});
	}

	dispatcher.register(function(event) {
		var split = event.type.split(':');
		if (split[0] === 'grocery-item') {
			switch(split[1]){
				case "add": 
					addGroceryItem(event.payload);
					break;
				case "delete":
					deleteGroceryItem(event.payload);
					break;
				case "buy":
					setGroceryItemBought(event.payload, true);
					break;
				case "unbuy":
					setGroceryItemBought(event.payload, false);
					break;
			}
		}
	});

	return {
		getItems: getItems,
		onChange: onChange
	}
}

module.exports = new GroceryItemStore();
