import { defineStore } from "pinia";
import { reactive, computed } from "vue";

export const useAuthStore = defineStore('auth', () => {

  const initData = {
    userId: '1newzen23',
    userName: '1'
  }

  const initData2 = {
    userId: '',
    userName: ''
  }

  let auth = reactive({...initData});

  const authRequired = computed(() => { auth && auth.userId ? true : false })
  const getAuth = computed(() => auth )
  const getUserId = computed(() => auth.userId )

  function initAuth(){
    Object.assign(auth, initData);
  }
  
  function setAuth(data){
    Object.assign(auth, data);    
  }

  function removeAuth(){
    auth = reactive({...initData2});

  }

  return {authRequired, getAuth, getUserId, setAuth, initAuth, removeAuth}
})