<template>
  <div id="app" class="container">
	    <router-link to="/">Products</router-link>
    	<router-link to="/cart">Cart</router-link>

    	<router-view/>
  </div>
</template>

<script>
import Cart from "./components/cart/main";
import Products from "./components/products/main";
import Order from "./components/order/main";
import Payment from "./components/payment/main";

export default {
    name: "App",
    components: {
		Cart,
		Products,
		Order,
		Payment
	}
};
</script>

<style>
.container {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    min-height: 100px;
}
</style>
