import { http, HttpResponse } from "msw";
import { generateRoomList } from "./faker";

export const handlers = [
  // credentials
  http.post("/auth/token", () => {
    console.log("로그인 -> access token 생성");
    return HttpResponse.json(
      {
        accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
        refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
        expTime: 3600,
        userId: 32,
      },
      {
        headers: {
          "Set-Cookie": "connect.sid=msw-cookie;HttpOnly;Path=/",
        },
      },
    );
  }),
  http.post("/auth/refresh", () => {
    console.log("refresh token 실행");
    return HttpResponse.json(
      {},
      {
        headers: {
          NewAccessToken: "Bearer refreshed ---token ,.,..",
        },
      },
    );
  }),
  http.post("/users", async ({ request }) => {
    console.log("회원가입");
    // return HttpResponse.text(JSON.stringify("user_exists"), {
    //   status: 403,
    // });
    return HttpResponse.text(JSON.stringify("ok"), {
      headers: {
        "Set-Cookie": "connect.sid=msw-cookie;HttpOnly;Path=/;Max-Age=0",
      },
    });
  }),
  http.get("/users/:userId", async ({ request }) => {
    // return HttpResponse.text(JSON.stringify("user_exists"), {
    //   status: 403,
    // });
    console.log("user정보 요청");
    return HttpResponse.json({
      id: 32,
      name: "John Doe",
      email: "user@example.com",
      favoriteList: [12, 22, 2, 4, 7, 8, 24, 17],
      created_at: "2024-01-12T02:48:55.040Z",
    });
  }),
  http.post("/api/post/image", (req, res, ctx) => {
    const { file } = req.body;
    // 여기서는 간단히 모의 URL을 반환하고 있습니다.
    const mockS3Url = "https://example-s3-bucket.com";
    const mockFields = { key: "mock-key" }; // 모의 필드

    return res(
      ctx.json({
        url: mockS3Url, // 모의 S3 URL
        fields: mockFields, // 모의 필드
      }),
    );
  }),
  http.post("/become-a-host", async (
      req,
      res,
      ctx) => {
    console.log("=>(handlers.js:75) 왜안되니..?");
    // FormData 인스턴스를 얻기
    console.log("=>(handlers.js:77) req", req);
    const formData = await req.request.body;
    console.log("=>(handlers.js:77) formData", formData);

    // const photos = formData.getAll('photos'); // 'photos' 필드의 모든 파일 가져오기
    // console.log("=>(handlers.js:80) photos", photos);
    // const otherData = formData.get('data'); // 'data' 필드의 JSON 데이터 가져오기
    // console.log("=>(handlers.js:82) otherData", otherData);
    //
    // // 'data' 필드의 JSON 데이터를 객체로 파싱
    // const parsedData = JSON.parse(otherData);
    // console.log("=>(handlers.js:86) parsedData", parsedData);

    // 필요한 로직 수행...
    // 예: 파일의 수와 다른 데이터를 확인
    console.log(`업로드된 사진 수: ${photos.length}`);
    console.log(`기타 데이터: `, parsedData);

    // 모의 응답 반환
    return res(ctx.status(200), ctx.json({ message: "호스팅 등록 성공" }));
  }),

    http.get("/hosting/listing/editor/:propertyId" , async ({ request, params }) => {
      return HttpResponse.json({
        // userId":null,"propertyName":"권오영네","propertyType":3,"category":5,"propertyExplanation":"아늑해요요옹","country":"대한민국","state":"경기도","city":"시흥시","street":"능곡동 산21-8","details":"3층","zipcode":"14992","latitude":37.373095436202554,"longitude":126.81675263482332,"maxPeople":2,"selfCheckIn":true,"petAvailable":true,"smokeAvailable":true,"checkInTime":9,"checkOutTime":13,"bedroom":4,"bed":2,"bathroom":5,"price":"10000","amenities":[5,10,7,4,8],"lat":37.373095436202554,"lng":126.81675263482332
        propertyName: "Lovely Apartment",
        category: 6,
        photos: [
          "https://develsopher-nextjs.s3.ap-northeast-2.amazonaws.com/burger.jpg",
          "https://develsopher-nextjs.s3.ap-northeast-2.amazonaws.com/burger.jpg",
          "https://develsopher-nextjs.s3.ap-northeast-2.amazonaws.com/burger.jpg",
          "https://develsopher-nextjs.s3.ap-northeast-2.amazonaws.com/burger.jpg",
        ],
        propertyType: 2,
        maxPeople: 4,
        bedroom: 2,
        bed: 3,
        bathroom: 1,
        selfCheckIn: true,
        petAvailable: false,
        smokeAvailable: false,
        checkInTime: 9,
        checkOutTime: 11,
        propertyExplanation:"lorem ipsum dolor sit amet, consectetur adip e",
        price: 100, // 평일, 주말 상관없이 가격 고정
        amenities: [1,2,3,4],
        country: "대한민국",
        state: "용산구",
        city: "서울특별시",
        street: "Street",
        details: "Apartment 101",
        zipcode: "123456",
        latitude: 27.672932021393862,
        longitude: 85.31184012689732,
      });
    }),
    http.get("/hosting/listing" , async ({ request, params }) => {
      return HttpResponse.json({
        propertyName: "Lovely Apartment",
        category: 6,
        photos: [
          "https://develsopher-nextjs.s3.ap-northeast-2.amazonaws.com/burger.jpg",
          "https://develsopher-nextjs.s3.ap-northeast-2.amazonaws.com/burger.jpg",
          "https://develsopher-nextjs.s3.ap-northeast-2.amazonaws.com/burger.jpg",
          "https://develsopher-nextjs.s3.ap-northeast-2.amazonaws.com/burger.jpg",
        ],
        propertyType: 2,
        maxPeople: 4,
        bedroom: 2,
        bed: 3,
        bathroom: 1,
        selfCheckIn: true,
        petAvailable: false,
        smokeAvailable: false,
        checkInTime: 9,
        checkOutTime: 11,
        propertyExplanation:"lorem ipsum dolor sit amet, consectetur adip e",
        price: 100, // 평일, 주말 상관없이 가격 고정
        amenities: [1,2,3,4],
        country: "대한민국",
        state: "용산구",
        city: "서울특별시",
        street: "Street",
        details: "Apartment 101",
        zipcode: "123456",
        latitude: 27.672932021393862,
        longitude: 85.31184012689732,
      });
    }),

  // http.post('/hosting/listing/editor/:propertyId/status', async (req, res) => {
  //   const propertyId = req.params.propertyId;
  //   const { status } = req.body;  // status should be a boolean
  //
  //   // Update logic here
  //
  //   res.status(200).json({ message: 'Status updated successfully' });
  // }),
  // http.post('/hosting/listing/editor/:propertyId/propertyName', async (req, res) => {
  //   const propertyId = req.params.propertyId;
  //   const { propertyName } = req.body;  // propertyName should be a String
  //
  //   // Update logic here
  //
  //   res.status(200).json({ message: 'Property name updated successfully' });
  // }),
  // http.post('/hosting/listing/editor/:propertyId/propertyType', async (req, res) => {
  //   const propertyId = req.params.propertyId;
  //   const { propertyType } = req.body;  // propertyType should be a String
  //
  //   // Update logic here
  //
  //   res.status(200).json({ message: 'Property type updated successfully' });
  // }),
  // http.post('/hosting/listing/editor/:propertyId/propertyDetail', async (req, res) => {
  //   const propertyId = req.params.propertyId;
  //   const {
  //     maxPeople,
  //     selfCheckIn,  // boolean
  //     petAvailable,  // boolean
  //     smokeAvailable,  // boolean
  //     checkInTime,  // int
  //     checkOutTime,  // int
  //     bedroom,  // int
  //     bed,  // int
  //     bathroom  // int
  //   } = req.body;
  //
  //   // Update logic here
  //
  //   res.status(200).json({ message: 'Property details updated successfully' });
  // }),
  //   http.post('/hosting/listing/editor/:propertyId/propertyExplanation', async (req, res) => {
  //       const propertyId = req.params.propertyId;
  //       const { propertyExplanation } = req.body;  // String
  //
  //       // Update logic here
  //
  //       res.status(200).json({ message: 'Property explanation updated successfully' });
  //   }),
  // // Assuming multer is used for handling multipart/form-data
  // http.post('/hosting/listing/editor/:propertyId/photos', upload.array('photos'), async (req, res) => {
  //   const propertyId = req.params.propertyId;
  //   const photos = req.files;
  //
  //   // Update logic here
  //
  //   res.status(200).json({ message: 'Photos updated successfully' });
  // }),
  // http.post('/hosting/listing/editor/:propertyId/amenities', async (req, res) => {
  //   const propertyId = req.params.propertyId;
  //   const { amenities } = req.body;  // Array of integers
  //
  //   // Update logic here
  //
  //   res.status(200).json({ message: 'Amenities updated successfully' });
  // }),
  // http.post('/hosting/listing/editor/:propertyId/address', async (req, res) => {
  //   const propertyId = req.params.propertyId;
  //   const {
  //     country,
  //     state,
  //     city,
  //     street,
  //     details,
  //     zipcode,
  //     latitude,  // Double
  //     longitude  // Double
  //   } = req.body;
  //
  //   // Update logic here
  //
  //   res.status(200).json({ message: 'Address updated successfully' });
  // }),
  // http.post('/hosting/listing/editor/:propertyId/price', async (req, res) => {
  //   const propertyId = req.params.propertyId;
  //   const { price } = req.body;  // Integer
  //
  //   // Update logic here
  //
  //   res.status(200).json({ message: 'Price updated successfully' });
  // }),

// 숙소 예약
  http.post("/rooms/booking/:propertyId", async ({ request, params }) => {
    const propertyId = params.propertyId; // URL 경로에서 propertyId 추출
    const body = await request.json(); // 요청 본문을 JSON으로 파싱

    // 이제 propertyId와 body 데이터를 사용할 수 있음
    console.log(propertyId, body);
    return HttpResponse.json({});
  }),
  // 숙소상세 정보
  http.get("/rooms/:roomId", ({ request, params }) => {
    const { roomId } = params;
    // return HttpResponse.text(JSON.stringify("user_exists"), {
    //   status: 401,
    // });
    return HttpResponse.json({
      propertyName: "Lovely Apartment",
      category: "bestView",
      photos: [
        "https://develsopher-nextjs.s3.ap-northeast-2.amazonaws.com/burger.jpg",
        "https://develsopher-nextjs.s3.ap-northeast-2.amazonaws.com/burger.jpg",
        "https://develsopher-nextjs.s3.ap-northeast-2.amazonaws.com/burger.jpg",
        "https://develsopher-nextjs.s3.ap-northeast-2.amazonaws.com/burger.jpg",
      ],
      propertyType: "호텔",
      propertyDetail: {
        maxPeople: 4,
        selfCheckIn: true,
        petAvailable: false,
        smokeAvailable: false,
        checkInTime: 14,
        checkOutTime: 11,
        bedroom: 2,
        bed: 3,
        bathroom: 1,
      },
      propertyExplanation:
        "lorem ipsum dolor sit amet, consectetur adip ex ante et just  labor incid temporlorem ipsum dolor sit amet, consectetur adip ex ante et just  labor incid temporlorem ipsum dolor sit amet, consectetur adip ex ante et just  labor incid temporlorem ipsum dolor sit amet, consectetur adip ex ante et just  labor incid temporlorem ipsum dolor sit amet, consectetur adip ex ante et just  labor incid temporlorem ipsum dolor sit amet, consectetur adip ex ante et just  labor incid tempor ",
      price: 100, // 평일, 주말 상관없이 가격 고정
      amenities: ["WiFi", "TV", "Air Conditioning"],
      guestFavorite: true, // 게스트 선호
      scores: {
        totalScore: 3.8, // 총 평점 -> 밑의 스코어들의 합 / 6
        checkInScore: 3.7,
        communicationScore: 3.0,
        cleanScore: 3.7,
        priceScore: 4.3,
        accuracyScore: 4.0,
        locationScore: 4.0,
      },
      reviews: [
        {
          id: 1,
          photo: "profilePic.jpg",
          userName: "홍길동",
          nation: "대한민국",
          totalScore: 4.2, // 6개의 평가를 하지만 총 평점만 제공
          writeDate: "2024-01-17",
          content:
            "정말 깨끗하고 아늑한 숙소였습니다. 호스트의 친절함도 좋았어요.정말 깨끗하고 아늑한 숙소였습니다. 호스트의 친절함도 좋았어요.정말 깨끗하고 아늑한 숙소였습니다. 호스트의 친절함도 좋았어요.정말 깨끗하고 아늑한 숙소였습니다. 호스트의 친절함도 좋았어요.정말 깨끗하고 아늑한 숙소였습니다. 호스트의 친절함도 좋았어요.정말 깨끗하고 아늑한 숙소였습니다. 호스트의 친절함도 좋았어요.정말 깨끗하고 아늑한 숙소였습니다. 호스트의 친절함도 좋았어요.정말 깨끗하고 아늑한 숙소였습니다. 호스트의 친절함도 좋았어요.정말 깨끗하고 아늑한 숙소였습니다. 호스트의 친절함도 좋았어요.정말 깨끗하고 아늑한 숙소였습니다. 호스트의 친절함도 좋았어요.정말 깨끗하고 아늑한 숙소였습니다. 호스트의 친절함도 좋았어요.정말 깨끗하고 아늑한 숙소였습니다. 호스트의 친절함도 좋았어요.정말 깨끗하고 아늑한 숙소였습니다. 호스트의 친절함도 좋았어요.정말 깨끗하고 아늑한 숙소였습니다. 호스트의 친절함도 좋았어요.정말 깨끗하고 아늑한 숙소였습니다. 호스트의 친절함도 좋았어요.정말 깨끗하고 아늑한 숙소였습니다. 호스트의 친절함도 좋았어요.정말 깨끗하고 아늑한 숙소였습니다. 호스트의 친절함도 좋았어요.정말 깨끗하고 아늑한 숙소였습니다. 호스트의 친절함도 좋았어요.정말 깨끗하고 아늑한 숙소였습니다. 호스트의 친절함도 좋았어요.정말 깨끗하고 아늑한 숙소였습니다. 호스트의 친절함도 좋았어요.정말 깨끗하고 아늑한 숙소였습니다. 호스트의 친절함도 좋았어요.정말 깨끗하고 아늑한 숙소였습니다. 호스트의 친절함도 좋았어요.정말 깨끗하고 아늑한 숙소였습니다. 호스트의 친절함도 좋았어요.정말 깨끗하고 아늑한 숙소였습니다. 호스트의 친절함도 좋았어요.정말 깨끗하고 아늑한 숙소였습니다. 호스트의 친절함도 좋았어요.정말 깨끗하고 아늑한 숙소였습니다. 호스트의 친절함도 좋았어요.정말 깨끗하고 아늑한 숙소였습니다. 호스트의 친절함도 좋았어요.정말 깨끗하고 아늑한 숙소였습니다. 호스트의 친절함도 좋았어요.정말 깨끗하고 아늑한 숙소였습니다. 호스트의 친절함도 좋았어요.정말 깨끗하고 아늑한 숙소였습니다. 호스트의 친절함도 좋았어요.정말 깨끗하고 아늑한 숙소였습니다. 호스트의 친절함도 좋았어요.정말 깨끗하고 아늑한 숙소였습니다. 호스트의 친절함도 좋았어요.정말 깨끗하고 아늑한 숙소였습니다. 호스트의 친절함도 좋았어요.정말 깨끗하고 아늑한 숙소였습니다. 호스트의 친절함도 좋았어요.정말 깨끗하고 아늑한 숙소였습니다. 호스트의 친절함도 좋았어요.정말 깨끗하고 아늑한 숙소였습니다. 호스트의 친절함도 좋았어요.정말 깨끗하고 아늑한 숙소였습니다. 호스트의 친절함도 좋았어요.정말 깨끗하고 아늑한 숙소였습니다. 호스트의 친절함도 좋았어요.정말 깨끗하고 아늑한 숙소였습니다. 호스트의 친절함도 좋았어요.정말 깨끗하고 아늑한 숙소였습니다. 호스트의 친절함도 좋았어요.정말 깨끗하고 아늑한 숙소였습니다. 호스트의 친절함도 좋았어요.정말 깨끗하고 아늑한 숙소였습니다. 호스트의 친절함도 좋았어요.",
        },
        {
          id: 2,
          photo: "profilePic.jpg",
          userName: "홍길동",
          nation: "대한민국",
          totalScore: 3.3,
          writeDate: "2024-01-17",
          content: "위치가 매우 좋았지만, 체크인 과정이 조금 복잡했어요.",
        },
        {
          id: 3,
          photo: "profilePic.jpg",
          userName: "홍길동",
          nation: "대한민국",
          totalScore: 3.8,
          writeDate: "2024-01-17",
          content: "완벽한 숙소! 모든 것이 기대 이상이었습니다.",
        },
        {
          id: 4,
          photo: "profilePic.jpg",
          userName: "홍길동",
          nation: "대한민국",
          totalScore: 4.2, // 6개의 평가를 하지만 총 평점만 제공
          writeDate: "2024-01-17",
          content:
            "정말 깨끗하고 아늑한 숙소였습니다. 호스트의 친절함도 좋았어요.",
        },
        {
          id: 5,
          photo: "profilePic.jpg",
          userName: "홍길동",
          nation: "대한민국",
          totalScore: 3.3,
          writeDate: "2024-01-17",
          content: "위치가 매우 좋았지만, 체크인 과정이 조금 복잡했어요.",
        },
        {
          id: 6,
          photo: "profilePic.jpg",
          userName: "홍길동",
          nation: "대한민국",
          totalScore: 3.8,
          writeDate: "2024-01-17",
          content: "완벽한 숙소! 모든 것이 기대 이상이었습니다.",
        },
      ],
      bookings: [
        // 오늘 날짜 이후로 이 property의 모든 예약을 보여줌 (예약실패 한 건은 뜨지 않음)
        {
          checkInDate: "2024-02-21",
          checkOutDate: "2024-02-24",
        },
        {
          checkInDate: "2024-02-25",
          checkOutDate: "2024-02-27",
        },
        {
          checkInDate: "2024-02-02",
          checkOutDate: "2024-02-10",
        },
      ],
      address: {
        country: "대한민국",
        state: "용산구",
        city: "서울특별시",
        street: "Street",
        details: "Apartment 101",
        zipcode: "123456",
        latitude: 27.672932021393862,
        longitude: 85.31184012689732,
      },
      host: {
        hostPhoto: "profilePic.jpg",
        hostName: "John Doe",
        hostExplanation: "안녕 나는 조 도",
        hostCareer: "0 years, 0 months, 0 days",
      },
    });
  }),
  // 댓글정보
  http.get("/rooms/:roomId/reviews", ({ request, params }) => {
    const { roomId } = params;
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page")) || 0;

    if (page === 0) {
      return HttpResponse.json({
        content: [
          {
            reviewId: 6,
            photo: "profilePic.jpg",
            userName: "홍길동",
            nation: "대한민국",
            totalScore: 3.8,
            writeDate: "2024-01-22",
            content: "첫번째 chunk 댓글 모음입니다!",
          },
          {
            reviewId: 5,
            photo: "profilePic.jpg",
            userName: "홍길동",
            nation: "대한민국",
            totalScore: 3.3,
            writeDate: "2024-01-22",
            content: "위치가 매우 좋았지만, 체크인 과정이 조금 복잡했어요.",
          },
          {
            reviewId: 4,
            photo: "profilePic.jpg",
            userName: "홍길동",
            nation: "대한민국",
            totalScore: 4.2,
            writeDate: "2024-01-22",
            content:
              "정말 깨끗하고 아늑한 숙소였습니다. 호스트의 친절함도 좋았어요.",
          },
          {
            reviewId: 3,
            photo: "profilePic.jpg",
            userName: "홍길동",
            nation: "대한민국",
            totalScore: 3.8,
            writeDate: "2024-01-22",
            content: "완벽한 숙소! 모든 것이 기대 이상이었습니다.",
          },
          {
            reviewId: 2,
            photo: "profilePic.jpg",
            userName: "홍길동",
            nation: "대한민국",
            totalScore: 3.3,
            writeDate: "2024-01-22",
            content: "위치가 매우 좋았지만, 체크인 과정이 조금 복잡했어요.",
          },
          {
            reviewId: 1,
            photo: "profilePic.jpg",
            userName: "홍길동",
            nation: "대한민국",
            totalScore: 4.2,
            writeDate: "2024-01-22",
            content:
              "정말 깨끗하고 아늑한 숙소였습니다. 호스트의 친절함도 좋았어요.",
          },
        ],
        pageable: {
          pageNumber: 1,
          pageSize: 6,
          sort: {
            empty: false,
            unsorted: false,
            sorted: true,
          },
          offset: 6,
          paged: true,
          unpaged: false,
        },
        first: false,
        last: false,
        size: 6,
        number: 1,
        sort: {
          empty: false,
          unsorted: false,
          sorted: true,
        },
        numberOfElements: 6,
        empty: false,
      });
    } else if (page === 1) {
      return HttpResponse.json({
        content: [
          {
            reviewId: 12,
            photo: "profilePic.jpg",
            userName: "홍길동",
            nation: "대한민국",
            totalScore: 3.8,
            writeDate: "2024-01-22",
            content: "두번째 chunk 댓글 모음입니다!",
          },
          {
            reviewId: 11,
            photo: "profilePic.jpg",
            userName: "홍길동",
            nation: "대한민국",
            totalScore: 3.3,
            writeDate: "2024-01-22",
            content: "위치가 매우 좋았지만, 체크인 과정이 조금 복잡했어요.",
          },
          {
            reviewId: 10,
            photo: "profilePic.jpg",
            userName: "홍길동",
            nation: "대한민국",
            totalScore: 4.2,
            writeDate: "2024-01-22",
            content:
              "정말 깨끗하고 아늑한 숙소였습니다. 호스트의 친절함도 좋았어요.",
          },
          {
            reviewId: 9,
            photo: "profilePic.jpg",
            userName: "홍길동",
            nation: "대한민국",
            totalScore: 3.8,
            writeDate: "2024-01-22",
            content: "완벽한 숙소! 모든 것이 기대 이상이었습니다.",
          },
          {
            reviewId: 8,
            photo: "profilePic.jpg",
            userName: "홍길동",
            nation: "대한민국",
            totalScore: 3.3,
            writeDate: "2024-01-22",
            content: "위치가 매우 좋았지만, 체크인 과정이 조금 복잡했어요.",
          },
          {
            reviewId: 7,
            photo: "profilePic.jpg",
            userName: "홍길동",
            nation: "대한민국",
            totalScore: 4.2,
            writeDate: "2024-01-22",
            content:
              "정말 깨끗하고 아늑한 숙소였습니다. 호스트의 친절함도 좋았어요.",
          },
        ],
        pageable: {
          pageNumber: 1,
          pageSize: 6,
          sort: {
            empty: false,
            unsorted: false,
            sorted: true,
          },
          offset: 6,
          paged: true,
          unpaged: false,
        },
        first: false,
        last: false,
        size: 6,
        number: 1,
        sort: {
          empty: false,
          unsorted: false,
          sorted: true,
        },
        numberOfElements: 6,
        empty: false,
      });
    } else if (page === 2) {
      return HttpResponse.json({
        content: [
          {
            reviewId: 18,
            photo: "profilePic.jpg",
            userName: "홍길동",
            nation: "대한민국",
            totalScore: 3.8,
            writeDate: "2024-01-22",
            content: "마지막 chunk 댓글 모음입니다!",
          },
          {
            reviewId: 17,
            photo: "profilePic.jpg",
            userName: "홍길동",
            nation: "대한민국",
            totalScore: 3.3,
            writeDate: "2024-01-22",
            content: "위치가 매우 좋았지만, 체크인 과정이 조금 복잡했어요.",
          },
          {
            reviewId: 16,
            photo: "profilePic.jpg",
            userName: "홍길동",
            nation: "대한민국",
            totalScore: 4.2,
            writeDate: "2024-01-22",
            content:
              "정말 깨끗하고 아늑한 숙소였습니다. 호스트의 친절함도 좋았어요.",
          },
          {
            reviewId: 15,
            photo: "profilePic.jpg",
            userName: "홍길동",
            nation: "대한민국",
            totalScore: 3.8,
            writeDate: "2024-01-22",
            content: "완벽한 숙소! 모든 것이 기대 이상이었습니다.",
          },
          {
            reviewId: 14,
            photo: "profilePic.jpg",
            userName: "홍길동",
            nation: "대한민국",
            totalScore: 3.3,
            writeDate: "2024-01-22",
            content: "위치가 매우 좋았지만, 체크인 과정이 조금 복잡했어요.",
          },
          {
            reviewId: 13,
            photo: "profilePic.jpg",
            userName: "홍길동",
            nation: "대한민국",
            totalScore: 4.2,
            writeDate: "2024-01-22",
            content:
              "정말 깨끗하고 아늑한 숙소였습니다. 호스트의 친절함도 좋았어요.",
          },
        ],
        pageable: {
          pageNumber: 1,
          pageSize: 6,
          sort: {
            empty: false,
            unsorted: false,
            sorted: true,
          },
          offset: 6,
          paged: true,
          unpaged: false,
        },
        first: false,
        last: true,
        size: 6,
        number: 1,
        sort: {
          empty: false,
          unsorted: false,
          sorted: true,
        },
        numberOfElements: 6,
        empty: false,
      });
    }

    return HttpResponse.json({});
  }),
  http.post("/:userId/wishlist/:propertyId", () => {
    // 유저 위시리스트 추가 로직
    console.log("추가되었습니다.");
    return HttpResponse.json({}, { status: 200 });
  }),
  http.delete("/:userId/wishlist/:propertyId", () => {
    // 유저 위시리스트 삭제 로직
    return HttpResponse.json({}, { status: 200 });
  }),
  http.get("/room/search", ({ request, params }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || 0);
    if (page === 0) {
      return HttpResponse.json({
        content: generateRoomList(15),
        pageable: {
          pageNumber: 1,
          pageSize: 15,
          sort: {
            empty: false,
            unsorted: false,
            sorted: true,
          },
          offset: 15,
          paged: true,
          unpaged: false,
        },
        first: true,
        last: false,
        size: 15,
        number: 1,
        sort: {
          empty: false,
          unsorted: false,
          sorted: true,
        },
        numberOfElements: 15,
        empty: false,
      });
    } else if (page === 1) {
      return HttpResponse.json({
        content: generateRoomList(15),
        pageable: {
          pageNumber: 2,
          pageSize: 15,
          sort: {
            empty: false,
            unsorted: false,
            sorted: true,
          },
          offset: 15,
          paged: true,
          unpaged: false,
        },
        first: false,
        last: false,
        size: 15,
        number: 1,
        sort: {
          empty: false,
          unsorted: false,
          sorted: true,
        },
        numberOfElements: 15,
        empty: false,
      });
    } else if (page === 2) {
      return HttpResponse.json({
        content: generateRoomList(15),
        pageable: {
          pageNumber: 3,
          pageSize: 15,
          sort: {
            empty: false,
            unsorted: false,
            sorted: true,
          },
          offset: 15,
          paged: true,
          unpaged: false,
        },
        first: false,
        last: true,
        size: 15,
        number: 1,
        sort: {
          empty: false,
          unsorted: false,
          sorted: true,
        },
        numberOfElements: 15,
        empty: false,
      });
    }
  }),
  http.get("/room/filtered", ({ request, params }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || 0);
    if (page === 0) {
      return HttpResponse.json({
        content: generateRoomList(15),
        pageable: {
          pageNumber: 1,
          pageSize: 15,
          sort: {
            empty: false,
            unsorted: false,
            sorted: true,
          },
          offset: 15,
          paged: true,
          unpaged: false,
        },
        first: true,
        last: false,
        size: 15,
        number: 1,
        sort: {
          empty: false,
          unsorted: false,
          sorted: true,
        },
        numberOfElements: 15,
        empty: false,
      });
    } else if (page === 1) {
      return HttpResponse.json({
        content: generateRoomList(15),
        pageable: {
          pageNumber: 2,
          pageSize: 15,
          sort: {
            empty: false,
            unsorted: false,
            sorted: true,
          },
          offset: 15,
          paged: true,
          unpaged: false,
        },
        first: false,
        last: false,
        size: 15,
        number: 1,
        sort: {
          empty: false,
          unsorted: false,
          sorted: true,
        },
        numberOfElements: 15,
        empty: false,
      });
    } else if (page === 2) {
      return HttpResponse.json({
        content: generateRoomList(15),
        pageable: {
          pageNumber: 3,
          pageSize: 15,
          sort: {
            empty: false,
            unsorted: false,
            sorted: true,
          },
          offset: 15,
          paged: true,
          unpaged: false,
        },
        first: false,
        last: true,
        size: 15,
        number: 1,
        sort: {
          empty: false,
          unsorted: false,
          sorted: true,
        },
        numberOfElements: 15,
        empty: false,
      });
    }
  }),
];
