<?php 
    //書き込みボタンが押されたか？
    if(!empty($_POST["submitButton"])){
        echo $_POST["username"];
        echo $_POST["comment"];
    }
   //
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
            <article>
                <div class="wrapper">
                    <div class="nameArea">
                        <span>名前：</span>
                        <p class="username">shinCode</p>
                        <time>2025/06/06<time>
                    </div>
                    <p class="comment">手書きコメント</p>
                </div>
            </article>
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