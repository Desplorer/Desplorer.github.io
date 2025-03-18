// 加载语言文件
function loadLanguage(lang) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `lang/${lang}.json`, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const langData = JSON.parse(xhr.responseText);
            document.getElementById('title').textContent = langData.title;
            document.getElementById('description').textContent = langData.description;
        }
    };
    xhr.send();
}

// 搜索初中数学微课
function searchMicroLessons() {
    const keyword = document.getElementById('searchInput').value;
    const searchEngines = [
        `https://www.baidu.com/s?wd=${encodeURIComponent(keyword)} 初中数学微课`,
        `https://www.bing.com/search?q=${encodeURIComponent(keyword)} 初中数学微课`,
        `https://www.so.com/s?q=${encodeURIComponent(keyword)} 初中数学微课`,
        `https://www.sogou.com/web?query=${encodeURIComponent(keyword)} 初中数学微课`
    ];

    searchEngines.forEach(url => {
        window.open(url, '_blank');
    });
}