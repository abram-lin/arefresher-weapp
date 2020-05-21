Page({
	data: {
		list: []
	},
	onLoad: function() {
		this.arefresher = this.selectComponent('#arefresherid');
		const list = this.getList(20, []);
		this.setData({
			list
		});
	},
	onRefresh() {
		console.log('on refresh');
		setTimeout(() => {
			const list = this.getList(20, []);
			this.setData({
				list
			});
			this.arefresher.stopRefresh();
		}, 3000);
	},
	onLoadMore() {
		console.log('on load more');
		if (this.data.list.length >= 100) {
			this.arefresher.setNoMore();
			return;
		}
		setTimeout(() => {
			const newList = this.getList(20, this.data.list.slice(0));
			if (newList.length <= 100) {
				this.setData({
					list: newList
				});
			}
			this.arefresher.stopLoadMore();
		}, 2000);
	},
	getList(count, list) {
		const length = list.length;
		const range = length + count;
		const newList = [];
		for (let i = length; i < range; i++) {
			newList.push({
				text: i,
				color: this.randomColor()
			});
		}
		return list.concat(newList);
	},
	randomColor() {
		const colorStr = Math.floor(Math.random() * 0xffffff).toString(16).toUpperCase();
		const length = colorStr.length;
		const prefixStr = '000000'.substring(0, 6 - length);
		return `#${prefixStr}${colorStr}`;
	}
});
