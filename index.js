const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

const gravity = 4.5;

CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    this.beginPath();
    this.moveTo(x+r, y);
    this.arcTo(x+w, y,   x+w, y+h, r);
    this.arcTo(x+w, y+h, x,   y+h, r);
    this.arcTo(x,   y+h, x,   y,   r);
    this.arcTo(x,   y,   x+w, y,   r);
    this.closePath();
    return this;
}

//GameObject constructor
function GameObject(spritesheet, x, y, width, height, timePerFrame, numberOfFrames) {
    this.spritesheet = spritesheet;             //the spritesheet image
    this.x = x;                                 //the x coordinate of the object
    this.y = y;                                 //the y coordinate of the object
    this.width = width;                         //width of spritesheet
    this.height = height;                       //height of spritesheet
    this.timePerFrame = timePerFrame;           //time in(ms) given to each frame
    this.numberOfFrames = numberOfFrames || 1;  //number of frames(sprites) in the spritesheet, default 1

    //current frame index pointer
    this.frameIndex = 0;

    //time the frame index was last updated
    this.lastUpdate = Date.now();

    //to update
    this.update = function() {
        if(Date.now() - this.lastUpdate >= this.timePerFrame) {
            this.frameIndex++;
            if(this.frameIndex >= this.numberOfFrames) {
                this.frameIndex = 0;
            }
            this.lastUpdate = Date.now();
        }
    }

    //to draw on the canvas, parameter is the context of the canvas to be drawn on
    this.draw = function(context) {
        context.drawImage(
            this.spritesheet,
            this.frameIndex*this.width/this.numberOfFrames,
            0,
            this.width/this.numberOfFrames,
            this.height,
            x,
            y,
            this.width/this.numberOfFrames,
            this.height
        );
    }
}

// var hero;
// var heroSpritesheet = new Image();
// heroSpritesheet.src = "./Artboard_6-removebg-preview.png";

// hero = new GameObject(heroSpritesheet,  //the spritesheet image
//     250,            //x position of hero
//     0,            //y position of hero
//     1968,         //total width of spritesheet image in pixels
//     127,          //total height of spritesheet image in pixels
//     90,           //time(in ms) duration between each frame change (experiment with it to get faster or slower animation)
//     16
// );

// function loop() {
//     update();
//     draw();
//     requestAnimationFrame(loop);

//     function update() {
//         hero.update();
//     }
    
//     //draw method for drawing everything on canvas
//     function draw() {
//         c.clearRect(0,0,canvas.width, canvas.height);
//         hero.draw(c);
//     }
// }
// loop()


// Mobile version!
let Mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || innerWidth <= 930;
// addEventListener("load", () => {
//     if (navigator.userAgent.match(/Android/i)) {
//         setTimeout(() => {
//           window.scrollTo(0, 1);
//         }, 0);
//     }
// });
// if (Mobile && window.innerHeight > window.innerWidth) {

// document.documentElement.requestFullscreen({ navigationUI: 'hide' });

// console.log("containerElm: ", containerElm);
if (Mobile && window.innerHeight > window.innerWidth) {
    // if (window.locationbar.visible) {
    //     canvas.width = innerHeight + 62;
    // } else {
    //     canvas.width = innerHeight;
    // }
    canvas.width = innerHeight;
    canvas.height = innerWidth;
    // screen.orientation.lock("portrait");
    // console.log("screen.orientation: ", screen.orientation);
    
    // $('body').css({
    //     "-webkit-transform": "rotate(90deg)"
    // }); 
    // if(navigator.userAgent.match(/Android/i)){
    //     window.scrollTo(0,1);
    //  }

    // if(navigator.userAgent.match(/Android/i)){
    //     // alert("android user")
    //     window.scrollTo(0,1);
    // }

    // document.documentElement.mozRequestFullScreen({ navigationUI: 'hide' });
    // document.documentElement.webkitRequestFullscreen({ navigationUI: 'hide' });
    // document.documentElement.msRequestFullscreen({ navigationUI: 'hide' });
    // if (document.documentElement.requestFullscreen) { document.documentElement.requestFullscreen(); }
    // else if (document.documentElement.mozRequestFullScreen) { document.documentElement.mozRequestFullScreen(); }
    // else if (document.documentElement.webkitRequestFullscreen) { document.documentElement.webkitRequestFullscreen(); }
    // else if (document.documentElement.msRequestFullscreen) { document.documentElement.msRequestFullscreen(); }

    // screen.orientation.lock("portrait")
    // screen.orientation.lock('landscape').then(() => {}).catch(() => console.log("err"));
    // console.log("screen.orientation: ", screen.orientation);
    // console.log("screen: ", screen);
    // $('body').css({
    //     "-webkit-transform": "rotate(90deg)"
    // }); 
    // "-webkit-transform": "rotate(90deg)"
    // screen.lockOrientation("orientation");
} else if (Mobile && window.innerHeight < window.innerWidth) {
    // if (window.locationbar.visible) {
    //     canvas.height = innerHeight + 62;
    // } else {
    //     canvas.height = innerHeight;
    // }
    canvas.height = innerHeight;
    canvas.width = innerWidth;
    screen.orientation.lock('landscape').then(() => {}).catch(() => console.log("err"));
} else {
    // if (document.body) {
    //     document.body.style.overflow = "hidden"
    // }
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}
let Mobile_smallX = canvas.width >= 650 && canvas.width < 700;
let Mobile_smallXX = canvas.width >= 700 && canvas.width <= 760;
let Mobile_smallXXX = canvas.width >= 880 && canvas.width <= 930;

