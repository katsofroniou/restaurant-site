import React from "react";
import axios from 'axios'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { useState, useEffect } from "react";
import "../styling/KitchenStaff.css";





function KitchenStaff ({notification, setNotification}) {
    const [filledForm, setFilledForm] = useState(false);
    const [value, setValue] = useState('order ready');
    const [name, setName] = useState('kitchen');
    const [room, setRoom] = useState('test');

    const client = new W3CWebSocket('ws://127.0.0.1:8000/ws/test/');

    console.log("test");

    

    useEffect(() => {
        // initialize previousMessages to an empty array
        let previousNotifications = [];
      
        client.onopen = () => {
          console.log("WebSocket Client Connected");
        };
      
        client.onmessage = (message) => {
          const dataFromServer = JSON.parse(message.data);
          if (dataFromServer) {
            // update previousNotifications with the latest message
            previousNotifications = [        ...previousNotifications,        {          msg: dataFromServer.text,          name: dataFromServer.sender,        },      ];
      
            // update notification state with previousMessages
            setNotification(previousNotifications);
          }
        };
      
        ;
      }, []); 
      

    const onButtonClicked = (e) => {
        
        client.send(
        JSON.stringify({
            type: "notify",
            text: value,
            sender: name,
        })
        );
        setNotification(prevNotifications => [...prevNotifications, notification]);


        e.preventDefault();
    };

    return (
        <>
            <h1>Kitchen</h1>
           
            <button class="kitchen_button" type="button" onClick={onButtonClicked}>Notify Waiters</button>
        </>
    );
}

export default KitchenStaff;