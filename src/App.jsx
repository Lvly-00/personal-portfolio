import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Howl } from "howler";
import gsap from "gsap";

import { OrbitControls } from "./utils/OrbitControls.js";
import { DRACOLoader } from "three/examples/jsm/Addons.js";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

import smokeVertexShader from "./shaders/smoke/vertex.glsl";
import smokeFragmentShader from "./shaders/smoke/fragment.glsl";
import themeVertexShader from "./shaders/theme/vertex.glsl";
import themeFragmentShader from "./shaders/theme/fragment.glsl";

export default function App() {
  const canvasRef = useRef();

  useEffect(() => {
    /**  -------------------------- Audio setup -------------------------- */

    // Background Music
    let pianoDebounceTimer = null;
    let isMusicFaded = false;
    const MUSIC_FADE_TIME = 500;
    const PIANO_TIMEOUT = 2000;
    const BACKGROUND_MUSIC_VOLUME = 1;
    const FADED_VOLUME = 0;

    const backgroundMusic = new Howl({
      src: ["audio/music/pathway.ogg"],
      loop: true,
      volume: 0.5,
    });

    const fadeOutBackgroundMusic = () => {
      if (!isMuted && !isMusicFaded) {
        backgroundMusic.fade(
          backgroundMusic.volume(),
          FADED_VOLUME,
          MUSIC_FADE_TIME
        );
        isMusicFaded = true;
      }
    };

    const fadeInBackgroundMusic = () => {
      if (!isMuted && isMusicFaded) {
        backgroundMusic.fade(
          FADED_VOLUME,
          BACKGROUND_MUSIC_VOLUME,
          MUSIC_FADE_TIME
        );
        isMusicFaded = false;
      }
    };

    // Piano
    const pianoKeyMap = {
      C1_Key: "Key_24",
      "C#1_Key": "Key_23",
      D1_Key: "Key_22",
      "D#1_Key": "Key_21",
      E1_Key: "Key_20",
      F1_Key: "Key_19",
      "F#1_Key": "Key_18",
      G1_Key: "Key_17",
      "G#1_Key": "Key_16",
      A1_Key: "Key_15",
      "A#1_Key": "Key_14",
      B1_Key: "Key_13",
      C2_Key: "Key_12",
      "C#2_Key": "Key_11",
      D2_Key: "Key_10",
      "D#2_Key": "Key_9",
      E2_Key: "Key_8",
      F2_Key: "Key_7",
      "F#2_Key": "Key_6",
      G2_Key: "Key_5",
      "G#2_Key": "Key_4",
      A2_Key: "Key_3",
      "A#2_Key": "Key_2",
      B2_Key: "Key_1",
    };

    const pianoSounds = {};

    Object.values(pianoKeyMap).forEach((soundKey) => {
      pianoSounds[soundKey] = new Howl({
        src: [`audio/sfx/piano/${soundKey}.ogg`],
        preload: true,
        volume: 0.5,
      });
    });

    // Button
    const buttonSounds = {
      click: new Howl({
        src: ["audio/sfx/click/bubble.ogg"],
        preload: true,
        volume: 0.5,
      }),
    };

    /**  -------------------------- Scene setup -------------------------- */
    const canvas = document.querySelector("#experience-canvas");
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#D9CAD1");

    const camera = new THREE.PerspectiveCamera(
      35,
      sizes.width / sizes.height,
      0.1,
      200
    );

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
    });

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 5;
    controls.maxDistance = 45;
    controls.minPolarAngle = 0;
    controls.maxPolarAngle = Math.PI / 2;
    controls.minAzimuthAngle = 0;
    controls.maxAzimuthAngle = Math.PI / 2;

    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    controls.update();

    //Set starting camera position
    if (window.innerWidth < 768) {
      camera.position.set(
        29.567116827654726,
        14.018476147584705,
        31.37040363900147
      );
      controls.target.set(
        -0.08206262548844094,
        3.3119233527087255,
        -0.7433922282864018
      );
    } else {
      camera.position.set(17.49173098423395, 9.108969527553887, 17.850992894238058);
      controls.target.set(
        0.4624746759408973,
        1.9719940043010387,
        -0.8300979125494505
      );
    }

    window.addEventListener("resize", () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      // Update Camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    /**  -------------------------- Modal Stuff -------------------------- */
    const modals = {
      work: document.querySelector(".modal.work"),
      about: document.querySelector(".modal.about"),
      contact: document.querySelector(".modal.contact"),
    };

    const overlay = document.querySelector(".overlay");

    let touchHappened = false;
    let isModalOpen = false;

    // Close modal when overlay is clicked/tapped
    overlay.addEventListener(
      "touchend",
      (e) => {
        touchHappened = true;
        const modal = document.querySelector('.modal[style*="display: block"]');
        if (modal) hideModal(modal);
      },
      { passive: true }
    );

    overlay.addEventListener("click", (e) => {
      if (touchHappened) return;
      const modal = document.querySelector('.modal[style*="display: block"]');
      if (modal) hideModal(modal);
    });


    document.querySelectorAll(".modal-exit-button").forEach((button) => {
      function handleModalExit(e) {
        const modal = e.target.closest(".modal");

        // Exit animation for button
        gsap.to(button, {
          scale: 5,
          duration: 0.5,
          ease: "back.out(2)",
          onStart: () => {
            gsap.to(button, {
              scale: 1,
              duration: 0.5,
              ease: "back.out(2)",
              onComplete: () => {
                gsap.set(button, { clearProps: "all" });
              },
            });
          },
        });

        buttonSounds.click.play();
        hideModal(modal);
      }

      button.addEventListener(
        "touchend",
        (e) => {
          touchHappened = true;
          handleModalExit(e);
        },
        { passive: true }
      );

      button.addEventListener("click", (e) => {
        if (touchHappened) return;
        handleModalExit(e);
      });
    });


    const showModal = (modal) => {
      modal.style.display = "block";
      overlay.style.display = "block";

      isModalOpen = true;
      controls.enabled = false;
      document.body.style.overflow = "hidden"; // prevent background scroll

      if (currentHoveredObject) {
        playHoverAnimation(currentHoveredObject, false);
        currentHoveredObject = null;
      }
      document.body.style.cursor = "default";
      currentIntersects = [];

      gsap.set(modal, { opacity: 0, scale: 0 });
      gsap.set(overlay, { opacity: 0 });

      gsap.to(overlay, { opacity: 1, duration: 0.5 });
      gsap.to(modal, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "back.out(2)",
      });
    };

    const hideModal = (modal) => {
      isModalOpen = false;
      controls.enabled = true;
      document.body.style.overflow = ""; // restore scrolling

      gsap.to(overlay, { opacity: 0, duration: 0.5 });
      gsap.to(modal, {
        opacity: 0,
        scale: 0,
        duration: 0.5,
        ease: "back.in(2)",
        onComplete: () => {
          modal.style.display = "none";
          overlay.style.display = "none";
        },
      });
    };

    /**  -------------------------- Loading Screen & Intro Animation -------------------------- */

    const manager = new THREE.LoadingManager();

    const loadingScreen = document.querySelector(".loading-screen");
    const loadingScreenButton = document.querySelector(".loading-screen-button");
    const noSoundButton = document.querySelector(".no-sound-button");

    manager.onLoad = function () {
      loadingScreenButton.style.border = "8px solid #7a2f33";
      loadingScreenButton.style.background = "#5b1e25";
      loadingScreenButton.style.color = "#E6CFA9";
      loadingScreenButton.style.boxShadow = "#0000003d 0px 3px 8px";
      loadingScreenButton.textContent = "Enter!";
      loadingScreenButton.style.cursor = "pointer";
      loadingScreenButton.style.transition =
        "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)";
      let isDisabled = false;

      noSoundButton.textContent = "Enter without Sound :(";

      function handleEnter(withSound = true) {
        if (isDisabled) return;

        noSoundButton.textContent = "";
        loadingScreenButton.style.cursor = "default";
        loadingScreenButton.style.border = "8px solid #5b1e25";
        loadingScreenButton.style.background = "#7a2f33";
        loadingScreenButton.style.color = "#E6CFA9";
        loadingScreenButton.style.boxShadow = "none";
        loadingScreenButton.textContent = "~ 1v1y ~";
        loadingScreen.style.background = "#7a2f33";
        isDisabled = true;

        toggleFavicons();

        if (!withSound) {
          isMuted = true;
          updateMuteState(true);

          soundOnSvg.style.display = "none";
          soundOffSvg.style.display = "block";
        } else {
          backgroundMusic.play();
        }

        playReveal();
      }

      loadingScreenButton.addEventListener("mouseenter", () => {
        loadingScreenButton.style.transform = "scale(1.3)";
      });

      loadingScreenButton.addEventListener("touchend", (e) => {
        touchHappened = true;
        e.preventDefault();
        handleEnter();
      });

      loadingScreenButton.addEventListener("click", (e) => {
        if (touchHappened) return;
        handleEnter(true);
      });

      loadingScreenButton.addEventListener("mouseleave", () => {
        loadingScreenButton.style.transform = "none";
      });

      noSoundButton.addEventListener("click", (e) => {
        if (touchHappened) return;
        handleEnter(false);
      });
    };

    function playReveal() {
      const tl = gsap.timeline();

      tl.to(loadingScreen, {
        scale: 0.5,
        duration: 1.2,
        delay: 0.25,
        ease: "back.in(1.8)",
      }).to(
        loadingScreen,
        {
          y: "200vh",
          transform: "perspective(1000px) rotateX(45deg) rotateY(-35deg)",
          duration: 1.2,
          ease: "back.in(1.8)",
          onComplete: () => {
            isModalOpen = false;
            playIntroAnimation();
            loadingScreen.remove();
          },
        },
        "-=0.1"
      );
    }

    function playIntroAnimation() {
      const t1 = gsap.timeline({
        defaults: {
          duration: 0.8,
          ease: "back.out(1.8)",
        },
      });
      t1.timeScale(0.8);

      t1.to(plank1.scale, {
        x: 1,
        y: 1,
      })
        .to(
          plank2.scale,
          {
            x: 1,
            y: 1,
            z: 1,
          },
          "-=0.5"
        )
        .to(
          workBtn.scale,
          {
            x: 1,
            y: 1,
            z: 1,
          },
          "-=0.6"
        )
        .to(
          aboutBtn.scale,
          {
            x: 1,
            y: 1,
            z: 1,
          },
          "-=0.6"
        )
        .to(
          contactBtn.scale,
          {
            x: 1,
            y: 1,
            z: 1,
          },
          "-=0.6"
        );

      const tFrames = gsap.timeline({
        defaults: {
          duration: 0.8,
          ease: "back.out(1.8)",
        },
      });
      tFrames.timeScale(0.8);

      tFrames
        .to(frame1.scale, {
          x: 1,
          y: 1,
          z: 1,
        })
        .to(
          frame2.scale,
          {
            x: 1,
            y: 1,
            z: 1,
          },
          "-=0.5"
        )
        .to(
          frame3.scale,
          {
            x: 1,
            y: 1,
            z: 1,
          },
          "-=0.5"
        );

      const t2 = gsap.timeline({
        defaults: {
          duration: 0.8,
          ease: "back.out(1.8)",
        },
      });
      t2.timeScale(0.8);

      t2.to(boba.scale, {
        z: 1,
        y: 1,
        x: 1,
        delay: 0.4,
      })
        .to(
          github.scale,
          {
            x: 1,
            y: 1,
            z: 1,
          },
          "-=0.5"
        )
        .to(
          youtube.scale,
          {
            x: 1,
            y: 1,
            z: 1,
          },
          "-=0.6"
        )
        .to(
          twitter.scale,
          {
            x: 1,
            y: 1,
            z: 1,
          },
          "-=0.6"
        );

      const tFlowers = gsap.timeline({
        defaults: {
          duration: 0.8,
          ease: "back.out(1.8)",
        },
      });
      tFlowers.timeScale(0.8);

      tFlowers
        .to(flower5.scale, {
          x: 1,
          y: 1,
          z: 1,
        })
        .to(
          flower4.scale,
          {
            x: 1,
            y: 1,
            z: 1,
          },
          "-=0.5"
        )
        .to(
          flower3.scale,
          {
            x: 1,
            y: 1,
            z: 1,
          },
          "-=0.5"
        )
        .to(
          flower2.scale,
          {
            x: 1,
            y: 1,
            z: 1,
          },
          "-=0.5"
        )
        .to(
          flower1.scale,
          {
            x: 1,
            y: 1,
            z: 1,
          },
          "-=0.5"
        );

      const tBoxes = gsap.timeline({
        defaults: {
          duration: 0.8,
          ease: "back.out(1.8)",
        },
      });
      tBoxes.timeScale(0.8);

      tBoxes
        .to(box1.scale, {
          x: 1,
          y: 1,
          z: 1,
        })
        .to(
          box2.scale,
          {
            x: 1,
            y: 1,
            z: 1,
          },
          "-=0.5"
        )
        .to(
          box3.scale,
          {
            x: 1,
            y: 1,
            z: 1,
          },
          "-=0.5"
        );

      const tLamp = gsap.timeline({
        defaults: {
          duration: 0.8,
          delay: 0.2,
          ease: "back.out(1.8)",
        },
      });
      tLamp.timeScale(0.8);

      tLamp.to(lamp.scale, {
        x: 1,
        y: 1,
        z: 1,
      });

      const tSlippers = gsap.timeline({
        defaults: {
          duration: 0.8,
          ease: "back.out(1.8)",
        },
      });
      tSlippers.timeScale(0.8);

      tSlippers
        .to(slippers1.scale, {
          x: 1,
          y: 1,
          z: 1,
          delay: 0.5,
        })
        .to(
          slippers2.scale,
          {
            x: 1,
            y: 1,
            z: 1,
          },
          "-=0.5"
        );

      const tEggs = gsap.timeline({
        defaults: {
          duration: 0.8,
          ease: "back.out(1.8)",
        },
      });
      tEggs.timeScale(0.8);

      tEggs
        .to(egg1.scale, {
          x: 1,
          y: 1,
          z: 1,
        })
        .to(
          egg2.scale,
          {
            x: 1,
            y: 1,
            z: 1,
          },
          "-=0.5"
        )
        .to(
          egg3.scale,
          {
            x: 1,
            y: 1,
            z: 1,
          },
          "-=0.5"
        );

      const tFish = gsap.timeline({
        defaults: {
          delay: 0.8,
          duration: 0.8,
          ease: "back.out(1.8)",
        },
      });
      tFish.timeScale(0.8);

      tFish.to(fish.scale, {
        x: 1,
        y: 1,
        z: 1,
      });

      const lettersTl = gsap.timeline({
        defaults: {
          duration: 0.8,
          ease: "back.out(1.7)",
        },
      });
      lettersTl.timeScale(0.8);

      lettersTl
        .to(letter1.position, {
          y: letter1.userData.initialPosition.y + 0.3,
          duration: 0.4,
          ease: "back.out(1.8)",
          delay: 0.25,
        })
        .to(
          letter1.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.4,
            ease: "back.out(1.8)",
          },
          "<"
        )
        .to(
          letter1.position,
          {
            y: letter1.userData.initialPosition.y,
            duration: 0.4,
            ease: "back.out(1.8)",
          },
          ">-0.2"
        )

        .to(
          letter2.position,
          {
            y: letter2.userData.initialPosition.y + 0.3,
            duration: 0.4,
            ease: "back.out(1.8)",
          },
          "-=0.5"
        )
        .to(
          letter2.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.4,
            ease: "back.out(1.8)",
          },
          "<"
        )
        .to(
          letter2.position,
          {
            y: letter2.userData.initialPosition.y,
            duration: 0.4,
            ease: "back.out(1.8)",
          },
          ">-0.2"
        )

        .to(
          letter3.position,
          {
            y: letter3.userData.initialPosition.y + 0.3,
            duration: 0.4,
            ease: "back.out(1.8)",
          },
          "-=0.5"
        )
        .to(
          letter3.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.4,
            ease: "back.out(1.8)",
          },
          "<"
        )
        .to(
          letter3.position,
          {
            y: letter3.userData.initialPosition.y,
            duration: 0.4,
            ease: "back.out(1.8)",
          },
          ">-0.2"
        )

        .to(
          letter4.position,
          {
            y: letter4.userData.initialPosition.y + 0.3,
            duration: 0.4,
            ease: "back.out(1.8)",
          },
          "-=0.5"
        )
        .to(
          letter4.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.4,
            ease: "back.out(1.8)",
          },
          "<"
        )
        .to(
          letter4.position,
          {
            y: letter4.userData.initialPosition.y,
            duration: 0.4,
            ease: "back.out(1.8)",
          },
          ">-0.2"
        )

        .to(
          letter5.position,
          {
            y: letter5.userData.initialPosition.y + 0.3,
            duration: 0.4,
            ease: "back.out(1.8)",
          },
          "-=0.5"
        )
        .to(
          letter5.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.4,
            ease: "back.out(1.8)",
          },
          "<"
        )
        .to(
          letter5.position,
          {
            y: letter5.userData.initialPosition.y,
            duration: 0.4,
            ease: "back.out(1.8)",
          },
          ">-0.2"
        )

        .to(
          letter6.position,
          {
            y: letter6.userData.initialPosition.y + 0.3,
            duration: 0.4,
            ease: "back.out(1.8)",
          },
          "-=0.5"
        )
        .to(
          letter6.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.4,
            ease: "back.out(1.8)",
          },
          "<"
        )
        .to(
          letter6.position,
          {
            y: letter6.userData.initialPosition.y,
            duration: 0.4,
            ease: "back.out(1.8)",
          },
          ">-0.2"
        )

        .to(
          letter7.position,
          {
            y: letter7.userData.initialPosition.y + 0.3,
            duration: 0.4,
            ease: "back.out(1.8)",
          },
          "-=0.5"
        )
        .to(
          letter7.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.4,
            ease: "back.out(1.8)",
          },
          "<"
        )
        .to(
          letter7.position,
          {
            y: letter7.userData.initialPosition.y,
            duration: 0.4,
            ease: "back.out(1.8)",
          },
          ">-0.2"
        )

        .to(
          letter8.position,
          {
            y: letter8.userData.initialPosition.y + 0.3,
            duration: 0.4,
            ease: "back.out(1.8)",
          },
          "-=0.5"
        )
        .to(
          letter8.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.4,
            ease: "back.out(1.8)",
          },
          "<"
        )
        .to(
          letter8.position,
          {
            y: letter8.userData.initialPosition.y,
            duration: 0.4,
            ease: "back.out(1.8)",
          },
          ">-0.2"
        );

      const pianoKeysTl = gsap.timeline({
        defaults: {
          duration: 0.4,
          ease: "back.out(1.7)",
          onComplete: () => {
            setTimeout(() => {
              createDelayedHitboxes();
            }, 1950);
          },
        },
      });
      pianoKeysTl.timeScale(1.2);

      const pianoKeys = [
        C1_Key,
        Cs1_Key,
        D1_Key,
        Ds1_Key,
        E1_Key,
        F1_Key,
        Fs1_Key,
        G1_Key,
        Gs1_Key,
        A1_Key,
        As1_Key,
        B1_Key,
        C2_Key,
        Cs2_Key,
        D2_Key,
        Ds2_Key,
        E2_Key,
        F2_Key,
        Fs2_Key,
        G2_Key,
        Gs2_Key,
        A2_Key,
        As2_Key,
        B2_Key,
      ];

      pianoKeys.forEach((key, index) => {
        pianoKeysTl
          .to(
            key.position,
            {
              y: key.userData.initialPosition.y + 0.2,
              duration: 0.4,
              ease: "back.out(1.8)",
            },
            index * 0.1
          )
          .to(
            key.scale,
            {
              x: 1,
              y: 1,
              z: 1,
              duration: 0.4,
              ease: "back.out(1.8)",
            },
            "<"
          )
          .to(
            key.position,
            {
              y: key.userData.initialPosition.y,
              duration: 0.4,
              ease: "back.out(1.8)",
            },
            ">-0.2"
          );
      });
    }

    /**  -------------------------- Loaders & Texture Preparations -------------------------- */
    const textureLoader = new THREE.TextureLoader();

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("draco/");

    const loader = new GLTFLoader(manager);
    loader.setDRACOLoader(dracoLoader);

    const environmentMap = new THREE.CubeTextureLoader()
      .setPath("textures/skybox/")
      .load(["px.webp", "nx.webp", "py.webp", "ny.webp", "pz.webp", "nz.webp"]);

    const textureMap = {
      First: {
        day: "textures/room/day/first_texture_set_day.webp",
        night: "textures/room/night/first_texture_set_night.webp",
      },
      Second: {
        day: "textures/room/day/second_texture_set_day.webp",
        night: "textures/room/night/second_texture_set_night.webp",
      },
      Third: {
        day: "textures/room/day/third_texture_set_day.webp",
        night: "textures/room/night/third_texture_set_night.webp",
      },
      Fourth: {
        day: "textures/room/day/fourth_texture_set_day.webp",
        night: "textures/room/night/fourth_texture_set_night.webp",
      },
    };

    const loadedTextures = {
      day: {},
      night: {},
    };

    Object.entries(textureMap).forEach(([key, paths]) => {
      // Load and configure day texture
      const dayTexture = textureLoader.load(paths.day);
      dayTexture.flipY = false;
      dayTexture.colorSpace = THREE.SRGBColorSpace;
      dayTexture.minFilter = THREE.LinearFilter;
      dayTexture.magFilter = THREE.LinearFilter;
      loadedTextures.day[key] = dayTexture;

      // Load and configure night texture
      const nightTexture = textureLoader.load(paths.night);
      nightTexture.flipY = false;
      nightTexture.colorSpace = THREE.SRGBColorSpace;
      nightTexture.minFilter = THREE.LinearFilter;
      nightTexture.magFilter = THREE.LinearFilter;
      loadedTextures.night[key] = nightTexture;
    });

    // Reuseable Materials
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      transmission: 1,
      opacity: 1,
      color: 0xfbfbfb,
      metalness: 0,
      roughness: 0,
      ior: 3,
      thickness: 0.01,
      specularIntensity: 1,
      envMap: environmentMap,
      envMapIntensity: 1,
      depthWrite: false,
      specularColor: 0xfbfbfb,
    });

    const whiteMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });

    const createMaterialForTextureSet = (textureSet) => {
      const material = new THREE.ShaderMaterial({
        uniforms: {
          uDayTexture1: { value: loadedTextures.day.First },
          uNightTexture1: { value: loadedTextures.night.First },
          uDayTexture2: { value: loadedTextures.day.Second },
          uNightTexture2: { value: loadedTextures.night.Second },
          uDayTexture3: { value: loadedTextures.day.Third },
          uNightTexture3: { value: loadedTextures.night.Third },
          uDayTexture4: { value: loadedTextures.day.Fourth },
          uNightTexture4: { value: loadedTextures.night.Fourth },
          uMixRatio: { value: 0 },
          uTextureSet: { value: textureSet },
        },
        vertexShader: themeVertexShader,
        fragmentShader: themeFragmentShader,
      });

      Object.entries(material.uniforms).forEach(([key, uniform]) => {
        if (uniform.value instanceof THREE.Texture) {
          uniform.value.minFilter = THREE.LinearFilter;
          uniform.value.magFilter = THREE.LinearFilter;
        }
      });

      return material;
    };

    const roomMaterials = {
      First: createMaterialForTextureSet(1),
      Second: createMaterialForTextureSet(2),
      Third: createMaterialForTextureSet(3),
      Fourth: createMaterialForTextureSet(4),
    };

    // Smoke Shader setup
    const smokeGeometry = new THREE.PlaneGeometry(1, 1, 16, 64);
    smokeGeometry.translate(0, 0.5, 0);
    smokeGeometry.scale(0.33, 1, 0.33);

    const perlinTexture = textureLoader.load("shaders/perlin.png");
    perlinTexture.wrapS = THREE.RepeatWrapping;
    perlinTexture.wrapT = THREE.RepeatWrapping;

    const smokeMaterial = new THREE.ShaderMaterial({
      vertexShader: smokeVertexShader,
      fragmentShader: smokeFragmentShader,
      uniforms: {
        uTime: new THREE.Uniform(0),
        uPerlinTexture: new THREE.Uniform(perlinTexture),
      },
      side: THREE.DoubleSide,
      transparent: true,
      depthWrite: false,
    });

    const smoke = new THREE.Mesh(smokeGeometry, smokeMaterial);
    smoke.position.y = 1.83;
    scene.add(smoke);

    const videoElement = document.createElement("video");
    videoElement.src = "textures/video/Screen.mp4";
    videoElement.loop = true;
    videoElement.muted = true;
    videoElement.playsInline = true;
    videoElement.autoplay = true;
    videoElement.play();

    const videoTexture = new THREE.VideoTexture(videoElement);
    videoTexture.colorSpace = THREE.SRGBColorSpace;
    videoTexture.flipY = false;

    /**  -------------------------- Model and Mesh Setup -------------------------- */

    // LOL DO NOT DO THIS USE A FUNCTION TO AUTOMATE THIS PROCESS HAHAHAAHAHAHAHAHAHA
    let fish;
    let coffeePosition;
    let hourHand;
    let minuteHand;
    let chairTop;
    const xAxisFans = [];
    const yAxisFans = [];
    let plank1,
      plank2,
      workBtn,
      aboutBtn,
      contactBtn,
      boba,
      github,
      youtube,
      twitter;

    let letter1, letter2, letter3, letter4, letter5, letter6, letter7, letter8;

    let C1_Key,
      Cs1_Key,
      D1_Key,
      Ds1_Key,
      E1_Key,
      F1_Key,
      Fs1_Key,
      G1_Key,
      Gs1_Key,
      A1_Key,
      As1_Key,
      B1_Key;
    let C2_Key,
      Cs2_Key,
      D2_Key,
      Ds2_Key,
      E2_Key,
      F2_Key,
      Fs2_Key,
      G2_Key,
      Gs2_Key,
      A2_Key,
      As2_Key,
      B2_Key;

    let flower1, flower2, flower3, flower4, flower5;

    let box1, box2, box3;

    let lamp;

    let slippers1, slippers2;

    let egg1, egg2, egg3;

    let frame1, frame2, frame3;

    const useOriginalMeshObjects = ["Bulb", "Cactus", "Kirby"];

    const objectsNeedingHitboxes = [];

    const objectsWithIntroAnimations = [
      "Hanging_Plank_1",
      "Hanging_Plank_2",
      "My_Work_Button",
      "About_Button",
      "Contact_Button",
      "Boba",
      "GitHub",
      "YouTube",
      "Twitter",
      "Name_Letter_1",
      "Name_Letter_2",
      "Name_Letter_3",
      "Name_Letter_4",
      "Name_Letter_5",
      "Name_Letter_6",
      "Name_Letter_7",
      "Name_Letter_8",
      "Flower_1",
      "Flower_2",
      "Flower_3",
      "Flower_4",
      "Flower_5",
      "Box_1",
      "Box_2",
      "Box_3",
      "Lamp",
      "Slipper_1",
      "Slipper_2",
      "Fish_Fourth",
      "Egg_1",
      "Egg_2",
      "Egg_3",
      "Frame_1",
      "Frame_2",
      "Frame_3",
      "C1_Key",
      "C#1_Key",
      "D1_Key",
      "D#1_Key",
      "E1_Key",
      "F1_Key",
      "F#1_Key",
      "G1_Key",
      "G#1_Key",
      "A1_Key",
      "A#1_Key",
      "B1_Key",
      "C2_Key",
      "C#2_Key",
      "D2_Key",
      "D#2_Key",
      "E2_Key",
      "F2_Key",
      "F#2_Key",
      "G2_Key",
      "G#2_Key",
      "A2_Key",
      "A#2_Key",
      "B2_Key",
    ];

    function hasIntroAnimation(objectName) {
      return objectsWithIntroAnimations.some((animatedName) =>
        objectName.includes(animatedName)
      );
    }



    loader.load("models/Room_Portfolio.glb", (glb) => {
      glb.scene.traverse((child) => {
        if (child.isMesh) {
          if (child.name.includes("Fish_Fourth")) {
            fish = child;
            child.position.x += 0.04;
            child.position.z -= 0.03;
            child.userData.initialPosition = new THREE.Vector3().copy(
              child.position
            );
          }
          if (child.name.includes("Chair_Top")) {
            chairTop = child;
            child.userData.initialRotation = new THREE.Euler().copy(child.rotation);
          }

          if (child.name.includes("Hour_Hand")) {
            hourHand = child;
            child.userData.initialRotation = new THREE.Euler().copy(child.rotation);
          }

          if (child.name.includes("Minute_Hand")) {
            minuteHand = child;
            child.userData.initialRotation = new THREE.Euler().copy(child.rotation);
          }

          if (child.name.includes("Coffee")) {
            coffeePosition = child.position.clone();
          }

          if (child.name.includes("Hover") || child.name.includes("Key")) {
            child.userData.initialScale = new THREE.Vector3().copy(child.scale);
            child.userData.initialPosition = new THREE.Vector3().copy(
              child.position
            );
            child.userData.initialRotation = new THREE.Euler().copy(child.rotation);
          }

          // LOL DO NOT DO THIS USE A FUNCTION TO AUTOMATE THIS PROCESS HAHAHAAHAHAHAHAHAHA
          if (child.name.includes("Hanging_Plank_1")) {
            plank1 = child;
            child.scale.set(0, 0, 1);
          } else if (child.name.includes("Hanging_Plank_2")) {
            plank2 = child;
            child.scale.set(0, 0, 0);
          } else if (child.name.includes("My_Work_Button")) {
            workBtn = child;
            child.scale.set(0, 0, 0);
          } else if (child.name.includes("About_Button")) {
            aboutBtn = child;
            child.scale.set(0, 0, 0);
          } else if (child.name.includes("Contact_Button")) {
            contactBtn = child;
            child.scale.set(0, 0, 0);
          } else if (child.name.includes("Boba")) {
            boba = child;
            child.scale.set(0, 0, 0);
          } else if (child.name.includes("GitHub")) {
            github = child;
            child.scale.set(0, 0, 0);
          } else if (child.name.includes("YouTube")) {
            youtube = child;
            child.scale.set(0, 0, 0);
          } else if (child.name.includes("Twitter")) {
            twitter = child;
            child.scale.set(0, 0, 0);
          } else if (child.name.includes("Name_Letter_1")) {
            letter1 = child;
            child.scale.set(0, 0, 0);
          } else if (child.name.includes("Name_Letter_2")) {
            letter2 = child;
            child.scale.set(0, 0, 0);
          } else if (child.name.includes("Name_Letter_3")) {
            letter3 = child;
            child.scale.set(0, 0, 0);
          } else if (child.name.includes("Name_Letter_4")) {
            letter4 = child;
            child.scale.set(0, 0, 0);
          } else if (child.name.includes("Name_Letter_5")) {
            letter5 = child;
            child.scale.set(0, 0, 0);
          } else if (child.name.includes("Name_Letter_6")) {
            letter6 = child;
            child.scale.set(0, 0, 0);
          } else if (child.name.includes("Name_Letter_7")) {
            letter7 = child;
            child.scale.set(0, 0, 0);
          } else if (child.name.includes("Name_Letter_8")) {
            letter8 = child;
            child.scale.set(0, 0, 0);
          } else if (child.name.includes("Flower_1")) {
            flower1 = child;
            child.scale.set(0, 0, 0);
          } else if (child.name.includes("Flower_2")) {
            flower2 = child;
            child.scale.set(0, 0, 0);
          } else if (child.name.includes("Flower_3")) {
            flower3 = child;
            child.scale.set(0, 0, 0);
          } else if (child.name.includes("Flower_4")) {
            flower4 = child;
            child.scale.set(0, 0, 0);
          } else if (child.name.includes("Flower_5")) {
            flower5 = child;
            child.scale.set(0, 0, 0);
          } else if (child.name.includes("Box_1")) {
            box1 = child;
            child.scale.set(0, 0, 0);
          } else if (child.name.includes("Box_2")) {
            box2 = child;
            child.scale.set(0, 0, 0);
          } else if (child.name.includes("Box_3")) {
            box3 = child;
            child.scale.set(0, 0, 0);
          } else if (child.name.includes("Lamp")) {
            lamp = child;
            child.scale.set(0, 0, 0);
          } else if (child.name.includes("Slipper_1")) {
            slippers1 = child;
            child.scale.set(0, 0, 0);
          } else if (child.name.includes("Slipper_2")) {
            slippers2 = child;
            child.scale.set(0, 0, 0);
          } else if (child.name.includes("Fish_Fourth")) {
            child.scale.set(0, 0, 0);
          } else if (child.name.includes("Egg_1")) {
            egg1 = child;
            child.scale.set(0, 0, 0);
          } else if (child.name.includes("Egg_2")) {
            egg2 = child;
            child.scale.set(0, 0, 0);
          } else if (child.name.includes("Egg_3")) {
            egg3 = child;
            child.scale.set(0, 0, 0);
          } else if (child.name.includes("Frame_1")) {
            frame1 = child;
            child.scale.set(0, 0, 0);
          } else if (child.name.includes("Frame_2")) {
            frame2 = child;
            child.scale.set(0, 0, 0);
          } else if (child.name.includes("Frame_3")) {
            frame3 = child;
            child.scale.set(0, 0, 0);
          }
          Object.keys(pianoKeyMap).forEach((keyName) => {
            if (child.name.includes(keyName)) {
              const varName = keyName.replace("#", "s").split("_")[0] + "_Key";
              eval(`${varName} = child`);
              child.scale.set(0, 0, 0);
              child.userData.initialPosition = new THREE.Vector3().copy(
                child.position
              );
            }
          });

          if (child.name.includes("Water")) {
            child.material = new THREE.MeshBasicMaterial({
              color: 0x558bc8,
              transparent: true,
              opacity: 0.4,
              depthWrite: false,
            });
          } else if (child.name.includes("Glass")) {
            child.material = glassMaterial;
          } else if (child.name.includes("Bubble")) {
            child.material = whiteMaterial;
          } else if (child.name.includes("Screen")) {
            child.material = new THREE.MeshBasicMaterial({
              map: videoTexture,
              transparent: true,
              opacity: 0.9,
            });
          } else {
            Object.keys(textureMap).forEach((key) => {
              if (child.name.includes(key)) {
                child.material = roomMaterials[key];

                if (child.name.includes("Fan")) {
                  if (
                    child.name.includes("Fan_2") ||
                    child.name.includes("Fan_4")
                  ) {
                    xAxisFans.push(child);
                  } else {
                    yAxisFans.push(child);
                  }
                }
              }
            });
          }

          if (child.name.includes("Raycaster")) {
            if (hasIntroAnimation(child.name)) {
              // Create a hitbox for object after intro is done playing,
              // Set an original scale first for the hitbox
              child.userData.originalScale = new THREE.Vector3(1, 1, 1);

              objectsNeedingHitboxes.push(child);
            } else {
              // Create immediate hitboxes/meshes for objects that DON'T have an intro animation
              const raycastObject = createStaticHitbox(child);

              if (raycastObject !== child) {
                scene.add(raycastObject);
              }

              raycasterObjects.push(raycastObject);
              hitboxToObjectMap.set(raycastObject, child);
            }
          }
        }
      });

      if (coffeePosition) {
        smoke.position.set(
          coffeePosition.x,
          coffeePosition.y + 0.2,
          coffeePosition.z
        );
      }

      scene.add(glb.scene);
    });


    /**  -------------------------- Raycaster setup -------------------------- */

    const raycasterObjects = [];
    let currentIntersects = [];
    let currentHoveredObject = null;

    const socialLinks = {
      GitHub: "https://github.com/Lvly-00",
      YouTube: "https://www.linkedin.com/in/lovely-pintes-3b40962bb/",
      Twitter: "https://www.twitter.com/",
    };

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    const hitboxToObjectMap = new Map();

    function shouldUseOriginalMesh(objectName) {
      return useOriginalMeshObjects.some((meshName) =>
        objectName.includes(meshName)
      );
    }

    function createStaticHitbox(originalObject) {
      // Check if we should use original mesh
      if (shouldUseOriginalMesh(originalObject.name)) {
        if (!originalObject.userData.initialScale) {
          originalObject.userData.initialScale = new THREE.Vector3().copy(
            originalObject.scale
          );
        }
        if (!originalObject.userData.initialPosition) {
          originalObject.userData.initialPosition = new THREE.Vector3().copy(
            originalObject.position
          );
        }
        if (!originalObject.userData.initialRotation) {
          originalObject.userData.initialRotation = new THREE.Euler().copy(
            originalObject.rotation
          );
        }

        originalObject.userData.originalObject = originalObject;
        return originalObject;
      }

      if (!originalObject.userData.initialScale) {
        originalObject.userData.initialScale = new THREE.Vector3().copy(
          originalObject.scale
        );
      }
      if (!originalObject.userData.initialPosition) {
        originalObject.userData.initialPosition = new THREE.Vector3().copy(
          originalObject.position
        );
      }
      if (!originalObject.userData.initialRotation) {
        originalObject.userData.initialRotation = new THREE.Euler().copy(
          originalObject.rotation
        );
      }

      const currentScale = originalObject.scale.clone();
      const hasZeroScale =
        currentScale.x === 0 || currentScale.y === 0 || currentScale.z === 0;

      if (hasZeroScale && originalObject.userData.originalScale) {
        originalObject.scale.copy(originalObject.userData.originalScale);
      }

      const box = new THREE.Box3().setFromObject(originalObject);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());

      if (hasZeroScale) {
        originalObject.scale.copy(currentScale);
      }

      let hitboxGeometry;
      let sizeMultiplier = { x: 1.1, y: 1.75, z: 1.1 };

      hitboxGeometry = new THREE.BoxGeometry(
        size.x * sizeMultiplier.x,
        size.y * sizeMultiplier.y,
        size.z * sizeMultiplier.z
      );

      const hitboxMaterial = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        visible: false,
      });

      const hitbox = new THREE.Mesh(hitboxGeometry, hitboxMaterial);
      hitbox.position.copy(center);
      hitbox.name = originalObject.name + "_Hitbox";
      hitbox.userData.originalObject = originalObject;

      if (originalObject.name.includes("Headphones")) {
        hitbox.rotation.x = 0;
        hitbox.rotation.y = Math.PI / 4;
        hitbox.rotation.z = 0;
      }

      return hitbox;
    }

    function createDelayedHitboxes() {
      objectsNeedingHitboxes.forEach((child) => {
        const raycastObject = createStaticHitbox(child);

        if (raycastObject !== child) {
          scene.add(raycastObject);
        }

        raycasterObjects.push(raycastObject);
        hitboxToObjectMap.set(raycastObject, child);
      });

      objectsNeedingHitboxes.length = 0;
    }

    function handleRaycasterInteraction() {
      if (currentIntersects.length > 0) {
        const hitbox = currentIntersects[0].object;
        const object = hitboxToObjectMap.get(hitbox);

        if (object.name.includes("Button")) {
          buttonSounds.click.play();
        }

        Object.entries(pianoKeyMap).forEach(([keyName, soundKey]) => {
          if (object.name.includes(keyName)) {
            if (pianoDebounceTimer) {
              clearTimeout(pianoDebounceTimer);
            }

            fadeOutBackgroundMusic();

            pianoSounds[soundKey].play();

            pianoDebounceTimer = setTimeout(() => {
              fadeInBackgroundMusic();
            }, PIANO_TIMEOUT);

            gsap.to(object.rotation, {
              x: object.userData.initialRotation.x + Math.PI / 42,
              duration: 0.4,
              ease: "back.out(2)",
              onComplete: () => {
                gsap.to(object.rotation, {
                  x: object.userData.initialRotation.x,
                  duration: 0.25,
                  ease: "back.out(2)",
                });
              },
            });
          }
        });

        Object.entries(socialLinks).forEach(([key, url]) => {
          if (object.name.includes(key)) {
            const newWindow = window.open();
            newWindow.opener = null;
            newWindow.location = url;
            newWindow.target = "_blank";
            newWindow.rel = "noopener noreferrer";
          }
        });

        if (object.name.includes("Work_Button")) {
          showModal(modals.work);
        } else if (object.name.includes("About_Button")) {
          showModal(modals.about);
        } else if (object.name.includes("Contact_Button")) {
          showModal(modals.contact);
        }
      }
    }

    function playHoverAnimation(objectHitbox, isHovering) {
      let scale = 1.4;
      const object = hitboxToObjectMap.get(objectHitbox);
      gsap.killTweensOf(object.scale);
      gsap.killTweensOf(object.rotation);
      gsap.killTweensOf(object.position);

      if (object.name.includes("Coffee")) {
        gsap.killTweensOf(smoke.scale);
        if (isHovering) {
          gsap.to(smoke.scale, {
            x: 1.4,
            y: 1.4,
            z: 1.4,
            duration: 0.5,
            ease: "back.out(2)",
          });
        } else {
          gsap.to(smoke.scale, {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.3,
            ease: "back.out(2)",
          });
        }
      }

      if (object.name.includes("Fish")) {
        scale = 1.2;
      }

      if (isHovering) {
        // Scale animation for all objects
        gsap.to(object.scale, {
          x: object.userData.initialScale.x * scale,
          y: object.userData.initialScale.y * scale,
          z: object.userData.initialScale.z * scale,
          duration: 0.5,
          ease: "back.out(2)",
        });

        if (object.name.includes("About_Button")) {
          gsap.to(object.rotation, {
            x: object.userData.initialRotation.x - Math.PI / 10,
            duration: 0.5,
            ease: "back.out(2)",
          });
        } else if (
          object.name.includes("Contact_Button") ||
          object.name.includes("My_Work_Button") ||
          object.name.includes("GitHub") ||
          object.name.includes("YouTube") ||
          object.name.includes("Twitter")
        ) {
          gsap.to(object.rotation, {
            x: object.userData.initialRotation.x + Math.PI / 10,
            duration: 0.5,
            ease: "back.out(2)",
          });
        }

        if (object.name.includes("Boba") || object.name.includes("Name_Letter")) {
          gsap.to(object.position, {
            y: object.userData.initialPosition.y + 0.2,
            duration: 0.5,
            ease: "back.out(2)",
          });
        }
      } else {
        // Reset scale for all objects
        gsap.to(object.scale, {
          x: object.userData.initialScale.x,
          y: object.userData.initialScale.y,
          z: object.userData.initialScale.z,
          duration: 0.3,
          ease: "back.out(2)",
        });

        if (
          object.name.includes("About_Button") ||
          object.name.includes("Contact_Button") ||
          object.name.includes("My_Work_Button") ||
          object.name.includes("GitHub") ||
          object.name.includes("YouTube") ||
          object.name.includes("Twitter")
        ) {
          gsap.to(object.rotation, {
            x: object.userData.initialRotation.x,
            duration: 0.3,
            ease: "back.out(2)",
          });
        }

        if (object.name.includes("Boba") || object.name.includes("Name_Letter")) {
          gsap.to(object.position, {
            y: object.userData.initialPosition.y,
            duration: 0.3,
            ease: "back.out(2)",
          });
        }
      }
    }

    window.addEventListener("mousemove", (e) => {
      touchHappened = false;
      pointer.x = (e.clientX / sizes.width) * 2 - 1;
      pointer.y = -(e.clientY / sizes.height) * 2 + 1;
    });

    window.addEventListener(
      "touchstart",
      (e) => {
        // If a modal is open or the touch is inside a modal — skip 3D interaction
        if (isModalOpen || e.target.closest(".modal") || e.target.closest(".overlay")) return;

        // Only prevent default for 3D scene touches
        e.preventDefault();
        pointer.x = (e.touches[0].clientX / sizes.width) * 2 - 1;
        pointer.y = -(e.touches[0].clientY / sizes.height) * 2 + 1;
      },
      { passive: false }
    );

    window.addEventListener(
      "touchend",
      (e) => {
        if (isModalOpen || e.target.closest(".modal") || e.target.closest(".overlay")) return;
        e.preventDefault();
        handleRaycasterInteraction();
      },
      { passive: false }
    );


    window.addEventListener("click", handleRaycasterInteraction);

    // Other Event Listeners
    const themeToggleButton = document.querySelector(".theme-toggle-button");
    const muteToggleButton = document.querySelector(".mute-toggle-button");
    const sunSvg = document.querySelector(".sun-svg");
    const moonSvg = document.querySelector(".moon-svg");
    const soundOffSvg = document.querySelector(".sound-off-svg");
    const soundOnSvg = document.querySelector(".sound-on-svg");

    const updateMuteState = (muted) => {
      if (muted) {
        backgroundMusic.volume(0);
      } else {
        backgroundMusic.volume(BACKGROUND_MUSIC_VOLUME);
      }

      buttonSounds.click.mute(muted);
      Object.values(pianoSounds).forEach((sound) => {
        sound.mute(muted);
      });
    };

    const handleMuteToggle = (e) => {
      e.preventDefault();

      isMuted = !isMuted;
      updateMuteState(isMuted);
      buttonSounds.click.play();

      if (!backgroundMusic.playing()) {
        backgroundMusic.play();
      }

      gsap.to(muteToggleButton, {
        rotate: -45,
        scale: 5,
        duration: 0.5,
        ease: "back.out(2)",
        onStart: () => {
          if (!isMuted) {
            soundOffSvg.style.display = "none";
            soundOnSvg.style.display = "block";
          } else {
            soundOnSvg.style.display = "none";
            soundOffSvg.style.display = "block";
          }

          gsap.to(muteToggleButton, {
            rotate: 0,
            scale: 1,
            duration: 0.5,
            ease: "back.out(2)",
            onComplete: () => {
              gsap.set(muteToggleButton, {
                clearProps: "all",
              });
            },
          });
        },
      });
    };

    let isMuted = false;
    muteToggleButton.addEventListener(
      "click",
      (e) => {
        if (touchHappened) return;
        handleMuteToggle(e);
      },
      { passive: false }
    );

    muteToggleButton.addEventListener(
      "touchend",
      (e) => {
        touchHappened = true;
        handleMuteToggle(e);
      },
      { passive: false }
    );

    // Themeing stuff
    const toggleFavicons = () => {
      const isDark = document.body.classList.contains("dark-theme");
      const theme = isDark ? "light" : "dark";

      const setHref = (selector, path) => {
        const link = document.querySelector(selector);
        if (link) link.href = path;
      };

      setHref('link[sizes="96x96"]', `media/${theme}-favicon/favicon-96x96.png`);
      setHref('link[type="image/svg+xml"]', `media/${theme}-favicon/favicon.svg`);
      setHref('link[rel="shortcut icon"]', `media/${theme}-favicon/favicon.ico`);
      setHref('link[rel="apple-touch-icon"]', `media/${theme}-favicon/apple-touch-icon.png`);
      setHref('link[rel="manifest"]', `media/${theme}-favicon/site.webmanifest`);
    };


    let isNightMode = false;

    const handleThemeToggle = (e) => {
      e.preventDefault();
      toggleFavicons();

      const isDark = document.body.classList.contains("dark-theme");
      document.body.classList.remove(isDark ? "dark-theme" : "light-theme");
      document.body.classList.add(isDark ? "light-theme" : "dark-theme");

      isNightMode = !isNightMode;
      buttonSounds.click.play();

      gsap.to(themeToggleButton, {
        rotate: 45,
        scale: 5,
        duration: 0.5,
        ease: "back.out(2)",
        onStart: () => {
          if (isNightMode) {
            sunSvg.style.display = "none";
            moonSvg.style.display = "block";
          } else {
            moonSvg.style.display = "none";
            sunSvg.style.display = "block";
          }

          gsap.to(themeToggleButton, {
            rotate: 0,
            scale: 1,
            duration: 0.5,
            ease: "back.out(2)",
            onComplete: () => {
              gsap.set(themeToggleButton, {
                clearProps: "all",
              });
            },
          });
        },
      });

      Object.values(roomMaterials).forEach((material) => {
        gsap.to(material.uniforms.uMixRatio, {
          value: isNightMode ? 1 : 0,
          duration: 1.5,
          ease: "power2.inOut",
        });
      });
    };

    // Click event listener
    themeToggleButton.addEventListener(
      "click",
      (e) => {
        if (touchHappened) return;
        handleThemeToggle(e);
      },
      { passive: false }
    );

    themeToggleButton.addEventListener(
      "touchend",
      (e) => {
        touchHappened = true;
        handleThemeToggle(e);
      },
      { passive: false }
    );
    /**  -------------------------- Render and Animations Stuff -------------------------- */
    const clock = new THREE.Clock();

    const updateClockHands = () => {
      if (!hourHand || !minuteHand) return;

      const now = new Date();
      const hours = now.getHours() % 12;
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      const minuteAngle = (minutes + seconds / 60) * ((Math.PI * 2) / 60);

      const hourAngle = (hours + minutes / 60) * ((Math.PI * 2) / 12);

      minuteHand.rotation.x = -minuteAngle;
      hourHand.rotation.x = -hourAngle;
    };

    const render = (timestamp) => {
      const elapsedTime = clock.getElapsedTime();

      // Update Shader Univform
      if (smokeMaterial && smokeMaterial.uniforms?.uTime) {
        smokeMaterial.uniforms.uTime.value = elapsedTime;
      }


      //Update Orbit Controls
      controls.update();

      // Update Clock hand rotation
      updateClockHands();

      // Fan rotate animation
      xAxisFans.forEach((fan) => {
        fan.rotation.x -= 0.04;
      });

      yAxisFans.forEach((fan) => {
        fan.rotation.y -= 0.04;
      });

      // Chair rotate animation
      if (chairTop) {
        const time = timestamp * 0.001;
        const baseAmplitude = Math.PI / 8;

        const rotationOffset =
          baseAmplitude *
          Math.sin(time * 0.5) *
          (1 - Math.abs(Math.sin(time * 0.5)) * 0.3);

        chairTop.rotation.y = chairTop.userData.initialRotation.y + rotationOffset;
      }

      // Fish up and down animation
      if (fish) {
        const time = timestamp * 0.0015;
        const amplitude = 0.12;
        const position =
          amplitude * Math.sin(time) * (1 - Math.abs(Math.sin(time)) * 0.1);
        fish.position.y = fish.userData.initialPosition.y + position;
      }

      // Raycaster
      if (!isModalOpen) {
        raycaster.setFromCamera(pointer, camera);

        // Get all the objects the raycaster is currently shooting through / intersecting with
        currentIntersects = raycaster.intersectObjects(raycasterObjects);

        for (let i = 0; i < currentIntersects.length; i++) { }

        if (currentIntersects.length > 0) {
          const currentIntersectObject = currentIntersects[0].object;

          if (currentIntersectObject.name.includes("Hover")) {
            if (currentIntersectObject !== currentHoveredObject) {
              if (currentHoveredObject) {
                playHoverAnimation(currentHoveredObject, false);
              }

              currentHoveredObject = currentIntersectObject;
              playHoverAnimation(currentIntersectObject, true);
            }
          }

          if (currentIntersectObject.name.includes("Pointer")) {
            document.body.style.cursor = "pointer";
          } else {
            document.body.style.cursor = "default";
          }
        } else {
          if (currentHoveredObject) {
            playHoverAnimation(currentHoveredObject, false);
            currentHoveredObject = null;
          }
          document.body.style.cursor = "default";
        }
      }

      renderer.render(scene, camera);

      window.requestAnimationFrame(render);
    };

    render();

  }, []);

  return (
    <div className="light-theme">

      <div className="loading-screen">
        <button className="loading-screen-button">
          Loading...
        </button>

        <button className="no-sound-button">

        </button>

        <p className="desktop-instructions instructions">use left/right click and mouse wheel to navigate!</p>
        <p className="mobile-instructions instructions">use one or two fingers to navigate!</p>
      </div>

      <div className="overlay"></div>

      <button className="mute-toggle-button toggle-buttons">
        <svg
          width="800"
          height="800"
          viewBox="0 0 800 800"
          fill="none"
          className="sound-svg sound-off-svg"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M366.064 567.04C430.064 624 508.464 663.04 545.584 650.56C612.784 625.6 623.984 490.557 623.984 397.117C623.984 371.197 623.984 341.76 620.464 312.641"
            strokeWidth="85"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M596.134 200.963C592.038 188.521 585.44 177.047 576.746 167.252C568.051 157.456 557.443 149.545 545.578 144.002C506.218 129.282 422.698 175.999 353.578 237.119H302.375C268.427 237.119 235.87 250.606 211.865 274.611C187.86 298.616 174.375 331.171 174.375 365.12V429.12C174.365 453.795 181.488 477.952 194.887 498.672C208.285 519.395 227.387 535.802 249.894 545.92"
            strokeWidth="85"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M720 77.4414L80 717.44"
            strokeWidth="85"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <svg
          width="800"
          height="800"
          viewBox="0 0 800 800"
          fill="none"
          className="sound-svg sound-on-svg"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M417.578 144.002C378.218 129.282 294.696 175.999 225.576 237.119H174.375C140.427 237.119 107.87 250.606 83.8653 274.611C59.8605 298.616 46.375 331.171 46.375 365.12V429.12C46.375 463.066 59.8605 495.626 83.8653 519.632C107.87 543.635 140.427 557.12 174.375 557.12H225.576C293.096 619.2 376.618 664.96 417.578 650.56C484.778 625.6 495.974 490.56 495.974 397.12C495.974 303.679 484.778 168.962 417.578 144.002Z"
            strokeWidth="85"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M677.127 215.039C725.098 263.044 752.049 328.134 752.049 396C752.049 463.866 725.098 528.957 677.127 576.96"
            strokeWidth="85"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M609.252 510.4C639.246 480.394 656.097 439.703 656.097 397.277C656.097 354.851 639.246 314.165 609.252 284.16"
            strokeWidth="85"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <button className="theme-toggle-button toggle-buttons">
        <svg className="sun-svg" width="800" height="800" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M733.333 550H66.666M666.666 666.667H133.333M399.999 100V166.667M133.333 433.333H66.666M210.47 243.804L163.329 196.663M589.516 243.804L636.659 196.663M733.333 433.333H666.666M233.333 433.333C233.333 341.287 307.952 266.667 399.999 266.667C492.046 266.667 566.666 341.287 566.666 433.333" strokeWidth="85" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <svg className="moon-svg" width="800" height="800" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M446.619 254.869C449.832 245.908 462.666 245.908 465.879 254.869L474.669 279.371C475.699 282.239 477.983 284.495 480.886 285.511L505.696 294.193C514.766 297.368 514.766 310.04 505.696 313.215L480.886 321.897C477.983 322.913 475.699 325.169 474.669 328.038L465.879 352.54C462.666 361.5 449.832 361.5 446.619 352.54L437.829 328.038C436.799 325.169 434.516 322.913 431.612 321.897L406.803 313.215C397.733 310.04 397.733 297.368 406.803 294.193L431.612 285.511C434.516 284.495 436.799 282.239 437.829 279.371L446.619 254.869Z" fill="currentColor" />
          <path d="M543.581 363.74C545.724 357.766 554.278 357.766 556.421 363.74L562.281 380.073C562.968 381.986 564.491 383.49 566.427 384.166L582.964 389.956C589.014 392.073 589.014 400.52 582.964 402.636L566.427 408.423C564.491 409.103 562.968 410.606 562.281 412.52L556.421 428.853C554.278 434.826 545.724 434.826 543.581 428.853L537.721 412.52C537.034 410.606 535.511 409.103 533.574 408.423L517.037 402.636C510.987 400.52 510.987 392.073 517.037 389.956L533.574 384.166C535.511 383.49 537.034 381.986 537.721 380.073L543.581 363.74Z" fill="currentColor" />
          <path d="M592.31 109.728C596.963 96.7573 615.537 96.7573 620.19 109.728L636.14 154.184C637.627 158.335 640.937 161.602 645.14 163.073L690.15 178.825C703.283 183.421 703.283 201.764 690.15 206.36L645.14 222.112C640.937 223.583 637.627 226.85 636.14 231.002L620.19 275.457C615.537 288.428 596.963 288.428 592.31 275.457L576.36 231.002C574.873 226.85 571.563 223.583 567.36 222.112L522.35 206.36C509.217 201.764 509.217 183.421 522.35 178.825L567.36 163.073C571.563 161.602 574.873 158.335 576.36 154.184L592.31 109.728Z" fill="currentColor" />
          <path d="M100 448.657C100 587.47 215.807 700 358.66 700C468.637 700 562.58 633.31 600 539.277C570.363 552.803 537.27 560.363 502.363 560.363C375.38 560.363 272.441 460.337 272.441 336.947C272.441 285.342 290.446 237.824 320.685 200C195.834 217.85 100 322.377 100 448.657Z" strokeWidth="85" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className="work modal">
        <div className="modal-wrapper">
          <h1 className="modal-title">~ My Work ~</h1>

          <div className="modal-content">
            <div className="modal-content-wrapper">

              <div className="work-project">
                <div className="work-project-wrapper">
                  <div className="work-image-wrapper">
                    <img
                      className="work-base-image"
                      src="images/RIAM.webp"
                      alt=""
                      srcSet=""
                    />
                  </div>
                  <div className="paragraph-section">
                    <h2 className="modal-paragraph-header">
                      <a
                        href="https://drive.google.com/drive/folders/1QqZQrz7KbAhhZjwX84hGcd7uG6FX80zK?fbclid=IwY2xjawNa4XJleHRuA2FlbQIxMQABHsakBsYS5JYCeXSr-po5ZtueRKOfG3fJNemQcDirA0Kas2pQuL5LHt4GjiMV_aem_NIGnsV4wh2rchEK3KsUFsw"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline text-blue-600" style={{ color: 'inherit' }}

                      >
                        Rat in a Maze
                      </a>
                    </h2>
                    <p className="modal-paragraph-text">
                      "In 'Rat in a Maze,' a clever algorithm guides a virtual agent through a
                      labyrinth of twists and turns. Amidst the maze, a mysterious disappearance
                      draws the attention of Job, who must investigate what happened to Jamela.
                      Combining logic, strategy, and suspense, every step uncovers clues that
                      reveal the secrets hidden within the maze."                    </p>
                    <p className="modal-paragraph-text sm-margin-top lg-margin-bottom  sm-font">
                      Video Editor: Francois Dunga,
                      Lovely Pintes,
                      Nathaniel David,
                    </p>
                    <p className="modal-paragraph-text sm-margin-top lg-margin-bottom  sm-font">
                      Cast: Francois Dunga,
                      Sofia Latina,
                      Amber Rosana,
                      Evangeline Angana,
                      Lorlyn Boiser,
                      Maffia Guaro,
                      Margarette Calumpiano,
                      Jilyanz Santillian,

                    </p>
                  </div>
                </div>
              </div>
              <div className="work-project">
                <div className="work-project-wrapper">
                  <div className="work-image-wrapper">
                    <img
                      className="work-base-image"
                      src="images/piano.webp"
                      alt=""
                      srcSet=""
                    />
                  </div>
                  <div className="paragraph-section">
                    <h2 className="modal-paragraph-header">
                      <a
                        href="https://drive.google.com/drive/folders/1bnOhzptn2JIwy2215b5-784fZIgn6U67?fbclid=IwY2xjawNa6txleHRuA2FlbQIxMQABHhJ237NMW8zlwzCC68FaZq7GbIX0nds6Hv2ceV8X7GH_J8_ztsJEy4H8K8_K_aem_gIxyGeGYBJyXy-9h_NvyQA"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline text-blue-600" style={{ color: 'inherit' }}
                      >
                        Case 1229
                      </a>
                    </h2>
                    <p className="modal-paragraph-text">
                      "Case 1229 picks up where 'Rat in a Maze' left off. Job returns to the labyrinth,
                      but this time the stakes are higher: new twists, hidden passages, and cryptic
                      clues point to a deeper mystery. As he navigates the maze, Job uncovers secrets
                      about Jamela’s disappearance that challenge everything he thought he knew, blending
                      logic, suspense, and a race against time to solve the case."
                    </p>
                    <p className="modal-paragraph-text sm-margin-top lg-margin-bottom  sm-font">
                      Video Editor: Francois Dunga,
                      Lovely Pintes,
                      Nathaniel David,
                    </p>
                    <p className="modal-paragraph-text sm-margin-top lg-margin-bottom  sm-font">
                      Cast: Francois Dunga,
                      Sofia Latina,
                      Amber Rosana,
                      Evangeline Angana,
                      Lorlyn Boiser,
                      Maffia Guaro,
                      Margarette Calumpiano,
                      Jilyanz Santillian,

                    </p>
                  </div>
                </div>
              </div>

              <div className="work-project">
                <div className="work-project-wrapper">
                  <div className="work-image-wrapper">
                    <img
                      className="work-base-image"
                      src="images/RIAM.webp"
                      alt=""
                      srcSet=""
                    />
                  </div>
                  <div className="paragraph-section">
                    <h2 className="modal-paragraph-header">
                      <a
                        href="https://drive.google.com/drive/folders/1QqZQrz7KbAhhZjwX84hGcd7uG6FX80zK?fbclid=IwY2xjawNa4XJleHRuA2FlbQIxMQABHsakBsYS5JYCeXSr-po5ZtueRKOfG3fJNemQcDirA0Kas2pQuL5LHt4GjiMV_aem_NIGnsV4wh2rchEK3KsUFsw"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline text-blue-600" style={{ color: 'inherit' }}

                      >
                        Rat in a Maze
                      </a>
                    </h2>
                    <p className="modal-paragraph-text">
                      "In 'Rat in a Maze,' a clever algorithm guides a virtual agent through a
                      labyrinth of twists and turns. Amidst the maze, a mysterious disappearance
                      draws the attention of Job, who must investigate what happened to Jamela.
                      Combining logic, strategy, and suspense, every step uncovers clues that
                      reveal the secrets hidden within the maze."                    </p>
                    <p className="modal-paragraph-text sm-margin-top lg-margin-bottom  sm-font">
                      Video Editor: Francois Dunga,
                      Lovely Pintes,
                      Nathaniel David,
                    </p>
                    <p className="modal-paragraph-text sm-margin-top lg-margin-bottom  sm-font">
                      Cast: Francois Dunga,
                      Sofia Latina,
                      Amber Rosana,
                      Evangeline Angana,
                      Lorlyn Boiser,
                      Maffia Guaro,
                      Margarette Calumpiano,
                      Jilyanz Santillian,

                    </p>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
        <button className="modal-exit-button">
          <svg
            width="98"
            height="96"
            viewBox="0 0 98 96"
            className="exit-button-svg"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="115.92"
              height="17.889"
              rx="8.94448"
              transform="matrix(-0.696845 0.717222 0.717222 0.696845 83.1709 0)"
              fill="currentColor"
            />
            <rect
              width="115.92"
              height="17.889"
              rx="8.94448"
              transform="matrix(0.73406 0.679084 0.679084 -0.73406 0 13.1318)"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
      <div className="about modal">
        <div className="modal-wrapper">
          <h1 className="modal-title">~ About Me ~</h1>

          <div className="modal-content">
            <div className="modal-content-wrapper">
              <div className="paragraph-section">
                <div className="image-wrapper">
                  <img
                    className="base-image"
                    src="images/profile.webp"
                    alt=""
                    srcSet=""
                  />
                </div>
                <h2 className="modal-paragraph-header">
                  Frontend Developer, Backend Developer, Artists, Animator, Video Editor
                </h2>
                <br></br>
                <p className="modal-paragraph-text">
                  <b>Lovely Heart Pintes</b>, but you can also call me
                  Lovely! I'm currently a third-year student at La Verdad Christian College
                  studying information systems. I love to take my combination of skills of
                  technical and artsy skills to create beautiful things for the world that I am
                  passionate about.
                </p>
                <p className="modal-paragraph-text sm-margin-top">
                  In my free time you'll definitely catch me watching anime, J-drama and
                  playing games. I also practice coding one or two hours a day and continuously
                  work on improving my problem-solving skills and building real-world projects.
                  May or may not also catch me going for strolls around my neighbohrhood.
                </p>
                <h2 className="modal-paragraph-header">──────── ✦ ────────</h2>


                <h2 className="modal-paragraph-header">4th Regional Cybersecurity Conference</h2>
                <div className="image-about-wrapper">
                  <img
                    className="base-image"
                    src="images/CTF.webp"
                    alt=""
                    srcSet=""
                  />
                </div>
                <p className="list-text">
                  Our team proudly won Champion at the 4th Regional Cybersecurity Conference
                  held at Holy Angel University, earning an impressive score of 3400 points.
                  It was an incredible experience that tested our technical skills, teamwork,
                  and problem-solving under pressure — a true reflection of our dedication to
                  cybersecurity excellence.
                </p>

                <br></br>
                <h2 className="modal-paragraph-header">University Capture the Flag</h2>

                <div className="image-about-wrapper">
                  <img
                    className="base-image"
                    src="images/UCTF.webp"
                    alt=""
                    srcSet=""
                  />
                </div>
                <p className="list-text">
                  Our team proudly placed 37th in the UCTF (University Capture The Flag) competition —
                  a national-level cybersecurity event that tested our skills in areas such as cryptography,
                  web exploitation, reverse engineering, and forensics. Despite the tough competition, we
                  demonstrated persistence, collaboration, and continuous learning throughout the challenge.
                </p>
                <br></br>
                <h2 className="modal-paragraph-header">IRCITE I.T. Marketing Challenge</h2>

                <div className="image-about-wrapper">
                  <img
                    className="base-image"
                    src="images/ITMarketing.webp"
                    alt=""
                    srcSet=""
                  />
                </div>
                <p className="list-text">
                  Our team had the exciting opportunity to join the IRCITE I.T. Marketing Challenge,
                  where we combined creativity, strategy, and technical knowledge to present an
                  innovative marketing concept centered around technology and digital engagement.
                </p>

                <br></br>

                <h2 className="modal-paragraph-header-2">Skills and Expertise:</h2>
                <ul>
                  <li className="list-text-2">
                    Proficient in JavaScript, React, and Python, with experience in both frontend and backend development.
                  </li>
                  <li className="list-text-2">
                    Skilled in UI/UX design, animation, and creative storytelling through digital art and visuals.
                  </li>
                  <li className="list-text-2">
                    Passionate about continuous learning — from cybersecurity to interactive 3D web experiences.
                  </li>
                </ul>

                <h2 className="modal-paragraph-header-2">Core Programming:</h2>
                <ul>
                  <li className="list-text-2">React.js → Frontend development with Vite + Mantine</li>
                  <li className="list-text-2">Laravel / PHP → Backend web development, APIs</li>
                  <li className="list-text-2">HTML / CSS / Tailwind → UI styling and responsive design</li>
                  <li className="list-text-2">Databases & APIs (MySQL, REST APIs)</li>
                  <li className="list-text-2">Python → Automation, scripting, and CTF challenges</li>
                  <li className="list-text-2">C++ → Performance-heavy coding, algorithms, problem-solving</li>
                  <li className="list-text-2">C# → Unity and application development</li>
                </ul>

                <h2 className="modal-paragraph-header-2">Cybersecurity:</h2>
                <ul>
                  <li className="list-text-2">
                    <strong>Web Exploitation:</strong> SQL Injection, XSS, Command Injection, Authentication Bypass
                  </li>
                  <li className="list-text-2">
                    <strong>Cryptography:</strong> Classic Ciphers (Caesar, Vigenère), Modern Crypto (RSA, AES, ECC basics), Hash Cracking (MD5, SHA-1)
                  </li>
                  <li className="list-text-2">
                    <strong>Forensics:</strong> File Analysis, Packet Capture Analysis (Wireshark, PCAP), Steganography
                  </li>
                  <li className="list-text-2">
                    <strong>Reverse Engineering:</strong> Binary Analysis (Ghidra, IDA Free, Radare2), Decompiling & Debugging, Malware Basics
                  </li>
                  <li className="list-text-2">
                    <strong>Pwn/Exploitation:</strong> Buffer Overflow, Format String Exploits, Memory Corruption
                  </li>
                  <li className="list-text-2">
                    <strong>OSINT:</strong> Social Media Reconnaissance, Public Data Gathering, Google Dorking
                  </li>
                  <li className="list-text-2">
                    <strong>Misc / General:</strong> Python Scripting, CTF Tools (CyberChef, Strings, Binwalk), Puzzle / Logic challenges
                  </li>
                </ul>

                <h2 className="modal-paragraph-header-2">Design & Animation:</h2>
                <ul>
                  <li className="list-text-2">
                    <strong>2D Art & Animation:</strong> Digital Drawing & Illustration, Character Design, Storyboarding, 2D Animation (frame-by-frame / motion)
                    <em>Tools:</em> Krita, Photoshop, Illustrator, Toon Boom, After Effects
                  </li>
                  <li className="list-text-2">
                    <strong>3D Modeling & Animation:</strong> Hard Surface Modeling, Organic Modeling, Texturing, Rigging, 3D Animation, Sculpting
                    <em>Tools:</em> Blender, Maya, 3ds Max
                  </li>
                  <li className="list-text-2">
                    <strong>Visual Effects & Editing:</strong> Compositing, Motion Graphics, Particle Simulation, Green Screen, Cinematic Camera & Lighting, Video Editing
                    <em>Tools:</em> After Effects, Premiere Pro, DaVinci Resolve, Nuke
                  </li>
                  <li className="list-text-2">
                    <strong>Creative Media Integration:</strong> 2D + 3D hybrid, VFX for coding/game projects, UI/UX Design, Animation for storytelling
                  </li>
                </ul>

                <h2 className="modal-paragraph-header-2">Soft Skills:</h2>
                <ul>
                  <li className="list-text-2">
                    <strong>Core Soft Skills:</strong> Teamwork, Problem-Solving, Creativity, Communication
                  </li>
                  <li className="list-text-2">
                    <strong>Growth & Work Skills:</strong> Adaptability, Time Management, Leadership, Critical Thinking, Resilience
                  </li>
                  <li className="list-text-2">
                    <strong>Professional Skills:</strong> Presentation Skills, Collaboration Tools (GitHub, Trello, Discord), Documentation, Attention to Detail
                  </li>
                  <li className="list-text-2">
                    <strong>Personal Qualities:</strong> Curiosity, Self-Motivation, Open-Mindedness, Patience
                  </li>
                </ul>


              </div>
            </div>
          </div>
        </div>
        <button className="modal-exit-button">
          <svg
            width="98"
            height="96"
            viewBox="0 0 98 96"
            className="exit-button-svg"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="115.92"
              height="17.889"
              rx="8.94448"
              transform="matrix(-0.696845 0.717222 0.717222 0.696845 83.1709 0)"
              fill="currentColor"
            />
            <rect
              width="115.92"
              height="17.889"
              rx="8.94448"
              transform="matrix(0.73406 0.679084 0.679084 -0.73406 0 13.1318)"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
      <div className="contact modal">
        <div className="modal-wrapper">
          <h1 className="modal-title">~ Say hello! ~</h1>

          <div className="modal-content">
            <div className="modal-content-wrapper">
              <div className="paragraph-section">
                <h2 className="modal-paragraph-header xsm-margin-top">
                  If you like coding, music, games, and food, let's connect!
                </h2>
                <div className="contact-button-wrapper">
                  <a
                    className="contact-link"
                    href="mailto:galacticabaddon@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className="contact-svg mail" width="800" height="800" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M656.85 209.817C608.726 166.348 527.66 150 400 150C272.34 150 191.272 166.348 143.15 209.817M656.85 209.817C700.01 248.804 716.666 309.608 716.666 400C716.666 591.177 642.156 650 400 650C157.843 650 83.333 591.177 83.333 400C83.333 309.608 99.9903 248.804 143.15 209.817M656.85 209.817L447.14 419.527C421.103 445.56 378.893 445.56 352.86 419.527L143.15 209.817" stroke="currentColor" strokeWidth="66.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                  <a
                    className="contact-link"
                    href="https://github.com/Lvly-00"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      width="800"
                      height="800"
                      viewBox="0 0 800 800"
                      fill="none"
                      className="contact-svg github"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M700 400C700 565.687 565.687 700 400 700C234.315 700 100 565.687 100 400C100 234.315 234.315 100 400 100C565.687 100 700 234.315 700 400Z"
                        stroke="currentColor"
                        strokeWidth="66.6667"
                      />
                      <path
                        d="M457.234 296.059C419.604 285.652 380.397 285.652 342.767 296.059C342.124 296.237 341.481 296.418 340.841 296.603C336.891 297.74 332.642 296.967 329.357 294.497C289.771 264.731 269.093 266.061 263.976 267.054C263.154 267.214 262.529 267.827 262.245 268.615C262.173 268.814 262.102 269.013 262.031 269.212C253.88 292.169 252.635 317.605 258.426 341.417C258.764 342.804 259.124 344.184 259.509 345.557C259.534 345.647 259.56 345.737 259.585 345.827C259.919 347.007 259.674 348.277 258.927 349.254C258.359 349.994 257.799 350.744 257.248 351.5C241.494 373.13 232.97 400.71 233.346 429.157C233.346 544.664 293.466 571.194 351.167 579.037L352.361 579.194C384.491 583.997 415.291 583.7 447.317 578.264L448.127 578.167C506.107 571.13 566.654 545.29 566.654 429.157C567.031 400.71 558.507 373.13 542.754 351.5C542.247 350.807 541.734 350.117 541.214 349.434L541.174 349.384C540.367 348.327 540.101 346.95 540.461 345.67C540.857 344.257 541.227 342.84 541.571 341.417C547.367 317.537 546.051 292.026 537.764 269.059C537.711 268.918 537.661 268.777 537.611 268.637C537.317 267.835 536.681 267.21 535.841 267.048C530.701 266.055 510.137 264.794 470.644 294.497C467.361 296.966 463.111 297.733 459.161 296.602C458.521 296.418 457.877 296.237 457.234 296.059Z"
                        stroke="currentColor"
                        strokeWidth="66.6667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                  <a
                    className="contact-link"
                    href="https://www.linkedin.com/in/lovely-pintes-3b40962bb/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      width="800"
                      height="800"
                      viewBox="0 0 800 800"
                      className="contact-svg linkedin"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_371_15)">
                        <path
                          d="M600 100C655.23 100 700 144.772 700 200V600C700 655.23 655.23 700 600 700H200C144.772 700 100 655.23 100 600V200C100 144.772 144.772 100 200 100H600ZM600 166.667H200C181.591 166.667 166.667 181.591 166.667 200V600C166.667 618.41 181.591 633.333 200 633.333H600C618.41 633.333 633.333 618.41 633.333 600V200C633.333 181.591 618.41 166.667 600 166.667ZM266.667 333.333C283.761 333.333 297.85 346.201 299.776 362.779L300 366.667V533.333C300 551.743 285.076 566.667 266.667 566.667C249.572 566.667 235.483 553.799 233.558 537.221L233.333 533.333V366.667C233.333 348.257 248.257 333.333 266.667 333.333ZM366.667 300C383.043 300 396.66 311.809 399.47 327.376C406.21 323.478 413.167 319.964 420.223 316.946C442.463 307.432 475.773 302.198 505.83 311.65C521.587 316.603 537.44 325.969 549.193 341.853C559.682 356.034 565.33 373.28 566.456 392.642L566.667 400V533.333C566.667 551.74 551.743 566.667 533.333 566.667C516.238 566.667 502.15 553.796 500.224 537.22L500 533.333V400C500 389.023 497.337 383.857 495.6 381.503C493.81 379.087 490.913 376.843 485.837 375.247C474.227 371.597 457.537 373.493 446.443 378.24C429.742 385.383 414.491 396.571 404.131 406.945L400 411.327V533.333C400 551.743 385.077 566.667 366.667 566.667C349.572 566.667 335.483 553.799 333.558 537.221L333.333 533.333V333.333C333.333 314.924 348.257 300 366.667 300ZM266.667 233.333C285.076 233.333 300 248.257 300 266.667C300 285.076 285.076 300 266.667 300C248.257 300 233.333 285.076 233.333 266.667C233.333 248.257 248.257 233.333 266.667 233.333Z"
                          fill="currentColor"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_371_15">
                          <rect width="800" height="800" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </a>


                </div>
              </div>
            </div>
          </div>
        </div>
        <button className="modal-exit-button">
          <svg
            width="98"
            height="96"
            viewBox="0 0 98 96"
            className="exit-button-svg"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="115.92"
              height="17.889"
              rx="8.94448"
              transform="matrix(-0.696845 0.717222 0.717222 0.696845 83.1709 0)"
              fill="currentColor"
            />
            <rect
              width="115.92"
              height="17.889"
              rx="8.94448"
              transform="matrix(0.73406 0.679084 0.679084 -0.73406 0 13.1318)"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>

      <div id="experience">
        <canvas id="experience-canvas" className="experience-canvas"></canvas>
      </div>
    </div>
  );

}
