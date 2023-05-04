<template>
    <div>
        <h1>{{ getData?.id }}</h1>
        <p>{{ getData?.name }}</p>
        <p>{{ getData?.description }}</p>
    </div>
</template>
<script setup lang="ts">
    import dataEggs from '../data.json'
    import { useTodos } from '../stores/app'
    import { computed, ref } from 'vue'
    import { useRouter, useRoute } from 'vue-router'
    // export default {
    //     computed:{  
    //         eggType(){
    //             console.log(this.$route);
    //             return this.$route.params.eggsType;
    //         },  
    //         getData(){
    //            return dataEggs.find(dataEgg => dataEgg.type === this.eggType)
    //         }     
    //     }
    // }
    const useTodosStore = useTodos();
    const router = useRouter();
    const route = useRoute();
    console.log('router:',router);
    console.log('route:',route);
    console.log('useTodosStore:',useTodosStore);
   
    
    const eggType = computed(() => route.params.eggsType)    
    let getData = computed(() => dataEggs.find(dataEgg => dataEgg.type === eggType.value))

</script>