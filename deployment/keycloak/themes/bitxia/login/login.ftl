<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Bitxia Tech Login</title>
    <link rel="stylesheet" href="${url.resourcesPath}/css/style.css" />
  </head>
  <body>

    <div class="container" id="container">
      <div class="form-container sign-in-container">
        <form id="kc-form-login" action="${url.loginAction}" method="post">
          <h1>Sign in</h1>
          <!-- <div class="social-container">
            <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
            <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
          </div> -->
          <!-- <span>or use your account</span> -->
          <input type="text" name="username" placeholder="Username or Email" autofocus />
          <input type="password" name="password" placeholder="Password" />
          <button type="submit" name="login">Sign In</button>
        </form>
      </div>
      <div class="form-container sign-up-container">
        <form action="#">
          <h1>Create Account</h1>
          <!-- <div class="social-container">
            <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
            <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
          </div> -->
          <!-- <span>or use your email for registration</span> -->
          <input type="text" placeholder="Name" />
          <input type="text" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Sign Up</button>
        </form>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-right">
            <img
            src="https://bitxiatech.com/images/bitxia-logo.svg"
            alt="Bitxia Tech Logo"
            class="logo"
            />
            <h2>Data at Your Fingertips</h2>
            <p>See your data with clarity. Transform insights into action.</p>
            <div class="charts">
              <div class="chart-box"><canvas id="pieChart"></canvas></div>
              <div class="chart-box"><canvas id="barChart"></canvas></div>
              <div class="chart-box"><canvas id="lineChart"></canvas></div>
              <div class="chart-box"><canvas id="gaugeChart"></canvas></div>
            </div>
            <div class="circle one"></div>
            <div class="circle two"></div>
            <button class="ghost" id="signUp">Sign Up</button>
          </div>
          <div class="overlay-panel overlay-left">
            <img
              src="https://bitxiatech.com/images/bitxia-logo.svg"
              alt="Bitxia Tech Logo"
              class="logo"
            />
            <h1>Welcome to Bitxia Tech</h1>
            <p>Start your journey. Transform insights into action.</p>
            <div class="charts">
            </div>
            <button class="ghost" id="signIn">Sign In</button>
          </div>
        </div>
      </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="${url.resourcesPath}/js/main.js"></script>
  </body>
</html>