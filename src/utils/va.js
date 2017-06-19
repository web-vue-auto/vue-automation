
export default{
    install(Vue){

        let errorEx;

        Vue.directive('checkBlur',{
            bind:function(el,binding,vnode){
                $(el).data('expression',binding.expression);
            },
            update:function (el,binding,vnode) {
                if( binding.expression == errorEx && binding.value!='' ){
                    HELPER.removeTip()
                }
            }
        })

        Vue.prototype.checkValid = ( parent,fn ) => {
            var flag = true;
            var msgInfo=[];
            msgInfo['errorMsg'] = '验证成功';
            msgInfo['result'] = true;
            let $form = parent;
            let els = $('input[data-vCheck]',$form) ;
            if( els.length == 0 ){
                var tag = 'div';
                els = $('[data-vCheck]>input',$form)
            }else{
                tag = 'input';
            }

            HELPER.removeTip()

            els.each( function(i,elem){
                //验证是否为空
                if(elem.value==''){
                    msgInfo['errorMsg'] =  tag == 'input' ? $(elem).attr('tag')+'不能为空' : $(elem).parent().attr('tag') +'不能为空';
                    $(elem).focus();
                    msgInfo['result'] = false;
                    HELPER.showTip(msgInfo['errorMsg'],$form);
                    errorEx = tag == 'input' ? $(elem).data('expression') : $(elem).parent().data('expression');
                    return false;
                }

                if( $(elem).attr('name') == 'newpassword' && $(elem).val() != $('[name="password"]').val() ){
                    HELPER.showTip('两次输入的密码不一致',$form);
                    errorEx = tag == 'input' ? $(elem).data('expression') : $(elem).parent().data('expression');
                    msgInfo['result'] = false;
                }
            })
            return msgInfo['result'];
        }
    }
}
