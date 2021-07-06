'use strict';

const openModalPrice = () => document.querySelector('#modalPreco')
    .classList.add('active')

const openModalEditPrice = () => document.querySelector('#modalEditar')
    .classList.add('active')

const openModalProof = () => document.querySelector('#modalComprovante')
    .classList.add('active')

const executeAnimate = () => document.querySelector('#relatorioPagamento')
    .classList.add('animate')

const executeAnimateTableClient = () => document.querySelector('#tabelaClientesQueNaoPagaram')
    .classList.add('animate')

const removeAnimate = () => document.querySelector('#relatorioPagamento')
    .classList.remove('animate')

const removeAnimateTableClient = () => document.querySelector('#tabelaClientesQueNaoPagaram')
    .classList.remove('animate')

const openPaymentReportTab = () => {
    document.querySelector('#relatorioPagamento')
        .classList.remove('displayNome')
    document.querySelector('#abaRelatorioPagamento')
        .classList.add('ativoAba')
    document.querySelector('#abaTabelaClientes')
        .classList.remove('ativoAba')
    setTimeout(executeAnimate, 500)
    removeAnimateTableClient()
}

const openCustomersTable = () => {
    document.querySelector('#tabelaClientesQueNaoPagaram')
        .classList.remove('displayNome')
    document.querySelector('#abaTabelaClientes')
        .classList.add('ativoAba')
    document.querySelector('#abaRelatorioPagamento')
        .classList.remove('ativoAba')
    setTimeout(executeAnimateTableClient, 500)
}

const closeModalVoucherEntry = () => document.querySelector('#modalComprovanteEntrada')
    .classList.remove('active')

const closeModalPrice = () => document.querySelector('#modalPreco')
    .classList.remove('active')

const closeModalEditData = () => document.querySelector('#modalEditar')
    .classList.remove('active')

const closeModalProof = () => document.querySelector('#modalComprovante')
    .classList.remove('active')

const closeComprovante = () => document.querySelector('#modalComprovante')
    .classList.remove('active')

const closeChoiceVoucher = () => document.querySelector('#modalEscolhaDeComprovante')
    .classList.remove('active')

const closeTabCustomersTable = () => document.querySelector('#tabelaClientesQueNaoPagaram')
    .classList.add('displayNome')

const closePayersReport = () => {
    document.querySelector('#relatorioPagamento')
        .classList.add('displayNome')
    removeAnimate()
}

const getContact = async (url) => {
    const response = await fetch(url)
    const json = await response.json()
    return json
}

const insertDB = async (clientData) => {
    const url = "http://api.fastparking.com.br/clientes"
    const options = {
        method: 'POST',
        body: JSON.stringify(clientData)
    }
    await fetch(url, options)
}

const insertPrice = async (registerPrices) => {
    const url = "http://api.fastparking.com.br/precos"
    const options = {
        method: 'POST',
        body: JSON.stringify(registerPrices)
    }
    await fetch(url, options)
}

const updateClient = async () => {

    const url = "http://api.fastparking.com.br/clientes"

    const options = {
        method: 'PUT',
        body: JSON.stringify({
            nome: document.querySelector('#nomeEditar').value,
            placa: document.querySelector('#placaEditar').value
        })
    }

    const id = document.querySelector('#nomeEditar').dataset.index
    await fetch(url + '/' + id, options)

    closeModalEditData()
    updateTable()
}

const createRegistration = (clientData) => {

    const cadastro = document.createElement('tr')

    cadastro.innerHTML = `  
    <td>${clientData.nome}</td>
    <td>${clientData.placa}</td>
    <td>${clientData.dataEntrada.split('-').reverse().join('.')}</td>
    <td>${clientData.horaEntrada}</td>
    <td>
        <button type="button" class="btnVerde" data-action="comprovantes-${clientData.idCliente}" >Comprovantes</button>
        <button type="button" class="btnAmarelo" data-action="editar-${clientData.idCliente}">Editar</button>
        <button type="button" class="btnExcluir" data-action="deletar-${clientData.idCliente}">Excluir</button>
    </td>`

    document.getElementById('tbody').appendChild(cadastro)
}

const clearTable = () => {
    const tabelaClientes = document.querySelector('#tbody')
    while (tabelaClientes.firstChild) {
        tabelaClientes.removeChild(tabelaClientes.lastChild)
    }
}

const updateTable = async () => {
    clearTable()
    const url = "http://api.fastparking.com.br/clientes"
    const clientes = await getContact(url)
    const customersWhoDidNotPay = clientes.filter(clientes => clientes.status == 0);
    customersWhoDidNotPay.forEach(createRegistration)
}

