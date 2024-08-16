console.log("lets write js script")
let currentsong = new Audio()
let songs = [];
let currentfol;
let songUL
function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
}
async function getsongs(folder) {

    currentfol = folder
    let a = await fetch(`http://127.0.0.1:3000/${currentfol}/`)
    let response = await a.text()
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            console.log(songs)
            songs.push(element.href.split(`/${currentfol}/`)[1])
        }
    }
    songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML
            + `<li><img class="invert" src="img/music.svg" alt="">
    <div class="info">
        <div>${song.replaceAll("%20", " ")}</div>
        <div>Song artist</div>
    </div>
    <div class="playnow">
        <span>Play Now</span>
        <img class="invert" src="img/play.svg" alt="">
    </div></li>`;
    }
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", () => {
            playmusic(e.querySelector(".info").getElementsByTagName("div")[0].innerHTML.trim())
        })

    });
    return songs;
}
const playmusic = (track, pause = false) => {
    currentsong.src = `/${currentfol}/` + track

    currentsong.volume = 0.5;
    if (!pause) {
        currentsong.play()
        plays.src = "img/pause.svg"
    }
    document.querySelector(".songinfo").innerHTML = decodeURI(track);
}
currentsong.addEventListener("ended", () => {
    let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0])
    console.log("this is index", index)
    if (index + 1 < songs.length) { playmusic(songs[index + 1]) }
    else (plays.src = "img/play.svg")
})
async function displayalbums() {
    let a = await fetch("http://127.0.0.1:3000/songs/")
    let b = await a.text()
    let div = document.createElement("div")
    div.innerHTML = b
    let anchor = div.getElementsByTagName("a")
    let array = Array.from(anchor)
    for (let index = 0; index < array.length; index++) {
        const e = array[index];
        if (e.href.includes("/songs")) {
            let folder = e.href.split("/").slice(-2)[0]
            let a = await fetch(`http://127.0.0.1:3000/songs/${folder}/info.json`)
            let b = await a.json()
            document.querySelector(".cardcontainer").innerHTML = document.querySelector(".cardcontainer").innerHTML + `<div data-folder= "${folder}" class="card ">
                    <svg class="play" width="100" height="100" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill=#1fdf64 />
                        <polygon points="40,30 40,70 70,50" fill="black" />
                    </svg>
                    <img src="data:image/jpeg;base64,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"
                        alt="">
                    <h2 id=>${b.title}</h2>
                    <p>${b.description}</p>
                </div>`
        }

    };
    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async item => {
            songUL.innerHTML = ""
            document.querySelector(".circle").style.left = 0
            plays.src = "img/play.svg"
            songs = await getsongs(`songs/${item.currentTarget.dataset.folder}`)
            playmusic(songs[0], true)
        })
    });
}

async function main() {
    songs = await getsongs("songs")
    await displayalbums()
    playmusic(songs[0], true)
    document.getElementById("plays").addEventListener("click", () => {
        if (currentsong.paused) {
            currentsong.play()
            plays.src = "img/pause.svg"
        }
        else {
            currentsong.pause()
            plays.src = "img/play.svg"
        }
    })
    currentsong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${formatTime(currentsong.currentTime)}/${formatTime(currentsong.duration)}`
        document.querySelector(".circle").style.left = (currentsong.currentTime / currentsong.duration) * 100 + "%"
    })
    document.querySelector(".seekbar").addEventListener("click", (e) => {

        let percent = e.offsetX / e.target.getBoundingClientRect().width * 100
        document.querySelector(".circle").style.left = percent + "%"
        currentsong.currentTime = (percent * currentsong.duration) / 100
    })
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0"
    })
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-130%"
    })
    next.addEventListener("click", () => {
        let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0])
        if (index + 1 < songs.length) {
            currentsong.pause()
            playmusic(songs[index + 1])
        }
    })
    previous.addEventListener("click", () => {

        let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0])
        if ((index - 1) >= 0) {
            currentsong.pause()
            playmusic(songs[index - 1])
        }
    })
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        currentsong.volume = (e.target.value) / 100
    })

} main()
