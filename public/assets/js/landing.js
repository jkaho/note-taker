// Changes landing page image according to screen size
const notesImg = document.getElementById("notes-img");
function responsiveNotesImg() {
    if (window.innerWidth > 950) {
        notesImg.setAttribute("src", "assets/images/notes-lg.png");
    } else if (window.innerWidth > 550 && window.innerWidth <= 950) {
        notesImg.setAttribute("src", "assets/images/notes-md.png");
    } else {
        notesImg.setAttribute("src", "assets/images/notes-sm.png");
    }
};

responsiveNotesImg();
window.addEventListener("resize", responsiveNotesImg);