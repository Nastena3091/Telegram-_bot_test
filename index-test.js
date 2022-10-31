

// let data_from_server={};
// let date_of_data_from_server="";
// let switch_stats="stats";

// function getDataFromServer(forceFetch)
// {
//     if (!forceFetch)
//     {
//         return;
//     }
//     return fetch ("https://russianwarship.rip/api/v1/statistics/latest",{
//          method:"GET",
//          headers:{"Content-Type":"appication/json" }
//          })
//          .then((res) => res.json())
//          .then((data) => {
//              data_from_server=data;
//              date_of_data_from_server=data_from_server.data.date;
//              console.log("Go to server");
//          })
//          .catch((er) => {
//              console.log('Error: ${er}');
//          })
    
// }

// bot.on('message', msg => {
//     const chatId=msg.chat.id
//     bot.sendMessage(chatId, 'Клавиатура', {
//         reply_markup: {
//             keyboard: [
//         ['Фільм','Серіал'],
//         ['налаштування']
//     ]}})
// });
// bot.action("getAllByDay", ctx=>{
//     ctx.reply("Get all by day");
//     switch_stats="increase";
// })
// bot.action("getAll", ctx=>{
//     ctx.reply("Get all");
//     switch_stats="stats";
// })
// bot.hears(/[A-Z]+/i,async ctx => {
//     let message = ctx.message.text;
//     console.log(message);
//     await getDataFromServer(date_of_data_from_server!=getCurrentDate());
//     ctx.reply(message +": "+data_from_server.data[switch_stats][message]);
// })

// poster=response.data.poster,
//         title=response.data.title,
//         year=response.data.year,
//         synopsis=response.data.synopsis;
// bot.start(ctx=> {
//     ctx.reply("Вітаємо в нашому боті!")
//     ctx.replyWithHTML( "Welcome" , {
//         reply_markup : {
//             inline_keyboard: [
//                 [{text : "Get last statistic", url: "https://russianwarship.rip"}],
//                 [{text : "Get all by day", callback_data: "getAllByDay"}],
//                 [{text : "Get all statistic", callback_data: "getAll"}],
//             ]
//         }
//     });
// });