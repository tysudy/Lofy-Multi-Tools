module.exports.self = function (asd) {
process.title = "Lofy Multi Tools - Cnpj"
const colors = require('colors'),
    fetch = require('sync-fetch')
readline = require("readline").createInterface({input: process.stdin,output: process.stdout}),
    fs = require('fs'),

    console.clear()


console.log(`\n\n
   =██████╗███╗   ██╗██████╗     ██╗
   ██╔════╝████╗  ██║██╔══██╗    ██║
   ██║     ██╔██╗ ██║██████╔╝    ██║
   ██║     ██║╚██╗██║██╔═══╝██   ██║
   ╚██████╗██║ ╚████║██║    ╚█████╔╝
    ╚═════╝╚═╝  ╚═══╝╚═╝     ╚════╝
    \n\n
    `.magenta)


readline.question("   [?] cnpj: ".yellow, cnpjs => {
    const cls = cnpjs
        .replaceAll(".", "")
        .replaceAll("/", "")
        .replaceAll("\\", "")
        .replaceAll("-", "")
        .replaceAll("!", "")
        .replaceAll("?", "")
    const cnpj = fetch("https://brasilapi.com.br/api/cnpj/v1/" + cls, {
        method: "GET"
    })

    if (cnpj && cnpj.status === 200) {
        const body = cnpj.json()
        const text = `Tipo: ${body.descricao_identificador_matriz_filial}

Nome: ${body.razao_social}
        
NOME FANTASIA: ${body.nome_fantasia || "*****"}
PORTE: ${body.porte}
CÓDIGO E ATIVIDADE PRINCIPAL: ${body.cnae_fiscal} --- ${body.cnae_fiscal_descricao}
        
CÓDIGO E ATIVIDADES SECUNDÁRIAS:\n ${body.cnaes_secundarios.map(ok => {return `${ok.codigo}` + " --- " + `${ok.descricao}` + "\n"})}
        
CÓDIGO E NATUREZA JURÍDICA: ${body.codigo_natureza_juridica} --- ${body.natureza_juridica}
QUADRO DE SÓCIOS E ADMINISTRADORES: 
        
SÓCIOS:\n\n${body.qsa.map(ok => {return `Nome: ${ok.nome_socio}\nFaixa Etaria: ${ok.faixa_etaria}\nCargo: ${ok.qualificacao_socio}\nRepresentante: ${ok.qualificacao_representante_legal}\n\n`}).toString()}

LOGRADOURO: ${body.logradouro}
NÚMERO: ${body.numero}
COMPLEMENTO: ${body.complemento}
        
CEP: ${body.cep}
BAIRRO/DISTRITO: ${body.bairro}
MUNICÍPIO: ${body.municipio}
ESTADO: ${body.uf}
        
TELEFONE: ${body.ddd_telefone_1 || "❌"} / ${body.ddd_telefone_2 || "❌"}
SITUAÇÃO CADASTRAL: ${body.descricao_situacao_cadastral}`

console.log(text.green)
require('./Fim/index').acabou(1,"   [!] Consulta acima!\n   [1] Tentar novamente\n   [2] Salvar Consulta\n   [3] Sair",text,readline,"","",asd)

} 


    if (cnpj && cnpj.status === 500) {
        readline.close()
        console.log("\n   [X] O cnpj e invalido: " + cls.red);
        require('./Fim/index').acabou(2,"   [1] Tentar novamente\n   [2] Sair","",readline,"","",asd)
    }

    if (cnpj && cnpj.status === 400) {
        readline.close()
        console.log("\n   [X] O cnpj e invalido: " + cls.red);
        require('./Fim/index').acabou(2,"   [1] Tentar novamente\n   [2] Sair","",readline,"","",asd)
    }

})
}