
document.getElementById('formulario').addEventListener('submit', cadastrarVehiculo);

function cadastrarVehiculo(e){
	
	var modeloVehiculo = document.getElementById('modeloVehiculo').value;
	var placaVehiculo = document.getElementById('placaVehiculo').value;
	var horaEntrada = new Date();

	if(!modeloVehiculo && !placaVehiculo){
		
		alert("Presenta todos los campos!");
		return false;
	} 

	var vehiculo = {
		modelo: modeloVehiculo,
		placa: placaVehiculo,
		hora: horaEntrada.getHours(),
		minutos: horaEntrada.getMinutes()
	};

	if(localStorage.getItem('patio') === null){
		var vehiculos = [];
		vehiculos.push(vehiculo);
		localStorage.setItem('patio', JSON.stringify(vehiculos));
	} else {
		var vehiculos = JSON.parse(localStorage.getItem('patio'));
		vehiculos.push(vehiculo);
		localStorage.setItem('patio', JSON.stringify(vehiculos));
	}

	document.getElementById('formulario').reset();

	mostraPatio();

	e.preventDefault();
}

function removeVehiculo(placa){
	var patio = JSON.parse(localStorage.getItem('patio'));
	console.log(patio);

	 for(var i = 0 ; i < patio.length; i++){
		if(patio[i].placa == placa){
			patio.splice(i, 1);
		}
	}

	localStorage.setItem('patio', JSON.stringify(patio));

	mostraPatio();
}

function mostraPatio(){
	var vehiculos = JSON.parse(localStorage.getItem('patio'));
	var patioResultado = document.getElementById('resultados');

	patioResultado.innerHTML = '';

	for(var i = 0; i < vehiculos.length; i++){
		var modelo = vehiculos[i].modelo;
		var placa = vehiculos[i].placa;
		var hora = vehiculos[i].hora;
		var minutos = vehiculos[i].minutos;
		 patioResultado.innerHTML += '<tr><td>'+ modelo + '</td>'+
		 							 	  '<td>'+ placa + '</td>' +
		 							 	  '<td>'+ hora + ':' + minutos + '</td>' +
		 							 	  '<td><button onclick="removeVehiculo(\''+ placa +'\')" class="btn btn-danger">Remover</button></td>'+
		 							 '</tr>';
	}
}


