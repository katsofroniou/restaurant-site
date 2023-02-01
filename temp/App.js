import React from 'react'; 
import logo from './images/OaxacaLogo.png';
import './App.css'; 
 

function App() { 

    return ( 

        <div> 

            <nav class="navbar background"> 

                <ul class="nav-list"> 

                    <div class="logo"> 

                        <img src= {logo}/> 

                    </div> 

                    <li><a class="text-big">Home</a></li> 

                    <li><a class="text-big">Menu</a></li> 

                    <li><a class="text-big">Order</a></li> 

                    <li><a class="text-big">Sign In</a></li> 

                </ul>

            </nav> 

            <section class="section"> 

                <div class="box-main"> 
                </div> 

            </section> 

            <footer className="footer"> 
            </footer> 

        </div> 

    ) 
} 

  

export default App 