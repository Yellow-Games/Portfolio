class project {

	constructor (name, desc, imgPth) {
		this.name = name;
		this.desc = desc;
		this.imgPth = imgPth;
	}

	getTitle() {
		return this.name;
	}

	getDesc() {
		return this.desc;
	}

	getImgPth() {
		return this.imgPth;
	}
}


let projects = [
				new project("Park Pin","Pin where you park", "supercell.png"), 
				new project("Other Project","Some Description", "supercell.png")
			];

projects.forEach(createPod);

function createPod (item, index) {

	let main = document.getElementById("project-wrapper");

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
	const titleTxt = document.createTextNode(item.getTitle());
	title.appendChild(titleTxt);
	title.classList.add("title");

	const pic = document.createElement("img");
	pic.setAttribute("src", item.getImgPth());

	const body = document.createElement("span");
	const bodyTxt = document.createTextNode(item.getDesc());
	body.appendChild(bodyTxt);

	const buttons = document.createElement("div");
	buttons.classList.add("button-options");

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
	// main.appendChild(title);
}