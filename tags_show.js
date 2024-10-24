


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
                    gravity="center"
                    />
                <View
                    layout_width="1dp"
                    layout_height="match_parent"
                    background="#FFFFFF"
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
            <View
                layout_width="match_parent"
                layout_height="1dp"
                background="#FFFFFF"
            />

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
    <View
     layout_width="1dp"
    layout_height="match_parent"
    background="#FFFFFF"
    />
    <TextView
        layout_width="0dp"
        layout_height="wrap_content"
        layout_weight="3"
        padding="8dp"
        
        id="matchs" />
    </TableRow>
)

    let View = ui.inflate(
        <View
        layout_width="match_parent"
        layout_height="1dp"
        background="#FFFFFF"
        />
    ,textView.tablerow)
    
        
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
    floatyWindow.table.addView(View);

    })
    textView.tablerow.setOnClickListener(function(view,event){
    ui.run(function(){
        events.broadcast.emit("chose",view.tags.text)
    })
    return true;
    })
    
    
    }
    

}

