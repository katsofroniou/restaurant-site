import React from "react";
import axios from 'axios'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { useState, useEffect } from "react";
import "../styling/KitchenStaff.css";

function KitchenStaff (props) {
    const [filledForm, setFilledForm] = useState(false);
    const [value, setValue] = useState('order ready');
    const [name, setName] = useState('kitchen');
    const [room, setRoom] = useState('test');
    const client = new W3CWebSocket('ws://127.0.0.1:8000/ws/' + room + '/');
    const { notification, setNotification } = props;


    useEffect(() => {
        client.onopen = () => {
        console.log("WebSocket Client Connected");
        };


        return () => {
        client.close();
        };
    }, [room]);

    const onButtonClicked = (e) => {
        client.send(
        JSON.stringify({
            type: "notify",
            text: value,
            sender: name,
        })
        );
        setNotification([...notification, { msg: value, name: name, type:"notify" }]);

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