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

const clearTable = () => {
    const clientTable = document.querySelector('#tbodyRelatorio')
    while (clientTable.firstChild) {
        clientTable.removeChild(clientTable.lastChild)
    }
}

const clearInput = () => {
    document.querySelector('#dataInicioIntervaloDatas').value = ''
    document.querySelector('#dataFinalIntervaloDatas').value = ''
}

const clearInputDateSpecific = () => {
    document.querySelector('#dataEspecifica').value = ''

}

const calculateAmountReceived = (data) =>{
    let resultado = 0;
    for (let index = 0; index < data.length; index++) {
        const soma = parseFloat(data[index].valorPago)
        resultado += soma
    }

    document.querySelector('#valorTotalRecebido').textContent = `R$ ${resultado.toString().replace('.', ',')}`

}


const isValidForm = () => document.querySelector('#formIntervaloDeDatas').reportValidity()

const searchDateRange = async () => {

    if (isValidForm()) {
        clearTable()

        const startDate = document.querySelector('#dataInicioIntervaloDatas').value.split('-').join('-')
        const endDate = document.querySelector('#dataFinalIntervaloDatas').value.split('-').join('-')

        const url = `https://fastparking-samuel-api.herokuapp.com/relatorios?dataInicio=${startDate}&dataFinal=${endDate}`

        const requestedClient = await getContact(url)

        const data = requestedClient.filter(requestedClient => requestedClient.status == 1)
        calculateAmountReceived(data)
        data.forEach(createRegistration)

        if (data.length == 0) {
            alert(`Nenhum cliente encontrado entre as datas de ${startDate.split('-').reverse().join('.')} e ${endDate.split('-').reverse().join('.')}`);
        }
    }
}

const isValidFormDatEspecific = () => document.querySelector('#formDataEspecifica').reportValidity()

const searchDate = async () => {

    if (isValidFormDatEspecific()) {
        clearTable()
        const specificDate = document.querySelector('#dataEspecifica').value.split('-').join('-')
        const url = `https://fastparking-samuel-api.herokuapp.com/relatorios?dataInicio=${specificDate}`
        const requestedClient = await getContact(url)
        const data = requestedClient.filter(requestedClient => requestedClient.status == 1)
        calculateAmountReceived(data)
        data.forEach(createRegistration)
        if (data.length == 0) {
            alert(`Nenhum cliente encontrado na data ${specificDate.split('-').reverse().join('.')}`);
        }
    }
}

document.querySelector('#pesquisarDataEspecifica').addEventListener('click', searchDate)
document.querySelector('#pesquisar').addEventListener('click', searchDateRange)
document.querySelector('#limpar').addEventListener('click', clearInput)
document.querySelector('#limparDataEspecifica').addEventListener('click', clearInputDateSpecific)


