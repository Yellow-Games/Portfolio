class project {

	constructor (name, desc, imgPth) {
		this.name = name;
		this.desc = desc;
		this.imgPth = imgPth;
	}
}

let projects = [project("Park Pin","Pin where you park", "supercell.png")];
let main = document.getElementById("project-wrapper");

function b () {
	alert(projects);
	projects.forEach(a);
}

function a (item, index) {

	alert("Name: ");
	alert(index);
	
	// <div class="pod">
	// 	<span class="title">Name</span>
	// 	<img src="supercell.png" alt="Game Image">
	// 	<span>Lorem Ipsum</span>
	// 	<div class="button-options">
	// 		<a href="#">Steam</a>
	// 		<a href="#">Download</a>
	// 		<a href="#">Web</a>
	// 		<a href="#">Other</a>
	// 	</div>
	// </div>
	
	const pod = document.createElement("div");
	
	const title = document.createElement("span");
	const titleTxt = document.createTextNode(proj.title);
	title.appendChild(titleTxt)

	const pic = document.createElement("img");
	const picUrl = document.createTextNode(proj.imgPth);
	pic.appendChild(picUrl)

	const body = document.createElement("span");
	const bodyTxt = document.createTextNode(proj.desc);
	body.appendChild(bodyTxt);

	const buttons = document.createElement("div");

	const button1 = document.createElement("a");
	const bText1 = document.createTextNode("Button 1");
	button1.appendChild(bText1);

	const button2 = document.createElement("a");
	const bText2 = document.createTextNode("Button 2");
	button2.appendChild(bText2);

	buttons.appendChild(button1);
	buttons.appendChild(button2);

	pod.appendChild(title);
	pod.appendChild(pic);
	pod.appendChild(body);
	pod.appendChild(buttons);

	main.appendChild(pod);
}