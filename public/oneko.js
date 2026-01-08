var nekoEl = document.createElement("div");

function neko() {
    var header = document.querySelector("h1");
    if (!header) return;

    var scrollContainer = document.getElementById("main-content") || document.body;

    var scroll = scrollContainer.scrollTop;
    var range = document.createRange();
    range.selectNodeContents(header.firstChild || header);
    var headerPos = range.getBoundingClientRect();
    var containerPos = scrollContainer.getBoundingClientRect();

    var nekoPosX = headerPos.right - containerPos.left + 16;
    var nekoPosY = headerPos.top - containerPos.top + scroll + (headerPos.height / 2) + 3;

    var mousePosX = 0;
    var mousePosY = 0;

    var sleeping = true;
    var returning = false;
    var idleAnimation = "sleeping";
    var idleAnimationFrame = 0;
    var justAwake = false;

    function onScroll(event) {
        scroll = scrollContainer.scrollTop;
    }
    scrollContainer.addEventListener("scroll", onScroll);

    function getSleepPosition() {
        range = document.createRange();
        range.selectNodeContents(header.firstChild || header);
        headerPos = range.getBoundingClientRect();
        containerPos = scrollContainer.getBoundingClientRect();

        return {
            x: headerPos.right - containerPos.left + 16,
            y: headerPos.top - containerPos.top + scroll + (headerPos.height / 2) + 3
        };
    }

    function onResize() {
        if (sleeping) {
            scroll = scrollContainer.scrollTop;
            var pos = getSleepPosition();
            nekoPosX = pos.x;
            nekoPosY = pos.y;
            nekoEl.style.left = nekoPosX - 16 + "px";
            nekoEl.style.top = nekoPosY - 16 + "px";
        }
    }
    window.addEventListener("resize", onResize);
    setTimeout(function () { onResize() }, 500);

    var resizeObserver = new ResizeObserver(function (entries) {
        onResize();
    });
    resizeObserver.observe(header);

    var frameCount = 0;
    var idleTime = 0;

    var nekoSpeed = 10;
    var spriteSets = {
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
        ]
    };

    function init() {
        nekoEl.id = "oneko";
        nekoEl.ariaHidden = true;
        nekoEl.style.width = "32px";
        nekoEl.style.height = "32px";
        nekoEl.style.position = "absolute";
        nekoEl.style.backgroundImage = "url('/oneko.gif')";
        nekoEl.style.imageRendering = "pixelated";
        nekoEl.style.left = nekoPosX - 16 + "px";
        nekoEl.style.top = nekoPosY - 16 + "px";
        nekoEl.style.zIndex = 2147483647;

        if (sleeping) {
            nekoEl.style.cursor = "pointer";
        } else {
            nekoEl.style.pointerEvents = "auto";
            nekoEl.style.position = "fixed";
        }

        nekoEl.onclick = function () {
            if (sleeping) {
                sleeping = false;
                justAwake = true;
                idleAnimation = null;
                idleTime = 999;

                var nekoRect = nekoEl.getBoundingClientRect();
                nekoPosX = nekoRect.left + 16;
                nekoPosY = nekoRect.top + 16;

                nekoEl.style.left = nekoPosX - 16 + "px";
                nekoEl.style.top = nekoPosY - 16 + "px";
                nekoEl.style.position = "fixed";

                nekoEl.style.pointerEvents = "auto";
                nekoEl.style.cursor = "pointer";

                resizeObserver.disconnect();
            } else if (!returning) {
                returning = true;
                nekoEl.style.position = "fixed";
                nekoEl.style.pointerEvents = "none";
            }
        };

        scrollContainer.appendChild(nekoEl);

        document.addEventListener("mousemove", function (event) {
            if (!returning) {
                mousePosX = event.clientX;
                mousePosY = event.clientY;
            }
        });

        window.requestAnimationFrame(onAnimationFrame);
    }

    var lastFrameTimestamp;

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
        var sprite = spriteSets[name][frame % spriteSets[name].length];
        nekoEl.style.backgroundPosition = (sprite[0] * 32 + "px ") + (sprite[1] * 32) + "px";
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
            var availableIdleAnimations = ["sleeping", "scratchSelf"];
            if (nekoPosX < 32) {
                availableIdleAnimations.push("scratchWallW");
            }
            if (nekoPosY < 32) {
                availableIdleAnimations.push("scratchWallN");
            }
            if (nekoPosX > window.innerWidth - 32) {
                availableIdleAnimations.push("scratchWallE");
            }
            if (nekoPosY > window.innerHeight - 32) {
                availableIdleAnimations.push("scratchWallS");
            }
            idleAnimation =
                availableIdleAnimations[
                Math.floor(Math.random() * availableIdleAnimations.length)
                ];
        }

        switch (idleAnimation) {
            case "sleeping":
                if (idleAnimationFrame < 8 && !sleeping) {
                    setSprite("tired", 0);
                    break;
                }
                setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
                if (idleAnimationFrame > 192 && !sleeping) {
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

        if (returning) {
            range = document.createRange();
            range.selectNodeContents(header.firstChild || header);
            var rect = range.getBoundingClientRect();

            mousePosX = rect.right + 16;
            mousePosY = rect.top + (rect.height / 2) + 3;
        }

        var diffX = nekoPosX - mousePosX;
        var diffY = nekoPosY - mousePosY;
        var distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));

        if (!justAwake && (distance < nekoSpeed || distance < 48 || sleeping)) {
            if (returning) {
                returning = false;
                sleeping = true;
                idleAnimation = "sleeping";
                idleAnimationFrame = 0;

                onResize();

                nekoEl.style.position = "absolute";
                nekoEl.style.cursor = "pointer";
                nekoEl.style.pointerEvents = "auto";

                resizeObserver.observe(header);
                return;
            }

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

        justAwake = false;

        var direction;
        direction = diffY / distance > 0.5 ? "N" : "";
        direction += diffY / distance < -0.5 ? "S" : "";
        direction += diffX / distance > 0.5 ? "W" : "";
        direction += diffX / distance < -0.5 ? "E" : "";
        setSprite(direction, frameCount);

        nekoPosX -= (diffX / distance) * nekoSpeed;
        nekoPosY -= (diffY / distance) * nekoSpeed;

        if (!returning) {
            nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16);
            nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16);
        }

        nekoEl.style.left = nekoPosX - 16 + "px";
        nekoEl.style.top = nekoPosY - 16 + "px";
    }

    init();
}

try {
    neko();
} catch (e) {
    console.error("oneko.js error:", e);
    try {
        nekoEl.parentElement.removeChild(nekoEl);
    } catch (e) { }
}
