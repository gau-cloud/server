module.exports = {


    CREATE_USER_SUCCESS:"유저 생성 성공",
    CREATE_POST_SUCCESS:"게시글 생성 성공",
    GET_POST_SUCCESS:"게시글 가져오기 성공",
    DELETE_POST_SUCCESS:"게시글 삭제 성공",
    AUTH_FAIL:"이 회원이 쓴 글이 아닙니다",
    UPDATE_POST_SUCCESS:"게시글 업데이트 성공",
    POST_NOT_EXIST:"존재하지 않는 포스트 입니다",
    CREATE_POST_LIKES_SUCCESS:"게시글 좋아요 생성 성공",
    POST_DUPLICATED_LIKE:"이 유저는 이 게시글에 이미 좋아요를 눌렀습니다",
    POST_LIKE_NOT_EXIST:"이 유저는 이 게시글에 좋아요를 누르지 않았습니다",
    DELETE_POST_LIKE_SUCCESS:"좋아요 해제 성공",
    NULL_VALUE:"필요한 값이 없습니다",
    CREATE_POST_COMMENT_SUCCESS:"게시글 댓글 생성 성공",
    UPDATE_POST_COMMENT_SUCCESS:"게시글 댓글 수정 성공",
    DELETE_POST_COMMENT_SUCCESS:"게시글 댓글 삭제 성공",
    POST_COMMENTS_DUPLICATED_LIKE:"이 유저는 이 댓글에 이미 좋아요를 눌렀습니다",
    POST_COMMENTS_LIKE_NOT_EXSIT:"이 유저는 이 댓글에 좋아요를 누르지 않았습니다",
    CREATE_POST_COMMENT_LIKE_SUCCESS:"게시글 댓글 좋아요 성공",
    DELETE_POST_COMMENT_LIKE_SUCCESS:"게시글 댓글 해제 성공",
    GET_USER_POST_SUCCESS:"유저가 작성한 게시글 조회 성공",
    GET_USER_LIKE_POST_SUCCESS:"유저가 좋아요 한 게시글 조회 성공",
    GET_POST_COMMENTS_SUCCESS:"댓글 가져오기 성공",
    REQUIRE_AUTH:"인증 필요",
    DONE_AUTH:"인증 됨",
    CREATE_NOTICE_SUCCESS:"공지글 생성 성공",
    GET_NOTICE_SUCCESS:"공지글 가져오기 성공",
    DELETE_NOTICE_SUCCESS:"공지글 삭제 성공",








    // 유저 ( Auth )
    AUTH_UPDATE_PW_SUCCESS:"패스워드 업데이트 성공",
    AUTH_EMAIL_SUCCESS:'이메일 보내기 성공',
    AUTH_EMAIL_FAIL:'이메일 보내기 실패',
    AUTH_CREATED_USER: '회원 가입 성공',
    AUTH_SIGNUP_EMAIL_AND_PASSWORD_SUCCESS:"이메일 패스워드 등록 성공",
    AUTH_GET_ALL_NICK_NAME_SUCCESS:'모든 유저 닉네임 가져오기 성공',
    AUTH_SIGNUP_PERSONAL_INFO_SUCCESS:'개인정보 등록 성공',
    AUTH_SIGNUP_PROFILE_INFO_SUCCESS:'프로필 등록 성공',
    AUTH_SIGNUP_ASSIGN_SUCCESS:'회원 승인 성공',
    AUTH_USER_IDX_NULL:"유저 인덱스가 올바르지 않습니다",
    AUTH_USER_EMAIL_NULL:"유저 이메일값이 올바르지 않습니다",
    AUTH_USER_DB_EMAIL_NULL:"등록된 유저 이메일이 없습니다",
    AUTH_DUPLICATED_NICKNAME:'닉네임이 중복됐습니다',
    AUTH_DUPLICATED_EMAIL:'이메일이 중복됐습니다',
    AUTH_UPDATE_PROFILE_SUCCESS:'유저 프로필 업데이트 성공',
    AUTH_UPDATE_PERSONAL_INFO_SUCCESS:'개인정보 업데이트 성공',
    AUTH_UPLOAD_PROFILE_IMG_SUCCESS:'프로필 이미지 등록 성공',
    AUTH_TYPE_ERROR:'이미지 타입 에러',
    AUTH_CHECK_NICKNAME_SUCCESS:"닉네임이 중복되지 않았습니다",
    AUTH_CHECK_NICKNAME_FAIL:"닉네임이 중복됐습니다",
    AUTH_GET_USER_SUCCESS: '유저 조회 성공',
    AUTH_GET_USER_POST_SUCCESS:'유저가 쓴 게시글 가져오기 성공',
    AUTH_NOT_EXIST:"존재하지 않는 계정입니다",
    
    DELETE_USER: '회원 탈퇴 성공',
    ALREADY_ID: '이미 사용중인 아이디입니다.',
    AUTH_DUPLICATED_EMAIL: '이메일이 중복됐습니다',

    POST_SUCCESS: '게시글 조회 성공',
    SALT_PASSWORD_SUCCESS: '비밀번호 및 SALT값 넣기 성공',

    //아이템
    ITEM_NULL_USER_IDX:"유저 인덱스가 올바르지 않습니다",
    ITEM_NULL_VALUE:"필요한 값이 없습니다",
    ITEM_UPDATE_MEMO_COUNT_SUCCESS: '재고 메모 업데이트 성공',
    ITEM_GET_ITEM_INFO_SUCCESS: '아이템 정보 가져오기 성공',
    ITEM_PUSH_FLAG_SUCCESS: 'flag 업데이트 성공',
    DUMMY:'재고창고 화이팅',

    // 로그인
    LOGIN_SUCCESS: '로그인 성공',
    LOGIN_FAIL: '로그인 실패',
    NO_USER: '존재하지 않는 회원입니다.',
    MISS_MATCH_PW: '비밀번호가 맞지 않습니다.',

    // 인증
    EMPTY_TOKEN: '토큰 값이 없습니다.',
    EXPIRED_TOKEN: '토큰 값이 만료되었습니다.',
    INVALID_TOKEN: '유효하지 않은 토큰값입니다.',
    AUTH_SUCCESS: '인증에 성공했습니다.',
    ISSUE_SUCCESS: '새로운 토큰이 생성되었습니다.',
    DELETE_SUCCESS: '유저 삭제 성공',
    DB_ERROR: 'DB 오류',

    //실패
    EXCHANGE_POST_NULL : "해당 게시글이 없습니다.",
};