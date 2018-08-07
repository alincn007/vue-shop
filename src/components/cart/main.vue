<template>
    <div>
        hellofrom
        <nav class="nav nav-right nav-menu ">
            <div class="nav-left">
                <a href="/" class="is-white" >
                <img src="/static/logo.png"> 
                </a>
            </div>
    
            <div class="field has-addons is-medium"  v-show="this.state.step <= 2" >
                <p class="control">
                <input class="input is-medium" type="text" placeholder="Search">
                </p>
                <p class="control">
                <a class="button is-info is-medium">Buy</a>
                </p>
            </div>  

            <div class="has-text-right">
                <a v-bind:class="classBtnCart" v-show="this.state.step <= 2" >
                    <span>{{ cartDescription }}</span>
                    <span class="icon">    
                        <i class="material-icons">shopping_cart</i>
                    </span>
                </a>

                <a class="button is-medium is-success" text="Clique aqui para encerrar o pedido" :disabled="this.state.amount === 0" v-show="this.state.step === 1" >
                    <span @click="finish()">Checkout</span>
                </a>

                <a class="button is-medium is-info">
                    <i class="material-icons">face</i>
                    <span>
                        O lá visitante!
                    </span>
                </a>
            </div>
        </nav>
    </div>

</template>


<script>
    "use strict";

    export default {
        name: "cart",
        data() {
            return {
                animated: false
            };
        },
        computed: {
            cartDescription: function() {
                return `${this.state.products.length} ${
                    this.state.products.length <= 1 ? " - item" : " - items"
                }`;
            },
            state: function() {
                return this.store.state;
            },
            classBtnCart: function() {
                return this.animated
                    ? "button is-white is-medium animated flash -vendor-animation-duration: 1s"
                    : "button is-white is-medium";
            }
        },
        watch: {
            cartDescription: function() {
                this.animated = !this.animated;
            }
        },
        methods: {
            finish: function() {
                this.store.commit("GO_STEP", 2);
            }
        },
    };
</script>
