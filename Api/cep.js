module.exports.self = function (asd) {
    process.title = "Lofy Multi Tools - Cep"
    const colors = require('colors'),
        fetch = require('sync-fetch')
    readline = require("readline").createInterface({input: process.stdin,output: process.stdout}),
        fs = require('fs'),
    
        console.clear()
    
    
    console.log(`\n\n
    ██████╗███████╗██████╗ 
    ██╔════╝██╔════╝██╔══██╗
    ██║     █████╗  ██████╔╝
    ██║     ██╔══╝  ██╔═══╝ 
    ╚██████╗███████╗██║     
     ╚═════╝╚══════╝╚═╝     
        \n\n
        `.magenta)
    
    
    readline.question("   [?] cep: ".yellow, ceps => {
        const cls = ceps
            .replaceAll(".", "")
            .replaceAll("/", "")
            .replaceAll("\\", "")
            .replaceAll("-", "")
            .replaceAll("!", "")
            .replaceAll("?", "")
        const cep = fetch("https://brasilapi.com.br/api/cep/v2/" + cls, {
            method: "GET"
        })
    
        if (cep && cep.status === 200) {
            const body = cep.json()
            const text = `
   CEP: ${cls}

   LOGRADOURO: ${body.street}
   BAIRRO: ${body.neighborhood}
   CIDADE: ${body.city}
   ESTADO: ${body.state}

   LATITUDE: ${body.location.coordinates.latitude}
   LONGITUDE: ${body.location.coordinates.longitude}
   `
    
    console.log(text.green)
    require('./Fim/index').acabou(1,"   [!] Consulta acima!\n   [1] Tentar novamente\n   [2] Salvar Consulta\n   [3] Sair",text,readline,"","","cep")
    
    } 
    
    
        if (cep && cep.status === 500) {
            readline.close()
            console.log("\n   [X] O cep e invalido: " + cls.red);
            require('./Fim/index').acabou(2,"   [1] Tentar novamente\n   [2] Sair","",readline,"","","cep")
        }
    
        if (cep && cep.status === 400) {
            readline.close()
            console.log("\n   [X] O cep e invalido: " + cls.red);
            require('./Fim/index').acabou(2,"   [1] Tentar novamente\n   [2] Sair","",readline,"","","cep")
        }
    
    })
    }