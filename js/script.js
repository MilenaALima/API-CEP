const limparFormulario = () => {
  document.getElementById("endereco").value = "";
  document.getElementById("bairro").value = "";
  document.getElementById("cidade").value = "";
  document.getElementById("estado").value = "";
};

const preencherFormulario = (endereco) => {
  //Antes de preencher o formulário, limpando os campos para evitar que informações antigas permaneçam
  limparFormulario();
  //Atribuindo as informacoes do campo de acordo com o que existe no json da API
  document.getElementById("endereco").value = endereco.logradouro;
  document.getElementById("bairro").value = endereco.bairro;
  document.getElementById("cidade").value = endereco.localidade;
  document.getElementById("estado").value = endereco.uf;
};

const eNumero = (numero) => /^[0-9]+$/.test(numero); //Verifica se o numero é composto apenas por números

const cepValido = (cep) => cep.length === 8 && eNumero(cep); //Verifica se o CEP tem 8 dígitos e se é composto apenas por números

const pesquisarCep = async () => {
  const cep = document.getElementById("cep").value.replace(/\D/g, ""); // Remove qualquer caractere que não seja número
  const url = `https://viacep.com.br/ws/${cep}/json/`;

  if (cepValido(cep)) {
    const response = await fetch(url);
    // Busca o endereço no formato JSON
    const endereco = await response.json();

    if (endereco.erro) {
      console.log("CEP não encontrado.");
      document.getElementById("endereco").value = "CEP não encontrado.";
    } else {
      preencherFormulario(endereco);
    }
  } else {
    document.getElementById("endereco").value = "CEP incorreto.";
  }
};

//Escutar quando o usuário sair do campo de CEP e então chamar a função pesquisarCep
document.getElementById("cep").addEventListener("focusout", pesquisarCep);
