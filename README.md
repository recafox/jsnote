# JSNote

A notebook with interactive coding environment!
![image](https://user-images.githubusercontent.com/22570444/137446217-e34f4664-2085-42d1-a69a-a42219c31c4b.png)

## Disclaimer
This project is inspired by an amazing course called [React and Typescript: Build a Portfolio Project](https://www.udemy.com/course/react-and-typescript-build-a-portfolio-project/) by [Stefen Grider](https://www.udemy.com/user/sgslo/)! 🌈🌈

這是來自於課程[React and Typescript: Build a Portfolio Project](https://www.udemy.com/course/react-and-typescript-build-a-portfolio-project/)的作品, 我另外依照講師的建議作了一些UX上的優化

## Install

run `npx jsnote-2g0jy@latest serve` to launch the app.


## About this project

這是一個可以在瀏覽器中撰寫及編譯JavaScript的筆記簿, 就像codepen, jsbin. 搭配markdown的編輯器, 編寫完成的筆記可以下載成一個js檔案, 分享給別人看

![image](https://user-images.githubusercontent.com/22570444/137444139-3ace720c-879a-4d1d-8027-5a1e47513477.png)
![image](https://user-images.githubusercontent.com/22570444/137444330-9592070f-7d9a-4414-8c24-91ce8ea52026.png)


## Techstack

- 使用[esbuild](https://esbuild.github.io/)作到in-browser code bundling.
- Typescript
- [React](https://zh-hant.reactjs.org/), [Redux](https://redux.js.org/), 搭配[Immer](https://immerjs.github.io/immer/)作state管理, 以及[redux thunk](https://github.com/reduxjs/redux-thunk)
- [lerna](https://github.com/lerna/lerna)管理模組以及npm發布
- [BulmaCSS](https://bulma.io/)
- Node.js and Express, and more...

## Will be fixed...(maybe)

將下載的js格式整理成人能看的(目前是json)

