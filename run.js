

if (!requestScreenCapture()) {
toast("请求截图失败");
exit()
}



let path1 = "./TKFMtool.js";
let path2 = "./tags_show.js";
let path3 = "./UserCorrectWindow.js";


let storage = storages.create("chosed");
if(storage.get("mode")===undefined)
{
    storage.put("mode",0);
}
if(storage.get("None_SRtime")===undefined)
{
    storage.put("None_SRtime","09")
}
if(storage.get("Have_SRtime")===undefined)
{
    storage.put("Have_SRtime","09")
}
if(storage.get("SetTime")===undefined)
{
    storage.put("SetTime",1)//1为关闭，0为开启
}
if(storage.get("CPU_Core")===undefined)
{
    storage.put("CPU_Core",3)
}
if(storage.get("Ocr_Mode")===undefined)
{
    storage.put("Ocr_Mode",0)
}
if(storage.get("UserCorrectSet")===undefined)
{
    storage.put("UserCorrectSet",[
        {
            title: "間属性",
            summary: "闇属性",
            color: "#f44336",
            done: true
        },
        {
            title: "周属性",
            summary: "闇属性",
            color: "#ff5722",
            done: true
        },
        {
            title: "防碍者",
            summary: "妨碍者",
            color: "#4caf50",
            done: true
        },
        {
            title: "留院",
            summary: "削弱",
            color: "#2196f3",
            done: true
        }
    ]);
}

let capturing =false;
let tag_matchers = [];



let window = floaty.rawWindow(
    <frame bg="#00ff00">
        <button id="action" text="开始识图" w="245px" h="40" bg="#77ffffff" layout_gravity="right|center"/>
    </frame>
);
window.setPosition(device.width - 245, device.height / 2);


events.on("capturing_end", function(){
    capturing = false;
    ui.run(function()
    {
        window.action.setText("开始识图");
    });
});




setInterval(()=>{}, 1000);





let TKFMtool = null;
TKFMtool = engines.execScriptFile(path1);
events.broadcast.on("TKFMtoolRunSuccess", function(){
    TKFMtool.getEngine().emit("Engine",engines.myEngine());
});
let tags_show = null;
tags_show = engines.execScriptFile(path2);



//记录按键被按下时的触摸坐标
let x = 0, y = 0;
//记录按键被按下时的悬浮窗位置
let windowX, windowY;
//记录按键被按下的时间以便判断长按等动作
let downTime;
let longPressed = false;


