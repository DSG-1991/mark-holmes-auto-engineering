// Netlify Function: Chat FAQ Bot
// No external API calls — pure keyword matching against hardcoded FAQ dataset

const FAQS = [
  {
    keywords: ['mot', 'test', 'certificate', 'check'],
    question: 'How do I book an MOT?',
    answer: 'You can book your MOT test by calling us on 01253 878932 or by using the booking form on our website. We recommend booking at least a week in advance. MOTs are conducted at our Fleetwood garage — Unit 6 Kilbane St.'
  },
  {
    keywords: ['price', 'cost', 'quote', 'pricing', 'how much', 'charges', 'fee', 'rates'],
    question: 'What are your prices?',
    answer: 'We offer competitive, transparent pricing. For an accurate quote tailored to your vehicle and the work needed, please give us a call on 01253 878932 or use our booking form. We\'ll provide a clear breakdown before any work begins — no hidden charges.'
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

const GREETINGS = ['hi', 'hello', 'hey', 'howdy', 'good morning', 'good afternoon', 'good evening', 'yo'];
const THANKS = ['thanks', 'thank you', 'cheers', 'appreciate it', 'thankyou'];
const GOODBYES = ['bye', 'goodbye', 'see you', 'cya', 'later'];

exports.handler = async function(event, context) {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const body = JSON.parse(event.body);
    const query = (body.message || '').trim().toLowerCase();

    if (!query) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Message is required' })
      };
    }

    // Check greetings
    if (GREETINGS.some(g => query === g || query.startsWith(g + ' ') || query.startsWith(g + '!') || query === g + '!' || query === g + ',')) {
      return {
        statusCode: 200,
        body: JSON.stringify({ reply: 'Hello! Welcome to Mark Holmes Auto Engineering. How can I help you today? Feel free to ask about our services, prices, or booking.' })
      };
    }

    // Check thanks
    if (THANKS.some(t => query.includes(t))) {
      return {
        statusCode: 200,
        body: JSON.stringify({ reply: 'You\'re welcome! If you need anything else, just ask. Or give us a call on 01253 878932 to book an appointment.' })
      };
    }

    // Check goodbyes
    if (GOODBYES.some(g => query.includes(g))) {
      return {
        statusCode: 200,
        body: JSON.stringify({ reply: 'Thanks for chatting! Feel free to come back anytime. Drive safe! 🚗' })
      };
    }

    // Score FAQs
    let bestMatch = null;
    let bestScore = 0;

    for (const faq of FAQS) {
      let score = 0;
      for (const keyword of faq.keywords) {
        if (query.includes(keyword)) {
          score += 1;
        }
      }
      if (score > bestScore) {
        bestScore = score;
        bestMatch = faq;
      }
    }

    if (bestMatch && bestScore > 0) {
      return {
        statusCode: 200,
        body: JSON.stringify({ reply: bestMatch.answer })
      };
    }

    // Default fallback
    return {
      statusCode: 200,
      body: JSON.stringify({
        reply: 'I\'m not sure I understand. Could you try rephrasing? You can ask about our services, pricing, opening hours, location, MOT booking, or anything else. Or call us on 01253 878932 and we\'ll be happy to help!'
      })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
