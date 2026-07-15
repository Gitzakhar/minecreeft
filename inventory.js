export class Inventory {


    constructor(raycast){


        this.raycast = raycast;


        this.slots = [

            "grass",
            "dirt",
            "stone",
            "wood",
            "leaves",
            "sand",
            "water",
            "glass",
            "stone"

        ];


        this.selected = 0;


        this.updateHotbar();


        this.setup();

    }





    setup(){


        window.addEventListener(
            "keydown",
            (e)=>{


                const num =
                    Number(e.key);



                if(
                    num >= 1 &&
                    num <= 9
                ){

                    this.selected =
                        num-1;


                    this.updateHotbar();


                    this.updateBlock();

                }


            }
        );





        window.addEventListener(
            "wheel",
            (e)=>{


                if(e.deltaY > 0){

                    this.selected++;

                }
                else{

                    this.selected--;

                }



                if(this.selected < 0)
                    this.selected=8;


                if(this.selected > 8)
                    this.selected=0;



                this.updateHotbar();

                this.updateBlock();


            }
        );


    }





    updateBlock(){


        this.raycast.selectedBlock =
            this.slots[
                this.selected
            ];


    }





    updateHotbar(){


        const slots =
            document.querySelectorAll(
                ".slot"
            );



        slots.forEach(
            (slot,index)=>{


                if(
                    index === this.selected
                ){

                    slot.classList.add(
                        "selected"
                    );

                }
                else{

                    slot.classList.remove(
                        "selected"
                    );

                }


            }
        );


    }


}