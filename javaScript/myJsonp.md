```js
/**
 * jsonp请求
 * @param {String} url
 * @param {Object} opts
 */
function myJsonp(url, opts = {}) {
    return new Promise((resolve, reject) => {
      "use strict";
      let cbname = "_jsonp" + Math.random().toString(32).substr(2);
      let params = "";
      let data = null;
      let hander;
      let script;
      for (let prop in opts) {
        params += `${prop}=${opts[prop]}&`
      }
      if (url.includes("?")) {
        if (params === "") {
          url += "&callback=" + cbname;
        } else {
          url += "&" + params + "callback=" + cbname;
        }
      } else {  // no ?
        if (params === "") {
          url += "?callback=" + cbname;
        } else {
          url += "?" + params + "callback=" + cbname;
        }
      }
      hander = function (ref) {
        let type = ref.type;
        let response = {
          url: script.src,
          status: 0,
          data,
          ok: false,
          statusText: 'error'
        }
        delete window[cbname];
        document.body.removeChild(script);
  
        if (type = "load" && data !== null) {
          response.status = 200;
          response.ok = true;
          response.statusText = "success";
          resolve(response)
        } else if (type === "error") {
          response.status = 500;
          reject(response);
        }
        reject(response);
      }
      script = document.createElement("script");
      window[cbname] = function (result) {
        data = result;
      }
  
      script.src = url;
      script.async = true;
      script.onload = hander;
      script.onerror = hander;
      document.body.appendChild(script);
    });
  }
  
```

