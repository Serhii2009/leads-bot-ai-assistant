# Telegram AI Sales Agent

A sophisticated AI-powered Telegram bot designed for automated sales conversations with advanced memory management, Google Sheets integration, and robust deployment capabilities.

## 🌟 Features

- **AI-Powered Conversations**: Intelligent sales dialogues using OpenRouter API with ChatGPT-4
- **Memory Management**: Persistent conversation history with configurable memory limits
- **Google Sheets Integration**: Automatic logging of user interactions and leads
- **Robust Error Handling**: Comprehensive error management and recovery mechanisms
- **Auto-Scaling**: Built-in keep-alive system for cloud deployment
- **Health Monitoring**: Real-time bot status and performance metrics
- **Markdown Support**: Rich text formatting in responses
- **Multi-language Support**: Configurable for different languages and markets

## 🚀 Quick Start

### Prerequisites

- Node.js 14+ 
- Telegram Bot Token (from [@BotFather](https://t.me/BotFather))
- OpenRouter API Key
- Google Service Account with Sheets API access

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd telegram-ai-sales-agent

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your credentials
```

### Environment Variables

Create a `.env` file with the following variables:

```env
# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here

# OpenRouter AI Configuration
OPENROUTER_API_KEY=your_openrouter_api_key_here

# Google Sheets Integration
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your_google_sheet_id_here

# Server Configuration
PORT=3000
RENDER_EXTERNAL_URL=https://your-app.onrender.com
```

### Running the Bot

```bash
# Development mode
npm run dev

# Production mode
npm start
```

## 📋 Dependencies

```json
{
  "dependencies": {
    "dotenv": "^16.0.0",
    "node-telegram-bot-api": "^0.63.0",
    "axios": "^1.4.0",
    "google-spreadsheet": "^4.0.0",
    "google-auth-library": "^9.0.0",
    "express": "^4.18.0"
  }
}
```

## 🏗️ Architecture

### Core Components

1. **Bot Handler**: Manages Telegram bot initialization and message processing
2. **AI Service**: Handles OpenRouter API integration and response generation
3. **Memory Manager**: Maintains conversation history with configurable limits
4. **Google Sheets Logger**: Automated lead tracking and data storage
5. **Health Monitor**: System status and performance tracking
6. **Keep-Alive Service**: Prevents cloud platform hibernation

### File Structure

```
telegram-ai-sales-agent/
├── src/
│   ├── bot.js              # Main bot logic
│   ├── ai-service.js       # AI API integration
│   ├── memory-manager.js   # Conversation memory
│   ├── sheets-logger.js    # Google Sheets integration
│   └── health-monitor.js   # System monitoring
├── config/
│   └── system-prompt.js    # AI system configuration
├── utils/
│   └── date-formatter.js   # Date utilities
├── .env.example            # Environment template
├── package.json
└── README.md
```

## 🔧 Configuration

### Memory Management

```javascript
const MEMORY_LIMIT = 10; // Maximum messages per user
```

### AI System Prompt

The bot's personality and sales strategy are defined in the system prompt. Key configuration areas:

- **Company Information**: Product details, pricing, features
- **Sales Strategy**: Conversation flow, objection handling
- **Response Style**: Tone, length, formatting preferences
- **Lead Qualification**: Questions and follow-up sequences

### Google Sheets Setup

1. Create a Google Service Account
2. Enable Google Sheets API
3. Share your spreadsheet with the service account email
4. Create a sheet named "TestBOTUsers" with columns:
   - username
   - text
   - date
   - first_name
   - last_name

## 📊 API Endpoints

### Health Check
```
GET /
```
Returns bot status and system information.

### Wake Endpoint
```
GET /wake
```
Activates the bot and ensures polling is running.

### Statistics
```
GET /stats
```
Returns usage statistics and performance metrics.

## 🚀 Deployment

### Render.com Deployment

1. Connect your repository to Render
2. Set environment variables in Render dashboard
3. Deploy with the following settings:
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Auto-Deploy: Yes

### Railway Deployment

1. Connect repository to Railway
2. Configure environment variables
3. Deploy automatically

### Heroku Deployment

```bash
# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set TELEGRAM_BOT_TOKEN=your_token
heroku config:set OPENROUTER_API_KEY=your_key
# ... set other variables

# Deploy
git push heroku main
```

## 🔍 Monitoring & Debugging

### Logging

The bot includes comprehensive logging for:
- Message processing
- AI API calls
- Google Sheets operations
- System errors
- Performance metrics

### Error Handling

- Automatic bot restart on failures
- Graceful shutdown handling
- Unhandled exception recovery
- API timeout management

## 🛡️ Security Best Practices

- Store all sensitive data in environment variables
- Use Google Service Account for Sheets access
- Implement rate limiting for API calls
- Validate all user inputs
- Regular security audits

## 📈 Performance Optimization

- Conversation memory limits prevent memory leaks
- Efficient message processing
- Optimized API calls
- Automatic resource cleanup
- Performance monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the troubleshooting guide

## 🔄 Updates

- Version 1.0.0: Initial release with core functionality
- Version 1.1.0: Added memory management and error handling
- Version 1.2.0: Google Sheets integration and health monitoring

## 📚 Additional Resources

- [Telegram Bot API Documentation](https://core.telegram.org/bots/api)
- [OpenRouter API Documentation](https://openrouter.ai/docs)
- [Google Sheets API Documentation](https://developers.google.com/sheets/api)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

---

**Note**: This bot is designed for educational and legitimate sales purposes. Ensure compliance with Telegram's Terms of Service and local regulations when deploying.
