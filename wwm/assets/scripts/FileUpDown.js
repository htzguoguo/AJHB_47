/**
 * Created by wwm on 2016/5/9.
 */
Vue.filter('filterName', function (value,input) {
    // console.log(value,input);
    return value
});
var VueMain = new Vue({
    el: '#app',
    data: {
        emailContainer:[],
        emailTheme:"",
        txt: "",
        checkedNames:[],
        searchQuery:"",
        companyList: {}
    },
    ready: function () {
        var self=this;
        var url = "http://localhost:10827/wwm/assets/json/enterprise.json";
        $.ajax({
            type: "GET",
            url: url,
            dataType: "JSON",
            success: function (data) {
                // console.log(data);
                self.companyList=_.toArray(data);
                // alert(self.companyList);
            },
            error: function (e) {
                console.warn(e);
            }
        })
    },

    methods: {
        submit: function () {
        },
        OK: function () {
            var self = this;
            var url = "http://localhost:10827/FileUp.ashx";
            var con=this.emailContainer.toString();
            $.ajax({
                type: "GET",
                url: url,
                data:{name:con,theme:self.emailTheme,txt:self.txt},
                dataType: "text",
                success: function (data) {
                    console.log(data);
                    // console.log(JSON.stringify(data));
                    // console.log(self.txt);
                    alert(data + " vue准备完成");
                },
                error: function () {
                    // alert("异常！");
                    console.warn("ajax失败");
                }
            });

        },
        searchTxt:function(){
            return ["aaa","bbb","ccc"]
        },
        webapi:function(){
            $.ajax({
                type:"GET",
                url:"http://localhost:50619/api/Products",
                dataType:"JSON",
                success:function(data){
                    alert(data);
                },
                error:function(e){
                   console.error(e);
                }
            })
        }
    }
});

