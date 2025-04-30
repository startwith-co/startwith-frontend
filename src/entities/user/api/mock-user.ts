import { http, HttpResponse } from 'msw';

const initialUserInfo = {
  studentId: '200211234',
  department: '컴퓨터공학과',
  name: '세종',
  grade: '4학년',
  email: 'sejong123@sejong.ac.kr',
};

const userInfo = { ...initialUserInfo };

const userHandlers = [
  // 유저 정보 가져오기기
  http.get(`/af/user`, () => {
    return HttpResponse.json({
      data: {
        user: userInfo,
      },
    });
  }),
];

export default userHandlers;
