#!/bin/bash
# 测试是否能访问 openai 的 api

URL="https://api.openai.com/v1/chat/completions"

# 使用 curl 访问网址，5s 超时
curl -s "$URL" -m 5 >/dev/null

# 检查 curl 命令的退出状态码
if [ $? -eq 0 ]; then
    echo "ok"
else
    echo "Error accessing $URL"
    exit 1
fi
