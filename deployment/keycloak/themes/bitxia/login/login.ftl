<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Bitxia Tech Login</title>
    <link rel="stylesheet" href="${url.resourcesPath}/css/style.css" />
  </head>
  <body>
    <canvas id="particles"></canvas>

    <div class="container" id="container">
      <div class="form-container sign-in-container">
        <form id="kc-form-login" action="${url.loginAction}" method="post">
          <h1>Sign in</h1>

          <#if message??>
            <div class="error">${message.summary!}</div>
          </#if>

          <input type="text" name="username" placeholder="Username or Email" autofocus autocomplete="off"/>
          <input type="password" name="password" placeholder="Password" autocomplete="off"/>

          <a href="${url.loginResetCredentialsUrl}">Forgot your password?</a>
          <button type="submit" name="login">Sign In</button>
        </form>
      </div>

      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-right">
            <img src="https://bitxiatech.com/images/bitxia-logo.svg" alt="Bitxia Tech Logo" class="logo"/>
            <h1>Welcome to Bitxia Tech</h1>
            <p>See your data with clarity. Transform insights into action.</p>

            <div class="charts">
              <div class="chart-box"><canvas id="pieChart"></canvas></div>
              <div class="chart-box"><canvas id="barChart"></canvas></div>
            </div>

            <button class="ghost" id="signUp">Sign Up</button>
          </div>
        </div>
      </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="${url.resourcesPath}/js/main.js"></script>
  </body>
</html>
