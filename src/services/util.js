"use strict";

const b64DecodeUnicode = str => {
	return decodeURIComponent(
		atob(str)
			.split("")
			.map(c => {
				return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
			})
			.join("")
	);
};

const b64EncodeUnicode = str => {
	return btoa(
		encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
			return String.fromCharCode("0x" + p1);
		})
	);
};

const discount = (list, value, field) =>
	list.map(e => {
		e[field] = e[field] * value;
		return e;
	});

const creditCard = () => {
	return {};
};

const cloneObject = obj => JSON.parse(JSON.stringify(obj));

const removeSpaces = value => value.replace(/\s/g, "");

const formatPricePoint = price =>
	parseInt(
		price
			.toFixed(2)
			.toString()
			.replace(".", "")
	);

const formatPriceSend = (list, field) =>
	list.map(e => {
		e[field] = formatPricePoint(e[field]);
		return e;
	});

const formatPrice = price =>
	price
		.toFixed(2)
		.toString()
		.replace(".", ",");

const formatPriceToFixed = price => price.toFixed(2);

export default {
	b64DecodeUnicode,
	b64EncodeUnicode,
	discount,
	cloneObject,
	creditCard,
	removeSpaces,
	formatPriceSend,
	formatPrice,
	formatPriceToFixed
};
