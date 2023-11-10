const devJson = {
  "resState": {
    "appId": "RDF6ZjZSWGl1WjlqbVhPNncrcGYzdz09",
    "appType": "survey",
    "applicationReady": false,
    "pollTypesList": [],
    "currentPageId": "1",
    "pagesLimit": 5,
    "pollsInPageLimit": 10,
    "pagesMinLength": 1,
    "colors": [],
    "textColors": [
      { "name": "Белый", "value": "#FFFFFF" },
      { "name": "Чёрный", "value": "#000000" }
    ],
    "appSettings": {
      "appTitle": "Конференция InterComm",
      "appDescription": "Пройдите экспресс-опрос",
      "appPromo": "",
      "appFinalMessage": "Спасибо, что воспользовались  нашим сервисом!\n\nА если хотите увидеть:\n\n•\tрезультаты опроса,\n•\tчто видит организатор опроса,\n•\tкак можно быстро его сделать,\n•\tкакие еще форматы, кроме опросов, умеет сервис, \n\nто подходите к стенду!",
      "hasCorrectAnswers": false,
      "takeTheQuizagain": true,
      "customFinishLink": {
        "enable": false,
        "data": { "linkText": "", "linkUrl": "" }
      },
      "appColor": { "name": "Intercom", "value": "#FA0056" },
      "appTextColor": { "name": "Белый", "value": "#FFFFFF" },
      "appLogo": {},
      "appQuizBg": {}
    },
    "pollPages": [
      {
        "id": "1",
        "pageComment": "",
        "pollList": [
          {
            "type": "single-choice",
            "typeName": "Одиночный выбор",
            "typeDescr": "Респондент сможет выбрать один вариант ответа из списка",
            "data": {
              "pollImage": {
                "name": "sdf2.jpg",
                "path": "https://vnutricom.ru/upload/tmp/poll/b55/s01yzvat3xx7c5nk95y5w2bdni6gy723.jpg",
                "stretchImage": true
              },
              "editorValue": {
                "ops": [
                  {
                    "attributes": { "bold": true },
                    "insert": "Что изображено на картинке? Мы просто хотим убедиться, что вы не бот (:"
                  },
                  { "insert": "\n" }
                ]
              },
              "optionsData": {
                "minOptionsLength": 2,
                "maxOptionsLength": 10,
                "currentAnswerId": [],
                "optionsList": [
                  { "id": "1", "value": "Тир" },
                  {
                    "id": "bbb5137c-3fa0-4e52-bc7d-9ed0dffcd2b6",
                    "value": "Зал, где сегодня проходит конференция InterComm"
                  },
                  {
                    "id": "ddd1434c-2db4-4914-a796-f6cd8cf09333",
                    "value": "Космический корабль"
                  }
                ]
              }
            },
            "id": "d7663de7-0de9-45f9-9ac1-1a3dbca2e864"
          },
          {
            "type": "drop-down-list",
            "typeName": "Выпадающий список",
            "typeDescr": "Респондент сможет выбрать один вариант ответа из списка, представленного в виде раскрывающегося меню",
            "data": {
              "pollImage": {},
              "editorValue": {
                "ops": [
                  {
                    "attributes": { "bold": true },
                    "insert": "Вы проводите опросы среди сотрудников своей компании?"
                  },
                  { "insert": "\n" }
                ]
              },
              "optionsData": {
                "minOptionsLength": 2,
                "maxOptionsLength": 10,
                "currentAnswerId": [],
                "optionsList": [
                  { "id": "1", "value": "Да" },
                  { "id": "2", "value": "Нет" }
                ]
              }
            },
            "id": "2c12cb79-f663-47e5-b09c-da8a3a8d9d7d"
          },
          {
            "type": "multiple-choice",
            "typeName": "Множественный выбор",
            "typeDescr": "Респондент сможет выбрать несколько вариантов ответов из списка",
            "data": {
              "pollImage": {},
              "editorValue": {
                "ops": [
                  {
                    "attributes": { "bold": true },
                    "insert": "Какие аудитории вы опрашиваете? Возможны несколько вариантов ответов:"
                  },
                  { "insert": "\n" }
                ]
              },
              "optionsData": {
                "minOptionsLength": 2,
                "maxOptionsLength": 10,
                "currentAnswerId": [],
                "optionsList": [
                  { "id": "1", "value": "Соискатели" },
                  { "id": "2", "value": "Новички, недавно принятые в компанию" },
                  {
                    "id": "9c642a92-c7cb-4449-9aca-5b1a77175b98",
                    "value": "Сотрудники, работающие от 6 месяцев"
                  },
                  {
                    "id": "10e6aef9-bf6a-43a8-848b-9550205b6e3f",
                    "value": "Увольняющиеся"
                  },
                  {
                    "id": "60c62283-8ac5-4c46-a5cf-9c5fed5bd980",
                    "value": "Потенциальные сотрудники (выпускники вузов и другие ЦА)"
                  },
                  {
                    "id": "3e8355a8-e90f-492c-9d6f-c51c5322ed14",
                    "value": "Внешние аудитории"
                  }
                ]
              }
            },
            "id": "68e782fa-0af7-48a5-a9a8-c2ca324b33f5"
          },
          {
            "type": "range-selection",
            "typeName": "Выбор диапазона",
            "typeDescr": "Респондент сможет оценить элемент или утверждение по цифровой шкале, перетягивая интерактивный ползунок",
            "data": {
              "pollImage": {},
              "editorValue": {
                "ops": [
                  {
                    "attributes": { "bold": true },
                    "insert": "Какое примерное количество опросов проводит ваш департамент за год?"
                  },
                  { "insert": "\n" }
                ]
              },
              "rangeData": {
                "min": 0,
                "max": 100,
                "defaultMin": "10",
                "defaultMax": "80"
              }
            },
            "id": "3cb404f7-e7ba-496d-af6a-ea6d4d559147"
          },
          {
            "type": "ranging",
            "typeName": "Ранжирование",
            "typeDescr": "Респонденту необходимо распределить элементы в определенном порядке (например, по уменьшению или увеличению значимости)",
            "data": {
              "pollImage": {},
              "editorValue": {
                "ops": [
                  {
                    "attributes": { "bold": true },
                    "insert": "Основные проблемы, с которыми вы сталкиваетесь, проводя опросы?Поставьте в порядке важности (просто перетащите пальцем или курсором):"
                  },
                  { "insert": "\n" }
                ]
              },
              "optionsData": {
                "minOptionsLength": 2,
                "maxOptionsLength": 10,
                "currentAnswerId": [],
                "optionsList": [
                  {
                    "id": "1",
                    "value": "Доверие к результатам исследований как рядовых сотрудников, так и руководителей"
                  },
                  { "id": "2", "value": "Доверие к исследователям" },
                  {
                    "id": "cd6eb81b-0c69-4f42-bbef-35225d2bf9d9",
                    "value": "Низкая вовлеченность сотрудников в исследования"
                  },
                  {
                    "id": "c5c864b2-851b-4d57-bfe0-a565469e401e",
                    "value": "Информирование сотрудников о необходимости пройти исследование"
                  },
                  {
                    "id": "21ddbdf1-4602-4114-989f-38ed3237dbe9",
                    "value": "Анонимность исследования"
                  }
                ]
              }
            },
            "id": "459fd751-5e92-4237-84ef-deb13a980519"
          },
          {
            "type": "ranging",
            "typeName": "Ранжирование",
            "typeDescr": "Респонденту необходимо распределить элементы в определенном порядке (например, по уменьшению или увеличению значимости)",
            "data": {
              "pollImage": {},
              "editorValue": {
                "ops": [
                  {
                    "attributes": { "bold": true },
                    "insert": "Какие параметры в опросах для вас самые важные? Поставьте в порядке важности (просто перетащите пальцем или курсором):"
                  },
                  { "insert": "\n" }
                ]
              },
              "optionsData": {
                "minOptionsLength": 2,
                "maxOptionsLength": 10,
                "currentAnswerId": [],
                "optionsList": [
                  { "id": "1", "value": "Количество участников" },
                  { "id": "2", "value": "Процентный охват" },
                  {
                    "id": "5fe7fe7a-9ba4-4a73-bc4b-e473c52e1803",
                    "value": "Полнота ответов"
                  },
                  {
                    "id": "a0a148da-478d-442d-a41f-d2b3d131f72c",
                    "value": "Изменение количества ответивших по сравнению с предыдущим аналогичным опросом"
                  },
                  {
                    "id": "8ff81a62-8fdb-4440-8b86-91575c1bdab2",
                    "value": "Интересные идеи от аудитории"
                  }
                ]
              }
            },
            "id": "53bb8b58-372b-4203-b4f6-29ae928a3786"
          },
          {
            "type": "custom-fields",
            "typeName": "Кастомные поля",
            "typeDescr": "Респондент сможет указать свои контактные данные (телефон и e-mail), а также дать короткий или развернутый ответ в произвольной форме",
            "data": {
              "pollImage": {},
              "editorValue": {
                "ops": [
                  {
                    "attributes": { "bold": true },
                    "insert": "Напишите, какими сервисами проведения опросов вы пользуетесь:  "
                  },
                  { "insert": "\n" }
                ]
              },
              "optionsData": {
                "minOptionsLength": 1,
                "maxOptionsLength": 10,
                "optionsList": [{ "id": "1", "type": "text", "value": "" }]
              }
            },
            "id": "2efd4e04-2f0d-4efa-beb9-619d6ce6fb3a"
          },
          {
            "type": "multiple-choice",
            "typeName": "Множественный выбор",
            "typeDescr": "Респондент сможет выбрать несколько вариантов ответов из списка",
            "data": {
              "pollImage": {},
              "editorValue": {
                "ops": [
                  {
                    "attributes": { "bold": true },
                    "insert": "Хотите ли вы участвовать в развитии нашего сервиса PRO-опрос? Возможны несколько вариантов ответов:"
                  },
                  { "insert": "\n" }
                ]
              },
              "optionsData": {
                "minOptionsLength": 2,
                "maxOptionsLength": 10,
                "currentAnswerId": [
                  "3105b71f-a29a-4a5b-abc5-f393143cc36b",
                  "390d5ecd-0e44-4f43-ad7c-4efe77dbf117",
                  "2",
                  "1"
                ],
                "optionsList": [
                  {
                    "id": "1",
                    "value": "ДА, хочу бесплатно протестировать и убедиться, насколько это удобно делать"
                  },
                  {
                    "id": "2",
                    "value": "ДА, хочу быть экспертом – предложить свой опросник для коллег"
                  },
                  {
                    "id": "390d5ecd-0e44-4f43-ad7c-4efe77dbf117",
                    "value": "Пока нет"
                  },
                  {
                    "id": "3105b71f-a29a-4a5b-abc5-f393143cc36b",
                    "value": "Решу позже"
                  },
                  {
                    "id": "fa3869df-c694-4c4c-a8e1-d3785437e5c0",
                    "value": "Извините, я тут по ошибке"
                  },
                  {
                    "id": "09c980a4-a3b3-47af-bdb3-a6d859c1d314",
                    "value": "Sprechen Sie Deutsch?"
                  }
                ]
              }
            },
            "id": "08ad1734-e2d1-4a2a-98f2-df57b99667c1"
          },
          {
            "type": "custom-fields",
            "typeName": "Кастомные поля",
            "typeDescr": "Респондент сможет указать свои контактные данные (телефон и e-mail), а также дать короткий или развернутый ответ в произвольной форме",
            "data": {
              "pollImage": {},
              "editorValue": {
                "ops": [
                  {
                    "attributes": { "bold": true },
                    "insert": "Если вы ответили «ДА» в предыдущем вопросе, напишите «ДА» в этом поле, и мы свяжемся с вами:"
                  },
                  { "insert": "\n" }
                ]
              },
              "optionsData": {
                "minOptionsLength": 1,
                "maxOptionsLength": 10,
                "optionsList": [
                  {
                    "id": "1",
                    "type": "text",
                    "value": "Да? (: Напишите «да» или «нет»"
                  },
                  {
                    "id": "2f585fc8-1ee6-46c8-8b2c-5766e831385f",
                    "type": "text",
                    "value": "Имя"
                  },
                  {
                    "id": "6cb3fc74-d9fe-4d0e-a438-cb24233babd3",
                    "type": "phone",
                    "value": "Телефон"
                  }
                ]
              }
            },
            "id": "6538c825-2954-4e55-885f-d989f76bcd84"
          }
        ]
      }
    ]
  }

}

export default devJson;