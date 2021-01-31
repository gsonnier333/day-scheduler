

$(document).ready(function(){    
    //first check local storage for any previously saved schedule items
    var items = localStorage.getItem("items"); //var for stored items
    if(items===null){ //if it's not in local storage yet
         //make a new array of 9 empty strings, one for each time block in the schedule
        localStorage.setItem("items", JSON.stringify(["","","","","","","","",""])); //put it in local storage
        items = localStorage.getItem("items"); //set items to the new stored array
    }
    
    var itemsParsed = JSON.parse(items); //store parsed items, should be an array
    
    var timeBlocks = []; //array for block objects
    $("#currentDay").text(moment().format('MMMM Do[,] YYYY'));
    for(var i = 9; i < 18; i++){
        var block = { //block object for all relevant data in a given row
            hour: i,
            ampm: "PM",
            item: itemsParsed[i-9],
            rgb: "200, 200, 200",
            number: i-9 //for reference when saving to localStorage later, correlates with its position in the array
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
            
            block.item = itemsParsed[block.number];
            
            //now put our time blocks back in with updated text/colors using a dynamically generated div
            
            //first the row itself
            var row = $("<div>").attr("class", "row");
            $("#schedule").append(row);
            
            //then the leftmost column for the time of day
            var colLeft = $("<div>").attr("class", "col-1 hour").attr("style", "background-color: rgb(255, 255, 255" + ")");
            colLeft.text(block.hour + block.ampm);
            row.append(colLeft);
            
            //then the middle column for text of what's scheduled
            var colMid = $("<textarea>").attr("class", "col-10").attr("style","background-color: rgb(" + block.rgb + ")").attr("data-number", block.number);
            colMid.text(block.item);
            row.append(colMid);
            itemsParsed[block.number] = block.item; //set the corresponding item in the array to this block's item
            console.log(itemsParsed[block.number]);
            
            //lastly the right column for the save button
            var colRight = $("<button>").attr("class", "col-1 saveBtn").text("Save");
            row.append(colRight);
        })   
        
        //add new listener to new buttons
        $(".saveBtn").click(function(){ //when the save button is clicked
            var textarea = $(this).parent().find("textarea");
            console.log(itemsParsed[textarea.data("number")]);
            itemsParsed[textarea.data("number")] = textarea.val(); //update the appropriate index in our items array
            console.log(itemsParsed)
            localStorage.setItem("items", JSON.stringify(itemsParsed)); //update it in local storage
        });
    }
    
    updateBlocks(); //load up the blocks for the first time
    
    
})

