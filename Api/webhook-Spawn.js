module.exports.self = function (painel) {
process.title = "Lofy Multi Tools - Webhook Spawn"
const colors = require('colors')
const fetch = require('sync-fetch')
const readline = require("readline").createInterface({input: process.stdin,output: process.stdout})
const sleep = require('system-sleep')

    function print() {
        return `\n\n
    ██╗    ██╗███████╗██████╗ ██╗  ██╗ ██████╗  ██████╗ ██╗  ██╗    ███████╗██████╗  █████╗ ██╗    ██╗███╗   ██╗
    ██║    ██║██╔════╝██╔══██╗██║  ██║██╔═══██╗██╔═══██╗██║ ██╔╝    ██╔════╝██╔══██╗██╔══██╗██║    ██║████╗  ██║
    ██║ █╗ ██║█████╗  ██████╔╝███████║██║   ██║██║   ██║█████╔╝     ███████╗██████╔╝███████║██║ █╗ ██║██╔██╗ ██║
    ██║███╗██║██╔══╝  ██╔══██╗██╔══██║██║   ██║██║   ██║██╔═██╗     ╚════██║██╔═══╝ ██╔══██║██║███╗██║██║╚██╗██║
    ╚███╔███╔╝███████╗██████╔╝██║  ██║╚██████╔╝╚██████╔╝██║  ██╗    ███████║██║     ██║  ██║╚███╔███╔╝██║ ╚████║
     ╚══╝╚══╝ ╚══════╝╚═════╝ ╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝    ╚══════╝╚═╝     ╚═╝  ╚═╝ ╚══╝╚══╝ ╚═╝  ╚═══╝
 \n\n`
}

const casa = () => {
    console.clear()
    console.log(print().magenta)
    readline.question("    [?] Insira a Webhook: ".yellow, webho => {

        if (!webho) return require('./Fim/index').acabou(2, "\n   [-] Você não inseriu uma webhook\n   [1] Tentar Novamente\n   [2] Sair".red, "", readline, "", "", "webhook-Spawn", "")

        const validar = fetch(webho, {
            method: "GET",
        })
        if (validar && validar.status !== 200) return require('./Fim/index').acabou(2, "\n   [-] A webhook e invalida\n   [1] Tentar Novamente\n   [2] Sair".red, "", readline, "", "", "webhook-Spawn", "")

        readline.question("    [?] Mensagem a ser enviada: ".yellow, msg => {

            if (!msg) return require('./Fim/index').acabou(2, "\n   [-] Você não escolheu uma mensagem para ser enviada\n   [1] Tentar Novamente\n   [2] Sair".red, "", readline, "", "", "webhook-Spawn", "")
      

            readline.question("    [?] Quantas mensagens devem ser enviadas: ".yellow, send => {

                if (!send) return require('./Fim/index').acabou(2, "\n   [-] Escolha quantas vezes a mensagem deve ser enviada\n   [1] Tentar Novamente\n   [2] Sair".red, "", readline, "", "", "webhook-Spawn", "")

                if (isNaN(send)) return require('./Fim/index').acabou(2, "\n   [-] Defina apenas em numero\n   [1] Tentar Novamente\n   [2] Sair".red, "", readline, "", "", "webhook-Spawn", "")


                const sends = () => {

                    const enviar =  fetch(webho + "?wait=true", {
                        method: 'POST',
                        headers: {"content-type": "application/json"},
                        body: `{"content":"${msg}","embeds":null,"attachments":[]}`
                    }).json()
  
                      if (enviar && enviar.content === msg) {
                          console.log(`    [${i + 1}/${send}] Mensagem enviada`.green)
                      }
  
                    if (enviar && enviar.message === "The resource is being rate limited.") {
                          console.log("    [!] O recurso está sendo limitado aquarde.. " + enviar.retry_after + " ms")
                          i - 1
                          sends()
                      }
                  
                  }


                for (var i = 0; i < send; i++) sends()

                require('./Fim/index').acabou(2, "\n   [-] Oque você quer fazer agora?\n   [1] Tentar Novamente\n   [2] Sair".green, "", readline, "", "", "webhook-Spawn", "")

            })
        })

    })
}

casa()
}