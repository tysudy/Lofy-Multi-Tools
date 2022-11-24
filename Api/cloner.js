module.exports.self = function () {

process.title = "Lofy Multi Tools - Cloner"

const {Client} = require("discord.js-selfbot-v11"),
lofy = new Client(),
colors = require("colors"),
readline = require("readline").createInterface({input: process.stdin, output: process.stdout})

async function corrida() {
    await Logclean()

    readline.question("   [?] Insira o token da sua conta: ".yellow, token => {
        readline.question("   [?] Insira o ID do servidor para copiar: ".yellow, original => {
            readline.question("   [?] Insira o ID do servidor para colar: ".yellow, target => {

    
                lofy.on("ready", async () => {
                    Logclean();
                    
                    const guilds = [await lofy.guilds.get(original), await lofy.guilds.get(target)]

                    guilds.forEach(g => {
                        if (!g) {
                            log("Servidor desconhecido, verifique o ID!",3);
                            process.exit(1);
                        }
                    })

                    let itens = {
                        text: guilds[0].channels.filter(c => c.type === "text").sort((a, b) => a.calculatedPosition - b.calculatedPosition).map(c => c),
                        voice: guilds[0].channels.filter(c => c.type === "voice").sort((a, b) => a.calculatedPosition - b.calculatedPosition).map(c => c),
                        category: guilds[0].channels.filter(c => c.type === "category").sort((a, b) => a.calculatedPosition - b.calculatedPosition).map(c => c),
                        roles: guilds[0].roles.sort((a, b) => b.calculatedPosition - a.calculatedPosition).map(r => r)}
                    log("Excluindo todos os canais e funções do servidor ...",1)
                    

                    await guilds[1].channels.forEach(c => c.delete().catch(() => {}));
                    await guilds[1].roles.map(r => r.delete().catch(() => {}));
                    await guilds[1].setIcon(guilds[0].iconURL);
                    await guilds[1].setName(`${guilds[0].name}`);
                    

                    for (let role of itens.roles) {
                        if (guilds[1].roles.get(role.id)) continue;
                        
                        guilds[1].createRole({name: role.name, type: role.type, color: role.color, permissions: role.permissions, managed: role.managed, mentionable: role.mentionable, position: role.position}).then(r => log(`Cargo criado: ${r.name}`, 1));}
                    
                    await guilds[0].emojis.forEach(e => {
                        if (guilds[1].emojis.get(e.id)) return;
                        
                        guilds[1].createEmoji(e.url, e.name).then(c => log(`Criado Emoji: ${c}`, 1));

                    });
                    
                    itens["category"].forEach(async category => {
                        if (guilds[1].channels.get(category.id)) return;
                        
                        await guilds[1].createChannel(category.name, {type: "category", permissionOverwrites: category.permissionOverwrites.map(v => {
                                        let target = guilds[0].roles.get(v.id);
                                        if (!target) return;
                                        return {id: guilds[1].roles.find(r => r.name ==target.name) ||guilds[1].id, allow: v.allow || 0, deny: v.deny || 0}
                                    }).filter(v => v), position: category.position})
                            .then(c => {
                                log(`Criado categoria: ${c.name}`,1)
                            })
                        })

                    for (let channel of itens.text) {
                        if (guilds[1].channels.get(channel.id)) continue;
                        
                        if (!channel.parent) {
                            if (channel.topic)
                                await guilds[1].createChannel(channel.name, {type: "text", permissionOverwrites: channel.permissionOverwrites.map(v => {let target = guilds[0].roles.get(v.id);
                                            if (!target) return;

                                            return {id: guilds[1].roles.find(r => r.name == target.name) || guilds[1].id, allow: v.allow || 0, deny: v.deny || 0}}).filter(v => v), position: channel.position
                                        }).then(c => c.setTopic(channel.topic))
                                    
                                    } else {
                                        
                                        let chn = await guilds[1].createChannel(channel.name, {type: "text", permissionOverwrites: channel.permissionOverwrites.map(v => {
                                        let target = guilds[0].roles.get(v.id);
                                        if (!target) return;
                                        return {id: guilds[1].roles.find(r =>r.name == target.name) ||guilds[1].id, allow: v.allow || 0, deny: v.deny || 0};
                                    })
                                    
                                    .filter(v => v), position: channel.position})

                            if (channel.topic) chn.setTopic(channel.topic);
                            if (guilds[1].channels.find(c => c.name == channel.parent.name))
                            chn.setParent(guilds[1].channels.find(c => c.name == channel.parent.name).id)

                            else {
                                var cat = await guilds[1].createChannel(channel.parent.name, {type: "category", permissionOverwrites: channel.permissionOverwrites.map(v => {
                                                let target = guilds[0].roles.get(v.id);
                                                if (!target) return;
                                                return {
                                                    id: guilds[1].roles.find(r => r.name ==target.name) ||guilds[1].id, allow: v.allow || 0, deny: v.deny || 0}
                                            })

                                            .filter(v => v), position: channel.position})
                                            
                                            chn.setParent(cat)
                                        }
                                    }
                                    
                                    log(`Canal criado: ${channel.name}`, 1)
                                }
                    
                    for (let channel of itens.voice) {
                        if (guilds[1].channels.get(channel.id)) continue;
                        
                        if (!channel.parent) {
                            if (channel.topic)
                                await guilds[1].createChannel(channel.name, {type: "voice", permissionOverwrites: channel.permissionOverwrites.map(v => {
                                            let target = guilds[0].roles.get(v.id);
                                            if (!target) return;
                                            return {id: guilds[1].roles.find(r =>r.name == target.name) ||guilds[1].id, allow: v.allow || 0, deny: v.deny || 0
                                            }
                                        })

                                        .filter(v => v), position: channel.position, userLimit: channel.userLimit})
                                    
                                    } else {

                            let chn = await guilds[1].createChannel(channel.name, {type: "voice", permissionOverwrites: channel.permissionOverwrites.map(v => {
                                        let target = guilds[0].roles.get(v.id);
                                        if (!target) return;
                                        return {id: guilds[1].roles.find(r =>r.name == target.name) ||guilds[1].id, allow: v.allow || 0, deny: v.deny || 0
                                        };
                                    })

                                    .filter(v => v), position: channel.position, userLimit: channel.userLimit})
                            

                            if (guilds[1].channels.find(c => c.name == channel.parent.name))
                                chn.setParent(guilds[1].channels.find(c => c.name == channel.parent.name).id)


                            else {
                                var cat = await guilds[1].createChannel(channel.parent.name, {type: "category", permissionOverwrites: channel.permissionOverwrites.map(v => {let target = guilds[0].roles.get(v.id);

                                                if (!target) return;
                                                return {id: guilds[1].roles.find(r => r.name ==target.name) ||guilds[1].id, allow: v.allow || 0, deny: v.deny || 0}

                                            })

                                            .filter(v => v), position: channel.position})
                                            chn.setParent(cat)
                                        }
                                    }
                                    log(`Canal criado: ${channel.name}`, 1);
                                }
                            });
                
                lofy.login(`${token}`.replace(/"/g, ""))
                .catch((err) => {
                    require('./Fim/index').acabou(2, "\n   [!] Token Invalido!\n   "+err+"\n   [1] Tentar Novamente\n   [2] Sair".red, "", readline, "", "", "bot-nuker", "")
                })

                })})})

                }
            
            async function Logclean() {
                console.clear();
                console.log(`\n\n
     ██████╗██╗      ██████╗ ███╗   ██╗███████╗██████╗ 
    ██╔════╝██║     ██╔═══██╗████╗  ██║██╔════╝██╔══██╗
    ██║     ██║     ██║   ██║██╔██╗ ██║█████╗  ██████╔╝
    ██║     ██║     ██║   ██║██║╚██╗██║██╔══╝  ██╔══██╗
    ╚██████╗███████╗╚██████╔╝██║ ╚████║███████╗██║  ██║
     ╚═════╝╚══════╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝
  \n\n
                `.magenta);
        }
            
            async function log(message, type) {
                switch (type) {
                case 1:
                    await console.log(`   [V] ${message}`.green);
                    break;
                case 2:
                    await console.log(`   [!] ${message}`.yellow);
                    break;
                case 3:
                    await console.log(`   [X] ${message}`.red);
                    break;
                }
            }

            corrida()
        }
