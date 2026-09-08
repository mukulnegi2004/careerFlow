//                                                AUTH                                                    //    DONE
1.     register & automatic login API (POST) : "http://localhost:5000/api/auth/register"
req.body => {
    "name":"pinki",
    "email":"pinki@gmail.com",
    "password":"123456"
}
resp=> {
    "success": true,
    "message": "user registered successfully",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTc4OTBkYmIzY2JjYTUzYjA5M2ZkNzIiLCJpYXQiOjE3ODYyODYzMDAsImV4cCI6MTc4NjI4NzIwMH0.4eDKPulACfyYyMIRRPmdH-iWVeqibk-Wjk5zlFPASzI",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTc4OTBkYmIzY2JjYTUzYjA5M2ZkNzIiLCJpYXQiOjE3ODYyODYzMDAsImV4cCI6MTc4Njg5MTEwMH0.BFgFI4xbykjjsIU70D3eBFg5v4ktnrgxc5bDtIEDmYY",
    "user": {
        "id": "6a7890dbb3cbca53b093fd72",
        "name": "pinki",
        "email": "pinki@gmail.com"
    }
}

2.   login API (POST) :   "http://localhost:5000/api/auth/login"
req.body => {
    "email":"pinki@gmail.com",
    "password":"123456"
}
resp=>{
    "success": true,
    "message": "login successfully",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTc4OTBkYmIzY2JjYTUzYjA5M2ZkNzIiLCJpYXQiOjE3ODYyODYzNDgsImV4cCI6MTc4NjI4NzI0OH0.A44rmPX05_8i2ILBVK2RhOZphSPzqhPd3ZjK2fcKOqo",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTc4OTBkYmIzY2JjYTUzYjA5M2ZkNzIiLCJpYXQiOjE3ODYyODYzNDgsImV4cCI6MTc4Njg5MTE0OH0.aXOuHNpxt31YlloaqcUpTKrJ7TNWWBynwagTZ0AxLSM",
    "user": {
        "id": "6a7890dbb3cbca53b093fd72",
        "name": "hello",
        "email": "hello@gmail.com"
    }
}

3.  Get current logged-in user API (GET) :   "http://localhost:5000/api/auth/me"
Headers tab
    Authorization : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTNmZDNmMmMxNTlmZThmMzhjMzgxNGQiLCJpYXQiOjE3ODMyNzEyMTcsImV4cCI6MTc4Mzg3NjAxN30.44-70nub09FXkjsJ9OE-OneyaUGv6eIG6R8UG_4_72Y
resp => {
  "success": true,
  "user": {
    "_id": "6a60e1f679db95ae08a43b5b",
    "name": "pinki",
    "email": "pinki@gmail.com",
    "headline": "MERN Developer",
    "bio": "I am a passionate MERN developer with a strong foundation in Node.js, React, and MongoDB, backed by a B.Tech in IT from GGSIPU. As a former SDE Intern at Google, I developed innovative solutions and drove projects forward with confidence, utilizing my technical expertise in Node.js and React to work on backend APIs, and I am excited to leverage my skills and experience to drive future projects forward.",
    "profileImage": "https://res.cloudinary.com/dfcheuhh6/image/upload/v1786797986/career-flow/vh3hpmsexu3fvmtwmwcs.webp",
    "filename": "career-flow/vh3hpmsexu3fvmtwmwcs",
    "skills": [
      "Node.js",
      "React",
      "MongoDB",
      "redux"
    ],
    "education": [
      {
        "institute": "GGSIPU",
        "degree": "B.Tech",
        "fieldOfStudy": "IT",
        "startYear": 2022,
        "endYear": 2026,
        "grade": "A+",
        "description": "Bachelor of Technology in Information Technology",
        "_id": "6a805fa2560cfab6ef6d5e04"
      }
    ],
    "experience": [
      {
        "company": "Google",
        "role": "SDE Intern",
        "employmentType": "Internship",
        "location": "India",
        "startDate": "2025-06-01T00:00:00.000Z",
        "endDate": "2025-08-31T00:00:00.000Z",
        "currentlyWorking": false,
        "description": "Worked on backend APIs",
        "skillsUsed": [
          "Node.js",
          "React",
          "tailwind"
        ],
        "_id": "6a805fa2560cfab6ef6d5e05"
      },
      {
        "company": "njdh",
        "role": "lmdkln",
        "employmentType": "Full-time",
        "location": "m;lsjpkdfjl",
        "startDate": "2004-06-15T00:00:00.000Z",
        "currentlyWorking": true,
        "description": "ekjjepojpfoemofk",
        "skillsUsed": [
          "html",
          "css"
        ],
        "_id": "6a805fa2560cfab6ef6d5e06"
      }
    ],
    "createdAt": "2026-07-22T15:29:58.448Z",
    "updatedAt": "2026-08-15T15:58:00.480Z",
    "__v": 0,
    "postsCount": 1,
    "connectionsCount": 1
  }
}

4.  Refresh tokens of user (POST) : "http://localhost:5000/api/auth/refresh"
req.body => {
    "refreshToken" :   "refresh_token_here"
}
resp => {
    "success": true,
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTYwZTFmNjc5ZGI5NWFlMDhhNDNiNWIiLCJpYXQiOjE3ODYyODY2NDQsImV4cCI6MTc4NjI4NzU0NH0.2mRmcMn37p5ovd72Z670jBWZEvOPZwhwfNyOWSKGe4E",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTYwZTFmNjc5ZGI5NWFlMDhhNDNiNWIiLCJpYXQiOjE3ODYyODY2NDQsImV4cCI6MTc4Njg5MTQ0NH0.E0xPPM5HmUmYSZOSfYGrCEjEP5vrW2m_9hTIl1ncTLM"
}

5.  logout curr user      (POST):  "http://localhost:5000/api/auth/logout"
Headers tab
    Authorization : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTNmZDNmMmMxNTlmZThmMzhjMzgxNGQiLCJpYXQiOjE3ODMyNzEyMTcsImV4cCI6MTc4Mzg3NjAxN30.44-70nub09FXkjs
resp => {
    "success": true,
    "message": "Logout successfully"
}












