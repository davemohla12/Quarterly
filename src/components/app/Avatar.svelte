<div class="container">
  <div class="line"></div>
  <img class="avatar" src="/images/avatar.png" alt="Avatar" />
</div>

<style>
  .container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    margin-top: 20px;
  }
  .line {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    border-bottom: 1px solid var(--gray2);
    z-index: 1;
    transform: translateY(-50%);
  }
  .avatar {
    position: relative;
    z-index: 2;
    width: 55px;
    height: 55px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 0;
    margin-bottom: 0;
  }
  @media (min-width: 768px) { 
    .container {
      margin-top: 0px;
    }
    .avatar {
      width: 81px;
      height: 81px;
    }
  }
</style>