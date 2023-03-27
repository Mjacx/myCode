import { getFirstNodeChild } from "./shared/util";
import reactive from "./reactive";
import expression from "./pools";
import event from "./event";
import { render } from "./render";

const vue = {
    createApp
}

function createApp(component){
    // console.log(component);
    const vm = {};
    const {
        data,
        method,
        template
    } = component;

    vm.mount = mount;
    vm.$node = getNodes(template);

    function init(){
        reactive(vm, data);
        expression(vm, method)
        event(vm);
        render(vm);
    }

    function mount(eleId){
        document.querySelector(eleId).appendChild(this.$node);
    }

    function getNodes(template){
       let _template = document.createElement('div');
       _template.innerHTML = template;
       return getFirstNodeChild(_template);
    }

    init();
    return vm;

}

export {
    createApp
}

export default vue;