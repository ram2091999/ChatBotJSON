//jshint esversion:6

const messageUL = document.getElementById("message-box");
const activeElement = document.getElementById("active-element");
const sendButton = document.getElementById("send-button");
const main = document.getElementById("main");
const input = document.getElementById('inputText');
let flow = [];
let start = false;

sendButton.addEventListener("click", function () {
	const inputText = document.getElementById('inputText').value;
	if (!start && inputText != "") {
		main.innerHTML += `<div class="m-3 p-1" style="position:absolute; right: 2%;display:inline;border: 1px solid black;border-radius:20px;border-bottom-right-radius:1px;background-color: #3b5998;color:#fff"> 
		<h4> ${inputText} </h4></div><br><br>
		<div class="m-3 p-1" style="position:absolute; left: 2%;display:inline;border: 1px solid black;border-radius:20px;border-bottom-left-radius:1px;background-color: #3b5998;color:#fff">
        <h4>hello ${inputText}</h4>
	    </div><br><br><br><br>`;
		start = true;
		ajax(flow);
	} else if (inputText != "") {
		let regexValue = inputText.replace(/-|\s/g, "");
		console.log(regexValue);
		if (regexValue.toLowerCase() == "servicerequest") {
			flow = [];
			flow.push("Service Request");
			ajax(flow);
		} else if (regexValue.toLowerCase() == "installation") {
			flow = [];
			flow.push("Installation");
			ajax(flow);
		} else if (regexValue.toLowerCase() == "pendingrequeststatus") {
			flow = [];
			flow.push("Pending Request Status");
			ajax(flow);
			renderFormPending();
		} else if (regexValue.toLowerCase() == "contactus" || regexValue.toLowerCase() == "contact") {
			contactus();
		} else if (regexValue.toLowerCase() == "other" || regexValue.toLowerCase() == "others") {
			flow = [];
			flow.push("Other");
			ajax(flow);
		}
		main.innerHTML += `<div class="m-3 p-1" style="position:absolute; right: 2%;display:inline;border: 1px solid black;border-radius:20px;border-bottom-right-radius:1px;background-color: #3b5998;color:#fff"> <h4> ${inputText} </h4></div><br><br>`;
	} else {
		flow = [];
		ajax(flow);
	}
	input.value = "";
});

function myFunction(str, key) {
	if (str.toLowerCase() != "Contact us".toLowerCase()) {
		flow = [...new Set(flow)];
		console.log(key);
		key = Number(key);
		flow[key] = str;
		if (flow.length - 1 > key) {
			for (var i = key + 1; i < flow.length; i++) {
				flow.splice(i, 1);
			}
		}
		if (str.toLowerCase() == "Main menu".toLowerCase())
			flow = [];
		if (str.toLowerCase() == "change product".toLowerCase() || str.toLowerCase() == "change model".toLowerCase()) {
			flow.pop();
			flow.pop();
		}
		console.log(flow);
		ajax(flow);
	} else {
		contactus();
	}
	if (str == "Pending Request Status") {
		renderFormPending();
	} else if (str.toLowerCase() == "other") {
		renderFormOthers();
	}
}

function ajax(flow) {
	$.ajax({
		url: "getElement",
		data: {
			flow: JSON.stringify(flow)
		},
		type: "POST",
		success: function (result) {
			// flow.push(result);
			console.log(result);
			if (result.hasOwnProperty("name")) {
				let current = `<div>
            <h2>${result["name"]}</h2>

            <ul>`;

				if (result["type"] == "list") {
					result["elements"].forEach(ele => current += `<li style="display:inline;margin:1px;" ><button class="btn btn-outline-secondary" onclick="myFunction('${ele}','${result.key}')" >${ele}</button></li>`);
				}

				current += "</ul></div>";
				main.innerHTML += current;
			} else {
				main.innerHTML += renderFormOthers();
			}
		}
	})
}

let renderFormPending = () => {
	main.innerHTML += `<form action="" method="post">
	<div class="form-group">
	<label for="name">Name:</label>
	<input type="text" class="form-control" id="name">
	</div>
	<div class="form-group">
	<label for="phone">Phone Number</label>
	<input type="number" class="form-control" id="phone">
	</div>
	<div class="form-group">
	<label for="complaintNum">Complaint Number</label>
	<input type="number" class="form-control" id="complaintNum">
	</div>
	<div class="form-group">
	<label for="email">Email</label>
	<input type="email" class="form-control" id="email">
	</div>
	</form>`
}

let renderFormOthers = () => {
	return `<form action="" method="post">
	<div class="form-group">
	<label for="name">Name:</label>
	<input type="text" class="form-control" id="name">
	</div>
	<div class="form-group">
	<label for="email">Email</label>
	<input type="email" class="form-control" id="email">
	</div>
	<div class="form-group">
	<label for="description">Describe</label>
	<textarea class="form-control" width="40" id="description"></textarea>
	</div>
	</form>`
}

function contactus() {
	let str = `
  Email:customercare@venushomeappliances.com / enquiry@venushomeappliances.com,
  Address:Hey hi, You can visit us at No. 4/993, Kamaraj St, Rajiv Gandhi Salai(OMR), Kottivakkam, Perungudi Post, Chennai-600096, India…
  Phone: 081 4466 6999, +91-044 - 43401515,
  Website:https://www.venushomeappliances.com.`;
	main.innerHTML += str;
	flow = [];
	ajax(flow);
}