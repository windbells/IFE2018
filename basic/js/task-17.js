window.onload = function() {
    //编码1    	  
    	var firInput = document.getElementById("first-number");
		var secInput = document.getElementById("second-number");
		var result = document.getElementById("result");
		function calResult(type) {
		  	var firNum = firInput.value;
		    var secNum = secInput.value;
		  	var sum = 0;
		  	if (!((Number(firNum)|| firNum === '0') && (Number(secNum)|| secNum === '0'))) {
		  		console.log("请输入正确的数字");
		  	}
		  	switch(type) {
		  		case "+":
		  			sum = Number(firNum) + Number(secNum);
		  			result.innerHTML = "运算结果：" + sum;
		  			break;
		  		case "-":
		  			sum = Number(firNum) - Number(secNum)
		  			result.innerHTML = "运算结果：" + sum;
		  			break;
		  		case "*":
		  			sum = Number(firNum) * Number(secNum);
		  			result.innerHTML = "运算结果：" + sum;
		  			break;
		  		case "/":
			  		if (Number(secNum) == 0) {
			  			console.log("除数不可以为0");
			  			result.innerHTML = "除数不能为0";
			  		}
			  		sum = Number(firNum) / Number(secNum);
		  			result.innerHTML = "运算结果：" + sum;
		  			break;
		  	}
		 }
		  
		document.getElementById("add-btn").addEventListener("click",function() {
		  	calResult("+");
		});
		document.getElementById("minus-btn").addEventListener("click",function() {
		  	calResult("-");
		});
		document.getElementById("times-btn").addEventListener("click",function() {
		  	calResult("*");
		});
	  	document.getElementById("divide-btn").addEventListener("click",function() {
		  	calResult("/");
		 });
  
// 以下为编程3
  var decInput = document.getElementById("dec-number");
  var bitInput = document.getElementById("bin-bit");
  var transBtn = document.getElementById("trans-btn");
  var result2 = document.getElementById("result2");
  function dec2bin(decNumber) {
    // 在这里实现你的转化方法，注意需要判断输入必须为一个非负整数
    if(Number(decNumber)>0 || decNumber === "0") {
      return Number(decNumber).toString(2);
    }
    else {
      return result2.innerHTML = "请输入非负的十进制数字";
    }
  }  
    transBtn.addEventListener("click", function() {
      var sum = dec2bin(decInput.value);
      var binBit = bitInput.value;
      if (Number(sum) || sum === "0") {
        //判断des2bin函数的返回值是否为数字，即是否转换成功
        if (Number(binBit)>0 ) {
          //判断输入转换后的二进制位数是否大于0
          var diff = Number(binBit) - sum.length;//相差位数
          if (diff > 0) {
           // 如果bin-bit小于转化后的二进制本身位数，则使用原本的位数，如dec-number为5，bin-bit为2，依然输出101，但同时在console中报个错
            sum = new Array(diff+1).join(0)+ sum;
          }
          else if (diff <0 ) {
            console.log("输入的转换位数过短");        
          }
          result2.innerHTML = "运算结果为：" + sum;
        }
        
      }
    });

  
  //编程4
  var numArr = [];
  for (var i=1;i<=100;i++) {
    if (i.toString().indexOf("3") != -1 || i%3 ===0)
      numArr.push("PA");
    else
      numArr.push(i);      
  }
  console.log(numArr.join(","));
  
//编程4
  var tableInner = document.getElementById("result4");
  var html = "";
  for (var i=1;i<10;i++) {
    html += "<tr>"
    for (var j=1;j<=i;j++) {
      html += "<td>" + j + "*" + i + "=" + i*j + "</td>";
    }
    html += "</tr>";
  }
  tableInner.innerHTML = html;
  
}