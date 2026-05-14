@echo off
setlocal enabledelayedexpansion

rem collect_source_utf8.bat

rem ☆ UTF-8固定
chcp 65001 >nul

set "TARGET_DIR="
set "OUTPUT_FILE="
set "OUTPUT_PATH="
set "PATTERNS="
set "FILE_COUNT=0"

echo 収集対象フォルダを入力してください(未入力なら現在のフォルダ)
set /p TARGET_DIR=フォルダパス:
if "%TARGET_DIR%"=="" set "TARGET_DIR=%CD%"

if not exist "%TARGET_DIR%" (
    echo 指定したフォルダが見つかりません。
    goto END
)

echo 出力ファイル名を入力してください(未入力なら source_dump.txt)
set /p OUTPUT_FILE=出力ファイル名:
if "%OUTPUT_FILE%"=="" set "OUTPUT_FILE=source_dump.txt"

rem 出力ファイル名だけ入力された場合は対象フォルダ配下に作成
echo %OUTPUT_FILE% | find ":" >nul
if errorlevel 1 (
    set "OUTPUT_PATH=%TARGET_DIR%\%OUTPUT_FILE%"
) else (
    set "OUTPUT_PATH=%OUTPUT_FILE%"
)

echo.
echo 例 *.html *.css *.js
echo 例 *.html,*.css,*.js
echo 未入力の場合 *.html *.css *.js
set /p PATTERNS=収集したい拡張子を入力してください:

rem 未入力ならデフォルト設定
if "%PATTERNS%"=="" set "PATTERNS=*.html *.css *.js"

rem カンマ区切りを空白区切りへ変換
set "PATTERNS=%PATTERNS:,= %"

if exist "%OUTPUT_PATH%" del "%OUTPUT_PATH%"

echo.
echo ソースコードを収集しています...
echo 対象フォルダ "%TARGET_DIR%"
echo 出力ファイル "%OUTPUT_PATH%"
echo 拡張子 %PATTERNS%
echo.

for /r "%TARGET_DIR%" %%f in (%PATTERNS%) do (
    set /a FILE_COUNT+=1
    >>"%OUTPUT_PATH%" echo ----------------------------------------
    >>"%OUTPUT_PATH%" echo ファイル名 %%~nxf
    >>"%OUTPUT_PATH%" echo ----------------------------------------
    type "%%f" >>"%OUTPUT_PATH%"
    >>"%OUTPUT_PATH%" echo.
    >>"%OUTPUT_PATH%" echo.
)

if "!FILE_COUNT!"=="0" (
    echo 対象ファイルが見つかりませんでした。
    goto END
)

echo.
echo 完了しました。
echo 出力ファイル "%OUTPUT_PATH%"
echo 収集ファイル数 !FILE_COUNT!

:END
echo.
echo 処理終了
pause
endlocal