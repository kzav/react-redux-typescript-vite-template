@echo off
set DIR_SRC_HTML=src
set DIR_SRC_JS=dist
set DIR_DST_HTML=..\nm-web-mypage\resources\templates
set DIR_DST_JS=..\nm-web-mypage\resources\public\js
rem echo %DIR_SRC_HTML%
rem echo %DIR_SRC_JS%
rem echo %DIR_DST_HTML%
rem echo %DIR_DST_JS%
copy /Y %DIR_SRC_HTML%\*.html %DIR_DST_HTML%
copy /Y %DIR_SRC_JS%\*.js* %DIR_DST_JS%
