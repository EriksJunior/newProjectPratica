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

        const resposta =  await axios.post('/cliente/salvarCliente', dadosFormulario)
        

    } 
    catch{
        console.log('Erro ao salvar o cliente')
    }
}