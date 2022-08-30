const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

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
const Mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
// if (Mobile && window.innerHeight > window.innerWidth) {

const containerElm = document.querySelector("#container");
if (Mobile) {
    if(containerElm && containerElm.requestFullscreen)
        containerElm.requestFullscreen();
    else if(containerElm && containerElm.webkitRequestFullScreen)
	    containerElm.webkitRequestFullScreen();

    // screen.orientation.lock("portrait")
    screen.orientation.lock('landscape-primary').then(() => {}).catch(() => console.log("err"));
    // console.log("screen.orientation: ", screen.orientation);
    // console.log("screen: ", screen);
    // $('body').css({
    //     "-webkit-transform": "rotate(90deg)"
    // }); 
    // "-webkit-transform": "rotate(90deg)"
    // screen.lockOrientation("orientation");
}
const Mobile_smallX = innerWidth >= 650 && innerWidth < 700;
const Mobile_smallXX = innerWidth >= 700 && innerWidth <= 760;
const Mobile_smallXXX = innerWidth >= 880 && innerWidth <= 930;

const Mobile_smallY = innerHeight >= 360 && innerHeight <= 374;
const Mobile_smallYY = innerHeight >= 380 && innerHeight <= 400;
const Mobile_smallYYY = innerHeight >= 400 && innerHeight <= 420;
const Mobile_smallYYYY = innerHeight >= 420 && innerHeight <= 440;
// const Mobile_smallYYY = innerHeight >= 420 && innerHeight <= 430;

// const Mobile_large = innerWidth >= 880 && innerWidth < 930;
console.log("mobile", Mobile);

class DefaultScreen {
    draw() {
        c.fillRect(0, 0, innerWidth, innerHeight)
        c.fillStyle = "#000";
    }
};

class HomePage {
    constructor() {
        this.position = {
            x: 0,
            y: 0
        };
        this.width = innerWidth;
        this.height = innerHeight;
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
            // console.log("passed");
            // console.log("this.position.x: ", this.position.x);
            // console.log("width: ", innerWidth);
            if (this.position.x < innerWidth + 10) {
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
            x: Math.floor(-innerWidth/2) - 300,
            y: 0
        };
        this.width = innerWidth;
        this.height = innerHeight;
        this.done = false;
    }

    draw(imgsource) {
        var img = new Image();
        img.src = imgsource;
        c.drawImage(img, this.position.x, this.position.y, this.width, this.height);
    }
    update() {
        if (!this.done) {
            if (this.position.x < Math.floor(innerWidth/2) - 550) {
                this.position.x += 5;
            } else {
                this.position.x = 0;
                this.done = true;
            }
        }
    }
};
class RunningGuy {
    constructor() {
        this.spritesheet;                               //the spritesheet image
        this.x = -140;                                //the x coordinate of the object
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
        this.x = 82;                                                //the x coordinate of the object
        this.y = Mobile ? (innerHeight - 86):innerHeight - 150;     //the y coordinate of the object
        this.width = Mobile ? 269:478;                              //width of spritesheet
        this.height = 75;                                           //height of spritesheet
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
            // context.drawImage(
            //     this.spritesheet,
            //     this.frameIndex*this.width/this.numberOfFrames,
            //     0,
            //     this.width/this.numberOfFrames,
            //     this.height,
            //     x,
            //     y,
            //     this.width/this.numberOfFrames,
            //     this.height
            // );
            if (Mobile) {
                heroSpritesheet.src = "./player-mobile.png";
            } else {
                heroSpritesheet.src = "./player.png";
            }
            c.drawImage(
                heroSpritesheet,
                this.frameIndex*500,
                0,
                75,
                75,
                this.x,
                this.y - 5,
                75,
                75
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
    }
};
class BooostPlayer {
    draw() {
        const circle = new Path2D();
        if (Mobile) {
            circle.arc(innerWidth - 100, innerHeight - 50, 40, 0, 2 * Math.PI);
        } else {
            circle.arc(innerWidth - 200, innerHeight - 90, 75, 0, 2 * Math.PI);
        }
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
            c.fillText("Run", innerWidth - 130, innerHeight - 40)
        } else {
            c.fillText("Run", innerWidth - 230, innerHeight - 80)
        }
    }
}


class CPU {
    constructor() {
        this.spritesheet;                       //the spritesheet image
        this.x = 125;                            //the x coordinate of the object
        this.y = Mobile ? (innerHeight - 153):innerHeight - 262;             //the y coordinate of the object
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
                75,
                75,
                this.x,
                this.y -5,
                75,
                75
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
    }
};

