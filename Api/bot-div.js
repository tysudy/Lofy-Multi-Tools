module.exports.self = function () {
process.title = "Lofy Multi Tools - Bot Div"
    const Discord = require("discord.js"),
        client = new Discord.Client()
    colors = require("colors"),
        fs = require("fs"),
        readline = require("readline").createInterface({input: process.stdin,output: process.stdout})
        json = require("../Arquivos Config/config.json"),
        msg = fs.readFileSync("Arquivos Config/Mensagem.txt", 'utf-8').replace(/\r/gi, '').split("\n")
    
    process.on("unhandledRejection", e => {})
process.on("uncaughtException", e => {})
process.on("uncaughtRejection", e => {})
process.warn = () => {}


    Main()


    function Main() {
        console.clear()
        console.log(`\n\n
    ██████╗ ██╗██╗   ██╗      ██████╗  ██████╗ ████████╗     ██╗███████╗
    ██╔══██╗██║██║   ██║      ██╔══██╗██╔═══██╗╚══██╔══╝     ██║██╔════╝
    ██║  ██║██║██║   ██║█████╗██████╔╝██║   ██║   ██║        ██║███████╗
    ██║  ██║██║╚██╗ ██╔╝╚════╝██╔══██╗██║   ██║   ██║   ██   ██║╚════██║
    ██████╔╝██║ ╚████╔╝       ██████╔╝╚██████╔╝   ██║██╗╚█████╔╝███████║
    ╚═════╝ ╚═╝  ╚═══╝        ╚═════╝  ╚═════╝    ╚═╝╚═╝ ╚════╝ ╚══════╝
\n\n
`.magenta)


        console.log("   [1] Modo Normal\n   [2] Modo com delay\n\n".yellow);
        readline.question("   [?] Escolha a opção: ".magenta, answer => {
            switch (answer) {


                case "1":
                    readline.question("   [?] ID do servidor: ".magenta, response => {
                        console.log("")
                        ScrapeUsers(response).then(() => {
                            console.log("   [!] Carregando dados".green);
                            setTimeout(() => {
                                MassDMNormal(null, message).catch(err => {
                                    console.log(err);
                                    setTimeout(() => {
                                        console.log("   [!] Aviso: reiniciando.".yellow);
                                    }, 1000);
                                    setTimeout(() => {
                                        process.exit(1);
                                    }, 2000);
                                })
                            }, 2000);
                        });
                    });
                    break;


                case "2":
                    readline.question("   [?] ID do servidor: ".blue, response => {
                        ScrapeUsers(response).then(() => {
                            setTimeout(() => {
                                readline.question("\n   [!] Defina o número de segundos que o bot espera\n   Antes de enviar mensagens aos usuários.\n   [i] Limite(s): 3 - 9 segundos\n\n   [!] Digite o limite: ".yellow, timeout => {
                                    if (
                                        timeout === "3" ||
                                        timeout === "4" ||
                                        timeout === "5" ||
                                        timeout === "6" ||
                                        timeout === "7" ||
                                        timeout === "8" ||
                                        timeout === "9"
                                    ) {
                                        const timer = parseInt(timeout) * 1000;
                                        console.log("   [!] Carregando dados".green);
                                        MassDMTimeOut(null, timer, message).catch(err => {
                                            console.log(err);
                                            setTimeout(() => {
                                                console.log("   [!] Aviso Reiniciando.".yellow);
                                            }, 1000);
                                            setTimeout(() => {
                                                process.exit(1);
                                            }, 2000);
                                        });
                                    } else {
                                        console.log("   [!] Um numero invalido foi usado".red);
                                        setTimeout(() => {
                                            console.log("   [!] Aviso Reiniciando.".yellow);
                                        }, 1000);
                                        setTimeout(() => {
                                            process.exit(1)
                                        }, 2000);
                                    }
                                });
                            }, 2000);
                        });
                    });
                    break;


                default:
                    console.log("   [!] Uma opção errada foi usada".red)
            }
        });
    }


    async function ScrapeUsers(guildID) {
        client.guilds.fetch(guildID)
            .then(guild => {
                const file_path = "./Arquivos Logs/ids.json";
                const MemberIDs = guild.members.cache.map(users => users.id);
                console.log("   [!] " + MemberIDs.length + " ID(s) de usuários anotados".yellow);
                const Data = {
                    IDs: MemberIDs
                };
                const content = JSON.stringify(Data, null, 2);
                fs.writeFileSync(file_path, content, err => {
                    if (err)
                        return console.log("   [X] Erro ao gravar o arquivo: ".red + err);
                    console.log("   [!] Arquivo gravado com sucesso ".red + file_path);
                });
            })
            .catch(err => {
                console.log(`   [!] Id do servidor esta invalido`.red);
                setTimeout(() => {
                    console.log("   [!] Aviso Reiniciando.".yellow);
                }, 1000);
                setTimeout(() => {
                    process.exit(1);
                }, 2000);
            });
    }


    function MassDMTimeOut(users, timeout, msg) {
        return new Promise((resolve, reject) => {
            const scraped = require("./Arquivos Logs/ids.json");
            users = scraped.IDs;
            if (typeof timeout != "number") {
                reject("   [!] Erro de tempo limite: dados incorreto usado.".red);
            } else if (typeof msg != "string") {
                reject("   [X] Erro de Args da mensagem: Deve-se usar o tipo de dados 'string'".red);
            } else {
                for (let i = 0; i <= users.length; i++) {
                    client.users.fetch(users[i])
                        .then(u => {
                            (function (i) {
                                setTimeout(function () {
                                    u.send(msg).then(() => console.log("   [V] Mensagem enviada para: ".green + u.tag.yellow))
                                        .catch(err => console.log("   [X] Erro ao enviar mensagem para: ".red + u.tag.yellow));
                                }, timeout * i);
                            })(i);
                        })
                        .catch(err => console.log(`   [!] Verificando problemas no bot.\n   Erro encontrado: ${err}\n`.red));
                }
                resolve();
            }
        });
    }


    /**
     * @param {array} users
     * @param {string} msg
     */


    function MassDMNormal(users, msg) {
        return new Promise((resolve, reject) => {
            const scraped = require("./Arquivos Logs/ids.json");
            users = scraped.IDs;
            for (let i = 0; i <= users.length; i++) {
                client.users
                    .fetch(users[i])
                    .then(u => {
                        u.send(msg)
                            .then(() =>
                                console.log("   [V] Mensagem enviada para: ".green + u.tag.yellow))
                            .catch(err =>
                                console.log("   [X] Erro ao enviar mensagem para: ".red + u.tag.yellow));
                    })
                    .catch(err =>
                        console.log(`   [!] Verificando problemas no bot.\n   Erro encontrado: ${err}\n`));
            }
            resolve();
        });
    }


    client.login(json.token_bot)
    .catch((err) => {
        require('./Fim/index').acabou(2, "\n   [!] Token Invalido!\n   "+err+"\n   [1] Tentar Novamente\n   [2] Sair".red, "", readline, "", "", "bot-div", "")
    })
}
