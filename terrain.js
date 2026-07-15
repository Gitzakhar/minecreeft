import { Blocks } from "./block.js";


export class Terrain {


    constructor(world){

        this.world = world;

    }



    generateChunk(cx,cz){


        const startX =
            cx * 16;

        const startZ =
            cz * 16;



        for(let x=0;x<16;x++){

            for(let z=0;z<16;z++){


                const wx =
                    startX+x;

                const wz =
                    startZ+z;



                const height =
                    this.getHeight(
                        wx,
                        wz
                    );



                for(let y=0;y<=height;y++){


                    let block =
                        "stone";



                    if(y===height){

                        block =
                            this.getSurface(
                                wx,
                                wz
                            );

                    }

                    else if(y>height-4){

                        block="dirt";

                    }



                    this.world.setBlock(
                        wx,
                        y,
                        wz,
                        block
                    );


                }



                // trees

                if(
                    height>8 &&
                    Math.random()<0.015
                ){

                    this.tree(
                        wx,
                        height+1,
                        wz
                    );

                }


            }

        }


    }




    getHeight(x,z){


        let height = 8;


        height +=
            Math.sin(x*0.15)*3;


        height +=
            Math.cos(z*0.15)*3;


        height +=
            Math.sin(
                (x+z)*0.08
            )*2;



        return Math.floor(height);

    }





    getSurface(x,z){


        const noise =
            Math.sin(
                x*0.1
            )+
            Math.cos(
                z*0.1
            );



        if(noise < -1)
            return "sand";


        return "grass";

    }





        tree(x,y,z){


        for(let i=0;i<5;i++){

            this.world.setBlock(
                x,
                y+i,
                z,
                "wood"
            );

        }



        for(
            let dx=-2;
            dx<=2;
            dx++
        ){

            for(
                let dz=-2;
                dz<=2;
                dz++
            ){

                for(
                    let dy=3;
                    dy<=5;
                    dy++
                ){

                    if(
                        Math.abs(dx)+Math.abs(dz)<4
                    ){

                        this.world.setBlock(
                            x+dx,
                            y+dy,
                            z+dz,
                            "leaves"
                        );

                    }

                }

            }

        }

    }


}