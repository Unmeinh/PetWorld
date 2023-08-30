export default [
  {
    _id: '001',
    fullName: 'Misaki.',
    avatarUser:
      'https://cdn.donmai.us/original/e4/63/__misaki_blue_archive_drawn_by_treerootbeard__e4639965dfcb8ad02a1548a16fdc2e29.png',
    description: "Vanitas vanitatum et omnia vanitas",
    followers: [],
    followings: ["002"]
  },
  {
    _id: '002',
    fullName: 'Generic-sensei.',
    avatarUser:
      'https://static1.personality-database.com/profile_images/7dc21e53b91342679cc66131b60ea8b4.png',
    followers: ["001"],
    followings: ["003"]
  },
  {
    _id: '003',
    fullName: 'Nguyễn Bỉnh Khiêm',
    avatarUser:
      'https://danviet.mediacdn.vn/296231569849192448/2021/6/19/102-1624069500624986816290.jpeg',
    followers: ["002"],
    followings: []
  },
];