let Mobile_smallY = canvas.height >= 360 && canvas.height <= 374;
let Mobile_smallYY = canvas.height >= 380 && canvas.height <= 400;
let Mobile_smallYYY = canvas.height >= 400 && canvas.height <= 420;
let Mobile_smallYYYY = canvas.height >= 420 && canvas.height <= 440;
// const Mobile_smallYYY = innerHeight >= 420 && innerHeight <= 430;

// const Mobile_large = innerWidth >= 880 && innerWidth < 930;

class DefaultScreen {
    draw() {
        c.fillRect(0, 0, canvas.width, canvas.height)
        c.fillStyle = "#fff";
    }
};
class DefaultBlackScreen {
    draw() {
        c.fillRect(0, 0, canvas.width, canvas.height)
        c.fillStyle = "#000";
    }
};

class HomePage {
    constructor() {
        this.position = {
            x: 0,
            y: 0
        };
        this.width = canvas.width;
        this.height = canvas.height;
        this.done = false;
    }

    draw(imgsource, x) {
        var img = new Image();
        img.src = imgsource;
        this.position.x = x || this.position.x;
        c.drawImage(img, this.position.x, this.position.y, this.width, this.height);
    }
    update() {
        if (!this.done) {
            if (this.position.x < canvas.width + 10) {
                this.draw("Track and Field.png")
                this.position.x += 2;
            } else {
                this.position.x = 0;
                this.done = true;
                // console.log("this.position.x: ", this.position.x);
            }
            // this.done = true;
        }
    }
};
class HomePageAnimation {
    constructor() {
        this.position = {
            x: Math.floor(-canvas.width/2) - 300,
            y: 0
        };
        this.width = canvas.width;
        this.height = canvas.height;
        this.done = false;
    }

    draw(imgsource) {
        var img = new Image();
        img.src = imgsource;
        c.drawImage(img, this.position.x, this.position.y, this.width, this.height);
    }
    update() {
        if (!this.done) {
            if (this.position.x < Math.floor(canvas.width/2) - 550) {
                this.position.x += 5;
            } else {
                this.width = canvas.width;
                this.height = canvas.height;
                this.position.x = Mobile ? 50:0;
                this.done = true;
            }
        }
    }
};
class RunningGuy {
    constructor() {
        this.spritesheet;                               //the spritesheet image
        this.x = -140;                                //the x coordinate of the object
        // this.y = Mobile && (screen.orientation.type === "portrait-primary" || screen.orientation.type === "portrait-secondary") ? Math.floor(innerWidth/2):Math.floor(innerHeight/2) - 49         //the y coordinate of the object
        this.y = Math.floor(innerHeight/2) - 49         //the y coordinate of the object
        this.width = 478;                               //width of spritesheet
        this.height = 128;                              //height of spritesheet
        this.timePerFrame = 50;                         //time in(ms) given to each frame
        this.numberOfFrames = 4;                        //number of frames(sprites) in the spritesheet, default 1

        //current frame index pointer
        this.frameIndex = 0;
        
        //time the frame index was last updated
        this.lastUpdate = Date.now();
    }

    //to draw on the canvas, parameter is the context of the canvas to be drawn on
    draw() {
        let heroSpritesheet = new Image(); 
        heroSpritesheet.src = "./player-4.png";

        c.drawImage(
            heroSpritesheet,
            this.frameIndex*this.width/this.numberOfFrames,
            0,
            this.width/this.numberOfFrames,
            this.height,
            this.x,
            this.y,
            this.width/this.numberOfFrames,
            this.height
        );
    }
    update() {
        if(Date.now() - this.lastUpdate >= this.timePerFrame) {
            this.frameIndex++;
            if(this.frameIndex >= this.numberOfFrames) {
                this.frameIndex = 0;
            }
            this.lastUpdate = Date.now();
        }

        if (this.x > innerWidth + 38) {
            this.x = 0;
        } else {
            this.x += 5;
        }
    }
}

class PressEnter {
    draw(text, x, y) {
        c.fillStyle = "white";
        c.font = `30px 'Press Start 2P'`
        c.fillText(text, x, y)
    }
};


class Player {
    constructor() {
        this.spritesheet;                                           //the spritesheet image
        this.x = Mobile ? 82:55;                                                //the x coordinate of the object
        this.y = Mobile ? (canvas.height - 86):innerHeight - 150;     //the y coordinate of the object
        this.width = Mobile ? 269:478;                              //width of spritesheet
        this.height = Mobile ? 75:128;                                           //height of spritesheet
        this.timePerFrame = 90;                                     //time in(ms) given to each frame
        this.numberOfFrames = 1;                                    //number of frames(sprites) in the spritesheet, default 1
        
        this.meter = {
            x: 0,
            y: 0
        };
        this.velocity = {
            x: 0,
            y: 0
        };
        
        //current frame index pointer
        this.frameIndex = 0;
        
        //time the frame index was last updated
        this.lastUpdate = Date.now();
        
        this.sprites = { run: false };
    };

