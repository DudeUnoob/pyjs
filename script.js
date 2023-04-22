const createPythonLoad = document.createElement("py-script")
let timeoutId

//document.getElementById("ide").value = "print('hello')"

const ide = document.getElementById("ide")

ide.value = localStorage.getItem("loadPython") != null ? JSON.parse(localStorage.getItem("loadPython")).text : "print('hello')"

createPythonLoad.textContent = localStorage.getItem("loadPython") != null ? JSON.parse(localStorage.getItem("loadPython")).text : "print('hello')"


document.body.appendChild(createPythonLoad)

const runButton = document.getElementById("run_script")

runButton.addEventListener("click", function(event) {
    console.log("clicked run button")

    const pythonScriptContent = document.getElementById("ide")
    createPythonLoad.textContent = pythonScriptContent.value 

    document.body.appendChild(createPythonLoad)
})


document.body.addEventListener("keydown", function(event) {
    if(event.ctrlKey && event.key === "Enter"){
    const pythonScriptContent = ide
    createPythonLoad.textContent = ide.value 

    document.body.appendChild(createPythonLoad)
    }

    
})

let textareas = document.getElementsByTagName("textarea")
let count = textareas.length

for (let i = 0; i < count; i++){
    textareas[i].onkeydown = function(e) {
        if(e.keyCode == 9 || e.which == 9){
            e.preventDefault()
            let s = this.selectionStart;
            this.value = this.value.substring(0,this.selectionStart) + "\t" + this.value.substring(this.selectionEnd);
            this.selectionEnd = s+1; 

        }
    }
}

ide.addEventListener("input", function(event) {
    clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {

        localStorage.setItem("loadPython", JSON.stringify({ text: ide.value }))
    }, 1000)
})
