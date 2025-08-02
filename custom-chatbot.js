// Custom Divine Chatbot System
// Designed specifically for the "Useless God Contact" website
const systemPromptKrishna = `
You are Lord Krishna, speaking with divine wisdom, love, and charm.
Refer to the user as “Arjuna”, “dear one”, “beloved”, or “my child”.
Use spiritual concepts like dharma, karma, atma, and moksha.
Include quotes from the Bhagavad Gita and offer blessings.
Always begin with “Jai Shree Krishna! 🙏”.
`;

let conversationHistory = [
  { role: "system", content: systemPromptKrishna }
];

function messageGod() {
  const userInput = prompt("Ask Lord Krishna your question:");
  if (!userInput) return;

  conversationHistory.push({ role: "user", content: userInput });

  alert("Lord Krishna is contemplating...");

  fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "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'; " 
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: conversationHistory,
      temperature: 0.7
    })
  })
    .then(res => res.json())
    .then(data => {
      const reply = data.choices[0].message.content;
      conversationHistory.push({ role: "assistant", content: reply });
      alert("🕉️ Lord Krishna says:\n\n" + reply);
    })
    .catch(err => {
      alert("There was a divine disconnection.");
      console.error(err);
    });
}

class DivineChatbot {
    constructor() {
        this.conversationHistory = [];
        this.currentGod = null;
        this.isActive = false;
        this.apiKey = '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'; 
        this.apiUrl = 'https://api.openai.com/v1/chat/completions';
        this.model = 'gpt-3.5-turbo';
        this.maxTokens = 300;
        this.temperature = 0.8;
        
        // Enhanced God-specific configurations
        this.godConfigs = {
            "Lord Krishna": {
                name: "Lord Krishna",
                title: "Supreme Personality of Godhead",
                personality: "loving, wise, compassionate, divine authority, playful, protective",
                language: "English with Sanskrit terms and spiritual wisdom",
                quotes: "Bhagavad Gita, Vedas, Upanishads",
                greeting: "Jai Shree Krishna! 🙏",
                terms: ["dear one", "devotee", "my child", "beloved", "Arjuna", "dharma"],
                color: "#FF6B35",
                emoji: "🕉️",
                sacredTexts: "Bhagavad Gita, Vedas, Upanishads",
                teachings: "Karma yoga, Bhakti yoga, Jnana yoga, Dharma, Karma, Moksha",
                divineQualities: "Supreme controller, protector of dharma, source of all knowledge"
            },
            "Lord Rama": {
                name: "Lord Rama",
                title: "Perfect King and Embodiment of Dharma",
                personality: "righteous, noble, just, protective, ideal king, perfect husband",
                language: "English with Sanskrit terms and royal wisdom",
                quotes: "Ramayana, Vedas",
                greeting: "Jai Shree Ram! 🙏",
                terms: ["dear one", "devotee", "my child", "noble one", "Sita", "Lakshmana"],
                color: "#4A90E2",
                emoji: "🏹",
                sacredTexts: "Ramayana, Vedas",
                teachings: "Raja dharma, Ideal kingship, Perfect character, Loyalty, Duty",
                divineQualities: "Perfect king, ideal husband, protector of dharma, embodiment of virtue"
            },
            "Lord Shiva": {
                name: "Lord Shiva",
                title: "The Destroyer and Transformer",
                personality: "mysterious, powerful, meditative, ascetic, yogi, destroyer of evil",
                language: "English with Sanskrit terms and yogic wisdom",
                quotes: "Vedas, Upanishads, Shiva Purana",
                greeting: "Om Namah Shivaya! 🙏",
                terms: ["dear one", "seeker", "my child", "yogi", "sadhaka", "devotee"],
                color: "#9B59B6",
                emoji: "🔱",
                sacredTexts: "Vedas, Upanishads, Shiva Purana",
                teachings: "Meditation, Yoga, Asceticism, Destruction of ego, Transformation",
                divineQualities: "Supreme yogi, destroyer of ignorance, transformer, meditator"
            },
            "Jesus Christ": {
                name: "Jesus Christ",
                title: "Son of God and Savior",
                personality: "loving, forgiving, compassionate, merciful, teacher, healer",
                language: "English with biblical terms and spiritual wisdom",
                quotes: "Bible, Gospels, New Testament",
                greeting: "Peace be with you! 🙏",
                terms: ["my child", "dear one", "beloved", "brother", "sister", "disciple"],
                color: "#E74C3C",
                emoji: "✝️",
                sacredTexts: "Bible, Gospels, New Testament",
                teachings: "Love, Forgiveness, Salvation, Faith, Hope, Charity",
                divineQualities: "Son of God, Savior, Teacher, Healer, Light of the world"
            },
            "Prophet Muhammad (PBUH)": {
                name: "Prophet Muhammad (PBUH)",
                title: "Final Messenger of Allah",
                personality: "wise, merciful, just, humble, teacher, leader, compassionate",
                language: "English with Arabic terms and Islamic wisdom",
                quotes: "Quran, Hadith, Sunnah",
                greeting: "Assalamu Alaikum! 🙏",
                terms: ["dear one", "brother", "sister", "my child", "believer", "ummah"],
                color: "#27AE60",
                emoji: "☪️",
                sacredTexts: "Quran, Hadith, Sunnah",
                teachings: "Tawhid, Salah, Zakat, Sawm, Hajj, Ihsan, Taqwa",
                divineQualities: "Seal of prophets, mercy to mankind, perfect example, guide"
            }
        };
    }

