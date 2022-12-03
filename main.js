// comanderモジュールからprogramオブジェクトをインポートする
import {program} from "commander";
// fs/promisesモジュールをfsオブジェクトとしてインポートする
import * as fs from "node:fs/promises";
// markedモジュールからmarkedオブジェクトをインポートする
import {marked} from "marked";


// コマンドライン引数をcomanderでパースする
program.parse(process.argv);

// ファイルパスをwprogam.args配列から取り出す
const filePath = program.args[0];

// ファイルを非同期で読み込む
fs.readFile(filePath, {encoding: "utf8"}).then(file => {
  console.log(file);
}).catch(err => {
  console.error(err.message);
  // 終了ステータス 1（一般的なエラー）としてプロセスを終了する
  process.exit(1)
});
