Deployed at: https://gsonnier333.github.io/day-scheduler/

Pictured here: Example of what the page might look like after 5pm with a handful of items added
!["Page example after 5pm"](./Assets/page-example.PNG)

For this assignment, I was tasked with creating a functioning day-planner that can be used in a web browser. The planner will list out anything you've written and saved to it for each hour from 9AM to 5PM, and you can change and add items by typing in new text in their respective rows and clicking the Save button next to the changed item. If an item has been saved, it will still be there when the page is refreshed. Additionally, the rows change colors based on whether the respective time was at least an hour ago (grey), within an hour ago (yellow-green), or coming up later in the day (green). The page also displays the current date at the top of the screen. At present, the colors of the rows will only update when the page is loaded, so the user has to refresh the page periodically if they want the colors to accurately reflect the current time of day.

In completing this assignment, I got some practice using third-party libraries like Moment.js and JQuery. Reading through the documentation for Moment.js to learn how to use it was a good experience to have under my belt going forward. In addition to that, I got more practice using localStorage on a web browser to keep track of specific data even after a page is refreshed. I had some minor difficulties with using JSON to stringify and parse the data correctly, as well as using that data on the page, but I managed to get it working in the end and now have a better understanding of it.
