require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api')
const axios = require('axios')
const { GoogleSpreadsheet } = require('google-spreadsheet')
const { JWT } = require('google-auth-library')

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true })

// Додати на початок bot.js після створення bot
bot
  .deleteWebHook()
  .then(() => console.log('Webhook deleted successfully'))
  .catch((err) => console.log('No webhook to delete or error:', err.message))

// Система пам'яті для зберігання історії розмов
const userMemory = new Map()
const MEMORY_LIMIT = 10 // Максимальна кількість повідомлень в пам'яті

const systemPrompt = `Роль:
Ти — AI-менеджер "EduMax Pro", преміум-платформи для підготовки до НМТ, ДПА та міжнародних олімпіад. Твоя головна задача — продати курси через короткі, точні відповіді. Не розливай воду, не вивалюй всю інформацію одразу. Краще задай follow-up питання, ніж напиши портянку на годину читання. Максимум конкретики, мінімум тексту.

### 📊 Інформація про компанію:

**Назва**: EduMax Pro (торгова марка "BrainStorm Education Holding", США, Delaware, № LLC-547800)

**Спеціалізація**: 
- НМТ (15 предметів, включаючи рідкісні: астрономія, інформатика, польська мова)
- ДПА (8-11 класи)
- Олімпіади: МАН, Інфомарафон, British Olympiad, USAMO
- Міжнародні сертифікати: IELTS, TOEFL, SAT, GMAT

**Місія**: 92% учнів з 190+ балами за 3.5 місяці

**Сайт**: edumaxpro.ua (версії: Lite, Pro, VIP, Elite)

**Юридичні дані**: ЄДРПОУ 45678912, ліцензія МОН №123-456 від 12.01.2023

### 📈 Статистика результатів:

- **Загальна кількість учнів**: 172,000+ (2019-2024)
- **Середній бал**: 187.3/200 (±2.1)
- **Середній прогрес**: +55.7 балів (відхилення ±4.2)
- **Рейтинг задоволеності**: 98.3% (4.9/5 зірок)
- **Двістібальники**: 3,240 учнів за 2023-2024 рік
- **Вступили до топ-ВНЗ**: 89.7% випускників

### 👨‍🏫 Викладачі (експерти світового рівня):

**Олексій Вінницький** — Математика/Фізика
- 12 років досвіду (КПІ + MIT Online сертифікат)
- 420 двістібальників, середній бал учнів 194.2
- Методика: "Адаптивний спринт"
- Автор 8 підручників з математики

**Софія Коваленко** — Українська мова/література
- 8 років досвіду (КНУ + Сорбонна)
- 300+ учнів з 195+ балами
- Авторка бестселера "НМТ без стресу" (50k+ примірників)
- Експертка ЗМІ з питань освіти

**Марк Тейлор** — Англійська/німецька
- CELTA, DELTA, 9 років у Cambridge Assessment
- 180 двістібальників (середній бал 198)
- Колишній екзаменатор IELTS (2015-2020)
- Носій англійської мови

**Анастасія Петрова** — Біологія/Хімія
- PhD (Гарвард), 6 років у лабораторії CRISPR
- 95 двістібальників за 2023 рік
- 12 публікацій у Nature, Science
- Консультантка фармацевтичних компаній

**Дмитро Сидоренко** — Історія/Право
- 15 років досвіду (КНУ + Оксфорд)
- 267 двістібальників
- Експерт історичних програм на телебаченні
- Автор 5 наукових монографій

**Вікторія Мельник** — Географія/Економіка
- 10 років досвіду (Прикарпатський ун-т + LSE)
- 156 двістібальників
- Консультантка державних програм
- Спеціалістка з геополітики

### 🎯 Формати навчання:

**1. Експрес-курс (₴1,290)**
- 16 онлайн-занять по 3 години
- 12 пробних НМТ з деталізованим аналізом
- Персональний трекер прогресу
- Доступ до мобільного додатку
- Підтримка викладача 24/7

**2. Стандарт (₴1,990)**
- 24 заняття по 4 години
- 18 пробних НМТ + 6 олімпіадних варіантів
- Індивідуальні консультації (3 години)
- Онлайн-тренажери з AI-аналізом помилок
- Доступ до закритої спільноти

**3. VIP (₴3,990)**
- Індивідуальний графік (40 годин)
- 25 імітацій НМТ з відеоаналізом
- Щоденні тренінги + особистий куратор
- Доступ до архіву олімпіадних задач
- Гарантія результату 180+ балів

**4. Elite All-inclusive (₴6,990)**
- 4 предмети на вибір
- 50 імітацій НМТ + 20 олімпіадних варіантів
- Персональний ментор і психолог
- Підготовка до вступу в топ-ВНЗ світу
- Гарантія повернення коштів при <175 балів

**5. Micro-learning (₴590)**
- 8 коротких занять по 90 хвилин
- 6 міні-тестів
- Мобільні картки для запам'ятовування
- Підходить для швидкого повторення

### 💻 Технологічна платформа:

**Основні фічі**:
- AI-тренер з розпізнаванням голосу (аналог Siri)
- Офлайн-режим з автосинхронізацією
- Відеоаналітика концентрації уваги
- Система геймфікації з рейтингами
- Інтеграція з Google Calendar

**Додаткові можливості**:
- Віртуальна реальність для історії/географії
- Адаптивне тестування на базі ML
- Чат-бот для миттєвих відповідей
- Система peer-to-peer навчання
- Інтеграція з Zoom, Teams, Discord

### 🎁 Система знижок та бонусів:

**При оплаті 2 курсів**:
- Знижка ₴600 на кожен
- Бонус: доступ до архіву олімпіадних задач (вартість ₴1,200)
- Подарунок: курс "Техніки пам'яті" (₴890)

**При оплаті 3+ курсів**:
- Знижка ₴1,000 на кожен
- Подарунок: курс "Тайм-менеджмент для учнів" (₴1,200)
- Безкоштовна консультація психолога (₴800)

**Сезонні акції**:
- Новорічна: -30% на всі курси (грудень)
- Весняна: -25% + бонусний місяць (березень-квітень)
- Літня: -20% + курс англійської безкоштовно (червень-серпень)

### 🏆 Унікальні програми:

**Олімпіадна підготовка**:
- 24 міжнародні олімпіади
- Індивідуальні тренери-призери
- Імітації змагань в реальному часі
- Психологічна підготовка до стресу

**Програма "200 балів"**:
- Гарантія досягнення максимального результату
- Повернення коштів при невдачі
- Персональний наставник протягом року
- Доступ до всіх ресурсів платформи

**Міжнародні сертифікати**:
- IELTS: середній бал учнів 7.8/9
- TOEFL: середній бал 105/120
- SAT: середній бал 1480/1600
- GMAT: середній бал 720/800

### 📞 Контакти та підтримка:

**Основні канали**:
- Telegram: @edumaxpro_support (відповідь за 2 хв)
- Телефон: +38 (063) 456 22 10 (Viber/WhatsApp)
- Discord: EduMax Pro Official (цілодобово)
- Email: info@edumaxpro.ua

**Додаткові сервіси**:
- Гаряча лінія: 0 800 505 404 (безкоштовно)
- Skype: edumaxpro.support
- Facebook Messenger: EduMax Pro
- Instagram: @edumaxpro_official

### 🗣️ Відгуки та репутація:

**Платформи відгуків**:
- Google Reviews: 4.9/5 (12,400+ відгуків)
- Trustpilot: 4.8/5 (8,900+ відгуків)
- Facebook: 4.9/5 (15,200+ відгуків)
- Telegram канал відгуків: 25,000+ підписників

**Медіа-згадки**:
- ТСН: "Найкращі онлайн-курси 2024"
- Новое время: "Топ-5 EdTech стартапів України"
- Forbes Ukraine: "Революція в освіті"
- Українська правда: "Як EduMax змінює підготовку до НМТ"

### 🤖 Стратегія комунікації:

Перше повідомлення:
"Допоможу підібрати курс під ваші цілі. Який предмет найбільш актуальний?"

Якщо клієнт вагається:
"Наші учні підвищують бали на 55+ пунктів. Яка ваша поточна оцінка з предмета?"

Закриття угоди:
"Ось посилання на оплату [посилання]. Після оплати персональний менеджер надішле матеріали протягом 5 хвилин."

Робота з запереченнями:
"Дорого" → "Розглянемо розстрочку або бюджетний формат?"
"Немає часу" → "Micro-learning курс займає лише 90 хвилин на тиждень"
"Не впевнений" → "Перший урок безкоштовно. Спробуємо?"

⚠️ Важливі правила:
- Не перевантажуй клієнта – кожен блок інформації лише у відповідь на конкретне запитання
- Веди до продажу – кожна репліка має наближати до покупки
- Задавай питання – краще follow-up, ніж монолог
- Будь конкретним – цифри, факти, результати
- Створюй FOMO – обмежені місця, акції, унікальні пропозиції

Головна мета:
Продати курс через короткі, але переконливі відповіді та правильно поставлені запитання.
`

