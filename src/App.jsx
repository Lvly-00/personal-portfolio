import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { DRACOLoader } from "three/examples/jsm/Addons.js";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import gsap from "gsap";

export default function App() {
  const canvasRef = useRef();

  useEffect(() => {
    // Canvas reference
    const canvas = canvasRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const modals = {
      work: document.querySelector(".work.modal"),
      about: document.querySelector(".about.modal"),
      contact: document.querySelector(".contact.modal"),
    };

    const showModal = (modal) => {
      if (!modal) return;
      modal.style.display = "flex";
      gsap.fromTo(modal, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" });
    };

    const hideModal = (modal) => {
      if (!modal) return;
      gsap.to(modal, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => (modal.style.display = "none"),
      });
    };

    //  click logic (replace with your raycaster trigger)
    document.querySelector(".modal-title").addEventListener("click", () => showModal(modals.work));

    // Exit buttons
    const exitButtons = document.querySelectorAll(".modal-exit-button");
    exitButtons.forEach((btn) => {
      btn.addEventListener("touchend", () => {
        const modal = btn.closest(".modal");
        hideModal(modal);
      });
      btn.addEventListener("click", () => {
        const modal = btn.closest(".modal");
        hideModal(modal);
      });
    });

    // Fans rotation 
    const yAxisFans = []
    const xAxisFans = []


    const raycasterObjects = [];
    let currentIntersects = [];
    let currentHoveredObjects = null;

    const socialLinks = {
      "GitHub": "https://github.com/Lvly-00",
      "LinkedIn": "https://www.linkedin.com/in/lovely-pintes-3b40962bb/",
      "Facebook": "https://www.facebook.com/lovely.pintes.2024",

    }

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();


    // Loaders
    const textureLoader = new THREE.TextureLoader();

    // Model Loader
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('draco/');

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    const environmentMap = new THREE.CubeTextureLoader()
      .setPath('textures/skybox/')
      .load([
        'px.webp',
        'nx.webp',
        'py.webp',
        'py.webp',
        'pz.webp',
        'nz.webp',
      ])

    const textureMap = {
      First: {
        day: "textures/room/day/first_texture_set_day.webp",
        night: "textures/room/day/first_texture_set_night.webp",
      },
      Second: {
        day: "textures/room/day/second_texture_set_day.webp",
        night: "textures/room/day/second_texture_set_night.webp",
      },
      Third: {
        day: "textures/room/day/third_texture_set_day.webp",
        night: "textures/room/day/third_texture_set_night.webp",
      },
      Fourth: {
        day: "textures/room/day/fourth_texture_set_day.webp",
        night: "textures/room/day/fourth_texture_set_night.webp",
      },
    };

    const loadedTextures = {
      day: {},
      night: {},
    };

    Object.entries(textureMap).forEach(([key, paths]) => {
      const dayTexture = textureLoader.load(paths.day);
      dayTexture.flipY = false;
      loadedTextures.day[key] = dayTexture;

      const nightTexture = textureLoader.load(paths.night);
      nightTexture.flipY = false;
      loadedTextures.night[key] = nightTexture;

      // Set color properties 
      [dayTexture, nightTexture].forEach((t) => {
        t.colorSpace = THREE.SRGBColorSpace;
        t.wrapS = t.wrapT = THREE.RepeatWrapping;
      });

    });

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      transmission: 1,
      opacity: 1,
      metalness: 0,
      roughness: 0,
      ior: 1.5,
      thickness: 0.01,
      specularIntensity: 1,
      envMap: environmentMap,
      envMapIntensity: 1,
      lightMapIntensity: 1,
      depthWrite: false,
      exposure: 1,
    })

    const whiteMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    })

    const videoElement = document.createElement("video");
    videoElement.src = "textures/video/Screen.mp4";
    videoElement.loop = true;
    videoElement.muted = true;
    videoElement.playsInline = true;
    videoElement.autoplay = true;
    videoElement.play()


    const videoTexture = new THREE.VideoTexture(videoElement)
    videoTexture.colorSpace = THREE.SRGBColorSpace;
    videoTexture.flipY = false;

    window.addEventListener("mousemove", (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = - (e.clientY / window.innerHeight) * 2 + 1;

    })


    window.addEventListener("touchstart", (e) => {
      e.preventDefault();

      pointer.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
      pointer.y = - (e.touches[0].clientY / window.innerHeight) * 2 + 1;

    }, { passive: false, })

    window.addEventListener("touchend", (e) => {
      e.preventDefault();

      if (currentIntersects.length > 0) {
        const object = currentIntersects[0].object;

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
    }, { passive: false });


    window.addEventListener("click", (e) => {
      if (currentIntersects.length > 0) {
        const object = currentIntersects[0].object;

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
          showModal(modals.work)
        } else if (object.name.includes("About_Button")) {
          showModal(modals.about)
        } else if (object.name.includes("Contact_Button")) {
          showModal(modals.contact)
        }
      }
    })


    loader.load("models/Room_Portfolio.glb", (glb) => {
      glb.scene.traverse((child) => {
        if (child.isMesh) {
          if (child.name.includes("Raycaster")) {
            raycasterObjects.push(child);
          }

          if (child.name.includes("Hover")) {
            child.userData.initialScale = new THREE.Vector3().copy(child.scale)
            child.userData.initialPosition = new THREE.Vector3().copy(child.position)
            child.userData.initialRotation = new THREE.Euler().copy(child.rotation)
          }

          if (child.name.includes("Water")) {
            child.material = new THREE.MeshBasicMaterial({
              color: 0x558Bc8,
              transparent: true,
              opacity: 0.66,
              depthWrite: false,
            });

          } else if (child.name.includes("Glass")) {
            child.material = glassMaterial;
          } else if (child.name.includes("Bubble")) {
            child.material = whiteMaterial;
          } else if (child.name.includes("Screen")) {
            child.material = new THREE.MeshBasicMaterial({
              map: videoTexture,
            });
          } else {
            Object.keys(textureMap).forEach((key) => {
              if (child.name.includes(key)) {
                const material = new THREE.MeshBasicMaterial({
                  map: loadedTextures.day[key],
                });

                child.material = material;

                if (child.name.includes("Fan")) {
                  if (child.name.includes("Fan_2") || child.name.includes("Fan_4")) {
                    xAxisFans.push(child);
                  } else {
                    yAxisFans.push(child);
                  }
                }

                if (child.material.map) {
                  child.material.map.minFilter = THREE.LinearFilter;
                }
              }


            });
          }
        }


      });

      scene.add(glb.scene);
    });


    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      35,
      sizes.width / sizes.height,
      0.1,
      1000
    );
    camera.position.set(
      29.567116827654726,
      14.018476147584705,
      31.37040363900147
    );
    scene.add(camera);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Controls (after renderer is defined )
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.update();
    controls.target.set(
      -0.08206262548844094,
      3.3119233527087255,
      -0.7433922282864018
    );

    // Hovering objects Animation
    function playHoverAnimation(object, isHovering) {
      gsap.killTweensOf(object.scale);
      gsap.killTweensOf(object.rotation);
      gsap.killTweensOf(object.position);



      if (isHovering) {
        gsap.to(object.scale, {
          x: object.userData.initialScale.x * 1.2,
          y: object.userData.initialScale.y * 1.2,
          z: object.userData.initialScale.z * 1.2,
          duration: 0.5,
          ease: "bounce.out(1.8)",
        });
        gsap.to(object.rotation, {
          x: object.userData.initialRotation.x + Math.PI / 8,
          duration: 0.5,
          ease: "bounce.out(1.8)",

        });
      } else {
        gsap.to(object.scale, {
          x: object.userData.initialScale.x,
          y: object.userData.initialScale.y,
          z: object.userData.initialScale.z,
          duration: 0.3,
          ease: "bounce.out(1.8)",
        });
        gsap.to(object.rotation, {
          x: object.userData.initialRotation.x,
          duration: 0.3,
          ease: "bounce.out(1.8)",

        });
      }
    }


    // Animation loop
    const render = () => {
      controls.update();

      // console.log(camera.position)
      // console.log("0000000000")
      // console.log(controls.target)
      // console.log("Raycaster objects:", raycasterObjects);


      // Animate Fans
      xAxisFans.forEach((fan) => {
        fan.rotation.x += 0.04;
      });

      yAxisFans.forEach((fan) => {
        fan.rotation.y += 0.04;
      });

      // Raycaster
      raycaster.setFromCamera(pointer, camera);

      // calculate objects intersecting the picking ray
      currentIntersects = raycaster.intersectObjects(raycasterObjects);

      for (let i = 0; i < currentIntersects.length; i++) {
        // currentIntersects[i].object.material.color.set(0xff0000);
      }

      if (currentIntersects.length > 0) {
        const currentIntersectObject = currentIntersects[0].object;

        if (currentIntersectObject.name.includes("Hover")) {
          if (currentIntersectObject !== currentHoveredObjects) {

            if (currentHoveredObjects) {
              playHoverAnimation(currentHoveredObjects, false);
            }
            playHoverAnimation(currentIntersectObject, true);
            currentHoveredObjects = currentIntersectObject;
          }
        }

        if (currentIntersectObject.name.includes("Pointer")) {
          document.body.style.cursor = "pointer";
        } else {
          document.body.style.cursor = "default";
        }
      } else {
        if (currentHoveredObjects) {
          playHoverAnimation(currentHoveredObjects, false);
          currentHoveredObjects = null;
        }
        document.body.style.cursor = "default";
      }


      renderer.render(scene, camera);
      window.requestAnimationFrame(render);
    };
    render();

    // Handle resizing
    const handleResize = () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="webgl-wrapper">
      <canvas id="experience-canvas" ref={canvasRef} />

      <div className="work modal">
        <button className="modal-title">Work</button>
        <button class="modal-exit-button">
          <svg
            width="98"
            height="96"
            viewBox="0 0 98 96"
            class="exit-button-svg"
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
        <button className="modal-title">About</button>
        <button class="modal-exit-button">
          <svg
            width="98"
            height="96"
            viewBox="0 0 98 96"
            class="exit-button-svg"
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
        </button>      </div>

      <div className="contact modal">
        <button className="modal-title">Contact</button>
        <button class="modal-exit-button">
          <svg
            width="98"
            height="96"
            viewBox="0 0 98 96"
            class="exit-button-svg"
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
        </button>      </div>

    </div>
  );

}
