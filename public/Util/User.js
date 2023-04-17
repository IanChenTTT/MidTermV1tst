let UserS = new Map();
function Userjoin(uuid,name,room){
    const User = {name,room};
    UserS.set(uuid,User);
    return User
}
function getCurrentUser(uuid){
    return UserS.get(uuid);
}
module.exports = {
    Userjoin,
    getCurrentUser
}