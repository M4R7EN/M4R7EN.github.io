var firebaseConfig = {
  apiKey: "AIzaSyBQ-x7GvwHOSWm6bXzsh0ecsA7Pxlg1urA",
  authDomain: "rentlyservice.firebaseapp.com",
  projectId: "rentlyservice",
  storageBucket: "rentlyservice.appspot.com",
  messagingSenderId: "1013949566881",
  appId: "1:1013949566881:web:0d8b05c12f5a7ef4fe85e0",
  measurementId: "G-XRE2P82EPP"
};


firebase.initializeApp(firebaseConfig);
firebase.analytics();

var database = firebase.firestore();

var mainscreenHTML = document.getElementById("main-screen");
var bodyHTML = document.getElementById("body");
var listingsHTML = document.getElementById("squareGrid")
var itemHTML = document.getElementById("item")
var dropDown = document.getElementById("dropdown-content")


var feedbackHTML = document.getElementById("feedback");
var authenticationHTML = document.getElementById("screen-authentication");
var chatScreenHTML = document.getElementById("screen-chat");
var messagesHTML = document.getElementById("messages");
var rentlyMainScreen = document.getElementById("rently-main-screen");
var rentlyLogin = document.getElementById("rently-login-screen");

var grid = document.getElementById("squareGrid");
var messagerent = document.getElementById("rentmessag");

var isUserLoggedin = "no";



/*loadDefaultValues();

function loadDefaultValues() {
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
}

*/

function signup() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  console.log("Create account with " + email + " " + password);

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log("Account created!");
      backHome();
    })
    .catch((error) => {
      console.log(error.message);
      feedbackHTML.innerHTML = error.message;
    });
}

function login() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log("User logged!");
      backHome();
    })
    .catch((error) => {
      console.log(error.message);
      feedbackHTML.innerHTML = error.message;
    });
}

function backHome() {
  rentlyMainScreen.style.display = "block";
  rentlyLogin.style.display = "none";
  isuserlogged();
}

function rentlySignin() {
  rentlyMainScreen.style.display = "none";
  rentlyLogin.style.display = "block";
}


function returnMain() {
  grid.style.display = "grid";
  messagerent.style.display = "none";
}



function TokenSigning() { 
		function nonce() { 
			var val = ""; 
			var hex = "abcdefghijklmnopqrstuvwxyz0123456789"; 
			for(var i = 0; i < 16; i++) val += hex.charAt(Math.floor(Math.random() * hex.length)); 
			return val; 
		} 
	 
		function messagePromise(msg) { 
			return new Promise(function(resolve, reject) { 
				// amend with necessary metadata 
				msg["nonce"] = nonce(); 
				msg["src"] = "page.js"; 
				// send message 
				window.postMessage(msg, "*"); 
				// and store promise callbacks 
				_eid_promises[msg.nonce] = { 
					resolve: resolve, 
					reject: reject 
				}; 
			}); 
		} 
		this.getCertificate = function(options) { 
			var msg = {type: "CERT", lang: options.lang, filter: options.filter}; 
			console.log("getCertificate()"); 
			return messagePromise(msg); 
		}; 
		this.sign = function(cert, hash, options) { 
			var msg = {type: "SIGN", cert: cert.hex, hash: hash.hex, hashtype: hash.type, lang: options.lang, info: options.info}; 
			console.log("sign()"); 
			return messagePromise(msg); 
		}; 
		this.getVersion = function() { 
			console.log("getVersion()"); 
			return messagePromise({ 
				type: "VERSION" 
			}); 
		}; 
}

/* loadDefaultValues();

function loadDefaultValues() {
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
}

function signup() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  console.log("Create account with " + email + " " + password);

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log("Account created!");
      showChatScreen();
    })
    .catch((error) => {
      console.log(error.message);
      feedbackHTML.innerHTML = error.message;
    });
}

function login() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log("User logged!");
      showChatScreen();
    })
    .catch((error) => {
      console.log(error.message);
      feedbackHTML.innerHTML = error.message;
    });
}


*/

function isuserlogged() {
var user = firebase.auth().currentUser;
var name, email;

if (user) {
  console.log("signed in")
  email = user.email;
  document.getElementById('logged-in-as').innerHTML = "Signed in as " + email;
  isUserLoggedin = "yes";
} else {
  console.log("not signed in")
  document.getElementById('logged-in-as').innerHTML = "Not logged in";
}


}
function rent() {

  if (isUserLoggedin == "yes") {
    grid.style.display = "none";
    messagerent.style.display = "block";
  }

  else {
    console.log("not signed")
    rentlySignin();
  }
}


function dropDownApply() {
  dropDown.style.display = "flex";
}

function dropDownClose() {
  dropDown.style.display = "none";
}

function loadMessages() {
  database.collection("listings").doc("mainScreenListing").collection("itemList").orderBy("name").onSnapshot((querySnapshot) => {
    listingsHTML.innerHTML = "";
    querySnapshot.forEach((doc) => {
      console.log("hello");
      var itemContainer = document.createElement("div");
      itemContainer.classList.add("item");

      if (doc.data().message) {
        var nameHTML = document.createElement("p");
        itemContainer.classList.add("item-text");
        nameHTML.setAttribute("id", "name");
        nameHTML.innerHTML = doc.data().message;
        itemHTML.appendChild(nameHTML);
      }

      if (doc.data().user) {
        var priceHTML = document.createElement("p");
        itemContainer.classList.add("item-text");
        priceHTML.setAttribute("id", "price");
        priceHTML.innerHTML = doc.data().user;
        itemHTML.appendChild(priceHTML);
      }

      listingsHTML.appendChild(itemContainer);
    });
  });
}

document.addEventListener("keypress", function (event) {
  var key = event.keyCode || event.which;
  if (event.keyCode == 13) {
    sendMessage();
  }
});
