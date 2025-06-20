<?php
require 'questions.php';
$total = count($questions);
$score = $_GET['score'] ?? 0;
?>

<h1>結果発表</h1>
<p>あなたのスコアは <?= $score ?> / <?= $total ?> 点です</p>
<a href="index.php">もう一度プレイ</a>
