vQuery("div").on("click", function () {
  console.log("Clicked!");
});

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

vQuery("div").each(function (i, el) {
  console.log("Element " + i + " is " + el.outerHTML);
});

// vQuery("div").css("color", "red"); // sets the color of all divs to red

vQuery("div").css({
  // sets multiple CSS properties for all divs
  color: "red",
  backgroundColor: "blue",
});
vQuery(document).ready(function () {
  // Your code here.
  console.log("DOM is ready!");
});

vQuery("div").append("<span>Hello</span>"); // appends a span to all divs
var children = vQuery("div").children(); // gets the children of all divs
var parent = vQuery("div").parent(); // gets the parent of all divs
console.log(children, parent);
vQuery("div").attr("data-test", "test"); // sets a data attribute on all divs
vQuery("div").addClass("test"); // adds a class to all divs
vQuery("div").addClass("test2"); // adds a class to all divs
vQuery("div").removeClass("test2"); //
vQuery("div").hasClass("test"); // checks if all divs have a class

// sets the background of the first span to yellow
vQuery("span.a").first().css("color", "green"); // sets the color of the first span to red
vQuery("span").first().css("background", "yellow");
