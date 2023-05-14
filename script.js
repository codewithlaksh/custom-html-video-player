// Initialize the global variables
let video = document.getElementById("video"); 
let playBtn = document.getElementById("playBtn");
let videoDuration = document.getElementById("videoDuration");
let currentTime = document.getElementById("currentTime");
let volume = document.getElementById("volume");
let volume_icon = document.getElementById("volume_icon");
let volumePercent = document.getElementById("volumePercent");
let muteBtn = document.getElementById("muteBtn");
let seekbar = document.getElementById("seekbar");
let rewindBtn = document.getElementById("rewindBtn");
let forwardBtn = document.getElementById("forwardBtn");

// Set the seekbar value to current time of the video
seekbar.value = video.currentTime;
currentTime.innerHTML = '0:0:0' // Set the initial value of current time to 0:0:0

video.addEventListener("loadedmetadata", () => {
    const duration = Math.floor(video.duration); // Get the video duration
    // Get hours, minutes and seconds from the duration
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration - (hours * 3600)) / 60);
    const seconds = duration - (hours * 3600) - (minutes * 60);
    videoDuration.innerHTML = `${hours}:${minutes}:${seconds}`;

    // Set the initial video volume to 0.5 (50%)
    video.volume = 0.5;
    volume.value = video.volume * 100;
    volumePercent.innerHTML = `${volume.value}%`
})

// Play the video
playBtn.addEventListener("click", () => {
    if (video.paused) {
        video.play();
        // Update the current timestamp of the video
        video.addEventListener("timeupdate", () => {
            const duration = Math.floor(video.currentTime);
            const hours = Math.floor(duration / 3600);
            const minutes = Math.floor((duration - (hours * 3600)) / 60);
            const seconds = duration - (hours * 3600) - (minutes * 60);
            currentTime.innerHTML = `${hours}:${minutes}:${seconds}`;
            // Update the seekbar value
            seekbar.value = (video.currentTime / video.duration) * 100;
        })
        playBtn.innerHTML = `<span class="material-icons">pause_circle</span>`;
    } else {
        video.pause();
        playBtn.innerHTML = `<span class="material-icons">play_circle</span>`;
    }
})

// Reset all the values when video has ended
video.addEventListener("ended", () => {
    seekbar.value = 0;
    video.currentTime = 0;
    playBtn.innerHTML = `<span class="material-icons">play_circle</span>`;
})

let interval;
// Rewind the video for 10 seconds
rewindBtn.addEventListener("mousedown", () => {
    interval = setInterval(() => {
        video.currentTime -= 10;
    }, 100)
})
rewindBtn.addEventListener("mouseup", () => {
   clearInterval(interval)
})

// Forward the video for 10 seconds
forwardBtn.addEventListener("mousedown", () => {
    interval = setInterval(() => {
        video.currentTime += 10;
    }, 100)
})
forwardBtn.addEventListener("mouseup", () => {
   clearInterval(interval)
})

// Switch to the particular timestamp of the video on seekbar changes
seekbar.addEventListener("input", () => {
    let duration = video.duration;
    let progress = seekbar.value;
    let currentTime = (progress / 100) * duration;
    video.currentTime = currentTime;
    const totalSeconds = Math.floor(video.currentTime);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
    const seconds = totalSeconds - (hours * 3600) - (minutes * 60);
    currentTime.innerHTML = `${hours}:${minutes}:${seconds}`;
})

// Volume change functionality
volume.addEventListener("input", (e) => {
    video.volume = e.target.value / 100;
    volumePercent.innerHTML = `${e.target.value}%`
    if (e.target.value == 0) {
        volume_icon.innerHTML = 'volume_off'
    } else {
        volume_icon.innerHTML = 'volume_up'
    }
})

// Mute or Unmute the video
muteBtn.addEventListener("click", () => {
    if (video.muted) {
        volume.value = video.volume * 100;
        video.muted = false; // Unmute the video
        volume_icon.innerHTML = 'volume_up'
        muteBtn.innerHTML = `<span class="material-icons">volume_off</span>`;
    } else {
        volume.value = 0;
        video.muted = true; // Mute the video
        volume_icon.innerHTML = 'volume_off'
        muteBtn.innerHTML = `<span class="material-icons">volume_up</span>`;
    }
    volumePercent.innerHTML = `${volume.value}%`
})