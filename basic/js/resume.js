window.onload = function() {
//点击按钮实现样式切换
			var style1 = document.getElementById("sheet-1");
			var style2 = document.getElementById("sheet-2");
			var style3 = document.getElementById("sheet-3");
			var link = document.getElementsByTagName("link")[0];
			style1.addEventListener('click',function() {
				link.href = "css/style_1.css";
			})
			style2.addEventListener('click',function() {
				link.href = "css/style_2.css";
			})
			style3.addEventListener('click',function() {
				link.href = "css/style_3.css";
			})
			
}