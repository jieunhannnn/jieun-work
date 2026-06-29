#!/bin/bash
# 더블클릭하면 Image Starter 실행 (크롬 뜨고 이미지+프롬프트 자동 세팅)
cd "$(dirname "$0")"

# 혹시 이전에 켜둔 게 남아있으면 정리 (프로필 잠금 방지)
pkill -f "node start.js" 2>/dev/null
sleep 1
rm -f user-data/Singleton* 2>/dev/null

# node 경로 보강 (Finder 더블클릭 시 PATH가 좁아서 node를 못 찾는 경우 대비)
export PATH="/usr/local/bin:/opt/homebrew/bin:$PATH"

node start.js
