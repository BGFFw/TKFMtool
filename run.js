/*
TKFMtool is a small tool used for the TKFM game.
Copyright (C) 2024  BGFF
This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
*/


if (!requestScreenCapture()) {
toast("请求截图失败");
exit()
}



let path1 = "./TKFMtool.js";
let path2 = "./tags_show.js";

let storage = storages.create("chosed");
if(!storage.get("mode"))
{
    storage.put("mode",0);
}


let capturing =false;
let tag_matchers = [];



let window = floaty.rawWindow(
    <frame bg="#00ff00">
        <button id="action" text="开始识图" w="245px" h="40" bg="#77ffffff" layout_gravity="right|center"/>
    </frame>
);
window.setPosition(device.width - 245, device.height / 2);


let thread = threads.start(function(){
    while(true)
    {
        if(capturing){
            window.action.setText("识图ing...");
            continue;
        }
        window.action.setText("开始识图");
    }
});
events.on("capturing_end", function(){
    capturing = false;
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
                dialogs.select("请选择模式(默认模式一)", ["模式一：识图后弹出结果页面", "模式二：识图后弹出结果页面且自动选择第一个选项", "模式三：识图后不弹出结果页面且自动选择第一个选项","关于本程序","关闭程序"],function(i)
                {
                    if(i==4)engines.stopAll();
                    else if(i==3)
                    {
                       alert("本程序由BGFF制作，如有任何问题请发送邮箱反馈\n邮箱：jinkentu19650215@163.com\nGithub：https://github.com/BGFFw/TKFMtool")
                    }
                    else{
                        if(i!=-1&&i!=3)storage.put("mode",i);
                    }

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
    }
}
