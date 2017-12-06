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
      <router-link class="navbar-item" active-class="is-active" to="/" exact>
        Home
      </router-link>
      <a class="navbar-item" href="/">
        Places
      </a>
      <router-link class="navbar-item" active-class="is-active" to="/notes">
        Notes
      </router-link>
      <router-link class="navbar-item" active-class="is-active" to="/mails">
      Emails
    </router-link>
    </div>

    <div class="navbar-end">

    </div>
  </div>
</nav>
`
 }