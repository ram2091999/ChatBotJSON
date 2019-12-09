//jshint esversion:6

const messageUL = document.getElementById("message-box");
const activeElement = document.getElementById("active-element");
const input = document.getElementById("input-box");
const sendButton = document.getElementById("send-button");
const main = document.getElementById("main");
let flow = [];

sendButton.addEventListener("click", function() {
  $.ajax({
    url: "getElement",
    data: { flow: JSON.stringify(flow) },

    type:"POST",

    success: function(result) {
      // flow.push(result);
      let current = `<div>
            <h2>${result["name"]}</h2>
            <p>${result["description"]}</p>
            <ul>`;


        if (result["type"] == "list") {
          result["elements"].forEach(ele => current += `<li><button class="btn btn-outline-secondary" onclick="myFunction('${ele}')" >${ele}</button></li>`);
        }

      current += "</ul></div>";

      main.innerHTML+=current;

    }
  });
});


function myFunction(str){
  flow = [...new Set(flow)];

  flow.push(str);
  console.log(flow);
  ajax(flow);

}

function ajax(flow){
  $.ajax({
    url: "getElement",
    data: { flow: JSON.stringify(flow) },
    type:"POST",
    success: function(result) {
      // flow.push(result);
      let current = `<div>
            <h2>${result["name"]}</h2>

            <ul>`;

        if (result["type"] == "list") {
          result["elements"].forEach(ele => current += `<li><button class="btn btn-outline-secondary" onclick="myFunction('${ele}')" >${ele}</button></li>`);
        }

      current += "</ul></div>";

      main.innerHTML+=current;
    }
  });

}
