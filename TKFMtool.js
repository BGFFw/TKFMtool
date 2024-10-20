/*
TKFMtool is a small tool used for the TKFM game.
Copyright (C) BGFF  name of author
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


let currentEngine = engines.myEngine()
let runningEngines = engines.all()
let currentSource = currentEngine.getSource() + ''
if (runningEngines.length > 1) {
  runningEngines.forEach(compareEngine => {
    let compareSource = compareEngine.getSource() + ''
    if (currentEngine.id !== compareEngine.id && compareSource === currentSource) {
      // 强制关闭同名的脚本
      compareEngine.forceStop()
    }
  })
}

events.broadcast.emit("TKFMtoolRunSuccess");





var runEngine = null;


var dataset = [
  ["3☆魔王 巴尔", "领袖", "火属性", "魔族", "中体型", "攻击者", "爆发力", "输出"],
    ["3☆魔王 撒旦", "领袖", "闇属性", "魔族", "中体型", "守护者", "生存力", "回击","巨乳", "防御","保护"],
    ["3☆精灵王 赛露西亚", "领袖", "风属性", "亚人", "中体型", "巨乳", "辅助者", "爆发力", "支援"],
    ["3☆矮人王 兰儿", "领袖", "水属性", "亚人", "小体型", "贫乳", "攻击者", "爆发力","越战越强", "输出"],
    ["3☆法斯公主 露露", "领袖", "风属性", "人类", "治疗者", "回复"],
    ["3☆魔王 伊布力斯", "领袖", "光属性", "魔族", "中体型", "攻击者", "生存力", "输出", "群体攻击"],
    ["3☆蛇女之后 梅斯米奈雅", "领袖", "火属性", "妨碍者", "爆发力", "贫乳", "魔族", "干扰(?)", "削弱", "中体型"],
    ["3☆KS-VIII 魔人偶", "闇属性", "攻击者", "领袖", "爆发力", "输出", "巨乳(?)", "中体型", "越战越强"],
    ["3☆煌星 妲斯艾菲娜", "闇属性", "辅助者", "领袖", "人类", "中体型", "贫乳", "支援"],
    ["3☆复生公主 千鹤", "风属性", "攻击者", "领袖", "爆发力", "输出", "中体型", "巨乳(?)", "魔族"],
    ["3☆天使长 圣米勒", "光属性", "中体型", "攻击者", "领袖", "亚人(?)", "支援","巨乳(?)", "输出(?)"],
    ["3☆千年血族 洛缇亚", "闇属性", "攻击者", "魔族", "中体型", "领袖", "巨乳(?)", "输出", "爆发力"],
    ["3☆食梦 阿尔蒂雅", "闇属性", "妨碍者", "亚人", "领袖", "贫乳", "干扰(?)", "削弱", "中体型"],
    ["3☆堕龙 凯西菲娜", "水属性", "守护者", "领袖", "亚人", "中体型", "巨乳", "防御", "回击", "生存力(?)", "保护"],
    ["3☆极乐之鬼 伊吹朱点", "火属性", "攻击者", "领袖", "中体型", "输出", "亚人", "贫乳"],
    ["3☆音速魅影 祈", "风属性", "攻击者", "亚人", "中体型", "领袖", "输出", "爆发力"],
    ["3☆古代勇者 乌鲁塔", "风属性", "守护者", "人类", "中体型", "领袖","保护","防御"],
    ["3☆现代勇者 神田绫音", "光属性", "攻击者", "人类", "爆发力", "输出", "领袖", "中体型"],
    ["3☆未来勇者 牧爱菈", "风属性", "妨碍者", "人类", "中体型", "削弱", "领袖","支援"],
    ["3☆猫娘Vtuber 杏仁咪噜","攻击者","亚人","爆发力","小体型","贫乳","领袖","火属性", "生存力"],
    ["3☆异国商人 雪蘭瑚", "水属性", "治疗者", "亚人", "支援", "回复","中体型","领袖", "保护"],
    ["3☆高等魔族 法雅", "火属性", "治疗者", "魔族", "领袖", "回复", "支援", "中体型", "保护"],
    ["3☆传说女仆 艾蜜莉", "领袖", "光属性","辅助者","回复","人类", "中体型","支援", "巨乳"],
    ["3☆千咒魔女 安西莉卡", "领袖", "闇属性","攻击者","人类(?)","亚人(?)","爆发力","越战越强","输出"], 
    ["3☆元气补给 莲", "领袖", "火属性","治疗者","人类(?)","回复","支援(80%)"],
    ["3☆夜星 狄", "领袖", "风属性","攻击者","中体型","人类","削弱","输出"],
    ["3☆贤者 白","领袖", "风属性", "治疗者", "亚人", "中体型", "支援", "回复"],
    ["3☆毒蝎 莫默","领袖", "水属性", "攻击者", "魔族", "中体型", "贫乳", "爆发力", "输出"],

    ["2☆魔管家 艾可", "菁英", "闇属性", "魔族", "辅助者", "中体型", "美乳", "支援"],
    ["2☆圣骑士长 雷欧娜", "菁英", "水属性", "人类", "守护者", "美乳", "中体型", "生存力", "保护", "防御"],
    ["2☆神官长 菲欧菈", "菁英", "光属性", "人类", "治疗者", "美乳", "中体型", "回复"],
    ["2☆女忍者 凛月", "菁英", "风属性", "人类", "攻击者", "美乳", "中体型", "输出", "群体攻击", "爆发力"],
    ["2☆剑圣 神无雪", "菁英", "火属性", "亚人", "攻击者", "美乳", "中体型", "越战越强", "削弱"],
    ["2☆妖狐 静", "菁英", "水属性", "美乳", "妨碍者", "亚人", "小体型", "削弱", "干扰"],
    ["2☆大将军 朱诺安", "菁英", "闇属性", "人类", "攻击者", "巨乳", "中体型", "输出", "支援"],
    ["2☆天才女军师 布兰妮", "菁英", "光属性", "人类", "妨碍者", "美乳", "中体型", "群体攻击", "削弱", "爆发力", "支援"],
    ["2☆史莱姆女王 娜芙拉拉", "菁英", "风属性", "魔族", "守护者", "巨乳", "中体型", "保护", "防御", "生存力", "回复"],
    ["2☆魔法少女 托特拉", "菁英", "光属性", "攻击者", "中体型", "人类", "爆发力", "美乳", "削弱", "输出"],
    ["2☆最后的银龙 普利特拉", "闇属性", "菁英", "妨碍者", "亚人", "中体型", "削弱", "美乳"],
    ["2☆刺针 嘉维尔", "风属性", "攻击者", "菁英", "美乳", "人类", "中体型", "输出"],
    ["2☆精灵舞者 塔诺西雅", "菁英", "光属性","辅助者","亚人", "回复","美乳","中体型"],
    ["2☆工会看板娘 小萤", "菁英",  "水属性","治疗者", "支援", "人类", "贫乳","回复","中体型"],

    ["1☆流浪魔法师 尤依", "火属性", "攻击者", "人类", "巨乳", "小体型", "越战越强", "输出"],
    ["1☆龙女 伊维斯", "火属性", "攻击者", "亚人", "贫乳", "小体型", "越战越强", "群体攻击", "输出"],
    ["1☆猫妖 娜娜", "风属性", "攻击者", "魔族", "贫乳", "小体型", "输出"],
    ["1☆美人鱼 玛莲", "水属性", "治疗者", "亚人", "美乳", "中体型", "回复"],
    ["1☆犬人族 朵拉", "风属性", "守护者", "亚人", "美乳", "保护", "生存力", "中体型", "防御"],
    ["1☆双蛇军团护士长 艾琳", "光属性", "治疗者", "人类", "巨乳", "中体型", "回复"],
    ["1☆魅魔 撒芭丝", "闇属性", "妨碍者", "魔族", "美乳", "干扰", "削弱", "中体型"],
    ["1☆闇黑精灵 索拉卡", "闇属性", "妨碍者", "亚人", "中体型", "削弱", "美乳"],
    ["1☆白蔷薇 伊艾", "光属性","治疗者", "人类", "贫乳", "小体型","回复"],
    ["1☆冷艳美医 嘉莉娜", "无词条"],

    ["0☆法斯帝国法师 佩托拉", "光属性", "攻击者", "人类", "贫乳", "中体型", "群体攻击", "输出", "士兵"],
    ["0☆矮人战士 可儿", "水属性", "攻击者", "亚人", "贫乳", "小体型", "输出", "爆发力", "士兵"],
    ["0☆精灵射手 奥菈", "风属性", "攻击者", "亚人", "美乳", "中体型", "输出", "士兵"],
    ["0☆魔族法师 玛努艾拉", "闇属性", "攻击者", "中体型", "魔族", "美乳", "输出", "士兵"],
    ["0☆烈日国武士 桔梗", "火属性", "妨碍者", "人类", "美乳", "中体型", "削弱", "士兵"],
    ["0☆蛇女 拉米亚", "火属性", "妨碍者", "美乳", "中体型", "削弱", "干扰", "士兵"],
    ["0☆史莱姆娘 萝尔", "水属性", "妨碍者", "魔族", "美乳", "小体型", "削弱", "生存力", "士兵", "回复"],
    ["0☆鸟身女妖 哈比", "风属性", "妨碍者", "魔族", "美乳", "中体型", "干扰", "士兵"],
    ["0☆法斯帝国士兵 赛莲", "闇属性", "守护者", "人类", "美乳", "中体型", "保护", "防御", "士兵"],
    ["0☆牛女 米诺", "风属性", "守护者", "亚人", "巨乳", "中体型", "干扰", "保护", "防御", "生存力", "士兵"],
    ["0☆魔族战士 芙蕾", "光属性", "守护者", "魔族", "美乳", "中体型", "保护", "士兵", "防御"],
    ["0☆圣光骑士 玛蒂娜", "光属性", "守护者", "人类", "美乳", "中体型", "保护", "生存力", "防御", "士兵"],
    ["0☆双蛇军团士兵 夏琳", "火属性", "守护者", "人类", "美乳", "中体型", "防御", "群体攻击", "保护", "士兵"],
    ["0☆烈日国巫女 枫", "风属性", "治疗者", "人类", "美乳", "中体型", "回复", "士兵"],
    ["0☆主神教团僧兵 克蕾雅", "光属性", "治疗者", "人类", "美乳", "中体型", "回复", "士兵"],
    ["0☆试做机三号", "光属性", "攻击者", "小体型", "士兵", "美乳", "输出", "生存力"],
    ["0☆法斯菁英近卫 安娜", "火属性", "守护者", "人类", "中体型", "防御", "士兵", "保护", "美乳"],
    ["0☆法斯高阶法师 诺诺可", "水属性", "攻击者", "人类", "中体型", "美乳", "输出", "士兵", "爆发力"],
    ["0☆法斯精锐骑士 布兰", "风属性", "攻击者", "人类", "中体型", "美乳", "输出", "防御", "士兵"],
    ["0☆惩戒天使", "水属性", "守护者", "士兵", "生存力", "中体型", "回击", "群体攻击", "美乳", "亚人"],
    ["0☆福音天使", "水属性", "治疗者", "士兵", "保护", "美乳", "中体型"],
    ["0☆木乃伊 穆穆", "闇属性", "生存力", "妨碍者", "中体型", "保护", "干扰", "美乳"],
    ["0☆人马 赛希", "风属性", "巨乳", "中体型", "攻击者", "亚人", "爆发力", "输出"]
  ]




setInterval(()=>{}, 1000);//保持脚本运行


let _result = []
let result = []
let tag_matchers = []
let img = null
let running = true
let capturing = false
let storage = storages.create("chosed")
let turn_width = device.width/1080;
let turn_height = device.height/2400;


events.on("Engine", function(Engine){
  runEngine = Engine;//获得执行该脚本的脚本引擎对象；
});

events.on("Capturing", function(){
    try{
      if(!capturing)
      {
        tag_matchers=[]
        captureAndOcr();
        tags_find();
        if(storage.get("mode")==0)
        {
          events.broadcast.emit("tags_show");
        }
        else if(storage.get("mode")==1)
        {
          clickfrompositon(tagstoposition(tag_matchers[0].tags));
          events.broadcast.emit("tags_show");
        }
        else if(storage.get("mode")==2)
        {
          clickfrompositon(tagstoposition(tag_matchers[0].tags));
        }
      }
    }catch(error)
    {
      toast("Error");
    }
    
});
events.broadcast.on("chose",function(text){
  tags = text.split("\n");
  clickfrompositon(tagstoposition(tags));
});



function captureAndOcr() {
  capturing = true;
  img && img.recycle()
  img = captureScreen()
  if (!img) {
    toastLog('截图失败')
  }
  img = images.clip(img,42*turn_width,833*turn_height,(1033-42)*turn_width,(1137-833)*turn_height);
  //img.saveTo("/storage/emulated/0/Download/1.jpg");
  _result = paddle.ocr(img,useSlim=false);
  //log(_result)
  _result = _result.map((element)=>
  {
    let a = new Object();
    if(element.text.search(/\u788d\u8005/)!=-1)
      {
        a.text = "妨碍者";
      }
      else if(element.text.search(/\u5468/)!=-1)
      {
        a.text = "闇属性";
      }
      else if(element.text.search(/\u9593/)!=-1)
        {
          a.text = "闇属性";
        }
      else{
        a.text = element.text;
      }
    a.bounds = element.bounds;
    return a;
  })
  result = _result.map((element)=>{
    return element.text;
  });
  correctresult();
  capturing = false
  runEngine.emit("capturing_end");
}






img && img.recycle();
function correctresult()
{
  for(let i=0;i<result.length;i++)
    {
      let ocrResult = result[i];
      if(ocrResult.search(/\u788d\u8005/)!=-1)
      {
        result[i] = "妨碍者";
      }
      if(ocrResult.search(/\u5468/)!=-1)
      {
        result[i] = "闇属性";
      }
    }
    log(_result);
}

function tags_find()
{
  for(let i=0;i<5;i++)
  {
    for(let j=i+1;j<5;j++)
    {
      for(let k=j+1;k<5;k++)
      {
        let tag_matcher = new Tag_matcher([result[i],result[j],result[k]]);
        tag_matchers.push(tag_matcher);
      }
    }
  }
  for(let i=0;i<5;i++)
  {
    for(let j=i+1;j<5;j++)
    {
      let tag_matcher = new Tag_matcher([result[i],result[j]]);
        tag_matchers.push(tag_matcher);
    }
  }
  for(let i=0;i<5;i++)
  {
    let tag_matcher = new Tag_matcher([result[i]]);
        tag_matchers.push(tag_matcher);
  }
  for(let i=0;i<tag_matchers.length;i++)
  {
    for(let j=0;j<dataset.length;j++)
    {
      if(tag_matchers[i].tags.every((element)=>{return dataset[j].includes(element);}))
      {
        if(dataset[j][0].charAt(0)!='3')tag_matchers[i].matchs.push(dataset[j]);
        if(dataset[j][0].charAt(0)=='0'&& tag_matchers[i].pre<0)
          {
            tag_matchers[i].pre = 0;
          }
        
        if(dataset[j][0].charAt(0)=='1'&&tag_matchers[i].pre<1)
        {
          tag_matchers[i].pre = 1;
        }
        if(dataset[j][0].charAt(0)=='2'&&tag_matchers[i].pre<2)
        {
            tag_matchers[i].pre = 2;
        }
        if(dataset[j][0].charAt(0)=='3'&&tag_matchers[i].tags.includes("领袖"))
        {
            tag_matchers[i].pre = 3;
            tag_matchers[i].matchs.push(dataset[j]);
        }
      }
    }
  }
  tag_matchers=tag_matchers.filter((element)=>{
    if(element.pre!=-1)return true;
    return false;
  })

  tag_matchers.sort((a,b)=>{

    if(a.pre!=b.pre)return b.pre-a.pre;
    else{return a.matchs.length-b.matchs.length;}
  })
  //log(tag_matchers);
  if(tag_matchers)
  {
    events.broadcast.emit("tag_matchers","clear");
    for(let i=0;i<tag_matchers.length;i++)
    {
      events.broadcast.emit("tag_matchers",tag_matchers[i]);
    }

  }
  
}
 

function Tag_matcher(tags)
{
  this.tags = tags;
  this.matchs = [];
  this.pre = -1;
}

function tagstoposition(tags)
{
  let position = [];
  for(let i=0;i<tags.length;i++)
  {
    for(let j=0;j<_result.length;j++)
    {
      if(tags[i]==_result[j].text)
      {
        position.push([_result[j].bounds.left+_result[j].bounds.right-_result[j].bounds.left+42*turn_width,_result[j].bounds.top+_result[j].bounds.bottom-_result[j].bounds.top+833*turn_height]);
        break;
      }
    }
  }
  return position;
}

function clickfrompositon(position)
{
  auto.waitFor()
  
  for(let i=0;i<position.length;i++)
  {
    //log(position);
    press(position[i][0],position[i][1],50);
  } 
}

