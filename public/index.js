//jshint esversion:6

const messageUL = document.getElementById("message-box");
const activeElement = document.getElementById("active-element");
const input = document.getElementById("input-box");
const sendButton = document.getElementById("send-button");
const main = document.getElementById("main");
let flow = [];

sendButton.addEventListener("click", function () {
	$.ajax({
		url: "getElement",
		data: {
			flow: JSON.stringify(flow)
		},

		type: "POST",

		success: function (result) {
			// flow.push(result);
			let current = `<div>
			<h2>${result["name"]}</h2>
			<p>${result["description"]}</p>
			<ul>`;


			if (result["type"] == "list") {
				result["elements"].forEach(ele => current += `<li><button class="btn btn-outline-secondary" onclick="myFunction('${ele}','0')" >${ele}</button></li>`);
			}

			current += "</ul></div>";

			main.innerHTML += current;

		}
	});
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
					result["elements"].forEach(ele => current += `<li><button class="btn btn-outline-secondary" onclick="myFunction('${ele}','${result.key}')" >${ele}</button></li>`);
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