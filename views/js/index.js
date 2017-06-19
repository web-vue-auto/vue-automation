/**
 * ajax 方法重写
 */
const url = 'http://localhost:3000';
const Ajax = {
    get: (url, fn) => {
        const obj = new XMLHttpRequest(); // XMLHttpRequest对象用于在后台与服务器交换数据
        obj.open('GET', url, true);
        obj.onreadystatechange = function() {
            if (obj.readyState == 4 && obj.status == 200 || obj.status == 304) { // readyState==4说明请求已完成
                fn.call(this, obj.responseText); //从服务器获得数据
            }
        };
        obj.send(null);
    },
    post: (url, data, fn) => {
        // 格式化post 传递的数据
        const postDataFormat = (obj)=>{
            let str = '';
            for (let x in obj) {
                str += `${x}=${obj[x]}&`;
            }
            if (str != "")  return str.substring(0,str.length-1);
        }
        // post请求
        const obj = new XMLHttpRequest();
        obj.open("POST", url, true);
        obj.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); // 发送信息至服务器时内容编码类型
        obj.onreadystatechange = function() {
            if (obj.readyState == 4 && (obj.status == 200 || obj.status == 304)) { // 304未修改
                fn.call(this, JSON.parse(obj.responseText));
            }
        };
        obj.send(postDataFormat(data));
    }
}
/**
 * 主vue 挂载
 */
new Vue({
    el: '#webapp',
    data: {
        modal: false,
        animal: "",
        random: "",
        list: [],
        html: ""
    },
    methods: {
        up(i,code) {
          Ajax.post('/change',{
            id: code,
            num: i,
            status: 'up'
          },(res)=>{
            window.location.reload();
          });
        },
        down(i,code) {
          Ajax.post('/change',{
            id: code,
            num: i,
            status: 'down'
          },(res)=>{
            window.location.reload();
          });
        },
        deleteArr(i,code) {
          Ajax.post('/delete',{
            id: code,
            num: i
          },(res)=>{
            window.location.reload();
          });
        },
        ok() {
            Ajax.post('/givehtml',{
              html: this.list[this.animal].html_code,
              id: this.random
            },(res)=>{
                window.location.reload();
            });
        },
        show(code) {
            this.modal = !this.modal;
            this.random = code;
            console.log(this.random)
            Ajax.post(`${url}/api/templateListDrop`,"", (res) => {
                this.$set(this.$data, "list", res.data);
            })
        },
        output(el) {
          console.log(11111);
          // 生成页面
          // Ajax.post('/output',{id:id},(res)=>{
          //   window.location.reload();
          // });
        }
    }
})
