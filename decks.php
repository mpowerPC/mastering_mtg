<!DOCTYPE html>
<html> 
  <head>
    <meta charset="UTF-8">
<!--
File: decks.php
91.462 Project: Mastering Magic
Michael Mammosser, Computer Science Major @ UMass Lowell
Contact: michael_mammosser@student.uml.edu
Copyright (c) 2015 by Michael Mammosser.  All rights reserved.
Updated on April 30, 2015.

A simple html/php page that displays Magic the gathering decks.
-->
    <title>Decks</title>

    <!-- JQuery -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <script src="https://code.jquery.com/ui/1.11.4/jquery-ui.min.js"></script>

    <!-- CSS -->
    <link rel="stylesheet" href="css/decks.css" />

    <!-- Chardinjs Instructions -->
    <link href="css/chardinjs.css" rel="stylesheet">
    <script src="js/chardinjs.min.js"></script>

    <!-- Google Fonts -->
    <link href='http://fonts.googleapis.com/css?family=Titillium+Web' rel='stylesheet' type='text/css'>

    <!-- Changes the small icon on the page to the image referenced. --> 
    <link rel="icon" href="images/MTGCard.png">
  </head> 
  <body>
    <header>
      <img class="logo" src="images/logo.jpg" alt="Mastering Magic">
      <ul class='menu'>
        <li><a href="index.html">Home</a></li>
        <li><a href="cards.php">Cards</a></li>
        <li><a href="decks.php?or=0">Decks</a></li>
      </ul>
    </header>

    <div id="content">

      <button id='info'>Instructions</button>

      <div id="search">
        <div id="search_buttons">
          <form data-intro="Deck Search: Click on different mana colors and choose either Exclusive (and) or Contains (or) to find new decks." data-position="left">
            <input type="checkbox" id="black" name="black" value="1">
              <label for="black" id="black_label">Black</label>
            <input type="checkbox" id="blue" name="blue" value="1">
              <label for="blue" id="blue_label">Blue</label>
            <input type="checkbox" id="green" name="green" value="1">
              <label for="green" id="green_label">Green</label>
            <input type="checkbox" id="red" name="red" value="1">
              <label for="red" id="red_label">Red</label> 
            <input type="checkbox" id="white" name="white" value="1">
              <label for="white" id="white_label">White</label>
            <input type="radio" id="exclusive" name = 'or' value = '1' checked="checked">
              <label for='exclusive'>Exclusive</label>
            <input type="radio" id="contains" name = 'or' value = '0'>
              <label for='contains'>Contains</label>
            <input type="submit" value="Submit">
          </form>
        </div> <!-- #search_buttons -->
      </div> <!-- #search -->
      
      <?php
        // Initialize arrays to hold deck info.
        $decks_array = array();
        $formats_array = array();
        $colors_array = array();

        // Database credentials.
        $username = "mmammoss";
        $password = "mm5119";

        // Connection code from:
        // http://php.net/manual/en/mysqli-stmt.bind-param.php
        $mysqli = new mysqli("localhost", $username, $password, $username);

        // Check connection.
        if (mysqli_connect_errno()) {
          printf("Connect failed: %s\n", mysqli_connect_error());
          exit();
        }

        $mana_string = "";

        // Check if a deck name is passed.
        if(isset($_GET['search'])) {
          $sql = "%" . $_GET['search'] . "%";
          $stmt = $mysqli->prepare("SELECT deck, format, colors FROM `mtg_deck_map` WHERE `deck` like ?");
          $stmt->bind_param('s', $sql);
          $stmt->execute();
          $stmt->bind_result($deck, $format, $colors);

          // Fetch results and store them in arrays.
          while($stmt->fetch()) {
            array_push($decks_array, $deck);
            array_push($formats_array, $format);
            array_push($colors_array, $colors);
          }

          // Close statement to prevent issues with following queries.
          $stmt->close();

        // Check if the search is for mana.
        } else if(isset($_GET['or'])) {
          $check = $_GET['or'] ;
          
          // If or is 1 create a manastring and look for decks with 
          // that exact string.
          if ($check == 1) {
            if(isset($_GET['black'])) {
              $manaString .= "black, ";
            }
            if(isset($_GET['blue'])) {
              $manaString .= "blue, ";
            }
            if(isset($_GET['green'])) {
              $manaString .= "green, ";
            }
            if(isset($_GET['red'])) {
              $manaString .= "red, ";
            }
            if(isset($_GET['white'])) {
              $manaString .= "white, ";
            }
            $manaString = substr($manaString, 0, -2);

            // Prepare and execute statement with bind variables.
            $stmt = $mysqli->prepare("SELECT deck, format, colors FROM `mtg_deck_map` WHERE `colors` = ?");
            $stmt->bind_param('s', $manaString);
            $stmt->execute();
            $stmt->bind_result($deck, $format, $colors);

          // Create query for any deck containing selected mana types.
          } else if ($check == 0){
            $sql = "SELECT deck, format, colors FROM `mtg_deck_map` WHERE";
            if(isset($_GET['black'])) {
              $sql .= "`colors` like '%black%' or  ";
            }
            if(isset($_GET['blue'])) {
              $sql .= "`colors` like '%blue%' or  ";
            }
            if(isset($_GET['green'])) {
              $sql .= "`colors` like '%green%' or  ";
            }
            if(isset($_GET['red'])) {
              $sql .= "`colors` like '%red%' or  ";
            }
            if(isset($_GET['white'])) {
              $sql .= "`colors` like '%white%' or  ";
            }
            $sql = substr($sql, 0, -5);
            $stmt = $mysqli->prepare($sql);
            $stmt->execute();
            $stmt->bind_result($deck, $format, $colors);
          } 

          // Fetch results and store them in arrays.
          while($stmt->fetch()) {
            array_push($decks_array, $deck);
            array_push($formats_array, $format);
            array_push($colors_array, $colors);
          }

          // Close statement to prevent issues with following queries.
          $stmt->close();
        }

        // Create a list of decks for the deck select form.
        $deck_list = "";
        $count = 1;
        foreach ($decks_array as &$deck_select) {
          if (strlen($deck_select) > 25) {
            $select_str = strtolower(substr($deck_select, 0, 25));
          }
          $deck_list .= "              <option value='" . $count . "' label='" . $select_str . "'>" . $deck_select . "</option>\n";
          $count += 1;
        }

        // Create the .deck divisions nav bar and header.
        echo "<div class='deck'>\n";
        echo "        <nav id='deck_nav'>\n";
        echo "          <div id='nav_header'>\n";
        echo "            <h3 id='deck_name' data-intro='Deck Title' data-position='left'></h3>\n";
        echo "          </div> <!-- .navbar-header -->\n";
        echo "          <div id='deck_select' data-intro='Deck Dropdown: Contains decks that meet your search criteria.' data-position='right'>\n";
        echo "            <select id='deck_dropdown' class='form-control'>\n";
        echo $deck_list;
        echo "            </select>\n";
        echo "          </div> <!-- #deck_select -->\n";
        echo "        </nav> <!-- #deck_nav -->\n";
        echo "        <div id='deck_info'>\n";

        // Error handling.
        if ($count == 1) {
          echo "<h3 style='padding-left: 50px;'>No decks found.</h3>";
        }
        // For each deck retrieve card names and counts.
        $count = 1;
        foreach ($decks_array as &$deck) {
          // Query deck database for card and counts.
          $sql = "Select * from `mtg_deck` where `deck` = '" . $deck . "';";
          $result = $mysqli->query( $sql );

          // Create a separate division for each deck.
          echo "          <div id='" . $count . "' class='card_list split_list' data-intro='Card List: Click on a card to display more information.' data-position='left'>\n";        
          echo "            <ul>\n";

          // Update the list of cards with names and counts.
          while ($deck_info = $result->fetch_assoc()) {
            echo "              <li style='padding: 5px;'>" . $deck_info['count'] . " - "; 
            echo '<a class="card_link" href="cards.php?search=';
            echo $deck_info['card'] ;
            echo '"';
            echo ">" . $deck_info['card'] . "</a></li>\n";
          }

          // Insert a default card image next to the list of cards.
          echo "            </ul>\n";
          echo "          </div> <!-- #card_list -->\n";
          $count += 1;
        }

        // Close sql connection so that the server does not get overloaded.
        $mysqli->close();
      ?>

          <script>
            /* Retrieve format and color variables from PHP. */ 
            $formats = <?php echo json_encode($formats_array); ?>;
            $colors = <?php echo json_encode($colors_array); ?>;
          </script>

          <div id="card_img" data-intro="Card Image: Hover over a card in the Card List to display the card here." data-position="right">
            <img src='images/mtg_card_hq.jpg' height='310' width='220' alt='MTG Card'>
          </div> <!-- #card_img -->
        </div> <!-- #deck_info -->
        <div id='deck_format' data-intro="Format and Color" data-position="bottom"></div>
      </div> <!-- #deck -->
    </div> <!-- #content -->
    <!-- JavaScript -->
    <script src="js/deck.js"></script>
  </body>
</html>
