import './App.css';

const App = () => (
  <div className="App">
    <h1>OAXACA</h1>
    <nav class="navbar">
      <div class="navbar__container">
        <a href="/" id="navbar__logo">OAXACA</a>
        <div class="navbar__toggle" id="mobile-menu">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </div>
        <ul class="navbar__menu">
          <li class="navbar__item">
            <a href="Index.html" class="navbar__links">
              Home
            </a>
          </li>
          <li class="navbar__item">
            <a href="Menu.html" class="navbar__links">
              Menu
            </a>
          </li>
          <li class="navbar__btn">
            <a href="login.html" class="button">
              Sign In
            </a>
          </li>
        </ul>
      </div>
    </nav>
    <div>
      <button class="menu_button">show calories and allergies</button>
      <button class="menu_button">call waiter</button>
    </div>
    <div id="menu_div">
      <table class="menu_table">
        <tr>
          <th>Mains</th>
          <th>Description</th>
          <th>Cost</th>
        </tr>
        <tr>
          <td>Example Item</td>
          <td>Example Description</td>
          <td>Example Cost</td>
        </tr>
      </table>
      <table class="menu_table">
        <tr>
          <th>Platters</th>
          <th>Description</th>
          <th>Cost</th>
        </tr>
        <tr>
          <td>Example Item</td>
          <td>Example Description</td>
          <td>Example Cost</td>
        </tr>
      </table>
      <table class="menu_table">
        <tr>
          <th>Drinks</th>
          <th>Description</th>
          <th>Cost</th>
        </tr>
        <tr>
          <td>Example Item</td>
          <td>Example Description</td>
          <td>Example Cost</td>
        </tr>
      </table>
    </div>
  </div>
);

export default App;
