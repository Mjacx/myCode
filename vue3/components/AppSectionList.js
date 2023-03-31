export default {
        /*html*/
        template: `
            <section v-show="buyList.length">
                <h1>{{headLine}}</h1>
                <div>
                    <ul>
                        <li v-for="item in buyList" v-bind:key="item.id">
                            {{item.name}}
                            <!-- v-bind:src可简写成:src -->
                            <img :src="item.url" alt="">
                            <input type="checkbox" v-model="item.purchased">
                            <span>{{item.purchased}}</span>
                        </li>
                    </ul>
                </div>
            </section>
        `, 
        props:{
            headLine:String,
            buyList:Object
        },
}