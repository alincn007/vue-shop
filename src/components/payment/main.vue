<template>

  <div class="has-text-center" v-show="this.state.step === 3">
    <div class="columns">
      <div class="column is-half" v-show="!paySend">     
        
        <label>Número do Pedido Moip</label>
        <p class="is-info">
          <input class="input" v-model="this.state.orderOK.id" type="text" disabled>
        </p> 
        
        <label>Número do Pagamento Moip</label>
        <p class="is-info">
          <input class="input" v-model="this.state.payOK.id" type="text" disabled>
        </p>  
        
        <label><b> STATUS DA TRANSAÇÃO EM TEMPO REAL ))) </b></label>
        <p class="is-info">
          <input class="input animated flash" v-model="status" type="text" disabled style="font-weight: bold;">
        </p>
        <br/>
        <h1>Insira os dados e confirme o pagamento</h1>
        <label @click="fill()">Número do cartão * - Dados fictícios clique</label>
        <p class="is-info">
          <input class="input" v-model="cardNum" type="text" v-mask="'#### #### #### ####'" >
        </p>
        <label>CVV *</label>
        <p class="is-info">
          <input class="input" v-model="cvc" type="text"  v-mask="'###'"  >
        </p>

        <label>Mês de Expiração (MM) *</label>
        <p class="is-info">
          <input class="input" v-model="expMonth" type="text" v-mask="'##'">
        </p> 

        <label>Ano de Expiração (AA) *</label> 
        <p class="is-info">
          <input class="input" v-model="expYear" type="text" v-mask="'##'">
        </p>    
        <br/>
        
        <a ref="btnAdd" class='button is-primary is-large' @click="back()" >
          <span>{{ btnBack }}</span>
        </a> 
        
        <a ref="btnAdd" v-show="status !== 'ORDER.PAID'" class='button is-primary is-large is-danger' @click="finishPay()" :disabled="!ccIsValid || disableButtonPay">
          <span>{{ btnPay }}</span>
        </a>               

      </div>
    </div>

    
  </div>

</template>

<script>
"use strict";

import util from "../../services/util";
import payment from "../../models/payment";

export default {
    name: "payment",
    data() {
        return {
            cardNum: "",
            cvc: "",
            expMonth: "",
            expYear: "",
            coupon: "",
            paySend: false,
            status: "PENDENTE",
            amount:
                this.coupon !== ""
                    ? this.$store.state.amount * 0.5
                    : this.$store.state.amount,
            paymentData: {},
            disableButtonPay: false
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
        btnBack() {
            return this.status === "ORDER.PAID"
                ? "Compra efetuada! Clique aqui e continue comprando..."
                : "Voltar a Vitrine";
        },
        btnPay() {
            return this.status === "ORDER.CREATED" || this.status === "PENDENTE"
                ? "Confirmar Pagamento"
                : "Aguarde...";
        },
        ccIsValid() {
            const card = util.creditCard();
            card.number = util.removeSpaces(this.cardNum);
            card.cvc = this.cvc;
            card.expMonth = this.expMonth;
            card.expYear = this.expYear;
            return card.isValid();
        },
        state() {
            return this.$store.state;
        }
    },
    mounted() {
        this.paymentdata = payment.pay;
    },
    methods: {
        back: function() {
            this.$store.state.step = 1;
        },
        finishPay: function() {
            const card = util.creditCard();
            card.number = util.removeSpaces(this.cardNum);
            card.cvc = this.cvc;
            card.expMonth = this.expMonth;
            card.expYear = this.expYear;

            this.paymentdata.fundingInstrument.creditCard.hash = card.hash();

            this.status = this.state.payOK.status;
            this.disableButtonPay = true;

            this.axios
                .post("/orders/" + this.state.orderOK.id, this.paymentdata)
                .then(response => {
                    this.$store.commit("ADD_PAY", response.data);
                    this.cardNum = "";
                    this.cvc = "";
                    this.expMonth = "";
                    this.expYear = "";
                    this.disableButtonPay = false;
                })
                .catch(() => {
                    this.disableButtonPay = false;
                    this.status = "Algo de errado aconteceu no pagamento >>";
                });
        },
        fill: function() {
            if (this.cardNum === "") {
                this.cardNum = "5555666677778884";
                this.cvc = "123";
                this.expMonth = "12";
                this.expYear = "18";
            } else {
                this.cardNum = "";
                this.cvc = "";
                this.expMonth = "";
                this.expYear = "";
            }
        }
    },
    sockets: {
        post: function(data) {
            this.status = data.data.event;
        }
    }
};
</script>

<style>
</style>
