# Zoo-Chat

<a href="#">
    <img src="https://img.shields.io/badge/work-in--progress-orange.svg">
</a>

[PR Sprint_2](https://github.com/AlksAlena/middle.messenger.praktikum.yandex/pull/4)

## Учебный проект в рамках курса от Яндекс.Практикум.

[Demo on Netlify](https://6307332e6c69205fa30fa78f--taupe-kelpie-f2a8a6.netlify.app/)

### Описание проекта

Учебный мессенджер, в разработке которого используются следующие технологии:
* JavaScript,
* Typescript,
* HTML/шаблонизаторы,
* CSS/CSS-репроцессоры
* API браузера.

В проект войдут стандартные функции чата:
* регистрация,
* авторизация,
* список чатов,
* обмен сообщениями.

### Готовность проекта

Работа над проектом длится в течение всего первого модуля обучения, который делится на 4 спринта.

Состояние проекта - на конец первого спринта:
* минималистичная верстка с использованием шаблонизатора [Handlebars](https://handlebarsjs.com/),
* использование [SCSS](https://sass-lang.com/),
* сборщик [Parcel](https://parceljs.org/),
* сервер [Express](https://expressjs.com/),
* деплой на [Netlify](https://www.netlify.com/).

Текущее состояние проекта - на конец второго спринта:
* использована концепция *EventBus* для реализации регистрации и управления событиями,
* использована концепция *Блок/Компонент* для реализации жизненного цикла компонента,
* добавлена валидация на элементы формы в соответствии с установленными требованиями,
* организован сбор данных заполненных форм для дальнейшей обработки.


### Запуск проекта для разработчика

Склонируйте репозиторий. При запуске приложения используйте следующие команды:

- `npm install` — установка зависимостей,
- `npm run dev` — запуск дев-сервера Parcel на localhost:1234,
- `npm run build` — запуск сборки проекта в dist/,
- `npm run start` — запуск сервера Express на `localhost:3000` для раздачи статики из `dist/`,
- `npm run clean` — очистка директорий `./dist` и `./.parcel-cache` (используется в команде `build`),
- `npm run lint` — запуск линтера Eslint,
- `npm run lint:fix` — запуск линтера Eslint для автоматического исправления,
- `npm run style` — запуск линтера Stylelint,
- `npm run style:fix` — запуск линтера Stylelint для автоматического исправления
