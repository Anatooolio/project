const { Telegraf } = require('telegraf')
const axios = require('axios')
const { message } = require('telegraf/filters')
require('dotenv').config()

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start(async (ctx) => {
    ctx.reply('Привет! Тебе надоели обычные погодники? Или тебя они постоянно обманывают? Я решил эту задачу. Просто отправь мне свою геопозицию перед выходом из дома и я тебе расскажу всю правду о том, что творится на улице!')
})
bot.on('message', async(ctx_obj) => {
    if(ctx_obj.message.location)
    {
        console.log(ctx_obj.message.location);
        const url1 = `http://api.weatherapi.com/v1/current.json?key=7f43d12ed15e46ef85993623242409&q=${ctx_obj.message.location.latitude},${ctx_obj.message.location.longitude}&aqi=no`;
        const responce = await axios.get(url1);
        console.log(responce.data.location.name, responce.data.location.localtime, responce.data.current.temp_c, responce.data.current.wind_mph, responce.data.current.wind_degree, /*responce.data.current.wind_dir,*/ responce.data.current.condition.text);
        // direction = [ENE]
        // async function direction(w_d)
        // {
        //     let res = []
        //     if(w_d = ENE)
        //     {
        //         res.push('Восточный, Северо - Восточный')
        //         return res
        //     }
        // }
        // await console.log(res);
        ctx_obj.reply(`${responce.data.location.name}. Прогноз за ${responce.data.location.localtime}:\nТемпература: ${responce.data.current.temp_c}°C\nВетер: ${responce.data.current.wind_degree}° ${responce.data.current.wind_mph}м/с \n${responce.data.current.condition.text}`)
    }
})
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))