import { eventPool } from "./pools";

/**
 * 事件数据池处理
 * 事件数据池map和node节点的绑定
 */
export default function(vm){
    for (const [node, info] of eventPool) {
        let { type, handler } = info;
        vm[handler.name] = handler;
        node.addEventListener(type, vm[handler.name], false);
    }
}