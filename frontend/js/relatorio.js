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

const clearInput = () => {
    document.querySelector('#dataInicioIntervaloDatas').value = ''
    document.querySelector('#dataFinalIntervaloDatas').value = ''
}

const clearInputDateSpecific = () => {
    document.querySelector('#dataEspecifica').value = ''

}

const searchDateRange = async () => {

    const startDate = document.querySelector('#dataInicioIntervaloDatas').value.split('-').join('-')
    const endDate = document.querySelector('#dataFinalIntervaloDatas').value.split('-').join('-')

    const url = `http://api.fastparking.com.br/relatorios?dataInicio=${startDate}&dataFinal=${endDate}`

    const requestedClient = await getContact(url)

    const data = requestedClient.filter(requestedClient => requestedClient.status == 1)
    data.forEach(createRegistration)
    console.log(data)
}

const searchDate = async () =>{

    const specificDate = document.querySelector('#dataEspecifica').value.split('-').join('-')
    const url = `http://api.fastparking.com.br/relatorios?dataInicio=${specificDate}`
    const requestedClient = await getContact(url)
    // const date =  document.querySelector('#dataEspecifica').value
    // const requestedClient = await getContact(url)

    console.log(requestedClient)
}

document.querySelector('#pesquisarDataEspecifica').addEventListener('click', searchDate)
document.querySelector('#pesquisar').addEventListener('click', searchDateRange)
document.querySelector('#limpar').addEventListener('click', clearInput)
document.querySelector('#limparDataEspecifica').addEventListener('click', clearInputDateSpecific
)


