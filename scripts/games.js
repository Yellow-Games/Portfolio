class Game {
    
    constructor(name, desc, imgs, buttons, links) {
        this.name = name;
        this.desc = desc;
        this.imgs = imgs;
        this.buttons = buttons;
        this.links = links;
    }

    getTitle() {
        return this.name;
    }

    getDesc() {
        return this.desc;
    }

    getImgs() {
        return this.imgs;
    }

    getButtons() {
        return this.buttons;
    }

    getLinks() {
        return this.links;
    }

}

let games = [];

let gameIndex = 0;

function loadGamesPage() {

    fetch("../files/data.json").then(function (response) {
        return response.json();
    }).then(function (obj) {

        parseData(obj);

        document.getElementById("MainGameDisplay").innerHTML = "";

        games.forEach(g => {
            createGameModule(g)
        });

    }).catch(function (error) {
        console.error(error);
    })
}

function loadGamePage() {

    fetch("../files/data.json").then(function (response) {
        return response.json();
    }).then(function (obj) {

        parseData(obj);

        // Gets game id from url queryString
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        gameIndex = urlParams.get('q');

        let game = games[gameIndex]

        // document.getElementById("title").innerHTML = game.getTitle();

        // if there is only 1 picture don't include arrow buttons and viewer
        // if there are only 2 pictures double the array to make it still work e.x. a b -> a b a b

        var content = `
            <div class="header">${game.getTitle()}</div>
            <div id="image-carousel">
                <div id="images">`

        if (game.getImgs().length == 2) {
            game.images = game.getImgs().push(game.getImgs()[0]);
            game.images = game.getImgs().push(game.getImgs()[1]);
        }

        if (game.getImgs().length == 1) {

            content += `<img name="0" src="../img/${game.getImgs()[0]}" alt=""></div></div>`
            
        } else {
            for(let i = 0; i < 3; i++) {
                content += `<img name="${i+1}" src="../img/${game.getImgs()[i]}" alt="">`
            }

            content += `</div><div id="progress-center"><div id="progress"><div onclick="moveTo(0);" class="dot active"></div>`

        for (let i = 1; i < game.getImgs().length; i++) {
            content += `<div onclick="moveTo(${i});" class="dot"></div>`
        }

        content += `</div>
                </div>

                <div id="left-arrow" class="arrow-center">
                    <div class="arrow" onclick="arrowPressed('left');"><</div>
                </div>
                <div id="right-arrow" class="arrow-center">
                    <div class="arrow" onclick="arrowPressed('right');">></div>
                </div>

            </div>
            </div>`
        }

            content +=`
            <div id="desc">${game.getDesc()}</div>
            <div id="buttons">`;

            for(let i = 0; i < game.buttons.length; i++) {
                if (i >= game.getLinks().length) {
                    content += `<button class="button"disabled>${getButtonIcon(game.buttons[i])}</button>`
                } else {
                    content += `<button class="button" onclick="location.replace('${game.links[i]}')">${getButtonIcon(game.buttons[i])}</button>`
                }
            }

        content += `</div>`;

        document.getElementById("GameContent").innerHTML = content;

    }).catch(function (error) {
        console.error(error);
    })
}

function arrowPressed(direction) {

    let dots = document.getElementById("progress");

    let currIndex = -1;

    for (let i = 0; i < dots.childElementCount; i++) {
        if (dots.children[i].classList.contains("active")) {
            currIndex = i;
            break;
        }
    }

    if (currIndex == -1) {
        return;
    }


    let newIndex = currIndex;


    if (direction == 'left') {
        newIndex = ((currIndex - 1) % dots.childElementCount + dots.childElementCount) % dots.childElementCount;
        updateImages(-1);
    } else if (direction == 'right') {
        newIndex = ((currIndex + 1) % dots.childElementCount + dots.childElementCount) % dots.childElementCount;
        updateImages(1);

    }
    dots.children[currIndex].classList.remove("active");
    dots.children[newIndex].classList.add("active");

}

function moveTo(index) {

    let dots = document.getElementById("progress");

    while (!dots.children[index].classList.contains("active")) {
        arrowPressed('right');
    }
}

function updateImages(direction) {


    options = games[gameIndex].getImgs();

    let images = document.getElementById("images");

    if (direction > 0) {

        let img = options.shift()
        
        options.push(img);


    } else if (direction < 0) {

        let img = options.pop()
        options.unshift(img);

    }

    games[gameIndex].imgs = options;

    for (let i = 0; i < 3; i++) {
        images.children[i].src = `../img/${options[i]}`
    }

    // new system that replaces the order of the imgs.
    // set thier original position to -x or +x depending on direction and have them slide to 0
}

