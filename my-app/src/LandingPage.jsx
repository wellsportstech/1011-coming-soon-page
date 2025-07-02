import React, { useEffect, useRef, useState } from "react";
import "./style.css";

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidPhone = (phone) => /^[6-9]\d{9}$/.test(phone);

const LandingPage = () => {
  const [lines, setLines] = useState(["", "", ""]);
  const fullLines = ["Journey from", "Grassroot to podium", "shaping up."];
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [step, setStep] = useState("initial");
  const [userData, setUserData] = useState({ name: "", email: "", phone: "" });
  const chatWindowRef = useRef(null);

  const toggleChat = () => setShowChat(prev => !prev);

  useEffect(() => {
    const lineRefs = ["", "", ""];
    const typeLine = (lineIndex, text, callback) => {
      let charIndex = 0;
      const interval = setInterval(() => {
        if (charIndex < text.length) {
          lineRefs[lineIndex] += text[charIndex];
          setLines(prev => {
            const updated = [...prev];
            updated[lineIndex] = lineRefs[lineIndex];
            return updated;
          });
          charIndex++;
        } else {
          clearInterval(interval);
          if (callback) callback();
        }
      }, 80);
    };

    typeLine(0, fullLines[0], () => {
      setTimeout(() => {
        typeLine(1, fullLines[1], () => {
          setTimeout(() => {
            typeLine(2, fullLines[2]);
          }, 300);
        });
      }, 300);
    });

    setMessages([
      { text: "👋 Welcome to 1011 Sports!", from: "bot" },
      { text: "How can we help you today?", from: "bot" },
      { text: "What is the name you'd like us to call you?", from: "bot" }
    ]);
    setStep("askName");
  }, []);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (input.trim()) {
      handleUserInput(input.trim());
      setInput("");
    }
  };

  const handleUserInput = (userText) => {
    setMessages(prev => [...prev, { text: userText, from: "user" }]);

    setTimeout(() => {
      if (step === "askName") {
        setUserData(prev => ({ ...prev, name: userText }));
        setMessages(prev => [...prev, { text: `Thanks, ${userText}! Please share your email address:`, from: "bot" }]);
        setStep("askEmail");
      } else if (step === "askEmail") {
        if (!isValidEmail(userText)) {
          setMessages(prev => [...prev, { text: "❌ That doesn't look like a valid email. Please try again.", from: "bot" }]);
          return;
        }
        setUserData(prev => ({ ...prev, email: userText }));
        setMessages(prev => [...prev, { text: "Got it! Now please share your phone number:", from: "bot" }]);
        setStep("askPhone");
      } else if (step === "askPhone") {
        if (!isValidPhone(userText)) {
          setMessages(prev => [...prev, {
            text: "📵 That doesn't seem like a valid Indian phone number. Please enter a 10-digit number starting with 6-9.",
            from: "bot"
          }]);
          return;
        }
        setUserData(prev => ({ ...prev, phone: userText }));
        setMessages(prev => [...prev, {
          text: "Great! Would you like to continue chatting here or switch to WhatsApp?",
          from: "bot",
          options: ["💬 Continue here", "📱 WhatsApp Personal", "🏢 WhatsApp Business"]
        }]);
        setStep("askChannel");
      } else if (step === "askChannel") {
        const currentHour = new Date().getHours();

        if (userText.includes("WhatsApp Personal")) {
          if (currentHour >= 9 && currentHour < 21) {
            window.open("https://wa.me/919999999999", "_blank");
          } else {
            setMessages(prev => [...prev, {
              text: "⏰ WhatsApp support is available only between 9 AM and 9 PM. Please try again during that time.",
              from: "bot"
            }]);
          }
        } else if (userText.includes("WhatsApp Business")) {
          if (currentHour >= 9 && currentHour < 21) {
            window.open("https://api.whatsapp.com/send?phone=919888888888", "_blank");
          } else {
            setMessages(prev => [...prev, {
              text: "⏰ WhatsApp support is available only between 9 AM and 9 PM. Please try again during that time.",
              from: "bot"
            }]);
          }
        } else {
          setMessages(prev => [...prev, {
            text: "Choose a question:",
            from: "bot",
            options: [
              "🏃‍♂️ What is 1011 Sports?",
              "📋 How do I register my child?",
              "🏆 What events do you host?"
            ]
          }]);
        }

        fetch("https://script.google.com/macros/s/AKfycbyJpBLsmj9Y33E4FZrt7N_Zp2RQSHwCmJYGBvoZqZWFccVjZFPDXyEba3qXcnIhmnsjIQ/exec", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
            chat: messages.map(msg => `${msg.from.toUpperCase()}: ${msg.text}`).join("\n")
          })
        })
          .then(res => res.text())
          .then(msg => console.log("Saved to Google Sheet:", msg))
          .catch(err => console.error("Saving failed:", err));

        setStep("final");
      } else {
        let response = "Thanks for your message! We'll get back to you soon.";
        switch (userText) {
          case "🏃‍♂️ What is 1011 Sports?":
            response = "1011 Sports is a grassroots-to-podium platform nurturing young athletes across India.";
            break;
          case "📋 How do I register my child?":
            response = "You can register by visiting our upcoming portal or contacting us through our official channels.";
            break;
          case "🏆 What events do you host?":
            response = "We host school-level tournaments, regional scouting events, and coaching camps.";
            break;
        }
        setMessages(prev => [...prev, { text: response, from: "bot" }]);
      }
    }, 600);
  };

  const handleOptionClick = (option) => {
    handleUserInput(option);
  };

  return (
    <div className="main-container">
      <div className="left-half">
        <div className="text-container">

          <div className="simple-links">
            <a href="https://www.instagram.com/sportsynthesis/" target="_blank" rel="noopener noreferrer">Instagram</a> |{" "}
            <a href="https://www.facebook.com/sportsynthesis.in/" target="_blank" rel="noopener noreferrer">Facebook</a> |{" "}
            <a href="https://in.linkedin.com/company/sportsynthesis/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>

          <div className="wotw-text">WEBSITE ON <br /> THE <br /> WAY!</div>

          <div className="journey-text">
            <span className="typewriter-line typed-line">{lines[0]}</span><br />
            <span className="typewriter-line typed-line green-text">{lines[1]}</span><br />
            <span className="typewriter-line typed-line">{lines[2]}</span>
          </div>
        </div>
      </div>

      <div className="right-half">
        <img src="logo.png" alt="Logo" className="top-right-logo" />
      </div>

      <div className="girls-image-main">
        <img src="girls.png" alt="Girls Running" />
      </div>

      <div className="bottom-controls">
        <div className="email-box">
          <input
            type="email"
            placeholder="Insert your email address."
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          />
          <button onClick={() => console.log("Email captured:", userData.email)}>SUBMIT</button>
        </div>

        <button className="chat-toggle-button" onClick={toggleChat}>💬 Chat</button>

        {showChat && (
          <div className="chatbot-container">
            <div id="chat-window" ref={chatWindowRef} style={{ maxHeight: "300px", overflowY: "auto" }}>
              {messages.map((msg, idx) => (
                <div key={idx} className={`chat-msg ${msg.from}`}>
                  {msg.text}
                  {msg.options && (
                    <div className="chat-options">
                      {msg.options.map((option, i) => (
                        <button
                          key={i}
                          onClick={() => handleOptionClick(option)}
                          className="chat-option"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="chatbot-input-wrapper">
              <input
                type="text"
                id="chat-input"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
