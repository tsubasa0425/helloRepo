import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/login', component: '@/pages/Login/index',wrappers:['@/wrappers/auth'], title:'登陆页面' },
    { component:'@/pages/404' }
  ],
  fastRefresh: {},
  antd: {
    mobile:false
  }
});
