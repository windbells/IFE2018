var Interface = function (name, methods) {
    if (arguments.length < 2) {
        alert("必须是两个参数");
    }
    this.name = name;
    this.methods = []; //定义一个空数组装载函数名
    for (let i = 0; i < methods.length; i++) {
        if (typeof methods[i] != "string") {
            alert("函数名必须是字符串类型");
        }  else {
            this.methods.push(methods[i]);
        }
    }
};

Interface.ensureImplement = function (object) {
    if (arguments.length < 2) {
        throw new Error("参数必须不少于2个");
        return false;
    }
    for (let i = 1; i < arguments.length; i++) {
        let inter = arguments[i];
        if (inter.constructor != Interface) {
            
        }
    }
}