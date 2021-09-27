

document.querySelector('#pesquisarCliente').addEventListener('click', (e)=>{
    e.preventDefault();
    pesquisarCliente();
    document.querySelector('.line').innerHTML = '<input type="text" placeholder="Ex: Nome cliente..." class="form-group col-md-3" id="txtPesquisarCliente"> <button id="btnBuscar">Buscar</buttom>'
    document.querySelector('.line2').innerHTML = '<table class="table table-dark" id="tabelaInfo"><thead><tr><th scope="col">Nome</th><th scope="col">Endereço</th><th scope="col">Bairro</th><th scope="col">Telefone</th></tr></thead><tbody><tr><th scope="row">1</th><td>Mark</td><td>Otto</td><td>@mdo</td></tr><tr><th scope="row">2</th><td>Jacob</td><td>Thornton</td><td>@fat</td></tr><tr><th scope="row">3</th><td>Larry</td><td>the Bird</td><td>@twitter</td></tr></tbody></table>'


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

