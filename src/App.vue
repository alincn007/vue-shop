<template>
  <div id="app" class="container">

      <h3>Welcome to Supico!</h3>

    <md-steppers :md-active-step.sync="active" md-linear md-sync-route="true">
        <md-step 
            id="products" 
            md-label="Store" 
            md-description="Browse products list"
            to="/products"
            :md-done.sync="steps['products']">
                <md-button class="md-raised md-primary" @click="setDone('cart')">View Cart</md-button>
                <Products></Products>
        </md-step>

        <md-step id="cart" to="/cart" md-label="Cart" md-description="Selected products" :md-done.sync="steps['cart']">
            <md-button class="md-raised md-primary" @click="setDone('checkout')" :disabled="!hasCartItems">Checkout</md-button>
            <Cart></Cart>
        </md-step>

        <md-step id="checkout" to="/checkout" md-label="Checkout"  md-description="View order summary" :md-done.sync="steps['checkout']">
            <md-button class="md-raised md-primary" @click="setDone('payment')">Go to payments</md-button>
            <Checkout></Checkout>
        </md-step>

        <md-step id="payment" to="/payment" md-label="Payment"  md-description="Your payment details" :md-done.sync="steps['payment']">
            <Payment></Payment>
        </md-step>
    </md-steppers>

    <!-- <ul class="nav-bar">
      <li>
	      <router-link to="/">Products</router-link>
      </li>
      <li>
    	  <router-link to="/cart">Cart</router-link>
      </li>
    </ul> 
    	<router-view/>
        -->
  </div>
</template>

<script>
import Cart from "./components/cart/cart";
import Products from "./components/products/products";
import Checkout from "./components/checkout/checkout";
import Payment from "./components/payment/payment";

export default {
    name: "App",
    components: {
        Cart,
        Products,
        Checkout,
        Payment
    },
    data: () => ({
      active: 'first',
      steps: {
          'products': true,
          'cart': false,
          'checkout': false,
          'payment': false,
      }
    }),
    computed: {
        state() {
            return this.$store.state;
        },
        hasCartItems() {
            return this.state.quantity > 0;
        }
    },
    methods: {
        setDone(current) {
            this.steps[current] = true;
            this.active = current;
        },
        setError() {
            this.secondStepError = "This is an error!";
        }
    },
    created: () => {
    }
};
</script>

<style scoped>
.container {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
    width: 80%;
    margin: 50px auto;
}

ul.nav-bar {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
}

.nav-bar li {
    padding: 10px;
    font-weight: 500;
}
</style>
