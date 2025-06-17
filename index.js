 const guestList =document.querySelector('form');
 const listInput = document.getElementById('name');
 const listUl = document.getElementById('list')

 let allGuests = [];

guestList.addEventListener('submit', function(e){
    e.preventDefault();
    addGuest();
})

function addGuest(){
    const listText = listInput.value.trim();
    if(listText.length > 0){
         allGuests.push(listText);
         updateGuestList();
         listInput.value = ""
    }

}
function updateGuestList(){
    listUl.innerHTML = "";
    allGuests.forEach((lists, listsIndex)=>{
        listGuest = createGuestList(lists, listsIndex );
        listUl.append(listGuest)

    })
}
function createGuestList(lists, listsIndex){
    const listLI = document.createElement("li");
    listLI.className = "lists";
    listLI.innerHTML = `
    
    `
    return listLI;
}