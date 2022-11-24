module.exports.self = function () {
process.title = "Lofy Multi Tools - Limpador"
const {Client} = require("discord.js-selfbot-v11"),
client = new Client(),
colors = require("colors"),
request = require("request"),
json = require("../Arquivos Config/config.json"),
readline = require("readline").createInterface({input: process.stdin,output: process.stdout})

process.on("unhandledRejection", e => {})
process.on("uncaughtException", e => {})
process.on("uncaughtRejection", e => {})
process.warn = () => {}

console.clear()
console.log(`\n\n
     ██╗     ██╗███╗   ███╗██████╗  █████╗ ██████╗  ██████╗ ██████╗ 
     ██║     ██║████╗ ████║██╔══██╗██╔══██╗██╔══██╗██╔═══██╗██╔══██╗
     ██║     ██║██╔████╔██║██████╔╝███████║██║  ██║██║   ██║██████╔╝
     ██║     ██║██║╚██╔╝██║██╔═══╝ ██╔══██║██║  ██║██║   ██║██╔══██╗
     ███████╗██║██║ ╚═╝ ██║██║     ██║  ██║██████╔╝╚██████╔╝██║  ██║
     ╚══════╝╚═╝╚═╝     ╚═╝╚═╝     ╚═╝  ╚═╝╚═════╝  ╚═════╝ ╚═╝  ╚═╝
\n\n
`.magenta);

function printClear() {
    console.log(`\n     [O] ${client.user.tag} | use: '${json.Cleaner.gatilho}' em qualquer chat. •`.brightCyan)
}

function clear(authToken, authorId, channelId) {
    const wait = async ms => new Promise(done => setTimeout(done, ms));
    const headers = {Authorization: authToken};
    const recurse = before => {
        let params = before ? `?before=${before}` : ``;

        request({url: `https://discord.com/api/v9/channels/${channelId}/messages${params}`, headers: headers, json: true}, async (error, response, result) => {


                if (response === undefined) {
                    return recurse(before);
                }
                

                if (response.statusCode === 202) {
                    const w = response.retry_after;
                    console.log(`     [!] Ops, canal não indexado, aguarde ${w} ms para indexar as mensagens.`.red)
                    await wait(w);
                    return recurse(before);
                }
                

                if (response.statusCode !== 200) {
                    return console.log("     [!] Aguardando API!".blue, result);
                }
                

                for (let i in result) {
                    let message = result[i];
                    
                    if (message.author.id === authorId && message.type !== 3) {
                        await new Promise(resolve => {
                            const deleteRecurse = () => {
                                request.delete({url: `https://discord.com/api/v9/channels/${channelId}/messages/${message.id}`, headers: headers, json: true}, async (error, response,
                                result) => {
                                    if (error) {
                                            return deleteRecurse();
                                        }
                                        if (result) {
                                            if (result.retry_after !== undefined) {
                                                console.log(`     [!] Rate-limited! Espere ${result.retry_after} ms para continuar a limpeza.`);
                                                await wait
                                                    (result.retry_after *1000);
                                                return deleteRecurse();
                                            }}
                        
                                        resolve()

                                    })}

                            deleteRecurse()

                        });
                    }}
                
                if (result.length === 0) {
                    console.log(`\n\n     [V] Pronto!\n     [!] Use quando quiser para limpar as mensagens!`.magenta)
                } else {
                    recurse(result[result.length - 1].id);
                }}
            )}

    recurse()
}


client.on("ready", async () => {
    printClear();
});


client.on("message", async message => {
    if (message.author.id != client.user.id) return;
    if (message.content.toLowerCase() === json.Cleaner.gatilho) {
        message.delete()
        clear(json.token_conta, client.user.id, message.channel.id);
        console.log(`     [!] `+json.Cleaner.gatilho+` detectado - Iniciando o processo de limpeza ....`.green)
    }
});


client.on("warn", () => {});
client.on("error", () => {});


client.login(json.token_conta)
.catch((err) => {
    require('./Fim/index').acabou(2, "\n   [!] Token Invalido!\n   "+err+"\n   [1] Tentar Novamente\n   [2] Sair".red, "", readline, "", "", "limpador", "")
})
}
