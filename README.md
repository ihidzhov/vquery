# vquery

Vanilla Query

Vanilla Query is like jQuery library with basic methods.


### Documentation

```js
vQuery("span").first().css("background", "yellow");
```

```js
vQuery("div").append("<span>Hello</span>");
```

```js
vQuery("div").hasClass("className");
```

```js
vQuery.ajax({
  url: "https://api.example.com/data",
  method: "GET",
  success: function (data) {
    console.log(data);
  },
  error: function () {
    console.error("An error occurred.");
  },
});
```
