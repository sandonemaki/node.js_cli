// comanderモジュールからprogramオブジェクトをインポートする
import {program} from "commander";
// fs/promisesモジュールをfsオブジェクトとしてインポートする
import * as fs from "node:fs/promises";
// markedモジュールからmarkedオブジェクトをインポートする
import {md2html} from "./md2html.js";

// gfmオプションを定義する
program.option("--gfm", "GFMを有効にする");
// コマンドライン引数をcomanderでパースする
program.parse(process.argv);
// ファイルパスをprogam.args配列から取り出す
const filePath = program.args[0];

// コマンドライン引数で指定されなかったオプションにデフォルト値を上書きする
const cliOptions = {
  gfm: false,
  ...program.opts(),
};

// ファイルを非同期で読み込む
fs.readFile(filePath, {encoding: "utf8"}).then(file => {
  // md2htmlモジュールを使ってHTMLに変換する
  const html = md2html(file, cliOptions);
  console.log(html);
}).catch(err => {
  console.error(err.message);
  // 終了ステータス 1（一般的なエラー）としてプロセスを終了する
  process.exit(1)
});
