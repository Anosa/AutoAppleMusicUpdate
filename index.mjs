import {writeFileSync,readFileSync,existsSync} from 'fs';
import { getPlayList } from 'get-apple-music-playlist';


async function getJSON(url) {
  let writefile=true
  try {
    await getPlayList(url).then(res => {
        const result=JSON.stringify(res,(key,value)=>{
          if (typeof value === 'function') {
            return value();
          }
          return value; 
        })
        if (existsSync('.appleMusic.json')){
            const origin=JSON.parse(readFileSync('.appleMusic.json')).lastEditDate
            if (res.lastEditDate===origin){
                console.log("no differ, abort.")
                writefile=false;
              }
        }
        if (writefile) {
            writeFileSync(".appleMusic.json",result,{flag:"w"});
            console.log("new .appleMusic.json file created.")
        }
      })
  } catch(error) {
    console.error(error); 
  }
}

getJSON("https://music.apple.com/us/playlist/%E5%8A%9E%E5%85%AC%E5%AE%A4-dj/pl.f820ed7063f9447f8751abf885525698?l=zh-Hans-CN");