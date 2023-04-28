const deleteBtn = document.querySelectorAll('.fa-trash');
const completeTask = document.querySelectorAll('.item span');
const completeItem = document.querySelectorAll('.item span.completed')


Array.from(deleteBtn).forEach(element => {element.addEventListener('click', deleteItem)});
async function deleteItem(){
    const itemText = this.parentNode.childNodes[1].innerText;
    try{
        const response = await fetch('/deleteItem', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'itemFromJS': itemText})
        })
        const data = await response.json();
        console.log(data);
        location.reload()
    }catch{err => console.log(err)}
}
Array.from(completeTask).forEach(element => {element.addEventListener('click', markComplete)});
async function markComplete(){
    const itemText = this.parentNode.childNodes[1].innerText;
    try{
        const response = await fetch('/completeItem',{
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            itemFromJS: itemText
          }),
        })
        const data = await response.json();
        console.log(data);
        location.reload()
    }catch{err => console.log(err)}
}

Array.from(completeItem).forEach(element => {element.addEventListener('click', markUncomplete)});
async function markUncomplete(){
    const itemText = this.parentNode.childNodes[1].innerText;
    try{
        const response = await fetch('/unmark',{
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            itemFromJS: itemText
          }),
        })
        const data = await response.json();
        console.log(data);
        location.reload()
    }catch{err => console.log(err)}
}