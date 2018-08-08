import Vue from "vue";
import Router from "vue-router";

import Cart from "@/components/cart/cart";
import Products from "@/components/products/products";
import Checkout from "@/components/checkout/checkout";
import Payment from "@/components/payment/payment";


Vue.use(Router);

export default new Router({
	routes: [
		{
			path: "/",
			component: Products
		},
		{
			path: "/cart",
			component: Cart
		},
		{
			path: "/checkout",
			component: Checkout
		},
		{
			path: "/payment",
			component: Payment
		},
	]
});
