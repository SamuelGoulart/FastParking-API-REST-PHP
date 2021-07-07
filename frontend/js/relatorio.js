'use strict';

const getContact = async (url) => {
    const response = await fetch(url)
    const json = await response.json()
    return json
}

const createRegistration = (requestedDate) => {

    const cadastro = document.createElement('tr')

    cadastro.innerHTML = `  
        <td>${requestedDate.nome}</td>
        <td>${requestedDate.placa}</td>
        <td>${requestedDate.dataEntrada.split('-').reverse().join('.')}</td>
        <td>${requestedDate.dataSaida.split('-').reverse().join('.')}</td>
        <td>${requestedDate.horaEntrada}</td>
        <td>${requestedDate.horaSaida}</td>
        <td>${requestedDate.valorPago.replace('.', ',')}</td>
    `

    document.getElementById('tbodyRelatorio').appendChild(cadastro)
}

const updateTable = async () => {
    const url = "http://local.fastparking.com.br/relatorios"
    const filterData = await getContact(url)
    const requestedDate = filterData.filter(filterData => filterData.status == 1);
    requestedDate.forEach(createRegistration)
}

updateTable()
