
document.querySelector('#btnBuscar').addEventListener('click', (e)=>{
    e.preventDefault();
    pesquisarCliente();
})


document.querySelector('#salvarCliente').addEventListener('click', (e)=>{
    e.preventDefault();
    salvarCliente();
})

document.querySelector('#excluirCliente').addEventListener('click', (e)=>{
    e.preventDefault();
    excluirCliente();
})

// document.querySelector('#atualizarCliente').addEventListener('click', (e)=>{
//     e.preventDefault();
//     atualizarCliente();
// })


async function salvarCliente(){
    try {
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

        if(nomeCliente == ''){
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
    
            const {data} =  await axios.post('/cliente/salvarCliente', dadosFormulario)
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
    catch (error){
        console.log(error)
    }
}

// async function atualizarCliente(){
//     try {
//         const nome = document.querySelector('#nomeCliente').value
//         const id = document.querySelector('#uuid').value

//         const dadosFormulario = {
//             nome: nome,
//             id: id
//         }

//         const {data} =  await axios.put('/cliente/atualizarCliente', dadosFormulario)
//         alert('Cliente Atualizado')
//     } 
//     catch(error) {
//         console.log(error)
//     }
// }

async function pesquisarCliente(){
    try {
        const {data} =  await axios.get('/cliente/pesquisarClientes')
        let valor = 0;
        for(let i=0; i < data.length; i++){
            valor += 1
           document.querySelector(`#index${valor}`).textContent = data[i].nome
        }
        
        console.log(data)
        return data
       


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
  
    const {data} = await axios.delete('/cliente/excluirCliente/'+ id)
    console.log(data)

 } catch (error) {
     console.log(error)
 }
}

