"use strict";

import util from "../services/util";

export default {
	ADD_CART(state, payload) {
		const product = util.cloneObject(payload);
		delete product.image;
		state.products.push(product);
		state.amount = state.amount + payload.price;
		state.quantity = state.quantity + 1;
	},
	GO_STEP(state, step) {
		state.step = step;
	},
	ADD_ORDER(state, payload) {
		state.products = [];
		state.amount = 0;
		state.quantity = 0;
		state.orderOK = payload;
	},
	ADD_PAY(state, payload) {
		state.payOK = payload;
	}
};
