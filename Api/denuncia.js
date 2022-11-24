module.exports.self = function () {
    process.title = "Lofy Multi Tools - Denuncia"
    const colors = require("colors"),
        readline = require("readline").createInterface({
            input: process.stdin,
            output: process.stdout
        }),
        fetch = require("sync-fetch"),
        randomstring = require("randomstring"),
        sleep = require('system-sleep'),


        log = console.log;
    clr = console.clear;

    clr()

    log(`\n\n
   ██████╗ ██╗   ██╗     ███████╗██████╗  █████╗ ██╗    ██╗███╗   ██╗
   ██╔══██╗╚██╗ ██╔╝     ██╔════╝██╔══██╗██╔══██╗██║    ██║████╗  ██║
   ██████╔╝ ╚████╔╝█████╗███████╗██████╔╝███████║██║ █╗ ██║██╔██╗ ██║
   ██╔══██╗  ╚██╔╝ ╚════╝╚════██║██╔═══╝ ██╔══██║██║███╗██║██║╚██╗██║
   ██████╔╝   ██║        ███████║██║     ██║  ██║╚███╔███╔╝██║ ╚████║
   ╚═════╝    ╚═╝        ╚══════╝╚═╝     ╚═╝  ╚═╝ ╚══╝╚══╝ ╚═╝  ╚═══╝
\n\n
`.magenta)



    readline.question("   [?] Token: ".yellow, token => {
        readline.question("   [?] Id do Canal: ".yellow, canal => {
            readline.question("   [?] Id da Mensagem: ".yellow, mensagem => {
                readline.question("   [?] Quantas denúncias devem ser enviadas: ".yellow, den => {
                    console.log("\n\n")


                    for (var i = 0; i < den; i++) {

                        
                        fuck = randomstring.generate({
                            length: 19,
                            charset: '1234567890'
                        })

                        const okabilç = fetch("https://discord.com/api/v9/reporting/first_dm", {
                            method: "POST",
                            headers: {
                                "authorization": token,
                                "content-type": "application/json",
                                "referrerPolicy": "strict-origin-when-cross-origin"
                            },
                            body: `{"id":"${fuck}","version":"1.0","variant":"1","language":"en","breadcrumbs":[34],"elements":{},"name":"first_dm","channel_id":"${canal}","message_id":"${mensagem}"}`,
                        })

                        const body = okabilç.json()
                        const ss = okabilç.status

                        if (ss && ss === 200) {
                            log(`   [${i + 1}/${den}]` + " [V] Denúncia enviada ".green + "Id: ".green + body.report_id + "".yellow)
                        }

                        if (body && body.message === "Unknown Channel") {
                            require('./Fim/index').acabou(2, "\n   [!] Id do canal invalido\n   [1] Tentar Novamente\n   [2] Sair".red, "", readline, "", "", "denuncia", "")
                            break;
                        }
                        if (body && body.message === "Unknown Message") {
                            require('./Fim/index').acabou(2, "\n   [!] Id da mensagem invalida\n   [1] Tentar Novamente\n   [2] Sair".red, "", readline, "", "", "denuncia", "")
                            break;
                        }
                        if (body && body.message === "401: Unauthorized") {
                            require('./Fim/index').acabou(2, "\n   [!] O token da conta e invalido\n   [1] Tentar Novamente\n   [2] Sair".red, "", readline, "", "", "denuncia", "")
                            break;
                        }
                        if (body && body.message === "The resource is being rate limited.") {
                            i - 1
                            var ms = body.retry_after.toString().replace(".", "")
                            log(`   [!] Limitado aquarde ${ms} ms`.yellow);
                            sleep(ms)
                        }

                    }

                    require('./Fim/index').acabou(2, "\n   [+] Fim, o processo terminou\n   [1] Tentar Novamente\n   [2] Sair".green, "", readline, "", "", "denuncia", "")

                })
            })
        })
    })
}