    //to draw on the canvas, parameter is the context of the canvas to be drawn on
    draw() {
        let heroSpritesheet = new Image(); 
        if (this.sprites.run) {
            if (Mobile) {
                heroSpritesheet.src = "./player-4-mobile.png";
            } else {
                heroSpritesheet.src = "./player-4.png";
            }
            c.drawImage(
                heroSpritesheet,
                this.frameIndex*this.width/this.numberOfFrames,
                0,
                this.width/this.numberOfFrames,
                this.height,
                this.x,
                this.y,
                this.width/this.numberOfFrames,
                this.height
            );
        } else {
            if (Mobile) {
                heroSpritesheet.src = "./player-mobile.png";
            } else {
                heroSpritesheet.src = "./player.png";
            }
            c.drawImage(
                heroSpritesheet,
                this.frameIndex*500,
                0,
                Mobile ? 75:500,
                Mobile ? 75:500,
                this.x,
                this.y - 5,
                Mobile ? 75:130,
                Mobile ? 75:130
            );
        }
    }
    update() {
        if(Date.now() - this.lastUpdate >= this.timePerFrame) {
            this.frameIndex++;
            if(this.frameIndex >= this.numberOfFrames) {
                this.frameIndex = 0;
            }
            this.lastUpdate = Date.now();
        }
        if (this.x !== (Mobile ? 82:55) || this.y !== (Mobile ? (canvas.height - 86):innerHeight - 150)) {
            this.x = Mobile ? 82:55;
            this.y = Mobile ? (canvas.height - 86):innerHeight - 150;
        }
    }
};
class BooostPlayer {
    constructor() {
        this.position = {
            x: Mobile ? (canvas.width - 100):(canvas.width - 200),
            y: Mobile ? (canvas.height - 50):(canvas.height - 90)
        },
        this.size = Mobile ? 40:75;
    }

    draw() {
        const circle = new Path2D();
        if (this.position.x !== Mobile ? (canvas.width - 100):(canvas.width - 200) || this.position.y !== Mobile ? (canvas.height - 50):(canvas.height - 90) || this.size !== Mobile ? 40:75) {
            this.position.x = Mobile ? (canvas.width - 100):(canvas.width - 200);
            this.position.y = Mobile ? (canvas.height - 50):(canvas.height - 90);
            this.size = Mobile ? 40:75;
        }
        circle.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
        c.fillStyle = "rgba(50, 50, 50, 0.5)"
        c.fill(circle);
    }
    update() {
        this.draw();
    }
}
class RunBoostPlayer {
    draw() {
        c.fillStyle =  "#03C9E8";
        c.font = `bold 20px 'Press Start 2P'`
        if (Mobile) {
            c.fillText("Run", canvas.width - 130, canvas.height - 40)
        } else {
            c.fillText("Run", canvas.width - 230, canvas.height - 80)
        }
    }
}


class CPU {
    constructor() {
        this.spritesheet;                       //the spritesheet image
        this.x = 125;                            //the x coordinate of the object
        this.y = Mobile ? (canvas.height - 153):innerHeight - 262;             //the y coordinate of the object
        this.width = Mobile ? 269:476;                     //width of spritesheet
        this.height = Mobile ? 75:126;                      //height of spritesheet
        this.timePerFrame = 90;                 //time in(ms) given to each frame
        this.numberOfFrames = 1;                //number of frames(sprites) in the spritesheet, default 1
        
        //current frame index pointer
        this.frameIndex = 0;
        
        //time the frame index was last updated
        this.lastUpdate = Date.now();
        
        this.sprites = { run: false };
    };

    //to draw on the canvas, parameter is the context of the canvas to be drawn on
    draw() {
        let heroSpritesheet = new Image();        
        if (this.sprites.run) {
            if (Mobile) {
                heroSpritesheet.src = "./cpu-4-mobile.png";
            } else {
                heroSpritesheet.src = "./cpu-4.png";
            }
            c.drawImage(
                heroSpritesheet,
                this.frameIndex*this.width/this.numberOfFrames,
                0,
                this.width/this.numberOfFrames,
                this.height,
                this.x,
                this.y,
                this.width/this.numberOfFrames,
                this.height
            );
        } else {
            if (Mobile) {
                heroSpritesheet.src = "./cpu-mobile.png";
            } else {
                heroSpritesheet.src = "./cpu.png";
            }
            c.drawImage(
                heroSpritesheet,
                this.frameIndex*500,
                0,
                Mobile ? 75:500,
                Mobile ? 75:500,
                this.x,
                this.y -5,
                Mobile ? 75:130,
                Mobile ? 75:130
            );
        }
    }
    update() {
        if(Date.now() - this.lastUpdate >= this.timePerFrame) {
            this.frameIndex++;
            if(this.frameIndex >= this.numberOfFrames) {
                this.frameIndex = 0;
            }
            this.lastUpdate = Date.now();
        }
        if (this.y !== Mobile ? (canvas.height - 153):innerHeight - 262) {
            this.y = Mobile ? (canvas.height - 153):innerHeight - 262;
        }
    }
};

