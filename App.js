import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import validator from 'validator';

const App = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = () => {
    try {
      if (validator.isEmpty(name)) {
        setError('Name is required');
      } else if (!validator.isMobilePhone(mobile)) {
        setError('Invalid mobile number');
      } else if (!validator.isEmail(email)) {
        setError('Invalid email address');
      } else if (validator.isEmpty(message)) {
        setError('Message is required');
      } else {
        const nodemailer = require('nodemailer');
  
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: email,  // use the user's email as the sender
            pass: 'your-password',
          },
        });
  
        const mailOptions = {
          from: email,  // use the user's email as the sender
          to: 'info@redpositive.in',
          subject: 'Contact Us Form',
          text: `Name: ${name}\nMobile: ${mobile}\nEmail: ${email}\nMessage: ${message}`,
        };
  
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error(error);
          } else {
            console.log(`Email sent: ${info.response}`);
          }
        });
  
        setError(null);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {error && (
        <Text style={{ color: 'red', fontSize: 14 }}>{error}</Text>
      )}
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '80%' }}
        placeholder="Name"
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '80%', marginTop: 8 }}
        placeholder="Mobile Number"
        value={mobile}
        onChangeText={text => setMobile(text)}
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '80%', marginTop: 8 }}
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={{ height: 80, borderColor: 'gray', borderWidth: 1, width: '80%', marginTop: 8 }}
        placeholder="Message"
        multiline
        value={message}
        onChangeText={text => setMessage(text)}
      />
      <TouchableOpacity onPress={handleSubmit} style={{ marginTop: 16, padding: 8, backgroundColor: '#333', width: '80%', alignItems: 'center' }}>
        <Text style={{ color: '#fff' }}>Submit</Text></TouchableOpacity></View>
        )
      }