const clearInput = () => {
    document.querySelector('#nome').value = ''
    document.querySelector('#placaDoCarro').value = ''
}

const printProofOfEntry = async () => {
    closeChoiceVoucher()
    const index = document.querySelector('#btnPagamento').dataset.index
    const url = "http://api.fastparking.com.br/clientes"
    const data = await getContact(url)
    const clientEqualId = data.filter(data => data.idCliente == index)
    proofOfEntry(clientEqualId)
}

const proofOfEntry = async (lastClient) => {

    lastClient.forEach(showLastClient => {
        document.querySelector('#nomeComprovanteEntrada').value = showLastClient.nome
        document.querySelector('#placaComprovanteEntrada').value = showLastClient.placa
        document.querySelector('#dataComprovanteEntrada').value = showLastClient.dataEntrada.split('-').reverse().join('.')
        document.querySelector('#horaComprovanteEntrada').value = showLastClient.horaEntrada
    })

    document.querySelector('#modalComprovanteEntrada').classList.add('active')
}

const isValidForm = () => document.querySelector('.formCadastro').reportValidity()

const saveClient = async () => {

    if (isValidForm()) {

        const urlPrice = "http://api.fastparking.com.br/precos"
        const dataPrice = await getContact(urlPrice)

        if (dataPrice.length == 0) {
            confirm("Deve ser informado os preços, antes de inserir o primeiro cliente")
            document.querySelector('#salvarPreco').textContent = 'Salvar'
            openModalPrice()

        } else {
            const newClient = {
                'nome': document.querySelector('#nome').value,
                'placa': document.querySelector('#placaDoCarro').value,
            }

            await insertDB(newClient)

            updateTable()

            const url = "http://api.fastparking.com.br/clientes"
            const data = await getContact(url)

            const getTheLastRegisteredCustomerId = data.length
            const lastClient = data.filter(data => data.idCliente == getTheLastRegisteredCustomerId)

            proofOfEntry(lastClient)

            clearInput()
        }
    }
}

const updatePrice = async () => {
    const url = "http://api.fastparking.com.br/precos"
    const options = {
        method: 'PUT',
        body: JSON.stringify({
            'umaHora': (document.querySelector('#umaHoraPreco').value).replace(',', '.'),
            'demaisHoras': (document.querySelector('#precoAteUmaHora').value).replace(',', '.'),
        })
    }
    console.log(options)
    await fetch(url + '/' + 1, options)
}

const isValidFormPrice = () => document.querySelector('.form').reportValidity()

const savePrice = async () => {

    if (isValidFormPrice()) {
        const price = {
            'umaHora': (document.querySelector('#umaHoraPreco').value).replace(',', '.'),
            'demaisHoras': (document.querySelector('#precoAteUmaHora').value).replace(',', '.')
        }

        const url = "http://api.fastparking.com.br/precos"
        const dataPrice = await getContact(url)

        dataPrice.length == 0 ? insertPrice(price) : updatePrice(price)

        closeModalPrice()
    }
}

const applyNumericMask = (number) => {
    number = number.replace(/\D/g, "")
    number = number.replace(/(\d{1})(\d{5})$/, "$1.$2")
    number = number.replace(/(\d{1})(\d{1,2})$/, "$1,$2")
    return number
}

const applyCarMask = (carPlate) => {
    carPlate = carPlate.replace(/[^a-zA-Z0-9]/, "")
    carPlate = carPlate.replace(/(.{3})(.)/, "$1-$2");
    return carPlate
}

const applyMask = (event) => {
    event.target.value = applyNumericMask(event.target.value)
}

const applyMaskCar = (event) => {
    event.target.value = applyCarMask(event.target.value)
}

const deleteClient = async (index) => {

    const url = "http://api.fastparking.com.br/clientes"
    const data = await getContact(url)

    const clientEqualId = data.filter(data => data.idCliente == index)

    const reasonToDelete = prompt(`Por qual motivo deseja deletar ${clientEqualId[0].nome}?`)
    const resp = reasonToDelete == '' ? alert("Informe um motivo!") : confirm(`Confirma que o motivo da exclusão é ${reasonToDelete}`)

    if (resp) {
        const options = {
            method: 'PUT',
            body: JSON.stringify({
                'motivoExclusao': reasonToDelete 
            })
        }
        await fetch(url + '/' + index, options)
        updateTable()
    }
}

