axios.get('./resource/song300-simplified.json')
	.then(function(data) {
		let arr = data.data;
		let temp = {};
		let end = [];
		for(let i = 0; i < arr.length; i++) {

			let a = arr[i];

			if(!temp[a.title]) {

				end.push({
					title: a.title,
					content: a.content,
					data: [a]
				});
				temp[a.title] = a;

			} else {

				for(let j = 0; j < end.length; j++) {

					let b = end[j];

					if(b.title == a.title) {
						b.data.push(a);
						break;
					}
				}

			}
		};
//		console.log(end);

		var v = new Vue({
			el: '#main',
			data: {
				rows: end,
				mystr: "",
				title: "",
				
			},
			methods: {
				esc(){
					var mask = document.getElementById('mask').style.display = 'none';
document.body.style.overflow = 'auto';

				},
				clickfun(e) {
					var con = e.target.innerText;

					if(con == "") return;

					var arr = [];
					var patt = new RegExp(con);
					for(var i = 0; i < end.length; i++) {
						if(patt.test(end[i].title)) {
							arr.push(i);
						}
					}

					if(arr.length) {
						var str = "";
						for(var i = 0; i < arr.length; i++) {
							str += "content: " + end[arr[i]].content;
						}

//						console.log(str);
						str = str.replace("content: ", "");
						
						this.mystr = str;
						var mask = document.getElementById('mask');
						var flag = true;

						if(flag) {
							mask.style.display = "block";
							flag = false;
							
						} else {
							mask.style.display = "none";
							flag = true;
						}
							document.body.style.overflow = 'hidden';
					}
				}
			}

		})

	})
	.catch(function(error) {
		console.log(error);
	});