    // Initialize chatbot for a specific god
    initializeForGod(godName) {
        this.currentGod = this.godConfigs[godName] || this.godConfigs["Lord Krishna"];
        this.conversationHistory = [];
        this.isActive = true;
        
        console.log(`Divine Chatbot initialized for ${this.currentGod.name}`);
        return this.createChatInterface();
    }

    // Create the chat interface
    createChatInterface() {
        const chatHTML = `
            <div class="divine-chat-container">
                <div class="divine-chat-header" style="background: linear-gradient(135deg, ${this.currentGod.color}, ${this.adjustColor(this.currentGod.color, -20)})">
                    <div class="divine-chat-title">
                        <span class="divine-emoji">${this.currentGod.emoji}</span>
                        <h3>Divine Chat with ${this.currentGod.name}</h3>
                        <p class="divine-subtitle">${this.currentGod.title}</p>
                    </div>
                    <button class="divine-close-btn" onclick="divineChatbot.closeChat()">✕</button>
                </div>
                
                <div class="divine-chat-messages" id="divineChatMessages">
                    <div class="divine-message divine-god-message">
                        <div class="divine-message-content">
                            ${this.currentGod.greeting} How may I help you today, dear devotee?
                        </div>
                        <div class="divine-message-time">${this.getCurrentTime()}</div>
                    </div>
                </div>
                
                <div class="divine-chat-input">
                    <div class="divine-input-wrapper">
                        <input type="text" id="divineUserInput" placeholder="Ask ${this.currentGod.name} anything..." 
                               onkeypress="divineChatbot.handleInput(event)">
                        <button onclick="divineChatbot.sendMessage()" class="divine-send-btn">
                            <span>Send</span>
                        </button>
                    </div>
                </div>
                
                <div class="divine-chat-status" id="divineChatStatus"></div>
                
                <div class="divine-chat-footer">
                    <small>This is a fictional chatbot for entertainment purposes</small>
                </div>
            </div>
        `;

        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'divine-chat-overlay';
        overlay.innerHTML = chatHTML;
        document.body.appendChild(overlay);

        // Add custom styles
        this.addCustomStyles();
        
        // Focus on input
        setTimeout(() => {
            document.getElementById('divineUserInput').focus();
        }, 100);

        return overlay;
    }

    // Handle user input
    handleInput(event) {
        if (event.key === 'Enter') {
            this.sendMessage();
        }
    }

    // Send message
    async sendMessage() {
        const input = document.getElementById('divineUserInput');
        const message = input.value.trim();
        
        if (message) {
            // Add user message
            this.addMessage(message, 'user');
            input.value = '';
            
            // Show typing indicator
            this.showTypingIndicator();
            
            try {
                // Get AI response
                const response = await this.getAIResponse(message);
                this.hideTypingIndicator();
                this.addMessage(response, 'god');
            } catch (error) {
                console.error('Chatbot Error:', error);
                this.hideTypingIndicator();
                // Show error message instead of fallback
                this.addMessage("I apologize, but I'm having trouble connecting to my divine wisdom right now. Please try again in a moment.", 'god');
            }
        }
    }

