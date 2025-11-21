@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

:: 出力ファイル名
set "OUTPUT=source_dump.txt"

:: 古い出力ファイルを削除
if exist "%OUTPUT%" del "%OUTPUT%"

echo ソースコード収集中...

:: HTML, CSS, JS ファイルを順に処理
for %%f in (*.html *.css *.js) do (
    echo ---------------------------------------- >> "%OUTPUT%"
    echo ファイル名: %%f >> "%OUTPUT%"
    echo ---------------------------------------- >> "%OUTPUT%"
    type "%%f" >> "%OUTPUT%"
    echo. >> "%OUTPUT%"
    echo. >> "%OUTPUT%"
)

echo.
echo すべてのソースを "%OUTPUT%" に出力しました。
pause
