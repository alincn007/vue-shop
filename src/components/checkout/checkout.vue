<template>
    <!-- <div class="has-text-center" v-show="this.state.step === 2"> -->
        <div>
            <h3>Please check your <b>ORDER</b> and confirm you info </h3>
            <ul class="order-details">
                <li>
                    <label>Full name *</label>
                    <div class="customer-name">
                        <input class="input" type="text" v-model="customerName">
                    </div>
                </li>
                  <li>
                    <label>Buy more pay less</label>
                    <div class="badge">
                        {{this.state.quantity}}
                    </div>
                </li>

                 <li>
                    <label>Total discount</label>
                    <div class="badge">
                        ${{formatPrice(discount)}}
                    </div>
                </li>

                 <li>
                    <label>Total</label>
                    <div class="badge">
                        ${{formatPrice(toPay)}}
                    </div>
                </li>
            </ul>
        </div>
</template>

<script>
"use strict";

import payload from "../../models/order";
import util from "../../services/util";

export default {
    name: "checkout",
    data() {
        return {
            customerName: "",
            coupon: "",
            order: payload.order,
            wait: "Confirm your order"
        };
    },
    computed: {
        discount() {
            return this.state.total * this.discountPercent / 100;
        },
        discountPercent() {
            if (this.state.quantity < 5) return 5;
            if (this.state.quantity > 10) return 15;
            return 10;
        },
        totalAmount() {
            let total = this.state.products.reduce((acc, p)=> {
                return acc + p.quantity * p.price;
            }, 0);
            return total;
        },
        toPay() {
            return this.totalAmount - this.discount;
        },
        state() {
            return this.$store.state;
        }
    },
    mounted() {},
    methods: {
        confirmOrder: function() {
            this.wait = "Please Wait...";
            this.order.items = util.formatPriceSend(this.recalc, "price");
            this.order.customer.fullname = this.customerName;
            this.order.customer.ownId = this.customerName;

            this.$store.commit("ADD_ORDER", response.data);
            this.$store.commit("GO_STEP", 3);
            this.parc = "";
            this.coupon = "";
        },
        formatPrice: util.formatPrice
    }
};
</script>

<style scoped>
ul.order-details {
    list-style: none;
    padding: 0;
    margin: 0 auto;
    width: 500px;
    max-width: 100%;
}

ul.order-details li {
    padding: 10px;
    text-align: left;
    margin-bottom: 10px;
    box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.1);
    padding: 10px;
    display: flex;
    justify-content: space-between;
}

.customer-name input {
    width: 100%;
    font-size: 1em;
    border: none;
    outline: none;
    text-align: center;
    box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.3);
}

.badge {
   background-color: rgb(86, 206, 228);
    height: 30px;
    min-width: 30px;
    border-radius: 10px;
    color: #fff;
    text-align: center;
    line-height: 30px;
    font-weight: 500;
    padding: 0px 10px;
}

label {
    font-weight: 500;
}
</style>
