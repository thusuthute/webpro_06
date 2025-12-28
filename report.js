'use strict';

const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: true }));

// 売り上げ管理システム
let management = [
  { id:1, code:"49-01340-18452-7", name:"カルピス(R) 470ml (プラスチックボトル)", type:"飲み物", value:160, quantity:1000 },
  { id:2, code:"4902105000122", name:"カップヌードルしょうゆ", type:"カップラーメン", value:250, quantity:120 },
  { id:3, code:"4902102072618", name:"コカ・コーラ 500mlペットボトル", type:"飲み物", value:150, quantity:20000 },
  { id:4, code:"4901330578923", name:"じゃがりこ じゃがバター ", type:"お菓子", value:200,quantity:0 },
  { id:5, code:"4901330578909", name:"じゃがりこ サラダ", type:"お菓子", value:200, quantity:10000 },
  { id:6, code:"4901170002619", name:"ガリガリ君 ソーダ味", type:"アイス", value:80, quantity:123456 },
  { id:7, code:"4901113101539", name:"ケロッグ コーンフレーク (180g)", type:"シリアル", value:500, quantity:4000 },
];

// 一覧
app.get("/management", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('management', {data: management} );
});

// Create
app.get("/management/create", (req, res) => {
  res.redirect('/public/management_new.html');
});

// Read
app.get("/management/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = management[ number ];
  res.render('management_detail', {id: number, data: detail} );
});

// Delete
app.get("/management/delete/:number", (req, res) => {
  // 本来は削除の確認ページを表示する
  // 本来は削除する番号が存在するか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  management.splice( req.params.number, 1 );
  res.redirect('/management' );
});

// Create
app.post("/management", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const id = management.length + 1;
  const code = req.body.code;
  const name = req.body.name;
  const type = req.body.type;
  const value = req.body.value;
  const quantity = req.body.quantity;
  management.push( { id: id, code: code, name: name, type: type, value: value, quantity: quantity } );
  console.log( management );
  res.render('management', {data: management} );
});

// Edit
app.get("/management/edit/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = management[ number ];
  res.render('management_edit', {id: number, data: detail} );
});

// Update
app.post("/management/update/:number", (req, res) => {
  // 本来は変更する番号が存在するか，各項目が正しいか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  management[req.params.number].code = req.body.code;
  management[req.params.number].name = req.body.name;
  management[req.params.number].type = req.body.type;
  management[req.params.number].value = req.body.value;
  management[req.params.number].quantity = req.body.quantity;
  console.log( management );
  res.redirect('/management' );
});



// 家計簿システム
let record = [
  { id:1, year:"2024年", date:"12/29", income:0, expenditure:1000, comment:"掃除をするための道具を買った" },
  { id:2, year:"2024年", date:"12/30", income:0, expenditure:0, comment:"掃除をしていたため外出していない" },
  { id:3, year:"2024年", date:"12/31", income:0, expenditure:2000, comment:"そばを作るための材料費" },
  { id:4, year:"2025年", date:"01/01", income:10000, expenditure:5,comment:"お年玉と神社の賽銭" },
  { id:5, year:"2025年", date:"01/02", income:20000, expenditure:10000, comment:"祖父からのお年玉と福袋" },
  { id:6, year:"2025年", date:"01/03", income:0, expenditure:0, comment:"欲しかった福袋が買えなかった" },
  { id:7, year:"2025年", date:"01/04", income:20000, expenditure:0, comment:"祖母からのお年玉" },
];

// 一覧
app.get("/record", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('record', {data: record} );
});

// Create
app.get("/record/create", (req, res) => {
  res.redirect('/public/record_new.html');
});

// Read
app.get("/record/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = record[ number ];
  res.render('record_detail', {id: number, data: detail} );
});

// Delete
app.get("/record/delete/:number", (req, res) => {
  // 本来は削除の確認ページを表示する
  // 本来は削除する番号が存在するか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  record.splice( req.params.number, 1 );
  res.redirect('/record' );
});

// Create
app.post("/record", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const id = record.length + 1;
  const year = req.body.year;
  const date = req.body.date;
  const income = req.body.income;
  const expenditure = req.body.expenditure;
  const comment = req.body.comment;
  record.push( { id: id, year: year, date: date, income: income, expenditure: expenditure, comment: comment } );
  console.log( record );
  res.render('record', {data: record} );
});

// Edit
app.get("/record/edit/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = record[ number ];
  res.render('record_edit', {id: number, data: detail} );
});

// Update
app.post("/record/update/:number", (req, res) => {
  // 本来は変更する番号が存在するか，各項目が正しいか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  record[req.params.number].year = req.body.year;
  record[req.params.number].date = req.body.date;
  record[req.params.number].income = req.body.income;
  record[req.params.number].expenditure = req.body.expenditure;
  record[req.params.number].comment = req.body.comment;
  console.log( record );
  res.redirect('/record' );
});



//時間割システム
let time = [
  { id:1, day:"月曜日", subject:"言語と文化フランス語", start:"11:00", end:"13:00", test:"12/15" },
  { id:2, day:"月曜日", subject:"英語理解", start:"14:00", end:"16:00", test:"12/22" },
  { id:3, day:"火曜日", subject:"データ通信", start:"9:00", end:"11:00", test:"12/9" },
  { id:4, day:"火曜日", subject:"データサイエンス", start:"14:00", end:"16:00",test:"12/16" },
  { id:5, day:"水曜日", subject:"キャリアデザイン", start:"9:00", end:"11:00", test:"12/17" },
  { id:6, day:"水曜日", subject:"アジャイルワーク", start:"14:00", end:"18:00", test:"無し" },
  { id:7, day:"木曜日", subject:"微分積分", start:"10:00", end:"12:00", test:"12/18" },
];

// 一覧
app.get("/time", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('time', {data: time} );
});

// Create
app.get("/time/create", (req, res) => {
  res.redirect('/public/time_new.html');
});

// Read
app.get("/time/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = time[ number ];
  res.render('time_detail', {id: number, data: detail} );
});

// Delete
app.get("/time/delete/:number", (req, res) => {
  // 本来は削除の確認ページを表示する
  // 本来は削除する番号が存在するか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  time.splice( req.params.number, 1 );
  res.redirect('/time' );
});

// Create
app.post("/time", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const id = time.length + 1;
  const day = req.body.day;
  const subject = req.body.subject;
  const start = req.body.start;
  const end = req.body.end;
  const test = req.body.test;
  time.push( { id: id, day: day, subject: subject, start: start, end: end, test: test } );
  console.log( time );
  res.render('time', {data: time} );
});

// Edit
app.get("/time/edit/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = time[ number ];
  res.render('time_edit', {id: number, data: detail} );
});

// Update
app.post("/time/update/:number", (req, res) => {
  // 本来は変更する番号が存在するか，各項目が正しいか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  time[req.params.number].day = req.body.day;
  time[req.params.number].subject = req.body.subject;
  time[req.params.number].start = req.body.start;
  time[req.params.number].end = req.body.end;
  time[req.params.number].test = req.body.test;
  console.log( time );
  res.redirect('/time' );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
