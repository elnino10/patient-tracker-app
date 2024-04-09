import React, { useState } from "react";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";

const SymptomChecker = () => {
  const [inputText, setInputText] = useState("");
  const [response, setResponse] = useState("");

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const getAIResponse = async () => {
    try {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      const apiUrl = "https://api.openai.com/v1/chat/completions";

      const response = await axios.post(
        apiUrl,
        {
          prompt: inputText,
          max_tokens: 100,
          model: "gpt-3.5-turbo",
          messages: [
            { role: "user", content: inputText },
            {
              role: "system",
              content:
                "You are a helpful assistant. and you provide medical content",
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      setResponse(response.data.choices[0].message.content);
      console.log(response);
    } catch (error) {
      console.error("Error fetching response:", error);
    }
    setInputText("");
  };

  return (
    <div>
      <TextField
        fullWidth
        variant="outlined"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Type your symptoms"
        InputProps={{
          endAdornment: (
            <IconButton onClick={getAIResponse} onMouseEnter={getAIResponse}>
              <SendIcon fontSize="small" color="primary" />
            </IconButton>
          ),
        }}
      />
      <div>
        <p>AI Response:</p>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default SymptomChecker;
