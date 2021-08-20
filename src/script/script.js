const songs = [
    {
        name: "On & On",
        artist: "Cartoon, Daniel Levi",
        img: "NCS.png",
        src: "cartoon-on-on-feat-daniel-levi-ncs-release.mp3",
        duration: "3:28"
    },
    {
        name: "Invicible",
        artist: "Deaf Kev",
        img: "NCS.png",
        src: "deaf-kev-invincible-ncs-release.mp3",
        duration: "4:33"
    },
    {
        name: "Everything",
        artist: "Diamond Eyes",
        img: "NCS.png",
        src: "diamond-eyes-everything-ncs-release.mp3",
        duration: "4:27"
    },
    {
        name: "My Heart",
        artist: "Different Heaven, EH!DE",
        img: "NCS.png",
        src: "different-heaven-ehde-my-heart-ncs-release.mp3",
        duration: "4:27"
    },
    {
        name: "Blank",
        artist: "Disfigure",
        img: "NCS.png",
        src: "disfigure-blank-ncs-release.mp3",
        duration: "3:29"
    },
    {
        name: "Symbolism",
        artist: "Electro-Light",
        img: "NCS.png",
        src: "electro-light-symbolism-ncs-release.mp3",
        duration: "4:51"
    },
    {
        name: "Sky High",
        artist: "Elektronomia Nighcore",
        img: "NCS.png",
        src: "elektronomia-sky-high-ncs-release.mp3",
        duration: "3:58"
    },
    {
        name: "Heroes Tonight",
        artist: "Janji, Johnning",
        img: "NCS.png",
        src: "janji-heroes-tonight-feat-johnning-ncs-release.mp3",
        duration: "3:28"
    },
    {
        name: "Shine",
        artist: "Spektrem",
        img: "NCS.png",
        src: "spektrem-shine-ncs-release.mp3",
        duration: "4:19"
    },
    {
        name: "Mortals",
        artist: "Warriyo, Laura Brehm",
        img: "NCS.png",
        src: "warriyo-mortals-feat-laura-brehm-ncs-release.mp3",
        duration: "3:50"
    }
]

const randomSong = [0]

//  Playlist
const playlist = document.querySelector('.playlist')
const playlistUl = playlist.querySelector('ul')

//  Player
const player = document.querySelector('.player')
const playPauseBtn = document.querySelector('#play-pause')
const previousBtn = document.querySelector('#previous')
const nextBtn = document.querySelector('#next')
const repeatBtn = document.querySelector('#repeat')
const randomBtn = document.querySelector('#random')

const cover = document.querySelector('.music-image')
const title = document.querySelector('.music-name')
const artist = document.querySelector('.artist-name')
const audio = document.querySelector('#audio')

const progressBar = document.querySelector('.progress-current')
const progressContainer = document.querySelector('.progress-bar')

const volumeBar = document.querySelector('.volume-current')
const volumeContainer = document.querySelector('.volume-bar')

const showPlaylistBtn = document.querySelector('.show-playlist')

for(let i=0; i<songs.length; i++){
    let playlistElement = ` <li li-index="${i}" onclick="play(this)">
                                <span class="pl-music-num">${i+1}.</span>
                                <div class="pl-music">
                                    <span class="pl-artist-name">${songs[i].artist}</span>
                                    <span class="pl-music-name">${songs[i].name}</span>
                                </div>
                                <span class="pl-music-duration">${songs[i].duration}</span>
                            </li>`
    playlistUl.insertAdjacentHTML('beforeend', playlistElement)
};

const songList = playlistUl.querySelectorAll('li')

let songIndex = 0
let previousIndex = 0
loadSong(songs[songIndex])

function loadSong(song){
    title.innerHTML = song.name
    artist.innerHTML = song.artist
    cover.src = `./src/img/${song.img}`
    audio.src = `./src/sound/${song.src}`
    songList[previousIndex].classList.remove('active')
    songList[songIndex].classList.add('active')
}

function pauseSong(){
    playPauseBtn.classList.remove('playing')
    playPauseBtn.querySelector('i.fas').classList.remove('fa-pause')
    playPauseBtn.querySelector('i.fas').classList.add('fa-play')
    audio.pause()
}

function playSong(){
    playPauseBtn.classList.add('playing')
    playPauseBtn.querySelector('i.fas').classList.remove('fa-play')
    playPauseBtn.querySelector('i.fas').classList.add('fa-pause')
    audio.play()
}

function setRepeat(){
    repeatBtn.classList.add('active')
    repeatBtn.querySelector('i.fal').classList.remove('fa-repeat-1')
    repeatBtn.querySelector('i.fal').classList.add('fa-repeat')
}
function setNoRepeat(){
    repeatBtn.classList.remove('active')
    repeatBtn.querySelector('i.fal').classList.remove('fa-repeat-1')
    repeatBtn.querySelector('i.fal').classList.add('fa-repeat')
}
function setRepeatOne(){
    repeatBtn.classList.add('active')
    repeatBtn.querySelector('i.fal').classList.remove('fa-repeat')
    repeatBtn.querySelector('i.fal').classList.add('fa-repeat-1')
}

