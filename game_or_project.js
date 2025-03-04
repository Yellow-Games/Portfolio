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
    new Project("Survival IO Clone", "A team game project using Spritekit to recreate the mobile game SurvivalIO", "supercell.png", ["github", "app"], ["https://www.github.com/Yellowguy08/teamGame", "#"])
];

function loadProjectPage() {

    const queryString = window.location.search;
    console.log(queryString);
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

        const title = document.createElement("span");
        const titleTxt = document.createTextNode(item.getTitle());
        title.appendChild(titleTxt);
        title.classList.add("title");

        const pic = document.createElement("img");
        pic.setAttribute("src", item.getImgPth());

        const body = document.createElement("span");
        const bodyTxt = document.createTextNode(item.getDesc());
        body.classList.add("project-desc");
        body.appendChild(bodyTxt);

        const buttons = document.createElement("div");
        buttons.classList.add("button-options");

        let itemButtons = item.getButtons();
        let links = item.getLinks();

        for (var i = 0; i < itemButtons.length; i++) {
            const button = document.createElement("a");

            button.setAttribute("href", links[i]);

            button.classList.add("button");

            button.innerHTML = getButtonIcon(itemButtons[i]);

            buttons.appendChild(button);
        }

        pod.appendChild(title);
        pod.appendChild(pic);
        pod.appendChild(body);
        pod.appendChild(buttons);

        main.appendChild(pod);
        // main.appendChild(title);
    }

    function getButtonIcon(buttonID) {
        switch (buttonID) {
            case "download":
                return "";
            case "github":
                return `<svg width='48' height='48' viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" id="Github--Streamline-Unicons" height="16" width="16">
							<path d="M7.999933333333333 0.35346666666666665c-1.8616000000000001 0.00006666666666666667 -3.662466666666666 0.6626 -5.080266666666667 1.8689333333333331C1.5017999999999998 3.4287333333333327 0.5594666666666666 5.100266666666666 0.26126666666666665 6.937866666666666c-0.29819999999999997 1.8375333333333332 0.0672 3.7212666666666667 1.0308 5.3141333333333325 0.9635333333333334 1.5927333333333333 2.462466666666667 2.790733333333333 4.228533333333333 3.3795333333333333 0.39199999999999996 0.0686 0.5389999999999999 -0.1666 0.5389999999999999 -0.37239999999999995 0 -0.18619999999999998 -0.0098 -0.8036 -0.0098 -1.4602 -1.9697999999999998 0.36260000000000003 -2.4794 -0.4801333333333333 -2.6361999999999997 -0.9211333333333332 -0.174 -0.4288666666666666 -0.4498 -0.8089333333333333 -0.8036 -1.1074 -0.2744 -0.147 -0.6664 -0.5095999999999999 -0.0098 -0.5194 0.2507333333333333 0.027200000000000002 0.4911333333333333 0.11446666666666666 0.7010000000000001 0.2543333333333333 0.2098 0.13986666666666664 0.3828666666666667 0.3283333333333333 0.5044 0.5492666666666666 0.10719999999999999 0.1926 0.25139999999999996 0.36219999999999997 0.4242666666666666 0.499 0.17286666666666664 0.13679999999999998 0.37106666666666666 0.2382 0.5831999999999999 0.29819999999999997 0.2121333333333333 0.060066666666666664 0.434 0.07773333333333332 0.6529333333333334 0.05193333333333333s0.43066666666666664 -0.09453333333333333 0.6229333333333333 -0.2023333333333333c0.03393333333333333 -0.39859999999999995 0.2116 -0.7712666666666667 0.4998666666666667 -1.0486 -1.7444 -0.19599999999999998 -3.5671999999999997 -0.8722 -3.5671999999999997 -3.8709999999999996 -0.011 -0.7791333333333333 0.27646666666666664 -1.533 0.8036 -2.106933333333333 -0.23966666666666664 -0.6772 -0.21166666666666667 -1.4203999999999999 0.0784 -2.0776 0 0 0.6565333333333333 -0.20579999999999998 2.1559999999999997 0.8036 1.2828 -0.3528 2.6370666666666667 -0.3528 3.9199333333333333 0 1.4993999999999998 -1.0191999999999999 2.1559999999999997 -0.8036 2.1559999999999997 -0.8036 0.29006666666666664 0.6572 0.3181333333333333 1.4003999999999999 0.0784 2.0776 0.5286 0.5729333333333333 0.8164666666666666 1.3275333333333332
                             0.8036 2.106933333333333 0 3.0086 -1.8325999999999998 3.675 -3.577 3.8709999999999996 0.18706666666666666 0.1896 0.3311333333333333 0.41733333333333333 0.42246666666666666 0.6675333333333333 0.09133333333333334 0.2503333333333333 0.1277333333333333 0.5173333333333333 0.10673333333333332 0.7828666666666666 0 1.0486666666666666 -0.0098 1.8913333333333333 -0.0098 2.1559333333333335 0 0.20579999999999998 0.147 0.4508 0.5389999999999999 0.37239999999999995 1.7629333333333332 -0.5935333333333332 3.2575333333333334 -1.7943333333333333 4.217 -3.3879333333333332 0.9595333333333333 -1.5936666666666666 1.3214 -3.476466666666666 1.0211333333333332 -5.312266666666666 -0.3002666666666667 -1.8357333333333332 -1.2431333333333332 -3.5050666666666666 -2.6604 -4.709933333333333C11.659466666666667 1.0164666666666666 9.860133333333334 0.3544666666666666 7.999933333333333 0.35346666666666665Z" fill="#000000" stroke-width="0.6667">
                            </path>
						</svg>`;
            case "web":
                return "";
            default:
                return capFirstLetter(buttonID);
        }
    }

    function capFirstLetter(word) {
        let letters = word.split("");
        letters[0] = letters[0].toUpperCase();

        var newString = "";

        for (var j = 0; j < letters.length; j++) {
            newString += letters[j];
        }

        return newString;
    }
}