//                                                  POST                                                 //   DONE
1.   get All posts API with pagination (get) :  "http://localhost:5000/api/posts?page=1&limit=5"              //explore feature
resp => {
  "success": true,
  "posts": [
    {
      "_id": "6a7a22a1db53bae9b188034e",
      "author": {
        "_id": "6a60e1f679db95ae08a43b5b",
        "name": "pinki",
        "email": "pinki@gmail.com",
        "profileImage": "https://res.cloudinary.com/dfcheuhh6/image/upload/v1786288172/career-flow/quolqq1jczcde7kqvbjc.png"
      },
      "content": "-3",
      "image": "https://res.cloudinary.com/dfcheuhh6/image/upload/v1786389153/career-flow/lphdu3re6qznn03qm5jm.png",
      "filename": "career-flow/lphdu3re6qznn03qm5jm",
      "likes": [
        "6a60e1f679db95ae08a43b5b"
      ],
      "createdAt": "2026-08-10T19:12:33.979Z",
      "updatedAt": "2026-08-11T17:41:18.215Z",
      "__v": 3,
      "commentCount": 1
    },
    {
      "_id": "6a7a2291db53bae9b188034c",
      "author": {
        "_id": "6a60e1f679db95ae08a43b5b",
        "name": "pinki",
        "email": "pinki@gmail.com",
        "profileImage": "https://res.cloudinary.com/dfcheuhh6/image/upload/v1786288172/career-flow/quolqq1jczcde7kqvbjc.png"
      },
      "content": "-1",
      "image": "https://res.cloudinary.com/dfcheuhh6/image/upload/v1786389136/career-flow/xfzokrcbypgahfnzisc4.png",
      "filename": "career-flow/xfzokrcbypgahfnzisc4",
      "likes": [
        "6a60e1f679db95ae08a43b5b"
      ],
      "createdAt": "2026-08-10T19:12:17.022Z",
      "updatedAt": "2026-08-11T17:11:07.471Z",
      "__v": 1,
      "commentCount": 1
    },
    {
      "_id": "6a7a226fdb53bae9b1880349",
      "author": {
        "_id": "6a60e1f679db95ae08a43b5b",
        "name": "pinki",
        "email": "pinki@gmail.com",
        "profileImage": "https://res.cloudinary.com/dfcheuhh6/image/upload/v1786288172/career-flow/quolqq1jczcde7kqvbjc.png"
      },
      "content": "0",
      "image": "https://res.cloudinary.com/dfcheuhh6/image/upload/v1786389102/career-flow/bxayrssfgieuuiohkslo.png",
      "filename": "career-flow/bxayrssfgieuuiohkslo",
      "likes": [],
      "createdAt": "2026-08-10T19:11:43.172Z",
      "updatedAt": "2026-08-10T19:11:43.172Z",
      "__v": 0,
      "commentCount": 0
    },
    {
      "_id": "6a7a2223db53bae9b1880344",
      "author": {
        "_id": "6a60e1f679db95ae08a43b5b",
        "name": "pinki",
        "email": "pinki@gmail.com",
        "profileImage": "https://res.cloudinary.com/dfcheuhh6/image/upload/v1786288172/career-flow/quolqq1jczcde7kqvbjc.png"
      },
      "content": "1",
      "image": "https://res.cloudinary.com/dfcheuhh6/image/upload/v1786389026/career-flow/erdo5oswjirr8nj2v73i.png",
      "filename": "career-flow/erdo5oswjirr8nj2v73i",
      "likes": [],
      "createdAt": "2026-08-10T19:10:27.095Z",
      "updatedAt": "2026-08-10T19:10:27.095Z",
      "__v": 0,
      "commentCount": 0
    },
    {
      "_id": "6a7a221cdb53bae9b1880343",
      "author": {
        "_id": "6a60e1f679db95ae08a43b5b",
        "name": "pinki",
        "email": "pinki@gmail.com",
        "profileImage": "https://res.cloudinary.com/dfcheuhh6/image/upload/v1786288172/career-flow/quolqq1jczcde7kqvbjc.png"
      },
      "content": "2",
      "image": "https://res.cloudinary.com/dfcheuhh6/image/upload/v1786389020/career-flow/hqirnuwzmhegpziz9iap.png",
      "filename": "career-flow/hqirnuwzmhegpziz9iap",
      "likes": [],
      "createdAt": "2026-08-10T19:10:20.834Z",
      "updatedAt": "2026-08-10T19:10:20.834Z",
      "__v": 0,
      "commentCount": 0
    }
  ],
  "currentPage": 1,
  "totalPages": 6,
  "totalPosts": 26
}

2.   create post API (post) : "http://localhost:5000/api/posts"
Headers tab
    Authorization : Bearer token_here
Form data
    Key	         Type	Value
    image	     file	       (optional)
    content	     Text	My first LinkedIn clone post
resp=> {
  "success": true,
  "post": {
    "author": {
      "_id": "6a60e1f679db95ae08a43b5b",
      "name": "pinki",
      "email": "pinki@gmail.com",
      "profileImage": "https://res.cloudinary.com/dfcheuhh6/image/upload/v1786288172/career-flow/quolqq1jczcde7kqvbjc.png"
    },
    "content": "my first post",
    "image": "",
    "filename": "",
    "likes": [],
    "_id": "6a7b5f9d937c223f36e6a0dd",
    "createdAt": "2026-08-11T17:45:01.190Z",
    "updatedAt": "2026-08-11T17:45:01.190Z",
    "__v": 0,
    "commentCount": 0
  }
}

3.   delete post API (delete) : "http://localhost:5000/api/posts/:postId"                                               
Headers tab
    Authorization : Bearer "token_here"
resp => {
    "success": true,
    "message": "post Deleted"
}

4.   like or unlike post API (patch) : "http://localhost:5000/api/posts/:postId/like"                                 
Headers tab
    Authorization : Bearer "token_here"
resp => {
  "success": true,
  "data": {
    "_id": "6a7b5f9d937c223f36e6a0dd",
    "author": {
      "_id": "6a60e1f679db95ae08a43b5b",
      "name": "pinki",
      "email": "pinki@gmail.com",
      "headline": "MERN Developer",
      "profileImage": "https://res.cloudinary.com/dfcheuhh6/image/upload/v1786288172/career-flow/quolqq1jczcde7kqvbjc.png"
    },
    "content": "my first post",
    "image": "",
    "filename": "",
    "likes": [
      "6a60e1f679db95ae08a43b5b"
    ],
    "createdAt": "2026-08-11T17:45:01.190Z",
    "updatedAt": "2026-08-13T11:36:21.126Z",
    "__v": 27,
    "commentCount": 5
  }
}

5. get any user posts (get) :   "http://localhost:5000/api/posts/user/:userId?page=1&limit=5"                                   
Headers tab
    Authorization : Bearer "token_here"
