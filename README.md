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

<p> 시각장애인들은 인터넷 쇼핑 시 상품의 정보를 얻기 위해 텍스트를 읽어주는 프로그램을 사용하여
도움을 받는다. 하지만 상품의 상세 설명이 이미지로 대체되는 경향에 의해 이는 효력이 사라지고 있다. 따라서
이미지로 대체된 상품의 정보까지 제공해주는 서비스의 필요성을 느껴 이를 구현하였다. 본 프로젝트는 최종적으로 시각 장애인들에게 온라인 쇼핑의 어려움을 해소하는 음성 챗봇을 구현한다. </p>

<br>

### 구현 내용

![FLOW CHART](https://github.com/wlsdk9803/2023-graduation-project/assets/103057334/e3871ad4-cdb7-4ff1-b0f9-a27eeb8429ac)

'Start' 버튼을 누르면 exec.py가 실행된다. 먼저 Chrome 브라우저의 자동제어를 통해 쿠팡 메인 페이지로 이동한다. 이후 STT(Speech-To-Text), TTS(Text-To-Speech)와 자동제어를 이용하여 상품 상세 페이지로 이동한다. 상품 상세 페이지에서는 필요한 텍스트 정보만 크롤링하고, 상세정보에 있는 이미지 파일을 저장한다. 이미지 파일은 OCR 처리를 하여 사진 속 텍스트를 추출한다. 최종적으로 크롤링한 텍스트와 OCR 처리를 한 텍스트를 ChatGPT에 넣어 사용자와 대화가 가능하도록 한다. 이때 ChatGPT는 STT, TTS와 결합하여 음성 챗봇으로 구현한다. 'Exit' 버튼을 누르면 exec.py가 종료되고 초기 화면으로 돌아간다.
최종적으로 이를 웹 사이트로 구현하는 과정에서는 Node.js의 Express를 이용하였다. 또한 SSE(Server-Sent Events)를 이용하여 사용자와 프로그램 간의 대화 내용을 실시간으로 출력하였다.

<br><br>

(1) Web Crawling
<br>
Selenium 라이브러리의 Web Driver를 사용하여 구현한다. 크롤링을 하기 전, ‘더 보기’ 버튼을 누르고 스크롤을 가장 아래까지 내리는 등 크롤링 하기 위한 준비를 한다. 이후 크롤링을 할 때에는 HTML의 태그를 이용하여 필요한 정보만 크롤링한다. 텍스트를 추출하고 이미지 파일은 이후 OCR 처리를 위하여 따로 저장한다.
<br><br>

(2) OCR
<br>
크롤링을 통해 얻은 상품 이미지 내에 존재하는 문자를 텍스트로 추출하기 위해 사용한다. 다양한 문서 형식에 적용할 수 있으며 다양한 언어를 지원하는 CLOVA OCR을 응용하여 개발하였다.
<br>
이때 CLOVA OCR의 권장 해상도에 대한 제약을 해결하고자 이미지의 장축 길이가 1960px을 초과할 시 1960px 단위로 크롭하여 이미지를 다시 저장하도록 하였다. 이렇게 저장된 이미지에 OCR을 적용하도록 하여 더욱 정확한 상품 정보를 얻을 수 있도록 하였다.
<br><br>

(3) ChatGPT와 STT, TTS를 활용한 인공지능 음성 챗봇 구현
<br>
OpenAI에서 개발한 ChatGPT와 Google TTS API와 Google STT API를 결합한다. 시각 장애인의 말(음성)을 텍스트로 변환하기 위해 Google TTS API를 이용해 ChatGPT에 넣어주고, 알맞은 응답이 나오면 Google STT API를 이용해 해당 응답 텍스트를 다시 음성으로 들려주도록 하였다.
<br>
