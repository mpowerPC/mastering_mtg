<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Mastering Magic</title>
<!-- 
Name: Gregory James Caldwell Jr.
Email: Gregory_Caldwell@student.uml.edu
File: Cards.php
Starting Date: Thursday February 12th, 2014
Last Date: Saturday April 28th, 2014
Course: 91.462 - GUI Programming II
-->

    <!-- Useful Resource http://jsfiddle.net/ -->
    <!-- Useful Resource http://mtgjson.com/ -->
    <!-- Useful Resource http://http://magic.wizards.com/ -->
    <!-- Useful Resource http://http://gatherer.wizards.com/Pages/Default.aspx -->
    <!-- Useful Resourcehttp://heelhook.github.io/chardin.js/ -->

    <!-- Content Delivery Network Scripts --> 

    <!-- JQuery -->
    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.js"></script> 

    <!-- JQuery UI -->
    <script src="//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.2/jquery-ui.js"></script>

    <!-- D3 Data Visualization CDN via Cloud Flare -->
    <script type="text/javascript" src="js/d3.min.js"></script>
    <script type="text/javascript" src="js/radialProgress.js"></script>

    <!-- Chardinjs Instructions -->
    <link href="css/chardinjs.css" rel="stylesheet">
    <script src="js/chardinjs.min.js"></script>

    <!-- Google Fonts -->
    <link href='http://fonts.googleapis.com/css?family=Titillium+Web' rel='stylesheet' type='text/css'>

    <!-- Card.php Stylesheet -->
    <link rel="stylesheet" href="css/cards.css">
    <link rel="stylesheet" href="css/popularCards.css">

    <!-- Jquery UI CSS -->
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.2/jquery-ui.css">

    <!--Changes the small icon on the page to the image referenced. --> 
    <link rel="icon" href="images/MTGCard.png">

  </head>

  <body>
    <!-- Auto Complete Script -->
    <script type="text/javascript" src="js/Autocomplete.js"> </script>

    <header>
      <img class="logo" src="images/logo.jpg" alt="Mastering Magic">
      <ul class='menu'>
      <li><a href="index.html">Home</a></li>
      <li><a href="cards.php">Cards</a></li>
      <li><a href="decks.php?or=0">Decks</a></li>
      </ul>
    </header>

    <button id="info">Instructions</button>

    <div class='card'>
      <nav id='card_nav'>
        <div id='nav_header'>
          <h3 data-intro='Name of the Card' data-position='left' id='card_name'></h3>
        </div> <!-- .navbar-header -->
        <div id='card_select'>
          <form method="get" id="searchBar" >      
            <div class='ui-widget'> 
              <label for='search'> Enter a Card: </label> 
              <input  data-intro='Search bar for looking up additional cards.' data-position='right' type="search" name="search" id="search" placeholder="Enter a card..."> 
            </div>
          </form>
        </div> <!-- #card_select -->
      </nav> <!-- #card_nav -->

      <?php
        
        // Card to look up.
        $card = $_GET["search"] ;
        
        // Database credentials.
        $username = "mmammoss" ;
        $password = "mm5119" ;
       
     
        // Error report configuration.
        // Code from https://www.teaching.cs.uml.edu/~heines/91.462/91.462-2014-15s/462-lecs/code/showphpsource.php?file=connect-v4i.php&numberlines
        error_reporting( E_STRICT ) ;
        function terminate_missing_variabless( $errno, $errstr, $errfile, $errline ) 
        {
          if (( $errno == E_NOTICE ) and ( strstr( $errstr, "Undefined variable" ) ) )
          {
            die ( "$errstr in $errfile line $errline" ) ;
          }
          return false;
        }
        
        $old_error_handler = set_error_handler( "terminate_missing_variables" ) ;
            
        // Create connection with mysqli to the weblab mysql server.
        // Code from https://www.teaching.cs.uml.edu/~heines/91.462/91.462-2014-15s/462-lecs/code/showphpsource.php?file=connect-v4i.php&numberlines
        $db = new mysqli("localhost", $username, $password, $username) ;
        
        if ( $db->connect_errno > 0 )
        {
          die( '<p>Unable to connect to database [' . $db->connect_error . ']</p>\n' ) ;
        }
        
        if (isset($card)) 
        {
          // Fetch the row count from `mtg_cards`. 
          $card_sql_str = strtolower(str_replace("'", "\\'", $card)) ;
          $card_uni_str = str_replace("'", "\\'", $card);
          $sql = "SELECT * FROM `mtg_cards` WHERE `name_simple` = '" . $card_sql_str . "' or `name_unicode` = '" . $card_uni_str . "';" ;
          if ( ! $result = $db->query( $sql ) ) 
          {
            die( '<p>There was an error running card query [' . $db->error . ']</p>\n' ) ;
          }
          
          $card_info = $result->fetch_assoc() ;
          
          $sql = "select sum(count) from mtg_cards c inner join mtg_deck d on d.card = c.name where c.name_simple = '" . $card_sql_str . "' or c.name_unicode = '" . $card_uni_str . "';" ;
          if ( ! $result = $db->query( $sql ) ) 
          {
            die( '<p>There was an error running card query [' . $db->error . ']</p>\n' ) ;
          }
          $card_count = $result->fetch_assoc() ;
          
          $sql = "select sum(count) as total from mtg_deck;" ;
          if ( ! $result = $db->query( $sql ) ) 
          {
            die( '<p>There was an error running card query [' . $db->error . ']</p>\n' ) ;
          }
          $total_count = $result->fetch_assoc() ;
          echo "<div id='middleBar'>" ;
          echo "<!-- Stuff on the Card -->\n<div id='cardStuff'>\n" ;
          echo "<!-- Image of the Card -->\n<div id='card_img' data-intro='Picture of the card.' data-position='left'>\n<img src=" ;
          echo '"' ;
          echo $card_info['image'] ;
          echo '"' ;
          echo " height=310 width=220 alt='MTG Card' />\n</div>\n\n" ;
          echo "</div>" ;
          echo "<!-- Data on the Card -->\n<div id='cardData'>\n" ;
          if ($card_info['colors']  != Null) {
            echo "<p data-intro='Colors of the card.' data-position='right'>Color: " . $card_info['colors'] . "</p>\n" ;
          }
          if ($card_info['type'] != Null) {
            echo "<p data-intro='Types and subtypes of the card.' data-position='right'>Type: " . $card_info['type'] . "</p>\n" ;
          }
          if ($card_info['mana_cost'] != Null) {
            echo "<p data-intro='The mana cost of the card.' data-position='right' class='hasMana' >Mana Cost: " . $card_info['mana_cost'] . "</p>\n" ;
          }          
          if ($card_info['text'] != Null) {
            echo "<p data-intro='Text displayed on the card.' data-position='right' class='hasMana' >Text: " . $card_info['text'] . "</p>\n" ;
          }
          if ($card_info['power'] != Null) {
            echo "<p data-intro='The power of the card.' data-position='right'>Power: " . $card_info['power'] . "</p>\n" ;
          }
          if ($card_info['toughness'] != Null) {
            echo "<p data-intro='The toughness of the card.' data-position='right'>Toughness: " . $card_info['toughness'] . "</p>\n" ;
          }
          echo "</div>" ;
          echo "<!-- Percentages on the Card -->\n<div id='cardPercentages'>\n" ;
          echo "<p style='padding-left:15px;'>Percentage of Decks</p></div>" ;
          echo "</div>" ;
          echo "<div id='bottomBar'>" ;
          echo "<h4 id='buyCardsTitle'>Buy this card at:</h4>" ;
          echo "<div data-intro='You can purchase the card using this link.' data-position='right' id='Buy_Card'>" ;
          echo "<a href='http://store.channelfireball.com/products/search?query=" . $card . "'>" ;
          echo "<img class='Buy_Card' src='images/CFB.png' alt='Logo to Channel Fire Ball'>" ;
          echo "</a>" ;
          echo "</div>" ;
          echo "</div>" ;
        }
        else
        {
          $card_sql_str = str_replace("'", "\\'", $card) ;
          $sql = "SELECT * FROM `mtg_cards` WHERE `name` = '" . $card_sql_str . "';" ;
          if ( ! $result = $db->query( $sql ) ) 
          {
            die( '<p>There was an error running card query [' . $db->error . ']</p>\n' ) ;
          }
          
          $card_info = $result->fetch_assoc() ;
            
          echo "<div id='popularCardsMain'>\n" ; 
          echo "<div data-intro='The most popular card containing Red' data-position='bottom' id='popularCardsRed' class='bottomLeft'>\n" ;
          echo "<p> Red </p>" ;
          echo "<p class='hasMana'> {R} </p>" ;
          echo "<div class='cardImage'>\n<a href='cards.php?search=lightning+bolt'><img src='http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=806&type=card' alt='images/cardback.hq.jpg' height=197 width=140 class='CARD'/></a>\n</div>\n\n" ;
          echo "</div>" ;
          echo "<div data-intro='The most popular card containing Green' data-position='bottom' id='popularCardsGreen' class='topLeft'>\n" ;
          echo "<p> Green </p>" ;
          echo "<p class='hasMana'> {G} </p>" ;
          echo "<div class='cardImage'>\n<a href='cards.php?search=courser+of+kruphix'><img src='http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=378491&type=card' alt='images/cardback.hq.jpg' height=197 width=140 class='CARD'/></a>\n</div>\n\n" ;
          echo "</div>" ;
          echo "<div data-intro='The most popular card containing White' data-position='bottom' id='popularCardsWhite' class='Top'>\n" ; 
          echo "<p> White </p>" ;
          echo "<p class='hasMana'> {W} </p>" ;
          echo "<div class='cardImage'>\n<a href='cards.php?search=siege+rhino'><img src='http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=386666&type=card' alt='images/cardback.hq.jpg' height=197 width=140 class='CARD'/></a>\n</div>\n\n" ;
          echo "</div>" ;
          echo "<div data-intro='The most popular card containing Blue' data-position='bottom' id='popularCardsBlue' class='topRight'>\n" ;
          echo "<p> Blue </p>" ;
          echo "<p class='hasMana'> {U} </p>" ;
          echo "<div class='cardImage'>\n<a href='cards.php?search=brainstorm'><img src='http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=2497&type=card' alt='images/cardback.hq.jpg' height=197 width=140  class='CARD'/></a>\n</div>\n\n" ;
          echo "</div>" ;
          echo "<div data-intro='The most popular card containing Black' data-position='bottom' id='popularCardsBlack' class='bottomRight'>\n" ;
          echo "<p> Black </p>" ;
          echo "<p class='hasMana'> {B} </p>" ;
          echo "<div class='cardImage'>\n<a href='cards.php?search=thoughtseize'><img src='http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=145969&type=card' alt='images/cardback.hq.jpg' height=197 width=140 class='CARD'/></a>\n</div>\n\n" ;
          echo "</div>" ;
          echo "</div>\n" ;
          echo "<div id='bottomBar'>" ; 
          echo "<h1 id='PopularCards'> Popular Cards </h1>" ;
          echo "</div>\n" ;
        }
      ?>
      <script type="text/javascript" src="js/ManaReplace.js"></script>
      <script>
        $card_count = <?php echo json_encode($card_count['sum(count)']); ?>;
        $total_count = <?php echo json_encode($total_count['total']); ?>;
        console.log($card_count);
        $card_name_str = <?php echo json_encode($card_info['name']); ?>;
        $card_name = $('#card_name');
        $card_name.html($card_name_str);
        $d3_card = ($card_count/$total_count)*100;
        var rp2 = radialProgress(document.getElementById('cardPercentages'))
          .diameter(150)
          .value($d3_card)
          .render();

        $(function() {
          $("#info").click( function()
            {
              $('body').chardinJs('start')
            }
          );
        });
      </script>
    </div>
  </body>
</html>
    