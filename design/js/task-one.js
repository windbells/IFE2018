window.onload = function() {
	var buttonClick = document.querySelector(".change-style");
	var h1 = document.querySelector("h1");
	var underline = document.querySelector(".underline");
	buttonClick.addEventListener('click',function(){
		h1.style.color ="#406DEC"; 
		//设置标题“前端学院的颜色”
		
		underline.style.left = "0%";
		underline.style.width = "100%";
		//设置下划线的位置和宽度
	})
	
	buttonClick.addEventListener('mouseout',function(){
		//鼠标移除后样式恢复
		h1.style.color ="#000"; 	
		underline.style.left = "50%";
		underline.style.width = "0";
	})
}
