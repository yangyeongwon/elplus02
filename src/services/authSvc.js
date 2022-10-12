import axios from '../utils/axios'
import {useAuthStore} from '../store/auth'
import { ElMessage } from 'element-plus';

class authSvc{
  constructor(){
    this.auth = useAuthStore();
  }

  async doLogin(data){
    let result = null
    try{
      result = await axios.post('/ajax/auth/doLogin', data);
      if(result && result.code == 1){
        this.auth.setAuth(data);
        localStorage.setItem('auth', JSON.stringify(data));
        ElMessage.success('로그인 성공!');
      }else{
        ElMessage.success('로그인 중 에러가 발생 했습니다.');
      }
    }catch(e){
      console.log(e)
      return null;
    }

    return result;
  }

  async setUser(){
    let result = await this.getUser();
    if(result && result.data) localStorage.setItem('auth', JSON.stringify(result.data))
    this.auth.setAuth(result.data);
  }

  async getUser(){
    let result = null;
    try{
      result = await axios.post('/ajax/auth/getUserInfo', {});
      console.log('getUser', result);
    }catch(e){
      console.log(e)
      return null;
    }

    return result;
  }

}

export default new authSvc();