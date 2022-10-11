let nn = require('./notification')

username = ""; // 北航统一认证账号;
password = "码"; // 登陆密码;
boarder = "1"; // 是否在校住宿; 是 "1"，否 "0". 若为 "0", 填写下一项;
not_boarder_reasen = ""; /* 若 boarder 为 "0", 请选数字: {
                                "1", 临时出校;
                                "2", 寒暑假返乡;
                                "3", 在境外科研学习;
                                "4", 在境内校外出差、实习;
                                "5", 病假、事假或休学中;
                                "6", 其他;
                            }
                            若选 "6"，填写下一项;
                         */

not_boarder_note = ""; // 若 not_boarder_reason 为 "6" (其他)，则要填写原因;

/* 北航地址 */
boarder_address = "北京市昌平区沙河镇坐拥百城书吧北京航空航天大学沙河校区"; // 北航沙河校区地址
boarder_area = "北京市 昌平区";
boarder_city = "北京市";
boarder_province = "北京市";

/* 离校去往住址 */
set_address = "xx市xx区xxxx小区xxx楼"; // 填写离校去往地址;
set_area = "xx省 xx市/州 xx区/市"; // 例如 "北京市 延庆区"；"广东省 深圳市 福田区";
set_city = "xx市"; // 例如 "北京市"；"深圳市";
set_province = "xx省/市"; // 例如 "北京市"；"广东省";


/**********************************************************************************/

userdata = {"username": username, "password": password};

main_app = "https://app.buaa.edu.cn"
login_url = main_app + "/uc/wap/login/check";
info_url = main_app + "/buaaxsncov/wap/default/get-info";
save_url = main_app + "/buaaxsncov/wap/default/save";

function ParseSetCookie(a) { // 正则表达式处理Set-Cookie
    var arr = a.replace(/expires=(.*?)GMT/g,function($1) {
        return "expires=" + new Date($1).getTime();
    }).split(", ");
 
    var cookies = [];
	for(var i=0;i<arr.length;i++)
	{
		let cookie = parse(/([^=;\s]+)=([^;]+);?/g, arr[i].replace(/; httponly/g, "$&=true"));
		cookies.push(cookie);
	}
    function parse(reg, text) {
        if (!reg || !text) return {}
        let res = reg.exec(text);
        return res[1]+'='+res[2];
    }
    return cookies.join('; ');
}


function check() {
    const login_options = {
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
    }

    // var login = http.request(login_url,options, (res) => {
    //     console.log(`STATUS: ${res.statusCode}`);
    //     console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    //   });

    var login = http.post(login_url, userdata, login_options);
    if (login.statusCode !== 200) {
        console.log("Login failed.");
        nn.send('北航师生报平安系统','登陆失败！\n账号或密码错误','');
    }
    console.log("Login success!");
    // console.log(login.headers['Set-Cookie'].join(', '));
    session = ParseSetCookie(login.headers['Set-Cookie'].join(', '));
    // console.log(session);

    const info_options = {
        headers: {"Content-Type": "application/x-www-form-urlencoded", Cookie: session},
    }

    var req_info = http.get(info_url,info_options);

    if (req_info.statusCode !== 200) {
        console.log("Rediret failed.");
        nn.send('北航师生报平安系统','获取信息失败！\n请检查网络环境，或稍后再试一次','');
        return false;
    }

    var info_data = JSON.parse(req_info.body.string());
    // console.log(info_data);

    var save_data = {
        "sfzs": "",
        "bzxyy": "", "bzxyy_other": "",
        "brsfzc": "1", "tw": "", "sfcxzz": "", "zdjg": "",
        "zdjg_other": "", "sfgl": "", "gldd": "",
        "gldd_other": "", "glyy": "", "glyy_other": "",
        "gl_start": "", "gl_end": "", "sfmqjc": "",
        "sfzc_14": "1", "sfqw_14": "", "sfqw_14_remark": "",
        "sfzgfx": "", "sfzgfx_remark": "",
        "sfjc_14": "", "sfjc_14_remark": "", "sfjcqz_14": "",
        "sfjcqz_14_remark": "", "sfgtjz_14": "",
        "sfgtjz_14_remark": "", "szsqqz": "", "sfyqk": "",
        "szdd": "1", "area": "",
        "city": "", "province": "",
        "address": "",
        "gwdz": "", "is_move": "", "move_reason": "", "move_remark": "",
        "realname": "", "number": "", "uid": "", "created": "",
        "date": "", "id": ""
    };
    if (boarder === "0") {
        save_data["sfzs"] = "0";
        save_data["bzxyy"] = not_boarder_reasen;
        if (not_boarder_reasen === "6") {
            save_data["bzxyy_other"] = not_boarder_note;
        }
        save_data["area"] = set_area;
        save_data["city"] = set_city;
        save_data["province"] = set_province;
        save_data["address"] = set_address;
    } else {
        save_data["sfzs"] = "1";
        save_data["area"] = boarder_area;
        save_data["city"] = boarder_city;
        save_data["province"] = boarder_province;
        save_data["address"] = boarder_address;
    }

    save_data["realname"] = info_data["d"]["uinfo"]["realname"];
    save_data["number"] = info_data["d"]["uinfo"]["role"]["number"];
    save_data["uid"] = info_data["d"]["info"]["uid"];
    save_data["created"] = info_data["d"]["info"]["created"];
    save_data["date"] = info_data["d"]["info"]["date"];
    save_data["id"] = info_data["d"]["info"]["id"];

    // var req_save = new Request(save_url);
    // req_save.method = "POST";
    // req_save.body = encode_formdata(save_data);

    // console.log(encode_formdata(save_data))

    const save_options = {
        headers: {"Content-Type": "application/x-www-form-urlencoded", Cookie: session},
    }
    var req_save = http.post(save_url, save_data, save_options);

    console.log(req_save.body.string());
    resp_json = JSON.parse(req_save.body.string());
    nn.send('北航师生报平安系统',"请求上传成功！ 填报人：" + save_data["realname"] + "\n" + resp_json["m"],'');

    return true;
}

check();