/*
TKFMtool is a small tool used for the TKFM game.
Copyright (C) 2024 BGFF
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


let tag_matchers=[];


events.broadcast.on("tag_matchers",function(result)
{
    if(result=="clear")tag_matchers=[];
    else{
        tag_matchers.push(result);
    }
}

)
events.broadcast.on("tags_show",function()
{
  try{
    floaty_show(tag_matchers);
}catch(error)
{
    log(error)
}
}
)

setInterval(()=>{}, 1000);


function floaty_show(tag_matchers)
{
    let floatyWindow = floaty.rawWindow(
    <LinearLayout
    layout_width="match_parent"
    layout_height="match_parent"
    orientation="vertical"
    id="main"
    >

    <FrameLayout
        layout_width="match_parent"
        layout_height="0dp"
        layout_weight="10"
    >
        <Button
            layout_width="wrap_content"
            layout_height="wrap_content"
            text="关闭"
            layout_gravity="right|bottom"
            id="close_button"
        />
    </FrameLayout>

    <ScrollView
        layout_width="match_parent"
        layout_height="0dp"
        layout_weight="90"
        background="#07C2FB">

        <TableLayout
            layout_width="match_parent"
            layout_height="wrap_content"
            padding="16dp"
            id="table"
            >
    
            
            <TableRow
                background="#FFA500">
                <TextView
                    layout_width="0dp"
                    layout_height="wrap_content"
                    layout_weight="1"
                    text="选择"
                    textColor="#FFFFFF"
                    padding="8dp"
                    />
                <TextView
                    layout_width="0dp"
                    layout_height="wrap_content"
                    layout_weight="3"
                    text="角色清单"
                    textColor="#FFFFFF"
                    padding="8dp" 
                    gravity="center"/>
            </TableRow>
            

        </TableLayout>
    </ScrollView>
    
    </LinearLayout>
    );
    floatyWindow.close_button.setOnClickListener(function(view, event) {
        floatyWindow.close();
        return true;
    });
    floatyWindow.setPosition(0, device.height / 2);
    floatyWindow.setSize(device.width, device.height / 2);
    
    for(let i=0;i<tag_matchers.length;i++)
    {
    let textView = ui.inflate(
    <TableRow id="tablerow">
    <TextView
        layout_width="0dp"
        layout_height="wrap_content"
        layout_weight="1"
        padding="8dp"
        
        id="tags"/>
    <TextView
        layout_width="0dp"
        layout_height="wrap_content"
        layout_weight="3"
        padding="8dp"
        
        id="matchs" />
    </TableRow>)
    
        
        var spannableString = new android.text.SpannableString(tag_matchers[i].matchs.join("\n")+"\n");
        var regex = /2☆.*\n/g;
        var match;
        while((match = regex.exec(spannableString))!== null) {
            spannableString.setSpan(new android.text.style.ForegroundColorSpan(android.graphics.Color.RED), match.index, match.index + match[0].length, android.text.Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);
        }
        var regex = /3☆.*\n/g;
        var match;
        while((match = regex.exec(spannableString))!== null) {
            spannableString.setSpan(new android.text.style.ForegroundColorSpan(android.graphics.Color.parseColor("#b8860b")), match.index, match.index + match[0].length, android.text.Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);
        }
        
        ui.run(function(){
        textView.tags.setText(tag_matchers[i].tags.join("\n"))
        textView.matchs.setText(spannableString)
        floatyWindow.table.addView(textView);
        })
    textView.tablerow.setOnClickListener(function(view,event){
        ui.run(function(){
            events.broadcast.emit("chose",view.tags.text)
        })
        return true;
    })
    
    
    }
    

}

