module.exports.self = function () {
process.title = "Lofy Multi Tools - Webhook Dell"
const colors = require('colors'),
    fetch = require('sync-fetch'),
    readline = require("readline").createInterface({input: process.stdin,output: process.stdout})

    function print() {
        return `\n\n
        ██╗    ██╗███████╗██████╗ ██╗  ██╗ ██████╗  ██████╗ ██╗  ██╗    ██████╗ ███████╗██╗     ██╗     
        ██║    ██║██╔════╝██╔══██╗██║  ██║██╔═══██╗██╔═══██╗██║ ██╔╝    ██╔══██╗██╔════╝██║     ██║     
        ██║ █╗ ██║█████╗  ██████╔╝███████║██║   ██║██║   ██║█████╔╝     ██║  ██║█████╗  ██║     ██║     
        ██║███╗██║██╔══╝  ██╔══██╗██╔══██║██║   ██║██║   ██║██╔═██╗     ██║  ██║██╔══╝  ██║     ██║     
        ╚███╔███╔╝███████╗██████╔╝██║  ██║╚██████╔╝╚██████╔╝██║  ██╗    ██████╔╝███████╗███████╗███████╗
         ╚══╝╚══╝ ╚══════╝╚═════╝ ╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝    ╚═════╝ ╚══════╝╚══════╝╚══════╝
 \n\n
        `
    }

const before = () => {
    console.clear()
    console.log(print().magenta)
    readline.question("    [?] Insira a Webhook: ".yellow, web => {
        if (!web) return require('./Fim/index').acabou(2, "\n   [-] Você não inseriu a webhook\n   [1] Tentar Novamente\n   [2] Sair".red, "", readline, "", "", "webhook-dell", "")


        const api = fetch(web, {method: "DELETE",})

        if (api.status === 204) require('./Fim/index').acabou(2, "\n   [OK] Webhook deletada com sucesso\n   [1] Tentar Novamente\n   [2] Sair".green, "", readline, "", "", "webhook-dell", "")
        else return require('./Fim/index').acabou(2, "\n   [!] Erro ao Deletar a Webhook\n   [1] Tentar Novamente\n   [2] Sair".red, "", readline, "", "", "webhook-dell", "")

})
}

before()
}