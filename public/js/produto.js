document.querySelector('#salvarCliente').addEventListener('click', async (e) => {
    e.preventDefault()
    try {
        const nome = document.querySelector('#nome').value;
        const valorUnitario = document.querySelector('#valorUnitario').value;
        const unidade = document.querySelector('#unidade').value;
        const estoque = document.querySelector('#estoque').value;
        const marca = document.querySelector('#marca').value;


        const dadosProduto = {
            nome: nome,
            valorUnitario: valorUnitario || null,
            unidade: unidade,
            estoque: estoque || null,
            marca: marca
        }

        const { data } = await axios.post('/produto/salvarProduto', dadosProduto)
        console.log(data)
        alert('Produto Cadastrado')
        document.querySelector('#nome').value = '';
        document.querySelector('#valorUnitario').value = '';
        document.querySelector('#unidade').value = '';
        document.querySelector('#estoque').value = '';
        document.querySelector('#marca').value ='';
        return data
    } catch (error) {
        console.log(error)
    }
})

document.querySelector('#btnRealizarBusca').addEventListener('click', async (e)=>{
    try {
        e.preventDefault();
        const {data} = await axios.get('/produto/buscarProduto')
        console.log(data)
    
        $("#tabelaInfoProduto tbody").empty() // limpa a tabela pq se naõ acada hora que clicar na pesquisa insere duplicado

        for (const item of data) {
            $("#tabelaInfoProduto tbody").append(` 
            <tr>
                 <td style = "display: none">${item.id}</td>
                 <td >${item.nome}</td>
                 <td style = "text-align: center">${parseInt(item.valorUnitario || '0,00').toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</td>
                 <td style = "text-align: center">${item.unidade}</td>
                 <td style = "text-align: center">${item.estoque  || '0'}</td>
                 <td style = "text-align: center">${item.marca}</td>
                 <td><button id="btnEditarProduto" onclick= "editarProduto('${item.id}')">Editar</button></td>
                 <td><button id="btnExcluirProduto" onclick= "excluirProduto('${item.id}')">Excluir</button></td>
            </tr>
            `)
        }
        return data
    } catch (error) {
        console.log(error)
    }
})

async function editarProduto(id){
    try {
        const {data} = await axios.get(`/produto/editarProduto/${id}`)
        console.log(data)


        return data
    } catch (error) {
        console.log(error)
    }
}
