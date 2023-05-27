var express = require("express");
var app = express();
var port = 3000;
var fs = require("fs");
var bodyParser = require("body-parser");
var compression = require("compression");
var fs = require("fs");
const template = require("./public/template.js");
var sanitizeHtml = require("sanitize-html");
var helmet = require("helmet");
var sse = require("express-sse");
const { spawn } = require("child_process");
const iconv = require("iconv-lite");

app.use(helmet());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());

var sseClients = new sse();

// SSE 엔드포인트
app.get("/stream", sseClients.init);

// 메인 페이지
app.get("/", (request, response) => {
  var index = template.index();
  response.send(index);
});

// 코드 실행 결과 페이지
app.post("/create_process", (request, response, next) => {
  // 파이썬 파일을 실행
  var options = {
    mode: "text",
    pythonPath: "",
    pythonOptions: ["-u"],
    scriptPath: `${__dirname}`,
    args: ["value1", "value2", "value3"], // 전달인자(sys.argv[i] 사용하면 받을 수 있음)
  };
  console.log("dirname: " + __dirname);
  // result.txt 내용을 초기화
  fs.writeFile("./result.txt", "", function (err) {
    if (err) throw err;
    console.log("result.txt is created successfully.");
  });

  // exec.py를 외부 프로세스로 실행
  const pythonProcess = spawn("python", ["exec.py"]);

  // result.txt 파일의 내용이 변할 때마다 sseClients에게 데이터를 전송
  fs.watch("./result.txt", (eventType, filename) => {
    fs.readFile("./result.txt", "utf8", function (err, data) {
      if (err) throw err;
      var sanitizedData = sanitizeHtml(data);
      console.log("result.txt 내용: " + sanitizedData);
      sanitizedData = sanitizedData.replace(/(\r\n|\n|\r)/gm, "<br>");
      sseClients.send(sanitizedData);
    });
  });

  // 실행 중인 프로세스에서 에러가 발생한 경우 처리
  pythonProcess.stderr.on("data", function (errData) {
    sseClients.send(errData.toString());
  });

  // 실행 중인 프로세스가 종료되었을 경우 처리
  pythonProcess.on("exit", function (code) {
    console.log("exec.py 프로세스 종료 코드:", code);
  });
});

app.post("/exit_process", (request, response, next) => {
  // exec.py 실행 강제 종료
  var exec = require("child_process").exec;

  var command;
  if (process.platform === "win32") {
    // Windows에서 실행 중인 경우
    command = "taskkill /F /IM python.exe /T";
  } else {
    // macOS 또는 Linux에서 실행 중인 경우
    command = "pkill -f python";
  }
  // voice.mp3가 존재하면 삭제
  if (fs.existsSync("./voice.mp3")) {
    fs.unlinkSync("./voice.mp3");
  }
  // 크롬 자동제어가 존재하면 삭제
  if (fs.existsSync("./chromedriver.exe")) {
    fs.unlinkSync("./chromedriver.exe");
  }

  exec(command, function (err, stdout, stderr) {
    if (err) {
      console.error(err);
    }
    // stdout을 utf8로 인코딩
    stdout = iconv.decode(stdout, "utf8");
    console.log(stdout);
    response.redirect("/");
  });
});

app.use(function (req, res, next) {
  res.status(404).send("Wrong access!");
});

app.use(function (err, req, res, next) {
  console.error(err, stack);
  res.status(500).send("Someting broke!");
});

app.listen(port, () =>
  console.log(`app listening at http://localhost:${port}`)
);
