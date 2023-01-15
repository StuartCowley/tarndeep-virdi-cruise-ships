let mute = true;
let muteIcon = document.getElementById("mute-icon");
const bg = new Audio("./sounds/mixkit-close-sea-waves-loop-1195.mp3");

document.getElementById("mutebtn").addEventListener("click", muteme);

function muteme() {
  if (mute === false) {
    console.log("sound off");
    bg.volume = 0.0;
    bg.loop = false;
    bg.pause();
    bg.currentTime = 0;
    muteIcon.setAttribute(
      "d",
      "M4.34 2.93L2.93 4.34L7.29 8.7L7 9H3v6h4l5 5v-6.59l4.18 4.18c-.65.49-1.38.88-2.18 1.11v2.06a8.94 8.94 0 0 0 3.61-1.75l2.05 2.05l1.41-1.41L4.34 2.93zM19 12c0 .82-.15 1.61-.41 2.34l1.53 1.53c.56-1.17.88-2.48.88-3.87c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zm-7-8l-1.88 1.88L12 7.76zm4.5 8A4.5 4.5 0 0 0 14 7.97v1.79l2.48 2.48c.01-.08.02-.16.02-.24z"
    );
    return (mute = true);
  } else {
    console.log("sound on");
    bg.loop = true;
    bg.volume = 0.25;
    bg.play();
    muteIcon.setAttribute(
      "d",
      "M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"
    );
    return (mute = false);
  }
}

const seaAndSound = {
  bgSea: function () {
    if (count > 1000) {
      console.log("has ran for over 1000 counts (30 minutes!)");
      return;
    } else {
      setTimeout(() => {
        bgSeaImage.style.backgroundImage = image1;
        setTimeout(() => {
          bgSeaImage.style.backgroundImage = image0;
          this.bgSea();
        }, 1000);
      }, 1000);
      count++;
    }
  },
};

seaAndSound.bgSea();
