import { exprPool } from "./pools";


/**
 * {{}}表达式数据池处理
 * dom 的渲染和数据流改变后，更新dom
 */
export function render ( vm ){

    exprPool.forEach((info, node) => {
        _render(vm, node, info);
    })
}

export function update( vm, key){
    exprPool.forEach((info, node) => {
        if( info.key === key ){
            _render(vm, node, info);
        }
    })
}

function _render(vm, node, info){
    console.log(info);
    const { expression } = info;
    let fn =  new Function('vm', 'node', `
                    with(vm){
                        node.textContent = ${expression};
                    }
               `);
    fn(vm, node);           
}

