<template>
	<div class="login-wrap">
		<div class="ms-login">
			<div class="ms-title">ADMIN</div>
			<el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
				<el-form-item prop="userId">
					<el-input v-model="param.userId" placeholder="userId">
						<template #prepend>
							<el-button :icon="User"></el-button>
						</template>
					</el-input>
				</el-form-item>
				<el-form-item prop="passwd">
					<el-input
						type="password"
						placeholder="password"
						v-model="param.passwd"
						@keyup.enter="submitForm(login)"
					>
						<template #prepend>
							<el-button :icon="Lock"></el-button>
						</template>
					</el-input>
				</el-form-item>
				<div class="login-btn">
					<el-button type="primary" @click="submitForm(login)">로그인</el-button>
				</div>
				<p class="login-tips">Tips : 아이디와 패스워드를。</p>
			</el-form>
		</div>
	</div>
</template>


<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import { useTagsStore } from '../store/tags';
  // import { usePermissStore } from '../store/permiss';
  import {useAuthStore} from '../store/auth'
  import { useRouter } from 'vue-router';
  import { ElMessage } from 'element-plus';
  import type { FormInstance, FormRules } from 'element-plus';
  import { Lock, User } from '@element-plus/icons-vue';
  import authSvc from '../services/authSvc'
  
  interface LoginInfo1 {
    userId: string;
    passwd: string;
  }

  const router = useRouter();
  const auth = useAuthStore();

  const param = reactive<LoginInfo>({
    userId: '1newzen23',
    passwd: '1'
  });
  
  const rules: FormRules = {
    userId: [
      {
        required: true,
        message: '아이디를 입력 하세요!',
        trigger: 'blur'
      }
    ],
    passwd: [{ required: true, message: '암호를 입력 하세요!', trigger: 'blur' }]
  };
  // const permiss = usePermissStore();
  const login = ref<FormInstance>();
  const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate(async (valid: boolean) => {
      if (valid) {
        let result = await authSvc.doLogin(param);
        if(result.code == 1){
          router.push('/');
        }else{

        }

      } else {
        ElMessage.error('登录成功');
        return false;
      }
    });
  };
  
  const tags = useTagsStore();
  tags.clearTags();
  </script>
  
  <style scoped>
  .login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../assets/img/login-bg.jpg);
    background-size: 100%;
  }
  .ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
  }
  .ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
  }
  .ms-content {
    padding: 30px 30px;
  }
  .login-btn {
    text-align: center;
  }
  .login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
  }
  .login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
  }
  </style>
  