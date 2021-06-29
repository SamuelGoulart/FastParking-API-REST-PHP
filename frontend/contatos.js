'use strict'

const openModal = () => document.querySelector('.modal').style.display = 'block'
const closeModal = () => document.querySelector('.modal').style.display = 'none'

const getContact = async (url) => {
    const response = await fetch(url)
    const json = await response.json()
    console.log(json)
    return json
}

const createContact = async (tblClientes) => {
    const url = "http://api.icatalogo.com.br/clientes"
    const options = {
        method: 'POST',
        body: JSON.stringify(tblClientes)
    }
    await fetch(url, options)
}

const createRow = (tblClientes) => {

    const tbody = document.querySelector('main>table>tbody')
    const newRow = document.createElement('tr')

    newRow.innerHTML = `
        <td>${tblClientes.idCliente}</td>
        <td>${tblClientes.nome}</td>
        <td>${tblClientes.placa}</td>
        <td>${tblClientes.dataEntrada}</td>
        <td>${tblClientes.estado}</td>
        <td>
            <button type='button' class="btn btn-warning" data-action="editar-${tblClientes.id}">Editar</button>
            <button type='button' class="btn btn-danger" data-action="deletar-${tblClientes.id}">Deletar</button>
        </td>
    `
    tbody.appendChild(newRow)
}

const clearTable = () => {
    const tbody = document.querySelector('main>table>tbody')
    while (tbody.firstChild) {
        tbody.removeChild(tbody.lastChild)
    }
}

const updateTable = async () => {
    clearTable()
    const url = "http://api.icatalogo.com.br/clientes"
    const contatos = await getContact(url)
    contatos.forEach(createRow)
}

const clearFields = () => {
    const inputs = Array.from(document.querySelectorAll('.form-row input'))
    for (let index = 0; index < inputs.length; index++) {
        inputs[index].value = ''
    }
}

const isValidForm = () => document.querySelector('main>form').reportValidity()

const saveContact = async () => {
    if (isValidForm()) {
        const newContact = {
            'nome': document.getElementById('nome').value,
            'email': document.getElementById('email').value,
            'cidade': document.getElementById('cidade').value,
            'estado': document.getElementById('estado').value
        }
        await createContact(newContact)
        updateTable()
        clearFields()
    }
}

const deleteContact = async (index) => {
    const url = "http://api.icatalogo.com.br/clientes"
    const resp = confirm(`Deseja realmente deletar?`)
    if (resp) {
        const options = {
            method: 'DELETE',
        }
        await fetch(url + '/' + index, options)
        updateTable()
    }
}

const isValidFormModal = () => document.querySelector('.modal-body>form').reportValidity()


const editContact = async (index) => {
    const url = "http://api.icatalogo.com.br/clientes"
    const data = await getContact(url)
    const customerEqualId = data.filter(data => data.id == index);

    const inputs = Array.from(document.querySelectorAll('.form-modal input'))
    customerEqualId.forEach(data => {
        inputs[0].value = data.id
        inputs[1].value = data.nome
        inputs[2].value = data.email
        inputs[3].value = data.cidade
        inputs[4].value = data.estado
    })
    openModal()
}

const updateBank = async () => {
    if (isValidFormModal()) {
        
        const inputs = Array.from(document.querySelectorAll('.form-modal input'))
        const id = inputs[0].value
        const nome = inputs[1].value
        const email = inputs[2].value
        const cidade = inputs[3].value
        const estado = inputs[4].value
        
        const url = "http://api.icatalogo.com.br/clientes"
        const options = {
            method: 'PUT',
            body: JSON.stringify({
                nome: nome,
                email: email,
                cidade: cidade,
                estado: estado,
            })
        }

        await fetch(url + '/' + id, options)

        updateTable()
        closeModal()
    }
}

const actionButttons = (event) => {
    const element = event.target
    if (element.type === 'button') {
        const action = element.dataset.action.split('-')
        if (action[0] === 'deletar') {
            deleteContact(action[1])
        } else (
            editContact(action[1])
        )
    }
}

document.getElementById('salvar').addEventListener('click', saveContact)
document.getElementById('tabelaClientes').addEventListener('click', actionButttons)
document.getElementById('close').addEventListener('click', closeModal)
document.getElementById('closeX').addEventListener('click', closeModal)
document.getElementById('atualizar').addEventListener('click', updateBank)

updateTable()
