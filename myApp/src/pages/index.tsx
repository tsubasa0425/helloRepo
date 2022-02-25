import styles from './index.less';

/**
 * 开始页面
 * 在地址栏输入 localhost:8000/login 进入登陆页面
 * @export
 * @return {*} 
 */
export default function IndexPage() {
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
    </div>
  );
}
