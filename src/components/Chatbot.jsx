import React, { useState, useRef, useEffect } from "react";
import { chatData } from "../data/chatData";
import { motion, AnimatePresence } from "framer-motion";
import { search, getQuickActions, getDefaultSuggestions } from "../utils/searchEngine";
import "./Chatbot.css";

// Simple icons as SVG components
const SearchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const BrainIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04z" />
  </svg>
);

const ArrowUpIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="19" x2="12" y2="5"></line>
    <polyline points="5 12 12 5 19 12"></polyline>
  </svg>
);

const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const START_NODE = chatData.start;
const MAX_VISIBLE_SUGGESTIONS = 4;

const Typewriter = ({ text, speed = 15, onComplete }) => {
  const [displayedText, setDisplayedText] = React.useState("");
  const [isDone, setIsDone] = React.useState(false);

  React.useEffect(() => {
    setDisplayedText("");
    setIsDone(false);
    let i = 0;
    const timer = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(timer);
        setIsDone(true);
        if (onComplete) onComplete();
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <>
      {displayedText}
      {!isDone && <span className="typewriter-cursor">|</span>}
    </>
  );
};

const Chatbot = () => {
  const [currentResponse, setCurrentResponse] = useState(START_NODE);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showSections, setShowSections] = useState(false);
  const inputRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [suggestions, setSuggestions] = useState(
    (START_NODE?.options || getDefaultSuggestions()).slice(0, MAX_VISIBLE_SUGGESTIONS)
  );
  const [isSearching, setIsSearching] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [hasNoResults, setHasNoResults] = useState(false);
  const [responseHasOverflow, setResponseHasOverflow] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const responseCardRef = useRef(null);
  const chatbotRef = useRef(null);

  const limitSuggestions = (items = []) => items.slice(0, MAX_VISIBLE_SUGGESTIONS);

  const buildSuggestionsFromResponse = (responseNode) => {
    if (!responseNode) return getDefaultSuggestions();

    const nextSuggestions = [...(responseNode.options || [])];
    const hasStart = nextSuggestions.some((opt) => opt.nextId === "start");
    if (!hasStart && responseNode.id !== "start") {
      nextSuggestions.push({ label: "Back to menu", nextId: "start" });
    }

    return limitSuggestions(nextSuggestions);
  };

  const formatSuggestionLabel = (option) => {
    const rawLabel = option?.label?.trim() || "";
    if (!rawLabel) return "";

    if (/^back to\b/i.test(rawLabel) || /^go back\b/i.test(rawLabel)) {
      return rawLabel;
    }

    if (/\?$/.test(rawLabel)) {
      return rawLabel;
    }

    const cleaned = rawLabel.replace(/[.!]+$/, "");
    const lower = cleaned.toLowerCase();

    if (/^(what|how|why|where|when|who|which|can|could|would|should|is|are|do|does|did)\b/i.test(cleaned)) {
      return `${cleaned}?`;
    }

    if (/^(tell me|show me|view)\b/i.test(lower)) {
      return `${cleaned}?`;
    }

    if (/^what's\b|^whats\b|^how's\b|^hows\b/i.test(lower)) {
      return `${cleaned}?`;
    }

    return `Can you tell me about ${cleaned}?`;
  };

  // Live search as user types - with auto-navigation for high confidence matches
  const handleSearch = (text) => {
    if (!text || text.trim().length < 2) {
      setSuggestions(buildSuggestionsFromResponse(currentResponse || START_NODE));
      setIsSearching(false);
      setHasNoResults(false);
      return;
    }

    setIsSearching(true);
    const results = search(text);
    const quickActions = getQuickActions(text);

    if (results.length > 0) {
      setHasNoResults(false);
      // Convert search results to suggestions
      const resultSuggestions = results.map(r => ({
        id: r.id,
        label: r.title,
        nextId: r.id,
        category: r.category,
        score: r.score
      }));

      setSuggestions(limitSuggestions([...quickActions, ...resultSuggestions]));
    } else {
      setHasNoResults(true);
      setSuggestions([]);
    }
  };

  useEffect(() => {
    const media = window.matchMedia("(max-width: 640px)");

    // Load saved collapsed state from localStorage
    const savedState = localStorage.getItem('chatbot-collapsed');
    const initialCollapsed = savedState ? JSON.parse(savedState) : false;

    const handleChange = (event) => {
      setIsMobile(event.matches);
      if (!event.matches) {
        setIsCollapsed(false);
      } else {
        // On mobile, use saved state instead of auto-collapsing
        setIsCollapsed(initialCollapsed);
      }
    };
    handleChange(media);
    if (media.addEventListener) {
      media.addEventListener("change", handleChange);
    } else {
      media.addListener(handleChange);
    }
    return () => {
      if (media.removeEventListener) {
        media.removeEventListener("change", handleChange);
      } else {
        media.removeListener(handleChange);
      }
    };
  }, []);

  useEffect(() => {
    setActiveSuggestionIndex((prevIndex) => {
      if (suggestions.length === 0) return -1;
      if (prevIndex >= suggestions.length) return suggestions.length - 1;
      return prevIndex;
    });
  }, [suggestions]);

  useEffect(() => {
    const node = responseCardRef.current;
    if (!node) return;

    const checkOverflow = () => {
      const hasOverflow = node.scrollHeight > node.clientHeight + 2;
      setResponseHasOverflow(hasOverflow);
    };

    checkOverflow();
    const raf = requestAnimationFrame(checkOverflow);
    window.addEventListener("resize", checkOverflow);

    let resizeObserver;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(checkOverflow);
      resizeObserver.observe(node);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", checkOverflow);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [currentResponse, isTyping, showSections, isFocused, isMobile]);

  // Virtual keyboard handling
  useEffect(() => {
    if (!isMobile) return;

    const handleResize = () => {
      // Detect keyboard by checking if window height decreased significantly
      const viewportHeight = window.visualViewport?.height || window.innerHeight;
      const windowHeight = window.innerHeight;
      const heightDiff = windowHeight - viewportHeight;

      if (heightDiff > 150) {
        // Keyboard is likely open
        setKeyboardHeight(heightDiff);
      } else {
        setKeyboardHeight(0);
      }
    };

    // Use visualViewport API if available (better for mobile)
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
      window.visualViewport.addEventListener('scroll', handleResize);
    } else {
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize);
        window.visualViewport.removeEventListener('scroll', handleResize);
      } else {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, [isMobile]);

  const renderStructuredResponse = (responseNode) => {
    const sections = responseNode.sections || [];

    return (
      <div className="response-structured">
        {responseNode.text && (
          <div className="response-lede">
            <Typewriter 
              text={responseNode.text} 
              onComplete={() => setShowSections(true)} 
            />
          </div>
        )}
        {showSections && sections.length > 0 && (
          <motion.div
            className="response-sections"
            initial={{ y: 10 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {sections.map((section, idx) => (
              <div key={`${section.title}-${idx}`} className="response-section">
                <div className="response-section-title">{section.title}</div>
                {section.text && <div className="response-section-text">{section.text}</div>}
                {section.bullets && (
                  <ul className="response-list">
                    {section.bullets.map((bullet, bulletIdx) => (
                      <li key={`${section.title}-${bulletIdx}`}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </div>
    );
  };

  const handleNavigate = (nextId) => {
    if (!nextId) return;

    setInputValue("");
    setIsTyping(true);
    setIsSearching(false);
    setHasNoResults(false);
    setCurrentResponse(null);
    setShowSections(false);

    setTimeout(() => {
        const responseNode = chatData[nextId];

        if (!responseNode) {
          // Fallback if ID doesn't exist
          const fallbackNode = {
            text: "Content not found. Here are some suggestions:",
            options: getDefaultSuggestions()
          };

          setCurrentResponse(fallbackNode);
          setIsTyping(false);
          setSuggestions(limitSuggestions(fallbackNode.options));
          return;
        }

        setCurrentResponse(responseNode);
        setIsTyping(false);
        setSuggestions(limitSuggestions(buildSuggestionsFromResponse(responseNode)));
        if (!responseNode.text) setShowSections(true);
    }, 500);
  };

  const handleSubmit = () => {
    if (suggestions.length === 0) return;

    const selectedIndex = activeSuggestionIndex >= 0 ? activeSuggestionIndex : 0;
    const selectedSuggestion = suggestions[selectedIndex] || suggestions[0];
    if (!selectedSuggestion?.nextId) return;

    // High confidence search result - navigate directly
    if (selectedSuggestion.score && selectedSuggestion.score > 50) {
      handleNavigate(selectedSuggestion.nextId);
    } else {
      // Lower confidence - just navigate to first suggestion
      handleNavigate(selectedSuggestion.nextId);
    }
  };

  const handleSuggestionClick = (opt) => {
      handleNavigate(opt.nextId);
  };

  const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
          if (suggestions.length === 0) return;
          e.preventDefault();
          setActiveSuggestionIndex((prevIndex) =>
            prevIndex === -1 ? 0 : (prevIndex + 1) % suggestions.length
          );
      } else if (e.key === 'ArrowUp') {
          if (suggestions.length === 0) return;
          e.preventDefault();
          setActiveSuggestionIndex((prevIndex) =>
            prevIndex === -1 ? suggestions.length - 1 : (prevIndex - 1 + suggestions.length) % suggestions.length
          );
      } else if (e.key === 'Tab') {
          if (!showSuggestions || suggestions.length === 0) return;
          e.preventDefault();
          handleSubmit();
      } else if (e.key === 'Enter') {
          e.preventDefault();
          handleSubmit();
      } else if (e.key === 'Escape') {
          e.preventDefault();
          setInputValue("");
          setSuggestions(limitSuggestions(buildSuggestionsFromResponse(currentResponse)));
          setIsSearching(false);
          setHasNoResults(false);
          setActiveSuggestionIndex(-1);
      }
  };

  const clearConversation = () => {
      setCurrentResponse(START_NODE);
      setInputValue("");
      setIsSearching(false);
      setHasNoResults(false);
      setSuggestions(limitSuggestions(buildSuggestionsFromResponse(START_NODE)));
      setShowSections(false);
      setActiveSuggestionIndex(-1);
  };

  const handleCommandBarFocus = () => {
      setCurrentResponse(START_NODE);
      setInputValue("");
      setIsSearching(false);
      setHasNoResults(false);
      setSuggestions(limitSuggestions(buildSuggestionsFromResponse(START_NODE)));
      setShowSections(false);
      setActiveSuggestionIndex(-1);
      setIsFocused(true);
      inputRef.current?.focus();
  };

  const handleRecoveryReset = () => {
      setInputValue("");
      setIsSearching(false);
      setHasNoResults(false);
      setSuggestions(limitSuggestions(buildSuggestionsFromResponse(START_NODE)));
      setCurrentResponse(START_NODE);
      setShowSections(false);
      setActiveSuggestionIndex(-1);
      inputRef.current?.focus();
  };

  const showSuggestions = isFocused && !isTyping && suggestions.length > 0;
  const visibleSuggestions = suggestions; // Show all suggestions on mobile now

  const handleCollapse = (collapsed) => {
    setIsCollapsed(collapsed);
    // Save state to localStorage
    localStorage.setItem('chatbot-collapsed', JSON.stringify(collapsed));
  };

  return (
    <div
      ref={chatbotRef}
      className={`command-interface ${isMobile ? "is-mobile" : ""} ${isCollapsed ? "is-collapsed" : ""} ${keyboardHeight > 0 ? "keyboard-open" : ""}`}
      style={keyboardHeight > 0 ? { bottom: `calc(12px + ${keyboardHeight}px + env(safe-area-inset-bottom))` } : {}}
    >
      {isMobile && isCollapsed ? (
        <button
          className="chatbot-launcher"
          type="button"
          onClick={() => handleCollapse(false)}
          aria-label="Open Dubey A.I."
        >
          <span className="launcher-icon">
            <BrainIcon />
          </span>
          <span className="launcher-text">Dubey A.I.</span>
        </button>
      ) : (
        <>
          {isMobile && <div className="sheet-handle" aria-hidden="true" />}

          <div className={`chatbot-scroll-region ${isMobile ? "is-mobile" : ""}`}>
            {/* Response Window */}
            <AnimatePresence mode="wait">
              {isFocused && (currentResponse || isTyping) && (
                <motion.div
                  className={`response-card ${responseHasOverflow ? "has-overflow" : ""}`}
                  ref={responseCardRef}
                  initial={{ y: 20, scale: 0.98 }}
                  animate={{
                    y: 0,
                    scale: 1,
                    transition: {
                      duration: 0.2,
                      ease: "easeOut"
                    }
                  }}
                  exit={{ y: 10, scale: 0.98 }}
                  key={currentResponse?.id || 'typing'}
                >
                  <div className={`response-header ${isMobile ? "with-collapse" : ""}`}>
                    <div className="response-icon">
                      <BrainIcon />
                    </div>
                    <span className="response-title">Dubey A.I.</span>
                    {isMobile && (
                      <button
                        className="collapse-button"
                        onClick={() => handleCollapse(true)}
                        aria-label="Collapse chat"
                      >
                        <XIcon />
                      </button>
                    )}
                    {!isMobile && (
                      <button
                        className="clear-button"
                        onClick={clearConversation}
                        aria-label="Clear conversation"
                      >
                        <XIcon />
                      </button>
                    )}
                  </div>
                  <div className="response-text">
                    {isTyping ? (
                      <div className="typing-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    ) : (
                      currentResponse?.sections ? renderStructuredResponse(currentResponse) : (
                        <Typewriter text={currentResponse?.text || ""} onComplete={() => setShowSections(true)} />
                      )
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Search Recovery */}
            <AnimatePresence>
              {isFocused && hasNoResults && !isTyping && (
                <motion.div
                  className="chatbot-state-card"
                  initial={{ y: 10 }}
                  animate={{ y: 0 }}
                  exit={{ y: 5 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                >
                  <div className="chatbot-state-title">No direct match found</div>
                  <div className="chatbot-state-text">Try broader keywords, or jump back to the main menu.</div>
                  <div className="chatbot-state-actions">
                    <button type="button" className="chatbot-state-action" onClick={handleRecoveryReset}>
                      Show main menu
                    </button>
                    <button
                      type="button"
                      className="chatbot-state-action ghost"
                      onClick={() => {
                        setInputValue("");
                        setHasNoResults(false);
                        setSuggestions(limitSuggestions(buildSuggestionsFromResponse(currentResponse || START_NODE)));
                        inputRef.current?.focus();
                      }}
                    >
                      Clear search
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Suggestions */}
            <AnimatePresence>
              {showSuggestions && (
                <motion.div
                  className={`suggestions-container ${isMobile ? "is-mobile" : ""}`}
                  initial={{ y: 10 }}
                  animate={{ y: 0 }}
                  exit={{ y: 5 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                >
                  {visibleSuggestions.map((opt, idx) => {
                    const originalIndex = suggestions.findIndex((item) => item.nextId === opt.nextId && item.label === opt.label);
                    const resolvedIndex = originalIndex === -1 ? idx : originalIndex;
                    return (
                      <button
                        key={opt.nextId || idx}
                        className={`suggestion-pill ${resolvedIndex === 0 && isSearching ? 'top-match' : ''} ${resolvedIndex === activeSuggestionIndex ? 'active' : ''}`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleSuggestionClick(opt);
                        }}
                        onMouseDown={(e) => e.preventDefault()}
                        onMouseEnter={() => setActiveSuggestionIndex(resolvedIndex)}
                        style={{ animationDelay: `${idx * 50}ms` }}
                        title={opt.description || formatSuggestionLabel(opt)}
                      >
                        {formatSuggestionLabel(opt)}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Empty Fallback */}
            <AnimatePresence>
              {isFocused && !isTyping && !hasNoResults && suggestions.length === 0 && (
                <motion.div
                  className="chatbot-state-card"
                  initial={{ y: 10 }}
                  animate={{ y: 0 }}
                  exit={{ y: 5 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                >
                  <div className="chatbot-state-title">No prompts available yet</div>
                  <div className="chatbot-state-text">Reset to the main menu to continue exploring.</div>
                  <div className="chatbot-state-actions">
                    <button type="button" className="chatbot-state-action" onClick={handleRecoveryReset}>
                      Return to main menu
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Command Bar */}
          <div
            className={`command-bar ${isFocused || inputValue ? 'focused' : ''} ${isTyping ? 'thinking' : ''}`}
            onClick={handleCommandBarFocus}
          >
            <div className="command-icon">
              <SearchIcon />
            </div>
            <input
              ref={inputRef}
              type="text"
              className="command-input"
              placeholder="Search projects, skills, experience..."
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                handleSearch(e.target.value);
                setActiveSuggestionIndex(-1);
              }}
              onKeyDown={handleKeyDown}
              onFocus={handleCommandBarFocus}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            />
            {suggestions.length > 0 && inputValue && (
              <button
                className="command-submit"
                onClick={handleSubmit}
                title={`Go to: ${suggestions[activeSuggestionIndex >= 0 ? activeSuggestionIndex : 0].label}`}
                disabled={isTyping || hasNoResults}
              >
                <ArrowUpIcon />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Chatbot;
