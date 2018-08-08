<template>
    <div class="products-list">
        <div class="product" v-for="p in products" v-bind:key="p.id">
            <div class="title">
                <h3>{{ p.title }}</h3>
            </div>
            <img v-bind:src="p.image" v-on:click="add(p)">
            
            <div class="title">
                ${{formatPrice(p.price) }}
            </div>
            
            <a ref="btnAdd" class='add-to-cart-btn' v-on:click="add(p)">
                <span class="icon"><i class="material-icons">shopping_cart</i></span>
            </a>
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
.products-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.product {
    margin-bottom: 10px;
    box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.1);
    padding: 10px;
    border: solid 5px transparent;
    align-self: flex-start;
}

.add-to-cart-btn {
    display: block;
    margin-top: 10px;
    cursor: pointer;
}

.add-to-cart-btn .material-icons {
    color: #333;
}
</style>
