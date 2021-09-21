

document.querySelector('#listarCliente').addEventListener('click', (e)=>{
    e.preventDefault();
    listarCliente();
})

document.querySelector('#salvarCliente').addEventListener('click', (e)=>{
    e.preventDefault();
    salvarCliente();
})

document.querySelector('#excluirCliente').addEventListener('click', (e)=>{
    e.preventDefault();
    excluirCliente();
})

document.querySelector('#atualizarCliente').addEventListener('click', (e)=>{
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

        document.querySelector('#nomeCliente').value = " "
        document.querySelector('#sobreNomeCliente').value = " "
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
        alert('Cliente Atualizado')
    } 
    catch(error) {
        console.log(error)
    }
}

async function listarCliente(){
    try {

        const {data} =  await axios.get('/cliente/listarClientes')
        console.log(data)
    } 
    catch(error) {
        console.log(error)
    }
}

async function excluirCliente(){
 try {
     const id = document.querySelector('#uuid').value

     const dadosFormulario = {
        id: id
    }
  
    const {data} = axios.delete('/cliente/excluirCliente', dadosFormulario)
    console.log(data)

 } catch (error) {
     console.log(error)
 }
}