class Player1Field {
    constructor() {
        this.position = {
            x: 0,
            y: Mobile ? (canvas.height - 68):(innerHeight - 116)
        },
        this.width = 7040,
        this.height = Mobile ? 68:116
    }

    draw() {
        var img = new Image();
        img.src = "./player1-field.png";
        c.drawImage(img, this.position.x, this.position.y, this.width, this.height);
    }
    get() {
        return this.position.x;
    }
    update(x) {
        this.position.x += x;
    }
    fixY() {
        if (this.position.y !== Mobile ? (canvas.height - 68):(innerHeight - 116)) {
            this.position.y = Mobile ? (canvas.height - 68):(innerHeight - 116);
        }
    }
}
class CpuField {
    constructor() {
        this.position = {
            x: 0,
            y: Mobile ? (canvas.height - 113):(innerHeight - 192)
        },
        this.width = 7040,
        this.height = Mobile ? 45:76
    }

    draw() {
        var img = new Image();
        img.src = "./cpu-field.png";
        c.drawImage(img, this.position.x, this.position.y, this.width, this.height);
    }
    get() {
        return this.position.x;
    }
    update(x) {
        this.position.x += x;
    }
    fixY() {
        if (this.position.y !== Mobile ? (canvas.height - 113):(innerHeight - 192)) {
            this.position.y = Mobile ? (canvas.height - 113):(innerHeight - 192);
        }
    }
}

class Crowd {
    constructor() {
        this.position = {
            x: 0,
            y: Mobile ? (canvas.height - 183):innerHeight - 315
        },
        this.width = 6673,
        this.height = Mobile ? 35:63
    }

    draw() {
        var img = new Image();
        img.src = "./crowd.png";
        if (this.position.y !== Mobile ? (canvas.height - 183):innerHeight - 315) {
            this.position.y = Mobile ? (canvas.height - 183):innerHeight - 315;
        }
        c.drawImage(img, this.position.x, this.position.y, this.width, this.height);
    }
    update(x) {
        this.position.x += x;
        if (this.position.y !== Mobile ? (canvas.height - 183):innerHeight - 315) {
            this.position.y = Mobile ? (canvas.height - 183):innerHeight - 315;
        }
    }
}
class Crowdv2 {
    constructor() {
        this.position = {
            x: 0,
            y: Mobile ? (canvas.height - 148):innerHeight - 253
        },
        this.width = 6673,
        this.height = Mobile ? 35:62
    }

    draw() {
        var img = new Image();
        img.src = "./crowd_v2.png";
        if (this.position.y !== Mobile ? (canvas.height - 148):innerHeight - 253) {
            this.position.y = Mobile ? (canvas.height - 148):innerHeight - 253;
        }
        c.drawImage(img, this.position.x, this.position.y, this.width, this.height);
    }
    get() {
        return this.position.x;
    }
    update(x) {
        this.position.x += x;
        if (this.position.y !== Mobile ? (canvas.height - 148):innerHeight - 253) {
            this.position.y = Mobile ? (canvas.height - 148):innerHeight - 253;
        }
    }
}
class Scores {
    constructor() {
        this.position = {
            x: 0,
            y: 0
        },
        this.width = canvas.width,
        this.height = Mobile ? canvas.height - 183:300
    }

    draw() {
        let img = new Image();
        img.src = "./scores.png";
        c.drawImage(img, 0, this.position.y, this.width, this.height);
    }
    update() {
        this.draw();
        if (this.width !== canvas.width || this.height !== (Mobile ? (canvas.height - 183):300)) {
            this.width = canvas.width,
            this.height = Mobile ? canvas.height - 183:300
        }
    }
}
class RoundedRect {
    constructor() {
        this.position = {
            x: Mobile ? (canvas.width-300):(canvas.width-360),
            y: Mobile_smallYYYY ? 130:
                Mobile_smallYYY ? 120:
                Mobile_smallYY ? 105:
                Mobile_smallY ? 88:
                Mobile ? 95:150
        };
        this.width = 160;
        this.height = Mobile ? 30:40;
        this.lineWidth = Mobile ? 4:6;
    }

    draw() {
        let confirmY = ( Mobile_smallYYYY ? 130:
            Mobile_smallYYY ? 120:
            Mobile_smallYY ? 105:
            Mobile_smallY ? 88:
            Mobile ? 95:150
        );
        if (this.position.y !== confirmY) {
            this.position.y = confirmY;
        }
        c.roundRect(this.position.x, this.position.y, this.width, this.height, 16).stroke();
        c.lineWidth = this.lineWidth;
        c.strokeStyle = "#FC976D"
    }

}


