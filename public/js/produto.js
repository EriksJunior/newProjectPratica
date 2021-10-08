document.querySelector('#salvarCliente').addEventListener('click',  (e) => {
    e.preventDefault()
    salvarProduto()
})

async function salvarProduto(){
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
    } catch (error) {
        console.log(error)
    }
}