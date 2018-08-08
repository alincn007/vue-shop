"use strict";

export default {
	pay: {
		installmentCount: 1,
		statementDescriptor: "gigi.com",
		fundingInstrument: {
			method: "CREDIT_CARD",
			creditCard: {
				hash: "",
				store: true,
				holder: {
					fullname: "Jiji the great",
					birthdate: "1988-12-30",
					taxDocument: {
						type: "CPF",
						number: "33333333333"
					},
					phone: {
						countryCode: "55",
						areaCode: "11",
						number: "66778899"
					}
				}
			}
		}
	}
};
