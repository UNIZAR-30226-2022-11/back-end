      const WebSocket =  require('ws')
      const miWebSocket = new WebSocket('ws://127.0.0.1:3000');
      const miNuevoMensaje = document.querySelector('#nuevo-mensaje');
      const misRespuestas = document.querySelector('#respuestas');

      Funciones
      function open () {
          //Abre conexión
          console.log("WebSocket abierto.");
      }

      async function message (evento) {
          //Se recibe un mensaje
          console.log("WebSocket ha recibido un mensaje");
          //Mostrar mensaje en HTML
          const mensajeRecibido = await evento.data.text(); // Arreglo para Node ya que devuelve Blob. Solo con 'evento.data' debería ser suficiente
          misRespuestas.innerHTML = misRespuestas.innerHTML.concat(mensajeRecibido, '<br>');
      }

      function error (evento) {
          // Ha ocurrido un error
          console.error("WebSocket ha observado un error: ", evento);
      }

      function close () {
          // Cierra la conexión
          console.log("WebSocket cerrado.");
      }

      function enviarNuevoMensaje (evento) {
          // Evento tecla Enter
          if(evento.code === 'Enter') {
            miWebSocket.onmessage = function(e){ console.log(e.data); };
            miWebSocket.onopen = () => conn.send(miNuevoMensaje.value);
              // Envia mensaje por WebSockets
              //miWebSocket.send(miNuevoMensaje.value);
              // Borra texto en el input
              miNuevoMensaje.value = '';
          }
      }

      // Eventos de WebSocket
      miWebSocket.addEventListener('open', open);
       miWebSocket.addEventListener('message', message);
      miWebSocket.addEventListener('error', error);
      miWebSocket.addEventListener('close', close);

      //Evento para envia nuevo mensaje
      miNuevoMensaje.addEventListener('keypress', enviarNuevoMensaje);