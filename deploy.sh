#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

tags=$(git tag)
nextTag=$(node utils/getNextTag.js $tags)
echo '~~~~~~~~~~'
echo nextTag: $nextTag
echo '~~~~~~~~~~'

# 生成静态文件
npm run build

# 进入生成的文件夹
cd docs/.vuepress/dist

# deploy to github pages
# echo 'b.weiyie.com' > CNAME

if [ -z "$GITHUB_TOKEN" ]; then
  msg='deploy'
  githubUrl=git@github.com:weiyie/random.git
else
  msg='来自github actions的自动部署'
  githubUrl=https://weiyie:${GITHUB_TOKEN}@github.com/weiyie/random.git
fi

git init
git config --global user.name "weiyie"
git config --global user.email "912881342@qq.com"
git add -A
git commit -m "${msg}"

git tag $nextTag

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

git push --tags -f $githubUrl master:gh-pages   # 推送到github gh-pages分支
#
# latestInfo=$(curl -s https://api.github.com/repos/weiyie/random/releases/latest)

echo ::set-output name=VERSION::$nextTag

# deploy to coding pages
# echo 'www.weiyie.com\nweiyie.com' > CNAME  # 自定义域名
# echo 'google.com, pub-7828333725993554, DIRECT, f08c47fec0942fa0' > ads.txt # 谷歌广告相关文件

# if [ -z "$CODING_TOKEN" ]; then  # -z 字符串 长度为0则为true；$CODING_TOKEN来自于github仓库`Settings/Secrets`设置的私密环境变量
#   codingUrl=git@e.coding.net:xgy/xgy.git
# else
#   codingUrl=https://HmuzsGrGQX:${CODING_TOKEN}@e.coding.net/xgy/xgy.git
# fi
# git add -A
# git commit -m "${msg}"
# git push -f $codingUrl master # 推送到coding

cd -
rm -rf docs/.vuepress/dist
