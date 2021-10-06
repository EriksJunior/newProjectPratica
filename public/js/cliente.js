
document.querySelector('#btnBuscar').addEventListener('click', async (e) => {
    try {
        const nomePesquisa = document.querySelector('#nomePesquisa').value;
        e.preventDefault();
        if (nomePesquisa == '' || nomePesquisa == null) {
            pesquisarCliente();
        } else {
            const { data } = await axios.get('/cliente/pesquisarClientes/filtro/' + nomePesquisa)
            $("#tabelaInfo tbody").empty()

            for (let i = 0; i < data.length; i++) {
                $("#tabelaInfo tbody").append(` 
                <tr>
                     <td>${data[i].nome}</td>
                     <td>${data[i].endereco}</td>
                     <td>${data[i].bairro}</td>
                     <td>${data[i].telefone}</td>
                     <td></td>
                     <td></td>
                
                </tr>
                `)
            }
            console.log(data)
            return data
        }

    } catch (error) {
        console.log(error)
    }

})


document.querySelector('#salvarCliente').addEventListener('click', (e) => {
    e.preventDefault();
    salvarCliente();
})





// document.querySelector('#atualizarCliente').addEventListener('click', (e)=>{
//     e.preventDefault();
//     atualizarCliente();
// })


async function salvarCliente() {
    try {
        const id = document.querySelector('#uuid').value
        const nomeCliente = document.querySelector('#nomeCliente').value
        const endereco = document.querySelector('#endereco').value
        const bairro = document.querySelector('#bairro').value
        const numero = document.querySelector('#numero').value
        const cidade = document.querySelector('#cidade').value
        const uf = document.querySelector('#uf').value
        const dataNasc = document.querySelector('#dataNasc').value
        const cpfCnpj = document.querySelector('#cpfCnpj').value
        const ie = document.querySelector('#ie').value
        const tel = document.querySelector('#telefone').value
        const cell = document.querySelector('#celular').value
        const obs = document.querySelector('#obs').value

        if (id !== null || id !== '') {
            atualizarCliente();
        } else {
            if (nomeCliente == '') {
                alert('Informe ao menos o nome do cliente')
            } else {
                const dadosFormulario = {
                    nome: nomeCliente,
                    endereco: endereco,
                    numero: numero,
                    cidade: cidade,
                    bairro: bairro,
                    uf: uf,
                    nascimento: dataNasc || null,
                    cpfcnpj: cpfCnpj,
                    ie: ie,
                    telefone: tel,
                    celular: cell,
                    obs: obs,
    
                }
    
                const { data } = await axios.post('/cliente/salvarCliente', dadosFormulario)
                console.log(data)
                alert('cliente cadastrado')
    
                document.querySelector('#nomeCliente').value = ''
                document.querySelector('#nomeCliente').value = ''
                document.querySelector('#endereco').value = ''
                document.querySelector('#bairro').value = ''
                document.querySelector('#numero').value = ''
                document.querySelector('#cidade').value = ''
                document.querySelector('#uf').value = ''
                document.querySelector('#dataNasc').value = ""
                document.querySelector('#cpfCnpj').value = ''
                document.querySelector('#ie').value = ''
                document.querySelector('#telefone').value = ''
                document.querySelector('#celular').value = ''
                document.querySelector('#obs').value = ''
            }
        }
    }
    catch (error) {
        console.log(error)
    }
}

async function atualizarCliente() {
    try {
        const id = document.querySelector('#uuid').value
        const nomeCliente = document.querySelector('#nomeCliente').value
        const endereco = document.querySelector('#endereco').value
        const bairro = document.querySelector('#bairro').value
        const numero = document.querySelector('#numero').value
        const cidade = document.querySelector('#cidade').value
        const uf = document.querySelector('#uf').value
        const dataNasc = document.querySelector('#dataNasc').value
        const cpfCnpj = document.querySelector('#cpfCnpj').value
        const ie = document.querySelector('#ie').value
        const tel = document.querySelector('#telefone').value
        const cell = document.querySelector('#celular').value
        const obs = document.querySelector('#obs').value

        const dadosFormulario = {
            id: id,
            nome: nomeCliente,
            endereco: endereco,
            numero: numero,
            cidade: cidade,
            bairro: bairro,
            uf: uf,
            nascimento: dataNasc || null,
            cpfcnpj: cpfCnpj,
            ie: ie,
            telefone: tel,
            celular: cell,
            obs: obs,
        }

        const { data } = await axios.put('/cliente/atualizarCliente', dadosFormulario)
        alert('Cliente Atualizado')
        console.log(data)
        return data

    }
    catch (error) {
        console.log(error)
    }
}

async function pesquisarCliente() {
    try {
        const { data } = await axios.get('/cliente/pesquisarClientes')
        $("#tabelaInfo tbody").empty() // limpa a tabela pq se naõ acada hora que clicar na pesquisa insere duplicado

        for (const item of data) {
            $("#tabelaInfo tbody").append(` 
            <tr>
                 <td style="display: none">${item.id}</td>
                 <td>${item.nome}</td>
                 <td>${item.endereco}</td>
                 <td>${item.bairro}</td>
                 <td>${item.telefone}</td>
                 <td><button id="btnEditarCliente" onclick= "editarCliente('${item.id}')">Editar</button></td>
                 <td><button id="btnExcluirCliente" onclick= "excluirCliente('${item.id}')">Excluir</button></td>
            </tr>
            `)

            // Modo abaixo realiza a mesma coisa, porém sem JQUERY
            // const tableLinha = document.querySelector('#infoClientes')
            // const linha = document.createElement('tr')
            // const nome = document.createElement('td')
            // const endereco = document.createElement('td')
            // const bairro = document.createElement('td')
            // const telefone = document.createElement('td')

            // tableLinha.appendChild(linha)
            // linha.appendChild(nome)
            // linha.appendChild(endereco)
            // linha.appendChild(bairro)
            // linha.appendChild(telefone)

            // nome.textContent = data[i].nome;
            // endereco.textContent = data[i].endereco;
            // bairro.textContent = data[i].bairro;
            // telefone.textContent = data[i].telefone;
        }
        return data
    }
    catch (error) {
        console.log(error)
    }
}

async function excluirCliente(id) {
    try {
        const { data } = await axios.delete(`/cliente/excluirCliente/${id}`)
        alert('Cliente deletado com sucesso!!')
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}

async function editarCliente(id) {
    try {
        const { data } = await axios.get(`/cliente/pesquisarClientes/tabela/editar/${id}`)

        document.querySelector('#uuid').value = data[0].id
        document.querySelector('#nomeCliente').value = data[0].nome
        document.querySelector('#endereco').value = data[0].endereco
        document.querySelector('#bairro').value = data[0].bairro
        document.querySelector('#numero').value = data[0].numero
        document.querySelector('#cidade').value = data[0].cidade
        document.querySelector('#uf').value = data[0].uf
        document.querySelector('#dataNasc').value = data[0].nascimento
        document.querySelector('#cpfCnpj').value = data[0].cpfcnpj
        document.querySelector('#ie').value = data[0].ie
        document.querySelector('#telefone').value = data[0].telefone
        document.querySelector('#celular').value = data[0].celular
        document.querySelector('#obs').value = data[0].obs




        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}