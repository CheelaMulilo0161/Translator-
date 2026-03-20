# Translation Web Application

A web-based translation application that allows users to translate text between languages in real time using the MyMemory Translation API.

---

## Project Structure

```
├── index.html    # Main HTML structure
├── style.css     # Styling and animations
├── script.js     # Application logic
└── README.md     # Project documentation
```


## Features

- Real-time translation with debounce (700ms after typing stops)
- Default translation of *"Hello, how are you"* from English to French on page load
- 500-character input limit with a live counter
- Language detection (Detect Language option)
- Swap source and target languages
- Text-to-Speech (Listen) for both input and output text
- Copy to clipboard for both input and output text
- Loading indicator while translation is in progress
- Error handling for failed API requests
- Responsive design for mobile screens

---

## Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla)
- [MyMemory Translation API](https://api.mymemory.translated.net)
- [Google Fonts – Inter](https://fonts.google.com/specimen/Inter)

---

## Getting Started

### Prerequisites

No installations or dependencies required. Just a modern web browser.

### Setup Instructions

1. Clone or download this repository:
   ```bash
   git clone https://github.com/your-username/translation-app.git
   ```

2. Navigate into the project folder:
   ```bash
   cd translation-app
   ```

3. Open `index.html` in your browser:
   ```bash
   open index.html
   ```
   Or simply double-click `index.html` in your file explorer.

---

## API Reference

Translation data is retrieved using the **MyMemory API**:

```
GET https://api.mymemory.translated.net/get?q={text}&langpair={source}|{target}
```

**Example request:**

```javascript
fetch("https://api.mymemory.translated.net/get?q=Hello&langpair=en|fr")
  .then(response => response.json())
  .then(data => console.log(data.responseData.translatedText));
```

**Supported language codes:**

| Language   | Code |
|------------|------|
| English    | en   |
| French     | fr   |
| Spanish    | es   |
| German     | de   |
| Italian    | it   |
| Portuguese | pt   |
| Chinese    | zh   |
| Japanese   | ja   |
| Arabic     | ar   |

---

## Usage

1. Enter text in the **Input** panel (max 500 characters)
2. Select the **source** and **target** languages from the dropdowns
3. Click the **Translate** button or wait for auto-translate to trigger
4. View the translated result in the **Output** panel
5. Use the **Listen** button to hear the text read aloud
6. Use the **Copy** button to copy text to your clipboard
7. Use the **swap** button (⇅) to switch languages and reverse the translation

---

## Evaluation Criteria

| Criteria                        | Weight |
|---------------------------------|--------|
| Interface implementation        | 20%    |
| API integration                 | 25%    |
| Application functionality       | 25%    |
| Code structure and readability  | 15%    |
| User experience features        | 15%    |

---

## Author

Cheela Mulilo — [GitHub](https://github.com/your-CheelaMulilo0161)
