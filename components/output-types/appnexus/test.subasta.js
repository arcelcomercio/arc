const auction = require("./subasta");

const PORT = "port1";

const data = auction.map(el => {
	return el.values
		.filter(item => item.ports.find(val => val === PORT))
		.map(obj => {
			const itemObj = {
				code: obj.div_id,
				mediaTypes: {
					banner: {
						sizes: obj.size
					}
				},
				bids: [
					{
						bidder: el.name,
						params: obj.params
					}
				]
			};
			return itemObj;
		});
});

console.log(data);
