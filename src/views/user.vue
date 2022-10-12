<template>
  <button @click="a">aaa</button>
  <ul>
    <li v-for="item in datas" :key="item">
      {{item.userName}}
    </li>
  </ul>
</template>

<script setup>
import {ref} from 'vue'
import authSvc from '../services/authSvc'

const datas = ref([])

const a = async() => {
    // const data = await authSvc.doLogin();
    const result = await authSvc.getUser();
    datas.value = result.data;
    // console.log(_data);
  }

</script>