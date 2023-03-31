import AppSectionList from "./AppSectionList.js";
import AppSectionForm from "./AppSectionForm.js";

export default {
    components:{ AppSectionList, AppSectionForm},
    /*html*/
    template: `
        <app-section-list headLine="未购清单" :buyList="filters.beforeBuy"></app-section-list>
        <app-section-list headLine="已购清单" :buyList="filters.afterBuy"></app-section-list>
        <app-section-form @add="fatherAdd"></app-section-form>
    `,        
    data(){
        return {
            title:'测试标题',
            list:[
                {id:1, name:"香蕉", type:"水果",url:"./img/up.png",purchased: false},
                {id:2, name:"油菜", type:"蔬菜",url:"./img/down.png",purchased: false},
                {id:3, name:"大米", type:"粮食",url:"./img/up.png",purchased: false},
            ],
            backgroundColor:'aquamarine'
        }
    },
    methods:{
        fatherAdd(name){
            this.list.push({
                id: this.list.length + 1,
                name: name,
                url: "./img/up.png",
                purchased: false
            })
            this.newItem = '';
        },
    },
    computed:{
        filters(){
            return{
                beforeBuy: this.list.filter(item => !item.purchased),
                afterBuy: this.list.filter(item => item.purchased)
            }
        },
    }
    
}