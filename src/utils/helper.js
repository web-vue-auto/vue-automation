/**
 * Created by yejuan on 2017/3/15.
 */
const helper = {
    formValidate: function (form,fnSuccess,fnFail){
        var flag = true;
        var msgInfo=[];
        msgInfo['errorMsg'] = '验证成功';
        msgInfo['result'] = true;
        var els = $('[allattr="isrequired"]',$(form));
        els.each(function(i,elem){
            if(elem.value==''){
                msgInfo['errorMsg'] = $(elem).data('title')+'不能为空';
                msgInfo['result'] = false;
                dialogAlert({
                    'message':msgInfo['errorMsg']
                });
                return false;
            }
        })
        if( msgInfo['result'] ) fn&&fn();

        return msgInfo['result'];
    },
    showTip:function (tip,parent) {
        if( !$('.tip').length>0 ){
            $('<label class="tip">'+tip+'</label>').prependTo(parent);
        }else{
            $('.tip').text(tip)
        }
    },
    removeTip:function () {
        $('.tip').remove()
    }
}
export default helper;