class TextScores {
    draw(text, textX, textY, color, font, bold) {
        c.fillStyle = color || "white";
        c.font = bold ? `bold ${font || 20 || this.font}px 'Press Start 2P'`:`${font || 20 || this.font}px 'Press Start 2P'`
        c.fillText(text, textX, textY)
    }
    update(text, textX, textY) {
        c.fillText(text, textX, textY)
    }
}

class StartCircles {
    draw(text, textX, textY) {
        c.font = '100px serif';
        c.fillText(text, textX, textY)
    }
}

class StartDescription {
    constructor() {
        this.textX;
        this.textY;
    }
    draw(textX, textY) {
        c.fillStyle = "white";
        c.font = '35px serif';
        c.fillText("100 METER DASH  WISH", textX, textY);

        this.textX = textX;
        this.textY = textY;
    }
    update(x) {
        this.textX += x;
        c.fillText("100 METER DASH  WISH", this.textX, this.textY)
    }
}

const defaultScreen = new DefaultScreen();
const defaultBlackScreen = new DefaultBlackScreen();
const homePage = new HomePage();
const homePageAnimation = new HomePageAnimation();
const runningGuy = new RunningGuy();
const pressEnter = new PressEnter();

const player = new Player();
const booostPlayer = new BooostPlayer();
const runBoostPlayer = new RunBoostPlayer();
const cpu = new CPU();

const player1Field = new Player1Field();
const cpuField = new CpuField();

const crowd = new Crowd();
const crowdv2 = new Crowdv2();
const scores = new Scores();
const roundedRect = new RoundedRect();

const textScores = new TextScores();
const textScores_2 = new TextScores();
const textScores_3 = new TextScores();
const textScores_4 = new TextScores();
const textScores_5 = new TextScores();

const startCircles = new StartCircles();
const startDescription = new StartDescription();


let keys = {
    left: {
        pressed: false
    },
    right: {
        pressed: false
    },
    up: {
        pressed: false
    }
};

let requestId, requestId_2, requestId_3, increamentValue=0;

function intro() {
    requestId = requestAnimationFrame(intro);
    c.clearRect(0, 0, canvas.width, canvas.height)
    defaultBlackScreen.draw();
    defaultScreen.draw();
    homePageAnimation.draw("Track and Field.png");
    homePageAnimation.update();
    runningGuy.update();
    runningGuy.draw();
};intro();

if (Mobile && window.innerHeight > window.innerWidth) {
    alert("Rotate your phone to landscape mode to play the game!")
}

let timerMS = 0, count = 0;
let counter = setInterval(timer, 10); //10 will  run it every 100th of a second
function timer() {
    if (count >= 100000) {
        clearInterval(counter);
        return null;
    }
    count++;
    timerMS = count/100;
}

let timerMS_2 = 0, count_2 = 0;
let counter_2;
let counterTimout = setTimeout(() => {
    counter_2 = setInterval(timer_2, 10); //10 will  run it every 100th of a second
    clearTimeout(counterTimout)
}, 3000);
function timer_2() {
    if (count_2 >= 100000) {
        clearInterval(counter_2);
        return null;
    }
    count_2++;
    timerMS_2 = count_2/100;
}

