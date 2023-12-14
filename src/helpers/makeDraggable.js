/*
function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
*/

 export default function makeDraggable (elmnt) {
    // Make an element draggable (or if it has a .window-top class, drag based on the .window-top element)
    let currentPosX = 0, currentPosY = 0, previousPosX = 0, previousPosY = 0;

		// If there is a window-top classed element, attach to that element instead of full window
    if (elmnt.querySelector('.window-bar-top')) {
        // If present, the window-top element is where you move the parent element from
        elmnt.querySelector('.window-bar-top').onmousedown = dragMouseDown;
        elmnt.querySelector('.window-bar-top').ontouchmove = dragMouseDown;
    } 
    else {
        // Otherwise, move the element itself

        elmnt.onmousedown = dragMouseDown;
        elmnt.ontouchmove = dragMouseDown;
    }

    function dragMouseDown (e) {
        // Prevent any default action on this element (you can remove if you need this element to perform its default action)
       //x   e.preventDefault();
        // Get the mouse cursor position and set the initial previous positions to begin
        previousPosX = e.clientX;
        previousPosY = e.clientY;
        // When the mouse is let go, call the closing event
        document.onmouseup = closeDragElement;
        document.ontouchend  = closeDragElement;

        // call a function whenever the cursor moves
        document.onmousemove = elementDrag;
       document.ontouchmove = elementDrag;
    }

    function elementDrag (e) {
        // Prevent any default action on this element (you can remove if you need this element to perform its default action)
        e.preventDefault();
        // Calculate the new cursor position by using the previous x and y positions of the mouse
        currentPosX = previousPosX - e.clientX;
        currentPosY = previousPosY - e.clientY;
        // Replace the previous positions with the new x and y positions of the mouse
        previousPosX = e.clientX;
        previousPosY = e.clientY;
        // Set the element's new position
        if( (elmnt.offsetTop - currentPosY)  < 0  ){
          elmnt.style="";
          elmnt.classList.add("max-size-window");
        }
        else{
          elmnt.style.top = (elmnt.offsetTop - currentPosY) + 'px';
          elmnt.style.left = (elmnt.offsetLeft - currentPosX) + 'px';
        }
        
    }

    function closeDragElement () {
        // Stop moving when mouse button is released and release events
        document.onmouseup = null;
        document.onmousemove = null;
        document.ontouchend=null;
        document.ontouchmove = null;
    }
}

