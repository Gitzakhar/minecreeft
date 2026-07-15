import * as THREE from "three";

export class DayNight {


    constructor(scene, sun){


        this.scene = scene;

        this.sun = sun;

        this.time = 0;


    }




    update(delta){


        this.time += delta * 0.05;



        const angle =
            this.time % (Math.PI * 2);



        this.sun.position.x =
            Math.cos(angle) * 50;



        this.sun.position.y =
            Math.sin(angle) * 80;



        this.sun.position.z =
            Math.sin(angle) * 50;



        const brightness =
            Math.max(
                0.2,
                Math.sin(angle)+0.3
            );



        this.sun.intensity =
            brightness;



        this.scene.background =
            new THREE.Color(
                0x87ceeb
            );


    }


}