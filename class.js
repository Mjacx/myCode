class browser{
    constructor(){
        this.name = '浏览器';
        this.tag = '根本';
    }
    showSlef(){
        console.log('it is browser');
    }
}


class IE extends browser{
    showSlef(){
        this.name = 'IE浏览器'
        console.log(this.name);
        console.log(this.tag);
    } 
}

class Chrome extends browser{
    showSlef(){
        this.name = 'Chrome浏览器'
        console.log(this.name);
        console.log(this.tag);
    }
}


let a = new IE();
let b = new Chrome();

a.showSlef();
b.showSlef();
