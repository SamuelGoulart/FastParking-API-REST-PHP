'use strict';

const getContact = async (url) => {
    const response = await fetch(url)
    const json = await response.json()
    return json
}

const createRegistration = (clientDeleted) => {

    const clienteExcluidos = document.createElement('tr')

    clienteExcluidos.innerHTML = `  
        <td>${clientDeleted.nome}</td>
        <td>${clientDeleted.placa}</td>
        <td>${clientDeleted.dataEntrada.split('-').reverse().join('.')}</td>
        <td>${clientDeleted.dataSaida}</td>
        <td>${clientDeleted.horaEntrada}</td>
        <td>${clientDeleted.horaSaida}</td>
        <td>${clientDeleted.motivoExclusao}</td>
    `

    document.getElementById('tbodyRelatorio').appendChild(clienteExcluidos)
}

const updateTable = async () => {
    const url = "http://api.fastparking.com.br/clientes"
    const filterClientDeleted = await getContact(url)
    console.log(filterClientDeleted)
    const requestedDate = filterClientDeleted.filter(filterClientDeleted => filterClientDeleted.status == 10);
    requestedDate.forEach(createRegistration)
}

updateTable()
