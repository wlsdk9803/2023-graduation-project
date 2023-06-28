## OCR 기술과 ChatGPT 를 활용한 시각장애인 대상 인터넷 쇼핑 음성 챗봇 서비스 

<br>

#### 프로젝트 설치 및 실행 방법

1. 소스코드 zip파일 다운로드 및 압축 풀기
2. CMD창에서 압축 해제한 프로젝트 디렉토리로 이동
3. CMD창에서 'npm install' 명령어 입력
4. exec.py에서 533번째 줄의 CLOVA OCR APIGW Invoke URL, 556번째 줄의 CLOVA OCR Secret Key, 610번째 줄의 openAI API key 추가
5. CMD창에서 'npm run start' 명령어 입력
6. 웹브라우저에서 'http://localhost:3000' 으로 이동

<br>

- 실행 영상

(1) 상품 한 개


https://github.com/wlsdk9803/2023-graduation-project/assets/103057334/211f924d-b0bd-42c3-bc06-64d7c5a1be8d

<br>

(2) 두 상품 비교



https://github.com/wlsdk9803/2023-graduation-project/assets/103057334/084d6fe0-5106-4ff8-8d72-81bffc470f5e

<br>

### 프로젝트 동기 및 목표

<p> 음성 챗봇을 통해 시각 장애인들에게 온라인 쇼핑의 어려움을 해소하는 서비스를 구현한다. </p>

<br>

### 구현 내용

![FLOW CHART](https://github.com/wlsdk9803/2023-graduation-project/assets/103057334/e3871ad4-cdb7-4ff1-b0f9-a27eeb8429ac)

'Start' 버튼을 누르면 exec.py가 실행된다. 먼저 Chrome 브라우저의 자동제어를 통해 쿠팡 메인 페이지로 이동한다. 이후 STT(Speech-To-Text), TTS(Text-To-Speech)와 자동제어를 이용하여 상품 상세 페이지로 이동한다. 상품 상세 페이지에서는 필요한 텍스트 정보만 크롤링하고, 상세정보에 있는 이미지 파일을 저장한다. 이미지 파일은 OCR 처리를 하여 사진 속 텍스트를 추출한다. 최종적으로 크롤링한 텍스트와 OCR 처리를 한 텍스트를 ChatGPT에 넣어 사용자와 대화가 가능하도록 한다. 이때 ChatGPT는 STT, TTS와 결합하여 음성 챗봇으로 구현한다. 'Exit' 버튼을 누르면 exec.py가 종료되고 초기 화면으로 돌아간다.
최종적으로 이를 웹 사이트로 구현하는 과정에서는 Node.js의 Express를 이용하였다. 또한 SSE(Server-Sent Events)를 이용하여 사용자와 프로그램 간의 대화 내용을 실시간으로 출력하였다.

<br>