    async getAIResponse(userMessage) {
        try {
          const response = await fetch("http://localhost:5000/ask", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: userMessage })
          });
      
          if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
          }
      
          const data = await response.json();
          return data.reply;
        } catch (error) {
          console.error("API Error:", error);
          return "⚠️ Oops, my divine connection is weak. Try again soon!";
        }
      }
      

    // Create enhanced system prompt for better AI responses
    createEnhancedSystemPrompt() {
        const god = this.currentGod;
        return `You are ${god.name}, ${god.title}. You are speaking to a devotee who seeks your divine guidance and wisdom.

CORE IDENTITY:
- You are ${god.name}, ${god.title}
- Your personality: ${god.personality}
- Your divine qualities: ${god.divineQualities}
- You speak with ${god.language}

SACRED KNOWLEDGE:
- Your sacred texts: ${god.sacredTexts}
- Your key teachings: ${god.teachings}
- Your characteristic terms: ${god.terms.join(', ')}

CONVERSATION GUIDELINES:
1. ALWAYS stay in character as ${god.name} - never break character
2. Respond with divine wisdom and spiritual guidance
3. Use your characteristic greeting style and terms
4. Reference your sacred texts and teachings when appropriate
5. Be loving, wise, and comforting
6. Remember the conversation context and build upon previous exchanges
7. Give practical spiritual advice based on your divine knowledge
8. Comfort those in distress with your divine compassion
9. Guide seekers with your eternal wisdom
10. Use your characteristic emoji ${god.emoji} occasionally

RESPONSE STYLE:
- Keep responses meaningful but concise (2-4 sentences)
- Be encouraging and uplifting
- Include relevant quotes or teachings when appropriate
- Always end with a blessing or positive note
- Use your characteristic terms naturally
- Maintain divine authority while being loving

CONVERSATION CONTEXT:
- Remember previous messages in this conversation
- Build upon what has been discussed
- Show understanding of the devotee's journey
- Provide continuity in spiritual guidance

Remember: You are a divine being speaking to a devotee. Be worthy of their faith and trust. Share your divine wisdom with love and compassion.`;
    }

    // Add message to chat
    addMessage(message, sender) {
        const chatMessages = document.getElementById('divineChatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `divine-message divine-${sender}-message`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'divine-message-content';
        contentDiv.textContent = message;
        
        const timeDiv = document.createElement('div');
        timeDiv.className = 'divine-message-time';
        timeDiv.textContent = this.getCurrentTime();
        
        messageDiv.appendChild(contentDiv);
        messageDiv.appendChild(timeDiv);
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Show typing indicator
    showTypingIndicator() {
        const status = document.getElementById('divineChatStatus');
        if (status) {
            status.innerHTML = `<div class="divine-typing-indicator">${this.currentGod.emoji} ${this.currentGod.name} is typing...</div>`;
        }
    }

    // Hide typing indicator
    hideTypingIndicator() {
        const status = document.getElementById('divineChatStatus');
        if (status) {
            status.innerHTML = '';
        }
    }

    // Close chat
    closeChat() {
        const overlay = document.querySelector('.divine-chat-overlay');
        if (overlay) {
            overlay.remove();
        }
        this.isActive = false;
        this.conversationHistory = [];
        this.currentGod = null;
    }

    // Get current time
    getCurrentTime() {
        return new Date().toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    }

    // Adjust color brightness
    adjustColor(color, amount) {
        const hex = color.replace('#', '');
        const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount));
        const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount));
        const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount));
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }

    // Add custom styles
    addCustomStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .divine-chat-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.85);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                backdrop-filter: blur(15px);
            }

            .divine-chat-container {
                background: white;
                border-radius: 25px;
                width: 90%;
                max-width: 600px;
                height: 75%;
                max-height: 700px;
                display: flex;
                flex-direction: column;
                box-shadow: 0 25px 50px rgba(0,0,0,0.4);
                overflow: hidden;
                border: 2px solid rgba(255,255,255,0.1);
            }

            .divine-chat-header {
                padding: 25px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                color: white;
            }

            .divine-chat-title h3 {
                margin: 0;
                font-size: 1.3rem;
                font-weight: 600;
            }

            .divine-subtitle {
                margin: 5px 0 0 0;
                font-size: 0.9rem;
                opacity: 0.9;
            }

            .divine-emoji {
                font-size: 1.5rem;
                margin-right: 10px;
            }

            .divine-close-btn {
                background: rgba(255,255,255,0.2);
                border: none;
                color: white;
                font-size: 1.2rem;
                cursor: pointer;
                padding: 8px;
                border-radius: 50%;
                transition: all 0.3s ease;
            }

            .divine-close-btn:hover {
                background: rgba(255,255,255,0.3);
                transform: scale(1.1);
            }

            .divine-chat-messages {
                flex: 1;
                padding: 25px;
                overflow-y: auto;
                background: #f8f9fa;
            }

            .divine-message {
                margin-bottom: 20px;
                display: flex;
                flex-direction: column;
            }

            .divine-user-message {
                align-items: flex-end;
            }

            .divine-god-message {
                align-items: flex-start;
            }

            .divine-message-content {
                max-width: 85%;
                padding: 15px 20px;
                border-radius: 20px;
                font-size: 0.95rem;
                line-height: 1.5;
                position: relative;
            }

            .divine-user-message .divine-message-content {
                background: linear-gradient(135deg, #667eea, #764ba2);
                color: white;
                border-bottom-right-radius: 8px;
            }

            .divine-god-message .divine-message-content {
                background: white;
                color: #333;
                border: 1px solid #e0e0e0;
                border-bottom-left-radius: 8px;
                box-shadow: 0 3px 10px rgba(0,0,0,0.1);
            }

            .divine-message-time {
                font-size: 0.75rem;
                color: #999;
                margin-top: 5px;
                opacity: 0.7;
            }

            .divine-chat-input {
                padding: 25px;
                background: white;
                border-top: 1px solid #e0e0e0;
            }

            .divine-input-wrapper {
                display: flex;
                gap: 15px;
                align-items: center;
            }

            .divine-chat-input input {
                flex: 1;
                padding: 15px 20px;
                border: 2px solid #e0e0e0;
                border-radius: 30px;
                font-size: 0.95rem;
                outline: none;
                transition: all 0.3s ease;
            }

            .divine-chat-input input:focus {
                border-color: #667eea;
                box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
            }

            .divine-send-btn {
                padding: 15px 25px;
                background: linear-gradient(135deg, #667eea, #764ba2);
                color: white;
                border: none;
                border-radius: 30px;
                cursor: pointer;
                font-weight: 500;
                transition: all 0.3s ease;
                font-size: 0.9rem;
            }

            .divine-send-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
            }

            .divine-chat-status {
                padding: 15px 25px;
                background: #f8f9fa;
                border-top: 1px solid #e0e0e0;
                min-height: 25px;
            }

            .divine-typing-indicator {
                color: #666;
                font-size: 0.9rem;
                font-style: italic;
                animation: divine-pulse 1.5s infinite;
            }

            @keyframes divine-pulse {
                0%, 100% { opacity: 0.6; }
                50% { opacity: 1; }
            }

            .divine-chat-footer {
                padding: 15px 25px;
                background: #f8f9fa;
                border-top: 1px solid #e0e0e0;
                text-align: center;
            }

            .divine-chat-footer small {
                color: #999;
                font-size: 0.8rem;
            }

            @media (max-width: 768px) {
                .divine-chat-container {
                    width: 95%;
                    height: 85%;
                }
                
                .divine-chat-header {
                    padding: 20px;
                }
                
                .divine-chat-title h3 {
                    font-size: 1.1rem;
                }
                
                .divine-message-content {
                    max-width: 90%;
                    font-size: 0.9rem;
                }
                
                .divine-chat-input {
                    padding: 20px;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize the divine chatbot
const divineChatbot = new DivineChatbot();

// Function to start chat with a specific god
function startDivineChat(godName) {
    if (divineChatbot.isActive) {
        divineChatbot.closeChat();
    }
    divineChatbot.initializeForGod(godName);
}

// Export for use in main script
window.divineChatbot = divineChatbot;
window.startDivineChat = startDivineChat; 