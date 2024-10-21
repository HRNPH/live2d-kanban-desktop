// Declare and initialize talkHistory from localStorage, or as an empty array
var talkHistory = localStorage.getItem('talkHistory') ? JSON.parse(localStorage.getItem('talkHistory')) : [];
const GptAnswerCross = "<span class='fui-cross' onclick=\"hideMessageLocked(500);document.getElementById('nlp').value='';\" style=' font-size: 13px;z-index: 100;position: absolute;padding:5px;right: 0px;top:0px' ></span>";
const axios = nodeRequire('axios');

// Save the updated talkHistory back to localStorage for persistence
function saveTalkHistory() {
    // If talkHistory exceeds 100 messages, keep only the last 20
    if (talkHistory.length > 100) {
        talkHistory = talkHistory.slice(-20); // Keep only the last 20 messages
    }
    localStorage.setItem('talkHistory', JSON.stringify(talkHistory));
}


async function gptrun(sentense, answerDiv) {
    // Ensure talkHistory is an array
    if (!Array.isArray(talkHistory)) {
        talkHistory = [];
    }

    if (talkHistory.length === 0) {
        talkHistory.push({ "role": "system", "content": localStorage.getItem("prompt") });
        saveTalkHistory(); // Save after modifying
    }

    showMessageLocked('Thinking...', undefined);

    var data = {
        role: 'user',
        content: sentense,
    };

    talkHistory.push(data);
    saveTalkHistory(); // Save after modifying

    try {
        const response = await axios({
            method: 'POST',
            responseType: 'json',
            url: (localStorage.getItem("openURL") ? localStorage.getItem("openURL") : "https://api.openai.com") + '/v1/chat/completions',
            proxy: { protocol: 'http', host: '127.0.0.1', port: 7890 },
            validateStatus(status) { return true },
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ` + localStorage.getItem("ChatgptKey"),
            },
            data: {
                model: localStorage.getItem("AImodel") ? localStorage.getItem("AImodel") : "gpt-3.5-turbo",
                messages: talkHistory,
                stream: false,
            },
        });

        if (response.status >= 200 && response.status < 300) {
            const responseMessage = response.data.choices[0].message.content;
            showMessageLocked(GptAnswerCross + responseMessage);
            console.log('[response]', response.data);

            talkHistory.push({
                "role": "assistant",
                "content": responseMessage,
            });
            saveTalkHistory(); // Save after modifying

            textToSpeech(responseMessage);
        } else {
            showMessageLocked(GptAnswerCross + response.data.error.message);
            console.log('[response]', {
                data: {
                    message: response.data.error.message,
                    type: response.data.error.type,
                    code: response.data.error.code,
                },
                status: response.status,
            });
        }
    } catch (error) {
        console.error('Error during API request:', error);
    }
}

async function OpenRouterRun(sentense, answerDiv) {
    showMessageLocked('Thinking...', undefined);
    try {
        const response = await axios({
            method: 'POST',
            responseType: 'json',
            url: 'https://openrouter.ai/api/v1/chat/completions',
            validateStatus(status) { return true },
            headers: {
                "Authorization": `Bearer ` + localStorage.getItem("OpenRouterKey"),
                "HTTP-Referer": `https://github.com/hrnph/live2d-kanban-desktop`,
                "X-Title": `kanban-desktop`,
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                "messages": [
                    { "role": "user", "content": sentense }
                ],
                stream: false,
            }),
        });

        if (response.status >= 200 && response.status < 300) {
            showMessageLocked(GptAnswerCross + response.data.choices[0].message.content);
            console.log('[response]', response.data);
        } else {
            showMessageLocked(GptAnswerCross + response.data.error.message);
            console.log('[response]', {
                data: {
                    message: response.data.error.message,
                    type: response.data.error.type,
                    code: response.data.error.code,
                },
                status: response.status,
            });
        }
    } catch (error) {
        console.error('Error during OpenRouter request:', error);
    }
}

// Elevenslab API
async function textToSpeech(text) {
    const apiKey = localStorage.getItem("ElevenslabKey");
    const voiceId = localStorage.getItem("ElevenslabVoiceId");

    if (!apiKey || !voiceId) {
        console.error("Missing Elevenslab API Key or Voice ID");
        return;
    }

    try {
        const response = await axios({
            method: 'POST',
            responseType: 'arraybuffer',
            url: `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`,
            headers: {
                "xi-api-key": apiKey,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                "text": text
            }),
        });

        // Play the audio buffer (stream)
        const audio = new Audio();
        audio.src = URL.createObjectURL(new Blob([response.data]));
        audio.play();
    } catch (error) {
        console.error("Error during text-to-speech request:", error.response ? error.response.data : error);
    }
}
