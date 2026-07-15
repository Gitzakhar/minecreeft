export class Physics {


    constructor(world){

        this.world = world;

    }



    isSolid(x,y,z){

        const block =
            this.world.getBlock(
                Math.floor(x),
                Math.floor(y),
                Math.floor(z)
            );


        if(!block)
            return false;


        return block !== "water";

    }





    checkCollision(position){


        const radius = 0.3;

        const height = 1.8;


        const points = [

            [
                position.x-radius,
                position.y,
                position.z-radius
            ],

            [
                position.x+radius,
                position.y,
                position.z+radius
            ],

            [
                position.x-radius,
                position.y+height,
                position.z-radius
            ],

            [
                position.x+radius,
                position.y+height,
                position.z+radius
            ]

        ];



        for(const p of points){


            if(
                this.isSolid(
                    p[0],
                    p[1],
                    p[2]
                )
            ){

                return true;

            }


        }


        return false;


    }




    move(position,velocity,delta){


        // X movement

        position.x +=
            velocity.x * delta;



        if(this.checkCollision(position)){

            position.x -=
                velocity.x * delta;

            velocity.x = 0;

        }



        // Z movement

        position.z +=
            velocity.z * delta;



        if(this.checkCollision(position)){

            position.z -=
                velocity.z * delta;

            velocity.z = 0;

        }



        // Y movement

        position.y +=
            velocity.y * delta;



        let grounded=false;



        if(this.checkCollision(position)){


            if(velocity.y < 0)
                grounded=true;



            position.y -=
                velocity.y * delta;


            velocity.y=0;


        }



        return grounded;


    }



}