function showText(current) {
    console.log(document.querySelector('.shade').style.visibility)
    if (document.querySelector('.shade').style.visibility == "visible" || document.querySelector('.introText').style.visibility == "visible") {
        const list = document.querySelectorAll('.introText');
        document.querySelector('.shade').style.visibility = "hidden";
        list.forEach(function(element) {
            element.style.visibility = "hidden";
        })
    } else {
        document.querySelector('.shade').style.visibility = "visible";
        document.getElementById(current.className).style.visibility = "visible";

    }
}