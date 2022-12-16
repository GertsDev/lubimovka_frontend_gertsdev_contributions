# Руководство участника группы разработки фронтенда

## Работа с Git

Чтобы внести изменения в код проекта необходимо:

1. [Создать новую ветку задачи](#создание-ветки)
2. [Внести](#оформление-кода) и [закоммитить](#коммиты) изменения в код проекта
3. [Сделать ребейз относительно `develop`](#ребейз)
4. Открыть Pull Request в ветку `develop`
5. Дождаться [ревью](#код-ревью), внести правки, сделать ребейз, отправить изменения на сервер

### Создание ветки

Мы придерживаемся упрощенной модели ветвления [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/).

Для именования веток используется нотация:
```<тип>-<короткое-описание>```.

Допустимые типы: `feature`, `bugfix`, или `hotfix`.

* `feature` для добавления, изменения или удаления функциональности
* `bugfix` для исправления бага
* `hotfix` для срочного исправления бага в бою. Hotfix-ветки мерджатся в `main`

В имени ветви используются только тире, буквы в нижнем регистре и цифры, например `feature-event-card`, `bugfix-event-date`.

### Оформление кода

Код должен соответствовать некоторым стилистическим правилам, расширяющим базовый стайлгайд Next.js, см. [конфигурацию ESLint](./.eslintrc.json).

### Коммиты

Старайтесь делать коммиты детальными, но при этом имеющими самостоятельную  ценность. В большинстве случаев коммит не должен ломать тесты или нарушать правила линтеров.

Мы используем упрощенное соглашение по именованию коммитов [Conventional Commits](https://www.conventionalcommits.org):

```<тип>: <описание>```.

Допустимые типы: `feat`, `chore`, `fix`, `refactor`, `test` или `docs`, где:

* `feat` — новая **для пользователя** функциональность,
* `chore` — рутинные задачи,
* `fix` — исправление ошибки **для пользователя**,
* `refactor` — рефакторинг кода,
* `test` — добавление тестов,
* `docs` — изменение документации.

Правила именования коммитов:
* описание коммита должно быть на русском языке,
* не начинайте описание коммита с прописной буквы,
* старайтесь использовать в коммит-месседже существительные, описывающие процесс, вместо глаголов и настоящее время: «изменение», а не «изменил» или «изменяет»,
* коммит-месседж должен описывать «что» происходит в коммите, а не «как».

Хорошо: `fix: исправление заголовка страницы новостей`

Плохо: `add active class`

Хорошей практикой будет подготовка коммитов к ревью перед открытием Pull Request. Следует избегать разделения связанных по смыслу правок на разные коммиты, сохранять последовательность и понятность изменений.

Не бойтесь использовать в работе интерактивный ребейз и fixup-коммиты.

### Ребейз

Чтобы сохранять историю Git чистой, рекомендуется делать ребейз ветви задачи относительно `develop` перед мерджем или перед отправкой изменений на сервер в случае, если ваша ветка отстала от `develop`:

```bash
  $ git checkout develop
  $ git pull
  $ git checkout <ветка-задачи>
  $ git rebase develop
```

или
```bash
  $ git pull --rebase origin develop
```

### Код-ревью

В процессе ревью участники проекта оставляют вопросы или замечания, на которые необходимо дать ответ в треде и внести изменения в код, если требуется. Закрывать тред имеет право только его автор. Pull Request допускается к мерджу только в случае, если закрыты все обсуждения в нем.

Если в процессе ревью возникает необходимость правок, ревьюер помечает Pull Request как черновик, что говорит о том, что он не готов к мерджу. После внесения требуемых изменений, исполнитель задачи убирает статус черновика, что означает, что PR готов к новому раунду ревью.

Мердж Pull Request в ветку разработки осуществляет руководитель группы разработки.