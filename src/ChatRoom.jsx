import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Paper, Avatar, SvgIcon } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';

function ArrowIcon(props) {
  return (
    <SvgIcon
      {...props}
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 12l14 0" />
      <path d="M13 18l6 -6" />
      <path d="M13 6l6 6" />
    </SvgIcon>
  );
}

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [userData, setUserData] = useState({ name: '' });
  

  console.log(userData.name)
  const userId = JSON.parse(localStorage.getItem('userDetails')).id; 

  // Fetch user data when component mounts
  useEffect(() => {
    // Fetch user data by userId
    fetch(`${process.env.REACT_APP_API_URL}/info/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data.userInfo); 
        console.log(data)
        const initialMessage = { text: `Hello! Sonu, how can I assist you today?`, sender: 'bot' };
        setMessages([initialMessage]);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        const errorMessage = { text: 'Hello! How can I assist you today?', sender: 'bot' };
        setMessages([errorMessage]);
      });
  }, [userId]);

  const handleSend = () => {
    if (input.trim()) {
      const newMessage = { text: input, sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, newMessage]);



      const requestData = {
        query: input,
        user_profile: {
          user_id: "Sonu99", // Replace with actual user id
          personal_info: {
            name: "Sonu",
            age: 30,
            gender: "Male",
            email: "john.doe@example.com",
            phone: "+1-555-555-5555"
          },
          health_info: {
            mental_health_issues: ["Anxiety", "Depression"],
            physical_health_issues: ["High Blood Pressure", "Chronic Fatigue"],
            medications: [
              { name: "Sertraline", dosage: "50 mg", frequency: "Once daily" },
              { name: "Lisinopril", dosage: "10 mg", frequency: "Once daily" }
            ]
          },
          therapy_history: {
            sessions_completed: 10,
            last_session_date: "2024-09-20",
            goals: ["Manage anxiety", "Improve work-life balance", "Reduce depressive symptoms"]
          },
          lifestyle_info: {
            exercise_routine: "Moderate exercise 3 times a week",
            dietary_habits: "Mostly balanced diet with occasional unhealthy meals",
            sleep_habits: "Sleeps 6-7 hours per night"
          },
          emergency_contact: {
            name: "Jane Doe",
            relationship: "Spouse",
            phone: "+1-555-555-5556"
          }
        },
        "chat_history": {
          "user_id": "user_12345",
          "sessions": {
            "session_1": {
              "date": "2024-09-25",
              "questions_and_answers": [
                {"question": "Hello! How are you feeling today?", "answer": "I'm feeling a bit low."},
                {"question": "Would you like to talk about what’s making you feel this way?", "answer": "Yes, I’ve been feeling overwhelmed with work lately."}
              ]
            },
            "session_2": {
              "date": "2024-09-26",
              "questions_and_answers": [
                {"question": "How have you been sleeping?", "answer": "Not very well, I’ve been waking up a lot at night."},
                {"question": "Have you tried anything to improve your sleep?", "answer": "I’ve tried limiting screen time, but it hasn’t helped much."}
              ]
            },
            "session_3": {
              "date": "2024-09-27",
              "questions_and_answers": [
                {"question": "Have you been able to relax today?", "answer": "A bit, I went for a walk."},
                {"question": "What helps you unwind?", "answer": "Listening to music and meditation."}
              ]
            }
          }
        }
      };

      // Send the user input to the API for a response
      fetch('https://manchat-hgfafagrbnfnfce8.eastus-01.azurewebsites.net/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => response.json())
        .then((data) => {
          const botResponse = { text: data.response, sender: 'bot' };
          setMessages((prevMessages) => [...prevMessages, botResponse]);
        })
        .catch((error) => {
          console.error('Error fetching the chatbot response:', error);
          const botErrorResponse = { text: 'Sorry, I am unable to respond at the moment.', sender: 'bot' };
          setMessages((prevMessages) => [...prevMessages, botErrorResponse]);
        });

      setInput(''); // Clear the input field
    }
  };

  const handleInputChange = (e) => setInput(e.target.value);

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="40vh"
      width="80%"
      margin="0 auto"
      bgcolor="#003D48"
      overflow="hidden"
    >
      {/* Chat messages */}
      <Box
        flex={1}
        padding={2}
        overflow="auto"
        display="flex"
        flexDirection="column"
      >
        {messages.map((message, index) => (
          <Box
            key={index}
            display="flex"
            justifyContent={message.sender === 'user' ? 'flex-end' : 'flex-start'}
            marginBottom={2}
          >
            {message.sender === 'bot' && (
              <Avatar
                src="/assets/mannmuktt logo.png"
                alt="Bot Avatar"
                sx={{ marginRight: 2 }}
              />
            )}
            <Paper
              elevation={1}
              sx={{
                padding: '10px',
                borderRadius: '8px',
                maxWidth: '70%',
                backgroundColor: message.sender === 'user' ? '#0b93f6' : '#e5e5ea',
                color: message.sender === 'user' ? '#fff' : '#000',
              }}
            >
              <Typography>{message.text}</Typography>
            </Paper>
            {message.sender === 'user' && (
              <Avatar
                src="https://via.placeholder.com/40/0b93f6/ffffff?text=U"
                alt="User Avatar"
                sx={{ marginLeft: 2 }}
              />
            )}
          </Box>
        ))}
      </Box>

      {/* Input box */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        bgcolor="#0097B2"
        border="1px solid #9494c2"
        sx={{ width: '100%', borderRadius: '50px', boxSizing: 'border-box', marginBottom: 2 }}
      >
        {/* Left-side Mic Button */}
        <Button
          sx={{
            borderRadius: '50px',
            minWidth: '50px',
            height: '50px',
            backgroundColor: 'white',
            '&:hover': {
              opacity: 0.8,
              backgroundColor: 'white',
            },
          }}
        >
          <MicIcon />
        </Button>

        {/* TextField */}
        <TextField
          variant="outlined"
          placeholder="Type a message..."
          value={input}
          onChange={handleInputChange}
          fullWidth
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          sx={{
            mx: 1,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                border: 'none',
              },
              '& input': {
                padding: 0,
              },
            },
          }}
        />

        {/* Right-side Send Button */}
        <Button
          onClick={handleSend}
          sx={{
            borderRadius: '50px',
            minWidth: '50px',
            height: '50px',
            backgroundColor: '#003D48',
            '&:hover': {
              opacity: 0.8,
              backgroundColor: 'white',
            },
          }}
        >
          <ArrowIcon sx={{ color: '#FFFFFFCC', transform: 'rotate(270deg)' }} />
        </Button>
      </Box>
    </Box>
  );
};

export default ChatRoom;