let third_audio = new Audio('Join_file_152013445.mp3');
function animate(value) {
    cancelAnimationFrame(requestId_2);
    if (value === true) {
        let timeOut = setTimeout(() => {
            third_audio.play();
            third_audio.addEventListener('ended', function() {
                this.currentTime = 2;
                this.play();
            }, false);
            clearTimeout(timeOut)
        }, 3000)
        timerMS = 0;
        count = 0;
    }
    if (player1Field.get() <= -4480 && !localStorage.getItem("player1")) { localStorage.setItem("player1", timerMS_2); }
    if (cpuField.get() <= -4400 && !localStorage.getItem("cpu")) { localStorage.setItem("cpu", timerMS_2); }
    
    requestId_3 = requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height)
    
    scores.update();
    roundedRect.draw()
    crowd.draw();
    crowdv2.draw();

    player1Field.draw()
    cpuField.draw()

    let body = document.querySelector("body")
    if (body) { body.style.opacity = 0.5; }

    if (timerMS > 0.6 && timerMS < 3) {
        textScores_4.draw("0000", 
            Mobile_smallXXX ? 220:Mobile_smallXX ? 180:Mobile_smallX ? 150:Mobile ? 195:370,
            Mobile_smallYYYY ? 206:Mobile_smallYYY ? 195:Mobile_smallYY ? 175:Mobile_smallY ? 152:Mobile ? 162:252,
            "white", Mobile ? 18:26
        )
        textScores_5.draw("0000",
            Mobile_smallXXX ? 580:Mobile_smallXX ? 480:Mobile_smallX ? 430:Mobile ? 540:Math.floor(canvas.width/2) + 240,
            Mobile_smallYYYY ? 206:Mobile_smallYYY ? 195:Mobile_smallYY ? 175:Mobile_smallY ? 152:Mobile ? 162:252,
            "white", Mobile ? 18:26
        )
        
        timerMS_2 = -3;
        count_2 = -3;
        startCircles.draw("???", (canvas.width/2) - 200, (canvas.height/2), 100)
    } if (timerMS > 1.6 && timerMS < 3) {
        startCircles.draw("????", (canvas.width/2) - 50, (canvas.height/2), 100)
    } if (timerMS > 2.6 && timerMS < 3) {
        startCircles.draw("????", (canvas.width/2) + 100, (canvas.height/2), 100)
    } if (timerMS > 3) {
        body.style.opacity = 1;

        cpu.sprites.run = true;
        cpu.numberOfFrames = 4;
        
        textScores.draw(
            (player1Field.get() <= -4500 || cpuField.get() <= -4500) ? (
                player1Field.get() <= -4500 && (!cpuField.get() <= -4500) || (player1Field.get() <= -4500) && (cpuField.get() <= -4500)
                && (parseFloat(localStorage.getItem("player1")) < parseFloat(localStorage.getItem("cpu"))) ?
                localStorage.getItem("player1") !== null && localStorage.getItem("player1").replace(".", ":") ?
                parseFloat(localStorage.getItem("player1")) > 9.9 ?
                    localStorage.getItem("player1").replace(".", ":")
                    :"0"+localStorage.getItem("player1").replace(".", ":")
                :""
                :localStorage.getItem("cpu") !== null && localStorage.getItem("cpu").replace(".", ":") ?
                parseFloat(localStorage.getItem("cpu")) > 9.9 ?
                    localStorage.getItem("cpu").replace(".", ":")
                    :"0"+localStorage.getItem("cpu").replace(".", ":")
                :""
            ):timerMS_2 > 9.9 ? (
                timerMS_2.toString().replace(".", ":")
            ):"0"+timerMS_2.toString().replace(".", ":")
        , Mobile ? canvas.width-260:canvas.width-335,
            Mobile_smallYYYY ? 155:Mobile_smallYYY ? 144:Mobile_smallYY ? 128:Mobile_smallY ? 112:Mobile ? 120:183,
            "white", Mobile ? 17:22
        )
    

        if (!localStorage.getItem("player1")) {
            textScores_2.draw("?????????",
                Mobile_smallXXX ? 140:Mobile ? 120:220,
                Mobile_smallYYYY ? 144:Mobile_smallYYY ? 133:Mobile_smallYY ? 120:Mobile_smallY ? 101:Mobile ? 111:175,
                "white", Mobile ? 14:20
            )
        } else {
            textScores_2.draw(localStorage.getItem("player1"),
                Mobile_smallXXX ? 140:Mobile ? 125:220,
                Mobile_smallYYYY ? 144:Mobile_smallYYY ? 133:Mobile_smallYY ? 120:Mobile_smallY ? 101:Mobile ? 111:175,
                "white", Mobile ? 12:16, "bold"
            )
        }
        if (!localStorage.getItem("cpu")) {
            textScores_3.draw("?????????",
                Mobile_smallXXX ? 140:Mobile ? 120:220,
                Mobile_smallYYYY ? 164:Mobile_smallYYY ? 153:Mobile_smallYY ? 139:Mobile_smallY ? 120:Mobile ? 130:200,
                "white", Mobile ? 14:20
            )
        } else {
            textScores_3.draw(localStorage.getItem("cpu"),
                Mobile_smallXXX ? 140:Mobile ? 125:220,
                Mobile_smallYYYY ? 164:Mobile_smallYYY ? 155:Mobile_smallYY ? 139:Mobile_smallY ? 120:Mobile ? 130:200,
                "white", Mobile ? 12:16, "bold"
            )
        }
        
        
        
        if (cpu.x < 530) {
            textScores_4.draw("08"+Math.floor(Math.random() * 100),
                Mobile_smallXXX ? 220:Mobile_smallXX ? 180:Mobile_smallX ? 150:Mobile ? 195:370,
                Mobile_smallYYYY ? 206:Mobile_smallYYY ? 195:Mobile_smallYY ? 175:Mobile_smallY ? 152:Mobile ? 162:252,
                "white", Mobile ? 18:26
            )
            crowd.update(-5)
            crowdv2.update(-5)
            cpu.x += 5;
            cpuField.update(-5)
    
        } else {
            if (cpuField.get() < -4500) {
                textScores_4.draw("0000",
                    Mobile_smallXXX ? 220:Mobile_smallXX ? 180:Mobile_smallX ? 150:Mobile ? 195:370,
                    Mobile_smallYYYY ? 206:Mobile_smallYYY ? 195:Mobile_smallYY ? 175:Mobile_smallY ? 152:Mobile ? 162:252,
                    "white", Mobile ? 18:26
                )
                cpu.sprites.run = false;
                cpu.numberOfFrames = 1;
            }
            else {
                textScores_4.draw("08"+Math.floor(Math.random() * 100),
                    Mobile_smallXXX ? 220:Mobile_smallXX ? 180:Mobile_smallX ? 150:Mobile ? 195:370,
                    Mobile_smallYYYY ? 206:Mobile_smallYYY ? 195:Mobile_smallYY ? 175:Mobile_smallY ? 152:Mobile ? 162:252,
                    "white", Mobile ? 18:26
                )
                crowd.update(-5)
                crowdv2.update(-5)
                cpuField.update(-5)
            }
        }
    
        if (keys.right.pressed) {
            textScores_5.draw("09"+Math.floor(Math.random() * 100),
                Mobile_smallXXX ? 580:Mobile_smallXX ? 480:Mobile_smallX ? 430:Mobile ? 540:Math.floor(canvas.width/2) + 240,
                Mobile_smallYYYY ? 206:Mobile_smallYYY ? 195:Mobile_smallYY ? 175:Mobile_smallY ? 152:Mobile ? 162:252,
                "white", Mobile ? 18:26
            )
            if (player1Field.get() < -4500) {}
            else {
                player1Field.update(-7)
            }
        } else {
            textScores_5.draw("0000",
                Mobile_smallXXX ? 580:Mobile_smallXX ? 480:Mobile_smallX ? 430:Mobile ? 540:Math.floor(canvas.width/2)+Math.floor(canvas.width/6),
                Mobile_smallYYYY ? 206:Mobile_smallYYY ? 195:Mobile_smallYY ? 175:Mobile_smallY ? 152:Mobile ? 162:252,
                "white", Mobile ? 18:26
            )
        }
    
        if (keys.right.pressed && player.x < 530) {
            player.x += 5;
        } else player.x += 0;
    
        if (keys.up.pressed && player.y > 30 && player.y >= 520) {
            player.velocity.y -= 5
        }
    
        if (player1Field.get() <= -4500 && cpuField.get() <= -4420) {
            clearInterval(counter);
            clearInterval(counter_2);
            cancelAnimationFrame(requestId_3);
            player.draw();
            cpu.draw();
            showModal();
            return null;
        }
    }
    player1Field.fixY();
    cpuField.fixY();
    
    booostPlayer.draw()
    runBoostPlayer.draw()
    cpu.update();
    cpu.draw();
    player.update();
    player.draw();
}

