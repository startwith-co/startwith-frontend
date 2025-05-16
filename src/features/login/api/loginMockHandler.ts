import { http, HttpResponse } from 'msw';

const loginMockHandlers = [
  http.post('/consumer/login', async () => {
    return HttpResponse.json({
      status: 200,
      message: 'SUCCESS',
      data: {
        consumerSeq: 123456,
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
        refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ8',
      },
    });
  }),

  http.post('/test', async () => {
    return HttpResponse.json({
      status: 200,
      message: 'SUCCESS',
    });
  }),
];

export default loginMockHandlers;
