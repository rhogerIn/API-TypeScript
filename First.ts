
// UUID => Universally Unique Identifier
/*
function enviarEmail(para, id, assunto, texto){
  // Biblioteca de envio de E-mail.

  console.log(para, id, assunto, texto);
}

class EnviarEmailParaUsuario{
  send(){
    enviarEmail("roger@gmail.com", 12, "Opa", "De boas?");
  }
}*/

//TypeScript

interface DadosDeEnvioEmail{
  para: string;
  id: string;
  assunto: string;
  texto: string;
}

function enviarEmail({ para, id, assunto, texto}: DadosDeEnvioEmail){
  //Para remover este monte de dados basta desestruturar o objeto DadosDeEnvioEmail
  console.log(para, id, assunto, texto);
}

class EnviarEmailParaUsuario{
  // Ao instanciar os dados da interface precisa criar os objetos da interface.
  send(){
    enviarEmail({
      para: "roger@gmail.com", 
      id: "12", 
      assunto:"Opa",
      texto:"De boas?"})
  }
}