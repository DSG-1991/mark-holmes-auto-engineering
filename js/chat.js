/* ============================================
   MARK HOLMES AUTO ENGINEERING
   Chat Widget
   ============================================ */

(function() {
  'use strict';

  // --- FAQ Dataset ---
  const FAQS = [
    {
      keywords: ['mot', 'test', 'certificate', 'check'],
      question: 'How do I book an MOT?',
      answer: 'You can book your MOT test by calling us on 01253 878932 or by using the booking form on our website. We recommend booking at least a week in advance. MOTs are conducted at our Fleetwood garage — Unit 6 Kilbane St.'
    },
    {
      keywords: ['price', 'cost', 'quote', 'pricing', 'how much', 'charges', 'fee', 'rates'],
      question: 'What are your prices?',
      answer: 'Here are our typical prices:\n\nMOT Test: £54.85\nInterim Service: from £99\nFull Service: from £179\nMajor Service: from £249\nDiagnostic Check: £60 (deducted from any repair work)\nBrake Pad Replacement (per axle): from £85\nAir Con Re-gas: £69\nFull Air Con Service: £99\nTyres: from £45 each fitted\n\nThese are guide prices — exact cost depends on your vehicle. Call 01253 878932 for a precise quote.'
    },
    {
      keywords: ['hour', 'open', 'close', 'time', 'when', 'opening'],
      question: 'What are your opening hours?',
      answer: 'We\'re open Monday to Friday, 8:00 AM to 5:00 PM, and Saturday from 9:00 AM to 1:00 PM. We\'re closed on Sundays and bank holidays.'
    },
    {
      keywords: ['location', 'address', 'where', 'find', 'directions', 'fleetwood'],
      question: 'Where are you located?',
      answer: 'We\'re at Unit 6 Kilbane Street, Fleetwood, FY7 7PF. We\'re a well-known independent garage in Fleetwood, established since 1993. Easy to find — just off the main road through town.'
    },
    {
      keywords: ['service', 'servicing', 'maintenance', 'full service', 'interim'],
      question: 'What servicing do you offer?',
      answer: 'We offer full servicing, interim services, and major services for most vehicle makes and models. Every service includes oil change, filter replacement, fluid top-ups, and a thorough inspection. We also provide manufacturer-scheduled servicing. Call us for details.'
    },
    {
      keywords: ['payment', 'pay', 'card', 'cash', 'credit', 'debit', 'method'],
      question: 'What payment methods do you accept?',
      answer: 'We accept cash, debit cards, and credit cards. Payment is due upon completion of work. We provide a full itemised invoice for all services and repairs.'
    },
    {
      keywords: ['vehicle', 'car', 'van', 'type', 'make', 'model', 'brand'],
      question: 'What types of vehicles do you work on?',
      answer: 'We work on most makes and models — cars, vans, and light commercial vehicles. From small hatchbacks to family SUVs and work vans, we have the expertise to handle them all. Give us a call to check if we can help with your specific vehicle.'
    },
    {
      keywords: ['diagnostic', 'fault', 'check engine', 'warning light', 'computer'],
      question: 'Do you offer diagnostic services?',
      answer: 'Yes! We have professional diagnostic equipment to read fault codes and identify issues quickly. Whether it\'s a check engine light, ABS warning, or any other electronic fault, we can diagnose the problem accurately and efficiently.'
    },
    {
      keywords: ['brake', 'brakes', 'pads', 'discs', 'stopping'],
      question: 'Do you do brake repairs?',
      answer: 'Absolutely. We carry out all brake work — pad replacement, disc changes, caliper repairs, and brake fluid flushes. We inspect your braking system thoroughly and advise on what\'s needed, with no pressure for unnecessary work.'
    },
    {
      keywords: ['air con', 'air conditioning', 'ac', 're-gas', 'regas', 'cool'],
      question: 'Do you do air conditioning services?',
      answer: 'Yes, we offer full air conditioning services including re-gassing, system checks, and repairs. If your AC isn\'t blowing cold, bring it in and we\'ll sort it out.'
    },
    {
      keywords: ['tyre', 'tire', 'tyres', 'tires', 'wheel', 'balancing', 'alignment'],
      question: 'Do you supply and fit tyres?',
      answer: 'Yes, we supply and fit tyres from leading brands at competitive prices. We also offer wheel balancing and 4-wheel alignment to ensure even tyre wear and proper handling.'
    },
    {
      keywords: ['exhaust', 'exhausts', 'pipe', 'silencer', 'muffler'],
      question: 'Do you do exhaust repairs?',
      answer: 'Yes, we carry out exhaust repairs and replacements — from a small patch repair to a full system replacement. We\'ll advise on the most cost-effective solution for your vehicle.'
    },
    {
      keywords: ['booking', 'appointment', 'book', 'schedule', 'reserve'],
      question: 'How do I book an appointment?',
      answer: 'You can book online using the booking form on our Services or Contact page, or simply call us on 01253 878932. We\'ll find a time that works for you.'
    },
    {
      keywords: ['emergency', 'urgent', 'breakdown', 'quick', 'fast'],
      question: 'Can you handle urgent repairs?',
      answer: 'We understand car trouble never comes at a good time. Call us on 01253 878932 and we\'ll do our best to fit you in as quickly as possible. For non-urgent work, booking ahead is recommended.'
    }
  ];

  // --- Chat Widget HTML ---
  const WIDGET_HTML = `
    <div class="chat-widget" id="chatWidget">
      <div class="chat-panel" id="chatPanel">
        <div class="chat-header">
          <button class="chat-close" id="chatClose" aria-label="Close chat">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <div class="chat-header-avatar">MH</div>
          <div class="chat-header-info">
            <h4>Mark Holmes Auto</h4>
            <p>We usually reply in minutes</p>
          </div>
        </div>
        <div class="chat-messages" id="chatMessages">
          <div class="chat-message bot">
            <div class="bubble">Hi there! 👋 Welcome to Mark Holmes Auto Engineering. How can I help you today? Ask me about our services, pricing, opening hours, or anything else.</div>
            <div class="time">Just now</div>
          </div>
        </div>
        <div class="chat-typing" id="chatTyping">
          <span></span><span></span><span></span>
        </div>
        <div class="chat-quick-replies" id="chatQuickReplies">
          <button class="chat-quick-reply" data-query="services">Our Services</button>
          <button class="chat-quick-reply" data-query="pricing">Pricing</button>
          <button class="chat-quick-reply" data-query="hours">Opening Hours</button>
          <button class="chat-quick-reply" data-query="location">Location</button>
          <button class="chat-quick-reply" data-query="mot">Book MOT</button>
        </div>
        <div class="chat-input-area">
          <input type="text" id="chatInput" placeholder="Type your message..." autocomplete="off">
          <button id="chatSend" aria-label="Send message">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
      <button class="chat-toggle" id="chatToggle" aria-label="Toggle chat">
        <svg class="chat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        <svg class="close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  `;

  // --- Chat Logic ---
  function initChat() {
    // Inject widget into body
    const div = document.createElement('div');
    div.innerHTML = WIDGET_HTML;
    document.body.appendChild(div.firstElementChild);

    const widget = document.getElementById('chatWidget');
    const toggle = document.getElementById('chatToggle');
    const closeBtn = document.getElementById('chatClose');
    const panel = document.getElementById('chatPanel');
    const messages = document.getElementById('chatMessages');
    const input = document.getElementById('chatInput');
    const sendBtn = document.getElementById('chatSend');
    const typing = document.getElementById('chatTyping');
    const quickReplies = document.getElementById('chatQuickReplies');

    let isOpen = false;
    let savedScrollY = 0;
    let vvHandler = null;

    // Check if mobile
    function isMobile() {
      return window.innerWidth <= 480;
    }

    // Keep the full-screen panel sized to the visual viewport so the on-screen
    // keyboard can't push the header / messages off the top of the screen.
    function syncMobileViewport() {
      const vv = window.visualViewport;
      if (vv) {
        widget.style.height = vv.height + 'px';
        widget.style.top = vv.offsetTop + 'px';
      } else {
        widget.style.height = window.innerHeight + 'px';
        widget.style.top = '0';
      }
    }

    // Open panel
    function openPanel() {
      isOpen = true;
      panel.classList.add('open');
      toggle.classList.add('active');

      if (isMobile()) {
        // On mobile: full-screen, sized to the *visual* viewport (keyboard-aware)
        // and with the page locked behind it so iOS can't scroll the header out
        // of view when the input is focused.
        savedScrollY = window.scrollY || window.pageYOffset || 0;
        document.documentElement.classList.add('chat-open');
        document.body.style.top = '-' + savedScrollY + 'px';

        widget.style.position = 'fixed';
        widget.style.top = '0';
        widget.style.left = '0';
        widget.style.right = '0';
        widget.style.bottom = 'auto';
        widget.style.width = '100%';
        widget.style.zIndex = '10000';

        panel.style.position = 'absolute';
        panel.style.top = '0';
        panel.style.left = '0';
        panel.style.right = '0';
        panel.style.bottom = '0';
        panel.style.width = '100%';
        panel.style.height = '100%';
        panel.style.maxHeight = 'none';
        panel.style.borderRadius = '0';
        panel.style.border = 'none';
        panel.style.overflow = 'hidden';

        // Let the message list fill the available space and scroll internally
        // (it is capped at 320px by default for the floating desktop card).
        messages.style.maxHeight = 'none';
        messages.style.flex = '1';

        toggle.style.display = 'none';

        syncMobileViewport();
        if (window.visualViewport) {
          vvHandler = function() {
            syncMobileViewport();
            scrollToBottom();
          };
          window.visualViewport.addEventListener('resize', vvHandler);
          window.visualViewport.addEventListener('scroll', vvHandler);
        }
      }

      // On mobile, don't auto-open the keyboard — let the user see the header,
      // welcome message and quick replies first. The keyboard (and the
      // visual-viewport resize) only kicks in once they tap the input.
      if (!isMobile()) {
        input.focus();
      }
      scrollToBottom();
    }

    // Close panel
    function closePanel() {
      isOpen = false;
      panel.classList.remove('open');
      toggle.classList.remove('active');

      if (isMobile()) {
        // Detach the visual-viewport listeners
        if (window.visualViewport && vvHandler) {
          window.visualViewport.removeEventListener('resize', vvHandler);
          window.visualViewport.removeEventListener('scroll', vvHandler);
          vvHandler = null;
        }

        // Reset inline styles
        widget.style.position = '';
        widget.style.top = '';
        widget.style.left = '';
        widget.style.right = '';
        widget.style.bottom = '';
        widget.style.width = '';
        widget.style.height = '';
        widget.style.zIndex = '';

        panel.style.position = '';
        panel.style.top = '';
        panel.style.left = '';
        panel.style.right = '';
        panel.style.bottom = '';
        panel.style.width = '';
        panel.style.height = '';
        panel.style.maxHeight = '';
        panel.style.borderRadius = '';
        panel.style.border = '';
        panel.style.overflow = '';

        messages.style.maxHeight = '';
        messages.style.flex = '';

        toggle.style.display = '';

        // Unlock the page and restore the scroll position
        document.documentElement.classList.remove('chat-open');
        document.body.style.top = '';
        window.scrollTo(0, savedScrollY);
      }
    }

    // Toggle chat
    toggle.addEventListener('click', function() {
      if (isOpen) {
        closePanel();
      } else {
        openPanel();
      }
    });

    // Close button in the panel header (only way to close on mobile, where the
    // floating toggle is hidden while the panel is full-screen)
    closeBtn.addEventListener('click', closePanel);

    // Send message
    function sendMessage(text) {
      if (!text.trim()) return;

      // Add user message
      addMessage(text, 'user');
      input.value = '';

      // Show typing indicator
      typing.classList.add('show');
      scrollToBottom();

      // Process with FAQ matching
      setTimeout(function() {
        typing.classList.remove('show');
        const response = findAnswer(text);
        addMessage(response, 'bot');
        scrollToBottom();
      }, 600 + Math.random() * 400);
    }

    // Add message to chat
    function addMessage(text, sender) {
      const div = document.createElement('div');
      div.className = 'chat-message ' + sender;

      const bubble = document.createElement('div');
      bubble.className = 'bubble';
      bubble.textContent = text;
      div.appendChild(bubble);

      const time = document.createElement('div');
      time.className = 'time';
      const now = new Date();
      time.textContent = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
      div.appendChild(time);

      messages.appendChild(div);
    }

    // Find best FAQ match
    function findAnswer(query) {
      const lower = query.toLowerCase().trim();

      // Check for greetings
      const greetings = ['hi', 'hello', 'hey', 'howdy', 'good morning', 'good afternoon', 'good evening', 'yo'];
      if (greetings.some(function(g) { return lower === g || lower.startsWith(g + ' ') || lower.startsWith(g + '!') || lower === g + '!' || lower === g + ','; })) {
        return 'Hello! Welcome to Mark Holmes Auto Engineering. How can I help you today? Feel free to ask about our services, prices, or booking.';
      }

      // Check for thanks
      const thanks = ['thanks', 'thank you', 'cheers', 'appreciate it', 'thankyou'];
      if (thanks.some(function(t) { return lower.includes(t); })) {
        return 'You\'re welcome! If you need anything else, just ask. Or give us a call on 01253 878932 to book an appointment.';
      }

      // Check for goodbye
      const goodbyes = ['bye', 'goodbye', 'see you', 'cya', 'later'];
      if (goodbyes.some(function(g) { return lower.includes(g); })) {
        return 'Thanks for chatting! Feel free to come back anytime. Drive safe! 🚗';
      }

      // Score each FAQ
      let bestMatch = null;
      let bestScore = 0;

      FAQS.forEach(function(faq) {
        let score = 0;
        faq.keywords.forEach(function(keyword) {
          if (lower.includes(keyword)) {
            score += 1;
          }
        });
        if (score > bestScore) {
          bestScore = score;
          bestMatch = faq;
        }
      });

      if (bestMatch && bestScore > 0) {
        return bestMatch.answer;
      }

      // Default response
      return 'I\'m not sure I understand. Could you try rephrasing? You can ask about our services, pricing, opening hours, location, MOT booking, or anything else. Or call us on 01253 878932 and we\'ll be happy to help!';
    }

    // Scroll messages to bottom
    function scrollToBottom() {
      messages.scrollTop = messages.scrollHeight;
    }

    // Send on button click
    sendBtn.addEventListener('click', function() {
      sendMessage(input.value);
    });

    // Send on Enter
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        sendMessage(input.value);
      }
    });

    // Quick replies
    quickReplies.addEventListener('click', function(e) {
      const btn = e.target.closest('.chat-quick-reply');
      if (btn) {
        const query = btn.getAttribute('data-query');
        sendMessage(query);
      }
    });

    // Initial scroll
    scrollToBottom();
  }

  // --- Start chat when DOM is ready ---
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChat);
  } else {
    initChat();
  }

})();