window.action.setOnTouchListener(function(view, event){
    switch(event.getAction()){
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            windowX = window.getX();
            windowY = window.getY();
            downTime = new Date().getTime();
            
            return true;
        case event.ACTION_MOVE:
            //移动手指时调整悬浮窗位置
            window.setPosition(windowX + (event.getRawX() - x),
                windowY + (event.getRawY() - y));
            //如果按下的时间超过0.5秒判断为长按
            if(!longPressed&&new Date().getTime() - downTime > 500&&Math.abs(event.getRawY() - y) < 100 && Math.abs(event.getRawX() - x) < 100){
                longPressed = true;
                dialogs.select("设置", ["选择运行模式","自动设置招募时间开关","招募时间设置","识图所用CPU核心数目","识图模式","识图结果纠错","查看上次识图结果（纠正后）（需要通知权限）","关于本程序","关闭程序"],function(i)
                {
                    
                    if(i==0)
                    {
                        dialogs.select("请选择模式(当前为模式"+convertToChineseNumber(storage.get("mode")+1)+")", ["模式一：识图后弹出结果页面", "模式二：识图后弹出结果页面且自动选择第一个选项", "模式三：识图后不弹出结果页面且自动选择第一个选项"],function(i)
                    {
                        if(i!=-1)storage.put("mode",i);
                    })
                    }
                    else if(i==1)
                    {
                        dialogs.singleChoice("自动设置招募时间开关",["开启","关闭"],storage.get("SetTime"),function(i)
                        {
                            if(i!=-1)storage.put("SetTime",i);
                        })
                    }
                    else if(i==2)
                    {
                        dialogs.singleChoice("非必出SR及以上词条招募时间",["1","2","3","4","5","6","7","8","9"] ,parseInt(storage.get("None_SRtime"),10)-1 ,function(i)
                        {
                            if(i==0)
                            {
                                storage.put("None_SRtime","01")
                            }
                            else if(i==1)
                            {
                                storage.put("None_SRtime","02")
                            }
                            else if(i==2)
                            {
                                storage.put("None_SRtime","03")
                            }
                            else if(i==3)
                            {
                                storage.put("None_SRtime","04")
                            }
                            else if(i==4)
                            {
                                storage.put("None_SRtime","05")
                            }
                            else if(i==5)
                            {
                                storage.put("None_SRtime","06")
                            }
                            else if(i==6)
                            {
                                storage.put("None_SRtime","07")
                            }
                            else if(i==7)
                            {
                                storage.put("None_SRtime","08")
                            }
                            else if(i==8)
                            {
                                storage.put("None_SRtime","09")
                            }
                            dialogs.singleChoice("必出SR及以上词条招募时间",["1","2","3","4","5","6","7","8","9"] ,parseInt(storage.get("Have_SRtime"),10)-1 ,function(i)
                        {
                            if(i==0)
                            {
                                storage.put("Have_SRtime","01")
                            }
                            else if(i==1)
                            {
                                storage.put("Have_SRtime","02")
                            }
                            else if(i==2)
                            {
                                storage.put("Have_SRtime","03")
                            }
                            else if(i==3)
                            {
                                storage.put("Have_SRtime","04")
                            }
                            else if(i==4)
                            {
                                storage.put("Have_SRtime","05")
                            }
                            else if(i==5)
                            {
                                storage.put("Have_SRtime","06")
                            }
                            else if(i==6)
                            {
                                storage.put("Have_SRtime","07")
                            }
                            else if(i==7)
                            {
                                storage.put("Have_SRtime","08")
                            }
                            else if(i==8)
                            {
                                storage.put("Have_SRtime","09")
                            }
                        }
                        )}
                     )
                    }
                    else if(i==3)
                    {
                        dialogs.singleChoice("选择识图所用CPU核心数目",["1","2","3","4","5","6","7","8"] ,storage.get("CPU_Core") ,function(i)
                        {
                            if(i==0)
                            {
                                storage.put("CPU_Core",0)
                            }
                            else if(i==1)
                            {
                                storage.put("CPU_Core",1)
                            }
                            else if(i==2)
                            {
                                storage.put("CPU_Core",2)
                            }
                            else if(i==3)
                            {
                                storage.put("CPU_Core",3)
                            }
                            else if(i==4)
                            {
                                storage.put("CPU_Core",4)
                            }
                            else if(i==5)
                            {
                                storage.put("CPU_Core",5)
                            }
                            else if(i==6)
                            {
                                storage.put("CPU_Core",6)
                            }
                            else if(i==7)
                            {
                                storage.put("CPU_Core",7)
                            }
                        }
                        )
                    }
                    else if(i==4)
                    {
                        dialogs.singleChoice("选择识图所用模式",["精准模型","快速模型"] ,storage.get("Ocr_Mode") ,function(i)
                        {
                            if(i==0)
                            {
                                storage.put("Ocr_Mode",0)
                            }
                            else if(i==1)
                            {
                                storage.put("Ocr_Mode",1)
                            }
                        }
                        )
                    }
                    else if(i==5)
                    {
                        engines.execScriptFile(path3);

                    }
                    else if(i==6)
                    {
                        toast("上一次的结果为："+storage.get("last_result"));
                    }
                    else if(i==7)
                    {
                       alert("本程序由BGFF制作，如有任何问题请发送邮箱反馈\n邮箱：jinkentu19650215@163.com\nGithub：https://github.com/BGFFw/TKFMtool")
                    }
                    else if(i==8)engines.stopAll();

                });
            }
            return true;
        case event.ACTION_UP:
            //手指弹起时如果偏移很小则判断为点击
            if(Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5){
                if(!longPressed)
                {
                onClick();
                }
                
            }
            longPressed = false;
            return true;
    }
    return true;
});

function onClick(){
    if(!capturing){
        capturing = true;
        TKFMtool.getEngine().emit("Capturing");
        ui.run(function()
        {
            window.action.setText("识图ING...")
        })
    }
}



function convertToChineseNumber(num) {
    const chineseNumbers = {
        0: '零',
        1: '一',
        2: '二',
        3: '三',
        4: '四',
        5: '五',
        6: '六',
        7: '七',
        8: '八',
        9: '九'
    };

    return num.toString().split('').map(digit => chineseNumbers[digit]).join('');
}