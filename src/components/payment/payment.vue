<template>
<div>
    <div class="register-card">
      <div class="text-center">
        <img class="icon-header" src="../../assets/img/icons/cards.jpg">
      </div>
      <div class="container-text">
          <h3 class="grey-bold-font title-h2 text-center">Enter your card details</h3>
          <button @click="fill()">Fill</button>
      </div>

      <div class="text-center">
        <form name="form" novalidate class="md-layout" @submit.prevent="validatePayment">
            <md-card class="md-layout-item md-size-50 md-small-size-100">
                <md-card-header>
                    <div class="md-title">Card info</div>
                </md-card-header>

                <md-card-content>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-size-100">
                            <md-field :class="getValidationClass('name')">
                                <label for="name">Full name</label>
                                <md-input name="name" id="name" v-model="form.name"/>
                                <span class="md-error" v-if="!$v.form.name.required">Name is required</span>
                                <span class="md-error" v-else-if="!$v.form.name.minlength">Name must have at least 3 characters</span>
                            </md-field>
                        </div>


                        <div class="md-layout-item md-size-100">
                            <md-field :class="getValidationClass('cardNum')">
                                <label for="cardNum">Card Number</label>
                                <md-input name="cardNum" id="cardNum" v-model="form.cardNum"/>
                                <span class="md-error" v-if="!$v.form.cardNum.required">Card number is required</span>
                                <span class="md-error" v-else-if="!$v.form.cardNum.minlength">Invalid card number</span>
                            </md-field>
                        </div>
                    </div>
                </md-card-content>

                <md-progress-bar md-mode="indeterminate" v-if="loading" />

                <md-card-actions>
                    <md-button type="submit" class="md-primary" :disabled="loading">Pay Now</md-button>
                </md-card-actions>
            </md-card>
        </form>
      </div>
    </div>
</div>
</template>

<script>
"use strict";

import util from "../../services/util";
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
    name: "payment",
    mixins: [validationMixin],
    data: () => ({
        form: {
            cardNum: null,
            name: null
        },
        loading: false
    }),
    validations: {
        form: {
            cardNum: {
                required,
                minLength: minLength(16)
            },
            name: {
                required,
                minLength: minLength(3)
            }
        }
    },
    methods: {
        getValidationClass(fieldName) {
            const field = this.$v.form[fieldName];

            if (field) {
                return {
                    "md-invalid": field.$invalid && field.$dirty
                };
            }
        },
        validatePayment() {
            this.$v.$touch();

            if (!this.$v.$invalid && this.ccIsValid()) {
                this.finishPay();
            }
        },
        finishPay: function() {
            console.log("payment successful");
            this.loading = true;
            // TODO:  CAll API
        },
        fill: function() {
            if (!this.form.cardNum) {
                this.form.cardNum = "4242424242424242";
                this.form.name = "Mr Smith";
            } else {
                this.form.name = "Mr Smith";
            }
        },
        ccIsValid: function() {
            if (!cardNumber) return false;

            let cardNumber = util.removeSpaces(this.form.cardNum);

            var digits = [];
            var sumaTotal = 0;
            for (var index = cardNumber.length - 1; index >= 0; index--) {
                digits.push(cardNumber[index]);
            }

            for (var index = 1; index < digits.length; index = index + 2) {
                digits[index] = digits[index] * 2;
                if (digits[index] >= 10) digits[index] = digits[index] - 9;
            }

            for (var index = 0; index < digits.length; index++) {
                sumaTotal = sumaTotal + parseInt(digits[index]);
            }

            return sumaTotal % 10 === 0;
        }
    },
    sockets: {
        post: function(data) {
            this.status = data.data.event;
        }
    }
};
</script>

<style scoped>
.md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
}
.text-center {
    text-align: center;
}

.md-card {
    margin: 20px auto;
    overflow: hidden;
}

.register-card {
    width: 100%;
    padding-top: 4em;
}

/*Icons*/
.icon-header {
    height: 80px;
}
</style>
