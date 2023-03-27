/**
 * 实现功能：
 * 对data进行代理，并实施刷新，
 * 实现步骤：
 * 1. vue的data代理，放在vm示例上
 * 2. data set的时候要刷新整个模板页面
 */
import {update} from './render'




export default function(vm, data){
    vm.$data = data();
    for (const key in vm.$data) {
        Object.defineProperty(vm, key,{
            set(newValue){
                vm.$data[key] = newValue;
                update(vm, key)
            },
            get(){
                return vm.$data[key];
            }
        })
    }
}