/*!
 * Howler.js Audio Player Demo
 * howlerjs.com
 *
 * (c) 2013-2020, James Simpson of GoldFire Studios
 * goldfirestudios.com
 *
 * MIT License
 *
 * Refactored and adjusted by Gil Desmarais. Find source below.
 */
[
  "track",
  "timer",
  "duration",
  "playBtn",
  "pauseBtn",
  "prevBtn",
  "nextBtn",
  "playlistBtn",
  "volumeBtn",
  "progress",
  "bar",
  "wave",
  "loading",
  "playlist",
  "list",
  "volume",
  "barEmpty",
  "barFull",
  "sliderBtn",
].forEach((elm) => {
  window[elm] = document.getElementById(elm);
});

class Player {
  constructor(playlist) {
    this.playlist = playlist;
    this.index = 0;
    track.innerHTML = playlist[0].title;

    playlist.forEach((song) => {
      const div = document.createElement("div");
      div.className = "list-song";
      div.innerHTML = song.title;
      div.title = song.title;
      div.onclick = () => {
        player.skipTo(playlist.indexOf(song));
      };
      list.appendChild(div);
    });
  }

  play(index) {
    const self = this;
    let sound;
    index = typeof index === "number" ? index : self.index;
    const data = self.playlist[index];
    if (data.howl) {
      sound = data.howl;
    } else {
      sound = data.howl = new Howl({
        src: [`https://files.desmarais.de/${data.file}`],
        html5: true,
        onplay() {
          duration.innerHTML = self.formatTime(Math.round(sound.duration()));
          requestAnimationFrame(self.step.bind(self));
          wave.container.style.display = "block";
          bar.style.display = "none";
          pauseBtn.style.display = "block";
        },
        onload() {
          wave.container.style.display = "block";
          bar.style.display = "none";
          loading.style.display = "none";
        },
        onend() {
          wave.container.style.display = "none";
          bar.style.display = "block";
          self.skip("next");
        },
        onpause() {
          wave.container.style.display = "none";
          bar.style.display = "block";
        },
        onstop() {
          wave.container.style.display = "none";
          bar.style.display = "block";
        },
        onseek() {
          requestAnimationFrame(self.step.bind(self));
        },
      });
    }
    sound.play();
    track.innerHTML = data.title;
    if (sound.state() === "loaded") {
      playBtn.style.display = "none";
      pauseBtn.style.display = "block";
    } else {
      loading.style.display = "block";
      playBtn.style.display = "none";
      pauseBtn.style.display = "none";
    }
    self.index = index;
  }

  pause() {
    const self = this;
    const sound = self.playlist[self.index].howl;
    sound.pause();
    playBtn.style.display = "block";
    pauseBtn.style.display = "none";
  }

  skip(direction) {
    const self = this;
    let index = 0;
    if (direction === "prev") {
      index = self.index - 1;
      if (index < 0) {
        index = self.playlist.length - 1;
      }
    } else {
      index = self.index + 1;
      if (index >= self.playlist.length) {
        index = 0;
      }
    }
    self.skipTo(index);
  }

  skipTo(index) {
    const self = this;
    if (self.playlist[self.index].howl) {
      self.playlist[self.index].howl.stop();
    }
    progress.style.width = "0%";
    self.play(index);
  }

  volume(val) {
    const self = this;
    Howler.volume(val);
    const barWidth = (val * 90) / 100;
    barFull.style.width = `${barWidth * 100}%`;
    sliderBtn.style.left = `${
      window.innerWidth * barWidth + window.innerWidth * 0.05 - 25
    }px`;
  }

  seek(per) {
    const self = this;
    const sound = self.playlist[self.index].howl;
    if (sound.playing()) {
      sound.seek(sound.duration() * per);
    }
  }

