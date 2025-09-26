import axios from 'axios';

// api 키를 어떻게 받을지 모르겠는데, 일단 params로 넣게 된다면 추가로 params 속성 추가해서 환경변수로 집어넣자
const client = axios.create({
  baseURL: '',
  headers: {},
});

// request 인터셉터
client.interceptors.request.use();

// response 인터셉터
client.interceptors.response.use(
  (response) => response,
  (error) => {
    // 공통적으로 발생하는 에러코드 처리는 axios에서 처리 => 발생 컴포넌트에선 UI 처리만 해주면 됨!
    // 아직 백엔드분들이 에러코드를 어떻게 보내줄진 모르지만 기본적인 에러코드 기준으로 에러핸들링 설정함
    // TODO : alert 대신 토스트 UI 적용해 인터렉티브한 에러 핸들링 처리하기
    // TODO : API 요청 실패시 retry 구현..?(필요할까)
    const status = error.response.status;
    switch (status) {
      case 400:
        // 400 : 잘못된 URL 접근
        alert('URL 입력이 잘못되었습니다.');
        console.error(error);
        break;
      case 429:
        // 429 : 서버 요청 횟수 초과
        alert('서버 요청 횟수를 초과했습니다.');
        console.error(error);
        break;
      case 500:
        // 500 : 서버 오류
        alert('서버에서 오류가 발생했습니다.');
        console.error(error);
        break;
      case 503:
        // 503 : 서버 점검중
        alert('서버 점검중입니다.');
        console.error(error);
        break;
      default:
        console.error('예상치 못한 에러', error);
    }
    // 실패시 에러객체 반환
    return Promise.reject(error);
  },
);

export default client;
