<?php
require 'questions.php';

$q = isset($_POST['q']) ? (int)$_POST['q'] : 0;
$score = isset($_POST['score']) ? (int)$_POST['score'] : 0;

// 回答が送られていたら、前の問題の正解をチェック
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['answer']) && $q > 0) {
    if ((int)$_POST['answer'] === $questions[$q - 1]['answer']) {
        $score++;
    }
}

// 次の問題番号をセット
if ($q < count($questions)) {
    $question = $questions[$q];

    echo "<!DOCTYPE html><html lang='ja'><head><meta charset='UTF-8'>";
    echo "<title>クイズ</title>";
    echo '<link rel="stylesheet" href="css/style.css">';  // ★外部CSSを読み込み
    echo "</head><body>";

    echo "<h2>Q" . ($q + 1) . ". " . $question['question'] . "</h2>";

    foreach ($question['choices'] as $index => $choice) {
        echo "<form method='post' class='choice-form'>";
        echo "<input type='hidden' name='answer' value='$index'>";
        echo "<input type='hidden' name='q' value='" . ($q + 1) . "'>";
        echo "<input type='hidden' name='score' value='$score'>";
        echo "<button type='submit' class='choice-btn'>".chr(65 + $index)."：$choice</button>";
        echo "</form>";
    }

    echo "</body></html>";
} else {
    header("Location: result.php?score=$score");
    exit;
}
?>
<link rel="stylesheet" href="css\style.css">