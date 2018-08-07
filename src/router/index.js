import Vue from "vue";
import Router from "vue-router";

import Cart from "@/components/cart/main";
import Products from "@/components/products/main";

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
	]
});