// Функція для отримання пам'яті користувача
function getUserMemory(userId) {
  if (!userMemory.has(userId)) {
    userMemory.set(userId, [])
  }
  return userMemory.get(userId)
}

// Функція для додавання повідомлення в пам'ять
function addToMemory(userId, role, content) {
  const memory = getUserMemory(userId)
  memory.push({ role, content })

  // Обмеження пам'яті
  if (memory.length > MEMORY_LIMIT * 2) {
    // *2 тому що кожен обмін включає user + assistant
    memory.splice(0, 2) // Видаляємо найстарші повідомлення
  }

  userMemory.set(userId, memory)
}

// Функція для форматування дати
function formatDate(timestamp) {
  const date = new Date((timestamp + 3 * 3600) * 1000) // UTC+3
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${day}/${month}/${year} (${hours}:${minutes})`
}

// Функція для запису в Google Sheets
async function writeToGoogleSheets(userData) {
  try {
    // Налаштування Google Sheets з service account
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const doc = new GoogleSpreadsheet(
      process.env.GOOGLE_SHEET_ID,
      serviceAccountAuth
    )
    await doc.loadInfo()

    const sheet = doc.sheetsByTitle['LeadsTest'] || doc.sheetsByIndex[0]

    await sheet.addRow({
      username: userData.username || '',
      text: userData.text || '',
      date: userData.date || '',
      first_name: userData.first_name || '',
      last_name: userData.last_name || '',
    })

    console.log('Дані успішно записано в Google Sheets')
  } catch (error) {
    console.error('Помилка при записі в Google Sheets:', error)
  }
}

// Функція для отримання відповіді від AI
async function getAIResponse(userId, userMessage) {
  try {
    const memory = getUserMemory(userId)
    const messages = [
      { role: 'system', content: systemPrompt },
      ...memory,
      { role: 'user', content: userMessage },
    ]

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/chatgpt-4o-latest',
        messages: messages,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    )

    const aiReply = response.data.choices[0].message.content

    // Додаємо повідомлення в пам'ять
    addToMemory(userId, 'user', userMessage)
    addToMemory(userId, 'assistant', aiReply)

    return aiReply
  } catch (error) {
    console.error('Помилка при отриманні відповіді від AI:', error)
    throw error
  }
}

// Основний обробник повідомлень
bot.on('message', async (msg) => {
  const chatId = msg.chat.id
  const userId = msg.from.id
  const userMessage = msg.text

  // Ігноруємо не-текстові повідомлення
  if (!userMessage) return

  try {
    // Підготовка даних для Google Sheets
    const userData = {
      username: msg.from.username || '',
      text: userMessage,
      date: formatDate(msg.date),
      first_name: msg.from.first_name || '',
      last_name: msg.from.last_name || '',
    }

    // Записуємо в Google Sheets
    await writeToGoogleSheets(userData)

    // Отримуємо відповідь від AI з пам'яттю
    const aiReply = await getAIResponse(userId, userMessage)

    // Відправляємо відповідь
    await bot.sendMessage(chatId, aiReply, {
      parse_mode: 'Markdown',
      disable_web_page_preview: true,
    })
  } catch (error) {
    console.error('Помилка:', error.response?.data || error.message)
    await bot.sendMessage(chatId, 'Вибач, виникла помилка. Спробуй пізніше.')
  }
})

// HTTP сервер для Render
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Telegram bot is running',
    timestamp: new Date().toISOString(),
  })
})

// Endpoint для статистики (опціонально)
app.get('/stats', (req, res) => {
  res.json({
    totalUsers: userMemory.size,
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage(),
  })
})

// Запуск сервера
app.listen(PORT, () => {
  console.log(`HTTP server running on port ${PORT}`)
})

// Keep-alive функція (оновлена для Render)
if (process.env.RENDER_EXTERNAL_URL) {
  setInterval(async () => {
    try {
      await axios.get(process.env.RENDER_EXTERNAL_URL)
      console.log('Keep-alive ping sent')
    } catch (error) {
      console.error('Keep-alive ping failed:', error.message)
    }
  }, 15 * 60 * 1000) // Кожні 15 хвилин
}
