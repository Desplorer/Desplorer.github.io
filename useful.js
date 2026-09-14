function hello()
{
	console.log('hello')
	alert('hello')
}
function checkCompatMode()
{
	let mode=0;
	if(document.compatMode === "BackCompat")
	{
		mode=0;
    }
  	else
 	{
 	   mode=1;
	}
 	if(mode === 0)
	{
 	    alert('BackCompat');
		console.log('BackCompat')
	}
 	else
 	{
 	    alert('CSS1Compat');
	    console.log('CSS1Compat');
	}
}
function helloOnlyConsole()
{
	console.log('hello');
}
function helloOnlyReturn()
{
	const helloyeahyeah = "Hello! ";
	return helloyeahyeah;
}
function getPicture() {
	const width = 400;
	const height = 300;
	const randomNum = Math.random();
	const picInside = document.createElement('img');
	picInside.src = 'https://picsum.photos/'+width+'/'+height+'?random='+randomNum;
	picInside.alt = '随机高清图片';
	picInside.style.width = '200px';
	picInside.style.margin = '10px';
	document.body.appendChild(picInside);
	console.log(picInside.src);
}
async function getDogPic() {
	try {
		const response = await fetch(`https://dog.ceo/api/breeds/image/random`);
		if (!response.ok) throw new Error('获取狗图失败');
		const picResponse = await response.json();
		const picOut = document.createElement('img');
		picOut.src = picResponse.message;
		picOut.style.width = '200px';
		picOut.style.margin = '10px';
		document.body.appendChild(picOut);
		console.log(picOut.src);
		console.log(picResponse.status);
	} catch (error) {
		alert('Sorry, but something wrong happened while getting the dog image. Please retry later. ');
		console.log('Error: ', error);
	}
}
async function getCatPic() {
	try {
		const catrespo = await fetch(`https://api.thecatapi.com/v1/images/search`);
		if (!catrespo.ok) throw new Error('获取猫图失败');
		const catPicResponse = await catrespo.json();
		const catPicOut = document.createElement('img');
		catPicOut.src = catPicResponse[0].url;
		catPicOut.style.width = '200px';
		catPicOut.style.margin = '10px';
		document.body.appendChild(catPicOut);
		console.log(catPicOut.src);
		console.log(catPicResponse.id);
	} catch (error) {
		alert('Sorry, but something wrong happened while getting the cat image. Please retry later. ');
		console.log('Error: ', error);
	}
}
async function catYes() {
	try {
		const catrespo = await fetch(`https://api.thecatapi.com/v1/images/search`);
		if (!catrespo.ok) throw new Error('获取猫图失败');
		const catPicResponse = await catrespo.json();
		const catPicOut = document.getElementById('allpic');
		catPicOut.src = catPicResponse[0].url;
		console.log(catPicOut.src);
		console.log(catPicResponse[0].id);
	} catch (error) {
		alert('Sorry, but something wrong happened while getting the cat image. Please retry later. ');
		console.log('Error: ', error);
	}
}
async function dogYes() {
	try {
		const response = await fetch(`https://dog.ceo/api/breeds/image/random`);
		if (!response.ok) throw new Error('获取狗图失败');
		const picResponse = await response.json();
		const picOut = document.getElementById('allpic');
		picOut.src = picResponse.message;
		console.log(picOut.src);
		console.log(picResponse.status);
	} catch (error) {
		alert('Sorry, but something wrong happened while getting the dog image. Please retry later. ');
		console.log('Error: ', error);
	}
}
function getPic() {
	if(document.getElementById('changeup').checked) {
		const width = 400;
		const height = 300;
		const randomNum = Math.random();
		const picInside = document.getElementById('allpic');
		picInside.src = 'https://picsum.photos/'+width+'/'+height+'?random='+randomNum;
		picInside.alt = '随机高清图片';
		console.log(picInside.src);
	} else {
		getPicture();
	}
}
function getDogPicture() {
	if(document.getElementById('changeup').checked) {
		dogYes();
	} else {
		getDogPic();
	}
}
function getCatPicture() {
	if(document.getElementById('changeup').checked) {
		catYes();
	} else {
		getCatPic();
	}
}
const HFWEATHER_API_KEY = "ad241e5593f148ef90550708fb3a2d59";
async function getWeatherHF() {
	const city = document.getElementById('city').value.trim();
	const hfwres = document.getElementById('result');
	if (!city) { hfwres.textContent = "请输入城市名！"; return; }
	try {
		const hfwrepo = await fetch(`https://nf3h2tcpgy.re.qweatherapi.com/geo/v2/city/lookup?location=${encodeURIComponent(city)}&key=${HFWEATHER_API_KEY}`);
		if (!hfwrepo.ok) throw new Error('通过和风API获取天气数据失败！');
		const hfwrepoyes = await hfwrepo.json();
		console.log(hfwrepoyes);
		if (hfwrepoyes.code !== "200" || !hfwrepoyes.location?.length) {
			hfwres.textContent = "没找到这个城市！";
			return;
		} else if (hfwrepoyes.code === "402"|| hfwrepoyes.code==="403") {
			hfwres.textContent = "访问被限制！";
			return;
		}
		const id = hfwrepoyes.location[0].id;
		const weather = await fetch(`https://nf3h2tcpgy.re.qweatherapi.com/v7/weather/now?location=${id}&key=${HFWEATHER_API_KEY}`);
		const weatherYes = await weather.json();
		console.log(weatherYes);
		const n = weatherYes.now;
		console.log(weatherYes.code);
		hfwres.innerHTML = `观测时间：${n.obsTime.slice(0, 10)}, ${n.obsTime.slice(11,16)}<br>${hfwrepoyes.location[0].name}：<br>🌡 ${n.temp}℃<br>☁️ ${n.text}<br>体感温度：${n.feelsLike}<br>风速：${n.windSpeed}<br>风向：${n.windDir}<br>云量：${n.cloud}<br>能见度：${n.vis}<br>大气压强：${n.pressure}<br>露点温度：${n.dew}<br>降水量：${n.precip}<br>风力等级：${n.windScale}<br>风向角度：${n.wind360}<br>相对湿度：${n.humidity}<br><a href="${weatherYes.fxLink}">查看详情</a>`;
	} catch (error) {
		alert('在获取天气时出错！');
		console.log('Error: ',error);
	}
}
async function getWeatherUapis() {
	const urepo = document.getElementById('uresult');
	try {
		const ufuck = await fetch(`https://uapis.cn/api/v1/misc/weather`);
		if (!ufuck.ok) throw new Error('通过Uapis获取天气失败！');
		const ufucker = await ufuck.json();
		urepo.innerHTML = `省份：${ufucker.province}, <br>市：${ufucker.city}, <br>区：${ufucker.district}, <br>行政区划编码：${ufucker.adcode}, <br>天气：${ufucker.weather}, <br>温度：${ufucker.temperature}°C, <br>风向：${ufucker.wind_direction}, <br>风速：${ufucker.wind_power}, <br>湿度：${ufucker.humidity}%, <br>报告时间：${ufucker.report_time}`;
	} catch (error) {
		alert('通过Uapis获取天气时出错！');
		console.error('Error: ',error);
	}
}
const SANLIANGJU_API_KEY = "Bearer ag_galaTh8Z9vDnePPq27I64HdZQSKNIgW5DFeElUzv_uU";
async function getQRCodeSlj() {
	const sljsize = document.getElementById('sljsize').value;
	const sljdata = document.getElementById('sljdata').value;
	const sljqrurl = "https://tokenc.top/v1/qrcode/?size=" + sljsize + "&data=" + sljdata;
	const unicee = document.getElementById('sljans');
	try {
		const sljqrfuck = await fetch(sljqrurl, {
			headers: {"Authorization": SANLIANGJU_API_KEY }
		});
		if (!sljqrfuck.ok) throw new Error('通过三两句公共API生成二维码失败！');
		const sljqrfucker = await sljqrfuck.json();
		console.log(sljqrfucker.success);
		unicee.innerHTML = `<img src="${sljqrfucker.data.qrImageUrl} alt="qrcode"> <br> <a href="${sljqrfucker.data.qrImageUrl}">点此下载二维码图片</a>`;
	} catch (error) {
		alert('通过三两句API生成二维码时出错！');
		console.error('Error: ',error);
	}
}
async function getNewsSlj() {
	const sljnice = document.getElementById('sljans');
	const sljnewsurl = "https://tokenc.top/v1/zaobao?format=json";
	try {
		const sljnewsfuck = await fetch(sljnewsurl, {
			headers: {"Authorization": SANLIANGJU_API_KEY }
		});
		if (!sljnewsfuck.ok) throw new Error('通过三两句API获取每日早报失败！');
		const sljnewsfucker = await sljnewsfuck.json();
		console.log(sljnewsfucker.success);
		console.log(sljnewsfucker);
		sljnice.innerHTML = `语音播报：<br><audio src="${sljnewsfucker.data.audio}" controls></audio><br>图片简报：<br><img src="${sljnewsfucker.data.image}" alt="新闻图片"><br><a href="${sljnewsfucker.data.image}" download>下载早报图片</a>`;
	} catch (error) {
		alert('通过三两句API获取早报时出错！');
		console.error('Error: ',error);
	}
}
async function getAnswerFuck() {
	const sansbk = document.getElementById('sansbk');
	const sansbkurl = "https://60s.viki.moe/v2/answer?encoding=json";
	try {
		const sfuck = await fetch(sansbkurl);
		if (!sfuck.ok) throw new Error('通过60s API获取答案之书随机值失败！');
		const sfucker = await sfuck.json();
		console.log(sfucker.code);
		console.log(sfucker.message);
		sansbk.innerHTML = `${sfucker.data.answer}<br>${sfucker.data.answer_en}`;
	} catch (error) {
		alert('通过60s API获取答案之书随机值失败！');
		console.error('Error: ',error);
	}
}
async function getBingBgimg() {
	const bingp = document.getElementById('bingp');
	const bingpurl = "https://60s.viki.moe/v2/bing?encoding=json";
	try {
		const bingpfuck = await fetch(bingpurl);
		if (!bingpfuck.ok) throw new Error('通过60s API获取今日Bing壁纸失败！');
		const bingpfucker = await bingpfuck.json();
		console.log(bingpfucker.code);
		console.log(bingpfucker.message);
		bingp.innerHTML = `<header>${bingpfucker.data.headline}</header><br><b>${bingpfucker.data.title}</b><br><p>${bingpfucker.data.description}</p><i>${bingpfucker.data.main_text}</i><br><img src="${bingpfucker.data.cover}" alt="BingWallpaper"><br><a href="${bingpfucker.data.cover}">下载本必应壁纸</a><br><a href="${bingpfucker.data.cover_4k}">下载本必应壁纸的4K高清版本</a><p>${bingpfucker.data.copyright}</p><p>${bingpfucker.data.update_date}</p>`;
	} catch (error) {
		alert('通过60s API获取今日Bing壁纸失败！');
		console.error('Error: ',error);
	}
}
async function getFoxPic() {
	const foxp = document.getElementById('foxp');
	const foxpurl = "https://randomfox.ca/floof/";
	try {
		const foxpfuck = await fetch(foxpurl);
		if (!foxpfuck.ok) throw new Error('通过RandomFOX获取随机狐狸图失败！');
		const foxpfucker = await foxpfuck.json();
		console.log(foxpfucker.image);
		console.log(foxpfucker.link);
		foxp.innerHTML = `<img src="${foxpfucker.image}" alt="FoxImage"><br><a href="${foxpfucker.link}">RandomFox详情页</a>`;
	} catch (error) {
		alert('通过RandomFox获取随机狐狸图失败！');
		console.error('Error: ',error);
	}
}
async function lookUpDict() {
	const dictout = document.getElementById('dictout');
	const dictouturl = "https://uapis.cn/api/v1/dictionary/lookup?word=" + document.getElementById('inputyes').value;
	try {
		const dictfuck = await fetch(dictouturl);
		if (!dictfuck.ok) throw new Error('通过UapisDictionary查英文词汇失败！');
		const dictfucker = await dictfuck.json();
		if (dictfucker.code === "WORD_NOT_FOUND" || dictfucker.code === "SERVICE_UNAVAILABLE" || dictfucker.code === "INVALID_PARAMETER") {
			alert(dictfucker.message);
			console.error(dictfucker.code);
			console.error(dictfucker.message);
		} else if (dictfucker.found === "true") {
			console.log(dictfucker.found);
			let exam_tagsyes = "";
			dictfucker.entry.exam_tags.forEach(tagswow => {
				exam_tagsyes += tagswow + "、";
			});
			exam_tagsyes = exam_tagsyes.slice(0,-1);
			let definiyes = "";
			dictfucker.entry.definitions.forEach(defuck => {
				definiyes += defuck.part_of_speech + defuck.meaning + "<br>";
			});
			let endefiyes = "";
			dictfucker.entry.english_definitions.forEach(endefuck => {
				endefiyes += endefuck.part_of_speech + endefuck.definition + "<br>";
			});
			let wordfyes = "";
			dictfucker.entry.word_forms.forEach(wordffuck => {
				wordfyes += wordffuck.name + "：" + wordffuck.value + "<br>";
			});
			let phryes = "";
			dictfucker.entry.phrases.forEach(phryyyay => {
				phryes += phryyyay.phrase + " " + phryyyay.meaning + "<br>";
			});
			let synyes = "";
			let synwcyes = "";
			dictfucker.entry.synonyms.forEach(synahhh => {
				synahhh.words.forEach(synwcnah => {
					synwcyes += synwcnah + "，";
				});
				synwcyes = synwcyes.slice(0,-1);
				synyes += synwcyes + "：" + synahhh.part_of_speech + synahhh.meaning + "<br>";
			});
			let exampleyeah = "";
			dictfucker.entry.examples.forEach(exampplllleess => {
				exampleyeah += exampplllleess.source + " " + exampplllleess.translation + "<br>";
			});
			dictout.innerHTML = `<p>你查的词：${dictfucker.entry.word}<br>语言：${dictfucker.entry.language}<br>英式发音：${dictfucker.entry.phonetics.uk.text}<br>英式发音音频：<br><audio controls><source src="https://uapis.cn/${dictfucker.entry.phonetics.uk.audio}" type="audio/mpeg">您的浏览器不支持音频播放。</audio><br>美式发音：${dictfucker.entry.phonetics.us.text}<br>美式发音音频：<br><audio controls><source src="https://uapis.cn/${dictfucker.entry.phonetics.us.audio}" type="audio/mpeg">您的浏览器不支持音频播放。</audio><br>单词标签：${exam_tagsyes}<br>含义：${definiyes}English Definitions: ${endefiyes}词汇变形：${wordfyes}短语：${phryes}同义词：${synwcyes}例句：${exampleyeah}`;
		}
	} catch (error) {
		alert('通过Uapis查找英文单词失败！');
		console.error('Error: ',error);
	}
}