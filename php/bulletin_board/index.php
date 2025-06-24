<?php 

    $comment_array = array();

    header('Content-Type: text/html; charset=UTF-8'); // ← 必ず最上部に追加
    //書き込みボタンが押されたか？
    if(!empty($_POST["submitButton"])){
        echo $_POST["username"];
        echo $_POST["comment"];
    }
   //DB接続
   try{
    $pdo=new PDO('mysql:host=localhost;port=8889;dbname=bulletin_board',"root","root");
   }catch(PDOException $e){
    echo $e->getMessage();
    /*error_log($e->getMessage()); // ← ログに出力
    echo 'データベース接続に失敗しました。'; // ← 画面には固定メッセージ*/
   }
   //DBからコメントデータを取得する
   $sql = "SELECT `id`, `username`, `comment`, `postDate` FROM `bulletin_board_table`;";
   $comment_array = $pdo->query($sql);

   //DBの接続を閉じる
   $pdo = null;
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP_掲示板</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
    <h1 class="title">PHPで掲示板アプリ</h1>
    <hr>
    </header>
    <main>
    <div class="boardWrapeer">
        <section>
            <?php foreach ($comment_array as $comment) :?>
                <article>
                    <div class="wrapper">
                        <div class="nameArea">
                            <span>名前：</span>
                            <p class="username"><?php echo $comment["username"];?></p>
                            <time><?php echo $comment["postDat"];?><time>
                        </div>
                        <p class="comment"><?php echo $comment["comment"];?></p>
                    </div>
                </article>
            <?php endforeach; ?>
        </section>
        <form class="formWrapper" method="POST">
            <div>
                <input type="submit" value="書き込む" name="submitButton">
                <label for="">名前:</label>
                <input type="text" name="username">
            </div>
            <div>
                <textarea class="commentTextArea" name="comment"></textarea>
            </div>
        </form>
    </div>
    </main>
</body>
</html>
