module.exports.acabou = function (a, b, c, d, e, f, g, h, painel) {

    d.close()
    const readline = require("readline").createInterface({input: process.stdin,output: process.stdout})
    colors = require("colors"),
        sleep = require('system-sleep'),
        fs = require("fs")

    if (a === 1) {

        console.log(b.green)
        readline.question("   [?] Resposta: ".yellow, respo => {
            switch (respo) {

                case "1":
                    console.clear()
                    readline.close()
                    require("../"+g).self()
                    break;

                case "2":
                    readline.close()
                    fs.writeFile("./Api/Consulta/"+g+"-"+Date.now()+".txt", c.trim(), (err) => {
                        if (err) {
                            console.log("\n    [?] Não foi possivel localizar a pasta para salvar\n    [?] Reniciando em 5 segundos".red)
                            sleep(5000)
                            console.clear()
                            require("../"+g).self()
                        } else {
                            console.log("\n   [!] Arquivo salvo com sucesso em Api/Consulta\n    [?] Reniciando em 5 segundos".green);
                            sleep(5000)
                            console.clear()
                            require("../"+g).self()
                        }
                    });
                    break;

                case "3":
                    readline.close()
                    console.clear()
                    require("../../index").painel(readline)
                    break;

                default:
                    readline.close()
                    console.log("   [!] Resposta invalida você pode escolher apenas 1,2 e 3\n   [?] Reniciando em 5 segundos".green)
                    sleep(5000)
                    console.clear()
                    require("../cnpj").self()
            }

        })
    }

    if (a === 2) {

        console.log(b)
        readline.question("\n   [?] Resposta: ".yellow, respo => {
            switch (respo) {

                case "1":
                    console.clear()
                    readline.close()
                    require("../"+g).self()
                    break;

                case "2":
                    console.clear()
                    readline.close()
                    require("../../index").painel(readline)
                    break;

                default:
                    readline.close()
                    console.log("   [!] Resposta invalida você pode escolher apenas 1 e 2\n   [?] Reniciando em 5 segundos".green)
                    sleep(5000)
                    console.clear()
                    require("../"+g).self()
            }

        })
    }







    



}