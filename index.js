let man = {
    name: 'Andrey',
    surname: 'Tokarev',
    fullName(){
        return this.surname + ' ' + this.name;
    }
}

class Room {
    constructor (windows = 1, owner = 'Andrey'){
        if(windows > 0) this.windows = windows;
        else windows = 0;
        this.owner = owner;
    }
    setOwner(newOwner){
        this.owner = newOwner;
    }
}

module.exports.man = man
module.exports.Room = Room
