import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { DRACOLoader } from "three/examples/jsm/Addons.js";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

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


    loader.load("models/Room_Portfolio.glb", (glb) => {
      glb.scene.traverse((child) => {
        if (child.isMesh) {
          if (child.name.includes("Water")) {
            child.material = new THREE.MeshBasicMaterial({
              color: 0x558Bc8,
              transparent: true,
              opacity: 0.66,
              depthWrite: false,
            });

          }else if (child.name.includes("Glass")) {
            child.material = glassMaterial;
          } else if (child.name.includes("Bubble")) {
            child.material = whiteMaterial;
          } else {
            Object.keys(textureMap).forEach((key) => {
              if (child.name.includes(key)) {
                const material = new THREE.MeshBasicMaterial({
                  map: loadedTextures.day[key],
                });

                child.material = material;

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
    camera.position.z = 5;
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



    // Animation loop
    const animate = () => {

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

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
    </div>
  );

}
