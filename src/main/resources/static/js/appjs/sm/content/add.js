$().ready(function() {
	validateRule();
});

$.validator.setDefaults({
	submitHandler : function() {
		save();
	}
});
function save() {
	$.ajax({
		cache : true,
		type : "POST",
		url : "/sm/content/save",
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
			    if (data.code == null || data.code == ''){
                    //parent.layer.alert(data);
                    parent.layer.open({
                        type: 1,
                        skin: 'layui-layer-rim', //加上边框
                        area: ['900px', '500px'], //宽高
                        content: data
                    });
                }else {
                    parent.layer.alert(data.msg);
                }
			}
		}
	});
}
function validateRule() {
	var icon = "<i class='fa fa-times-circle'></i> ";
	$("#signupForm").validate({
		rules : {
			name : {
				required : true
			}
		},
		messages : {
			name : {
				required : icon + "请输入姓名"
			}
		}
	})
}

function getTelNum(id, obj) {
	var tel = obj.value.replace(/\n/g, ",");
	tel.replace(/r\n/g, ",");
	var telArray = tel.split(",");
	$("#"+id).text(telArray.length);
}

function getStrLength(id, object) {
    ///<summary>获得字符串实际长度，中文2，英文1</summary>
    ///<param name="str">要获得长度的字符串</param>
     $("#"+id).text(getStrLeng(object.value));
}
function getStrLeng(str){
    var realLength = 0;
    var len = str.length;
    var charCode = -1;
    for(var i = 0; i < len; i++){
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) {
            realLength += 1;
        }else{
            // 如果是中文则长度加3
            realLength += 1;
        }
    }
    return realLength;
}
function impContact() {
	layer.open({
		type : 2,
		title : '导入通讯录',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '600px', '500px' ],
		content : '/sm/content/impContact', // iframe的url
        btn: ['确定', '关闭'],
        yes: function (index) {
            var res = window["layui-layer-iframe" + index].returnFunction();
            var tmp = $("#tel").val();
            if(tmp != null && tmp != ''){
                $("#tel").val(tmp+","+res);
            }else {
                $("#tel").val(res);
            }
            tmp = $("#tel").val();
            var telArray = tmp.split(",");
            $("#telNum").text(telArray.length);
            layer.close(index);
        }
	});
}
function impFile() {
    layer.open({
        type : 2,
        title : '导入文件(仅支持txt文件导入)',
        maxmin : true,
        shadeClose : false, // 点击遮罩关闭层
        area : [ '500px', '250px' ],
        content : '/sm/content/impFile', // iframe的url
        btn: ['确定', '关闭'],
        yes: function (index) {
            var res = window["layui-layer-iframe" + index].returnTel();
            $("#tel").val(res);
            layer.close(index);
        }
    });
}