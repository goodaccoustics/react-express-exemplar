var React = require('react');
var createReactClass = require('create-react-class');
var GroceryItem = require('./GroceryItem.jsx');
var GroceryListAddItem = require('./GroceryListAddItem.jsx');
module.exports = createReactClass({
	render: function(){
		return (
			<div>
				<h1>Grocery Listify</h1>
				<div>
					{this.props.items.map(function(item, index){	
						return (
							<GroceryItem key={index} item={item} />
						);
					})
					}
				</div>
				<GroceryListAddItem />
			</div>
		);
	}
});