resp => {
  "success": true,
  "message": "Posts fetched successfully",
  "result": {
    "posts": [
      {
        "_id": "6a805bd851e2ca1331e206c9",
        "author": {
          "_id": "6a60e1f679db95ae08a43b5b",
          "name": "pinki",
          "headline": "MERN Developer",
          "profileImage": "https://res.cloudinary.com/dfcheuhh6/image/upload/v1786797986/career-flow/vh3hpmsexu3fvmtwmwcs.webp"
        },
        "content": "Leveraging Bar Graphs to Enhance Data Visualization 📊\r\nBar graphs are a fundamental tool in data analysis, providing a clear and concise way to compare categorical data across different groups. By utilizing bar graphs, professionals can effectively communicate complex information, identify trends, and make informed decisions. Whether you're presenting research findings, tracking key performance indicators, or exploring market trends, bar graphs offer a simple yet powerful means of data visualization. By incorporating bar graphs into your reports and presentations, you can increase engagement, facilitate understanding, and drive business results.\r\n#DataVisualization #BarGraphs #DataAnalysis #BusinessIntelligence #MarketTrends #DataCommunication #GraphicalRepresentation #DataInsights",
        "image": "https://res.cloudinary.com/dfcheuhh6/image/upload/v1786797017/career-flow/ecetatmjpvy9ujllwt1b.png",
        "filename": "career-flow/ecetatmjpvy9ujllwt1b",
        "likes": [
          "6a60e42b79db95ae08a43b5c"
        ],
        "createdAt": "2026-08-15T12:30:16.966Z",
        "updatedAt": "2026-08-17T16:20:53.284Z",
        "__v": 1,
        "commentCount": 1
      },
      {
        "_id": "6a805bb751e2ca1331e206c8",
        "author": {
          "_id": "6a60e1f679db95ae08a43b5b",
          "name": "pinki",
          "headline": "MERN Developer",
          "profileImage": "https://res.cloudinary.com/dfcheuhh6/image/upload/v1786797986/career-flow/vh3hpmsexu3fvmtwmwcs.webp"
        },
        "content": "HyperText Markup Language (HTML) is a fundamental building block of computer science, serving as the standard markup language used to create web pages. It provides the structure and content of a website, making it an essential skill for professionals in the field of web development. Understanding HTML is crucial for creating visually appealing and user-friendly websites, as well as for developing responsive web applications. As technology continues to evolve, the importance of HTML in computer science will only continue to grow, making it a vital tool for anyone looking to pursue a career in this field 📊. \r\n#HTML #ComputerScience #WebDevelopment #Coding #Programming #TechCareers #WebDesign #SoftwareEngineering",
        "image": "https://res.cloudinary.com/dfcheuhh6/image/upload/v1786796983/career-flow/n5eg2yqiaox1q2uvwayl.png",
        "filename": "career-flow/n5eg2yqiaox1q2uvwayl",
        "likes": [
          "6a60e1f679db95ae08a43b5b",
          "6a60e42b79db95ae08a43b5c"
        ],
        "createdAt": "2026-08-15T12:29:43.040Z",
        "updatedAt": "2026-08-15T12:42:41.784Z",
        "__v": 2,
        "commentCount": 2
      },
      {
        "_id": "6a805b8e51e2ca1331e206c4",
        "author": {
          "_id": "6a60e1f679db95ae08a43b5b",
          "name": "pinki",
          "headline": "MERN Developer",
          "profileImage": "https://res.cloudinary.com/dfcheuhh6/image/upload/v1786797986/career-flow/vh3hpmsexu3fvmtwmwcs.webp"
        },
        "content": "Nostalgia alert: Who else grew up watching the Spiderman cartoon? The iconic superhero has been a source of inspiration for many of us, teaching valuable lessons about responsibility, courage, and perseverance. As we navigate our own professional journeys, we can draw parallels from Spiderman's experiences, applying his determination and adaptability to overcome challenges and achieve our goals. Let's take a moment to appreciate the impact of this beloved character on our childhood and beyond. #Spiderman #CartoonNostalgia #ProfessionalInspiration #SuperheroMindset #CareerGrowth #LeadershipLessons #ChildhoodMemories #MotivationMonday",
        "image": "https://res.cloudinary.com/dfcheuhh6/image/upload/v1786796942/career-flow/j5vlngs8brusaqt9v1sg.jpg",
        "filename": "career-flow/j5vlngs8brusaqt9v1sg",
        "likes": [],
        "createdAt": "2026-08-15T12:29:02.809Z",
        "updatedAt": "2026-08-15T12:29:02.809Z",
        "__v": 0,
        "commentCount": 0
      },
      {
        "_id": "6a805b7451e2ca1331e206c3",
        "author": {
          "_id": "6a60e1f679db95ae08a43b5b",
          "name": "pinki",
          "headline": "MERN Developer",
          "profileImage": "https://res.cloudinary.com/dfcheuhh6/image/upload/v1786797986/career-flow/vh3hpmsexu3fvmtwmwcs.webp"
        },
        "content": "The Timeless Elegance of Monochrome Photography: Why Black and White Images Continue to Captivate Audiences 📸\r\n\r\nIn an era dominated by vibrant colors and high-definition visuals, black and white images have managed to retain their allure, evoking a sense of nostalgia and sophistication. The absence of color allows the viewer to focus on the subject's texture, tone, and composition, creating a profound emotional connection.\r\n\r\nMonochrome photography has a unique ability to convey complex emotions and tell powerful stories, making it a popular choice among artists, photographers, and advertisers. The simplicity of black and white images also enables them to transcend time, remaining relevant and impactful across different cultures and generations.\r\n\r\nWhether used in fine art, commercial photography, or social media, black and white images have the power to inspire, educate, and influence. As visual communicators, it's essential to appreciate the versatility and effectiveness of monochrome photography in conveying our message and leaving a lasting impression.\r\n\r\n#BlackAndWhitePhotography #Monochrome #PhotographyTips #VisualStorytelling #MarketingStrategy #CreativeCommunications #ArtisticExpression #VisualInspiration",
        "image": "https://res.cloudinary.com/dfcheuhh6/image/upload/v1786796916/career-flow/s3593qyasqbhjekbe7lp.png",
        "filename": "career-flow/s3593qyasqbhjekbe7lp",
        "likes": [
          "6a60e1f679db95ae08a43b5b"
        ],
        "createdAt": "2026-08-15T12:28:36.132Z",
        "updatedAt": "2026-08-16T16:19:02.191Z",
        "__v": 1,
        "commentCount": 0
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 2,
      "totalPosts": 6,
      "limit": 5
    }
  }
}



















//                                                 Comment                                               //       DONE
1.   create comment on post (post)  :   "http://localhost:5000/api/comments/:postId"
Headers tab
    Authorization : Bearer token_here
req.body => {
    "text" :  "nice post"
}
response => {
    "success": true,
    "comment": {
        "post": "6a623c56a6e4940210373463",
        "author": {
            "_id": "6a60e1f679db95ae08a43b5b",
            "name": "pinki",
            "email": "pinki@gmail.com",
            "headline": "MERN Developer",
            "profileImage": "https://res.cloudinary.com/dfcheuhh6/image/upload/v1786288172/career-flow/quolqq1jczcde7kqvbjc.png"
        },
        "text": "checking api 2",
        "_id": "6a789f7319e9d553434c9256",
        "createdAt": "2026-08-09T15:40:35.911Z",
        "updatedAt": "2026-08-09T15:40:35.911Z",
        "__v": 0
    }
}

2.  get all comments of post (get):   "http://localhost:5000/api/comments/:postId"
Headers tab
    Authorization : Bearer token_here
response=> {
    "success": true,
    "comments": [
        {
            "_id": "6a789f7319e9d553434c9256",
            "post": "6a623c56a6e4940210373463",
            "author": {
                "_id": "6a60e1f679db95ae08a43b5b",
                "name": "pinki",
                "email": "pinki@gmail.com",
                "headline": "MERN Developer",
                "profileImage": "https://res.cloudinary.com/dfcheuhh6/image/upload/v1786288172/career-flow/quolqq1jczcde7kqvbjc.png"
            },
            "text": "checking api 2",
            "createdAt": "2026-08-09T15:40:35.911Z",
            "updatedAt": "2026-08-09T15:40:35.911Z",
            "__v": 0
        },
        {
            "_id": "6a789eb128cdc3ccc4fcb7b8",
            "post": "6a623c56a6e4940210373463",
            "author": {
                "_id": "6a60e1f679db95ae08a43b5b",
                "name": "pinki",
                "email": "pinki@gmail.com",
                "headline": "MERN Developer",
                "profileImage": "https://res.cloudinary.com/dfcheuhh6/image/upload/v1786288172/career-flow/quolqq1jczcde7kqvbjc.png"
            },
            "text": "checking api",
            "createdAt": "2026-08-09T15:37:21.220Z",
            "updatedAt": "2026-08-09T15:37:21.220Z",
            "__v": 0
        },
        {
            "_id": "6a760fa1b8ce8fe5871b8118",
            "post": "6a623c56a6e4940210373463",
            "author": {
                "_id": "6a60e1f679db95ae08a43b5b",
                "name": "pinki",
                "email": "pinki@gmail.com",
                "headline": "MERN Developer",
                "profileImage": "https://res.cloudinary.com/dfcheuhh6/image/upload/v1786288172/career-flow/quolqq1jczcde7kqvbjc.png"
            },
            "text": "nice post",
            "createdAt": "2026-08-07T17:02:25.771Z",
            "updatedAt": "2026-08-07T17:02:25.771Z",
            "__v": 0
        }
    ]
}

3.  delete comment of post (delete):           "http://localhost:5000/api/comments/:commentId"
Headers tab
    Authorization : Bearer token_here
resp => {
  "success": true,
  "message": "comment deleted successfully",
  "comment": {
    "_id": "6a7b3d431d01551381b20288",
    "post": "6a7a22a1db53bae9b188034e",
    "author": "6a60e1f679db95ae08a43b5b",
    "text": "hows life going",
    "createdAt": "2026-08-11T15:18:27.576Z",
    "updatedAt": "2026-08-11T15:18:27.576Z",
    "__v": 0
  }
}


















//                                                  USER                                                //
1.  update user profile (patch)   :   "http://localhost:5000/api/users/profile"
Headers tab
    Authorization : Bearer token_here
Form data
    Key	         Type	      Value
    name	       Text	      pinki
    headline	   Text	      MERN Developer
    bio	         Text	      Passionate Full Stack Developer
    skills	     Text	      ["Node.js","React","MongoDB"]
    education	   Text	      [{"institute":"GGSIPU","degree":"B.Tech","fieldOfStudy":"IT","startYear":2022,"endYear":2026, "grade": "A+", "description" : "Bachelor of Technology in Information Technology"}]
    experience	 Text	      [{"company":"Google","role":"SDE Intern","employmentType":"Internship","location":"India","startDate":"2025-06-01","endDate":"2025-08-31","currentlyWorking":false,"description":"Worked on backend APIs","skillsUsed":["Node.js","React"]}]
    profileImage File	      Select an image (optional)
resp => {
    "success": true,
    "message": "profile updated successfully",
    "user": {
        "_id": "6a60e1f679db95ae08a43b5b",
        "name": "pinki",
        "email": "pinki@gmail.com",
        "headline": "MERN Developer",
        "bio": "Text\tPassionate Full Stack Developer",
        "profileImage": "https://res.cloudinary.com/dfcheuhh6/image/upload/v1786288172/career-flow/quolqq1jczcde7kqvbjc.png",
        "filename": "career-flow/quolqq1jczcde7kqvbjc",
        "skills": [
            "Node.js",
            "React",
            "MongoDB"
        ],
        "education": [
            {
                "institute": "GGSIPU",
                "degree": "B.Tech",
                "fieldOfStudy": "IT",
                "startYear": 2022,
                "endYear": 2026,
                "grade": "A+",
                "description": "Bachelor of Technology in Information Technology",
                "_id": "6a78982ea4360e3a9b0da2a0"
            }
        ],
        "experience": [
            {
                "company": "Google",
                "role": "SDE Intern",
                "employmentType": "Internship",
                "location": "India",
                "startDate": "2025-06-01T00:00:00.000Z",
                "endDate": "2025-08-31T00:00:00.000Z",
                "currentlyWorking": false,
                "description": "Worked on backend APIs",
                "skillsUsed": [
                    "Node.js",
                    "React"
                ],
                "_id": "6a78982ea4360e3a9b0da2a1"
            }
        ],
        "createdAt": "2026-07-22T15:29:58.448Z",
        "updatedAt": "2026-08-09T15:09:34.337Z",
        "__v": 0
    }
}

2. get all users   (get) :     "http://localhost:5000/api/users?page=1&limit=5"
Headers tab
    Authorization : Bearer token_here
resp => {
  "success": true,
  "users": [
    {
      "_id": "6a60e42b79db95ae08a43b5c",
      "name": "krish",
      "headline": "Krish MERN Developer",
      "profileImage": "https://res.cloudinary.com/dfcheuhh6/image/upload/v1786797875/career-flow/azygtajoth45oqsxzrpx.webp"
    }
  ],
  "page": 1,
  "limit": 5,
  "totalUsers": 1,
  "totalPages": 1
}

3. search user by name (get) :  "http://localhost:5000/api/users/search?q=kr&page=1&limit=5"
Headers tab
    Authorization : Bearer token_here
resp => {
  "success": true,
  "users": [
    {
      "_id": "6a60e42b79db95ae08a43b5c",
      "name": "krish",
      "headline": "Krish MERN Developer",
      "profileImage": "https://res.cloudinary.com/dfcheuhh6/image/upload/v1786797875/career-flow/azygtajoth45oqsxzrpx.webp"
    }
  ],
  "page": 1,
  "limit": 5,
  "totalUsers": 1,
  "totalPages": 1
}

4. get another user profile  (get) : "http://localhost:5000/api/users/:userId"
Headers tab
    Authorization : Bearer token_here
resp => {
    "success": true,
    "data": {
        "_id": "6a60e42b79db95ae08a43b5c",
        "name": "krish",
        "email": "krish@gmail.com",
        "headline": "Krish MERN Developer",
        "bio": "Text\tPassionate Full Stack Developer",
        "profileImage": "https://res.cloudinary.com/dfcheuhh6/image/upload/v1786288611/career-flow/jut1umxx3moeiuurgzqh.png",
        "filename": "career-flow/jut1umxx3moeiuurgzqh",
        "skills": [
            "Node.js",
            "React",
            "MongoDB"
        ],
        "education": [
            {
                "institute": "GGSIPU",
                "degree": "B.Tech",
                "fieldOfStudy": "IT",
                "startYear": 2022,
                "endYear": 2026,
                "grade": "A+",
                "description": "Bachelor of Technology in Information Technology",
                "_id": "6a7899e4a4360e3a9b0da2ae"
            }
        ],
        "experience": [
            {
                "company": "Google",
                "role": "SDE Intern",
                "employmentType": "Internship",
                "location": "India",
                "startDate": "2025-06-01T00:00:00.000Z",
                "endDate": "2025-08-31T00:00:00.000Z",
                "currentlyWorking": false,
                "description": "Worked on backend APIs",
                "skillsUsed": [
                    "Node.js",
                    "React"
                ],
                "_id": "6a7899e4a4360e3a9b0da2af"
            }
        ],
        "createdAt": "2026-07-22T15:39:23.754Z",
        "updatedAt": "2026-08-09T15:16:52.742Z",
        "__v": 0,
        "postsCount": 1,
        "connectionsCount": 1,
        "connectionStatus": "accepted"
    }
}


















//                                                CONNECTION                                           //
    //receiverId = actual user ID (person you want to connect with), requestId / connectionId = Connection document ID from Connection collection

1.  to send request (post)   :   "http://localhost:5000/api/connections/request/:receiverId"             
Headers tab
    Authorization : Bearer token_here
resp => {
  "success": true,
  "connection": {
    "sender": {
      "_id": "6a60e1f679db95ae08a43b5b",
      "name": "pinki",
      "headline": "MERN Developer",
      "profileImage": "https://res.cloudinary.com/dfcheuhh6/image/upload/v1786797986/career-flow/vh3hpmsexu3fvmtwmwcs.webp"
    },
    "receiver": {
      "_id": "6a81b0cc8ce6f74a5557a57f",
      "name": "yash",
      "headline": "",
      "profileImage": ""
    },
    "status": "pending",
    "_id": "6a81b11b8ce6f74a5557a583",
    "createdAt": "2026-08-16T12:46:19.268Z",
    "updatedAt": "2026-08-16T12:46:19.268Z",
    "__v": 0
  }
}

2.  to accept request (patch)   :   "http://localhost:5000/api/connections/accept/:requestId"          //only receiver can accept req
Headers tab
    Authorization : Bearer token_here
resp => {
  "success": true,
  "connection": {
    "_id": "6a81b11b8ce6f74a5557a583",
    "sender": {
      "_id": "6a60e1f679db95ae08a43b5b",
      "name": "pinki",
      "headline": "MERN Developer",
      "profileImage": "https://res.cloudinary.com/dfcheuhh6/image/upload/v1786797986/career-flow/vh3hpmsexu3fvmtwmwcs.webp"
    },
    "receiver": {
      "_id": "6a81b0cc8ce6f74a5557a57f",
      "name": "yash",
      "headline": "",
      "profileImage": ""
    },
    "status": "accepted",
    "createdAt": "2026-08-16T12:46:19.268Z",
    "updatedAt": "2026-08-16T12:54:53.454Z",
    "__v": 0
  }
}

3.  to reject request (patch)   :   "http://localhost:5000/api/connections/reject/:requestId"            //only receiver can reject req
Headers tab
    Authorization : Bearer token_here
resp=> {
  "success": true,
  "connection": {
    "_id": "6a81b61bf28187a65ff052d8",
    "sender": {
      "_id": "6a60e1f679db95ae08a43b5b",
      "name": "pinki",
      "headline": "MERN Developer",
      "profileImage": "https://res.cloudinary.com/dfcheuhh6/image/upload/v1786797986/career-flow/vh3hpmsexu3fvmtwmwcs.webp"
    },
    "receiver": {
      "_id": "6a81b0cc8ce6f74a5557a57f",
      "name": "yash",
      "headline": "",
      "profileImage": ""
    },
    "status": "rejected",
    "createdAt": "2026-08-16T13:07:39.445Z",
    "updatedAt": "2026-08-16T13:10:13.401Z",
    "__v": 0
  }
}

4.  get all pending request from another send to curr user (get)   :         "http://localhost:5000/api/connections/pending"
Headers tab
    Authorization : Bearer token_here
  resp => {
  "success": true,
  "requests": [
    {
      "_id": "6a81b11b8ce6f74a5557a583",
      "sender": {
        "_id": "6a60e1f679db95ae08a43b5b",
        "name": "pinki",
        "headline": "MERN Developer",
        "profileImage": "https://res.cloudinary.com/dfcheuhh6/image/upload/v1786797986/career-flow/vh3hpmsexu3fvmtwmwcs.webp"
      },
      "receiver": "6a81b0cc8ce6f74a5557a57f",
      "status": "pending",
      "createdAt": "2026-08-16T12:46:19.268Z",
      "updatedAt": "2026-08-16T12:46:19.268Z",
      "__v": 0
    }
  ]
}

5.  to remove connection (delete)   :         "http://localhost:5000/api/connections/:connectionId"
Headers tab
    Authorization : Bearer token_here
resp => {
  "success": true,
  "message": "connection removed"
}

6.  get all connections of currUser (get)   :         "http://localhost:5000/api/connections"
Headers tab
    Authorization : Bearer token_here
resp=> {
  "success": true,
  "connections": [
    {
      "_id": "6a81b11b8ce6f74a5557a583",
      "sender": {
        "_id": "6a60e1f679db95ae08a43b5b",
        "name": "pinki",
        "headline": "MERN Developer",
        "profileImage": "https://res.cloudinary.com/dfcheuhh6/image/upload/v1786797986/career-flow/vh3hpmsexu3fvmtwmwcs.webp"
      },
      "receiver": {
        "_id": "6a81b0cc8ce6f74a5557a57f",
        "name": "yash",
        "headline": "",
        "profileImage": ""
      },
      "status": "accepted",
      "createdAt": "2026-08-16T12:46:19.268Z",
      "updatedAt": "2026-08-16T12:54:53.454Z",
      "__v": 0
    }
  ]
}














//                                             FEED                                          //

1. get posts of only connections, API with pagination (get) :  "http://localhost:5000/api/feed?page=1&limit=5" 
Headers tab
    Authorization : Bearer token_here
resp => {
    "success": true,
    "feed": [
        {
            "_id": "6a623df2c1b1dd094dacb542",
            "author": {
                "_id": "6a60e42b79db95ae08a43b5c",
                "name": "krish",
                "headline": "Krish MERN Developer",
                "profileImage": "https://res.cloudinary.com/dfcheuhh6/image/upload/v1786288611/career-flow/jut1umxx3moeiuurgzqh.png"
            },
            "content": "kush post1 SS",
            "image": "https://res.cloudinary.com/dfcheuhh6/image/upload/v1784823281/career-flow/yysfbwhoyyjpujeupagi.png",
            "filename": "career-flow/yysfbwhoyyjpujeupagi",
            "likes": [],
            "createdAt": "2026-07-23T16:14:42.341Z",
            "updatedAt": "2026-07-23T16:14:42.341Z",
            "__v": 0,
            "commentCount": 1
        },
        {
            "_id": "6a4d2b7b4c8ba2787de8cc28",
            "author": {
                "_id": "6a4a6d5a5d504594b9dab531",
                "name": "kush",
                "headline": "",
                "profileImage": ""
            },
            "content": "My first now LinkedIn clone post",
            "image": "",
            "filename": "",
            "likes": [],
            "createdAt": "2026-07-07T16:38:19.244Z",
            "updatedAt": "2026-07-07T16:38:19.244Z",
            "__v": 0,
            "commentCount": 1
        },
        {
            "_id": "6a4d250776a88f8aeabf5401",
            "author": {
                "_id": "6a4a6d5a5d504594b9dab531",
                "name": "kush",
                "headline": "",
                "profileImage": ""
            },
            "content": "My current LinkedIn clone post",
            "image": "",
            "filename": "",
            "likes": [
                "6a3fd3f2c159fe8f38c3814d"
            ],
            "createdAt": "2026-07-07T16:10:47.069Z",
            "updatedAt": "2026-07-07T16:27:48.835Z",
            "__v": 1,
            "commentCount": 1
        },
        {
            "_id": "6a47e92906afafd67e47b1a9",
            "author": {
                "_id": "6a47e5b63ec3f8263e37e33c",
                "name": "daksh",
                "headline": "",
                "profileImage": ""
            },
            "content": "second next",
            "image": "https://res.cloudinary.com/dfcheuhh6/image/upload/v1783097641/career-flow/rpyt6kqzyakt0nj5ime1.png",
            "filename": "career-flow/rpyt6kqzyakt0nj5ime1",
            "likes": [],
            "createdAt": "2026-07-03T16:54:01.038Z",
            "updatedAt": "2026-07-03T16:54:01.038Z",
            "__v": 0,
            "commentCount": 0
        },
        {
            "_id": "6a47e91e06afafd67e47b1a8",
            "author": {
                "_id": "6a47e5b63ec3f8263e37e33c",
                "name": "daksh",
                "headline": "",
                "profileImage": ""
            },
            "content": "next",
            "image": "https://res.cloudinary.com/dfcheuhh6/image/upload/v1783097630/career-flow/oho1duxd9i1sh7le8e2m.png",
            "filename": "career-flow/oho1duxd9i1sh7le8e2m",
            "likes": [],
            "createdAt": "2026-07-03T16:53:50.808Z",
            "updatedAt": "2026-07-03T16:53:50.808Z",
            "__v": 0,
            "commentCount": 0
        }
    ]
}















//                                          CHAT                                         //

1.  to create chat between two users   (post) :         "http://localhost:5000/api/chat/create/:receiverId"
Headers tab
    Authorization : Bearer token_here
resp => {
  "success": true,
  "chat": {
    "_id": "6a638ea9c2484385a68b4673",
    "participants": [
      {
        "_id": "6a60e42b79db95ae08a43b5c",
        "name": "krish",
        "headline": "Krish MERN Developer",
        "profileImage": "https://res.cloudinary.com/dfcheuhh6/image/upload/v1786797875/career-flow/azygtajoth45oqsxzrpx.webp"
      },
      {
        "_id": "6a60e1f679db95ae08a43b5b",
        "name": "pinki",
        "headline": "MERN Developer",
        "profileImage": "https://res.cloudinary.com/dfcheuhh6/image/upload/v1786797986/career-flow/vh3hpmsexu3fvmtwmwcs.webp"
      }
    ],
    "createdAt": "2026-07-24T16:11:21.802Z",
    "updatedAt": "2026-07-24T16:11:21.802Z",
    "__v": 0
  }
}

2. to get messages of a chat      (get) :              "http://localhost:5000/api/chat/messages/:chatId?page=1&limit=20"
Headers tab
    Authorization : Bearer token_here
resp => {
  "success": true,
  "messages": [
    {
      "_id": "6a639da5d3520ed1c78b3854",
      "chat": "6a638ea9c2484385a68b4673",
      "sender": {
        "_id": "6a60e42b79db95ae08a43b5c",
        "name": "krish",
        "profileImage": "https://res.cloudinary.com/dfcheuhh6/image/upload/v1786797875/career-flow/azygtajoth45oqsxzrpx.webp"
      },
      "text": "Hello pinki, would you like to join tomorrow",
      "createdAt": "2026-07-24T17:15:17.718Z",
      "updatedAt": "2026-07-24T17:15:17.718Z",
      "__v": 0
    }
  ]
}

3. get existing chat of curr user  (get)  :           "http://localhost:5000/api/chat"
Headers tab
    Authorization : Bearer token_here
resp => {
  "success": true,
  "chats": [
    {
      "_id": "6a8701eab8415a78a60f9466",
      "participants": [
        {
          "_id": "6a806b04433a8e68fa09980a",
          "name": "Rahul Sharma",
          "headline": "",
          "profileImage": ""
        },
        {
          "_id": "6a60e1f679db95ae08a43b5b",
          "name": "pinki",
          "headline": "MERN Developer",
          "profileImage": "https://res.cloudinary.com/dfcheuhh6/image/upload/v1786797986/career-flow/vh3hpmsexu3fvmtwmwcs.webp"
        }
      ],
      "createdAt": "2026-08-20T13:32:26.434Z",
      "updatedAt": "2026-08-20T13:32:26.434Z",
      "__v": 0
    },
    {
      "_id": "6a638ea9c2484385a68b4673",
      "participants": [
        {
          "_id": "6a60e42b79db95ae08a43b5c",
          "name": "krish",
          "headline": "Krish MERN Developer",
          "profileImage": "https://res.cloudinary.com/dfcheuhh6/image/upload/v1786797875/career-flow/azygtajoth45oqsxzrpx.webp"
        },
        {
          "_id": "6a60e1f679db95ae08a43b5b",
          "name": "pinki",
          "headline": "MERN Developer",
          "profileImage": "https://res.cloudinary.com/dfcheuhh6/image/upload/v1786797986/career-flow/vh3hpmsexu3fvmtwmwcs.webp"
        }
      ],
      "createdAt": "2026-07-24T16:11:21.802Z",
      "updatedAt": "2026-07-24T16:11:21.802Z",
      "__v": 0
    }
  ]
}

4. get specific chat  (get) :       "http://localhost:5000/api/chat/:chatId"
Headers tab
    Authorization : Bearer token_here
resp => {
  "success": true,
  "chat": {
    "_id": "6a886e7538785e499a7199f4",
    "participants": [
      {
        "_id": "6a806ae1433a8e68fa099809",
        "name": "rishka",
        "headline": "",
        "profileImage": ""
      },
      {
        "_id": "6a60e1f679db95ae08a43b5b",
        "name": "pinki",
        "headline": "MERN Developer",
        "profileImage": "https://res.cloudinary.com/dfcheuhh6/image/upload/v1786797986/career-flow/vh3hpmsexu3fvmtwmwcs.webp"
      }
    ],
    "createdAt": "2026-08-21T15:27:49.606Z",
    "updatedAt": "2026-08-21T15:27:49.606Z",
    "__v": 0
  }
}










//              websocket real time chat



















//                                       NOTIFICATIONS                                       //
1. to get all notfications of curr user  (get):        "http://localhost:5000/api/notifications"
Headers tab
    Authorization : Bearer token_here
resp => {
  "success": true,
  "notifications": [
    {
      "_id": "6a81d975a275d96e47078cc1",
      "receiver": {
        "_id": "6a60e1f679db95ae08a43b5b",
        "name": "pinki",
        "headline": "MERN Developer",
        "profileImage": "https://res.cloudinary.com/dfcheuhh6/image/upload/v1786797986/career-flow/vh3hpmsexu3fvmtwmwcs.webp"
      },
      "sender": {
        "_id": "6a60e42b79db95ae08a43b5c",
        "name": "krish",
        "headline": "Krish MERN Developer",
        "profileImage": "https://res.cloudinary.com/dfcheuhh6/image/upload/v1786797875/career-flow/azygtajoth45oqsxzrpx.webp"
      },
      "type": "connection_request",
      "isRead": false,
      "createdAt": "2026-08-16T15:38:29.833Z",
      "updatedAt": "2026-08-16T15:38:29.833Z",
      "__v": 0
    },
    {
      "_id": "6a81d905a275d96e47078cb5",
      "receiver": {
        "_id": "6a60e1f679db95ae08a43b5b",
        "name": "pinki",
        "headline": "MERN Developer",
        "profileImage": "https://res.cloudinary.com/dfcheuhh6/image/upload/v1786797986/career-flow/vh3hpmsexu3fvmtwmwcs.webp"
      },
      "sender": {
        "_id": "6a60e42b79db95ae08a43b5c",
        "name": "krish",
        "headline": "Krish MERN Developer",
        "profileImage": "https://res.cloudinary.com/dfcheuhh6/image/upload/v1786797875/career-flow/azygtajoth45oqsxzrpx.webp"
      },
      "type": "connection_accepted",
      "isRead": false,
      "createdAt": "2026-08-16T15:36:37.016Z",
      "updatedAt": "2026-08-16T15:36:37.016Z",
      "__v": 0
    },
    {
      "_id": "6a805ed4560cfab6ef6d5de1",
      "receiver": {
        "_id": "6a60e1f679db95ae08a43b5b",
        "name": "pinki",
        "headline": "MERN Developer",
        "profileImage": "https://res.cloudinary.com/dfcheuhh6/image/upload/v1786797986/career-flow/vh3hpmsexu3fvmtwmwcs.webp"
      },
      "sender": {
        "_id": "6a60e42b79db95ae08a43b5c",
        "name": "krish",
        "headline": "Krish MERN Developer",
        "profileImage": "https://res.cloudinary.com/dfcheuhh6/image/upload/v1786797875/career-flow/azygtajoth45oqsxzrpx.webp"
      },
      "type": "comment",
      "post": {
        "_id": "6a805bb751e2ca1331e206c8",
        "author": "6a60e1f679db95ae08a43b5b",
        "content": "HyperText Markup Language (HTML) is a fundamental building block of computer science, serving as the standard markup language used to create web pages. It provides the structure and content of a website, making it an essential skill for professionals in the field of web development. Understanding HTML is crucial for creating visually appealing and user-friendly websites, as well as for developing responsive web applications. As technology continues to evolve, the importance of HTML in computer science will only continue to grow, making it a vital tool for anyone looking to pursue a career in this field 📊. \r\n#HTML #ComputerScience #WebDevelopment #Coding #Programming #TechCareers #WebDesign #SoftwareEngineering",
        "image": "https://res.cloudinary.com/dfcheuhh6/image/upload/v1786796983/career-flow/n5eg2yqiaox1q2uvwayl.png"
      },
      "isRead": false,
      "createdAt": "2026-08-15T12:43:00.098Z",
      "updatedAt": "2026-08-15T12:43:00.098Z",
      "__v": 0
    },
    {
      "_id": "6a805ec1560cfab6ef6d5ddf",
      "receiver": {
        "_id": "6a60e1f679db95ae08a43b5b",
        "name": "pinki",
        "headline": "MERN Developer",
        "profileImage": "https://res.cloudinary.com/dfcheuhh6/image/upload/v1786797986/career-flow/vh3hpmsexu3fvmtwmwcs.webp"
      },
      "sender": {
        "_id": "6a60e42b79db95ae08a43b5c",
        "name": "krish",
        "headline": "Krish MERN Developer",
        "profileImage": "https://res.cloudinary.com/dfcheuhh6/image/upload/v1786797875/career-flow/azygtajoth45oqsxzrpx.webp"
      },
      "type": "like",
      "post": {
        "_id": "6a805bb751e2ca1331e206c8",
        "author": "6a60e1f679db95ae08a43b5b",
        "content": "HyperText Markup Language (HTML) is a fundamental building block of computer science, serving as the standard markup language used to create web pages. It provides the structure and content of a website, making it an essential skill for professionals in the field of web development. Understanding HTML is crucial for creating visually appealing and user-friendly websites, as well as for developing responsive web applications. As technology continues to evolve, the importance of HTML in computer science will only continue to grow, making it a vital tool for anyone looking to pursue a career in this field 📊. \r\n#HTML #ComputerScience #WebDevelopment #Coding #Programming #TechCareers #WebDesign #SoftwareEngineering",
        "image": "https://res.cloudinary.com/dfcheuhh6/image/upload/v1786796983/career-flow/n5eg2yqiaox1q2uvwayl.png"
      },
      "isRead": false,
      "createdAt": "2026-08-15T12:42:41.698Z",
      "updatedAt": "2026-08-15T12:42:41.698Z",
      "__v": 0
    },
      "isRead": false,
      "createdAt": "2026-08-15T12:36:50.511Z",
      "updatedAt": "2026-08-15T12:36:50.511Z",
      "__v": 0
    },
  ]
}

