import { DayNight } from "./daynight.js";
import { Inventory } from "./inventory.js";
import { Raycast } from "./raycast.js";
import * as THREE from "three";

import { World } from "./world.js";
import { Player } from "./player.js";
import { Controls } from "./controls.js";
import { UI } from "./ui.js";


// Scene

const scene = new THREE.Scene();

scene.background =
    new THREE.Color(0x87ceeb);

scene.fog =
    new THREE.Fog(
        0x87ceeb,
        50,
        200
    );


// Camera

const camera =
    new THREE.PerspectiveCamera(
        75,
        window.innerWidth /
        window.innerHeight,
        0.1,
        1000
    );


// Renderer

const renderer =
    new THREE.WebGLRenderer({
        antialias:true
    });


renderer.setSize(
    window.innerWidth,
    window.innerHeight
);


renderer.setPixelRatio(
    window.devicePixelRatio
);


document.body.appendChild(
    renderer.domElement
);



// Lighting

const ambient =
    new THREE.AmbientLight(
        0xffffff,
        0.5
    );


scene.add(ambient);



const sun =
    new THREE.DirectionalLight(
        0xffffff,
        1
    );


sun.position.set(
    40,
    80,
    20
);


scene.add(sun);
const dayNight =
    new DayNight(
        scene,
        sun
    );



// Systems

const world =
    new World(scene);


const controls =
    new Controls(
        camera,
        renderer.domElement
    );



const player =
    new Player(
        camera,
        world
    );



const ui =
    new UI();


const raycast =
    new Raycast(
        camera,
        world,
        renderer
    );

    const inventory =
    new Inventory(
        raycast
    );

// Resize

window.addEventListener(
    "resize",
    ()=>{

        camera.aspect =
            window.innerWidth /
            window.innerHeight;


        camera.updateProjectionMatrix();


        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

    }
);




// Game loop

let last =
    performance.now();


function animate(time){


    requestAnimationFrame(
        animate
    );


    const delta =
        (time-last)/1000;


    last=time;



    controls.update();


    player.update(
        delta,
        controls
    );


    world.update(
        player.position
    );
    dayNight.update(
    delta
);



    ui.update(
        player.position
    );



    renderer.render(
        scene,
        camera
    );

}



animate(last);