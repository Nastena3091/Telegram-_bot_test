const Telegraf = require("telegraf").Telegraf;
const BOT_TOKEN = "5745685658:AAGbmxZLX8ewwlziW6MgCjFG7g7Om1U4kOA";
const bot = new Telegraf(BOT_TOKEN);

let data_from_server =[];
bot.start(ctx => {
    ctx.reply("Вітаємо в нашому боті.")
});

bot.hears(/[A-Z]+/i, (ctx) => {
    let message = ctx.message.text;
    console.log(message);
    fetch ("https://russianwarship.rip/api/v1/statistics/latest",{
        method:"GET",
        headers:{"Content-Type":"appication/json" }
})
    .then((res) => res.json())
    .then((data) => {
    ctx.reply(message +": "+data.data.stats[message]);
    })
    .catch((er) => {
        console.log('Error: ${er}');
    })
})

bot.hears(/Привіт+/i,ctx => {
    ctx.reply("\u{1F44B}")
});
bot.launch();