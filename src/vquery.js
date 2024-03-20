(function (window) {
  function vQuery(selector) {
    return new vQuery.prototype.init(selector);
  }

  vQuery.prototype = {
    init: function (selector) {
      if (typeof selector === "string") {
        var elements = document.querySelectorAll(selector);
        for (var i = 0; i < elements.length; i++) {
          this[i] = elements[i];
        }
        this.length = elements.length;
      } else if (selector.nodeType) {
        // if it's an HTML element
        this[0] = selector;
        this.length = 1;
      }
      return this;
    },

    ready: function (callback) {
      document.addEventListener("DOMContentLoaded", callback);
      return this;
    },

    // Selection methods
    first: function () {
      return vQuery(this[0]);
    },

    last: function () {
      return vQuery(this[this.length - 1]);
    },

    n: function (key) {
      return vQuery(this[key]);
    },

    // Event handling methods
    on: function (event, callback) {
      for (var i = 0; i < this.length; i++) {
        this[i].addEventListener(event, callback);
      }
      return this;
    },

    off: function (event, callback) {
      for (var i = 0; i < this.length; i++) {
        this[i].removeEventListener(event, callback);
      }
      return this;
    },

    trigger: function (event) {
      var evt = new Event(event, { bubbles: true });
      for (var i = 0; i < this.length; i++) {
        this[i].dispatchEvent(evt);
      }
      return this;
    },

    trim: function (str) {
      return str.trim();
    },

    // CSS methods
    css: function (prop, value) {
      if (typeof prop === "string") {
        for (var i = 0; i < this.length; i++) {
          this[i].style[prop] = value;
        }
      } else if (typeof prop === "object") {
        for (var i = 0; i < this.length; i++) {
          for (var key in prop) {
            this[i].style[key] = prop[key];
          }
        }
      }
      return this;
    },

    each: function (callback) {
      for (var i = 0; i < this.length; i++) {
        callback.call(this[i], i, this[i]);
      }
      return this;
    },

    // DOM manipulation methods
    children: function () {
      var children = [];
      for (var i = 0; i < this.length; i++) {
        for (var j = 0; j < this[i].children.length; j++) {
          children.push(this[i].children[j]);
        }
      }
      return vQuery(children);
    },

    parent: function () {
      var parents = [];
      for (var i = 0; i < this.length; i++) {
        parents.push(this[i].parentNode);
      }
      return vQuery(parents);
    },

    parents: function (selector) {
      var parents = [];
      for (var i = 0; i < this.length; i++) {
        var parent = this[i].parentNode;
        if (selector) {
          while (parent) {
            if (vQuery(parent).is(selector)) {
              parents.push(parent);
            }
            parent = parent.parentNode;
          }
        } else {
          parents.push(parent);
        }
      }
      return vQuery(parents);
    },

    siblings: function () {
      var siblings = [];
      for (var i = 0; i < this.length; i++) {
        var children = Array.prototype.slice.call(this[i].parentNode.children);
        children.splice(children.indexOf(this[i]), 1);
        siblings = siblings.concat(children);
      }
      return vQuery(siblings);
    },

    is: function (selector) {
      var elements = vQuery(selector);
      for (var i = 0; i < this.length; i++) {
        for (var j = 0; j < elements.length; j++) {
          if (this[i] === elements[j]) {
            return true;
          }
        }
      }
      return false;
    },

    append: function (content) {
      for (var i = 0; i < this.length; i++) {
        this[i].innerHTML += content;
      }
      return this;
    },

    appendTo: function (parent) {
      for (var i = 0; i < this.length; i++) {
        parent[0].appendChild(this[i]);
      }
      return this;
    },

    prepend: function (content) {
      for (var i = 0; i < this.length; i++) {
        this[i].innerHTML = content + this[i].innerHTML;
      }
      return this;
    },

    prependTo: function (parent) {
      for (var i = 0; i < this.length; i++) {
        parent[0].insertBefore(this[i], parent[0].firstChild);
      }
      return this;
    },

    after: function (content) {
      for (var i = 0; i < this.length; i++) {
        this[i].insertAdjacentHTML("afterend", content);
      }
      return this;
    },

    before: function (content) {
      for (var i = 0; i < this.length; i++) {
        this[i].insertAdjacentHTML("beforebegin", content);
      }
      return this;
    },

    insertBefore: function (selector) {
      var elements = vQuery(selector);
      for (var i = 0; i < this.length; i++) {
        for (var j = 0; j < elements.length; j++) {
          elements[j].insertAdjacentElement("beforebegin", this[i]);
        }
      }
      return this;
    },

    insertAfter: function (selector) {
      var elements = vQuery(selector);
      for (var i = 0; i < this.length; i++) {
        for (var j = 0; j < elements.length; j++) {
          elements[j].insertAdjacentElement("afterend", this[i]);
        }
      }
      return this;
    },

    attr: function (name, value) {
      if (value === undefined) {
        return this[0] && this[0].getAttribute(name);
      } else {
        for (var i = 0; i < this.length; i++) {
          this[i].setAttribute(name, value);
        }
        return this;
      }
    },

    removeAttr: function (name) {
      for (var i = 0; i < this.length; i++) {
        this[i].removeAttribute(name);
      }
      return this;
    },

    empty: function () {
      for (var i = 0; i < this.length; i++) {
        this[i].innerHTML = "";
      }
      return this;
    },

    remove: function () {
      for (var i = 0; i < this.length; i++) {
        this[i].parentNode.removeChild(this[i]);
      }
      return this;
    },

    text: function (text) {
      if (text === undefined) {
        return this[0] && this[0].textContent;
      } else {
        for (var i = 0; i < this.length; i++) {
          this[i].textContent = text;
        }
        return this;
      }
    },

    html: function (html) {
      if (html === undefined) {
        return this[0] && this[0].innerHTML;
      } else {
        for (var i = 0; i < this.length; i++) {
          this[i].innerHTML = html;
        }
        return this;
      }
    },

    val: function (value) {
      if (value === undefined) {
        return this[0] && this[0].value;
      } else {
        for (var i = 0; i < this.length; i++) {
          this[i].value = value;
        }
        return this;
      }
    },

    // Class manipulation methods
    hasClass: function (className) {
      return this[0] && this[0].classList.contains(className);
    },

    addClass: function (className) {
      for (var i = 0; i < this.length; i++) {
        this[i].classList.add(className);
      }
      return this;
    },

    removeClass: function (className) {
      for (var i = 0; i < this.length; i++) {
        this[i].classList.remove(className);
      }
      return this;
    },

    toggleClass: function (className) {
      for (var i = 0; i < this.length; i++) {
        this[i].classList.toggle(className);
      }
      return this;
    },

    show: function () {
      for (var i = 0; i < this.length; i++) {
        this[i].style.display = "block";
      }
      return this;
    },

    hide: function () {
      for (var i = 0; i < this.length; i++) {
        this[i].style.display = "none";
      }
      return this;
    },

    toggle: function () {
      for (var i = 0; i < this.length; i++) {
        if (this[i].style.display === "none") {
          this[i].style.display = "block";
        } else {
          this[i].style.display = "none";
        }
      }
      return this;
    },

    //
    width: function (value) {
      if (value === undefined) {
        return this[0] && this[0].clientWidth;
      } else {
        for (var i = 0; i < this.length; i++) {
          this[i].style.width = value + "px";
        }
        return this;
      }
    },

    height: function (value) {
      if (value === undefined) {
        return this[0] && this[0].clientHeight;
      } else {
        for (var i = 0; i < this.length; i++) {
          this[i].style.height = value + "px";
        }
        return this;
      }
    },

    innerWidth: function () {
      return this[0] && this[0].clientWidth;
    },

    innerHeight: function () {
      return this[0] && this[0].clientHeight;
    },

    outerWidth: function () {
      return this[0] && this[0].offsetWidth;
    },

    outerHeight: function () {
      return this[0] && this[0].offsetHeight;
    },

    visible: function () {
      return this[0] && this[0].offsetParent !== null;
    },

    offset: function () {
      return this[0] && { top: this[0].offsetTop, left: this[0].offsetLeft };
    },

    position: function () {
      return this[0] && { top: this[0].offsetTop, left: this[0].offsetLeft };
    },

    scrollTop: function (value) {
      if (value === undefined) {
        return this[0] && this[0].scrollTop;
      } else {
        for (var i = 0; i < this.length; i++) {
          this[i].scrollTop = value;
        }
        return this;
      }
    },

    scrollLeft: function (value) {
      if (value === undefined) {
        return this[0] && this[0].scrollLeft;
      } else {
        for (var i = 0; i < this.length; i++) {
          this[i].scrollLeft = value;
        }
        return this;
      }
    },

    serialize: function () {
      var form = this[0];
      var data = "";
      for (var i = 0; i < form.elements.length; i++) {
        var e = form.elements[i];
        if (e.name) {
          data +=
            encodeURIComponent(e.name) +
            "=" +
            encodeURIComponent(e.value) +
            "&";
        }
      }
      return data.substr(0, data.length - 1);
    },
  };

  vQuery.ajax = function (options) {
    var xhr = new XMLHttpRequest();
    xhr.open(options.method || "GET", options.url);
    xhr.onload = options.success;
    xhr.onerror = options.error;
    xhr.send(options.data || null);
    return this;
  };

  vQuery.getJSON = function (url, success, error) {
    vQuery.ajax({
      url: url,
      success: success,
      error: error,
    });
    return this;
  };

  vQuery.prototype.init.prototype = vQuery.prototype;

  window.vQuery = vQuery;
})(window);
