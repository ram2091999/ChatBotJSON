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
          result["elements"].forEach(ele => current += `<li><button class="btn btn-outline-secondary" onclick="myFunction('${ele}','0')" >${ele}</button></li>`);
        }

      current += "</ul></div>";

      main.innerHTML+=current;

    }
  });
});


function myFunction(str,key){
  flow = [...new Set(flow)];
  console.log(key);
  key=Number(key);
  // console.log(key);
  // for(var i=0;i<flow.length;i++){
  //   flow[key]=str;
  //   if(i>key){
  //     flow.splice(i,1);
  //   }
  // }
  flow[key]=str;
  if(flow.length-1>key){
    for(var i=key+1;i<flow.length;i++){
      flow.splice(i,1);
    }

  }
  //flow.push(str);
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
      console.log(result);
      let current = `<div>
            <h2>${result["name"]}</h2>

            <ul>`;

        if (result["type"] == "list") {
          result["elements"].forEach(ele => current += `<li><button class="btn btn-outline-secondary" onclick="myFunction('${ele}','${result.key}')" >${ele}</button></li>`);
        }

      current += "</ul></div>";

      main.innerHTML+=current;
    }
  });

}
