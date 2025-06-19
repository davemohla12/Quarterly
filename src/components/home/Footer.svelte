<script>
  import { currentYear } from '$src/settings/settings'
</script>

<div class="footer">
  <div class="legal">
    <a class="terms" href="/terms" target="_blank">Terms of Service</a>
    <div class="bullet">•</div>
    <a class="privacy" href="/privacy" target="_blank">Privacy Policy</a>
  </div>
  <div class="copyright">
    Copyright © {currentYear} Zenguider
  </div>
</div>

<style>
  .footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--dark);
  }
  .legal {
    display: flex;
    margin-top: 20px;
  }
  a {
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
  a:visited {
    text-decoration: none;
  }
  .terms {
    font-family: 'Lato', sans-serif;
    font-size: 14px;
    font-weight: var(--regular);
    color: var(--white);
  }
  .bullet {
    font-family: 'Lato', sans-serif;
    font-size: 14px;
    font-weight: var(--regular);
    color: var(--white);
    margin-left: 5px;
    margin-right: 5px;
  }
  .privacy {
    font-family: 'Lato', sans-serif;
    font-size: 14px;
    font-weight: var(--regular);
    color: var(--white);
  }
  .copyright {
    margin-top: 15px;
    margin-bottom: 15px;
    font-family: 'Lato', sans-serif;
    font-size: 14px;
    font-weight: var(--regular);
    color: var(--white);
  }
</style>