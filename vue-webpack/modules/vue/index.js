import { getFirstChildNode } from './shared/util';
import reactice from './reactive';

const vue = {
    createApp
}

function createApp(component){
    console.log(component);
    const vm = {};
    const {
        template,
        methods,
        data
    } = component;

    vm.mount = mount;
    vm.$nodes = createNode(template);
    
    const init = () => {
        reactice(vm, data);
    }

    console.log(vm);
    init();

    return vm;
}

function createNode(template){
    const _template = document.createElement('div');
    _template.innerHTML = template;
    return getFirstChildNode(_template);
}

function mount(el){
    // console.log(el,this);
}

export {
    createApp
}

export default vue;