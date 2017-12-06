export default { 
  template : `
<nav class="navbar is-dark">
  <div class="navbar-brand">
    <a class="navbar-item" href="/">
      <img src="../assets/logo.png" alt="Apsus app" width="112" height="28">
    </a>
    <div class="navbar-burger burger" data-target="main-nav">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>

  <div id="main-nav" class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item" href="/">
        Home
      </a>
      <a class="navbar-item" href="/">
        Places
      </a>
      <a class="navbar-item" href="/">
        Notes
      </a>
      <a class="navbar-item" href="/">
        Emails
      </a>
    </div>

    <div class="navbar-end">

    </div>
  </div>
</nav>
`
 }