import * as THREE from "three";
import { Blocks } from "./block.js";
import { Terrain } from "./terrain.js";


const CHUNK_SIZE = 16;


export class World {


    constructor(scene){

        this.scene = scene;

        this.chunks = new Map();

        this.materials = {};


        for(const name in Blocks){

            if(name === "air")
                continue;


            this.materials[name] =
                new THREE.MeshLambertMaterial({

                    color: Blocks[name].color,

                    transparent:
                        Blocks[name].transparent || false,

                    opacity:
                        Blocks[name].transparent
                        ? 0.6
                        : 1

                });

        }


        this.terrain =
            new Terrain(this);



        this.renderDistance = 3;

this.lastChunkX = null;
this.lastChunkZ = null;

this.updateChunks(
    {x:0,z:0}
);

    }




    chunkKey(x,z){

        return `${x},${z}`;

    }




    blockKey(x,y,z){

        return `${x},${y},${z}`;

    }





 loadChunk(cx,cz){


    const key =
        this.chunkKey(
            cx,
            cz
        );



    if(
        this.chunks.has(key)
    )
        return;




    this.chunks.set(
        key,
        new Map()
    );



    this.terrain.generateChunk(
        cx,
        cz
    );



    this.buildMesh(
        cx,
        cz
    );


}





    getBlock(x,y,z){


        const cx =
            Math.floor(
                x / CHUNK_SIZE
            );


        const cz =
            Math.floor(
                z / CHUNK_SIZE
            );


        const chunk =
            this.chunks.get(
                this.chunkKey(cx,cz)
            );


        if(!chunk)
            return null;



        return chunk.get(
            this.blockKey(
                x,y,z
            )
        );


    }





    setBlock(x,y,z,type){


        const cx =
            Math.floor(
                x / CHUNK_SIZE
            );


        const cz =
            Math.floor(
                z / CHUNK_SIZE
            );


        const chunk =
            this.chunks.get(
                this.chunkKey(cx,cz)
            );



        if(!chunk)
            return;



        chunk.set(

            this.blockKey(
                x,y,z
            ),

            type

        );

    }





    removeBlock(x,y,z){

        const cx =
            Math.floor(
                x / CHUNK_SIZE
            );


        const cz =
            Math.floor(
                z / CHUNK_SIZE
            );


        const chunk =
            this.chunks.get(
                this.chunkKey(cx,cz)
            );



        if(!chunk)
            return;



        chunk.delete(

            this.blockKey(
                x,y,z
            )

        );



        this.buildMesh(cx,cz);

    }





    buildMesh(cx,cz){


        const key =
            this.chunkKey(cx,cz);



        const old =
            this.scene.getObjectByName(
                "chunk_"+key
            );


        if(old)
            this.scene.remove(old);



        const group =
            new THREE.Group();


        group.name =
            "chunk_"+key;



        const chunk =
            this.chunks.get(key);



        const geometry =
            new THREE.BoxGeometry(
                1,1,1
            );



        for(
            const [position,type]
            of chunk
        ){


            const [
                x,
                y,
                z
            ] =
            position
            .split(",")
            .map(Number);



            const cube =
                new THREE.Mesh(

                    geometry,

                    this.materials[type]

                );


            cube.position.set(
                x,
                y,
                z
            );


            group.add(cube);

        }



        this.scene.add(group);


    }





update(playerPosition){

    this.updateChunks(
        playerPosition
    );

}


}