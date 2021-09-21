document.querySelector('#salvarCliente').addEventListener('click', (e)=>{
    e.preventDefault();
    salvarCliente();
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