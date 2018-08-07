<template>

  <div class="has-text-center" v-show="this.state.step === 2">

    <div class="columns">
      <div class="column is-half">
        <h1>Confira atentamente os dados do <b>PEDIDO</b> e confirme por favor </h1>
        <br/>
        <label>Insira seu nome *</label>
        <p class="is-info">
          <input class="input" type="text" v-model="nameClient">
        </p>        
        <label>Quantidade de itens</label>
        <p class="is-info">
          <input class="input" type="text" v-model="this.state.quantity" disabled>
        </p>
        <label>Possui um Cupom de Desconto?</label>
        <p class="is-info">
          <input class="input" type="text" v-model=coupon >
        </p>
        <label>Quantidade de parcelas</label>
        <div class="field" >
          <p class="is-info" >
            <span class="select" >
              <select v-model=parc >
                <option v-for="option in options" v-bind:value="option.value" v-bind:key="option.id">
                  {{ option.value }} {{ option.text }}
                </option>
              </select>
            </span>
          </p>
        </div>        

        <label v-show="coupon != ''">Valor Desconto R$</label>
        <p class="is-info">
          <input v-show="coupon != ''" class="input" type="text" v-model=discount :disabled="true">
        </p>

        <label >Valor Total R$ </label>
        <p class="is-info">
          <input class="input" type="text" v-model=total :disabled="true" >
        </p>

      </div>

    </div>

    <a ref="btnAdd" class='button is-primary is-large' @click="back()">
      <span>Voltar a vitrine</span>
    </a> 

    <a ref="btnAdd" class='button is-primary is-large is-danger' @click="finishPay()" :disabled="disableButtonOrder || this.nameClientent === ''">
      <span>{{ wait }}</span>
    </a> 

  </div>

</template>

<script>
"use strict";

import payload from "../../models/order";
import util from "../../services/util";

export default {
    name: "order",
    data() {
        return {
            nameClient: "",
            coupon: "",
            parc: "12",
            order: payload.order,
            wait: "Confirmar Pedido",
            disableButtonOrder: false,
            options: [
                { text: " x (sem juros)", value: "1" },
                { text: " x (juros 2,5%)", value: "2" },
                { text: " x (juros 2,5%)", value: "3" },
                { text: " x (juros 2,5%)", value: "4" },
                { text: " x (juros 2,5%)", value: "5" },
                { text: " x (juros 2,5%)", value: "6" },
                { text: " x (juros 2,5%)", value: "7" },
                { text: " x (juros 2,5%)", value: "8" },
                { text: " x (juros 2,5%)", value: "9" },
                { text: " x (juros 2,5%)", value: "10" },
                { text: " x (juros 2,5%)", value: "11" },
                { text: " x (juros 2,5%)", value: "12" }
            ]
        };
    },
    computed: {
        total() {
            let items = util.cloneObject(this.recalc);
            return util.formatPriceToFixed(
                items.reduce(
                    (acumulator, product) => acumulator + product.price,
                    0
                )
            );
        },
        discount() {
            return this.coupon !== "" ? (this.total * 5 / 100).toFixed(2) : 0;
        },
        recalc() {
            let items = util.cloneObject(this.$store.state.products);

            if (this.coupon !== "") {
                items = util.discount(items, 0.95, "price");
            }

            if (parseInt(this.parc, 10) > 1) {
                items = util.discount(items, 1.025, "price");
            }
            return items;
        },
        state() {
            return this.$store.state;
        }
    },
    mounted() {},
    methods: {
        back: function() {
            this.$store.commit("GO_STEP", 1);
        },
        finishPay: function() {
            this.wait = "Aguarde...";
            this.order.items = util.formatPriceSend(this.recalc, "price");
            this.order.customer.fullname = this.nameClient;
            this.order.customer.ownId = this.nameClient;
            this.disableButtonOrder = true;

            this.axios
                .post("/orders", this.order)
                .then(response => {
                    this.$store.commit("ADD_ORDER", response.data);
                    this.$store.commit("GO_STEP", 3);
                    this.parc = "";
                    this.coupon = "";
                    this.wait = "Confirmar Pedido";
                    this.nameClient = "";
                    this.disableButtonOrder = false;
                })
                .catch(() => {
                    this.disableButtonOrder = false;
                    this.wait = "Confirmar Pedido";
                    this.qty =
                        "Algo de errado aconteceu na geração do pedido >> ";
                });
        },
        formatPrice: util.formatPrice
    }
};
</script>

<style>
</style>
