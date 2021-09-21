document.querySelector('#salvarCliente').addEventListener('click', (e)=>{
    e.preventDefault();
    atualizarCliente();
})

async function salvarCliente(){
    try {
        const nome = document.querySelector('#nomeCliente').value
        const sobreNome = document.querySelector('#sobreNomeCliente').value

        const dadosFormulario = {
            nome: nome,
            sobreNome: sobreNome
        }

        const {data} =  await axios.post('/cliente/salvarCliente', dadosFormulario)
        alert('cliente cadastrado')
    } 
    catch{
        console.log('Erro ao salvar o cliente')
    }
}


async function atualizarCliente(){
    try {
        const nome = document.querySelector('#nomeCliente').value
        const sobreNome = document.querySelector('#sobreNomeCliente').value
        const id = document.querySelector('#uuid').value

        const dadosFormulario = {
            nome: nome,
            sobreNome: sobreNome,
            id: id
        }

        const {data} =  await axios.put('/cliente/atualizarCliente', dadosFormulario)
        console.log(data)
    } 
    catch(error) {
        console.log(error)
    }
}