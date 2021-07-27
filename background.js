let hours = 0;
let mins = 0;
let secs = 0;
let totalHours = 0;
let totalMins = 0;
let totalSecs = 0;
let storedURL = "";

let a = document.createElement("span");
a.setAttribute("id", "watchTime");
a.setAttribute("style", "font-size: 14px; font-weight: bold; padding: 5px 8px; background: #0f0f0f; border-radius: 4px; color: #777777;");
a.innerText = "Calculating";

let text = document.querySelector("h1#title");
text.insertAdjacentElement("afterend", a);

let btn = document.getElementById("watchTime");

btn.addEventListener("click", calcWatchTime);

function calcWatchTime() {
    storedURL = document.URL;

    totalHours = totalMins = totalSecs = hours = mins = secs = 0;
    let allVids = document.querySelectorAll('ytd-playlist-video-renderer span.ytd-thumbnail-overlay-time-status-renderer');

    for(a of allVids) {
        let tempArr = a.innerText.split(":").reverse();
        secs = Number(tempArr[0]);
        mins = Number(tempArr[1]);
        hours = Number(tempArr[2]);

        if(secs > 0) { totalSecs += secs; }
        if(mins > 0) { totalSecs += (mins * 60) ; }
        if(hours > 0) { totalSecs += (hours * 3600) ; }
    }

    
    totalHours = Math.floor(totalSecs/3600);
    totalMins = Math.floor(totalSecs/60) - (totalHours*60);
    let secsLeft = totalSecs - (totalHours*3600 + totalMins*60);

    let timeLeft = "Calculating";


    if(totalHours > 0) {
        if(totalHours == 1) {
            timeLeft = `${totalHours}hr `;
        } else {
            timeLeft = `${totalHours}hrs `;
        }
    } else {
        timeLeft = "";
    }
    
    
    if(totalMins > 0) {
        if(totalMins == 1) {
            timeLeft += `${totalMins}min `;
        } else {
            timeLeft += `${totalMins}mins `;
        }
    }

    if(secsLeft > 0) {
        if(secsLeft == 1) {
            timeLeft += `${secsLeft}sec `;
        } else {
            timeLeft += `${secsLeft}secs `;
        }
    }
    
    btn.innerText = timeLeft;

}

// function checkURL() {
//     if(storedURL !== document.URL) {
//         calcWatchTime();
//     }
// }

setInterval(calcWatchTime, 1000);