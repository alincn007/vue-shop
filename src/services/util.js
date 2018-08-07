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

const creditCard = objCard => {
	return new Moip.CreditCard({
		pubKey:
			"-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAu0Ch0QUWeFBWUyV0aCrTYpHKDw0ctYQC07G12RrMOGNGn2G+DYAfV2U+1yXor3PiwidgdGkkgyrNzvgDiJZDSf4rX987SyGAxv3GkEzCbW774wBJ5mB3VR5cbgocDrhSm7WmDLsdKV8pkXnym7bBmeZ+zu8pL1b6Vuz8yJLWlycEYRnIf1MtuaMaujMj1IqH5D8myqZFp2SnU9jlA3EIFZ5OZCMMEDvf4UlK95+ztd1Nlx8BneoNd2vIEhktUaslG/VHPJQphh4SrHFX0BSIDWMgX2JtezEXp+E0r6gCa9R8Mxg69rEjoC9TFUvatjCy9Nk9md4TcqwhDzpwsKhy8wIDAQAB-----END PUBLIC KEY-----"
	});
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
