//重写XMLHttpRequest
(function () {
    var XHR = XMLHttpRequest.prototype;
    var send = XHR.send;
    var open = XHR.open;
    var setRequestHeader = XHR.setRequestHeader;
    var beforeSendCallbacks = [];

    XHR.open = function (method, url, async, user, pass) {
        this._url = url;
        open.call(this, method, url, async, user, pass);
    };

    XHR.setRequestHeader = function (header, value) {
        if (header === 'beforeSend' && typeof value === 'function') {
            beforeSendCallbacks.push(value);
        } else {
            setRequestHeader.call(this, header, value);
        }
    };

    XHR.send = function (postData) {
        var self = this;
        var stateChange = this.onreadystatechange;
        function callback() {
            beforeSendCallbacks.forEach(function (fn) {
                fn.call(self);
            });
            stateChange.apply(self, arguments);
        }
        this.onreadystatechange = callback;
        send.call(this, postData);
    };
})();

//重写fetch
(function () {
    var originalFetch = window.fetch;
    window.fetch = function (url, options) {
        var beforeSendCallbacks = [];
        if (options && options.headers && options.headers.beforeSend && typeof options.headers.beforeSend === 'function') {
            beforeSendCallbacks.push(options.headers.beforeSend);
            delete options.headers.beforeSend;
        }
        var newOptions = Object.assign({}, options);
        newOptions.headers = newOptions.headers || {};
        newOptions.headers['X-Requested-With'] = 'XMLHttpRequest';
        newOptions.headers['Content-Type'] = 'application/json';
        newOptions.headers['Accept'] = 'application/json';
        newOptions.credentials = 'include';
        beforeSendCallbacks.forEach(function (fn) {
            fn.call(this, newOptions);
        });
        return originalFetch.call(this, url, newOptions);
    };
})();


//拦截XMLHttpRequest的请求和响应
(function () {
    var originalXHR = window.XMLHttpRequest;
    function newXHR() {
        var realXHR = new originalXHR();
        realXHR.addEventListener("readystatechange", function () {
            if (realXHR.readyState === 4 && realXHR.status === 200) {
                console.log("请求成功");
                console.log(realXHR.responseText);
            }
        }, false);
        return realXHR;
    }
    window.XMLHttpRequest = newXHR;
})();


//介绍下vite
Vite是一款由尤雨溪开发的前端构建工具，它的特点是快速的冷启动和热更新，支持多种前端框架，如Vue、React等。Vite使用ES modules原生模块化，
    通过浏览器原生支持的ES modules特性，实现了快速的冷启动和热更新。Vite还支持TypeScript、CSS预处理器、自动化测试等功能，是一款非常优秀的前端构建工具。

冷启动指的是在项目启动时，需要加载所有的依赖和资源，这个过程可能会比较耗时，导致用户等待时间过长。
    而热更新则是指在开发过程中，当代码发生变化时，只需要更新变化的部分，而不需要重新加载整个页面或者整个应用，从而提高了开发效率和用户体验。
        Vite通过使用ES modules原生模块化，以及浏览器原生支持的ES modules特性，实现了快速的冷启动和热更新。



1. 通过重写XMLHttpRequest的open、setRequestHeader和send方法，实现对XMLHttpRequest的拦截和重写。
2. 通过重写fetch方法，实现对fetch请求的拦截和重写。
3. 通过拦截XMLHttpRequest的请求和响应，实现对XMLHttpRequest的拦截。

(function () {
    var originalXHR = window.XMLHttpRequest;
    function newXHR() {
        var realXHR = new originalXHR();
        realXHR.addEventListener("readystatechange", function () {
            if (realXHR.readyState === 4 && realXHR.status === 200) {
                console.log("请求成功");
                console.log(realXHR.responseText);
            }
        }, false);
        return realXHR;
    }
    window.XMLHttpRequest = newXHR;
})();

//通过类重写http请求native方法，实现拦截器

