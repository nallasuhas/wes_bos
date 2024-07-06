 // grab all the draggables and also the containers you want to insert those draggables in
 const draggables = document.querySelectorAll('.draggable')
 const containers = document.querySelectorAll('.container')

 draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        // to add styling when the draggable is being dragged
       draggable.classList.add('dragging')
    })

    draggable.addEventListener('dragend', () => {
        // to get back to normal styling when the draggable is not being dragged
       draggable.classList.remove('dragging')
    })

 })

 containers.forEach(container => {
    container.addEventListener('dragover', (e) =>{
        e.preventDefault()
        // get the succeeding element 
        const succeedingElement = getSucceedingElement(container, e.clientY)
        // since only one element can be dragged at a time
        const draggable = document.querySelector('.dragging')
        if(succeedingElement == null){
            container.appendChild(draggable)
        }
        else{
            container.insertBefore(draggable, succeedingElement)
            console.log(container);
        }
        
    }
)})

// to get the succeeding element of the mouse pointer inside the container, so we can insert the draggable before this element
function getSucceedingElement(container, y){
    // to get all the draggables inside a container that are not being dragged
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]
    // This will effectively return the childElement that is closest to our mouse pointer(remember the childElement that is being returned is not in dragging state )

    return draggableElements.reduce((closest, childElement) => {

        // to get the coords and properties 
        const box = childElement.getBoundingClientRect()

        // offset b/w our current mouse pointer and center of the draggable item in the y-direction
        const offset = y - (box.top + box.height/2)
       // to get the immediately or first closest childElement
        if(offset < 0 && offset > closest.offset)
        {   
            return {offset: offset, element: childElement}
        }
        else 
        {
            return closest
        }
    }, {offset : Number.NEGATIVE_INFINITY}).element

}