// Header.vue
<template>
    <header id="header">
        
    <div class="container">

      <div id="logo" class="pull-left">
        <a href="#hero"><img src="../assets/images/logo_small.png" alt="" title="" /></a>
        
        <!-- Uncomment below if you prefer to use a text logo -->
        <!--<h1><a href="#hero">Regna</a></h1>-->
      </div>
      <nav id="nav-menu-container">
        <ul class="nav-menu">
          <li class="menu-active"><router-link to="/">Home</router-link></li>
          <li><router-link to="/people">People</router-link></li>
          <li><router-link to="/films">Films</router-link></li>      
        </ul>
      </nav><!-- #nav-menu-container -->
    </div>
  </header><!-- #header -->
</template>
