export const Blocks = {

    air:{
        id:0,
        name:"Air",
        solid:false,
        color:0x000000
    },


    grass:{
        id:1,
        name:"Grass",
        solid:true,
        color:0x55aa55
    },


    dirt:{
        id:2,
        name:"Dirt",
        solid:true,
        color:0x8b5a2b
    },


    stone:{
        id:3,
        name:"Stone",
        solid:true,
        color:0x777777
    },


    wood:{
        id:4,
        name:"Wood",
        solid:true,
        color:0x8b4513
    },


    leaves:{
        id:5,
        name:"Leaves",
        solid:true,
        color:0x228b22
    },


    sand:{
        id:6,
        name:"Sand",
        solid:true,
        color:0xd8c078
    },


    water:{
        id:7,
        name:"Water",
        solid:false,
        transparent:true,
        color:0x3366ff
    }

};


export function getBlockByID(id){

    for(const key in Blocks){

        if(Blocks[key].id===id)
            return Blocks[key];

    }

    return Blocks.air;

}