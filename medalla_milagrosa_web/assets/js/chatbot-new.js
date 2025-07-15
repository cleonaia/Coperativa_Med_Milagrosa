/*
===============================================
MEDALLA ASSISTANT - CHATBOT ULTRA INTELIGENTE
Sistema avanzado de chatbot para Cooperativa Medalla Milagrosa
Versión 2.0 - Ultra Premium Experience
===============================================
*/

class MedallaAssistant {
    constructor() {
        this.isOpen = false;
        this.conversationHistory = [];
        this.currentStep = 'greeting';
        this.userProfile = {};
        this.isTyping = false;
        this.notificationCount = 0;
        this.init();
    }

    init() {
        this.createChatbotHTML();
        this.initEventListeners();
        this.loadKnowledgeBase();
        this.showWelcomeMessage();
        this.startFloatingAnimation();
    }

    // ===== CREACIÓN DEL CHATBOT ULTRA PREMIUM =====
    createChatbotHTML() {
        const chatbotHTML = `
            <!-- Botón Flotante Ultra Premium -->
            <div id="medalla-chat-button" class="medalla-chat-button">
                <div class="chat-button-icon">
                    <i class="fas fa-comments"></i>
                </div>
                <div class="chat-button-pulse"></div>
                <div class="chat-notification" id="chat-notification">1</div>
                <div class="chat-tooltip">¡Hola! ¿Necesitas ayuda?</div>
            </div>
            
            <!-- Contenedor del Chat -->
            <div id="medalla-chat-container" class="medalla-chat-container">
                <div class="medalla-chat-header">
                    <div class="chat-header-avatar">
                        <img src="https://via.placeholder.com/50x50/4CAF50/FFFFFF?text=MM" alt="Medalla Assistant">
                        <div class="avatar-status-indicator"></div>
                    </div>
                    <div class="chat-header-info">
                        <h4>Medalla Assistant</h4>
                        <span class="chat-status">
                            <i class="fas fa-circle"></i>
                            En línea - Respuesta inmediata
                        </span>
                    </div>
                    <div class="chat-header-actions">
                        <button class="chat-action-btn" id="chat-minimize">
                            <i class="fas fa-minus"></i>
                        </button>
                        <button class="chat-action-btn" id="chat-close">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
                
                <div class="medalla-chat-messages" id="medalla-chat-messages">
                    <div class="chat-welcome-banner">
                        <div class="welcome-icon">
                            <i class="fas fa-star"></i>
                        </div>
                        <h5>¡Bienvenido a Medalla Milagrosa!</h5>
                        <p>Tu asistente personal para servicios financieros</p>
                    </div>
                    
                    <div class="chat-message bot-message">
                        <div class="message-avatar">
                            <img src="https://via.placeholder.com/35x35/4CAF50/FFFFFF?text=M" alt="Bot">
                        </div>
                        <div class="message-content">
                            <div class="message-bubble">
                                <p>¡Hola! 👋 Soy tu asistente virtual de Medalla Milagrosa. ¿En qué puedo ayudarte hoy?</p>
                            </div>
                            <div class="message-time">Ahora</div>
                        </div>
                    </div>
                    
                    <div class="chat-quick-actions">
                        <h6>Acciones rápidas:</h6>
                        <div class="quick-action-buttons">
                            <button class="quick-action-btn" data-action="creditos">
                                <i class="fas fa-coins"></i>
                                Créditos
                            </button>
                            <button class="quick-action-btn" data-action="ahorros">
                                <i class="fas fa-piggy-bank"></i>
                                Ahorros
                            </button>
                            <button class="quick-action-btn" data-action="tarjetas">
                                <i class="fas fa-credit-card"></i>
                                Tarjetas
                            </button>
                            <button class="quick-action-btn" data-action="contacto">
                                <i class="fas fa-phone"></i>
                                Contacto
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="medalla-chat-typing" id="medalla-chat-typing">
                    <div class="typing-indicator">
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                    </div>
                    <span>Medalla Assistant está escribiendo...</span>
                </div>
                
                <div class="medalla-chat-input">
                    <div class="chat-input-container">
                        <input type="text" 
                               id="medalla-chat-input" 
                               placeholder="Escribí tu consulta aquí..." 
                               autocomplete="off">
                        <button class="chat-send-btn" id="chat-send-btn">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                    <div class="chat-input-suggestions" id="chat-suggestions">
                        <span class="suggestion-chip" data-text="¿Cómo puedo solicitar un crédito?">💰 Solicitar crédito</span>
                        <span class="suggestion-chip" data-text="¿Cuáles son las tasas de interés?">📊 Tasas de interés</span>
                        <span class="suggestion-chip" data-text="¿Dónde están ubicados?">📍 Ubicación</span>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
        this.addChatbotStyles();
    }

    addChatbotStyles() {
        const styles = `
            <style>
                /* ===== CHATBOT ULTRA PREMIUM STYLES ===== */
                .medalla-chat-button {
                    position: fixed;
                    bottom: 30px;
                    right: 30px;
                    width: 70px;
                    height: 70px;
                    background: linear-gradient(135deg, #1B5E20 0%, #2E7D32 25%, #388E3C 50%, #43A047 75%, #4CAF50 100%);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    box-shadow: 0 8px 32px rgba(76, 175, 80, 0.3);
                    z-index: 1000;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    animation: chatButtonPulse 3s ease-in-out infinite;
                }
                
                .medalla-chat-button:hover {
                    transform: scale(1.1);
                    box-shadow: 0 12px 48px rgba(76, 175, 80, 0.4);
                }
                
                .chat-button-icon {
                    font-size: 1.8rem;
                    color: white;
                    transition: transform 0.3s ease;
                }
                
                .medalla-chat-button:hover .chat-button-icon {
                    transform: scale(1.1) rotate(5deg);
                }
                
                .chat-button-pulse {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    background: rgba(76, 175, 80, 0.3);
                    animation: pulse 2s infinite;
                    z-index: -1;
                }
                
                @keyframes pulse {
                    0% { transform: scale(1); opacity: 1; }
                    100% { transform: scale(1.5); opacity: 0; }
                }
                
                @keyframes chatButtonPulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }
                
                .chat-notification {
                    position: absolute;
                    top: -5px;
                    right: -5px;
                    width: 24px;
                    height: 24px;
                    background: #FF5722;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.8rem;
                    font-weight: 700;
                    color: white;
                    box-shadow: 0 2px 8px rgba(255, 87, 34, 0.3);
                    animation: bounce 0.5s ease-in-out;
                }
                
                @keyframes bounce {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.2); }
                }
                
                .chat-tooltip {
                    position: absolute;
                    bottom: 80px;
                    right: 0;
                    background: rgba(0, 0, 0, 0.8);
                    color: white;
                    padding: 12px 16px;
                    border-radius: 12px;
                    font-size: 0.9rem;
                    white-space: nowrap;
                    opacity: 0;
                    transform: translateY(10px);
                    transition: all 0.3s ease;
                    pointer-events: none;
                    backdrop-filter: blur(10px);
                }
                
                .chat-tooltip::after {
                    content: '';
                    position: absolute;
                    top: 100%;
                    right: 20px;
                    width: 0;
                    height: 0;
                    border-left: 6px solid transparent;
                    border-right: 6px solid transparent;
                    border-top: 6px solid rgba(0, 0, 0, 0.8);
                }
                
                .medalla-chat-button:hover .chat-tooltip {
                    opacity: 1;
                    transform: translateY(0);
                }
                
                .medalla-chat-container {
                    position: fixed;
                    bottom: 30px;
                    right: 30px;
                    width: 400px;
                    height: 600px;
                    background: white;
                    border-radius: 24px;
                    box-shadow: 0 20px 80px rgba(0, 0, 0, 0.15);
                    z-index: 1001;
                    display: flex;
                    flex-direction: column;
                    transform: translateY(100%) scale(0.8);
                    opacity: 0;
                    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
                    overflow: hidden;
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }
                
                .medalla-chat-container.open {
                    transform: translateY(0) scale(1);
                    opacity: 1;
                }
                
                .medalla-chat-header {
                    background: linear-gradient(135deg, #1B5E20 0%, #2E7D32 25%, #388E3C 50%, #43A047 75%, #4CAF50 100%);
                    color: white;
                    padding: 20px;
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    border-radius: 24px 24px 0 0;
                    position: relative;
                    overflow: hidden;
                }
                
                .medalla-chat-header::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="2" fill="rgba(255,255,255,0.1)"/></svg>') repeat;
                    opacity: 0.3;
                }
                
                .chat-header-avatar {
                    position: relative;
                    z-index: 2;
                }
                
                .chat-header-avatar img {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    border: 3px solid rgba(255, 255, 255, 0.3);
                }
                
                .avatar-status-indicator {
                    position: absolute;
                    bottom: 2px;
                    right: 2px;
                    width: 16px;
                    height: 16px;
                    background: #4CAF50;
                    border-radius: 50%;
                    border: 3px solid white;
                    animation: statusPulse 2s infinite;
                }
                
                @keyframes statusPulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                
                .chat-header-info {
                    flex: 1;
                    z-index: 2;
                }
                
                .chat-header-info h4 {
                    margin: 0;
                    font-size: 1.2rem;
                    font-weight: 600;
                }
                
                .chat-status {
                    font-size: 0.85rem;
                    opacity: 0.9;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }
                
                .chat-status i {
                    font-size: 0.6rem;
                    color: #4CAF50;
                    animation: statusBlink 1.5s infinite;
                }
                
                @keyframes statusBlink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.3; }
                }
                
                .chat-header-actions {
                    display: flex;
                    gap: 8px;
                    z-index: 2;
                }
                
                .chat-action-btn {
                    width: 36px;
                    height: 36px;
                    background: rgba(255, 255, 255, 0.2);
                    border: none;
                    border-radius: 50%;
                    color: white;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(10px);
                }
                
                .chat-action-btn:hover {
                    background: rgba(255, 255, 255, 0.3);
                    transform: scale(1.1);
                }
                
                .medalla-chat-messages {
                    flex: 1;
                    padding: 20px;
                    overflow-y: auto;
                    background: linear-gradient(to bottom, #f8f9fa 0%, #ffffff 100%);
                    scroll-behavior: smooth;
                }
                
                .medalla-chat-messages::-webkit-scrollbar {
                    width: 6px;
                }
                
                .medalla-chat-messages::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 3px;
                }
                
                .medalla-chat-messages::-webkit-scrollbar-thumb {
                    background: #4CAF50;
                    border-radius: 3px;
                }
                
                .chat-welcome-banner {
                    background: linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(76, 175, 80, 0.05) 100%);
                    border: 1px solid rgba(76, 175, 80, 0.2);
                    border-radius: 16px;
                    padding: 20px;
                    text-align: center;
                    margin-bottom: 20px;
                }
                
                .welcome-icon {
                    width: 50px;
                    height: 50px;
                    background: linear-gradient(135deg, #4CAF50, #2E7D32);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 12px;
                    font-size: 1.5rem;
                    color: white;
                    animation: rotate 3s linear infinite;
                }
                
                @keyframes rotate {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                
                .welcome-icon i {
                    animation: counter-rotate 3s linear infinite;
                }
                
                @keyframes counter-rotate {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(-360deg); }
                }
                
                .chat-welcome-banner h5 {
                    margin: 0 0 8px 0;
                    color: #2E7D32;
                    font-weight: 600;
                }
                
                .chat-welcome-banner p {
                    margin: 0;
                    color: #4CAF50;
                    font-size: 0.9rem;
                }
                
                .chat-message {
                    display: flex;
                    gap: 12px;
                    margin-bottom: 20px;
                    animation: messageSlideIn 0.3s ease;
                }
                
                @keyframes messageSlideIn {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                
                .chat-message.user-message {
                    flex-direction: row-reverse;
                }
                
                .message-avatar img {
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    border: 2px solid #4CAF50;
                }
                
                .message-content {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }
                
                .message-bubble {
                    background: white;
                    padding: 16px 20px;
                    border-radius: 20px 20px 20px 5px;
                    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
                    border: 1px solid rgba(76, 175, 80, 0.1);
                    position: relative;
                    animation: bubbleGrow 0.3s ease;
                }
                
                @keyframes bubbleGrow {
                    from { transform: scale(0.8); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                
                .user-message .message-bubble {
                    background: linear-gradient(135deg, #4CAF50, #2E7D32);
                    color: white;
                    border-radius: 20px 20px 5px 20px;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }
                
                .message-time {
                    font-size: 0.75rem;
                    color: #999;
                    align-self: flex-start;
                }
                
                .user-message .message-time {
                    align-self: flex-end;
                }
                
                .chat-quick-actions {
                    background: rgba(76, 175, 80, 0.05);
                    border-radius: 16px;
                    padding: 16px;
                    margin-top: 20px;
                }
                
                .chat-quick-actions h6 {
                    margin: 0 0 12px 0;
                    color: #2E7D32;
                    font-size: 0.9rem;
                    font-weight: 600;
                }
                
                .quick-action-buttons {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 8px;
                }
                
                .quick-action-btn {
                    background: white;
                    border: 2px solid #4CAF50;
                    color: #4CAF50;
                    padding: 12px 16px;
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 0.85rem;
                    font-weight: 500;
                }
                
                .quick-action-btn:hover {
                    background: #4CAF50;
                    color: white;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 16px rgba(76, 175, 80, 0.3);
                }
                
                .medalla-chat-typing {
                    padding: 16px 20px;
                    background: rgba(76, 175, 80, 0.05);
                    border-top: 1px solid rgba(76, 175, 80, 0.1);
                    display: none;
                    align-items: center;
                    gap: 12px;
                }
                
                .medalla-chat-typing.show {
                    display: flex;
                }
                
                .typing-indicator {
                    display: flex;
                    gap: 4px;
                }
                
                .typing-dot {
                    width: 8px;
                    height: 8px;
                    background: #4CAF50;
                    border-radius: 50%;
                    animation: typingDot 1.4s infinite;
                }
                
                .typing-dot:nth-child(2) {
                    animation-delay: 0.2s;
                }
                
                .typing-dot:nth-child(3) {
                    animation-delay: 0.4s;
                }
                
                @keyframes typingDot {
                    0%, 60%, 100% { transform: scale(1); opacity: 0.5; }
                    30% { transform: scale(1.2); opacity: 1; }
                }
                
                .medalla-chat-typing span {
                    font-size: 0.85rem;
                    color: #4CAF50;
                    font-style: italic;
                }
                
                .medalla-chat-input {
                    background: white;
                    border-top: 1px solid rgba(76, 175, 80, 0.1);
                    border-radius: 0 0 24px 24px;
                    padding: 20px;
                }
                
                .chat-input-container {
                    display: flex;
                    gap: 12px;
                    align-items: center;
                    background: #f8f9fa;
                    border-radius: 25px;
                    padding: 8px 8px 8px 20px;
                    border: 2px solid transparent;
                    transition: all 0.3s ease;
                }
                
                .chat-input-container:focus-within {
                    border-color: #4CAF50;
                    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
                }
                
                #medalla-chat-input {
                    flex: 1;
                    border: none;
                    background: transparent;
                    outline: none;
                    padding: 12px 0;
                    font-size: 1rem;
                    color: #333;
                }
                
                #medalla-chat-input::placeholder {
                    color: #999;
                }
                
                .chat-send-btn {
                    width: 44px;
                    height: 44px;
                    background: linear-gradient(135deg, #4CAF50, #2E7D32);
                    border: none;
                    border-radius: 50%;
                    color: white;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                    box-shadow: 0 2px 12px rgba(76, 175, 80, 0.3);
                }
                
                .chat-send-btn:hover {
                    transform: scale(1.1);
                    box-shadow: 0 4px 20px rgba(76, 175, 80, 0.4);
                }
                
                .chat-send-btn:active {
                    transform: scale(0.95);
                }
                
                .chat-input-suggestions {
                    display: flex;
                    gap: 8px;
                    margin-top: 12px;
                    flex-wrap: wrap;
                }
                
                .suggestion-chip {
                    background: rgba(76, 175, 80, 0.1);
                    color: #2E7D32;
                    padding: 8px 12px;
                    border-radius: 20px;
                    font-size: 0.8rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border: 1px solid rgba(76, 175, 80, 0.2);
                }
                
                .suggestion-chip:hover {
                    background: #4CAF50;
                    color: white;
                    transform: translateY(-2px);
                }
                
                /* Responsive Design */
                @media (max-width: 480px) {
                    .medalla-chat-container {
                        width: calc(100vw - 20px);
                        height: calc(100vh - 20px);
                        bottom: 10px;
                        right: 10px;
                        border-radius: 16px;
                    }
                    
                    .medalla-chat-button {
                        bottom: 20px;
                        right: 20px;
                        width: 60px;
                        height: 60px;
                    }
                    
                    .quick-action-buttons {
                        grid-template-columns: 1fr;
                    }
                }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', styles);
    }

    // ===== EVENTOS Y FUNCIONALIDADES =====
    initEventListeners() {
        // Botón principal del chat
        document.getElementById('medalla-chat-button').addEventListener('click', () => {
            this.toggleChat();
        });

        // Botones de header
        document.getElementById('chat-close').addEventListener('click', () => {
            this.closeChat();
        });

        document.getElementById('chat-minimize').addEventListener('click', () => {
            this.minimizeChat();
        });

        // Input de mensajes
        const chatInput = document.getElementById('medalla-chat-input');
        const sendButton = document.getElementById('chat-send-btn');

        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        sendButton.addEventListener('click', () => {
            this.sendMessage();
        });

        // Botones de acciones rápidas
        document.querySelectorAll('.quick-action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.currentTarget.dataset.action;
                this.handleQuickAction(action);
            });
        });

        // Sugerencias de chat
        document.querySelectorAll('.suggestion-chip').forEach(chip => {
            chip.addEventListener('click', (e) => {
                const text = e.currentTarget.dataset.text;
                this.insertSuggestion(text);
            });
        });

        // Auto-resize del textarea
        chatInput.addEventListener('input', this.autoResizeInput);
    }

    // ===== FUNCIONALIDADES PRINCIPALES =====
    toggleChat() {
        const container = document.getElementById('medalla-chat-container');
        const button = document.getElementById('medalla-chat-button');
        const notification = document.getElementById('chat-notification');
        
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }

    openChat() {
        const container = document.getElementById('medalla-chat-container');
        const button = document.getElementById('medalla-chat-button');
        const notification = document.getElementById('chat-notification');
        
        container.classList.add('open');
        button.style.display = 'none';
        notification.style.display = 'none';
        
        this.isOpen = true;
        this.focusInput();
        this.trackEvent('chat_opened');
    }

    closeChat() {
        const container = document.getElementById('medalla-chat-container');
        const button = document.getElementById('medalla-chat-button');
        
        container.classList.remove('open');
        button.style.display = 'flex';
        
        this.isOpen = false;
        this.trackEvent('chat_closed');
    }

    minimizeChat() {
        this.closeChat();
        this.trackEvent('chat_minimized');
    }

    sendMessage() {
        const input = document.getElementById('medalla-chat-input');
        const message = input.value.trim();
        
        if (message === '') return;
        
        this.addUserMessage(message);
        this.showTypingIndicator();
        
        // Simular procesamiento
        setTimeout(() => {
            this.processMessage(message);
            this.hideTypingIndicator();
        }, 1000 + Math.random() * 2000);
        
        input.value = '';
        this.trackEvent('message_sent', { message });
    }

    addUserMessage(message) {
        const messagesContainer = document.getElementById('medalla-chat-messages');
        const timestamp = this.getCurrentTime();
        
        const messageHTML = `
            <div class="chat-message user-message">
                <div class="message-avatar">
                    <img src="https://via.placeholder.com/35x35/2196F3/FFFFFF?text=U" alt="Usuario">
                </div>
                <div class="message-content">
                    <div class="message-bubble">
                        <p>${this.escapeHtml(message)}</p>
                    </div>
                    <div class="message-time">${timestamp}</div>
                </div>
            </div>
        `;
        
        messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
        this.scrollToBottom();
        this.conversationHistory.push({ type: 'user', message, timestamp });
    }

    addBotMessage(message) {
        const messagesContainer = document.getElementById('medalla-chat-messages');
        const timestamp = this.getCurrentTime();
        
        const messageHTML = `
            <div class="chat-message bot-message">
                <div class="message-avatar">
                    <img src="https://via.placeholder.com/35x35/4CAF50/FFFFFF?text=M" alt="Bot">
                </div>
                <div class="message-content">
                    <div class="message-bubble">
                        <p>${message}</p>
                    </div>
                    <div class="message-time">${timestamp}</div>
                </div>
            </div>
        `;
        
        messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
        this.scrollToBottom();
        this.conversationHistory.push({ type: 'bot', message, timestamp });
    }

    showTypingIndicator() {
        const typingIndicator = document.getElementById('medalla-chat-typing');
        typingIndicator.classList.add('show');
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('medalla-chat-typing');
        typingIndicator.classList.remove('show');
    }

    processMessage(message) {
        const response = this.generateResponse(message);
        this.addBotMessage(response);
    }

    generateResponse(message) {
        const lowercaseMessage = message.toLowerCase();
        
        // Respuestas sobre créditos
        if (lowercaseMessage.includes('crédito') || lowercaseMessage.includes('préstamo')) {
            return `💰 <strong>Créditos Medalla Milagrosa</strong><br><br>
                   Ofrecemos diferentes tipos de créditos:<br>
                   • Créditos personales<br>
                   • Créditos hipotecarios<br>
                   • Créditos comerciales<br><br>
                   <strong>Beneficios:</strong><br>
                   ✅ Tasas preferenciales para socios<br>
                   ✅ Aprobación rápida<br>
                   ✅ Flexibilidad en pagos<br><br>
                   ¿Te gustaría conocer más detalles sobre algún tipo específico?`;
        }
        
        // Respuestas sobre ahorros
        if (lowercaseMessage.includes('ahorro') || lowercaseMessage.includes('deposito')) {
            return `🏦 <strong>Ahorros Medalla Milagrosa</strong><br><br>
                   Nuestros productos de ahorro incluyen:<br>
                   • Cuentas de ahorro corriente<br>
                   • Depósitos a plazo fijo<br>
                   • Planes de ahorro programado<br><br>
                   <strong>Beneficios exclusivos:</strong><br>
                   ✅ Rendimientos competitivos<br>
                   ✅ Premios y sorteos mensuales<br>
                   ✅ Sin comisiones por mantenimiento<br><br>
                   ¿Qué tipo de ahorro te interesa más?`;
        }
        
        // Respuestas sobre tarjetas
        if (lowercaseMessage.includes('tarjeta')) {
            return `💳 <strong>Tarjetas Medalla Milagrosa</strong><br><br>
                   Disponemos de:<br>
                   • Tarjetas de débito Bancard<br>
                   • Tarjetas de crédito Visa<br>
                   • Tarjetas prepagas<br><br>
                   <strong>Beneficios:</strong><br>
                   ✅ Tecnología contactless<br>
                   ✅ Programa de recompensas<br>
                   ✅ Seguridad 24/7<br>
                   ✅ Sin costo anual<br><br>
                   ¿Necesitas información sobre alguna tarjeta específica?`;
        }
        
        // Respuestas sobre ubicación
        if (lowercaseMessage.includes('ubicación') || lowercaseMessage.includes('dirección') || lowercaseMessage.includes('donde')) {
            return `📍 <strong>Nuestra Ubicación</strong><br><br>
                   <strong>Sede Principal:</strong><br>
                   Mcal. Estigarribia 1542 c/ Capitán Cabral<br>
                   Fernando de la Mora, Paraguay<br><br>
                   <strong>Horarios de atención:</strong><br>
                   • Lunes a Viernes: 7:00 - 17:00<br>
                   • Sábados: 7:00 - 12:00<br><br>
                   <strong>Contacto:</strong><br>
                   📞 (021) 510-371<br>
                   📧 info@medalla.coop.py`;
        }
        
        // Respuestas sobre contacto
        if (lowercaseMessage.includes('contacto') || lowercaseMessage.includes('teléfono') || lowercaseMessage.includes('whatsapp')) {
            return `📞 <strong>Contactanos</strong><br><br>
                   <strong>Teléfono principal:</strong><br>
                   (021) 510-371<br><br>
                   <strong>WhatsApp:</strong><br>
                   +595 971 234 567<br><br>
                   <strong>Email:</strong><br>
                   info@medalla.coop.py<br>
                   servicios@medalla.coop.py<br><br>
                   ¿Prefieres que te contactemos nosotros?`;
        }
        
        // Respuestas de saludo
        if (lowercaseMessage.includes('hola') || lowercaseMessage.includes('buenos') || lowercaseMessage.includes('buenas')) {
            return `¡Hola! 👋 Bienvenido a Medalla Milagrosa. Me alegra poder ayudarte hoy.<br><br>
                   Soy tu asistente virtual y puedo ayudarte con información sobre:<br>
                   • Créditos y préstamos<br>
                   • Cuentas de ahorro<br>
                   • Tarjetas de débito y crédito<br>
                   • Seguros<br>
                   • Ubicación y horarios<br><br>
                   ¿En qué puedo ayudarte específicamente?`;
        }
        
        // Respuestas de despedida
        if (lowercaseMessage.includes('gracias') || lowercaseMessage.includes('chau') || lowercaseMessage.includes('adiós')) {
            return `¡Fue un placer ayudarte! 😊<br><br>
                   Recuerda que estoy aquí 24/7 para cualquier consulta que tengas.<br><br>
                   <strong>Medalla Milagrosa</strong><br>
                   Tu cooperativa de confianza desde 1983.<br><br>
                   ¡Que tengas un excelente día! 🌟`;
        }
        
        // Respuesta por defecto
        return `Gracias por tu consulta. 😊<br><br>
               Puedo ayudarte con información sobre:<br>
               • 💰 Créditos y préstamos<br>
               • 🏦 Ahorros y depósitos<br>
               • 💳 Tarjetas<br>
               • 📍 Ubicación y contacto<br><br>
               ¿Sobre qué tema te gustaría saber más?`;
    }

    handleQuickAction(action) {
        const actions = {
            'creditos': '¿Cómo puedo solicitar un crédito?',
            'ahorros': '¿Qué opciones de ahorro tienen disponibles?',
            'tarjetas': '¿Qué tipos de tarjetas ofrecen?',
            'contacto': '¿Cuáles son los datos de contacto?'
        };
        
        const message = actions[action];
        if (message) {
            this.insertSuggestion(message);
        }
    }

    insertSuggestion(text) {
        const input = document.getElementById('medalla-chat-input');
        input.value = text;
        input.focus();
        this.sendMessage();
    }

    // ===== FUNCIONES DE UTILIDAD =====
    getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString('es-PY', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    scrollToBottom() {
        const messagesContainer = document.getElementById('medalla-chat-messages');
        setTimeout(() => {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 100);
    }

    focusInput() {
        setTimeout(() => {
            document.getElementById('medalla-chat-input').focus();
        }, 100);
    }

    autoResizeInput() {
        const input = document.getElementById('medalla-chat-input');
        input.style.height = 'auto';
        input.style.height = Math.min(input.scrollHeight, 100) + 'px';
    }

    startFloatingAnimation() {
        const button = document.getElementById('medalla-chat-button');
        let isFloating = true;
        
        const float = () => {
            if (isFloating) {
                button.style.transform = 'translateY(-5px)';
                setTimeout(() => {
                    if (isFloating) {
                        button.style.transform = 'translateY(0px)';
                    }
                }, 1000);
            }
        };
        
        setInterval(float, 3000);
        
        button.addEventListener('mouseenter', () => {
            isFloating = false;
            button.style.transform = 'scale(1.1)';
        });
        
        button.addEventListener('mouseleave', () => {
            isFloating = true;
            button.style.transform = 'scale(1)';
        });
    }

    trackEvent(eventName, properties = {}) {
        // Aquí se puede integrar con Google Analytics, Mixpanel, etc.
        console.log(`Chatbot Event: ${eventName}`, properties);
    }

    loadKnowledgeBase() {
        // Aquí se puede cargar una base de conocimiento más avanzada
        console.log('Knowledge base loaded');
    }

    showWelcomeMessage() {
        // Mostrar notificación después de un tiempo
        setTimeout(() => {
            const notification = document.getElementById('chat-notification');
            if (notification && !this.isOpen) {
                notification.style.display = 'flex';
                notification.textContent = '1';
                
                // Animar la aparición
                notification.style.animation = 'bounce 0.5s ease-in-out';
            }
        }, 3000);
    }
}

// Inicializar el chatbot cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    window.medallaAssistant = new MedallaAssistant();
    console.log('Medalla Assistant initialized successfully! 🤖✨');
});

// Exponer funciones globales para debugging
window.openChat = () => window.medallaAssistant.openChat();
window.closeChat = () => window.medallaAssistant.closeChat();
