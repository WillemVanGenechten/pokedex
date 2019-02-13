// In het inputveld doen we een get element en maken we een event (keyup).
// Daarna wil ik verkrijgen wat er daadwerkelijk wordt ingevoerd.
// Ik maak een variabele om wat de input is daar in te verzamelen. naam van de variabele is pokemon

$("#searchUser").on("keyup", function (event) {
  let pokemon = event.target.value;

  // vervolgens stuur ik een ajax request naar de pokemon Api

  $.ajax({
    url: "https://pokeapi.co/api/v2/pokemon/" + pokemon

    // Vanaf dit punt krijgen we een promise terug.
  }).done(function (pokename) {
    // Hier plaats ik een tweede request omdat de info die in nodig heb uit een ander stuk van de api komt.

    $.ajax({
      url: "https://pokeapi.co/api/v2/pokemon-species/" + pokemon
    }).done(function (evolution) {
      // wanneer er geen vorige evolutie is!
      // ik maak een variabele om evolution.evolves path in op te slaan. Belangrijk hier was om de correct path weer tegeven ik ging een stap te ver met .name te vinden terwijl die niet bestond wanneer het null was.
      let prev;

      if (evolution.evolves_from_species === null) {
        prev = pokemon;
      } else {
        prev = evolution.evolves_from_species.name;

      }
      $.ajax({
        url: "https://pokeapi.co/api/v2/pokemon/" + prev
      }).done(function (baby) {
        // Vanaf hier wil ik alles op de html pagina krijgen.
        // Ik voeg bootstrap (panel)om alles mooi te schikken op de html.
        // Ik voeg hier ook de grid toe alles te schikken.

        let evo;

        if (pokename.sprites.front_shiny === baby.sprites.front_shiny) {
          evo = "nf.png"
        } else {
          evo = baby.sprites.front_shiny;
        }
        console.log(evo);

        $("#profile").html(`
    <div class="panel panel-default">
  <div class="panel-heading">
    <h3 class="panel-title">Name: ${pokename.name} (${pokename.id})</h3>
  </div>
  <div class="panel-body">

    <div class = col-md-1>
    <img src = ${pokename.sprites.front_shiny}>
    </div>

  <div>
  <h3 class= panel-header>Moves: </h3><br>
  <ul class = col-md-2>
  <li>${pokename.moves[0].move.name}</li>
  <li>${pokename.moves[1].move.name}</li>
  <li>${pokename.moves[2].move.name}</li>
  <li>${pokename.moves[3].move.name}</li>
  </ul>
  </div>

  <h3 class="page-header">Previous Evolution: <h3>
  <div class = col-md-1>
  <img src = ${evo}>
  </div>

  `);
      });
    });
  });
});