第７回目課題　〜データベースを使った学習記録帳〜

今回はデータベース「Accumile」に二つのtable、「skill_titles」「skill_data」を作り、前者にタグを収納、後者にデータをまとめ、必要に応じてタグを使ってデータを絞り込むという手法をとった。

main.phpにあったコマンドの内、
「New」で「skill_titles」にタグを作成する。
「Accumulate」で「skill_titles」に作ったタグを表示し、その中からひとつ選び、時間を入力して送信することで、「skill_data」のほうにタグ名と数値、日付がレコードされる。
「Show」で「skill_titles」のタグを使って「skill_data」の情報をまとめて表示する。
「Remove」で選んだタグとdataを全て消去する。