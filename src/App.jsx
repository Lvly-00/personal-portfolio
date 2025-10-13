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
      const nightTexture = textureLoader.load(paths.night);

      // Set texture properties (optional but recommended)
      [dayTexture, nightTexture].forEach((t) => {
        t.colorSpace = THREE.SRGBColorSpace;
        t.wrapS = t.wrapT = THREE.RepeatWrapping;
      });

      loadedTextures.day[key] = dayTexture;
      loadedTextures.night[key] = nightTexture;
    });

    loader.load("models/Room_Portfolio.glb", (glb) => {
      glb.scene.traverse((child) => {
        if (child.isMesh) {
          Object.keys(textureMap).forEach((key) => {
            if (child.name.includes(key)) {
              const material = new THREE.MeshBasicMaterial({
                map: loadedTextures.day[key],
              });

              child.material = material;
            }
          });
        }
      });

      scene.add(glb.scene);
    });


    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
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

    // Cube setup
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshNormalMaterial();
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Animation loop
    const animate = () => {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;


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
