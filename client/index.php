<!DOCTYPE html>
<html lang="en">
  <head>
    <?php include('head.php'); ?>  
   </head>
  <body>
  	<div id="login-container">
    	<div class="col-xs-12 logo-style-index center">
    	  <img src="img/LogoLeft.png" alt="logo" style="margin-bottom: 20px">
    	</div>
    	<div class="container">
    	  <form class="form-signin" role="form" action="vote.php">
    	    <input type="email" class="form-control" placeholder="Email" required="" autofocus="">
    	    <input type="password" class="form-control top-padding" placeholder="Password" required="">
    	    <button class="btn btn-lg btn-block sign-in-button-color sign-in-button-hover top-padding" type="button" onclick="window.location = 'vote.php'">Sign in</button>
    	    <button class="btn btn-lg btn-block register-button-color" type="button">Register</button>
    	  </form>

		  </div> <!-- /container -->
  	</div>

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
  </body>
</html>