2. to mark notifications as read     (patch):          "http://localhost:5000/api/notifications/:notificationId/read"   
Headers tab
    Authorization : Bearer token_here
resp => {
  "success": true,
  "message": "notification marked as read"
}


















//                                         AI                                               //
1. to generate profile summary using gemini   (post):    "http://localhost:5000/api/ai/profile-summary"          //used for bio of user
Headers tab
    Authorization : Bearer token_here
resp => {
    "success": true,
    "message": "profile summary genrated successfully",
    "summary": "I am a passionate full stack developer with a strong foundation in MERN technologies, including Node.js, React, and MongoDB. I have recently completed my B.Tech in IT from GGSIPU and gained valuable experience as an SDE Intern at Google, where I worked on backend APIs utilizing Node.js and React. I am excited to leverage my skills and knowledge to drive innovative solutions and collaborate with like-minded professionals in the industry."
}

2. to improve post content (post):   "http://localhost:5000/api/ai/improve-post"
Headers tab
    Authorization : Bearer token_here
body=> {
    "content": "build to-do app"
}
resp => {
    "success": true,
    "message": "Post improved successfully",
    "content": "I'm excited to announce that I've recently developed a comprehensive to-do app designed to boost productivity and streamline task management. This innovative tool allows users to create, prioritize, and track their tasks efficiently, helping them stay organized and focused on their goals. The app's intuitive interface and customizable features make it an essential resource for individuals and teams looking to enhance their workflow and achieve more in less time. By leveraging this app, users can effectively manage their time, reduce stress, and increase their overall productivity. 💼\n#ProductivityApp #TaskManagement #ToDOList #MobileAppDevelopment #TimeManagement #GoalSetting #ProductivityHacks #WorkflowOptimization"
}

