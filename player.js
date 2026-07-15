import * as THREE from "three";
import { Physics } from "./physics.js";


export class Player {


    constructor(camera, world){


        this.camera = camera;


        this.position =
    new THREE.Vector3(
        8,
        20,
        8
    );


        this.velocity =
            new THREE.Vector3();



        this.physics =
            new Physics(world);



        this.speed = 5;

        this.sprintSpeed = 8;

        this.jumpPower = 8;

        this.gravity = 25;


        this.grounded=false;



        this.camera.position.copy(
            this.position
        );

    }




    update(delta, controls){


        const move =
            new THREE.Vector3();



        if(controls.keys["KeyW"])
            move.add(
                controls.forward
            );


        if(controls.keys["KeyS"])
            move.sub(
                controls.forward
            );


        if(controls.keys["KeyA"])
            move.sub(
                controls.right
            );


        if(controls.keys["KeyD"])
            move.add(
                controls.right
            );



        if(move.length()>0){

            move.normalize();

        }



        const speed =
            controls.keys["ShiftLeft"]
            ? this.sprintSpeed
            : this.speed;



        this.velocity.x =
            move.x * speed;



        this.velocity.z =
            move.z * speed;





        // Jump

        if(
            controls.keys["Space"] &&
            this.grounded
        ){

            this.velocity.y =
                this.jumpPower;

            this.grounded=false;

        }





        // Gravity

        this.velocity.y -=
            this.gravity * delta;





        this.grounded =
            this.physics.move(

                this.position,

                this.velocity,

                delta

            );




        this.camera.position.copy(
            this.position
        );


    }


}