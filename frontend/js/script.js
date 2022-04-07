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

const covid_api_url = "https://disease.sh/v3/covid-19/all"

fetch(covid_api_url)
.then((response) => {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error("COVID API RESPONSE ERROR");
    }
})
.then(data => {
    console.log(data);
    displayCOVID(data)
})
.catch((error) => console.error("FETTCH ERROR: ", error));

//display function
function displayCOVID(data) {
    document.getElementById("newCases").innerHTML = data.todayCases
    document.getElementById("newDeaths").innerHTML = data.todayDeaths
    document.getElementById("cases").innerHTML = data.cases
    document.getElementById("deaths").innerHTML = data.deaths
}