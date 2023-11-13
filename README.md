# ts-react-spa
## Описание
Данное приложение представляет собой Single Page Application (SPA) для просмотра информации сервиса с возможностью авторизации.
Приложение состоит из трёх страниц:
- главная страница;
- страница для просмотра информации сервиса;
- страница авторизации.

На странице просмотра информации реализовано отображение древовидной структуры данных, приходящей с сервера,
с возможностью просмотра дочерних элементов каждого родителя.

## Доступ
Приложение доступно по ссылке: https://ts-react-spa.vercel.app/  
*Примечание: для входа нужно использовать один из следующих вариантов:*
```js
const users = [
    { login: 'user1', password: 'password1' },
    { login: 'user2', password: 'password2' },
    { login: 'user3', password: 'password3' },
    { login: 'user4', password: 'password4' },
    { login: 'user5', password: 'password5' },
];
```

## Запуск приложение
Версия `node`: не ниже 16.20.1.  
Версия `npm`: не ниже 8.19.4.
1. Клонировать репозиторий.
2. Перейти в директорию проекта (`cd .\ts-react-spa\`).
3. `npm install`.
4. `npm start`.
5. Перейти на localhost.

## Технологии
- Основные:
    - [ECMAScript 2021](https://www.w3schools.com/js/js_2021.asp)
    - [TypeScript](https://www.typescriptlang.org/) `[5.2.2]`
- Интерфейс:
    - [React Bootstrap](https://react-bootstrap.netlify.app/) `[2.9.1]`
- Сборщик:
    - [webpack](https://webpack.js.org/) `[5.89.0]`
- Фейковый сервер:
    - [Mirage JS](https://miragejs.com/) `[0.1.48]`