function parseData(data) {

    data.content.forEach(g => {
        games.push(new Game(g.name, g.desc, g.imgs, g.buttons, g.links))
    });
}

function createGameModule(game) {

    module = `<div class="game-display">
				<img src="../img/${game.getImgs()[0]}" alt="Game Image">
				<div class="game-info">
					<span class="info-piece game-title">${game.getTitle()}</span>
					<span class="info-piece game-desc">${limitCharacters(game.getDesc(), 250)}</span>
					<a href="g.html?q=${games.indexOf(game)}" class="info-piece button">Learn More -></a>
                    ${game.getLinks().length > 0 ? `<a href="${game.getLinks()[0]}" class="info-piece button small-button"> 
                    ${getButtonIcon(game.getButtons()[0])}` : ``}
				</div>
			</div>`

    document.getElementById("MainGameDisplay").innerHTML += module;

}

function getButtonIcon(buttonID) {
    switch (buttonID) {
        case "download":
            return `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2a1 1 0 0 1 1 1v10.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L11 13.586V3a1 1 0 0 1 1-1zM5 17a1 1 0 0 1 1 1v2h12v-2a1 1 0 1 1 2 0v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2a1 1 0 0 1 1-1z" fill="#0D0D0D"/>
                    </svg>`;
        case "github":
            return `<svg width='48' height='48' viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" id="Github--Streamline-Unicons" height="16" width="16">
                        <path d="M7.999933333333333 0.35346666666666665c-1.8616000000000001 0.00006666666666666667 -3.662466666666666 0.6626 -5.080266666666667 1.8689333333333331C1.5017999999999998 3.4287333333333327 0.5594666666666666 5.100266666666666 0.26126666666666665 6.937866666666666c-0.29819999999999997 1.8375333333333332 0.0672 3.7212666666666667 1.0308 5.3141333333333325 0.9635333333333334 1.5927333333333333 2.462466666666667 2.790733333333333 4.228533333333333 3.3795333333333333 0.39199999999999996 0.0686 0.5389999999999999 -0.1666 0.5389999999999999 -0.37239999999999995 0 -0.18619999999999998 -0.0098 -0.8036 -0.0098 -1.4602 -1.9697999999999998 0.36260000000000003 -2.4794 -0.4801333333333333 -2.6361999999999997 -0.9211333333333332 -0.174 -0.4288666666666666 -0.4498 -0.8089333333333333 -0.8036 -1.1074 -0.2744 -0.147 -0.6664 -0.5095999999999999 -0.0098 -0.5194 0.2507333333333333 0.027200000000000002 0.4911333333333333 0.11446666666666666 0.7010000000000001 0.2543333333333333 0.2098 0.13986666666666664 0.3828666666666667 0.3283333333333333 0.5044 0.5492666666666666 0.10719999999999999 0.1926 0.25139999999999996 0.36219999999999997 0.4242666666666666 0.499 0.17286666666666664 0.13679999999999998 0.37106666666666666 0.2382 0.5831999999999999 0.29819999999999997 0.2121333333333333 0.060066666666666664 0.434 0.07773333333333332 0.6529333333333334 0.05193333333333333s0.43066666666666664 -0.09453333333333333 0.6229333333333333 -0.2023333333333333c0.03393333333333333 -0.39859999999999995 0.2116 -0.7712666666666667 0.4998666666666667 -1.0486 -1.7444 -0.19599999999999998 -3.5671999999999997 -0.8722 -3.5671999999999997 -3.8709999999999996 -0.011 -0.7791333333333333 0.27646666666666664 -1.533 0.8036 -2.106933333333333 -0.23966666666666664 -0.6772 -0.21166666666666667 -1.4203999999999999 0.0784 -2.0776 0 0 0.6565333333333333 -0.20579999999999998 2.1559999999999997 0.8036 1.2828 -0.3528 2.6370666666666667 -0.3528 3.9199333333333333 0 1.4993999999999998 -1.0191999999999999 2.1559999999999997 -0.8036 2.1559999999999997 -0.8036 0.29006666666666664 0.6572 0.3181333333333333 1.4003999999999999 0.0784 2.0776 0.5286 0.5729333333333333 0.8164666666666666 1.3275333333333332
                            0.8036 2.106933333333333 0 3.0086 -1.8325999999999998 3.675 -3.577 3.8709999999999996 0.18706666666666666 0.1896 0.3311333333333333 0.41733333333333333 0.42246666666666666 0.6675333333333333 0.09133333333333334 0.2503333333333333 0.1277333333333333 0.5173333333333333 0.10673333333333332 0.7828666666666666 0 1.0486666666666666 -0.0098 1.8913333333333333 -0.0098 2.1559333333333335 0 0.20579999999999998 0.147 0.4508 0.5389999999999999 0.37239999999999995 1.7629333333333332 -0.5935333333333332 3.2575333333333334 -1.7943333333333333 4.217 -3.3879333333333332 0.9595333333333333 -1.5936666666666666 1.3214 -3.476466666666666 1.0211333333333332 -5.312266666666666 -0.3002666666666667 -1.8357333333333332 -1.2431333333333332 -3.5050666666666666 -2.6604 -4.709933333333333C11.659466666666667 1.0164666666666666 9.860133333333334 0.3544666666666666 7.999933333333333 0.35346666666666665Z" fill="#000000" stroke-width="0.6667">
                        </path>
                    </svg>`;
        case "web":
            return `<svg id='Play_24' width='48' height='48' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'>
						<rect width='24' height='24' stroke='none' fill='#000000' opacity='0'/>
						<g transform="matrix(0.83 0 0 0.83 12 12)" >
							<path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" translate(-16, -15)" d="M 6 3 C 5.447715250169207 3 5 3.4477152501692068 5 4 C 4.999997456931168 4.001302065424949 4.999997456931168 4.002604134575051 5 4.0039062 L 5 15 L 5 25.996094 C 4.999997457191576 25.99739599875847 4.999997457191576 25.99869800124153 5 26 C 5 26.552284749830793 5.447715250169207 27 6 27 C 6.208161653190648 26.99939863788814 6.41094691965285 26.933851882267366 6.5800781 26.8125 L 6.5820312 26.814453 L 26.416016 15.908203 C 26.77143390778624 15.745605470016656 26.99954873081957 15.390844780300261 27 15 C 27.000200642803566 14.597717889238558 26.759325224181982 14.234480761965193 26.388672 14.078125 L 6.5820312 3.1855469 L 6.5800781 3.1855469 C 6.4107140540402305 3.0648892444540654 6.207948188055822 3.0000314643392456 5.999999999999999 3 z" stroke-linecap="round" />
						</g>
					</svg>`;
        case "steam":
            return `<svg id='Steam_24' width='48' height='48' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'>
						<rect width='24' height='24' stroke='none' fill='#000000' opacity='0'/>
						<g transform="matrix(0.91 0 0 0.91 12 12)" >
							<path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" translate(-15, -15)" d="M 6 4 C 4.895 4 4 4.895 4 6 L 4 17.326172 L 6.5351562 18.017578 C 7.1301562 16.988578 8.1675781 16.247547 9.3925781 16.060547 L 12.066406 12.851562 C 12.027406 12.572563 12 12.29 12 12 C 12 8.686 14.686 6 18 6 C 21.314 6 24 8.686 24 12 C 24 15.314 21.314 18 18 18 C 17.71 18 17.427437 17.972594 17.148438 17.933594 L 13.939453 20.607422 C 13.645453 22.526422 12.001 24 10 24 C 7.791 24 6 22.209 6 20 C 6 19.982 6.0058594 19.965266 6.0058594 19.947266 L 4 19.400391 L 4 24 C 4 25.105 4.895 26 6 26 L 24 26 C 25.105 26 26 25.105 26 24 L 26 6 C 26 4.895 25.105 4 24 4 L 6 4 z M 18 8 C 15.802706 8 14 9.8027056 14 12 C 14 14.197294 15.802706 16 18 16 C 20.197294 16 22 14.197294 22 12 C 22 9.8027056 20.197294 8 18 8 z M 18 10 C 19.116414 10 20 10.883586 20 12 C 20 13.116414 19.116414 14 18 14 C 16.883586 14 16 13.116414 16 12 C 16 10.883586 16.883586 10 18 10 z M 10 17.5 C 9.215 17.5 8.5224531 17.868547 8.0644531 18.435547 L 10.263672 19.035156 C 10.796672 19.181156 11.111797 19.730672 10.966797 20.263672 C 10.843797 20.707672 10.44 21 10 21 C 9.913 21 9.8253281 20.988844 9.7363281 20.964844 L 7.5351562 20.365234 C 7.7141562 21.571234 8.744 22.5 10 22.5 C 11.381 22.5 12.5 21.381 12.5 20 C 12.5 18.619 11.381 17.5 10 17.5 z" stroke-linecap="round" />
						</g>
					</svg>`
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

function limitCharacters(text, limit) {

    if(text.length < limit) {
        return text;
    }

    return text.substring(0, limit-3) + "...";
}