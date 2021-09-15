# Express 프로젝트 생성
```bash
# Git 연동
git init
git remote add origin https://github.com/1binibin/2021-17-board.git

#.gitignore에 추가
/storages
/storages-remove

# npm init -y
npm init -y

# Dependancy module 설치
npm i cors dotenv ejs express fs-extra http-errors lodash method-override moment multer mysql2 numeral uuid nodemon

# 폴더구조 생성
mkdir middlewares
mkdir modules
mkdir routes
mkdir views

# app.js 생성

# package.json 추가
"scripts": {
  "start": "nodemon app",
}
```