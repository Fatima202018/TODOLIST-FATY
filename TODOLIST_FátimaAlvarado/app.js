//variables
const frmTraea = document.querySelector('#frmTarea');
const tareasContainer = document.querySelector('#tareasContainer')
//Variables para mensajes de errores
const err_tarea = document.querySelector('#err_tarea');
const err_prioridad = document.querySelector('#err_prioridad')

let arrayTareas = [
];
//Listeners
Listeners();
function Listeners(){
   frmTraea.addEventListener('submit',capturarDatos)
   document.addEventListener('DOMContentLoaded', ()=>{
    const arrayls = JSON.parse(localStorage.getItem('Tareas'))
    arrayTareas=[...arrayls]
    generarHtml(arrayTareas)
   })
}
//funciones
function capturarDatos(e){
    
    e.preventDefault();
    limpiarHtml()
    const nombreTarea = frmTraea.tarea.value;
    const prioidad = frmTraea.prioTarea.value;

    if(nombreTarea == "" && prioidad == 0){
        err_tarea.textContent = "El campo no puede estar vacio"
        err_tarea.style ="color:red"
        err_prioridad.textContent = "Seleccione una prioridad"
        err_prioridad.style = "color: red"
        generarHtml(arrayTareas)
        return 0;
    }
    //Validacion de input priorida
    if(prioidad == 0){
        err_prioridad.textContent = "Seleccione una prioridad"
        err_prioridad.style = "color: red"
        generarHtml(arrayTareas)
        return 0;
    }
    //Validacion de input tarea
    if(nombreTarea == ""){
        err_tarea.textContent = "El campo no puede estar vacio"
        err_tarea.style ="color: red"
        generarHtml(arrayTareas)
        return 0;
    }
    
    const ClaseTarea = new Tarea(Date.now(), nombreTarea, prioidad);

    objTarea = {
        id: ClaseTarea.id,
        nombreTarea: ClaseTarea.nombreTarea,
        prioidad: ClaseTarea.prioridad
    }
    arrayTareas = [...arrayTareas, objTarea]

    //Ordenacion segun proridades de mayor a menor
    arrayTareas.sort((x, y) => x.prioidad - y.prioidad);

    localStorage.setItem('Tareas', JSON.stringify(arrayTareas))

    err_tarea.textContent = ""
    err_prioridad.textContent = ""
    generarHtml(arrayTareas)

    frmTraea.tarea.value = ''
    frmTraea.prioTarea.value = '0'

}
function generarHtml(Tareas) {
    return Tareas.forEach(tareas=>{
        const card = document.createElement('div');
        const carbody = document.createElement('div');
        const parrafo = document.createElement('p');
        const button = document.createElement('button')
        //Colores para prioridades
        let colores = {
            uno: "background: #00FF66",
            dos: "background: #FFFF66",
            tres: "background: #FF6666"
        }
        //Validación de prioridades y agregado de colores
        if(tareas.prioidad == 1){
            card.style = colores.uno
        }else if(tareas.prioidad == 2){
            card.style = colores.dos
        }else{
            card.style = colores.tres
        }
        //Propiedades del boton
        button.innerHTML = '<img src="https://img.icons8.com/ios-glyphs/30/000000/delete-forever.png"/>';

        button.id = tareas.id
        button.style = 'border: 0; background: none; outline: none'
        button.classList.add('delete')

        parrafo.textContent = tareas.nombreTarea
        
        carbody.classList.add('card-body','d-flex','justify-content-between')
        carbody.appendChild(parrafo)

        carbody.appendChild(button)
        
        card.classList.add('card', 'mt-2')
        card.appendChild(carbody);

        tareasContainer.appendChild(card)

        //Button Delete
        deleteTarea(button,Tareas,tareas)

    })
}

function limpiarHtml() {
    while (tareasContainer.firstChild) {
        tareasContainer.removeChild(tareasContainer.firstChild)
    }
}

function deleteTarea(button,Tareas,tareas){
    button.onclick = function (e){

        const newArray = Tareas.filter(tarea =>{
            if(tarea.id != tareas.id){
                return tarea
            }
        })

        localStorage.setItem('Tareas', JSON.stringify(newArray))

        setTimeout(()=>{
            tareasContainer.innerHTML= ""
            let arrayls = JSON.parse(localStorage.getItem('Tareas'))
            arrayTareas=[...arrayls]
            generarHtml(arrayTareas)  
            
            
        },100)
    }
}