var id = 0;
function Staff(name, salary) {
    id += 1;
    this.id = id;
    this.name = name || "";
    this.salary = salary || 0;
}

Staff.prototype.doWork = function () {
    console.log("工作啦");
};

//使用单例模式创建服务员
var Waiter = (function(){
    var instance = null;
    function createWaiter(name, salary) {
        Staff.call(this, name, salary);
        console.log("服务员 " + this.name + " is created");
    }
    createWaiter.prototype = {
        constructor: createWaiter,
        doWork: function (dishes) {
            if (dishes instanceof Array) {
                console.log("服务员记录客人点菜");
                Customer.getInstance().order(dishes); //调用顾客的点菜方法得到顾客点的菜
                Waiter.getInstance().callCook(dishes); //服务员去告诉厨师需要做什么菜
            }
            else
                console.log("服务员上菜" + dishes + "啦");
        },
        callCook: function (dishes) {
            console.log("服务员告诉厨师要做的菜");
            Cook.getInstance().doWork(dishes);
        }
    };
    return {
        getInstance:function (name, salary) {
            if (instance == null) {
                instance = new createWaiter(name, salary);
            }
            return instance;
        }
    };
})();

//使用单例模式创建厨师
var Cook = (function(){
    var instance = null;
    function createCook(name, salary) {
        Staff.call(this, name, salary);
        console.log("厨师" + this.name + " is created");
    }
    createCook.prototype = {
        constructor: createCook,
        doWork: function (dishes) {
            if (dishes instanceof Array) {
                for (let i=0;i<dishes.length;i++) {
                    console.log("厨师做了" + dishes[i]);
                    Waiter.getInstance().doWork(dishes[i]); // 厨师开始做菜，做完菜以后告诉服务员去上菜
                }
            }
            else {
                console.log("厨师做了" + dishes);
                Waiter.getInstance().doWork(dishes);
            }

        }
    };
    return {
        getInstance:function (name, salary) {
            if (instance == null) {
                instance = new createCook(name, salary);
            }
            return instance;
        }
    };
})();