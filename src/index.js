require('es6-promise').polyfill()
import './index.html'
import './index.less'
import dva from 'dva'
// import { browserHistory } from 'dva/router';
// 推荐在入口文件全局设置 locale
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
// import {message} from 'antd'

// 1. Initialize
const app = dva({
  // onError(e){
  //   console.log(e);
  //   message.error('服务器繁忙', 3);
  // }
})
// const app = dva({
//   history: browserHistory,
// });

// 2. Plugins
//app.use({});

// 3. Model
//app.model(require('./models/example'));

// 4. Router
app.router(require('./router'))

// 5. Start
app.start('#root')
