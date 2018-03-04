# express-auto-router一个用于自动挂再后端路由的包

### 使用方式 

> 1、安装my-express-auto-router``` npm i my-express-auto-router ```
> 
> 2、在代码中引用包

    const autorouter = require('my-express-auto-router');
    const router = express.Router();
    app.use(autorouter(router, __dirname, ['routes']));//第一个参数传router,第一个参数传当前文件路径，第三个参数传需要挂在的路由的跟目录
    
>    
>3、说明
>
> ![enter description here][1]
  如上图我的routes的目录是这样，那么后端自动把index.js映射到路由/、users.js映射到/users路由，inner映射/inner/xxx,注意index文件名和目录名都不会加入到路由的路径上，同时根目录routes也不会被加入到路由路径。
  打开文件users.js,代码如下
 ![enter description here][2]
 可以看到users引出了连个方法index和other,以及一个methodMap。
 这个文件会被后端挂载在路由/users/other和/users,因为index方法会被忽略掉路径名。然后/users/other路由get和post请求都可以而/users只能get请求，这里和mathodMap刚好对应上


  [1]: ./images/dir.png "dir.png"
  [2]: ./images/users.png "users.png"