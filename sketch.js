let index = 0;

let slideshow, s1, s2, s3;

songs = [
  {
    sound1: "songs/der/der1.mp3",
    sound2: "songs/der/der2.mp3",
    sound3: "songs/der/der3.mp3",
    img1: "songs/der/der1.png",
    img2: "songs/der/der2.png",
    img3: "songs/der/der3.png"
  },
  {
    sound1: "songs/treadmill/tred1.wav",
    sound2: "songs/treadmill/tred2.wav",
    sound3: "songs/treadmill/tred3.wav",
    img1: "songs/treadmill/tred1.png",
    img2: "songs/treadmill/tred2.gif",
    img3: "songs/treadmill/tred3.png"
  }
];

function preload() {
  soundFormats("mp3", "wav");
  s1 = loadSound(songs[index].sound1, play);
  s2 = loadSound(songs[index].sound2, play);
  s3 = loadSound(songs[index].sound3, play);

  img1 = loadImage(songs[index].img1);
  img2 = loadImage(songs[index].img2);
  img3 = loadImage(songs[index].img3);
}

function play(sound) {
  sound.loop();
}

reload = async () => {
  preload();
};

function toggleSound() {
  let sounds = [s1, s2, s3];
  for (sound of sounds) {
    if (sound.isLooping()) {
      sound.stop();
    } else {
      sound.loop();
    }
  }
}

const toggleSong = () => {
  toggleSound();
  if (index < songs.length - 1) {
    index++;
  } else {
    index = 0;
  }

  preload();
};

function setup() {
  delay = new p5.Delay();
  s1.connect(delay);
  s2.connect(delay);
  s3.connect(delay);

  slideshow = [];

  createCanvas(600, 500);

  //   soundOn = createButton('PLAY/PAUSE');

  //   soundOn.mousePressed(toggleSound);

  toggle = createButton("TOGGLE SONG");

  toggle.mousePressed(toggleSong);

  knob1 = new MakeKnobC(
    "white",
    100,
    width / 4,
    420,
    0,
    255,
    0,
    0,
    "",
    [0, 0, 0],
    18
  );

  knob2 = new MakeKnobC(
    "grey",
    100,
    width / 2,
    420,
    0,
    255,
    0,
    0,
    "",
    [0, 0, 0],
    18
  );

  knob3 = new MakeKnobC(
    "brown",
    100,
    width - width / 4,
    420,
    0,
    255,
    0,
    0,
    "",
    [0, 0, 0],
    18
  );
}

function draw() {
  knob1val = knob1.knobValue;
  knob2val = knob2.knobValue;
  knob3val = knob3.knobValue;

  background(10);

  mixer(knob1val, img1);
  mixer(knob2val, img2);
  mixer(knob3val, img3);

  s1.setVolume(map(knob1val, 0, 255, 0, 1));
  s2.setVolume(map(knob2val, 0, 255, 0, 1));
  s3.setVolume(map(knob3val, 0, 255, 0, 1));

  knob1.update();
  knob2.update();
  knob3.update();

  fill(random(250, 255));

  rect(100, 40, 400, 300);

  //shuffle the slideshow, then check if the first slide is an image. if it is, display it. if it isn't, draw a rectangle

  shuffle(slideshow, true);
  if (slideshow[0] == img1 || slideshow[0] == img2 || slideshow[0] == img3) {
    image(slideshow[0], 100, 40, 400, 300);
  } else {
    rect(100, 40, 400, 300);
  }

  //reset the slideshow

  slideshow = [
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true
  ];
}

function mousePressed() {
  knob1.active();
  knob2.active();
  knob3.active();
}

function mouseReleased() {
  knob1.inactive();
  knob2.inactive();
  knob3.inactive();
}

function mixer(knob, img) {
  for (i = 0; i <= map(knob, 0, 255, 0, 10); i++) {
    if (knob == 0) {
      //do nothing
    } else {
      slideshow.push(img);
      slideshow.shift();
    }
  }
}
