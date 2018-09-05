/**
 * Created by kk on 18/9/5.
 */
new Vue({
    el:"#app",
    data:{
        totalMoney:0,
        productList:[],
        checkAllFlag:false

    },
    filters:{
        formatMoney:function (value) {
            return "￥" +value.toFixed(2);
        }

    },
    mounted: function () {
        this.$nextTick(function () {
            this.cartView();
        });
    },
    methods:{
        cartView: function () {
            let _this = this;
            this.$http.get("data/cartData.json",{"id":123}).then(res=> {
                this.productList = res.data.result.list;
                //this.totalMoney = res.data.result.totalMoney;
            })
        },
        changeMoney: function (product,way) {
            if(way > 0){
                product.productQuantity++;
            }else{
                product.productQuantity--;
                if(product.productQuantity < 1){
                    product.productQuantity = 1;
                }
            }
            this.calcTotalPrice();
        },
        selectedProduct:function (item) {
            if(typeof item.checked == 'undefined'){
                this.$set(item,"checked",true)
            }else{
                item.checked = !item.checked;
            }
            this.calcTotalPrice();
        },
        checkAll:function (flag) {
            this.checkAllFlag = flag;
            var _this = this;
            this.productList.forEach(function (item,index) {
                if(typeof item.checked == 'undefined'){
                    _this.$set(item,"checked",_this.checkAllFlag)
                }else{
                    item.checked = _this.checkAllFlag;
                }
            });
            this.calcTotalPrice();
        },
        calcTotalPrice:function () {
            var _this = this;
            this.totalMoney = 0;
            this.productList.forEach(function (item,index) {
                if(item.checked){
                    _this.totalMoney += item.productPrice*item.productQuantity;
                }
            });
        }

    }
});
Vue.filter("money", function (value,type) {
    return "￥" + value.toFixed(2);
});