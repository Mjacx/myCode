export default function(vm,data){
    vm.$data = data();

    for (const key in vm.$data) {
        Object.defineProperty(vm, key,{
            set(newValue){
                vm.$data[key] = newValue; 
            },
            get(){
                return vm.$data[key];
            }
        })
    }
}