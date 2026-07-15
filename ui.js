export class UI {


    constructor(){


        this.fps =
            document.getElementById(
                "fps"
            );


        this.position =
            document.getElementById(
                "position"
            );


        this.frames = 0;

        this.lastTime =
            performance.now();

    }





    update(playerPosition){


        // Coordinates

        this.position.textContent =

        "X: " +
        playerPosition.x.toFixed(1)

        + " Y: " +
        playerPosition.y.toFixed(1)

        + " Z: " +
        playerPosition.z.toFixed(1);





        // FPS counter

        this.frames++;


        const now =
            performance.now();



        if(
            now - this.lastTime >= 1000
        ){

            this.fps.textContent =
                "FPS: " + this.frames;


            this.frames = 0;


            this.lastTime = now;

        }


    }


}