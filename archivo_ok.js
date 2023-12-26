class RECTANGULO {
    constructor(Id, base, lado, superficie) {
        this.Id = Id
        this.base = base
        this.lado = lado
        this.superficie = superficie
    }

    calcularSuperficieRectangulo(lado, base) { return lado * base }


}

class CIRCULO {
    constructor(Id, radio, superficie) {
        this.Id = Id
        this.radio = radio
        this.superficie = superficie
    }

    calcularSuperficieCirculo(radio) { return Math.PI * radio * radio }

}

//SECCIÓN DE VARIABLES 
let condición = true
let opción;
let opción1;
const figurasGeometricas = []

let formulario = document.getElementById("formulario")
let calcular = document.getElementById("calculo")
let guardar = document.getElementById("save")
let rectangulo = document.getElementById("rectangulo")
let circulo = document.getElementById("circulo")
let lado1 = document.getElementById("lado1")
let lado2 = document.getElementById("lado2")
let radio = document.getElementById("radio")
let tablaresultados = document.getElementById("tablaresultados")
let figurasString = localStorage.getItem("figurasGuardadas")
let contenedor1 = document.getElementById("datos1")




//SECCIÓN RECUPERACIÓN DE DATOS AÑO 2022
let recuperaciónDatos2022 = document.getElementById("b")
recuperaciónDatos2022.addEventListener("click", function () {
    fetch("baseDatos2022.json")
        .then(response => response.json())
        .then(data => {
            const datos2022 = data.datos2022
            console.log(datos2022)
            datos2022.forEach(function (x) {
                x.lado1 !=undefined? (
                    lado1.disabled = false,
                    lado2.disabled = false,
                    lado1.value = (x.lado1),
                    lado2.value = (x.lado2),
                    calcular.click()
                ):
                (
                    radio.disabled = false,
                    radio.value = (x.radio),
                    calcular.click()
                )
            })
        })
        .catch(error => console.error("ha ocurrido un error"))
})






//FUNCIÓN PARA GENERAR ID 
function obtenerNuevoId() {
    let ultimoId = localStorage.getItem("ultimoId") || "-1"
    let nuevoId = JSON.parse(ultimoId) + 1
    localStorage.setItem("ultimoId", JSON.stringify(nuevoId))
    return nuevoId
}

//FUNCIONES INSERTAR FILAS
function insertarDatosRectanguloEnTabla(x) {
    let newRow = tablaresultados.insertRow(-1)
    newRow.setAttribute("filaId", x.Id)

    let newLado1cell = newRow.insertCell(0)
    newLado1cell.textContent = x.lado

    newLado1cell = newRow.insertCell(1)
    newLado1cell.textContent = x.base

    newLado1cell = newRow.insertCell(2)
    newLado1cell.textContent = "Sin Valor"

    newLado1cell = newRow.insertCell(3)
    newLado1cell.textContent = x.superficie

    let newDeleteCell = newRow.insertCell(4)
    let deleteButton = document.createElement("Button")
    deleteButton.textContent = "Eliminar"
    newDeleteCell.appendChild(deleteButton)

    deleteButton.addEventListener("click", function (event) {
        let filaBorrada = event.target.parentNode.parentNode
        let filaBorradaId = parseInt(filaBorrada.getAttribute("filaId"))
        event.target.parentNode.parentNode.remove()
        borrarObjeto(filaBorradaId)
    })
    
}

function insertarDatosCirculoEnTabla(x) {
    let newRow = tablaresultados.insertRow(-1)
    newRow.setAttribute("filaId", x.Id)

    let newLado1cell = newRow.insertCell(0)
    newLado1cell.textContent = "Sin valor"

    newLado1cell = newRow.insertCell(1)
    newLado1cell.textContent = "Sin valor"

    newLado1cell = newRow.insertCell(2)
    newLado1cell.textContent = x.radio

    newLado1cell = newRow.insertCell(3)
    newLado1cell.textContent = x.superficie

    let newDeleteCell = newRow.insertCell(4)
    let deleteButton = document.createElement("Button")
    deleteButton.textContent = "Eliminar"
    newDeleteCell.appendChild(deleteButton)


    deleteButton.addEventListener("click", function (event) {
        let filaBorrada = event.target.parentNode.parentNode
        let filaBorradaId = parseInt(filaBorrada.getAttribute("filaId"))
        event.target.parentNode.parentNode.remove()
        borrarObjeto(filaBorradaId)
    })
}

