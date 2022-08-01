module.exports = {
  notFoundHeader: {
    status: 400,
    message: "Np",
  },
  notFoundToken: {
    status: 403,
    message: "사용자의 토큰이 존재하지 않습니다.",
  },
  unAuthorizedUser: {
    status: 403,
    message: "웹사이트를 이용할 수 없는 사용자입니다.",
  },
  nonExistingPage: {
    status: 404,
    message: "존재하지 않는 페이지입니다.",
  },
};
