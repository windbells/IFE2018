window.onload = function() {
	var clickBtn = document.getElementById("click");
	var hobby = document.getElementsByClassName("hobby")[0];
	clickBtn.onclick = function() {
		clickBtn.style.display = "none";
		hobby.style.display = "block";
	}
}
