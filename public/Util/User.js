let UserS = new Map();
let QueueNumber = 0;
let Iswhite = true;
function Userjoin(uuid,name,room){
    const User = {name,room,Iswhite,QueueNumber};
    Iswhite = !Iswhite;
    UserS.set(uuid,User);
    QueueNumber ++;
    return User
}

function getUserQueNumber (uuid){
    return UserS.get()
}
function getUserID(index){
    --index;
    let hold = null;
   UserS.forEach((value,key)=>{
    if(value.QueueNumber === index)
            hold = key;
   })
   return hold
}
function getUserRoomID(index)
{
    --index;
    let hold = null;
   UserS.forEach((value,key)=>{
    if(value.QueueNumber === index)
            hold = value.room;
   })
   return hold
};
function getAlluserS(){
    return new Map(Object.entries(UserS))
}

module.exports = {Userjoin , getUserID , getAlluserS};