"use strict";

import util from "../services/util";

export default {
	'ADD_CART': function(state, payload) {
		const product = util.cloneObject(payload);
		//delete product.image;

		let index = -1; 
		state.products.forEach(function(p, i) {
			if (p.id == product.id) index = i;
		});

		if (index > -1) {
			state.products[index].quantity += payload.quantity;
		} else {
			state.products.push(product);
		}	

		state.total = state.total + payload.price * payload.quantity;
		state.quantity = state.quantity + 1;
	},

	'UPDATE_CART': function(state, payload) {
		const product = util.cloneObject(payload);
		//delete product.image;

		let index = -1; 
		state.products.forEach(function(p, i) {
			if (p.id == product.id) index = i;
		});

		if (index > -1) {
			state.products[index].quantity += payload.quantity;
		} else {
			state.products.push(product);
		}	

		state.total = state.total + payload.price * payload.quantity;
		state.quantity = state.quantity + 1;
	},
	
	'GO_STEP': function(state, step) {
		state.step = step;
	},

	'ADD_ORDER': function(state, payload) {
		state.products = [];
		state.total = 0;
		state.quantity = 0;
		state.orderOK = payload;
	},

	'ADD_PAY': function(state, payload) {
		state.payOK = payload;
	}
};
