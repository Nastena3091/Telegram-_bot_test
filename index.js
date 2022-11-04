const {Telegraf} = require("telegraf");
const { Keyboard, Key} = require('telegram-keyboard')
const BOT_TOKEN = "5745685658:AAGbmxZLX8ewwlziW6MgCjFG7g7Om1U4kOA";
const bot = new Telegraf(BOT_TOKEN);
const axios = require("axios");
const  translate  =  require ( 'translate-google' ); 

let offset,
    actors,
    directors,
    max=11322,
    Total=11322,
    typeOption="Movie",
    totalActor,
    netflixID;

let genreOfMovies = [{type: "action", title: "Бойовик", id: 801362}, {type: "classicComedies", title: "Комедія", id:31694},
{type: "anime", title: "Аніме", id: 7424}, {type: "drama", title: "Драма", id: 5763},
{type: "childrenFamilyFilms", title: "Сімейний", id: 783}, {type: "horrorFilms", title: "Жахи", id: 8711},
{type: "musicMusicals", title: "Мюзикл", id: 52852}, {type: "romanticFilmsBasedBook", title: "Романтика", id: 3830},
{type: "sci-Fi", title: "Наукова фантастика", id: 108533}, {type: "actionThrillers", title: "Трилер", id: 43048},
{type: "militaryFilms", title: "Військовий", id: 5962}, {type: "crimeFilms", title: "Кримінальний", id: 5824},
{type: "cultFilms", title: "Культовий", id: 7627},{type: "documentaries", title: "Документальний", id: 6839},
{type: "fantasy", title: "Фантастика", id: 9744}, {type: "festiveFavourites", title: "Святковий", id: 107985}];
let genreOfSeries = [{type: "TVProgrammesBasedBooks", title: "ТВ програма", id: 1819174}, {type: "k-dramas", title: "Дорама", id: 2638104},
{type: "anime", title: "Аніме", id: 7424}, {type: "romanticTVDramas", title: "Романтика", id: 26056},
{type: "сrimeTVDramas", title: "Кримінал", id: 26009},]
let genreFromServer = [];    
var data_from_server = {};

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getDataFromServer(genre, typeOption) { 
    offset=getRandomInt(max);
    if (genre != 0)
        param={limit: '1', offset: offset, order_by: 'title', genre_list: genre, type: typeOption}
    else{
        param={limit: '1', offset: offset, order_by: 'title', type: typeOption}
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
    return axios.request(options)
        .then(function (response) {
            console.log(response.data);
            data_from_server=response.data.results[0];
            Total=response.data.Object.total;
            max=Total

        })
        .catch(function (error) {
            console.error(error);
        });
}

function getGenres() {
    const options = {
        method: 'GET',
        url: 'https://unogs-unogs-v1.p.rapidapi.com/static/genres',
        headers: {
            'X-RapidAPI-Key': '446a849920msh40579f805fb4bffp15077ajsn780f820fb8f3',
            'X-RapidAPI-Host': 'unogs-unogs-v1.p.rapidapi.com'
        }
    };
    axios.request(options).then(function (response) {
        genreFromServer = response.data;    
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}
function getRunTime(runtime) {
    let hour;
    let minute;
    let second;
    hour=Math.floor(runtime/3600);
    minute=Math.floor(runtime%3600/60);
    second=runtime-(minute*60+hour*3600)
    return hour+" : "+minute+" : "+second
}
bot.start(async (ctx) => {
    const keyboard = Keyboard.make([
      ['Фільм', 'Серіал']
    ])
  
    await ctx.reply("Оберіть фільм або серіал", keyboard.reply())
  })

bot.hears(/Привіт+/i,ctx => {
    ctx.reply("\u{1F44B}")
});
bot.hears(/Фільм+/i, ctx=>{
    let arrayOfBtnGenre1 = [];
    let arrayOfBtnGenre2 = [];
    let arrayOfBtnGenre3 = [];
    let arrayOfBtnGenre4 = [];
    let arrayOfBtnGenre5 = [];
    let arrayOfBtnGenre6 = [];
    let i = 1;
    typeOption="Movie";
    genreOfMovies.forEach(element => {
        switch(i){
            case 1 :
            {
                arrayOfBtnGenre1.push({text : element.title, callback_data: "getMoviesByGenre-"+element.id})
                i++
                break;
            }
            case 2 :
            {
                arrayOfBtnGenre2.push({text : element.title, callback_data: "getMoviesByGenre-"+element.id})
                i++
                break;
            }
            case 3 :
            {
                arrayOfBtnGenre3.push({text : element.title, callback_data: "getMoviesByGenre-"+element.id})
                i++
                break;
            }
            case 4 :
            {
                arrayOfBtnGenre4.push({text : element.title, callback_data: "getMoviesByGenre-"+element.id})
                i++
                break;
            }
            case 5 :
            {
                arrayOfBtnGenre5.push({text : element.title, callback_data: "getMoviesByGenre-"+element.id})
                i++
                break;
            }
            case 6:
            {
                arrayOfBtnGenre6.push({text : element.title, callback_data: "getMoviesByGenre-"+element.id})
                i=1
                break;
            }
        }
    });
    ctx.replyWithHTML( "Оберіть, будь ласка, жанр:" , {
        reply_markup : {
            inline_keyboard: [
                arrayOfBtnGenre1,
                arrayOfBtnGenre2,
                arrayOfBtnGenre3,
                arrayOfBtnGenre4,
                arrayOfBtnGenre5,
                arrayOfBtnGenre6,
                [{text: "Нічого", callback_data:"getMoviesByGenre-"+0}]
            ]
        }
    });
})
bot.hears(/Серіал+/i,async (ctx)=>{
    let arrayOfBtnGenre1 = [];
    let arrayOfBtnGenre2 = [];
    let arrayOfBtnGenre3 = [];
    let arrayOfBtnGenre4 = [];
    let arrayOfBtnGenre5 = [];
    let arrayOfBtnGenre6 = [];
    let i = 1;
    typeOption="Series";
    genreOfSeries.forEach(element => {
        switch(i){
            case 1 :
            {
                arrayOfBtnGenre1.push({text : element.title, callback_data: "getMoviesByGenre-"+element.id})
                i++
                break;
            }
            case 2 :
            {
                arrayOfBtnGenre2.push({text : element.title, callback_data: "getMoviesByGenre-"+element.id})
                i++
                break;
            }
            case 3 :
            {
                arrayOfBtnGenre3.push({text : element.title, callback_data: "getMoviesByGenre-"+element.id})
                i++
                break;
            }
            case 4 :
            {
                arrayOfBtnGenre4.push({text : element.title, callback_data: "getMoviesByGenre-"+element.id})
                i++
                break;
            }
            case 5 :
            {
                arrayOfBtnGenre5.push({text : element.title, callback_data: "getMoviesByGenre-"+element.id})
                i++
                break;
            }
            case 6:
            {
                arrayOfBtnGenre6.push({text : element.title, callback_data: "getMoviesByGenre-"+element.id})
                i=1
                break;
            }
        }
    });
    ctx.replyWithHTML( "Оберіть, будь ласка, жанр:" , {
        reply_markup : {
            inline_keyboard: [
                arrayOfBtnGenre1,
                arrayOfBtnGenre2,
                arrayOfBtnGenre3,
                arrayOfBtnGenre4,
                arrayOfBtnGenre5,
                arrayOfBtnGenre6,
                [{text: "Нічого", callback_data:"getMoviesByGenre-"+0}]
            ]
        }
    })
})
bot.action(/^getMoviesByGenre-(\d+)$/, async (ctx) => {
    console.log(ctx.match[1]);
    ctx.reply("Зачекайте, будь ласка...")
    await getDataFromServer(ctx.match[1], typeOption)
    await console.log(max)
    await getDataFromServer(ctx.match[1], typeOption)
    await ctx.replyWithPhoto({ url: data_from_server.img })
    const keyboard = await Keyboard.make([
        Key.callback("Опис", 'synopsis'),
        Key.callback('Брали участь', 'actor'),
        Key.callback('Жанри фільму', 'genre'),
      ],{columns: 1})
      if(typeOption=="Series") {
        await ctx.replyWithHTML( data_from_server.title + " (" + data_from_server.year + ")", {
            reply_markup : {
                inline_keyboard: [
                    [{text : "Дивитися зараз", url : "https://www.imdb.com/title/"+data_from_server.imdb_id+"/"}],
                    [{text : "Опис", callback_data: "synopsis"}],
                    [{text : "Брали участь", callback_data: "actor"}],
                    [{text : "Жанри фільму", callback_data: "genre"}],
                ]
            }
        });
      }
      else {
        await ctx.replyWithHTML( data_from_server.title + " (" + data_from_server.year + ")\nТривалість:   "+getRunTime(data_from_server.runtime) , {
                reply_markup : {
                    inline_keyboard: [
                        [{text : "Дивитися зараз", url : "https://www.imdb.com/title/"+data_from_server.imdb_id+"/"}],
                        [{text : "Опис", callback_data: "synopsis"}],
                        [{text : "Брали участь", callback_data: "actor"}],
                        [{text : "Жанри фільму", callback_data: "genre"}],
                    ]
                }
            });
      }
      
})
bot.action("synopsis", ctx=>{
    translate ( data_from_server.synopsis ,  { to : 'uk' } ) . then ( res  =>  { 
        ctx.reply(
            data_from_server.synopsis +"\n Переклад: \n" + res
        )
        console.log(res) 
    } ) . catch ( err  =>  { 
        console . error ( err ) 
    } )
})
bot.action("actor", ctx=>{
    netflixID=data_from_server.netflix_id
    const options = {
        method: 'GET',
        url: 'https://unogs-unogs-v1.p.rapidapi.com/search/people',
        params: {person_type: 'Actor', netflix_id: netflixID},
        headers: {
          'X-RapidAPI-Key': '446a849920msh40579f805fb4bffp15077ajsn780f820fb8f3',
          'X-RapidAPI-Host': 'unogs-unogs-v1.p.rapidapi.com'
        }
      };
      if(netflixID!=0){
        axios.request(options)
        .then(function (response) {
            console.log(response.data)
            let data_from_server_actor=response.data.results;
            actors="Актори: \n";
            let actor='';
            let director='';
            directors="Режисер:\n";
            data_from_server_actor.forEach(element=>{
                if(element.person_type=="Actor" && actor!=element.full_name){
                    actors+=element.full_name+"\n"
                    actor=element.full_name
                }
                if(element.person_type=="Director" && director!=element.full_name){
                    directors+=element.full_name+"\n"
                    director=element.full_name
                }
            })
            if(directors=="Режисер:\n") {ctx.reply(actors)}
            else {ctx.reply(actors+directors)}
            netflixID=0;
            console.log(actors)
        })
        .catch(function (error) {
            console.error(error)
        });
      } else {
        if(directors=="Режисер:\n") {ctx.reply(actors)}
            else {ctx.reply(actors+directors)}
      }
    
});
bot.action("genre", ctx=>{
    netflixID=data_from_server.netflix_id
    const options = {
        method: 'GET',
        url: 'https://unogs-unogs-v1.p.rapidapi.com/title/genres',
        params: {netflix_id: netflixID},
        headers: {
          'X-RapidAPI-Key': '446a849920msh40579f805fb4bffp15077ajsn780f820fb8f3',
          'X-RapidAPI-Host': 'unogs-unogs-v1.p.rapidapi.com'
        }
      };
      
      axios.request(options)
      .then(function (response) {
            console.log(response.data);
            let data_from_server_genre=response.data.results;
            let genres="";
            data_from_server_genre.forEach(element=>{
                genres+=element.genre+"\n"
                })
            ctx.reply(genres)
            console.log(genres)
      })
      .catch(function (error) {
          console.error(error);
      });
})

bot.launch();