const editClient = async (index) => {
    const url = "http://api.fastparking.com.br/clientes"
    const data = await getContact(url)
    const clientEqualId = data.filter(data => data.idCliente == index)

    clientEqualId.filter(data => {
        document.querySelector('#nomeEditar').value = data.nome
        document.querySelector('#placaEditar').value = data.placa
        document.querySelector('#dataEditar').value = data.dataEntrada
        document.querySelector('#horaEditar').value = data.horaEntrada
    })

    document.querySelector('#nomeEditar').dataset.index = index

    openModalEditPrice()
}

const showProof = async(index) =>{

    const url = "http://api.fastparking.com.br/clientes"
    const data = await getContact(url)

    console.log(index)
    const clientEqualId = data.filter(data => data.idCliente == index);
    clientEqualId.forEach(data => {
        document.querySelector('#nomeComprovante').value = data.nome
        document.querySelector('#placaComprovante').value = data.placa
        document.querySelector('#dataComprovante').value = 
            data.dataEntrada.split('-').reverse().join('.')
        document.querySelector('#horaComprovante').value = data.horaEntrada
        document.querySelector('#dataComprovanteSaida').value =
            data.dataSaida.split('-').reverse().join('.')
        document.querySelector('#horaComprovanteSaida').value = data.horaSaida
        document.querySelector('#valorPagar').value = (data.valorPago).replace('.',',')

    })

    updateTable()
    updateTableCustomersParagram()
    closeChoiceVoucher()
    clearTableCustomersWhoPaid()
    openModalProof()
    amountChargedOnTheDay()
}

const exitClient = async () => {

    const resp = confirm("Confirma que o cliente, vai realizar o pagamento agora?")
    if (resp) {

        const index = document.querySelector('#btnPagamento').dataset.index
        const url = "http://api.fastparking.com.br/clientes"

        const options = {
            method: 'PUT',
        }

        await fetch(url + '/' + index, options)

        showProof(index)
    }
}

const modalVoucherChoice = (index) => {
    document.querySelector('#modalEscolhaDeComprovante').classList.add('active')
    document.querySelector('#btnPagamento').dataset.index = index
}

const showModalPrice = async () => {

    const url = "http://api.fastparking.com.br/precos"
    const dataPrice = await getContact(url)
    dataPrice.forEach(dataPrice => {
        document.querySelector('#umaHoraPreco').value = dataPrice.umaHora.replace('.', ',')
        document.querySelector('#precoAteUmaHora').value = dataPrice.demaisHoras.replace('.', ',')
    })
    console.log(dataPrice.length)

    if (dataPrice.length == 0) {
        document.querySelector('#salvarPreco').textContent = 'Salvar'
    }else{
        document.querySelector('#salvarPreco').textContent = 'Atualizar'
    }
 
}

const registeringCustomersWhoPaid = (dados) => {

    const cadastro = document.createElement('tr')
    cadastro.innerHTML = `  
    <td>${dados.nome}</td>
    <td>${dados.placa}</td>
    <td>${dados.dataEntrada.split('-').reverse().join('.')}</td>
    <td>${dados.dataSaida.split('-').reverse().join('.')}</td>
    <td>${dados.horaEntrada}</td>
    <td>${dados.horaSaida}</td>
    <td>${dados.valorPago.replace('.',',')}</td>
    <td>
        <button type="button" class="btnVerde" data-action="comprovanteSaida-${dados.idCliente}">Comprovante</button>
    </td>
    `
    document.getElementById('tbodyClienteQuePagaram').appendChild(cadastro)
}

const clearTableCustomersWhoPaid = () => {
    const customersWhoPaidTable = document.querySelector('#tbodyClienteQuePagaram')
    while (customersWhoPaidTable.firstChild) {
        customersWhoPaidTable.removeChild(customersWhoPaidTable.lastChild)
    }
}

const date = () => {
    let date = new Date()
    let morning = String(date.getDate()).padStart(2, '0')
    let month = String(date.getMonth() + 1).padStart(2, '0')
    let year = date.getFullYear()
    let currentDate = year + '-' + month + '-' + morning
    document.querySelector('#relatorioDoDia').innerHTML = `Relatório de pagamento do dia: ${morning}.${month}.${year}`
    return currentDate
}

const updateTableCustomersParagram = async () => {
    const url = "http://api.fastparking.com.br/clientes"
    const data = await getContact(url)
    const customersWhoHaveAlreadyPaid = data.filter(data => data.dataSaida === date() && data.status == 1)
    customersWhoHaveAlreadyPaid.forEach(registeringCustomersWhoPaid)
    console.log(customersWhoHaveAlreadyPaid)
}

