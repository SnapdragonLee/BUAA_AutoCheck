// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-purple; icon-glyph: magic;

username = ""; // 北航统一认证账号;
password = ""; // 登陆密码;
boarder = "0"; // 是否在校住宿; 是 "1"，否 "0". 若为 "0", 填写下一项;
not_boarder_reasen = "1"; /* 若 boarder 为 "0", 请选数字: {
                                "0", 临时出校;
                                "1", 寒暑假返乡;
                                "2", 在境外科研学习;
                                "3", 在境内校外出差、实习;
                                "4", 病假、事假或休学中;
                                "5", 其他;
                            }
                            若选 "5"，填写下一项;
                         */

not_boarder_note = ""; // 若 not_boarder_reason 为 "5" (其他)，则要填写原因;

/* 北航地址 */
boarder_address = "北京市海淀区花园路街道北京航空航天大学大运村学生公寓5号楼";
boarder_area = "北京市 海淀区";
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

notify = new Notification();
notify.title = "北航师生报平安系统";


function encode_formdata(obj) {
    var str = [];
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]))
            // console.log(key + " -> " + obj[key]);
        }
    }
    return str.join("&");
}

async function check() {
    var login = new Request(login_url);
    login.headers = {"Content-Type": "application/x-www-form-urlencoded"};
    login.method = "POST";
    login.body = encode_formdata(userdata);
    await login.load();

    var resp = login.response;

    if (resp.statusCode !== 200) {
        console.log("Login failed.");
        notify.body = "登陆失败";
        return false;
    }

    console.log("Login success!");

    var cookie = "";
    resp.cookies.forEach(element => {
        cookie = cookie + element["name"] + "=" + element["value"] + "; "
    });
    console.log(resp.cookies)
    console.log(cookie)

    var req_info = new Request(info_url);

    var info_data = await req_info.loadJSON();

    if (req_info.response.statusCode !== 200) {
        console.log("Rediret failed.");
        notify.body = "获取信息失败";
        return false;
    }

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
        if (not_boarder_reasen === "5") {
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

    var req_save = new Request(save_url);
    req_save.method = "POST";
    req_save.body = encode_formdata(save_data);

    var resp_json = await req_save.loadJSON();

    console.log(resp_json);
    notify.body = "请求上传成功！\n" + resp_json["m"];
    return true;
}

await check();
notify.schedule();
Script.complete();
