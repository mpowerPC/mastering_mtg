/*
 Some code involving the mana slider is from the following link, though many changes have been made.
 
 http://onehungrymind.com/build-sweet-photo-slider-angularjs-animate/ 
 
 updated by APD on April 12, 2015 at 8:40 PM
 
 Andrew DiBiasio andrew_dibiasio@student.uml.edu
 I am a Computer Science Major at the University of Massachusetts Lowell. 
 I created this file as part of an assignment for my course 91.462 GUI Programming II. 
 This is my Java Script file used with my mana selector file. This file provides anmimation to my mana slider 
 using Greenshock animation libraries as well as uses scripts to fill out my form's checklist.
 
 Created on Feb 5, 2015
 */

// Injecting ngAnimate as a sub-module into the website module. Animations will now be available for the entire module.
angular.module('website', ['ngAnimate'])
  .controller('MainCtrl', function ($scope) {
    // http://archive.wizards.com/Magic/Multiverse/Colors.aspx   http://mtgsalvation.gamepedia.com/Mana?cookieSetup=true
    // An array of image objects that can be bound to in HTML to display the photos as well as navigation. 
    $scope.slides = [
      {
        image: 'images/red.png', description: 'red',
      },
      {
        image: 'images/green.png', description: 'green',
      },
      {
        image: 'images/blue.png', description: 'blue',
      },
      {
        image: 'images/black.png', description: 'black',
      },
      {
        image: 'images/white.png', description: 'white',
      }
    ];

    // Used for tooltip. http://www.alessioatzeni.com/blog/simple-tooltip-with-jquery-only-text/
    $scope.addTooltip = function () {
      // Tooltip only Text
      $('.masterTooltip').hover(function () {
        // Hover over code
        var title = $(this).attr('title');
        $(this).data('tipText', title).removeAttr('title');
        $('<p class="tooltip"></p>')
        .text(title)
        .appendTo('body')
        .fadeIn('slow');
      }, function () {
        // Hover out code
        $(this).attr('title', $(this).data('tipText'));
        $('.tooltip').remove();
      }).mousemove(function (e) {
        var mousex = e.pageX + 20; //Get X coordinates
        var mousey = e.pageY + 10; //Get Y coordinates

        // Sets where the tooltip paragraph is placed.
        $('.tooltip')
        .css({ top: mousey, left: mousex })
      });
    }

    // currentIndex is initialized to 0(first slide).
    $scope.currentIndex = 0;

    // Mutator function that allows us to assign currentIndex a new value.
    $scope.setCurrentSlideIndex = function (index) {
      $scope.currentIndex = index;
    };

    // Tests to see if the input value and currentIndex are equal. Returns a  boolean value.
    $scope.isCurrentSlideIndex = function (index) {
      return $scope.currentIndex === index;
    };

    // dynamically changes the html inside the manaInformation and manaAbilities divs.
    $scope.changeManaInfo = function (color) {
      //console.log("inside change mana info, color given is");
      //console.log(color);
      switch (color) {
        case 'red':
          // Removes any paragraphs or lists already inside #manaInformation or #manaAbilities to make way for new information.
          $("#manaInformation").find("p").remove();
          $("#manaAbilities").find("p").remove();
          $("#manaAbilities").find("ul").remove();
          $("#manaTitle").find("h1").remove();

          $('<h1 style="color:red;">RED</h1>').fadeIn("slow").appendTo("#manaTitle");

          // Appends appropriate information to manaInformation and manaAbilities divs. List elements also contain a title for tool tips.
          $("<p>Red mana flows from rugged mountain ranges, rocky crags, and the fiery heart of volcanoes. Red magic is about fury and passion. When a red mage fights, lightning arcs across the blood-red sky, lava erupts from the earth, and flash fires consume the land. Red mages can channel their wild emotions to raze a city or to harness flames into deadly weapons. Freedom, fire, and impulse are the lifeblood of every red mage.</p>").fadeIn('slow').appendTo("#manaInformation");
          //("<p>Red mana flows from rugged mountain ranges, rocky crags, and the fiery heart of volcanoes. Red magic is about fury and passion. When a red mage fights, lightning arcs across the blood-red sky, lava erupts from the earth, and flash fires consume the land. Red mages can channel their wild emotions to raze a city or to harness flames into deadly weapons. Freedom, fire, and impulse are the lifeblood of every red mage.</p>").fadeIn('slow').appendTo("#manaInformation");("<p>Red mages have no patience for talk or subtlety. They act quickly and recklessly. At their best, red mages are dynamic, passionate, and unbound. At their worst, they are shortsighted, temperamental, and destructive.</p>");
          $("<p>Some of red's mechanics involve card drawing, combat damage, direct damage, firebreathing (+X/+0 effects), land and artifact destruction, mana production, and randomness.</p>").fadeIn('slow').appendTo("#manaAbilities");
          $("<p>Some keywords that belong to red mages are: </p><ul><li><span class='masterTooltip' title='Creatures with the haste ability are able to attack and use abilities that involve the tap symbol on the turn a player gains control of them, instead of waiting until their controller&apos;s next turn.'>Haste</span></li> <li><span class='masterTooltip' title='Creatures with first strike deal damage before other creatures in combat. Therefore, if a creature with first strike deals sufficient damage to kill an opposing creature without this ability, it will not suffer any combat damage from that creature in return.'>First strike</span></li> <li><span class='masterTooltip' title='A creature with double strike deals both first strike and normal combat damage.'>Double Strike</span></li> <li><span class='masterTooltip' title='Creatures with flying can&apos;t be blocked except by other creatures with flying and/or reach.'>Flying</span></li> <li><span class='masterTooltip' title='Creatures with trample may deal excess damage to the defending player if they are blocked.'>Trample</span></li></ul>").fadeIn('slow').appendTo("#manaAbilities");

          // Finds all new spans with class masterTooltip runs the script to add the tool tip's style. Must be called each time new spans are created.
          $scope.addTooltip();
          break;
        case 'green':
          // Removes any paragraphs or lists already inside #manaInformation or #manaAbilities to make way for new information.
          $("#manaInformation").find("p").remove();
          $("#manaAbilities").find("p").remove();
          $("#manaAbilities").find("ul").remove();
          $("#manaTitle").find("h1").remove();

          $('<h1 style="color:green;">GREEN</h1>').fadeIn("slow").appendTo("#manaTitle");

          // Appends appropriate information to manaInformation and manaAbilities divs. List elements also contain a title for tool tips.
          $("<p>The teeming forests overflow with green mana, the pulse of nature. Green magic is about growth, life, and brute force. When a green mage fights, massive creatures crash through the undergrowth, animals enlarge to gargantuan size, and wounds close before blood spills onto the ground. They understand that the world obeys the law of the jungle—everything is either predator or prey. Strength, ferocity, and life: These are the values that sustain the green mage.</p>").fadeIn('slow').appendTo("#manaInformation");
          //$("#manaInformation").append("<p>The teeming forests overflow with green mana, the pulse of nature. Green magic is about growth, life, and brute force. When a green mage fights, massive creatures crash through the undergrowth, animals enlarge to gargantuan size, and wounds close before blood spills onto the ground. They understand that the world obeys the law of the jungle—everything is either predator or prey. Strength, ferocity, and life: These are the values that sustain the green mage.</p>").fadeIn('slow');
          //.fadeIn('slow').appendTo("#manaInformation");("<p> Green mages do what they can to accelerate and protect nature: jungles expand, artifacts crumble, and creatures regenerate themselves. For green mages, even the plants become lethal weapons. At their best, green mages are instinctual and adaptive. At their worst, they are savage, unthinking, and predatory.</p>");
          $("<p>Some of green's mechanics involve anti-flying, artifact and enchantment destruction, card drawing, creature tokens, land destruction, life gain, and mana production.</p>").fadeIn('slow').appendTo("#manaAbilities");
          $("<p>Some keywords that belong to green mages are: </p><ul><li><span class='masterTooltip' title='If a creature with deathtouch deals any nonzero amount of damage to another creature, the creature dealt damage is killed.'>Deathtouch</span></li> <li><span class='masterTooltip' title='Artifacts, creatures or enchantments with flash may be played any time their controller could play an instant.'>Flash</span></li> <li><span class='masterTooltip' title='Creatures with trample may deal excess damage to the defending player if they are blocked.'>Trample</span></li> <li><span class='masterTooltip' title='Reach is an ability which allows a creature to block creatures with flying.'>Reach</span></li> <li><span class='masterTooltip' title='Regenerate describes a replacement effect for destruction. When the ability is activated, a regeneration shield is set up on the permanent. The next time that permanent would be destroyed, instead all damage is removed from it, it is removed from combat, it is tapped, and the regeneration shield is removed from it.'>Regenerate</span></li> <li><span class='masterTooltip' title='A player or permanent with hexproof cannot be the target of an opponent&apos;s spells or abilities.'>Shroud/Hexproof</span></li></ul>").fadeIn('slow').appendTo("#manaAbilities");

          // Finds all new spans with class masterTooltip runs the script to add the tool tip's style. Must be called each time new spans are created.
          $scope.addTooltip();
          break;
        case 'blue':
          // Removes any paragraphs or lists already inside #manaInformation or #manaAbilities to make way for new information.
          $("#manaInformation").find("p").remove();
          $("#manaAbilities").find("p").remove();
          $("#manaAbilities").find("ul").remove();
          $("#manaTitle").find("h1").remove();

          $('<h1 style="color:blue;">BLUE</h1>').fadeIn("slow").appendTo("#manaTitle");

          // Appends appropriate information to manaInformation and manaAbilities divs. List elements also contain a title for tool tips.
          $("<p>Islands provide blue mana—the magic of the deep sea and the endless sky. Blue magic is about deceit, logic, and illusion. To a blue mage, information and knowledge are paramount. Blue mages want to know everything, and they'll go to any lengths to do so. When a blue mage fights, tidal waves crash against rocky cliffs, the wind whips out of stormy skies, and an enemy's spells fail as their creatures vanish into thin air. Knowledge, manipulation, wind, and wave: These are the blue mage's tools.  Blue magic is reactive, calculated, and methodical.</p>").fadeIn('slow').appendTo("#manaInformation");
          //.fadeIn('slow').appendTo("#manaInformation");("<p> Its strength lies in patience and intelligence. Blue mages work behind the scenes, scheming and stealing secrets. They control their environments completely before making a move. Blue spells and abilities focus on prediction and illusion. Blue is also the color of technology and artifice. At their best, blue mages are inventive and progressive. At their worst, they are manipulative and treacherous.</p>");
          $("<p>Some of blue's mechanics primarily involve manipulating time and information. The central mechanics that define the color are: card drawing, counterspells, change-of-control effects, mimicry, deck milling, and power reduction, tapping and untapping permanents, and returning permanents to owner's hand.</p>").fadeIn('slow').appendTo("#manaAbilities");
          $("<p>Some keywords that belong to blue mages are:</p><ul><li><span class='masterTooltip' title='Artifacts, creatures or enchantments with flash may be played any time their controller could play an instant.'>Flash</span></li> <li><span class='masterTooltip' title='Creatures with flying can&apos;t be blocked except by other creatures with flying and/or reach.'>Flying</span></li> <li><span class='masterTooltip' title='A player or permanent with hexproof cannot be the target of opponent&apos;s spells or abilities.'>Shroud/Hexproof</span></li></ul>").fadeIn('slow').appendTo("#manaAbilities");

          // Finds all new spans with class masterTooltip runs the script to add the tool tip's style. Must be called each time new spans are created.
          $scope.addTooltip();
          break;
        case 'black':
          // Removes any paragraphs or lists already inside #manaInformation or #manaAbilities to make way for new information.
          $("#manaInformation").find("p").remove();
          $("#manaAbilities").find("p").remove();
          $("#manaAbilities").find("ul").remove();
          $("manaTitle").find("<h1>").remove();
          $("#manaTitle").find("h1").remove();

          $('<h1 style="color:gray;">BLACK</h1>').fadeIn("slow").appendTo("#manaTitle");

          // Appends appropriate information to manaInformation and manaAbilities divs. List elements also contain a title for tool tips.
          $("<p>Black mana comes from dank swamps, where things fester and rot. Shadowy wastelands, haunted catacombs, and fetid bogs are all prime sources of black mana. Black is the color of death, fear, and amorality—these are the twisted values of the darkness. Black magic is powerful, easy to wield, and offers a host of gruesome spells, but it comes with a high price. It can warp the mind, poison the land, and kill creatures instantly. At their best, black mages are ambitious and unashamed. At their worst, they are enslaving and devouring.</p>").fadeIn('slow').appendTo("#manaInformation");
          //.fadeIn('slow').appendTo("#manaInformation");("<p>Black mages are self-centered and self-serving. They will do anything to get power—no matter what the cost. Death, ambition, and darkness are the stock and trade of black mages. Black mana  Black magic can unearth the dead from their graves and make them walk again. It can spread a pestilence across the landscape and drain the life from all who live there. Black spells can curse victims in horrible and enduring ways.  But the price is high and the risks are many.</p>");
          $("<p>Some of black's mechanics involve discarding, life loss, creature destruction, weakness (-X/-X effects), and counter removal.</p>").fadeIn('slow').appendTo("#manaAbilities");
          $("<p>Some keywords that belong to black mages are:</p><ul><li><span class='masterTooltip' title='Creatures with first strike deal damage before other creatures in combat. Therefore, if a creature with first strike deals sufficient damage to kill an opposing creature without this ability, it will not suffer any combat damage from that creature in return.'>First strike</span></li> <li><span class='masterTooltip' title='Regenerate describes a replacement effect for destruction. When the ability is activated, the next time that permanent would be destroyed, all damage is instead removed from it and it is tapped and removed from combat.'>Regenerate</span></li> <li><span class='masterTooltip' title='Permanents with lifelink cause their controller to gain life whenever they deal damage.'>Lifelink</span></li> <li><span class='masterTooltip' title='If a creature with deathtouch deals any nonzero amount of damage to another creature, the creature dealt damage is killed.'>Deathtouch</span></li> <li><span class='masterTooltip' title='A creature with intimidate can only be blocked by creatures that share a color with it.'>Intimidate</span></li><li><span class='masterTooltip' title='Creatures with flying can&apos;t be blocked except by other creatures with flying and/or reach.'>Flying</span></li></ul>").fadeIn('slow').appendTo("#manaAbilities");

          // Finds all new spans with class masterTooltip runs the script to add the tool tip's style. Must be called each time new spans are created.
          $scope.addTooltip();
          break;
        case 'white':
          // Removes any paragraphs or lists already inside #manaInformation or #manaAbilities to make way for new information.
          $("#manaInformation").find("p").remove();
          $("#manaAbilities").find("p").remove();
          $("#manaAbilities").find("ul").remove();
          $("#manaTitle").find("h1").remove();

          $('<h1 style="color:white;">WHITE</h1>').fadeIn("slow").appendTo("#manaTitle");

          // Appends appropriate information to manaInformation and manaAbilities divs. List elements also contain a title for tool tips.
          $("<p>White mana comes from sprawling plains, sunlit savannahs, and windswept meadows. In Magic, white is the color of law, order, and structure. White magic heals and protects and is often a force for justice and honor. When a white mage fights, legions of troops thunder across the battlefield with their banners held high. Enemy hordes are routed outside the gates of a castle. When white unleashes its wrath, the battlefield is cleansed of all life. Order, protection, light, law: These are white magic's values.</p>").fadeIn('slow').appendTo("#manaInformation");
          //("<p>White mages achieve balance through strategy and organization. At their best, white mages are self-sacrificing and moral. At their worst, they are uncreative and even authoritarian.</p>").fadeIn('slow').appendTo("#manaInformation");
          $("<p>White's mechanics primarily involve damage prevention, vigilance and untapping permanents, protection, enchantments, toughness boosts, creature tokens, exiling, and board wipes.</p>").fadeIn('slow').appendTo("#manaAbilities");
          $("<p>Some keywords that belong with the color white are:</p><ul><li><span class='masterTooltip' title='Creatures with vigilance do not tap to attack.'>Vigilance</span></li> <li><span class='masterTooltip' title='Permanents with lifelink cause their controller to gain life whenever they deal damage.'>Lifelink</span></li> <li><span class='masterTooltip' title='Creatures with flying can&apos;t be blocked except by other creatures with flying and/or reach.'>Flying</span></li> <li><span class='masterTooltip' title='When any creature a player controls attacks alone, it receives +1/+1 until end of turn for each permanent with the exalted keyword that player controls.'>Exalted</span></li> <li><span class='masterTooltip' title='A creature with protection from a quality cannot be enchanted, equipped, blocked, or targeted by anything with that quality. All damage that would be dealt by a source of that quality is prevented.'>Protection</span></li></ul>").fadeIn('slow').appendTo("#manaAbilities");

          // Finds all new spans with class masterTooltip runs the script to add the tool tip's style. Must be called each time new spans are created.
          $scope.addTooltip();
          break;
        default:

          $('<h1 style="color:red;">RED</h1>').fadeIn("slow").appendTo("#manaTitle");

          // Appends appropriate information to manaInformation and manaAbilities divs. List elements also contain a title for tool tips.
          $("<p>Red mana flows from rugged mountain ranges, rocky crags, and the fiery heart of volcanoes. Red magic is about fury and passion. When a red mage fights, lightning arcs across the blood-red sky, lava erupts from the earth, and flash fires consume the land. Red mages can channel their wild emotions to raze a city or to harness flames into deadly weapons. Freedom, fire, and impulse are the lifeblood of every red mage.</p>").fadeIn('slow').appendTo("#manaInformation");
          //("<p>Red mana flows from rugged mountain ranges, rocky crags, and the fiery heart of volcanoes. Red magic is about fury and passion. When a red mage fights, lightning arcs across the blood-red sky, lava erupts from the earth, and flash fires consume the land. Red mages can channel their wild emotions to raze a city or to harness flames into deadly weapons. Freedom, fire, and impulse are the lifeblood of every red mage.</p>").fadeIn('slow').appendTo("#manaInformation");("<p>Red mages have no patience for talk or subtlety. They act quickly and recklessly. At their best, red mages are dynamic, passionate, and unbound. At their worst, they are shortsighted, temperamental, and destructive.</p>");
          $("<p>Some of red's mechanics involve card drawing, combat damage, direct damage, firebreathing (+X/+0 effects), land and artifact destruction, mana production, and randomness.</p>").fadeIn('slow').appendTo("#manaAbilities");
          $("<p>Some keywords that belong to red mages are: </p><ul><li><span class='masterTooltip' title='Creatures with the haste ability are able to attack and use abilities that involve the tap symbol on the turn a player gains control of them, instead of waiting until their controller&apos;s next turn.'>Haste</span></li> <li><span class='masterTooltip' title='Creatures with first strike deal damage before other creatures in combat. Therefore, if a creature with first strike deals sufficient damage to kill an opposing creature without this ability, it will not suffer any combat damage from that creature in return.'>First strike</span></li> <li><span class='masterTooltip' title='A creature with double strike deals both first strike and normal combat damage.'>Double Strike</span></li> <li><span class='masterTooltip' title='Creatures with flying can&apos;t be blocked except by other creatures with flying and/or reach.'>Flying</span></li> <li><span class='masterTooltip' title='Creatures with trample may deal excess damage to the defending player if they are blocked.'>Trample</span></li></ul>").fadeIn('slow').appendTo("#manaAbilities");

          // Finds all new spans with class masterTooltip runs the script to add the tool tip's style. Must be called each time new spans are created.
          $scope.addTooltip();
      }
    };

    //Calling changeManaInfo for first time to fill in empty divs with red mana information.
    $scope.changeManaInfo();

    //Increments currentIndex
    $scope.prevSlide = function () {
      $('#sliderContainer').focus();
      $scope.shadowColor = "box-shadow: 0 0 15px "
      //console.log("prevSlide");
      $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;

      // Changes shadow color of slider
      $scope.shadowColor += $scope.slides[$scope.currentIndex].description + ';"';
      document.getElementById("slider").setAttribute("style", $scope.shadowColor);

      // Calling this function dynamically changes the html inside the manaInformation and manaAbilities divs. 
      $scope.changeManaInfo($scope.slides[$scope.currentIndex].description);
    }

    // Decrements currentIndex
    $scope.nextSlide = function () {
      $('#sliderContainer').focus();
      $scope.shadowColor = "box-shadow: 0 0 15px "
      //console.log("prevSlide");

      $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;

      // Changes shadow color of slider
      $scope.shadowColor += $scope.slides[$scope.currentIndex].description + ';"';
      document.getElementById("slider").setAttribute("style", $scope.shadowColor);

      // Calling this function dynamically changes the html inside the manaInformation and manaAbilities divs. 
      $scope.changeManaInfo($scope.slides[$scope.currentIndex].description);
    };

    // buttonClick is envoked when a user clicks on the button #manaButton. It checks the corresponding check box for that color.
    $scope.buttonClick = function () {
      //console.log("buttonClick fired: Current slide: discription:");
      //console.log($scope.slides[$scope.currentIndex].description);
      if (document.getElementById($scope.slides[$scope.currentIndex].description).checked === true) {
        document.getElementById($scope.slides[$scope.currentIndex].description).checked = false;
        $scope.manaButtonClick($scope.slides[$scope.currentIndex].description);
      }
      else {
        document.getElementById($scope.slides[$scope.currentIndex].description).checked = true;
        $scope.manaButtonClick($scope.slides[$scope.currentIndex].description);
      }
    };

    $scope.active = false;

    // manaButtonClick is envoked when a user clicks the transparent button over the mana images or when checklist button is clicked.
    $scope.manaButtonClick = function (color) {
      $manaString = '';
      $manaString = $manaString + color + "Button";

      //console.log($manaString);

      if (document.getElementById($manaString).getAttribute("active") === "true") {

        // change background of checklist button to default background
        document.getElementById($manaString).style.background = "hsla(206, 30%, 10%, 1)";

        // console.log(document.getElementById("redButton").hasAttribute("active"));
        document.getElementById($manaString).setAttribute("active", "false");
        document.getElementById(color).checked = false;
      }
      else {
        //console.log("entered else");

        // changes background of checklist button to correct color.
        document.getElementById($manaString).style.background = color;

        //document.getElementById("redButton").setAttribute("class", "active");
        document.getElementById($manaString).setAttribute("active", "true");
        document.getElementById(color).checked = true;
      }
    };

    // Using these if statments to see if any mana buttons are still checked and need to be checked.
    if (document.getElementById('red').checked) {
      $scope.manaButtonClick('red');
    }

    if (document.getElementById('green').checked) {
      $scope.manaButtonClick('green');
    }

    if (document.getElementById('blue').checked) {
      $scope.manaButtonClick('blue');
    }

    if (document.getElementById('black').checked) {
      $scope.manaButtonClick('black');
    }

    if (document.getElementById('white').checked) {
      $scope.manaButtonClick('white');
    }
  })

  // Adds animation to slides.
  .animation('.slide-animation', function () {
    return {
      //this handler is called when ng-hide is called 
      addClass: function (element, className, done) {
        if (className == 'ng-hide') {

          // Animate for half a second. The element is moved to left the entire width of its parent element so that it is no longer visible. 
          TweenMax.to(element, 0.5, { left: -element.parent().width(), onComplete: done });
        }
        else {
          done();
        }
      },
      removeClass: function (element, className, done) {
        // this handler is called when ng-hide is called 
        if (className == 'ng-hide') {

          // This animation is defining how we want the slide to appear when we remove the ng-hide class from an element.
          element.removeClass('ng-hide');

          // Sets the element immediately to the right of the slider by setting the left property to the width of the element�s parent. 
          TweenMax.set(element, { left: element.parent().width() });

          //Animate on the left property to 0 so that the image slides in from right to left.
          TweenMax.to(element, 0.5, { left: 0, onComplete: done });
        }
        else {
          done();
        }
      }
    };
  });