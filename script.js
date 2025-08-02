// Gods data for different religions

async function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    if (!userInput.trim()) return;
  
    // Display user message
    const chatLog = document.getElementById("chat-log");
    chatLog.innerHTML += `<div class="user-msg">You: ${userInput}</div>`;
  
    // Send to backend
    const response = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: userInput })
    });
  
    const data = await response.json();
  
    // Display Krishna's response
    chatLog.innerHTML += `<div class="bot-msg">Krishna: ${data.reply}</div>`;
    document.getElementById("user-input").value = "";
  }
  
const godsData = {
    hinduism: [
        {
            name: "Lord Krishna",
            description: "The supreme personality of Godhead, known for his divine pastimes and teachings in Bhagavad Gita",
            image: "images/krishna.jpg",
            phone: "+91 99999 99999",
            email: "krishna@divine.com",
            whatsapp: "+91 99999 99999",
            location: "Vrindavan, Divine Realm"
        },
        {
            name: "Lord Rama",
            description: "The perfect king and embodiment of dharma, known for his righteous rule and devotion",
            image: "images/rama.jpg",
            phone: "+91 88888 88888",
            email: "rama@divine.com",
            whatsapp: "+91 88888 88888",
            location: "Ayodhya, Divine Realm"
        },
        {
            name: "Lord Shiva",
            description: "The destroyer and transformer, the supreme yogi and master of meditation",
            image: "images/shiva.jpg",
            phone: "+91 77777 77777",
            email: "shiva@divine.com",
            whatsapp: "+91 77777 77777",
            location: "Mount Kailash, Divine Realm"
        },
        {
            name: "Goddess Lakshmi",
            description: "The goddess of wealth, prosperity, and fortune, bestower of material and spiritual abundance",
            image: "images/lakshmi.jpg",
            phone: "+91 66666 66666",
            email: "lakshmi@divine.com",
            whatsapp: "+91 66666 66666",
            location: "Vaikuntha, Divine Realm"
        },
        {
            name: "Lord Ganesha",
            description: "The remover of obstacles, god of wisdom and success, worshipped first in all ceremonies",
            image: "images/ganesha.jpg",
            phone: "+91 55555 55555",
            email: "ganesha@divine.com",
            whatsapp: "+91 55555 55555",
            location: "Mount Meru, Divine Realm"
        },
        {
            name: "Lord Hanuman",
            description: "The devoted servant of Lord Rama, symbol of strength, devotion, and selfless service",
            image: "images/hanuman.jpg",
            phone: "+91 44444 44444",
            email: "hanuman@divine.com",
            whatsapp: "+91 44444 44444",
            location: "Kishkindha, Divine Realm"
        }
    ],
    islam: [
        {
            name: "Allah (SWT)",
            description: "The one and only God, the creator and sustainer of all existence",
            image: "images/allah.jpg",
            phone: "+91 33333 33333",
            email: "allah@divine.com",
            whatsapp: "+91 33333 33333",
            location: "Heaven, Divine Realm"
        },
        {
            name: "Prophet Muhammad (PBUH)",
            description: "The final messenger of Allah, the seal of the prophets",
            image: "images/muhammad.jpg",
            phone: "+91 22222 22222",
            email: "muhammad@divine.com",
            whatsapp: "+91 22222 22222",
            location: "Medina, Divine Realm"
        },
        {
            name: "Prophet Ibrahim (AS)",
            description: "The friend of Allah, father of monotheism and builder of the Kaaba",
            image: "images/ibrahim.jpg",
            phone: "+91 11111 11111",
            email: "ibrahim@divine.com",
            whatsapp: "+91 11111 11111",
            location: "Mecca, Divine Realm"
        }
    ],
    christianity: [
        {
            name: "Jesus Christ",
            description: "The son of God, savior of humanity, and the way to eternal life",
            image: "images/jesus.jpg",
            phone: "+91 00000 00000",
            email: "jesus@divine.com",
            whatsapp: "+91 00000 00000",
            location: "Heaven, Divine Realm"
        },
        {
            name: "Virgin Mary",
            description: "The mother of Jesus, blessed among women and full of grace",
            image: "images/mary.jpg",
            phone: "+91 99999 88888",
            email: "mary@divine.com",
            whatsapp: "+91 99999 88888",
            location: "Heaven, Divine Realm"
        }
    ],
    sikhism: [
        {
            name: "Guru Nanak Dev Ji",
            description: "The first Sikh Guru, founder of Sikhism and embodiment of divine wisdom",
            image: "images/nanak.jpg",
            phone: "+91 88888 77777",
            email: "nanak@divine.com",
            whatsapp: "+91 88888 77777",
            location: "Kartarpur, Divine Realm"
        }
    ],
    buddhism: [
        {
            name: "Lord Buddha",
            description: "The enlightened one, founder of Buddhism and teacher of the middle path",
            image: "images/buddha.jpg",
            phone: "+91 77777 66666",
            email: "buddha@divine.com",
            whatsapp: "+91 77777 66666",
            location: "Nirvana, Divine Realm"
        }
    ]
};