  step() {
    const self = this;
    const sound = self.playlist[self.index].howl;
    const seek = sound.seek() || 0;
    const formattedTime = self.formatTime(Math.round(seek));

    if (timer.innerHTML !== formattedTime) {
      const relative = seek / sound.duration();

      timer.innerHTML = formattedTime;
      progress.style.width = `${relative * 100 || 0}%`;
    }

    if (sound.playing()) {
      requestAnimationFrame(self.step.bind(self));
    }
  }

  togglePlaylist() {
    const self = this;
    const display = playlist.style.display === "block" ? "none" : "block";
    setTimeout(
      () => {
        playlist.style.display = display;
      },
      display === "block" ? 0 : 500
    );
    playlist.className = display === "block" ? "fadein" : "fadeout";
  }

  toggleVolume() {
    const self = this;
    const display = volume.style.display === "block" ? "none" : "block";
    setTimeout(
      () => {
        volume.style.display = display;
      },
      display === "block" ? 0 : 500
    );
    volume.className = display === "block" ? "fadein" : "fadeout";
  }

  formatTime(secs) {
    const minutes = Math.floor(secs / 60) || 0;
    const seconds = secs - minutes * 60 || 0;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }
}

var player = new Player(window.App.sets);

// #region: event listeners
playBtn.addEventListener("click", () => {
  player.play();
});
pauseBtn.addEventListener("click", () => {
  player.pause();
});
prevBtn.addEventListener("click", () => {
  player.skip("prev");
});
nextBtn.addEventListener("click", () => {
  player.skip("next");
});
waveform.addEventListener("click", ({ clientX }) => {
  player.seek(clientX / window.innerWidth);
});
playlistBtn.addEventListener("click", () => {
  player.togglePlaylist();
});
playlist.addEventListener("click", () => {
  player.togglePlaylist();
});
volumeBtn.addEventListener("click", () => {
  player.toggleVolume();
});
volume.addEventListener("click", () => {
  player.toggleVolume();
});
barEmpty.addEventListener("click", ({ layerX }) => {
  const per = layerX / parseFloat(barEmpty.scrollWidth);
  player.volume(per);
});
sliderBtn.addEventListener("mousedown", () => {
  window.sliderDown = true;
});
sliderBtn.addEventListener("touchstart", () => {
  window.sliderDown = true;
});
volume.addEventListener("mouseup", () => {
  window.sliderDown = false;
});
volume.addEventListener("touchend", () => {
  window.sliderDown = false;
});

const move = ({ clientX, touches }) => {
  if (window.sliderDown) {
    const x = clientX || touches[0].clientX;
    const startX = window.innerWidth * 0.05;
    const layerX = x - startX;
    const per = Math.min(
      1,
      Math.max(0, layerX / parseFloat(barEmpty.scrollWidth))
    );
    player.volume(per);
  }
};
volume.addEventListener("mousemove", move);
volume.addEventListener("touchmove", move);
//#endregion

// #region: siriwave
const wave = new SiriWave({
  container: waveform,
  width: window.innerWidth,
  height: window.innerHeight * 0.3,
  cover: true,
  speed: 0.03,
  amplitude: 0.7,
  frequency: 2,
});
wave.start();

const resize = () => {
  const height = window.innerHeight * 0.3;
  const width = window.innerWidth;
  wave.height = height;
  wave.height_2 = height / 2;
  wave.MAX = wave.height_2 - 4;
  wave.width = width;
  wave.width_2 = width / 2;
  wave.width_4 = width / 4;
  wave.canvas.height = height;
  wave.canvas.width = width;
  wave.container.style.margin = `${-(height / 2)}px auto`;
  const sound = player.playlist[player.index].howl;
  if (sound) {
    const vol = sound.volume();
    const barWidth = vol * 0.9;
    sliderBtn.style.left = `${
      window.innerWidth * barWidth + window.innerWidth * 0.05 - 25
    }px`;
  }
};
window.addEventListener("resize", resize);
resize();
// #endregion
