<template>
    <div>
        <ul class="products-list" v-show="state.products.length">
            <li class="" v-for="p in state.products" v-bind:key="p.id">
                <div class="avatar">
                    <img v-bind:src="p.image">
                </div>

                <div class="details">
                    <div class="title">{{ p.title }}</div>
                    <div class="description">{{p.description}}</div>    
                </div>
                
                <div class="price">${{formatPrice(p.price)}}</div>
                <div class="quantity">
                    <input type="text" v-model="p.quantity">
                </div>
            </li>

            <li>
                <div class="summary">Total: <span>${{formatPrice(totalAmount)}}</span></div>
            </li>
        </ul>   
    </div>
</template>


<script>
"use strict";

import util from '../../services/util'
import products from '../../models/products'

export default {
    name: "cart",
    created() {
    },
    data() {
        return {
        };
    },
    computed: {
        state() {
            return this.$store.state;
        },
        cartDescription() {
            return `${this.state.products.length} ${this.state.products.length == 1 ? " - item" : " - items"}`;
        },
        classBtnCart() {
            return this.animated
                ? "button is-white is-medium animated flash -vendor-animation-duration: 1s"
                : "button is-white is-medium";
        },
        totalAmount() {
            //return this.state.total || 0;

            let total = this.state.products.reduce((acc, p)=> {
                return acc + p.quantity * p.price;
            }, 0);
            return total;
        }
    },
    watch: {
    },
    methods: {
        formatPrice: util.formatPrice
    }
};
</script>

<style scoped>
    .products-list {
       list-style: none;
       padding: 0;
    }

    .products-list li {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-between;

        margin-bottom: 10px;
        box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.1);
        padding: 10px;
        border: solid 5px transparent;
        align-self: flex-start;
    }

    .avatar {
        height: 50px;
    }

    .avatar img {
        width: auto;
        height: 100%;
    }

    .details {
        flex: 1;
        text-align: left;
        padding-left: 30px;
    }

    .details .title {
        font-weight: 500;
        font-size: 1.1em;
    }

    .details .description {
        font-size: 0.9em;
        font-weight: 300;
    }


    .price {
        font-weight: 700;
        margin-right: 30px;
    }

    .quantity input {
        width: 30px;
        font-size: 1em;
        border: none;
        outline: none;
        text-align: center;
        box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.3);
    }

    .summary {
        font-weight: 700;
        text-align:  right;
        width: 100%;
    }
</style>

