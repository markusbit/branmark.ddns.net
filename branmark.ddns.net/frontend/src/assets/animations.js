function initRubberBand() {
    const bouncy = document.querySelectorAll(".bouncy");
    bouncy.forEach(element => {
        element.addEventListener("mouseenter", toggleRubberBand);
    });
}

function toggleRubberBand(e) {
    const bouncy = document.querySelectorAll(".bouncy");
    bouncy.forEach(element => {
        if (e != null) {
            if (element == e.srcElement) {
                element.classList.add("bouncing");
                element.addEventListener("animationend", () => {
                    element.classList.remove("bouncing");
                });
            }
        } 
    });
}