3. to get job suggestions (post):   "http://localhost:5000/api/ai/job-suggestions"
Headers tab
    Authorization : Bearer token_here
resp=> {
    "success": true,
    "message": "Job suggestions generated successfully",
    "suggestions": [
        {
            "jobTitle": "Full Stack Developer",
            "matchPercentage": "90%",
            "reason": "Strong skills in Node.js, React, and MongoDB, and experience as an SDE Intern at Google",
            "skillsToImprove": [
                "Frontend development with other frameworks"
            ]
        },
        {
            "jobTitle": "Backend Developer",
            "matchPercentage": "85%",
            "reason": "Experience working on backend APIs and proficiency in Node.js",
            "skillsToImprove": [
                "Database management with other NoSQL databases"
            ]
        },
        {
            "jobTitle": "MERN Stack Developer",
            "matchPercentage": "95%",
            "reason": "Proficiency in Node.js, React, and MongoDB, which are the core technologies of the MERN stack",
            "skillsToImprove": [
                "State management with Redux or MobX"
            ]
        },
        {
            "jobTitle": "Software Engineer",
            "matchPercentage": "80%",
            "reason": "Strong foundation in computer science and software development, with experience as an SDE Intern at Google",
            "skillsToImprove": [
                "Cloud computing with AWS or Azure"
            ]
        },
        {
            "jobTitle": "Technical Lead (Full Stack)",
            "matchPercentage": "70%",
            "reason": "Strong technical skills and experience, which can be leveraged to lead a team of developers",
            "skillsToImprove": [
                "Leadership and project management skills"
            ]
        }
    ]
}

