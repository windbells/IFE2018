window.onload = function() {
	//点击查看我的爱好按钮，展示爱好
	var clickBtn = document.getElementById("click");
	var hobby = document.getElementsByClassName("hobby")[0];
	clickBtn.onclick = function() {
		clickBtn.style.display = "none";
		hobby.style.display = "block";
	}
	
	//判断时间
		now = new Date(),hour = now.getHours(); 
		if(hour < 6) {
			alert("凌晨好！");
			}
		else if (hour < 9) {
			alert("早上好！");
			}
		else if (hour < 12) {
			alert("上午好！");
			}
		else if (hour < 14) {
			alert("中午好！");
			}
		else if (hour < 17) {
			alert("下午好！");
			}
		else if (hour < 19) {
			alert("傍晚好！");
			}
		else if (hour < 22) {
			alert("晚上好！");
			}
		else {
			alert("夜里好！");
		}
}