function setRandom(){
    randomBtn.classList.add('active')
}
function setNoRandom(){
    randomBtn.classList.remove('active')
}

function previousSong(){
    const isRandom = randomBtn.classList.contains('active')

    if(isRandom){
        previousIndex = songIndex

        do randomNum = Math.floor(Math.random() * songs.length)
        while (songIndex == randomNum)
        if(randomSong.length <= 1){
            songIndex = randomNum
        }
        else{
            randomSong.splice(randomSong.length-1, 1)
            songIndex = randomSong[randomSong.length-1]
        }
    }
    else{
        previousIndex = songIndex
        songIndex--
        if(songIndex<0) songIndex = songs.length -1
    }

    loadSong(songs[songIndex])
    playSong()
}

function nextSong(){
    const isRandom = randomBtn.classList.contains('active')

    if(isRandom){
        do randomNum = Math.floor(Math.random() * songs.length)
        while (songIndex == randomNum)
        previousIndex = songIndex
        songIndex = randomNum
        randomSong.push(songIndex)
    }
    else{
        previousIndex = songIndex
        songIndex++
        if(songIndex>songs.length-1) songIndex = 0
    }
    loadSong(songs[songIndex])
    playSong()
}

function updateTotalDuration(){
    progressDuration = document.querySelector('.progress-duration')
    let totalMinute = Math.floor(audio.duration / 60)
    let totalSecond = Math.floor(audio.duration % 60)
    if(totalSecond<10) totalSecond = `0${totalSecond}`
    progressDuration.innerText = `${totalMinute}:${totalSecond}`
}

function updateCurrentTime(){
    let progressCurrent = document.querySelector('.progress-current-time')
    let currentMinute = Math.floor(audio.currentTime / 60)
    let currentSecond = Math.floor(audio.currentTime % 60)
    if(currentSecond<10) currentSecond = `0${currentSecond}`
    progressCurrent.innerText = `${currentMinute}:${currentSecond}`
}

function updateProgress(e){
    const {duration, currentTime} = e.target
    const progressPercent = (currentTime/duration) * 100
    progressBar.style.width = `${progressPercent}%`

    audio.addEventListener('loadeddata', updateTotalDuration)
    updateCurrentTime()
}

function setProgress(e){
    const width = this.clientWidth
    const clickX = e.offsetX

    audio.currentTime = (clickX / width) * audio.duration
}

function updateVolume(e){
    const {volume, currentVolume} = e.target
    const volumePercent = volume * 100
    volumeBar.style.width = `${volumePercent}%`
}

function setVolume(e){
    const width = this.clientWidth
    const clickX = e.offsetX

    audio.volume = (clickX / width) * 1
}

function play(element){
    previousIndex = songIndex
    songIndex = element.getAttribute("li-index")
    loadSong(songs[songIndex])
    playSong()
}

function showPlaylist(){
    const isHide = playlist.offsetHeight
    const arrowBtn = showPlaylistBtn.querySelector('i.fas')
    if(isHide === 0){
        playlist.style.height = '100%'
        arrowBtn.classList.remove('fa-chevron-up')
        arrowBtn.classList.add('fa-chevron-down')
    }
    else{
        playlist.style.height = '0'
        arrowBtn.classList.remove('fa-chevron-down')
        arrowBtn.classList.add('fa-chevron-up')
    } 
}

playPauseBtn.addEventListener('click', () => {
    const isPlaying = playPauseBtn.classList.contains('playing')

    isPlaying ? pauseSong() : playSong()
})

previousBtn.addEventListener('click', previousSong)
nextBtn.addEventListener('click', nextSong)

audio.addEventListener('timeupdate', updateProgress)
audio.addEventListener('volumechange', updateVolume)

progressContainer.addEventListener('click', setProgress)
volumeContainer.addEventListener('click', setVolume)

repeatBtn.addEventListener('click', () => {
    const repeatMode = repeatBtn.querySelector('i.fal')
    if(repeatMode.classList.contains('fa-repeat') && repeatBtn.classList.contains('active'))
        setRepeatOne()
    else if(repeatMode.classList.contains('fa-repeat-1') && repeatBtn.classList.contains('active'))
        setNoRepeat()
    else setRepeat()
})

randomBtn.addEventListener('click', () => {
    const isRandom = randomBtn.classList.contains('active')

    isRandom ? setNoRandom() : setRandom()
})

audio.addEventListener('ended', () =>{
    const repeatMode = repeatBtn.querySelector('i.fal')
    if(repeatMode.classList.contains('fa-repeat') && repeatBtn.classList.contains('active'))
        nextSong()
    else if(repeatMode.classList.contains('fa-repeat-1') && repeatBtn.classList.contains('active')){
        audio.currentTime = 0
        loadSong(songs[songIndex])
        playSong()
    }
    else {
        if(songIndex>=songs.length-1){
            audio.currentTime = 0
            pauseSong()
        }
        else nextSong()
    }
})
showPlaylistBtn.addEventListener('click', showPlaylist)