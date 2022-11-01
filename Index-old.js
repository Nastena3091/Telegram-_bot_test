const {Telegraf, Markup} = require("telegraf");
const BOT_TOKEN = "5745685658:AAGbmxZLX8ewwlziW6MgCjFG7g7Om1U4kOA";
const bot = new Telegraf(BOT_TOKEN);
const axios = require("axios");
let offset,
    actor="",
    poster,
    title,
    year,
    synopsis,
    genre="",
    max=11322,
    total=11322,
    typeOption="Movie";
    
var data_from_server = {};
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

bot.start((ctx) => {
    ctx.reply("Оберіть фільм або серіал")
});

bot.hears(/Привіт+/i,ctx => {
    ctx.reply("\u{1F44B}")
});

bot.hears(/Жанр+/i,ctx => {
    if(typeOption=="movie"){
        ctx.replyWithHTML( "Оберіть жанр фільму" , {
            reply_markup : {
                inline_keyboard: [
                    [{text : "Бойовик", callback_data:"action"}, {text : "Аніме", callback_data: "anime"}],
                    [{text : "Комедія", callback_data: "classicComedies"}, {text : "Драма", callback_data: "drama"}],
                    [{text : "Сімейний", callback_data: "childrenFamilyFilms"}, {text : "Жахи", callback_data: "horrorFilms"}],
                    [{text : "Мюзикл", callback_data: "musicMusicals"}, {text : "Романтика", callback_data: "romanticFilmsBasedBook"}],
                    [{text : "Наукова фантастика", callback_data: "sci-Fi"}, {text : "Трилер", callback_data: "actionThrillers"}],
                    [{text : "Військовий", callback_data: "militaryFilms"}, {text : "Фантастика", callback_data: "fantasy"}],
                    [{text : "Кримінальний", callback_data: "crimeFilms"}, {text : "Культовий", callback_data: "cultFilms"}],
                    [{text : "Сучасний класичний", callback_data: "modernClassicMovies"}, {text : "Документальний", callback_data: "documentaries"}],
                    [{text : "Святковий", callback_data: "festiveFavourites"}],
                    [{text : "Нічого", callback_data: "noneGenre"}],
                ]
            }
        })
    } else {
        ctx.replyWithHTML( "Оберіть жанр серіалу" , {
            reply_markup : {
                inline_keyboard: [
                    [{text : "ТB програма", callback_data: "TVProgrammesBasedBooks"}],
                    [{text : "Дорама", callback_data: "k-dramas"}],
                    [{text : "Аніме", callback_data: "anime"}],
                    [{text : "Романтика", callback_data: "romanticTVDramas"}],
                    [{text : "Кримінал", callback_data: "crimeTVDramas"}],
                    [{text : "Нічого", callback_data: "noneGenre"}]
                ]
            }
        })
    }
});