4. to get reply suggestions (post):   "http://localhost:5000/api/ai/:chatId/reply-suggestions"
Headers tab
    Authorization : Bearer token_here
resp => {
    "success": true,
    "suggestions": {
        "replies": [
            {
                "tone": "Professional",
                "text": "I appreciate the invite"
            },
            {
                "tone": "Friendly",
                "text": "that sounds fun thanks"
            },
            {
                "tone": "Short",
                "text": "yes"
            }
        ]
    }
}


5. to do chat related to career (post) :    "http://localhost:5000/api/ai/career-chat"
Headers tab
    Authorization : Bearer token_here
body => {
    "message": "According to my profilehow many chances of getting me placed in good company and also explain why"
}
resp => {
  "success": true,
  "reply": {
    "type": "answer",
    "message": "Based on the information in your profile, here are the key factors that influence your chances of landing a role at a well‑known company, along with a realistic assessment:\n\n### Strengths\n| Area | What you have | Why it helps |\n|------|----------------|--------------|\n| **Technical stack** | Node.js, React, Redux, MongoDB, HTML/CSS, Tailwind | Full‑stack MERN expertise is in high demand for many product and SaaS teams. |\n| **Education** | B.Tech in IT (2022‑2026) from GGSIPU | A recognized engineering degree gives you a solid academic foundation. |\n| **Internship experience** | SDE internship at Google (2025) | A Google internship is a strong signal of competence and can open doors at other top firms. |\n| **Professional experience** | Full‑time contribution at *lmdkln* since 2004 (presumably a typo; likely 2024) | Consistent real‑world coding experience, especially on front‑end styling and UI work. |\n| **Project exposure** | Built robust backend APIs and dynamic UIs; used modern JS ecosystem | Shows you can deliver end‑to‑end features, a key requirement for many mid‑level roles. |\n\n### Areas to Strengthen\n| Area | Suggested action |\n|------|-----------------|\n| **Depth of backend** | Add more experience with scaling, micro‑services, or cloud (AWS/GCP). |\n| **Testing & CI/CD** | Highlight unit/integration testing (Jest, Cypress) and pipelines (GitHub Actions, Jenkins). |\n| **Performance optimization** | Show concrete metrics (e.g., reduced API latency by X%). |\n| **Portfolio / GitHub** | Ensure a clean, well‑documented repo with a few polished MERN projects that include README, live demo, and code comments. |\n| **Soft skills** | Mention collaboration tools (Jira, Confluence) and any leadership or mentorship experience. |\n\n### Probability Estimate\n- **Top‑tier tech firms (FAANG, FAANG‑plus)**: **Medium‑high** – Your Google internship is a strong differentiator, but these companies often look for additional depth (e.g., large‑scale systems, algorithmic prowess). Strengthening DSA/algorithm skills and showcasing high‑impact projects will lift you into the high‑probability bracket.\n- **Mid‑tier product companies (Scale‑ups, unicorns, well‑known SaaS)**: **High** – Your MERN stack expertise, combined with a solid internship and consistent coding history, aligns well with the needs of these organizations.\n- **Smaller startups / early‑stage companies**: **Very high** – They value practical full‑stack ability and can be more flexible on formal interview rigor.\n\n### Why These Chances Exist\n1. **Signal credibility** – A Google internship signals you can survive a rigorous selection process.\n2. **Relevant tech stack** – MERN is a go‑to stack for many modern web products; you already have the core pieces.\n3. **Project track record** – Building production APIs and UI components demonstrates end‑to‑end delivery capability.\n4. **Continuous learning** – Mentioning recent tools (Tailwind, Redux) shows you"
  }
}




