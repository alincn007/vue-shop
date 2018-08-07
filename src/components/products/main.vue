<template>
<div id="showcase" class="has-text-centered" v-show="this.state.step === 1">
    <div class="columns box">
        <div class="column" v-for="product in products" v-bind:key="product.id">
            <div class="title">
                <h3>{{ product.product }}</h3>
            </div>
            <img v-bind:src="product.image" @click="add(product)">
            <div class="title" >${{ formatPrice(product.price) }}</div>
            
            <a ref="btnAdd" class='button is-outlined is-danger' @click="add(product)">
                <span class="icon"><i class="material-icons">shopping_cart</i>Buy</span>
            </a>
        
        </div>

    </div>   
    </div>
</template>

<script>
"use strict";

import util from "../../services/util";
import products from "../../models/products";

export default {
    name: "products",
    data() {
        return {
            products: products.products
        };
    },
    computed: {
        state() {
            return this.$store.state;
        }
    },
    methods: {
        add: function(product) {
            this.$store.commit("ADD_CART", product);
        },
        formatPrice: util.formatPrice
    }
};
</script>

<style>
.columns {
    display: flex;
    flex-wrap: wrap;
    width: 80%;
    margin: auto;
    justify-content: center;
}

.column {
    margin-bottom: 10px;
    box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.1);
    padding: 10px;
    border: solid 5px transparent;
}
</style>
