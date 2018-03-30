$().ready(function() {
	validateRule();
});

$.validator.setDefaults({
	submitHandler : function() {
       if(checkPhone()){
            save();
	   }
	}
});

function checkPhone(){
    var phone = $("#custTel").val();
    if(!(/^1[34578]\d{9}$/.test(phone))){
        alert("请输入11位正确手机号");
        return false;
    }else{
    	return true;
	}
}

function save() {
	$.ajax({
		cache : true,
		type : "POST",
		url : "/sm/contact/save",
		data : $('#signupForm').serialize(),// 你的formid
		async : false,
		error : function(request) {
			parent.layer.alert("Connection error");
		},
		success : function(data) {
			if (data.code == 0) {
				parent.layer.msg("操作成功");
				parent.reLoad();
				var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
				parent.layer.close(index);

			} else {
				parent.layer.alert(data.msg)
			}

		}
	});

}
function validateRule() {
	var icon = "<i class='fa fa-times-circle'></i> ";
	$("#signupForm").validate({
		rules : {
            custName : {
				required : true
			},
            custTel : {
                required : true,
                //isPhone : true,
                remote : {
                    url : "/sm/contact/exit", // 后台处理程序
                    type : "post", // 数据发送方式
                    dataType : "json", // 接受数据格式
                    data : { // 要传递的数据
                        custTel : function() {
                            return $("#custTel").val();
                        }
                    }
                }
            }
		},
		messages : {
            custName : {
                required: icon + "请输入正确的通讯录人员姓名"
            },
            custTel : {
                required : icon + "请输入正确的手机号",
                //isPhone : icon + "请输入11位手机号",
                remote : icon + "手机号已经存在"
            }
	    }
	})
}