let body = document.querySelector("body");
const showModal = async () => {
    third_audio.pause();
    third_audio.src = third_audio.src;
    third_audio.removeEventListener("ended", function() {})
    let last_audio = new Audio('Join_file_153558104.mp3');
    last_audio.play();
    last_audio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);

    let playerWon = (player1Field.get() <= -4500 && cpuField.get() <= -4420) ? (
        (localStorage.getItem("player1") !== null && localStorage.getItem("cpu") !== null) ? (
            (parseFloat(localStorage.getItem("player1")) < parseFloat(localStorage.getItem("cpu"))) ?
                true:false
        ):""
    ):"";

    let sendPlayerData = (player1Field.get() <= -4500 && cpuField.get() <= -4420) ? (
        (localStorage.getItem("player1") !== null && localStorage.getItem("cpu") !== null) ? true:false
    ):"";

    const modal = document.createElement("div");
    modal.className += "modal fade";
    modal.setAttribute('id','congratsModal');
    modal.innerHTML = `
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Congrats</h5>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
                <p style="color: green">${playerWon ? "Congrats to the ":""}player ${playerWon ? "for finishing in: ":"finished in: "} ${localStorage.getItem("player1")}</p>
                <p style="color: blue">Thanks for participating in the Wish Raffle. Winners will be contacted on 08/31/2022 via email.</p>
            </div>
        </div>
    </div>`;
    document.body.appendChild(modal);
    $('#congratsModal').modal({backdrop: 'static', keyboard: false}, 'show');
    $("#congratsModal").modal('show');

    if (sendPlayerData) {
        let email = localStorage.getItem("email") !== null ? localStorage.getItem("email"):"example@gmail.com";
        let score = localStorage.getItem("player1") !== null ? localStorage.getItem("player1"):"";
        const API = axios.create({
            baseURL: 'https://trackraffle.herokuapp.com',
            withCredentials: true
        });
        await API.post("/api/score", { email, score });
    }

    let Timeout = setTimeout(() => {
        location.replace("https://wishatl.com");
        clearTimeout(Timeout)
    }, 30000);
}

let first_audio = new Audio('Join_file_122423850.mp3');
if (increamentValue === 0) {
    first_audio.play();
    first_audio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
}

addEventListener("keydown", ({ keyCode }) => {
    switch (keyCode) {
        case 13:
            if (body && body.classList.contains("modal-open")) {} else {
                if (increamentValue === 0) {
                    first_audio.pause();
                    first_audio.src = first_audio.src;
                    first_audio.removeEventListener("ended", function() {})
                    let second_audio = new Audio('Join_file_145229081.mp3');
                    second_audio.play();
                    if (localStorage.getItem("player1") !== null) { localStorage.removeItem("player1"); }
                    if (localStorage.getItem("cpu") !== null) { localStorage.removeItem("cpu"); }
                    animate(true);
                }
                increamentValue++;
            }
        case 37:
            keys.left.pressed = true;
            break;
        case 38:
            keys.up.pressed = true;
            break;
        case 39:
            break;
        case 40:
            break;
    }
})

