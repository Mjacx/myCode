export default {
    // <button type="submit" style="background-color:aquamarine" v-if="list.length <= 3">添加</button>
    // <button type="submit" :style={background:backgroundColor} v-else-if="list.length < 5 && list.length > 3">再添加</button>
    template: /*html*/ `
        <form @submit.prevent="childAdd">
            <input type="text" v-model="newItem">
            <button type="submit" :class={buttonColor:true}>继续添加</button>
        </form>
    `,
    data(){
        return{
            newItem:''
        }
    },
    methods:{
        childAdd(){
            this.$emit('add', this.newItem);
            this.newItem = '';
        }
    }
}