//FUNCION PARA BORRAR DATOS DEL LOCAL STORAGE
function borrarObjeto(Id) {
    let figurasGeometricas1 = figurasGeometricas.findIndex(x => x.Id === Id)
    figurasGeometricas.splice(figurasGeometricas1, 1)
    let figurasGeometricasJSONParse1 = JSON.parse(localStorage.getItem("figurasGuardadas"))
        if (figurasGeometricasJSONParse1 && figurasGeometricasJSONParse1.findIndex(x => x.Id === Id)!= -1) {
        let figurasIdArray = figurasGeometricasJSONParse1.findIndex(x => x.Id === Id)
        figurasGeometricasJSONParse1.splice(figurasIdArray, 1)
        let figurasGeometricasJSON = JSON.stringify(figurasGeometricasJSONParse1)
        localStorage.setItem("figurasGuardadas", figurasGeometricasJSON)
        Toastify({
            text: "Elimino los datos guardados en el Local Storage",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "center",
            style: { background: "linear-gradient(to right, #00b09b, #96c93d)" },
        }).showToast();
    }
  
}

//SECCION DE RECUPERACIÓN DE DATOS DEL LOCAL STORAGE
if (figurasString != "[]") {
    if (figurasString) {
        calcular.disabled = true
        recuperaciónDatos2022.disabled = true
        guardar.disabled=true
        contenedor1.innerHTML = `<h2>Tiene datos almacenados</h2> 
                                <label> ¿Desea Recuperarlos?</label>        
                                 <button id="recuperar">SI</button>
                                 <button id="noRecuperar">NO</button>`


        let recuperarDatos = document.getElementById("recuperar")
        recuperarDatos.addEventListener("click", function () {
            let figurasGeometricasJSONParse = JSON.parse(figurasString)
            figurasGeometricasJSONParse.forEach(function (x) { (figurasGeometricas).push(x) });
            
            for (let i = 0; i < figurasGeometricas.length; i++) {
                if (figurasGeometricas[i].lado != undefined || figurasGeometricas[i].radio == "") {
                    insertarDatosRectanguloEnTabla(figurasGeometricas[i])
                }
                
                else if (figurasGeometricas[i].radio != undefined || figurasGeometricas[i].lado == "") {
                    insertarDatosCirculoEnTabla(figurasGeometricas[i])
            
                }
                contenedor1.style.visibility = "hidden"
                calcular.disabled = false
                guardar.disabled = false
                recuperaciónDatos2022.disabled = false
            }
        })
        let noRecuperarDatos = document.getElementById("noRecuperar")
        noRecuperarDatos.addEventListener("click", function () {
            let vacio = []
            let vacioJSON = JSON.stringify(vacio)
            localStorage.setItem("figurasGuardadas", vacioJSON)
            contenedor1.style.visibility = "hidden"
        })

    }
    else { contenedor1.style.visibility = "hidden" }
}

//SECIÓN DE ASOCIACIÓN DE RADIO BOTONES Y LOS INPUT TYPE NUMBER
rectangulo.addEventListener("click", function () {

    lado1.disabled = false
    lado2.disabled = false
    radio.disabled = true
}
)


circulo.addEventListener("click", function () {

    radio.disabled = false
    lado1.disabled = true
    lado2.disabled = true
    

}
)

//SECCIÓN DE CALCULOS MEDIANTE DATOS INGESADOS EN EL FORMULARIO
formulario.addEventListener("submit", function (e) {
    e.preventDefault()
  
    if (lado1.value != "" && lado2.value != "") {
        const rectangulo1 = new RECTANGULO()
        let superficieR = Math.round(rectangulo1.calcularSuperficieRectangulo(lado1.value, lado2.value))
        rectangulo1.lado = lado1.value
        rectangulo1.base = lado2.value
        rectangulo1.superficie = superficieR
        rectangulo1.Id = obtenerNuevoId()
        figurasGeometricas.push(rectangulo1)
        insertarDatosRectanguloEnTabla(rectangulo1)

        

        formulario.reset()
        radio.disabled = true
        lado1.disabled = false
        lado2.disabled=false


    }
    else if (radio.value != "") {
        const circulo1 = new CIRCULO()
        let superficieC = Math.round(circulo1.calcularSuperficieCirculo(radio.value))
        circulo1.radio = radio.value
        circulo1.superficie = superficieC
        circulo1.Id = obtenerNuevoId()
        figurasGeometricas.push(circulo1)
        insertarDatosCirculoEnTabla(circulo1)
        
        formulario.reset()
        radio.disabled = true
        lado1.disabled = false
        lado2.disabled = false
    }

    else {
            Toastify({
            text: "Introduzca los datos faltantes.",
            duration: 4000,
            close: true,
            gravity: "top",
            position: "center",
            style: { background: "red" },
        }).showToast();
    }
})


//SECCIÓN PARA GUARDAR DATOS EN EL LOCAL STORAGE

guardar.addEventListener("click", function () {
    let figurasGeometricasJSON = JSON.stringify(figurasGeometricas)
    figurasGeometricasJSON !="[]"?(
        localStorage.setItem("figurasGuardadas", figurasGeometricasJSON),
        Toastify({
            text: "Datos guardados en el Local Storage",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "center",
            style: { background: "linear-gradient(to right, #00b09b, #96c93d)" },
        }).showToast()
    ):
     (
       Toastify({
            text: "No hay datos para guardar",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "center",
            style: { background: "marron" },
        }).showToast())
    
})



