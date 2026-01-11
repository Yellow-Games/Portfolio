class Project {

    constructor(name, desc, imgPth, buttons, links) {
        this.name = name;
        this.desc = desc;
        this.imgPth = imgPth;
        this.buttons = buttons;
        this.links = links;
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

    getButtons() {
        return this.buttons;
    }

    getLinks() {
        return this.links;
    }
}

let projects = [
    new Project("Park Pin", "Pin where you park", "supercell.png", ["download"], ["#"]),
    new Project("Survival IO Clone", "A team game project using Spritekit to recreate the mobile game SurvivalIO", "supercell.png", ["github", "download"], ["https://www.github.com/Yellowguy08/teamGame", "survivalIO.zip"])
];

function loadProjectPage() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    projectIndx = urlParams.get('project');
    // var index = localStorage.getItem("linkIndex");

    createPod(projects[projectIndx]);

    function createPod(item) {

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
        pod.setAttribute("style", "width: 100%;");

        const title = document.createElement("span");
        const titleTxt = document.createTextNode(item.getTitle());
        title.appendChild(titleTxt);
        title.classList.add("title");

        const mainContainer = document.createElement("div");
        mainContainer.classList.add("container");

        const textContainer = document.createElement("div");
        textContainer.setAttribute("style", "width: 35%;");
        // textContainer.classList.add("container");

        const pic = document.createElement("img");
        pic.setAttribute("src", item.getImgPth());

        const body = document.createElement("span");
        const bodyTxt = document.createTextNode(item.getDesc());
        body.classList.add("project-desc");
        body.setAttribute("style", "font-size: 2rem;");
        body.appendChild(bodyTxt);

        textContainer.appendChild(body);

        mainContainer.appendChild(pic);
        mainContainer.appendChild(textContainer);

        const buttons = document.createElement("div");
        buttons.classList.add("button-options");

        let itemButtons = item.getButtons();
        let links = item.getLinks();

        for (var i = 0; i < itemButtons.length; i++) {
            const button = document.createElement("a");

            button.setAttribute("href", links[i]);

            if (itemButtons[i] == "download") {
                button.setAttribute("download", "");
            }

            button.classList.add("button");

            button.innerHTML = getButtonIcon(itemButtons[i]);

            buttons.appendChild(button);
        }

        pod.appendChild(title);
        pod.appendChild(mainContainer);
        pod.appendChild(buttons);

        main.appendChild(pod);
        // main.appendChild(title);
    }

    
}
