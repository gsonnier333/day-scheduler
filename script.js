$(document).ready(function(){
    var timeBlocks = [];
    $("#currentDay").text(moment().format('MMMM Do[,] YYYY'));
    for(var i = 9; i < 18; i++){
        var block = {
            hour: i,
            ampm: "PM",
            item: "Lorem ipsum dolor.",
            rgb: "200, 200, 200"
        }
        
        //then adjust hour to 12hr format
        block.hour %= 12;
        if(block.hour===0){
            block.hour = 12
        }
        if(block.hour>=9 && block.hour<12){
            block.ampm = "AM"
        }
        
        //push our newly finished block to the list
        timeBlocks.push(block);
    }
    
    function updateBlocks(){
        $("#schedule").empty();
        timeBlocks.forEach(function(block){
            var hour24 = block.hour;
            
            //convert back to 24hr time for comparisons
            if(hour24<9){
                hour24+=12;
            }
            
            if(hour24===moment().hour()){ //current
                block.rgb = "200, 225, 125";
            }
            else if(hour24>moment().hour()){ //future
                block.rgb = "125, 225, 125";
            }
            else{
                block.rgb = "200, 200, 200"; //past
            }
            
            //now put our time blocks back in with updated text/colors using a dynamically generated div
            //first the row itself
            var row = $("<div>").attr("class", "row");
            $("#schedule").append(row);
            
            //then the leftmost column for the time of day
            var colLeft = $("<div>").attr("class", "col-1 hour").attr("style", "background-color: rgb(255, 255, 255" + ")");
            colLeft.text(block.hour + block.ampm);
            row.append(colLeft);
            
            //then the middle column for text of what's scheduled
            var colMid = $("<textarea>").attr("class", "col-10").attr("style","background-color: rgb(" + block.rgb + ")");
            colMid.text(block.item);
            row.append(colMid);
            
            //lastly the right column for the save button
            var colRight = $("<button>").attr("class", "col-1 saveBtn").text("Save");
            row.append(colRight);
        })   
    }
    updateBlocks();
})