addEventListener("keyup", ({ keyCode }) => {
    switch (keyCode) {
        case 37:
            keys.left.pressed = false;
            break;
        case 38:
            keys.up.pressed = false;
            break;
        case 39:
            break;
        case 40:
            break;
    }
})

// addEventListener("scroll", function(e) {
//     if (Mobile && window.innerHeight > window.innerWidth) {
//         canvas.width = innerHeight;
//         canvas.height = innerWidth;
//     } else if (Mobile && window.innerHeight < window.innerWidth) {
//         canvas.width = innerWidth;
//         canvas.height = innerHeight;
//     } 
//     document.documentElement.requestFullscreen({ navigationUI: "hide" });
// })

addEventListener("resize", function(e) {
    if (Mobile && window.innerHeight > window.innerWidth) {
        canvas.width = innerHeight;
        canvas.height = innerWidth;
        // document.documentElement.requestFullscreen({ navigationUI: "hide" });
    } else if (Mobile && window.innerHeight < window.innerWidth) {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        // document.documentElement.requestFullscreen({ navigationUI: "hide" });
        screen.orientation.lock('landscape').then(() => {}).catch(() => console.log("err"));
    } else {
        // if (document.body) {
        //     document.body.style.overflow = "hidden"
        // }
        canvas.width = innerWidth;
        canvas.height = innerHeight;
    }
})

const canvasElement = document.querySelector('canvas')
let elementIsClicked = false;
canvas.addEventListener('mouseup', function(e) {
    let timeOut_2 = setTimeout(() => {
        if (elementIsClicked) {
            elementIsClicked = false;
        }
        clearTimeout(timeOut_2);
    }, 25);
})

canvas.addEventListener('click', function(e) {
    getCursorPosition(canvas, e);

    if (body && body.classList.contains("modal-open")) {
    } else {
        // alert("clicking is working")
        Mobile_smallX = canvas.width >= 650 && canvas.width < 700;
        Mobile_smallXX = canvas.width >= 700 && canvas.width <= 760;
        Mobile_smallXXX = canvas.width >= 880 && canvas.width <= 930;

        Mobile_smallY = canvas.height >= 360 && canvas.height <= 374;
        Mobile_smallYY = canvas.height >= 380 && canvas.height <= 400;
        Mobile_smallYYY = canvas.height >= 400 && canvas.height <= 420;
        Mobile_smallYYYY = canvas.height >= 420 && canvas.height <= 440;
        if (/Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            document.documentElement.requestFullscreen({ navigationUI: "hide" });
        }
        if (Mobile && window.innerHeight > window.innerWidth) {
            canvas.width = innerHeight;
            canvas.height = innerWidth;
        } else if (Mobile && window.innerHeight < window.innerWidth) {
            canvas.width = innerWidth;
            canvas.height = innerHeight;
        } 
        if (increamentValue === 0) {
            getTapPosition(canvas, e)
        }
    }
})

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    if (Mobile) {
        let confirmX = x <= (canvas.width - 60) && x >= (canvas.width - 140)
        let confirmY = y <= (canvas.height - 10) && y >= (canvas.height - 90)
        if (confirmX && confirmY && player1Field.get() > -4500) {
            elementIsClicked = true;
            if (timerMS > 3) {
                keys.right.pressed = true;
                player.sprites.run = true;
                player.numberOfFrames = 4;
                player1Field.update(-15)
            }
    
        }
    } else {
        let confirmX = x <= (innerWidth - 125) && x >= (innerWidth - 275);
        let confirmY = y <= (innerHeight - 15) && y >= (innerHeight - 165);
        if (confirmX && confirmY && player1Field.get() > -4500) {
            elementIsClicked = true;
            if (timerMS > 3) {
                keys.right.pressed = true;
                player.sprites.run = true;
                player.numberOfFrames = 4;
                player1Field.update(-15)
            }
    
        }
    }
}

function getTapPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    let confirmX = x <= (Math.floor(canvas.width/2) + 120) && x >= (Math.floor(canvas.width/2) - 120)
    let confirmY = y <= (Math.floor(canvas.height/2) + 40) && y >= (Math.floor(canvas.height/2) - 25);

    if (canvas.width <= 1280) {
        confirmX = x <= (Math.floor(canvas.width/2) + 100) && x >= (Math.floor(canvas.width/2) - 90)
    }

    // if (confirmX && confirmY && player1Field.get() > -4500) {
        first_audio.pause();
        first_audio.src = first_audio.src;
        first_audio.removeEventListener("ended", function() {})
        let second_audio = new Audio('Join_file_145229081.mp3');
        second_audio.play();
        if (localStorage.getItem("player1") !== null) { localStorage.removeItem("player1"); }
        if (localStorage.getItem("cpu") !== null) { localStorage.removeItem("cpu"); }
        // alert("the second alert is it working!?")
        animate(true);
        increamentValue++;
    // }
}

function isElementClicked() {
    if (!elementIsClicked) {
        keys.right.pressed = false;
        player.sprites.run = false;
        player.numberOfFrames = 1;
    }
}
setInterval(isElementClicked, 1000);