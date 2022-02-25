import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/login', component: '@/pages/Login/LoginPage',wrappers:['@/wrappers/auth'], title:'登陆页面' },
    { path: '/success', component: '@/pages/Login/SuccessPage', title:'登陆成功'},
    { component:'@/pages/404' }
  ],
  fastRefresh: {},
  antd: {
    mobile:false
  }
});