bot.action("action", ctx=>{
    ctx.reply("Бойовик");
    genre="801362";
    max=341;
})
bot.action("anime", ctx=>{
    ctx.reply("Аніме");
    genre="7424";
    max=133;
})
bot.action("classicComedies", ctx=>{
    ctx.reply("Комедія");
    genre="31694";
    max=34;
})
bot.action("drama", ctx=>{
    ctx.reply("Драма");
    genre="5763";
    max=4708;
})
bot.action("childrenFamilyFilms", ctx=>{
    ctx.reply("Сімейний");
    genre="783";
    max=1036;
})
bot.action("horrorFilms", ctx=>{
    ctx.reply("Жахи");
    genre="8711";
    max=750;
})
bot.action("musicMusicals", ctx=>{
    ctx.reply("Мюзикл");
    genre="52852";
    max=452;
})
bot.action("romanticFilmsBasedBook", ctx=>{
    ctx.reply("Романтика");
    genre="3830";
    max=43;
})
bot.action("sci-Fi", ctx=>{
    ctx.reply("Наукова фантастика");
    genre="108533";
    max=108;
})
bot.action("actionThrillers", ctx=>{
    ctx.reply("Трилер");
    genre="43048";
    max=646;
})
bot.action("TVProgrammesBasedBooks", ctx=>{
    ctx.reply("ТВ програма");
    genre="1819174";
    max=369;
})
bot.action("militaryFilms", ctx=>{
    ctx.reply("Військовий");
    genre="5962";
    max=93;
})
bot.action("crimeFilms", ctx=>{
    ctx.reply("Кримінальний");
    genre="5824";
    max=1311;
})
bot.action("cultFilms", ctx=>{
    ctx.reply("Культовий");
    genre="7627";
    max=53;
})
bot.action("documentaries", ctx=>{
    ctx.reply("Документальний");
    genre="6839";
    max=299;
})
bot.action("fantasy", ctx=>{
    ctx.reply("Фантастика");
    genre="9744";
    max=254;
})
bot.action("festiveFavourites", ctx=>{
    ctx.reply("Святковий");
    genre="107985";
    max=8;
})
bot.action("k-dramas", ctx=>{
    ctx.reply("Дорама");
    genre="58";
    max=11322;
})
bot.action("romanticTVDramas", ctx=>{
    ctx.reply("Романтика");
    genre="26056";
    max=300;
})
bot.action("сrimeTVDramas", ctx=>{
    ctx.reply("Кримінал");
    genre="26009";
    max=225;
})
bot.action("modernClassicMovies", ctx=>{
    ctx.reply("Сучасний класичний");
    genre="76186";
    max=22;
})
bot.action("noneGenre", ctx=>{
    ctx.reply("Нічого");
    genre="";
    max=11322;
})
bot.hears(/Фільм+/i,ctx => {
    typeOption="movie";
    genre="";
    max=11322;
    ctx.reply("Обрано фільм, виберіть жанр або натисніть кнопку 'Обрати'")
})
bot.hears(/Серіал+/i,ctx => {
    typeOption="series";
    genre="";
    max=3338;
    ctx.reply("Обрано серіал, виберіть жанр або натисніть кнопку 'Обрати'")
})
bot.hears(/Обрати+/i,ctx => {
    offset=getRandomInt(max);
    let param;
    if (genre){
        param={limit: '1', offset: offset, order_by: 'title', genre_list: genre, type: typeOption}
    } else {
        param={limit: '1', offset: offset, order_by: 'title', type: typeOption}
    }
    if (total!=max){
        max=total;
    }
    const options = {
        method: 'GET',
        url: 'https://unogs-unogs-v1.p.rapidapi.com/search/titles',
        params: param,
        headers: {
            'X-RapidAPI-Key': '446a849920msh40579f805fb4bffp15077ajsn780f820fb8f3',
            'X-RapidAPI-Host': 'unogs-unogs-v1.p.rapidapi.com'
        }
    }
    axios.request(options)
    .then(function (response) {
        console.log(response.data);
        data_from_server=response.data;
       // total=data_from_server.object.total;
        poster=data_from_server.results[0].img != '' ? data_from_server.results[0].img : "/Плакат.jpg";
        title=data_from_server.results[0].title;
        netflixID=data_from_server.results[0].netflix_id;
        year=data_from_server.results[0].year != '' ? data_from_server.results[0].year: "Немає інформації";
        synopsis=data_from_server.results[0].synopsis != '' ? data_from_server.results[0].synopsis: "Немає інформації";
        console.log(data_from_server);
        ctx.replyWithPhoto({ url: poster }, { caption: title + " (" + year + ")"})
        ctx.replyWithHTML("Детальна інформація",{
            reply_markup : {
                inline_keyboard: [
                    [{text : "Опис", callback_data:"synopsis"}, {text : "Актори", callback_data: "actor"}],
                ]
            }
        })
    })
    .catch(function (error) {
        console.error(error);
    })
})
bot.action("synopsis", ctx=>{
    ctx.reply(synopsis);
})
bot.action("actor", ctx=>{
    const options = {
    method: 'GET',
    url: 'https://unogs-unogs-v1.p.rapidapi.com/search/people',
    params: {person_type: 'Actor', netflix_id: netflixID},
    headers: {
        'X-RapidAPI-Key': '446a849920msh40579f805fb4bffp15077ajsn780f820fb8f3',
        'X-RapidAPI-Host': 'unogs-unogs-v1.p.rapidapi.com'
    }
    };
    axios.request(options)
    .then(function (response) {
        console.log(response.data)
        totalActor=response.data.Object.total;
        actor="";
        for(let i=0 ; i < totalActor;i++){
            actor+=response.data.results[i].full_name+"\n"
        }
        ctx.reply(actor)
    }).catch(function (error) {
        console.error(error)
    });
});
bot.on('message', (ctx) => {
    ctx.reply('Меню бота', {
        reply_markup: Markup.keyboard([
            ['Фільм','Серіал'],
            ['Жанр'],
            ['Обрати']
        ])
    })    
});


bot.launch();