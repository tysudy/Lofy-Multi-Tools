module.exports.self = function () {
process.title = "Lofy Multi Tools - User Div"

const readline = require("readline").createInterface({input: process.stdin,output: process.stdout}),
{Client} = require("discord.js-selfbot-v11"),
client = new Client(),
colors = require("colors"),
json = require("../Arquivos Config/config.json"),
fs = require("fs"),
msg = fs.readFileSync("Arquivos Config/Mensagem.txt", 'utf-8').replace(/\r/gi, '').split("\n")

console.clear()        
console.log(`\n\n
   ██████╗ ██╗██╗   ██╗      ██╗   ██╗███████╗███████╗██████╗         ██╗███████╗
   ██╔══██╗██║██║   ██║      ██║   ██║██╔════╝██╔════╝██╔══██╗        ██║██╔════╝
   ██║  ██║██║██║   ██║█████╗██║   ██║███████╗█████╗  ██████╔╝        ██║███████╗
   ██║  ██║██║╚██╗ ██╔╝╚════╝██║   ██║╚════██║██╔══╝  ██╔══██╗   ██   ██║╚════██║
   ██████╔╝██║ ╚████╔╝       ╚██████╔╝███████║███████╗██║  ██║██╗╚█████╔╝███████║
   ╚═════╝ ╚═╝  ╚═══╝         ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝╚═╝ ╚════╝ ╚══════╝
\n\n
`.magenta);
            console.log("")
            async function sleep(time) {
                return new Promise(resolve => setTimeout(resolve, time));
            }

            client.cachedUsers = [];
            async function run() {
                
                client.on("ready", async () => {
                    
                    while (true) {
                        for (const guild of await client.guilds.array()) {
                            let members = guild.members
                                .filter(x => x.id !== client.user.id)
                                .map(m => m);
                            
                            if (!members) {
                                console.log(`   [!] Nenhum membro carregado em ${(guild.name)}\n   [!] Esperando para recarregar o cache e verificando o próximo servidor.`.yellow);
                                await sleep("4000");
                            }
                            
                            console.log(`   [V] Enviando mensagem para ${guild.members.size} membros no servidor ${guild.name}`.green);
                            
                            for (const member of members.values()) {
                                const already = client.cachedUsers.includes(member.id);
                                if (already) {
                                    console.log(`   [!] O usuario ${member.user.tag} já recebeu uma mensagem`.white);
                                    continue;
                                }
                                
                                const response = await member.send(msg)
                                .catch(err => {
                                        if (err.code == 500 || err.mensagem == "Request to use token, but token was unavailable to the client") {
                                            console.log(`   [!] O token da conta ${client.user.tag} caiu`.red);
                                            return process.exit();
                                        }
                                        return null;
                                    });
                                
                                if (!response) continue;
                                
                                console.log(`   [V] Mensagem enviada ao usuário ${(member.user.tag)} do servidor ${(guild.name)}`.green);
                                client.cachedUsers.push(member.id);
                                await sleep(json.Self_Div.tempo * 1000);
                            }
                        }
                    }
                });
                
                client.login(json.token_conta)
                .catch((err) => {
                    require('./Fim/index').acabou(2, "\n   [!] Token Invalido!\n   "+err+"\n   [1] Tentar Novamente\n   [2] Sair".red, "", readline, "", "", "user-div", "")
                })
            }
            run();
        }