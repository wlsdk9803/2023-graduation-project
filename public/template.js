module.exports = {
  index: function () {
    return `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Eyescape</title>
            <link rel="stylesheet" href="./style.css" />
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
            />
            <meta charset="utf-8">
          </head>
          
          <body>
            <div style="display: flex; flex-direction: column; height: 83vh">
              <div style="padding: 10px; font-weight: bold; cursor: default">
                <span style="padding-left: 50px">Eyescape</span>
                <span
                  class="material-symbols-outlined"
                  style="float: right; padding-right: 50px"
                >
                  menu
                </span>
              </div>
              <div style="display: flex; align-items: center; justify-content: center">
                <img src="shopping.png" />
                <div>
                  <div style="color: #4c50bb; font-size: 64px; font-weight: bold;">
                    Eyescape
                  </div>
                  <div style="padding-top: 20px">
                    시각적인 세계로 탈출할 수 있는 경험을 <br />시각 장애인들에게 제공합니다.
                  </div>
                </div>
              </div>
        
              <div id="container">
                <div style="color: #4c50bb; margin: 10px 10px 0 10px; font-weight: bold; line-height: 2;">
                  [Eyescape]환영합니다.
                </div>
                <div id="sseView"></div>
              </div>
            </div>
        
            <div style="cursor: default; display: flex; justify-content: center">
              <form action="/create_process" method="post">
                <button type="submit">Start</button>
              </form>
              <form action="/exit_process" method="post">
                <button>Exit</button>
              </form>
            </div>
        
            <script>
              document.addEventListener('DOMContentLoaded', function() {
                var sseView = document.getElementById('sseView');
                var sse = new EventSource('/stream'); // SSE 엔드포인트로 연결
                sse.onmessage = function(event) {
                  var text = event.data.replace(/["]+/g, ''); // " 제거
                  console.log(text);
                  sseView.innerHTML = text;
                  var container = document.getElementById('container');
                  container.scrollTop = container.scrollHeight;
                };
              });
            </script>

          </body>
        </html>    
      `;
  },
};
