import * as THREE from "three";


export class Raycast {


    constructor(camera, world, renderer){

        this.camera = camera;
        this.world = world;
        this.renderer = renderer;

        this.raycaster =
            new THREE.Raycaster();

        this.range = 6;

        this.selectedBlock = "dirt";

        this.setup();

    }



    setup(){


        window.addEventListener(
            "mousedown",
            (e)=>{


                if(
                    document.pointerLockElement
                    !== this.renderer.domElement
                )
                    return;



                if(e.button===0){

                    this.breakBlock();

                }


                if(e.button===2){

                    this.placeBlock();

                }

            }
        );


        window.addEventListener(
            "contextmenu",
            e=>e.preventDefault()
        );

    }




    getTarget(){


        this.raycaster.setFromCamera(
            {
                x:0,
                y:0
            },
            this.camera
        );



        let objects=[];


        this.world.scene.traverse(
            obj=>{

                if(
                    obj.isMesh
                ){

                    objects.push(obj);

                }

            }
        );



        const hits =
            this.raycaster.intersectObjects(
                objects
            );



        if(hits.length===0)
            return null;



        const hit =
            hits[0];



        if(hit.distance > this.range)
            return null;



        return hit;

    }





    breakBlock(){


        const hit =
            this.getTarget();


        if(!hit)
            return;



        const pos =
            hit.object.position;



        this.world.removeBlock(
            Math.round(pos.x),
            Math.round(pos.y),
            Math.round(pos.z)
        );

    }





    placeBlock(){


        const hit =
            this.getTarget();



        if(!hit)
            return;



        const pos =
            hit.object.position.clone();



        const normal =
            hit.face.normal;



        pos.add(normal);



        this.world.setBlock(

            Math.round(pos.x),

            Math.round(pos.y),

            Math.round(pos.z),

            this.selectedBlock

        );


    }


}