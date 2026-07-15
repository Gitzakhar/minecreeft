import * as THREE from "three";

export class Controls {

    constructor(camera, canvas){

        this.camera = camera;
        this.canvas = canvas;

        this.keys = {};

        this.yaw = 0;
        this.pitch = 0;

        this.forward = new THREE.Vector3();
        this.right = new THREE.Vector3();

        this.setup();

    }

    setup(){

        this.canvas.addEventListener("click",()=>{

            this.canvas.requestPointerLock();

        });

        document.addEventListener("mousemove",(e)=>{

            if(document.pointerLockElement!==this.canvas) return;

            this.yaw -= e.movementX * 0.002;
            this.pitch -= e.movementY * 0.002;

            const limit = Math.PI / 2 - 0.01;

            this.pitch = Math.max(
                -limit,
                Math.min(limit,this.pitch)
            );

        });

        window.addEventListener("keydown",(e)=>{

            this.keys[e.code]=true;

        });

        window.addEventListener("keyup",(e)=>{

            this.keys[e.code]=false;

        });

    }

    update(){

        this.camera.rotation.order="YXZ";

        this.camera.rotation.y=this.yaw;
        this.camera.rotation.x=this.pitch;

        this.camera.getWorldDirection(this.forward);

        this.forward.y=0;

        this.forward.normalize();

        this.right.crossVectors(
            this.forward,
            new THREE.Vector3(0,1,0)
        ).normalize();

    }

}