[comment]: # "Редактируйте файл README.source.md"

[![Gitter](https://badges.gitter.im/Discours/community.svg)](https://gitter.im/Discours/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
[![Netlify Status](https://api.netlify.com/api/v1/badges/f55a8a2f-cc4e-4c1d-9605-ce9a500a0b6f/deploy-status)](https://app.netlify.com/sites/beta-discours-io/deploys)
[![Travis build status](http://img.shields.io/travis/Discours/discours-frontend-main/develop.svg)](https://travis-ci.org/Discours/discours-frontend-main)
[![Maintainability](https://api.codeclimate.com/v1/badges/c61cc1cb7a21e15787e0/maintainability)](https://codeclimate.com/github/Discours/discours-frontend-main/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/c61cc1cb7a21e15787e0/test_coverage)](https://codeclimate.com/github/Discours/discours-frontend-main/test_coverage)

> Весь фронтэнд Дискурса в одном репозитории!

[Дискурс](https://discours.io) (Пока что на старом проекте) | [Бэта Дискурс](https://beta.discours.io) (собирается из develop) | [Сторибук Дискурса](https://storybook.discours.io)

{"gitdown": "contents"}

### Cheat Sheet

> Быстрый справочник по разработке проекта

- Проект должен запускаться в IE9 и выше, но заботимся о поддержке Edge и выше. [О поддержке браузеров](#browser-support).
- `npm run commit` вместо `git commit` (Выводит интерактивный промпт для коммита). [Подробнее](#npm-run-commit).
- PR в ветку `develop` из веток `feature/#id` или `bugfix/#id`. [Подробнее](#git-flow).
- [storybook](https://storybook.js.org) для верстки компонентов и страниц очень помогает. [А что у вас там есть?](#storybook)
- [react-testing-library](https://testing-library.com/react) для интеграционного тестирования компонентов (если там есть какая-то логика) для полной уверенности в своём коде. [Про тестирование](#testing).
- Стили пишем в `.css` файлах, но активно используем переменные из стандарта [css-custom-properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) и [css-custom-media](https://developer.mozilla.org/en-US/docs/Web/CSS/@media). [О вёрстке](./src/styles/README.md).
- UI Kit компоненты в `src/components/discours-ui-kit`, вёрстка — в `src/components/modules`, логика — в `src/layouts` и в `src/pages`. [О структуре проекта](./src/README.md).
- Свойства `.css` [идеоматически сортируются](https://github.com/necolas/idiomatic-css#declaration-order) перед коммитом. [Зачем?](https://dev.to/thekashey/happy-potter-and-the-order-of-css-5ec)
- Всё, что нужно для сборки приложения, устанавливается в _production_ dependencies. [Но не красиво же!](#deps)

> [Оригинал](https://github.com/Discours/discours-welcome)

:[Манифест](https://raw.githubusercontent.com/Discours/discours-welcome/master/MANIFEST.md)

### Storybook

> `npm run storybook` для запуска или [посмотреть он-лайн](https://storybook.discours.io)

Основной инструмент разработки компонентов в этом проекте — [Storybook](https://storybook.js.org/). С помощью сторибука мы можем разрабатывать компоненты по отдельности, не думая как и откуда нам должны приходить данные.

[Tutorial по сторибукам](https://www.learnstorybook.com/), если вы никогда не работали с этим инструментом.

В сторибуке мы можем видеть наш компонент во всех возможных вариантах отображения. Например, если у нас есть кнопка с тремя стилями, можно создать три сторибука под каждый конкретный стиль.

В наших сторибуках есть несколько весьма полезных инструментов:

![Storybook themes selector interface](./docs/storybook-examples/themes.png)

- Информация о компоненте. У многих компонентов (особенно в `discours-ui-kit`) есть файл `README.md` с описанием функциональности и дизайна компонента. В таком случае, оно отображается, если нажать на кнопку `Show info` в правом верхнем углу сторибука.

![Storybook themes selector interface](./docs/storybook-examples/themes.png)

- Выбор тем. Каждый компонент можно посмотреть в разных темах. При разработке компонента, нам надо быть уверенным в том, что он смотрится хорошо во всех темах.

![Storybook responsive selector interface](./docs/storybook-examples/responsive.png)

- Предпросмотр в размер мобильного экрана. Не лучше родного функционала, что есть в Developer Tools любого браузера, но быстрее и удобно вызываются.

<a name="testing"></a>

### Тестирование

**Функциональный код**

Тут всё весьма стандартно: [jest](https://jestjs.io) в качестве test runner. В проекте установлен [jest-extended](https://github.com/jest-community/jest-extended), но импортировать его надо в каждый тест отдельно для исключения сайд эффектов.

**Компоненты и контейнеры**

Для интеграционного тестирования компонентов используется [react-testing-library](https://github.com/kentcdodds/react-testing-library) + [jest-dom](https://github.com/gnapse/jest-dom#readme) для дополнительных мэтчеров в тестах.

Писать тесты ко всем компонентам не надо - мы **не** стремимся к 100% покрытию. В компонентах можно затестить правильную передачу классов и пропов.

К контейнерам пишутся уже функциональные тесты для уверенности, что функционал работает корректно.

Важно понимать, что в тестах мы взаимодействуем с компонентом так, как с ним будет взаимодействовать юзер. То есть вместо тестирования имплементации компонента (вызов метода компонента и проверка пропа), мы должны взаимодействовать с элементами интерфейса.

Если тестируется HOC и эл-тов интерфейса нет, можно написать в тесте специальный компонент, который будет вызывать функции HOC'а по нажатию на кнопки.

**E2E**

Используется [Cypress](https://www.cypress.io) и тестируется сайт с точки зрения не залогиненного посетителя.

<a name="browser-support"></a>

### Поддержка браузеров

**Статистика Дискурса взята за январь-июль 2019**

- Edge **0.96%**
- IE **0.73%**
  - IE11 **0.67%**
  - IE8 **0.04%**
  - IE10 **0.0074%**
  - IE9 **0.002%**
  - IE7 **0.001%**
  - IE6 **0.0007%**

Следим за правильным отображением и работой мы в браузере Edge и выше. То есть в Edge должен работать весь функционал сайта и отображаться он должен правильно.

React поддерживает IE9 и мы не видим причин не сделать так, чтобы сайт хотя бы запускался в этом браузере. Понятное дело, верстка будет сильно ехать, но информация будет доступной. Так же некоторые функции будут недоступны.

Например, у нас есть темы, и мы решили их писать используя [css custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*). Этот станадарт поддерживается в браузере Edge и выше. Но вот проблема: если браузер не поддерживает данную спецификацию (IE11 и ниже), сайт не будет отображаться совсем, ибо все цвета находятся в файле темы. Поэтому мы реализовали fallback — [плагин postcss custom properties](https://github.com/postcss/postcss-custom-properties) добавляет перед каждым свойством, где используется переменная, такое же свойство с записанным дефолтным значением этого поля:

```css
.foo {
  color: var(--color-text);
}
```

Он превращает в

```css
.foo {
  color: #000;
  color: var(--color-text);
}
```

Таким образом, переключение тем не будет работать в IE11, но сайт будет отображаться хорошо.

### npm run commit

![npm run commit ouput](docs/npm-run-commit/npm-run-commit.svg)

В проекте есть специальный commit prompt, который помогает отформатировать commit message в соответствии с [Conventional Commits](https://www.conventionalcommits.org/ru/v1.0.0-beta.4/). Для его запуска необходимо выполнить `npm run commit`. Он спросит про тип коммита, scope (не обязательно), описание коммита (мы используем present simple в описании, напр. "Create the Button component"), а в конце попробует достать номер issue на GitHub из имени ветки автоматически и добавить его в commit message в следующем формате: `[#10]`. Таким образом создастся ссылка из коммита на issue.

Что такое **scope**? Это объект изменения кода. Если мы пишем commit message без scope, мы часто пишем **.. in something** в конце. Вот этот **something** и есть scope, который выносится в начало коммит сообщения. То есть `Add onPress event handler in Button component` превратится в `feat(Button component): ✨ Add onPress event handler`. **scope** не обязательный, но желательный параметр.

Использования скрипта `npm run commit` необязательно, но тогда надо писать коммит сообщение в соответствии с [Conventional Commits](https://www.conventionalcommits.org/ru/v1.0.0-beta.4/) самому (эмодзи не обязательны).

### Git flow

Для работы в репозитории мы используем [Git flow](https://danielkummer.github.io/git-flow-cheatsheet/index.ru_RU.html).

- `master` — текущая production версия
- `develop` — текущая beta версия

Перед началом работы нужно создать новую ветку из develop:

- `feature/#10` — новый функционал, описанный в GitHub Issue #10
- `bugfix/#10` — баг фикс, описанный в GitHub Issue #10

Лучше использовать номер тикета в названии ветки, чтобы [коммит скрипт](#npm-run-commit) добавлял этот номер в коммит автоматически.

### Зависимости

Все зависимости, что необходимы для сборки проекта (`webpack`, `typescript`, `postcss`) стоят в _production_ dependencies, что выглядит весьма нестандартно и режет глаз. Дело в том, что мы хотим более быструю сборку на CD (Netlify), поэтому не хотим там ставить зависимости, нужные только для `development` (`jest`, `tslint` и особенно `cypress`, который долго скачивается). И для этого есть стандартный механизм в `npm` - `production` зависимости! Но в таком случае, всё, что надо для сборки должно быть там.

Так же мы стараемся следить за размером бандла и не ставить зависимости на каждых чих. Быстрая загрузка сайта и его работа — основной наш приоритет!
