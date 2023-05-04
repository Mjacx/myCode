<template>
    <h1>
        主页面
    </h1>
    <RouterLink to="/chicken">go chi</RouterLink> |
    <RouterLink :to="{name:'chic'}">go</RouterLink>
    <RouterView />
</template> 