let currentReligion = 'hinduism';
let selectedGod = null;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadGods(currentReligion);
    setupTabListeners();
});

// Setup tab button listeners
function setupTabListeners() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Load gods for selected religion
            currentReligion = this.getAttribute('data-religion');
            loadGods(currentReligion);
        });
    });
}

// Load gods for selected religion
function loadGods(religion) {
    const godsGrid = document.getElementById('godsGrid');
    const gods = godsData[religion];
    
    godsGrid.innerHTML = '';
    
    gods.forEach(god => {
        const godCard = document.createElement('div');
        godCard.className = 'god-card';
        godCard.innerHTML = `
            <img src="${god.image}" alt="${god.name}">
            <h3>${god.name}</h3>
            <p>${god.description}</p>
        `;
        
        godCard.addEventListener('click', () => {
            selectedGod = god;
            showContactSection(god);
        });
        
        godsGrid.appendChild(godCard);
    });
}

// Show contact section for selected god
function showContactSection(god) {
    document.getElementById('godImage').src = god.image;
    document.getElementById('godName').textContent = god.name;
    document.getElementById('godDescription').textContent = god.description;
    document.getElementById('godPhone').textContent = god.phone;
    document.getElementById('godEmail').textContent = god.email;
    document.getElementById('godWhatsapp').textContent = god.whatsapp;
    document.getElementById('godLocation').textContent = god.location;
    
    // Hide selection section and show contact section
    document.querySelector('.god-selection').style.display = 'none';
    document.getElementById('contactSection').style.display = 'block';
}

// Go back to god selection
function backToSelection() {
    document.querySelector('.god-selection').style.display = 'block';
    document.getElementById('contactSection').style.display = 'none';
    selectedGod = null;
}

// Call god function - simple alert for all gods
function callGod() {
    if (selectedGod) {
        alert(`Calling ${selectedGod.name} at ${selectedGod.phone}...\n\nThis is a fictional website for entertainment purposes only!`);
    }
}

// Message god function - uses custom chatbot
function messageGod() {
    if (selectedGod) {
        // Check if the god has chatbot support
        const supportedGods = [
            "Lord Krishna", 
            "Lord Rama", 
            "Lord Shiva", 
            "Jesus Christ", 
            "Prophet Muhammad (PBUH)"
        ];
        
        if (supportedGods.includes(selectedGod.name)) {
            // Use the custom chatbot
            startDivineChat(selectedGod.name);
        } else {
            // Show simple prompt for unsupported gods
            const message = prompt(`Send a message to ${selectedGod.name}:\n\n(Remember, this is just for fun!)`);
            if (message) {
                alert(`Message sent to ${selectedGod.name}:\n"${message}"\n\nThis is a fictional website for entertainment purposes only!`);
            }
        }
    }
}

// Add some fun animations and effects
function addFunEffects() {
    // Add sparkle effect to god cards on hover
    const godCards = document.querySelectorAll('.god-card');
    godCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize fun effects
document.addEventListener('DOMContentLoaded', addFunEffects); 