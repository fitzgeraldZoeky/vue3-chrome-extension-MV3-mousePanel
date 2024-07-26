<template>
    <div class="loading">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
    
</template>
  
  <script setup>
    import { onBeforeMount } from 'vue'
    onBeforeMount(() => {
        console.log('加载中。。。....。。')
    })
  </script>
  
  <style scoped>
  /* .loading{
        position: fixed;
        width: 80px;
        height: 55px;
        background-color: rgba(212, 168, 148, 0.623);
        /* margin: 0 auto; */
    /* } */ 

.loading span{
        display: inline-block;
        width: 8px;
        height: 20px;
        border-radius: 4px;
        margin-left: 20px;
        background: rgb(236, 235, 182);
        opacity: 0;
        animation: load 1.5s ease 8;
    }
    @keyframes load{
        0%,100%{
            height: 20px;
            background: rgb(236, 235, 182);
            opacity: 0;
        }
        50%{
            height: 50px;
            margin: -15px 0;
            background: rgb(40, 194, 169);
            opacity: 1;
        }
    }
    .loading span:nth-child(1){
        animation-delay:0.4s;
    }
    .loading span:nth-child(2){
        animation-delay:0.6s;
    }
    .loading span:nth-child(3){
        animation-delay:0.8s;
    }
    .loading span:nth-child(4){
        animation-delay:1s;
    }
  </style>