import './index.html';
import './index.less';
import dva from 'dva';
// import { browserHistory } from 'dva/router';
// 推荐在入口文件全局设置 locale
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

// 1. Initialize
const app = dva();
// const app = dva({
//   history: browserHistory,
// });

// 2. Plugins
//app.use({});

// 3. Model
//app.model(require('./models/example'));
app.model(require('./models/users'))
app.model(require('./models/marks'))
app.model(require('./models/wx_subscribe'))
app.model(require('./models/layout'))
app.model(require('./models/auth'))
app.model(require('./models/wx_task'))
app.model(require('./models/cus_mbr'))

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