class Player1Field {
    constructor() {
        this.position = {
            x: 0,
            y: Mobile ? (innerHeight - 68):(innerHeight - 116)
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
}
class CpuField {
    constructor() {
        this.position = {
            x: 0,
            y: Mobile ? (innerHeight - 113):(innerHeight - 192)
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
}

class Crowd {
    constructor() {
        this.position = {
            x: 0,
            y: Mobile ? (innerHeight - 183):innerHeight - 315
        },
        this.width = 6673,
        this.height = Mobile ? 35:63
    }

    draw() {
        var img = new Image();
        img.src = "./crowd.png";
        c.drawImage(img, this.position.x, this.position.y, this.width, this.height);
    }
    update(x) {
        this.position.x += x;
    }
}
class Crowdv2 {
    constructor() {
        this.position = {
            x: 0,
            y: Mobile ? (innerHeight - 148):innerHeight - 253
        },
        this.width = 6673,
        this.height = Mobile ? 35:62
    }

    draw() {
        var img = new Image();
        img.src = "./crowd_v2.png";
        c.drawImage(img, this.position.x, this.position.y, this.width, this.height);
    }
    get() {
        return this.position.x;
    }
    update(x) {
        this.position.x += x;
    }
}
class Scores {
    constructor() {
        this.position = {
            x: 0,
            y: 0
        },
        this.width = innerWidth,
        this.height = Mobile ? innerHeight - 183:300
    }

    draw() {
        var img = new Image();
        img.src = "./scores.png";
        c.drawImage(img, 0, this.position.y, innerWidth, this.height);
    }
}
class RoundedRect {
    constructor() {
        this.position = {
            x: 0,
            y: 0
        }
    }

    draw() {
        if (Mobile_smallYYYY) {
            c.roundRect(innerWidth-300, 130, 160, 30, 16).stroke(); //or .fill() for a filled rect
            c.lineWidth = 4
        } else if (Mobile_smallYYY) {
            c.roundRect(innerWidth-300, 120, 160, 30, 16).stroke(); //or .fill() for a filled rect
            c.lineWidth = 4
        } else if (Mobile_smallYY) {
            c.roundRect(innerWidth-300, 105, 160, 30, 16).stroke(); //or .fill() for a filled rect
            c.lineWidth = 4
        } else if (Mobile_smallY) {
            c.roundRect(innerWidth-300, 88, 160, 30, 16).stroke(); //or .fill() for a filled rect
            c.lineWidth = 4
        } else if (Mobile) {
            c.roundRect(innerWidth-300, 95, 160, 30, 16).stroke(); //or .fill() for a filled rect
            c.lineWidth = 4
        } else {
            c.roundRect(innerWidth-360, 150, 160, 40, 16).stroke(); //or .fill() for a filled rect
            c.lineWidth = 6
        }
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
    defaultScreen.draw();
    homePageAnimation.draw("Track and Field.png");
    homePageAnimation.update();
    runningGuy.update();
    runningGuy.draw();
};intro();

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
    
    scores.draw();
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
            Mobile_smallXXX ? 580:Mobile_smallXX ? 480:Mobile_smallX ? 430:Mobile ? 540:Math.floor(innerWidth/2) + 240,
            Mobile_smallYYYY ? 206:Mobile_smallYYY ? 195:Mobile_smallYY ? 175:Mobile_smallY ? 152:Mobile ? 162:252,
            "white", Mobile ? 18:26
        )
        
        timerMS_2 = -3;
        count_2 = -3;
        startCircles.draw("⚪", (innerWidth/2) - 200, (innerHeight/2), 100)
    } if (timerMS > 1.6 && timerMS < 3) {
        startCircles.draw("🔵", (innerWidth/2) - 50, (innerHeight/2), 100)
    } if (timerMS > 2.6 && timerMS < 3) {
        startCircles.draw("🟢", (innerWidth/2) + 100, (innerHeight/2), 100)
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
        , Mobile ? innerWidth-260:innerWidth-335,
            Mobile_smallYYYY ? 155:Mobile_smallYYY ? 144:Mobile_smallYY ? 128:Mobile_smallY ? 112:Mobile ? 120:183,
            "white", Mobile ? 17:22
        )
    

        if (!localStorage.getItem("player1")) {
            textScores_2.draw("⚪⚪⚪",
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
            textScores_3.draw("⚪⚪⚪",
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
                Mobile_smallXXX ? 580:Mobile_smallXX ? 480:Mobile_smallX ? 430:Mobile ? 540:Math.floor(innerWidth/2) + 240,
                Mobile_smallYYYY ? 206:Mobile_smallYYY ? 195:Mobile_smallYY ? 175:Mobile_smallY ? 152:Mobile ? 162:252,
                "white", Mobile ? 18:26
            )
            if (player1Field.get() < -4500) {}
            else {
                player1Field.update(-7)
            }
        } else {
            textScores_5.draw("0000",
                Mobile_smallXXX ? 580:Mobile_smallXX ? 480:Mobile_smallX ? 430:Mobile ? 540:Math.floor(innerWidth/2)+Math.floor(innerWidth/6),
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
            if (body && body.classList.contains("modal-open")) {

            } else {
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

addEventListener("resize", function(e) {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
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
        getTapPosition(canvas, e)
    }
})

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    if (Mobile) {
        let confirmX = x <= (innerWidth - 60) && x >= (innerWidth - 140)
        let confirmY = y <= (innerHeight - 10) && y >= (innerHeight - 90)
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

    let confirmX = x <= (Math.floor(innerWidth/2) + 120) && x >= (Math.floor(innerWidth/2) - 120)
    let confirmY = y <= (Math.floor(innerHeight/2) + 40) && y >= (Math.floor(innerHeight/2) - 25);

    if (innerWidth <= 1280) {
        confirmX = x <= (Math.floor(innerWidth/2) + 100) && x >= (Math.floor(innerWidth/2) - 90)
    }

    if (confirmX && confirmY && player1Field.get() > -4500) {
        first_audio.pause();
        first_audio.src = first_audio.src;
        first_audio.removeEventListener("ended", function() {})
        let second_audio = new Audio('Join_file_145229081.mp3');
        second_audio.play();
        if (localStorage.getItem("player1") !== null) { localStorage.removeItem("player1"); }
        if (localStorage.getItem("cpu") !== null) { localStorage.removeItem("cpu"); }
        animate(true);
        increamentValue++;
    }
}

function isElementClicked() {
    if (!elementIsClicked) {
        keys.right.pressed = false;
        player.sprites.run = false;
        player.numberOfFrames = 1;
    }
}
setInterval(isElementClicked, 1000);