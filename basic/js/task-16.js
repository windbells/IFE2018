window.onload = function() {
	//点击查看我的爱好按钮，展示爱好
	var clickBtn = document.getElementById("click");
	var hobby = document.getElementsByClassName("hobby")[0];
	var now = new Date(),hour = now.getHours(); 
	var time = document.getElementById("time");
	clickBtn.onclick = function() {
		clickBtn.style.display = "none";
		hobby.style.display = "block";
		
		//判断时间
		if(hour < 6) {
			time.innerHTML = "凌晨好！";
			}
		else if (hour < 9) {
			time.innerHTML = "早上好！";
			}
		else if (hour < 12) {
			time.innerHTML = "上午好！";
			}
		else if (hour < 14) {
			time.innerHTML = "中午好！";
			}
		else if (hour < 17) {
			time.innerHTML = "下午好！";
			}
		else if (hour < 19) {
			time.innerHTML = "傍晚好！";
			}
		else if (hour < 22) {
			time.innerHTML = "晚上好！";
			}
		else {
			time.innerHTML = "夜里好！";
		}
	}
	
}
