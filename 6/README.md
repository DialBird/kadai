2015/12/30
PHP初回の課題

＜今回の目標＞
formによるPOSTとその受け取り。(checkboxではnameに配列を使う)
fopen,fclose,flock,fgetcsv,fputsによる、データのCSV入出力（PC側の設定で、データを「読み/書き」設定にしておくこと）

＜工夫＞
requireによる外部データの読み込み
htmlspecialcharsによるサニタイズ。及び、配列と文字列とでサニタイズ法を変える関数の作成。
formのhiddenタイプの利用。
受け取った配列をimplodeにより文字列化。
formされたかどうか、及びformされて来ても空文字だった場合を、emptyでまとめて判定。もしtrueならば、その変数にnullを代入し、issetで一括対応可能にする。
formするとき、情報がなければ空文字を送信で統一(emptyに対応させる)
filesizeを使い、初回の出力に限り、表の見出しを一緒に出力する仕組み
mb_convert_variablesによる、SHIS-winとUTF-8の切り替え
array_mapとstr_getcsv、fileの利用による配列化
毎度PHP_EOLが必要なfputsではなく、配列にする必要はあるが、楽にcsvデータが打ち込めるfputcsvを利用。