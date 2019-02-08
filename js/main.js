// In het inputveld doen we een get element en maken we een event (keyup). 
// Daarna wil ik verkrijgen wat er daadwerkelijk wordt ingevoerd. 
// Ik maak een variabele om wat de input is daar in te verzamelen. naam van de variabele is userName

$("#searchUser").on("keyup", function (event) {
  let name = event.target.value;

  // vervolgens stuur ik een ajax request naar de pokemon Api

  $.ajax({
    url: "https://pokeapi.co/api/v2/pokemon/" + name,

    // Vanaf dit punt krijgen we een promise terug. 
  }).done(function (pokename) {
    console.log(pokename);
    // Vanaf hier wil ik alles op de html pagina krijgen. 
    // Ik voeg bootstrap (panel)om alles mooi te schikken op de html. 
    // Ik voeg hier ook de grid toe alles te schikken.

    $("#profile").html(`
    <div class="panel panel-default">
  <div class="panel-heading">
    <h3 class="panel-title">${pokename.name} (number: ${pokename.id})</h3>
  </div>
  <div class="panel-body">

    <div class = col-md-1>
    <img src = ${pokename.sprites.front_shiny}>
    </div>

  <div>
  <ul class = col-md-2>
  <li>${pokename.moves[0].move.name}</li>
  <li>${pokename.moves[1].move.name}</li>
  <li>${pokename.moves[2].move.name}</li>
  <li>${pokename.moves[3].move.name}</li>
  </ul>
  </div>
</div>
  `);

  });

});