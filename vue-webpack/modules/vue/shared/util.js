const regStringFn = /(.+?)\((.+?)\)/;
const regString = /\'(.+?)\'/;

export function getFirstNodeChild(node){
    for (let i = 0; i < node.childNodes.length; i++) {
        if(node.childNodes[i].nodeType === 1){
            return node.childNodes[i];
        }
    }
}

export function checkExpressionHasData($data, expression){
    for (const key in $data) {
        if(expression.includes(key) && expression !== key){
            return {
                key,
                expression
            }
        }else if(expression === key){
            return {
                key,
                expression: key
            }
        }else{
            return null;
        }
    }
}

export function checkFunctionHasArgs (string){
    const matched = string.match(regStringFn);

    //返回method及参数（参数需进行处理）
    if(matched){
        const argArr = matched[2].split(',');
        const args = checkIsString(matched[2]) 
                     ? argArr
                     : argArr.map(item => Number(item));
        return{
            methodName: matched[1],
            args
        }
    }
}

export function checkIsString (str){
    return str.match(regString);
}

