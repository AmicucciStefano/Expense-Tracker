/* meto en las variables todos los elementos que necesito */
const inpType = document.getElementById("inp-type");
const inpName = document.getElementById("inp-text");
const inpDate = document.getElementById("inp-date");
const inpNumber = document.getElementById("inp-number");
/* declaro el contenedor donde se van a imprimir */
const blackBox = document.querySelector(".black-box");
/* guardo en la variable todas los objetos del localStorage */
const objetosLocalStorage = JSON.parse(localStorage.getItem("objetos"));
/* aca puedeen pasar 2 cosas, la primera es que haya objetos en el local storage y los tenga que imprimir o que no haya entonces la constante tiene que ser un array vacio ya que no tiene objetos */
const objetos = JSON.parse(localStorage.getItem("objetos")) || [];

/* declaro el form en vez del button, y le agrego un addeventlistener al evento de enviar y con la funcion addObjeto que agrega un objeto */
const form = document.querySelector(".form").addEventListener("submit", addObjeto);

/* desarrolo la funcion para añadir el objeto, le paso el parametro de "e" del eventlistener ya que va a ser usada en un "boton" */
function addObjeto(e) {
    /* esta linea previene que cuando envie el resultado la pagina se re cargue */
    e.preventDefault();

    /* un simple si para que el nombre del objeto este con algo y el valor tambien */
    if(inpName.value === "" || inpNumber.value === "") {
        alert("fill all the inputs");
    } else {  
        /* aca declaro que va a tener el objeto que son los inputs que voy a usar */   
        const objeto = {
            /* este id funciona mientras objetos.length sea mayor que 0, eso quiere decir que el array declarado en la linea 11 debe tener 1 o mas objetos, se ejecuta objetos[objetos.length - 1] que agarra el ultimo objeto de la lista, por eso el -1, buscamos el id de ese ultimo objeto y le damos el valor de id + 1, sino hay objetos el valor sera de 1 */
            id: objetos.length > 0 ? objetos[objetos.length - 1].id + 1: 1,
            type : inpType.value,
            name : inpName.value,
            date : inpDate.value,
            number : inpNumber.value
        }
        /* aqui metemos el valor del objeto, dentro del array de objetos */
        objetos.push(objeto);
        /* y lo seteamos dentro del localstorage "objetos" */
        localStorage.setItem('objetos', JSON.stringify(objetos));
    }
    /* reseteamos el form a todo vacio para que no queden las cosas ya marcadas */
    document.querySelector(".form").reset();
    /* y llamamos a la funcion para que muestre el objeto */
    showObjetos()
}

/* desarrollamos la funcion para mostrar el objeto */
function showObjetos() {
    /* imprimo el primer apartado donde da la descripcion */
    blackBox.innerHTML = `
    <div class="list-items">
        <span class="items">Type</span>
        <span class="items">Name</span>
        <span class="items">Date</span>
        <span class="items">Amount</span>
        <span class="items ultimo"></span>
    </div>
    `;
    /*hacemos un for loop del array de objetos e imprimimos todos los valores */
    for(let i = 0; i < objetos.length; i++) {
        blackBox.innerHTML += `
        <div class="list-items">
            <span class="expense">${objetos[i].type}</span>
            <span class="expense">${objetos[i].name}</span>
            <span class="expense">${objetos[i].date}</span>
            <span class="expense">$${objetos[i].number}</span>
            <span class="expense ultimo">
                <i class="delete fa-solid fa-trash" onclick="deleteObjeto(${objetos[i].id})"></i>
            </span>
        </div>
        `;
        /* el boton delete, tiene el eventlistener onclick con la funcion de deleteObjeto y como parametro se le pasa el id del objeto que se busca borrar */
    }
}

/* desarrollamos la funcion para borrar con el parametro del id */
function deleteObjeto(id) {
    /* se hace un for loop del array de los objetos, y si el id que se le paso al hacerle click, es igual al id de objetos[i], se usa el metodo splice para borrarlo */
    for(let i = 0; i < objetos.length; i++) {
        if(objetos[i].id == id) {
            objetos.splice(i, 1)
        }
    }
    /* se setea en el localstorage para eleminar el objeto que se borro en el html*/
    localStorage.setItem("objetos", JSON.stringify(objetos));
    showObjetos()
}

showObjetos()