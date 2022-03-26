
document.querySelector("button").addEventListener("click", maFunc)






function maFunc() {
    fetch("https://api.tisseo.fr/v1/lines.json?key=a3732a1074e2403ce364ad6e71eb998cb")
        .then(response => response.json())
        .then(data => {
            if ("lines" in data && "line" in data.lines) {
                firstList(data.lines.line);
            }
            for (const li of document.querySelectorAll("li")) {
                li.addEventListener("click", maFunc2)
            }
        }
        )
        .catch(err => console.error(err));
}

function firstList(lines) {
    let codeHtml = "";
    lines.forEach(
        ligne => {
            codeHtml += "<li id=" + ligne.id + ">" + ligne.name + "</li>"

        }
    )
    document.querySelector("ul.ligne").innerHTML = codeHtml;

}



function maFunc2(event) {
    fetch(`https://api.tisseo.fr/v1/stop_points.json?key=a3732a1074e2403ce364ad6e71eb998cb&lineId=${event.target.id}`)
        .then(response => response.json())
        .then(data => {
            if ("physicalStops" in data && "physicalStop" in data.physicalStops) {
                secondList(data.physicalStops.physicalStop)
            }
            for (const li of document.querySelectorAll(".stop li")) {
                li.addEventListener("click", maFunc3)
            }
        }
        )
    }

function secondList(stops) {
    let codeHtml = "";
    stops.forEach(
            stop => {
                codeHtml += "<li id=" + stop.id + ">" + stop.name + "</li>"
            }
        )
    document.querySelector("ul.stop").innerHTML = codeHtml;
}

function maFunc3(event) {
    fetch(`https://api.tisseo.fr/v1/stops_schedules.json?key=a3732a1074e2403ce364ad6e71eb998cb&stopPointId=${event.target.id}`)
        .then(response => response.json())
        .then(data => {
            if ("departures" in data && "departure" in data.departures) {
                thirdList(data.departures.departure)
            }
            
        }
        )
    }

function thirdList(horaires) {
    let codeHtml = "";
    horaires.forEach(
            horaire => {
                codeHtml += "<li>" + horaire.dateTime + "</li>"
            }
        )
    document.querySelector("ul.horaire").innerHTML = codeHtml;
}