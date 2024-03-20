const express = require("express");

const app = express();
app.listen("4622");

let youtuber1 = {
    channelTitle: "십오야",
    sub: "593만명",
    videoNum: "993개",
};

let youtuber2 = {
    channelTitle: "침착맨",
    sub: "227만명",
    videoNum: "6600개",
};

let youtuber3 = {
    channelTitle: "테오",
    sub: "53.8만명",
    videoNum: "650개",
};

let db = new Map();
let id = 1; //유튜버 id 값

db.set(id++, youtuber1);
db.set(id++, youtuber2);
db.set(id++, youtuber3);

app.get("/", function (req, res) {
    res.send("hello world");
});

app.get("/youtuber/:id", function (req, res) {
    const p = req.params;
    const youtuberId = db.get(parseInt(p.id));
    if (youtuberId === undefined) {
        res.json({
            message: "우리가 알지 못하는 유튜버입니다.",
        });
    } else {
        res.json(youtuberId);
    }
});

app.use(express.json()); //http 외 모듈인 '미들웨어':json 에 대한 설정
app.post("/youtuber", (req, res) => {
    //새 유튜버 등록
    db.set(id++, req.body);
    res.json({
        message: `${db.get(id - 1).channelTitle}님, 유튜버 생활을 응원합니다!`,
    });
});

app.get("/youtubers", (req, res) => {
    //유튜버 전체 조회
    res.json(db);
});
