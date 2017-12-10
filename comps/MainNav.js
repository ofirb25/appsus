export default {
  template: `
<div class="">
<nav class="nav is-dark" >
  <div class="navbar-brand">
    <a class="navbar-item" href="/">
      <img src="../assets/logo.png" alt="Apsus app" width="112" height="28">
    </a>
  </div>

  <div id="main-nav" class="nav-menu">
      <router-link class="nav-item" active-class="is-active" to="/" exact>
        Home
      </router-link>
      <router-link class="nav-item" active-class="is-active" to="/places">
      Places
    </router-link>
      <router-link class="nav-item" active-class="is-active" to="/notes">
        Notes
      </router-link>
      <router-link class="nav-item" active-class="is-active" to="/mails">
      Emails
    </router-link>

  </div>
</nav>
</div>
`,
data () {
  return {
      isOpen : false
  }
  computed : {

  }
}
}