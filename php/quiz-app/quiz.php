<?php
session_start();
require 'questions.php'; // $questions を外部ファイルに分けている場合

// 回答を受け取ったらセッションに記録
if (isset($_POST['answer']) && isset($_POST['index'])) {
    $index = (int)$_POST['index'];
    $_SESSION['answers'][$index] = (int)$_POST['answer'];
}

// リセット処理
if (isset($_POST['reset'])) {
    session_destroy();
    header("Location: " . $_SERVER['PHP_SELF']);
    exit;
}

// 全問回答済みかチェック
if (isset($_SESSION['answers']) && count($_SESSION['answers']) === count($questions)) {
    $score = 0;
    echo "<h2>解答結果</h2>";

    foreach ($questions as $index => $q) {
        $userAnswer = $_SESSION['answers'][$index];
        $correct = $q['answer'];
        $isCorrect = $userAnswer === $correct;
        if ($isCorrect) $score++;

        echo "<div style='margin-bottom: 1em;'>";
        echo "<strong>Q" . ($index + 1) . ": " . htmlspecialchars($q['question'], ENT_QUOTES, 'UTF-8') . "</strong><br>";
        echo "あなたの答え: <span style='color:" . ($isCorrect ? "green" : "red") . "'>" . htmlspecialchars($q['choices'][$userAnswer], ENT_QUOTES, 'UTF-8') . "</span><br>";
        echo "正解: " . htmlspecialchars($q['choices'][$correct], ENT_QUOTES, 'UTF-8') . "<br>";
        echo "判定: <strong>" . ($isCorrect ? "正解" : "不正解") . "</strong>";
        echo "</div>";
    }

    echo "<hr>";
    echo "<h3>正解数: $score / " . count($questions) . "</h3>";
    echo "<form method='post'><button type='submit' name='reset' value='1'>再挑戦</button></form>";
    session_destroy(); // 結果を表示後にセッション終了
} else {
    // 未回答の問題を表示
    $index = count($_SESSION['answers'] ?? []);
    $q = $questions[$index];

    echo "<form method='post'>";
    echo "<h2>Q" . ($index + 1) . ": " . htmlspecialchars($q['question'], ENT_QUOTES, 'UTF-8') . "</h2>";
    foreach ($q['choices'] as $i => $choice) {
        echo "<button type='submit' name='answer' value='$i'>" . htmlspecialchars($choice, ENT_QUOTES, 'UTF-8') . "</button><br><br>";
    }
    echo "<input type='hidden' name='index' value='$index'>";
    echo "</form>";
}
?>
