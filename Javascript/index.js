//*HTML

var nameInput = document.getElementById("name")
var urlInput = document.getElementById("url")
var linkcontainer = document.getElementById("linkcontainer")


//*App Variables
var linklist= JSON.parse(localStorage.getItem("links")) || []
displayalllinks()

var nameRegex = /^[A-Z][a-z]{3,}$/;
var urlRegex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+(:\d+)?(\/[^\s?#]*)?(\?[^\s#]*)?(#[^\s]*)?$/;



//*functions
function addlink(){
  if((validatename()) && (validateurl()))
    {
    var link={
      name: nameInput.value,
      url:urlInput.value,
    };
    linklist.push(link);
    localStorage.setItem("links",JSON.stringify(linklist));
    displaylink(linklist.length-1);
    clearinputs();
  } else{
    alert("WRONG INPUT");
  }
  
}


function displaylink(index){
  var linkHTML = `
   <div class="submit bg-white d-flex justify-content-between align-items-center py-2 mt-2 text-center">
          <div class="w-25 d-flex justify-content-center"><h5>${index + 1}</h5></div>
          <div class="w-25 d-flex justify-content-center"><h5>${linklist[index].name}</h5></div>
          <div class="w-25 d-flex justify-content-center"><a href="${linklist[index].url}" class="linkbutton w-75 btn btn-success d-flex align-items-center justify-content-center gap-1" type="button" ><i class="fa-solid fa-eye"></i><span>Visit</span></a></div>
          <div class="w-25 d-flex justify-content-center"><button class="deletebutton w-75 btn btn-danger d-flex align-items-center justify-content-center gap-1" type="button" onclick='deletelink(${index})'><i class="fa-solid fa-trash-can"></i><span>Delete</span></button></div>
         </div>

  `;
  linkcontainer.innerHTML += linkHTML;
}

function displayalllinks(){
  for(i=0;i<linklist.length;i++){
    displaylink(i)
  }
}

function clearinputs(){
  nameInput.value="";
  urlInput.value="";

}

function deletelink(index){
    linklist.splice(index,1);
    localStorage.setItem("links",JSON.stringify(linklist));
    linkcontainer.innerHTML="";
    displayalllinks()
}

function validatename(){
  
  if(nameRegex.test(nameInput.value)){
    nameInput.classList.add("is-valid")
    nameInput.classList.remove("is-invalid")
    nameInput.nextElementSibling.classList.add("d-none")
    return true;
  }else{
    nameInput.classList.add("is-invalid")
    nameInput.classList.add("is-valid")
    nameInput.nextElementSibling.classList.remove("d-none");
    return false;
  }
}


function validateurl(){
  
  if(urlRegex.test(urlInput.value)){
    urlInput.classList.add("is-valid")
    urlInput.classList.remove("is-invalid")
    urlInput.nextElementSibling.classList.add("d-none")
    return true;
  }else{
    urlInput.classList.add("is-invalid")
    urlInput.classList.add("is-valid")
    urlInput.nextElementSibling.classList.remove("d-none");
    return false;
  }
}




