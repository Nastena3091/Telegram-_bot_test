const Telegraf = require("telegraf").Telegraf;
const BOT_TOKEN = "5745685658:AAGbmxZLX8ewwlziW6MgCjFG7g7Om1U4kOA";
const bot = new Telegraf(BOT_TOKEN);

let data_from_server={};
let date_of_data_from_server="";
let switch_stats="stats";

function getCurrentDate()
{
    var today=new Date();
    var today_day = String(today.getDate()).padStart(2,'0');
    var today_month = String(today.getMonth()+1).padStart(2,'0');
    var today_year = today.getFullYear();
    today = today_year + "-" + today_month + "-" + today_day;
    console.log(today);
    console.log(date_of_data_from_server);
    return today;
}
function getDataFromServer(forceFetch)
{
    if (!forceFetch)
    {
        return;
    }
    return fetch ("https://russianwarship.rip/api/v1/statistics/latest",{
         method:"GET",
         headers:{"Content-Type":"appication/json" }
         })
         .then((res) => res.json())
         .then((data) => {
             data_from_server=data;
             date_of_data_from_server=data_from_server.data.date;
             console.log("Go to server");
         })
         .catch((er) => {
             console.log('Error: ${er}');
         })
    
}

bot.start(ctx => {
    ctx.reply("Вітаємо в нашому боті.");
    ctx.replyWithHTML( "Wellcome" , {
        reply_markup : {
            inline_keyboard: [
                [{text : "Get last statistic", url: "https://russianwarship.rip"}],
                [{text : "Get all by day", callback_data: "getAllByDay"}],
                [{text : "Get last statistic", callback_data: "getAll"}],
            ]
        }
    });

});
bot.action("getAllByDay", ctx=>{
    ctx.reply("Get all by day");
    switch_stats="increase";
})
bot.action("getAll", ctx=>{
    ctx.reply("Get all");
    switch_stats="stats";
})
bot.hears(/[A-Z]+/i,async ctx => {
    let message = ctx.message.text;
    console.log(message);
    await getDataFromServer(date_of_data_from_server!=getCurrentDate());
    ctx.reply(message +": "+data_from_server.data[switch_stats][message]);
})

bot.hears(/Привіт+/i,ctx => {
    ctx.reply("\u{1F44B}")
});
bot.launch();