// oneko.js: https://github.com/adryd325/oneko.js

(function oneko() {
    const isReducedMotion =
        window.matchMedia(`(prefers-reduced-motion: reduce)`) === true ||
        window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;

    if (isReducedMotion) return;

    const nekoEl = document.createElement("div");
    let persistPosition = true;

    let nekoPosX = 32;
    let nekoPosY = 32;

    let mousePosX = 0;
    let mousePosY = 0;

    let frameCount = 0;
    let idleTime = 0;
    let idleAnimation = "sleeping";
    let idleAnimationFrame = 8;
    let isAwake = false;

    const nekoSpeed = 10;
    const spriteSets = {
        idle: [[-3, -3]],
        alert: [[-7, -3]],
        scratchSelf: [
            [-5, 0],
            [-6, 0],
            [-7, 0],
        ],
        scratchWallN: [
            [0, 0],
            [0, -1],
        ],
        scratchWallS: [
            [-7, -1],
            [-6, -2],
        ],
        scratchWallE: [
            [-2, -2],
            [-2, -3],
        ],
        scratchWallW: [
            [-4, 0],
            [-4, -1],
        ],
        tired: [[-3, -2]],
        sleeping: [
            [-2, 0],
            [-2, -1],
        ],
        N: [
            [-1, -2],
            [-1, -3],
        ],
        NE: [
            [0, -2],
            [0, -3],
        ],
        E: [
            [-3, 0],
            [-3, -1],
        ],
        SE: [
            [-5, -1],
            [-5, -2],
        ],
        S: [
            [-6, -3],
            [-7, -2],
        ],
        SW: [
            [-5, -3],
            [-6, -1],
        ],
        W: [
            [-4, -2],
            [-4, -3],
        ],
        NW: [
            [-1, 0],
            [-1, -1],
        ],
    };

    function init() {
        let nekoFile = "/oneko.gif";
        const curScript = document.currentScript;
        if (curScript && curScript.dataset.cat) {
            nekoFile = curScript.dataset.cat;
        }
        if (curScript && curScript.dataset.persistPosition) {
            if (curScript.dataset.persistPosition === "") {
                persistPosition = true;
            } else {
                persistPosition = JSON.parse(curScript.dataset.persistPosition.toLowerCase());
            }
        }

        const nameElement = document.querySelector('h1');
        if (nameElement) {
            const range = document.createRange();
            range.selectNodeContents(nameElement);
            const textRect = range.getBoundingClientRect();
            nekoPosX = textRect.right + 20 + window.scrollX;
            nekoPosY = textRect.top + textRect.height / 2 + window.scrollY;
            mousePosX = nekoPosX;
            mousePosY = nekoPosY;
        }

        setSprite("sleeping", 0);

        nekoEl.id = "oneko";
        nekoEl.ariaHidden = true;
        nekoEl.style.width = "32px";
        nekoEl.style.height = "32px";
        nekoEl.style.position = "absolute";
        nekoEl.style.pointerEvents = "auto";
        nekoEl.style.cursor = "pointer";
        nekoEl.style.imageRendering = "pixelated";
        nekoEl.style.left = `${nekoPosX - 16}px`;
        nekoEl.style.top = `${nekoPosY - 16}px`;
        nekoEl.style.zIndex = 2147483647;

        nekoEl.style.backgroundImage = `url(${nekoFile})`;

        document.body.appendChild(nekoEl);

        nekoEl.addEventListener("click", function () {
            if (!isAwake) {
                isAwake = true;
                idleAnimation = null;
                idleAnimationFrame = 0;
                idleTime = 0;
                setSprite("alert", 0);
            }
        });

        document.addEventListener("mousemove", function (event) {
            if (isAwake) {
                mousePosX = event.pageX;
                mousePosY = event.pageY;
            }
        });

        if (persistPosition) {
            window.addEventListener("beforeunload", function (event) {
                window.localStorage.setItem("oneko", JSON.stringify({
                    nekoPosX: nekoPosX,
                    nekoPosY: nekoPosY,
                    mousePosX: mousePosX,
                    mousePosY: mousePosY,
                    frameCount: frameCount,
                    idleTime: idleTime,
                    idleAnimation: idleAnimation,
                    idleAnimationFrame: idleAnimationFrame,
                    bgPos: nekoEl.style.backgroundPosition
                }));
            });
        }

        window.requestAnimationFrame(onAnimationFrame);
    }

    let lastFrameTimestamp;

    function onAnimationFrame(timestamp) {
        if (!nekoEl.isConnected) {
            return;
        }
        if (!lastFrameTimestamp) {
            lastFrameTimestamp = timestamp;
        }
        if (timestamp - lastFrameTimestamp > 100) {
            lastFrameTimestamp = timestamp;
            frame();
        }
        window.requestAnimationFrame(onAnimationFrame);
    }

    function setSprite(name, frame) {
        const sprite = spriteSets[name][frame % spriteSets[name].length];
        nekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
    }

    function resetIdleAnimation() {
        idleAnimation = null;
        idleAnimationFrame = 0;
    }

    function idle() {
        idleTime += 1;

        if (
            idleTime > 10 &&
            Math.floor(Math.random() * 200) == 0 &&
            idleAnimation == null
        ) {
            let avalibleIdleAnimations = ["sleeping", "scratchSelf"];
            if (nekoPosX < 32) {
                avalibleIdleAnimations.push("scratchWallW");
            }
            if (nekoPosY < 32) {
                avalibleIdleAnimations.push("scratchWallN");
            }
            if (nekoPosX > window.innerWidth - 32) {
                avalibleIdleAnimations.push("scratchWallE");
            }
            if (nekoPosY > window.innerHeight - 32) {
                avalibleIdleAnimations.push("scratchWallS");
            }
            idleAnimation =
                avalibleIdleAnimations[
                Math.floor(Math.random() * avalibleIdleAnimations.length)
                ];
        }

        switch (idleAnimation) {
            case "sleeping":
                if (idleAnimationFrame < 8) {
                    setSprite("tired", 0);
                    break;
                }
                setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
                if (idleAnimationFrame > 192) {
                    resetIdleAnimation();
                }
                break;
            case "scratchWallN":
            case "scratchWallS":
            case "scratchWallE":
            case "scratchWallW":
            case "scratchSelf":
                setSprite(idleAnimation, idleAnimationFrame);
                if (idleAnimationFrame > 9) {
                    resetIdleAnimation();
                }
                break;
            default:
                setSprite("idle", 0);
                return;
        }
        idleAnimationFrame += 1;
    }

    function frame() {
        frameCount += 1;

        if (!isAwake) {
            setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
            idleAnimationFrame += 1;
            if (idleAnimationFrame > 192) idleAnimationFrame = 8;
            return;
        }

        const diffX = nekoPosX - mousePosX;
        const diffY = nekoPosY - mousePosY;
        const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

        if (distance < nekoSpeed || distance < 48) {
            idle();
            return;
        }

        idleAnimation = null;
        idleAnimationFrame = 0;

        if (idleTime > 1) {
            setSprite("alert", 0);
            idleTime = Math.min(idleTime, 7);
            idleTime -= 1;
            return;
        }

        let direction;
        direction = diffY / distance > 0.5 ? "N" : "";
        direction += diffY / distance < -0.5 ? "S" : "";
        direction += diffX / distance > 0.5 ? "W" : "";
        direction += diffX / distance < -0.5 ? "E" : "";
        setSprite(direction, frameCount);

        nekoPosX -= (diffX / distance) * nekoSpeed;
        nekoPosY -= (diffY / distance) * nekoSpeed;

        nekoPosX = Math.min(Math.max(16, nekoPosX), document.documentElement.scrollWidth - 16);
        nekoPosY = Math.min(Math.max(16, nekoPosY), document.documentElement.scrollHeight - 16);

        nekoEl.style.left = `${nekoPosX - 16}px`;
        nekoEl.style.top = `${nekoPosY - 16}px`;
    }

    init();
})();
