# yardi-takehome
Author: Sonam Zahrt-Tenzin

This is my Yardi Interview take-home project

I built the interface with Bootstrap 5 markup and added a few interactive elements with vanilla JS

Throughout the files:

    index.html, styles.css, and index.js

    I have included code comments to hopefully make the sections and intentions a little more clear.
    I also included mental asides on parts I found confusing or struggled with or where Im uncertain of best practices

    Notes: 
       ~~ Since this was a Bootstrap 5 project, whenever I could I tried to use BS utility classes -- to avoid splitting the styling between both explicit CSS and inconsistently chosen BS class attributes however I'm sure it could be better
        -  There were times when I wanted to style many children elements and so I used CSS
        -  I also defined my own CSS more-so when I was creating addable classes for dynamically created elements with JS
       ~~ I could not find the exact font-icons/svgs so I took the liberty of using substitutes
        - I tried for the longest time to get raw and linked svgs to work but after many fruitless attempts and flashbacks to a particularly scarring college project, I decided to choose the higher path and use a font-icon

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

My main problem areas were: 
    1. Injecting custom HTML to the popover element 
        - through much experimentation, examples and docs reading I figured out a solution
        - Selecting the popover body with JS -- and using the popver event "insterted.bs.popver" allowed me to inject my custom markup after the first time "show" the popovers classList
    2.a Setting up and positioning the custom progress bars
    2.b Implementing the JS to make the progress bars functional and mutable 
        - Struggled to fully understand the resizeObserver 
        - Solution was to pass in preferred "observables" when initializing to be processed as an array within the resizeObserver itself
        - Alternative solutions to this include:
            i. implementing MVC pattern -- ProgressBarView class will implement or inherit functions that do calculations on the widths of the progress-bar every time the progress-bar is updated -- so that the correct icon can be displayed
            ii. Create a custom Class that contains and instance of a resizeObserver and the instantiate as many instances of your custom class as you need to observe unique things... 
            (Im not sure if this works or is just adding an unecessary layer of abstraction)
    3. Formatting the list-group links for the 'Month Ranking' section 
        - Used flex-box with bootstraps built in spacing classes (padding and margin) 
        - Had to figure out that the new way to write margin-left/right was ms (start) & me (end) 
    4. Formatting/creating the table template 
        - I was running into uncertainties about whether or not I could use rows and cols within pre-def Bootstrap components 
        - Turns out the solution was to use flex-box!

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

:: STILL TODO ::

1. Clean up comments - index.html, css/styles.css, js/index.js
2. Organize functions, eventListeners, variables in js/index.js + abstract a few twice used collections of expressions
3. Remove excess divs? unnecesarry/unfunctional styling
4. Edit the spacing and font sizing on the custom progress-bars -- now that the animations are visible it is clear there are some inconsistencies in size and margin/padding causing an unattractive shift in the bprogress-bar element... 
    Id like to resolve that ;o

:: :::::::::: ::

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

*** KINDA COOL ***
\*\*\* I implemented a ResizeObserver to modify the custom progress-bar and change the icons present when a specific badge level is  reached 
    -- you can demo it by clicking on the settings button -- which will increment/decriment the widths of the progressbars (I only attached this function to 'settings button' for testing and demo purposes!



Thank you for a wonderful interview last week. I hope my code will be helpful in your evaluation.

Sincerely,

Sonam Zahrt-Tenzin

P.S.
For a live demo of this 'app' interface visit : www.sonamzah.com/yardi/take-home
