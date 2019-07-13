<template>
  <footer
    class="footer"
    :class="{ [`footer-${type}`]: type }"
    :data-background-color="backgroundColor"
  >
    <div class="container">
      <nav>
        <ul>
          <li>
            <a href="http://arquidiocesebh.org.br/">
              Vicariato bh
            </a>
          </li>
          <li>
            <a href="http://arquidiocesebh.org.br/arquidiocese/atuacao/pastorais/pastoral-de-rua/">
              Pastoralde Rua
            </a>
          </li>
        </ul>
      </nav>
      <div class="copyright">
        &copy; {{ year }} NOVOLHARUA
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  props: {
    backgroundColor: String,
    type: String
  },
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>
<style></style>