const amountChargedOnTheDay = async () =>{
    const url = "http://api.fastparking.com.br/clientes"
    const data = await getContact(url)
    const clientsWhoPaid = data.filter(data => data.status == 1 && data.dataSaida == date());

    let resultado = 0;   
    for (let index = 0; index < clientsWhoPaid.length; index++) {
        const soma = parseFloat(clientsWhoPaid[index].valorPago)
        resultado += soma
    }

    document.querySelector('#valorTotalRecebido').textContent = `R$ ${resultado.toString().replace('.',',')}`
}

const exitVoucher = async (index) =>{

    const urlClient = "http://api.fastparking.com.br/clientes"
    const data = await getContact(urlClient)

    const clientEqualId = data.filter(data => data.idCliente == index);

    clientEqualId.forEach(data => {
        document.querySelector('#nomeComprovante').value = data.nome
        document.querySelector('#placaComprovante').value = data.placa
        document.querySelector('#dataComprovante').value = 
            data.dataEntrada.split('-').reverse().join('.')
        document.querySelector('#horaComprovante').value = data.horaEntrada
        document.querySelector('#dataComprovanteSaida').value =
            data.dataSaida.split('-').reverse().join('.')
        document.querySelector('#horaComprovanteSaida').value = data.horaSaida
        document.querySelector('#valorPagar').value = (data.valorPago).replace('.',',')

    })
    openModalProof()
}

const actionButttons = (event) => {
    const element = event.target
    if (element.type === 'button') {
        const action = element.dataset.action.split('-')
        if (action[0] === 'deletar') {
            deleteClient(action[1])
        } else if (action[0] == 'editar') {
            editClient(action[1])
        } else if (action[0] == 'comprovanteSaida') {
            exitVoucher(action[1])
        } else {
            modalVoucherChoice(action[1])
        }
    }
}

document.querySelector('#salvarPreco')
    .addEventListener('click', savePrice)

document.querySelector('#closeComprovanteEntrada')
    .addEventListener('click', closeModalVoucherEntry)

document.querySelector('#fecharModal')
    .addEventListener('click', closeModalVoucherEntry)

document.querySelector('#close')
    .addEventListener('click', closeModalPrice)

document.querySelector('#closeEscolhaComprovante')
    .addEventListener('click', closeChoiceVoucher)

document.querySelector('#closeComprovante')
    .addEventListener('click', closeComprovante)

document.querySelector('#closeEditar')
    .addEventListener('click', closeModalEditData)

document.querySelector('#cancelar')
    .addEventListener('click', closeModalPrice)

document.querySelector('#cancelarEditarDados')
    .addEventListener('click', closeModalEditData)

document.querySelector('#cancelarComprovamte')
    .addEventListener('click', closeModalProof)

document.querySelector('#tabelaClientes')
    .addEventListener('click', actionButttons)

document.querySelector('#tabelaClientesQuePagaram')
    .addEventListener('click', actionButttons)

document.querySelector('#umaHoraPreco')
    .addEventListener('keyup', applyMask)

document.querySelector('#precoAteUmaHora')
    .addEventListener('keyup', applyMask)

document.querySelector('#placaDoCarro')
    .addEventListener('keyup', applyMaskCar)

document.querySelector('#placaEditar')
    .addEventListener('keyup', applyMaskCar)

document.querySelector('#btnPreco')
    .addEventListener('click', () => { openModalPrice(); showModalPrice() })

document.querySelector('#btnSalvar')
    .addEventListener('click', saveClient)

document.querySelector('#btnAtualizarCliente')
    .addEventListener('click', updateClient)

document.querySelector('#btnComprovanteEntrada')
    .addEventListener('click', () => { printProofOfEntry(); disableButton() })

document.querySelector('#btnPagamento')
    .addEventListener('click', exitClient)


document.querySelector('#btnImprimirComprovante')
    .addEventListener('click', () => { window.print() })

document.querySelector('#btnImprimirComprovanteEntrada')
    .addEventListener('click', () => { window.print() })


document.querySelector('#abaRelatorioPagamento')
    .addEventListener('click', () => { openPaymentReportTab(); closeTabCustomersTable(); })

document.querySelector('#abaTabelaClientes')
    .addEventListener('click', () => { openCustomersTable(); closePayersReport() })

updateTable()
updateTableCustomersParagram()
amountChargedOnTheDay()
