/**
 * 实现功能：存放模板中节点中表达式和事件对应关系的数据池
 * 思路：
 * 1.定义两个map，分别存放节点中表达式和事件
 * 2. 表达式分析，正则匹配{{}}，处理表达式不同情况：
 */
import { checkExpressionHasData, checkFunctionHasArgs } from "./shared/util";
import { vEvent } from "./shared/propTypes";

export let eventPool = new Map();
export let exprPool = new Map();

/**
 * 期望的map结构
 * 
 * expr Map
 * [{
 *      h1: {
 *              key: count,
 *              expression: key?
 *          }
 *  }]
 * 
 * event Map
 * [{
 *  button:{
 *              type: 'click',
 *              handler: method.plus.bind(vm, ...args)
 *         }
 * }]
 * 
 */

const exprExpression = /\{\{(.+?)\}\}/;

export default function(vm, method){
    let { $node, $data } = vm;
    const allNodes = $node.querySelectorAll('*'); 
    const { vClick } = vEvent;


    allNodes.forEach(node => {
        const expr = node.innerText;
        const exprMatched = expr.match(exprExpression);
        
        if(exprMatched){
          const exprInfo = checkExpressionHasData($data, exprMatched[1].trim())
          exprInfo && exprPool.set(node, exprInfo); 
        }

        let vClickVal = node.getAttribute(`@${vClick}`);
        if(vClickVal){
            const fnInfo = checkFunctionHasArgs(vClickVal);
            const handler = fnInfo ?
                            method[fnInfo.methodName].bind(vm, ...fnInfo.args) :
                            method[vClickVal].bind(vm);
            
            eventPool.set(node,{
                type: vClick,
                handler
            })                
        }

        node.removeAttribute(`@${vClick}`);


    });
    // console.log(vm)

}
