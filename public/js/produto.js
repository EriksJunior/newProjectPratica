document.querySelector('#salvarCliente').addEventListener('click', async (e) => {
    e.preventDefault()
    try {
        const id = document.querySelector('#uuid').value;
        const nome = document.querySelector('#nome').value;
        const valorUnitario = document.querySelector('#valorUnitario').value;
        const unidade = document.querySelector('#unidade').value;
        const estoque = document.querySelector('#estoque').value;
        const marca = document.querySelector('#marca').value;

        if(id !== ''){
            atualizarProduto()
            alert('Cliente Atualizado...')
            pesquisarProdutos()
            limparDados()
            return
        }
        if(nome === ''){
            alert('O campo NOME não pode ser vazio!!!')
            return
        }
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
        pesquisarProdutos()
        limparDados()
        return data
    } catch (error) {
        console.log(error)
    }
})

async function limparDados(){
    document.querySelector('#uuid').value = '';
    document.querySelector('#nome').value = '';
    document.querySelector('#valorUnitario').value = '';
    document.querySelector('#unidade').value = '';
    document.querySelector('#estoque').value = '';
    document.querySelector('#marca').value = '';
}
     
async function pesquisarProdutos(){
    try {
        const {data} = await axios.get('/produto/buscarProduto')
    
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
}
    
async function editarProduto(id){
    try {
        lançarQuantidadeEstoque()
        const {data} = await axios.get(`/produto/editarProduto/tabela/${id}`)
        const uuid = document.querySelector('#uuid').value = data[0].id;
        const nome = document.querySelector('#nome').value = data[0].nome;
        const valorUnitario = document.querySelector('#valorUnitario').value = data[0].valorUnitario || '';
        const unidade = document.querySelector('#unidade').value = data[0].unidade  || '';
        const estoque = document.querySelector('#estoque').value = data[0].estoque  || '';
        const marca = document.querySelector('#marca').value = data[0].marca  || '';
        console.log(data)


        return data
    } catch (error) {
        console.log(error)
    }
}

async function atualizarProduto(){
    try {
        const id = document.querySelector('#uuid').value;
        const nome = document.querySelector('#nome').value;
        const valorUnitario = document.querySelector('#valorUnitario').value;
        const unidade = document.querySelector('#unidade').value;
        const estoque = document.querySelector('#estoque').value;
        const marca = document.querySelector('#marca').value;
    
        const dataProducts = {
            id: id,
            nome: nome,
            valorUnitario: valorUnitario || null,
            unidade: unidade,
            estoque: estoque || null,
            marca: marca
        }
        const data = await axios.put(`/produto/atualizarProduto/${id}`, dataProducts)
        pesquisarProdutos()
        return data
    } catch (error) {
        console.log(error)
    }
    
}

async function excluirProduto(id){
    try {
        const {data} = await axios.delete(`/produto/deletarProduto/${id}`)
        console.log(data)
        alert('Cliente deletado')
        pesquisarProdutos()
        return data
    } catch (error) {
        console.log(error)
    }
}

function lançarQuantidadeEstoque(){
    const lancarEstoque = document.querySelector('#ajustarEstoque');
    lancarEstoque.disabled = false;
}
