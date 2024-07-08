
//get template element
const template = document.querySelector('.template')

const keys = document.querySelector('.keys')
 
//store all the configuration related to virtual keyboard
const keyboard = {
       value: '',
       capslock: false,
       //change the case of the keys according to capslock value
       capslockToggle: () => {
        const capsKeys = keys.querySelectorAll('.key')
        capsKeys.forEach(key =>{
            if(key.childElementCount === 0){
                key.innerHTML =  keyboard.capslock ? key.innerHTML.toUpperCase() : key.innerHTML.toLowerCase();
            }
        })
        },
        //to open the virtual keyboard and 
        open: ( oninput, onclose) =>{
             document.querySelector('.keyboard').classList.remove('keyboard--hidden')
             keyboard.eventhandler.oninput = oninput;
             keyboard.eventhandler.onclose = onclose;
        },
        //to close the virtual keyboard and reset the value
        close: () => {
            keyboard.value = '';
            keyboard.eventhandler.oninput = oninput;
            keyboard.eventhandler.onclose = onclose;
            document.querySelector('.keyboard').classList.add('keyboard--hidden')
        },
        eventhandler: {
            oninput: null,
            onclose: null,
        },
        triggerEvent: (handlerName) =>{
            if(typeof keyboard.eventhandler[handlerName] === 'function'){
              keyboard.eventhandler[handlerName](keyboard.value)
            }
        }
}


function createKeys(){
   //typical qwerty layout
    const keyLayout = [
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
        "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
        "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
        "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
        "space"
    ]
    
    
     
    keyLayout.forEach((key) => {
        //clone the template children
        const btn = template.content.cloneNode(true).children[0];
        const icon = btn.querySelector('.material-icons');
        //to insert a line break after these keys
        const insertLineBreak = ['backspace', 'p', 'enter', '?'].indexOf(key) !== -1;
        
        switch(key){
            case 'backspace': 
                 //click on backspace updates the value and also it should change the value in input fields through triggerEvent
                 btn.classList.add('key--wide') ;
                 icon.innerText = 'backspace';
                 keys.appendChild(btn);
                 btn.addEventListener('click', () =>{
                    const preValue = keyboard.value
                    keyboard.value = preValue.substring(0,preValue.length - 1)
                    console.log(keyboard.value);
                    keyboard.triggerEvent('oninput')
                 })

                 break;

            case 'caps': 
           
            btn.classList.add('key--wide', 'key--activatable') ;
            icon.innerText = 'keyboard_capslock';
            keys.appendChild(btn);
            btn.addEventListener('click', () => {
                keyboard.capslock = !keyboard.capslock
                btn.classList.toggle('key--activated')
                keyboard.capslockToggle()
            })

            break;

            case 'enter': 
            //click on enter, updates the value and also it should change the value in input fields through triggerEvent
            btn.classList.add('key--wide') ;
            icon.innerText = 'keyboard_return';
            keys.appendChild(btn);
            btn.addEventListener('click', () => {
                keyboard.value += '\n';
                keyboard.triggerEvent('oninput')
               
            })

            break;

            case 'space': 
            //click on space updates the value and also it should change the value in input fields through triggerEvent
            btn.classList.add('key--xwide') ;
            icon.innerText = 'space_bar';
            keys.appendChild(btn);
            btn.addEventListener('click', () => {
                 keyboard.value += ' ';
                 keyboard.triggerEvent('oninput')
                
            })

            break;

            case 'done': 
            // click on done should close the virtual keyboard
            btn.classList.add('key--wide', 'key--dark') ;
            icon.innerText = 'check_circle';
            keys.appendChild(btn);
            btn.addEventListener('click', () => {
                 keyboard.close();
                 keyboard.triggerEvent('onclose')
                
            })

            break;
           
            default:
            //click on these keys updates the value and also it should change the value in input fields through triggerEvent
            btn.innerHTML = key.toLowerCase();
            keys.appendChild(btn);
            btn.addEventListener('click', () => {
                keyboard.value += keyboard.capslock ? key.toUpperCase() : key.toLowerCase();
                keyboard.triggerEvent('oninput')
                
            })

            break;

        }
     if(insertLineBreak){
        keys.appendChild(document.createElement('br'))
     }
        
    })

}


document.addEventListener('DOMContentLoaded' ,() => {
     
    // create the keys and append it to its parent div
    createKeys();
    //select every input field that can use virtual keyboard and add event listener for focus event, the callback for it should open the virtual keyboard and also pass the input value as closure, so that triggerEvent is able to modify the value of input field for every keystroke on virtual keyboard
    document.querySelectorAll('.use-keyboard-input').forEach((element) => {      element.addEventListener('focus', (e) =>{ 
          keyboard.open(currentValue => {
           element.value = currentValue;
           console.log(element.value);
       });
      }) 
    //   element.addEventListener('input', (e) => {
    //     element.value = e.target.value;
    //     console.log(element.value);
    //    })
    })
    
})