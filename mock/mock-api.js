const http = require('http');
const fs = require('fs');
const path = require('path');

// 讀取剛剛抓下來的真實資料當作資料庫
let realData = [];
try {
    const rawData = fs.readFileSync(path.join(__dirname, 'ast-mock.json'), 'utf8');
    const parsedData = JSON.parse(rawData);
    if (parsedData.result && parsedData.result.length > 0) {
        realData = parsedData.result;
    }
} catch (err) {
    console.error("無法讀取 ast-analysis-response.json，將使用空陣列", err);
}

const PORT = 44314;

const server = http.createServer((req, res) => {
    // 處理 CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'content-type');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    // 隨機抽取真實資料的輔助函數
    const getRandomData = (count) => {
        if (realData.length === 0) return [];
        const shuffled = [...realData].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    // 學測落點分析 Mock
    if (req.url.includes('/gsat/analysis')) {
        const mockResponse = { result: [] };
        const randomRecords = getRandomData(80);
        
        randomRecords.forEach((record, index) => {
            const isChu = (index % 10 === 0);
            mockResponse.result.push({
                did: record.did,
                uname: isChu ? "中華大學" : record.uname,
                uurl: isChu ? "https://www.chu.edu.tw" : record.uurl,
                dname: record.dname,
                durl: record.durl,
                salary: record.salary ? record.salary.toLocaleString() : "35,000",
                salaryUrl: record.salaryUrl || "#",
                lastCriterion: String(35 + Math.floor(Math.random() * 25)),
                rateOfThisYear: String((1 + Math.random() * 4).toFixed(1)),
                change: Math.random() > 0.8 ? "倍率改變" : "",
                examURL: "https://www.cac.edu.tw/cacportal/index.php",
                riskIndex: Math.random() > 0.8
            });
        });

        setTimeout(() => {
            res.writeHead(200);
            res.end(JSON.stringify(mockResponse));
        }, 400); // 模擬網路延遲
        return;
    }

    // 指考落點分析 Mock
    if (req.url.includes('/ast/analysis')) {
        const mockResponse = { result: [], resultCHU: [] };
        const randomRecords = getRandomData(80);
        
        // 產生一般學校
        randomRecords.forEach(record => {
            mockResponse.result.push({
                did: record.did,
                uname: record.uname,
                uurl: record.uurl,
                dname: record.dname,
                durl: record.durl,
                salary: record.salary || 35000,
                salaryUrl: record.salaryUrl || "#",
                minScore: record.minScore || 200,
                yourScore: record.minScore ? record.minScore + Math.floor(Math.random() * 50) : 250,
                examURL: "https://www.uac.edu.tw/"
            });
        });
        
        // 產生中華大學專屬結果
        const chuRecords = getRandomData(15);
        chuRecords.forEach(record => {
            mockResponse.resultCHU.push({
                did: record.did,
                uname: "中華大學",
                uurl: "https://www.chu.edu.tw",
                dname: record.dname,
                durl: record.durl,
                salary: record.salary || 35000,
                salaryUrl: record.salaryUrl || "#",
                minScore: record.minScore || 150,
                yourScore: record.minScore ? record.minScore + Math.floor(Math.random() * 50) : 180,
                examURL: "https://www.uac.edu.tw/"
            });
        });

        setTimeout(() => {
            res.writeHead(200);
            res.end(JSON.stringify(mockResponse));
        }, 400);
        return;
    }

    // 預設回應
    res.writeHead(200);
    res.end(JSON.stringify({ status: "ok" }));
});

server.listen(PORT, () => {
    console.log(`Mock server is running safely forever at http://localhost:${PORT}/`);
    console.log(`Loaded ${realData.length} realistic department records from ast-analysis-response.json!`);
});
